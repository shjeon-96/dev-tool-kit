/**
 * Google Indexing API 클라이언트
 *
 * URL 색인 요청을 Google에 직접 보내는 API
 * Search Console API와 별개로, Indexing API는 더 빠른 색인을 요청할 수 있음
 *
 * 사전 요구사항:
 * 1. Google Cloud Console에서 Indexing API 활성화
 * 2. 서비스 계정 생성 및 JSON 키 다운로드
 * 3. GSC에서 서비스 계정 이메일에 'Owner' 권한 부여
 * 4. 환경 변수: GOOGLE_SERVICE_ACCOUNT (JSON 문자열)
 */

import { createLogger } from "@/shared/lib/logger";

const logger = createLogger("gsc-indexing");

// ============================================
// 타입 정의
// ============================================

export interface IndexingResult {
  url: string;
  success: boolean;
  type: "URL_UPDATED" | "URL_DELETED";
  notifyTime?: string;
  error?: string;
}

export interface BatchIndexingResult {
  timestamp: string;
  total: number;
  success: number;
  failed: number;
  results: IndexingResult[];
}

interface GoogleAuthToken {
  access_token: string;
  expires_in: number;
  token_type: string;
}

// ============================================
// JWT 생성 및 토큰 획득
// ============================================

/**
 * JWT 헤더/페이로드를 Base64URL로 인코딩
 */
function base64UrlEncode(data: string): string {
  const base64 = btoa(data);
  return base64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

/**
 * 서비스 계정 자격증명 파싱
 */
function parseServiceAccount(): {
  client_email: string;
  private_key: string;
} {
  const credentials = process.env.GOOGLE_SERVICE_ACCOUNT;
  if (!credentials) {
    throw new Error("GOOGLE_SERVICE_ACCOUNT 환경 변수가 설정되지 않았습니다.");
  }

  try {
    const parsed = JSON.parse(credentials);
    if (!parsed.client_email || !parsed.private_key) {
      throw new Error("유효하지 않은 서비스 계정 형식입니다.");
    }
    return parsed;
  } catch (error) {
    throw new Error(`서비스 계정 파싱 실패: ${(error as Error).message}`);
  }
}

/**
 * PEM 형식 개인 키를 CryptoKey로 변환
 */
async function importPrivateKey(pemKey: string): Promise<CryptoKey> {
  // PEM 헤더/푸터 제거
  const pemContents = pemKey
    .replace(/-----BEGIN PRIVATE KEY-----/g, "")
    .replace(/-----END PRIVATE KEY-----/g, "")
    .replace(/\s/g, "");

  // Base64 디코딩
  const binaryString = atob(pemContents);
  const bytes = new Uint8Array(binaryString.length);
  for (let i = 0; i < binaryString.length; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }

  // PKCS#8 형식으로 가져오기
  return crypto.subtle.importKey(
    "pkcs8",
    bytes.buffer,
    { name: "RSASSA-PKCS1-v1_5", hash: "SHA-256" },
    false,
    ["sign"],
  );
}

/**
 * JWT 토큰 생성
 */
async function createJWT(
  clientEmail: string,
  privateKey: string,
): Promise<string> {
  const header = {
    alg: "RS256",
    typ: "JWT",
  };

  const now = Math.floor(Date.now() / 1000);
  const payload = {
    iss: clientEmail,
    scope: "https://www.googleapis.com/auth/indexing",
    aud: "https://oauth2.googleapis.com/token",
    iat: now,
    exp: now + 3600, // 1시간 유효
  };

  const headerB64 = base64UrlEncode(JSON.stringify(header));
  const payloadB64 = base64UrlEncode(JSON.stringify(payload));
  const signatureInput = `${headerB64}.${payloadB64}`;

  // 서명 생성
  const key = await importPrivateKey(privateKey);
  const encoder = new TextEncoder();
  const signatureBuffer = await crypto.subtle.sign(
    "RSASSA-PKCS1-v1_5",
    key,
    encoder.encode(signatureInput),
  );

  // 서명을 Base64URL로 인코딩
  const signatureBytes = new Uint8Array(signatureBuffer);
  let signatureB64 = btoa(String.fromCharCode(...signatureBytes));
  signatureB64 = signatureB64
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");

  return `${signatureInput}.${signatureB64}`;
}

/**
 * OAuth2 액세스 토큰 획득
 */
async function getAccessToken(): Promise<string> {
  const { client_email, private_key } = parseServiceAccount();
  const jwt = await createJWT(client_email, private_key);

  const response = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion: jwt,
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`토큰 획득 실패: ${response.status} - ${error}`);
  }

  const data = (await response.json()) as GoogleAuthToken;
  return data.access_token;
}

// ============================================
// Indexing API 요청
// ============================================

/**
 * 단일 URL 색인 요청
 */
export async function requestIndexing(
  url: string,
  type: "URL_UPDATED" | "URL_DELETED" = "URL_UPDATED",
): Promise<IndexingResult> {
  try {
    const accessToken = await getAccessToken();

    const response = await fetch(
      "https://indexing.googleapis.com/v3/urlNotifications:publish",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ url, type }),
      },
    );

    if (!response.ok) {
      const error = await response.json();
      return {
        url,
        success: false,
        type,
        error: error.error?.message || `HTTP ${response.status}`,
      };
    }

    const data = await response.json();
    return {
      url,
      success: true,
      type,
      notifyTime: data.urlNotificationMetadata?.latestUpdate?.notifyTime,
    };
  } catch (error) {
    return {
      url,
      success: false,
      type,
      error: (error as Error).message,
    };
  }
}

/**
 * 여러 URL 일괄 색인 요청
 */
export async function requestBatchIndexing(
  urls: string[],
  type: "URL_UPDATED" | "URL_DELETED" = "URL_UPDATED",
  delayMs = 1000, // API 제한 준수
): Promise<BatchIndexingResult> {
  const results: IndexingResult[] = [];

  logger.info(`Requesting indexing for ${urls.length} URLs`, { type });

  for (let i = 0; i < urls.length; i++) {
    const url = urls[i];
    logger.debug(`Processing URL ${i + 1}/${urls.length}`, { url });

    const result = await requestIndexing(url, type);
    results.push(result);

    if (result.success) {
      logger.info(`URL indexed successfully`, { url });
    } else {
      logger.warn(`URL indexing failed`, { url, error: result.error });
    }

    // Rate limiting
    if (i < urls.length - 1) {
      await new Promise((resolve) => setTimeout(resolve, delayMs));
    }
  }

  const successCount = results.filter((r) => r.success).length;

  return {
    timestamp: new Date().toISOString(),
    total: urls.length,
    success: successCount,
    failed: urls.length - successCount,
    results,
  };
}

/**
 * URL 색인 상태 확인 (Indexing API)
 */
export async function getIndexingStatus(url: string): Promise<{
  url: string;
  latestUpdate?: {
    type: string;
    notifyTime: string;
  };
  error?: string;
}> {
  try {
    const accessToken = await getAccessToken();

    const response = await fetch(
      `https://indexing.googleapis.com/v3/urlNotifications/metadata?url=${encodeURIComponent(url)}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );

    if (!response.ok) {
      const error = await response.json();
      return {
        url,
        error: error.error?.message || `HTTP ${response.status}`,
      };
    }

    const data = await response.json();
    return {
      url,
      latestUpdate: data.latestUpdate,
    };
  } catch (error) {
    return {
      url,
      error: (error as Error).message,
    };
  }
}
