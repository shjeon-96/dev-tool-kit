/**
 * 데이터 파이프라인 에러 핸들링 유틸리티
 * 시스템 에러, HTTP 에러, JSON 파싱 에러에 대한 방어적 처리
 */

// ============================================
// 타입 정의
// ============================================

export interface ErrorRecoveryStrategy {
  shouldRetry: boolean;
  retryDelay: number;
  maxRetries: number;
}

export interface SafeParseResult<T> {
  success: boolean;
  data?: T;
  error?: string;
  rawInput?: string;
}

// ============================================
// 시스템 에러 전략
// ============================================

const SYSTEM_ERROR_STRATEGIES: Record<string, ErrorRecoveryStrategy> = {
  // 연결 끊김 - 지수 백오프로 재시도
  ECONNRESET: {
    shouldRetry: true,
    retryDelay: 1000,
    maxRetries: 3,
  },
  // 연결 거부
  ECONNREFUSED: {
    shouldRetry: true,
    retryDelay: 2000,
    maxRetries: 3,
  },
  // 타임아웃 - 더 긴 간격으로 재시도
  ETIMEDOUT: {
    shouldRetry: true,
    retryDelay: 5000,
    maxRetries: 2,
  },
  // 권한 없음 - 재시도 불가
  EACCES: {
    shouldRetry: false,
    retryDelay: 0,
    maxRetries: 0,
  },
  // 파일 없음 - 재시도 불가
  ENOENT: {
    shouldRetry: false,
    retryDelay: 0,
    maxRetries: 0,
  },
  // 파일 핸들 초과 - 잠시 대기 후 재시도
  EMFILE: {
    shouldRetry: true,
    retryDelay: 10000,
    maxRetries: 5,
  },
  // DNS 조회 실패
  ENOTFOUND: {
    shouldRetry: true,
    retryDelay: 3000,
    maxRetries: 2,
  },
};

// ============================================
// HTTP 에러 전략
// ============================================

interface HttpErrorStrategy extends ErrorRecoveryStrategy {
  retryAfterHeader: boolean;
}

const HTTP_ERROR_STRATEGIES: Record<number, HttpErrorStrategy> = {
  // 429 Too Many Requests - Retry-After 헤더 존중
  429: {
    shouldRetry: true,
    retryAfterHeader: true,
    retryDelay: 60000,
    maxRetries: 5,
  },
  // 500 서버 오류
  500: {
    shouldRetry: true,
    retryAfterHeader: false,
    retryDelay: 3000,
    maxRetries: 2,
  },
  // 502 Bad Gateway
  502: {
    shouldRetry: true,
    retryAfterHeader: false,
    retryDelay: 5000,
    maxRetries: 3,
  },
  // 503 Service Unavailable
  503: {
    shouldRetry: true,
    retryAfterHeader: true,
    retryDelay: 10000,
    maxRetries: 3,
  },
  // 504 Gateway Timeout
  504: {
    shouldRetry: true,
    retryAfterHeader: false,
    retryDelay: 5000,
    maxRetries: 2,
  },
};

// ============================================
// 시스템 에러 복구 래퍼
// ============================================

export async function withErrorRecovery<T>(
  operation: () => Promise<T>,
  operationName: string,
): Promise<T> {
  let attempt = 0;

  while (true) {
    try {
      return await operation();
    } catch (error) {
      const errorCode = (error as NodeJS.ErrnoException).code || "";
      const strategy = SYSTEM_ERROR_STRATEGIES[errorCode] || {
        shouldRetry: false,
        maxRetries: 0,
        retryDelay: 0,
      };

      if (!strategy.shouldRetry || attempt >= strategy.maxRetries) {
        console.error(
          `[${operationName}] 복구 불가능한 에러:`,
          errorCode,
          (error as Error).message,
        );
        throw error;
      }

      attempt++;
      const delay = strategy.retryDelay * Math.pow(2, attempt - 1); // 지수 백오프
      console.warn(
        `[${operationName}] 재시도 ${attempt}/${strategy.maxRetries}, ${delay}ms 대기...`,
      );

      await sleep(delay);
    }
  }
}

// ============================================
// HTTP Fetch with Retry
// ============================================

export async function fetchWithRetry(
  url: string,
  options: RequestInit = {},
  maxRetries = 3,
): Promise<Response> {
  let lastResponse: Response | null = null;
  let attempt = 0;

  while (attempt <= maxRetries) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 30000); // 30초 타임아웃

      const response = await fetch(url, {
        ...options,
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      // 성공 또는 클라이언트 에러 (재시도 불필요)
      if (
        response.ok ||
        (response.status >= 400 &&
          response.status < 500 &&
          response.status !== 429)
      ) {
        return response;
      }

      lastResponse = response;
      const strategy = HTTP_ERROR_STRATEGIES[response.status];

      if (!strategy?.shouldRetry || attempt >= maxRetries) {
        return response;
      }

      // Retry-After 헤더 확인
      let delay = strategy.retryDelay;
      if (strategy.retryAfterHeader) {
        const retryAfter = response.headers.get("Retry-After");
        if (retryAfter) {
          const parsed = parseInt(retryAfter, 10);
          if (!isNaN(parsed)) {
            delay = parsed * 1000;
          }
        }
      }

      attempt++;
      console.warn(
        `[HTTP ${response.status}] 재시도 ${attempt}/${maxRetries}, ${delay}ms 대기...`,
      );
      await sleep(delay);
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") {
        console.error("Request timeout:", url);
      }

      attempt++;
      if (attempt > maxRetries) throw error;

      await sleep(5000);
    }
  }

  return lastResponse!;
}

// ============================================
// JSON 파싱 유틸리티
// ============================================

/**
 * 안전한 JSON 파싱 (에러 시 null 반환 대신 상세 정보)
 */
export function safeJsonParse<T = unknown>(input: string): SafeParseResult<T> {
  if (!input || typeof input !== "string") {
    return {
      success: false,
      error: "Input is empty or not a string",
      rawInput: String(input).slice(0, 100),
    };
  }

  const trimmed = input.trim();

  try {
    const data = JSON.parse(trimmed) as T;
    return { success: true, data };
  } catch (error) {
    const parseError = error as SyntaxError;
    const positionMatch = parseError.message.match(/position (\d+)/);
    const position = positionMatch ? parseInt(positionMatch[1], 10) : -1;

    return {
      success: false,
      error: `JSON Parse Error: ${parseError.message}`,
      rawInput:
        position >= 0
          ? `...${trimmed.slice(Math.max(0, position - 20), position + 20)}...`
          : trimmed.slice(0, 100),
    };
  }
}

/**
 * 느슨한 JSON 파싱 (일반적인 오류 자동 수정 시도)
 */
export function lenientJsonParse<T = unknown>(
  input: string,
): SafeParseResult<T> {
  let fixed = input.trim();

  // 1. 후행 쉼표 제거
  fixed = fixed.replace(/,(\s*[}\]])/g, "$1");

  // 2. 단일 따옴표 → 이중 따옴표 (간단한 케이스만)
  // 주의: 문자열 내부의 따옴표는 처리하지 않음
  if (!fixed.includes('"') && fixed.includes("'")) {
    fixed = fixed.replace(/'/g, '"');
  }

  return safeJsonParse<T>(fixed);
}

// ============================================
// 유틸리티 함수
// ============================================

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export { sleep };
