"use client";

import { useState, useCallback, useRef, useEffect } from "react";

/**
 * 도구의 처리 결과 타입
 */
export interface ProcessResult<TOutput> {
  success: boolean;
  output?: TOutput;
  error?: string;
}

/**
 * useToolState 옵션
 */
export interface UseToolStateOptions<TInput, TOutput, TOptions> {
  /**
   * 초기 입력값
   */
  initialInput?: TInput;

  /**
   * 초기 옵션값
   */
  initialOptions?: TOptions;

  /**
   * 처리 함수 (동기 또는 비동기)
   */
  process: (
    input: TInput,
    options: TOptions,
  ) => ProcessResult<TOutput> | Promise<ProcessResult<TOutput>>;

  /**
   * 입력 유효성 검사 함수
   * @returns null이면 유효, 문자열이면 에러 메시지
   */
  validate?: (input: TInput, options: TOptions) => string | null;

  /**
   * 처리 완료 후 콜백
   */
  onSuccess?: (input: TInput, output: TOutput) => void;

  /**
   * 처리 실패 후 콜백
   */
  onError?: (input: TInput, error: string) => void;
}

/**
 * useToolState 반환 타입
 */
export interface UseToolStateReturn<TInput, TOutput, TOptions> {
  // State
  input: TInput;
  output: TOutput | undefined;
  error: string | null;
  options: TOptions;
  isProcessing: boolean;

  // Actions
  setInput: (value: TInput) => void;
  setOptions: (value: TOptions | ((prev: TOptions) => TOptions)) => void;
  process: () => Promise<void>;
  reset: () => void;

  // Utilities
  hasOutput: boolean;
  hasError: boolean;
}

/**
 * 도구 상태 관리 Hook
 *
 * 입력/출력/에러 상태와 처리 로직을 통합 관리
 *
 * @template TInput - 입력 타입
 * @template TOutput - 출력 타입
 * @template TOptions - 옵션 타입 (기본값: 빈 객체)
 *
 * @example
 * ```typescript
 * const tool = useToolState({
 *   initialInput: "",
 *   initialOptions: { indent: 2 },
 *   process: (input, options) => {
 *     try {
 *       const result = formatJson(input, options.indent);
 *       return { success: true, output: result };
 *     } catch (e) {
 *       return { success: false, error: e.message };
 *     }
 *   },
 *   validate: (input) => input.trim() ? null : "입력을 입력해주세요",
 *   onSuccess: (input, output) => addToHistory(input, output),
 * });
 * ```
 */
export function useToolState<
  TInput = string,
  TOutput = string,
  TOptions = Record<string, unknown>,
>(
  options: UseToolStateOptions<TInput, TOutput, TOptions>,
): UseToolStateReturn<TInput, TOutput, TOptions> {
  const {
    initialInput,
    initialOptions,
    process: processFunc,
    validate,
    onSuccess,
    onError,
  } = options;

  // State
  const [input, setInput] = useState<TInput>(
    initialInput ?? ("" as unknown as TInput),
  );
  const [output, setOutput] = useState<TOutput | undefined>(undefined);
  const [error, setError] = useState<string | null>(null);
  const [toolOptions, setToolOptions] = useState<TOptions>(
    initialOptions ?? ({} as TOptions),
  );
  const [isProcessing, setIsProcessing] = useState(false);

  // Refs for callbacks (to avoid stale closures)
  const callbacksRef = useRef({ onSuccess, onError });
  useEffect(() => {
    callbacksRef.current = { onSuccess, onError };
  }, [onSuccess, onError]);

  // Process function
  const process = useCallback(async () => {
    // Validate first
    if (validate) {
      const validationError = validate(input, toolOptions);
      if (validationError) {
        setError(validationError);
        setOutput(undefined);
        return;
      }
    }

    setIsProcessing(true);
    setError(null);

    try {
      const result = await processFunc(input, toolOptions);

      if (result.success && result.output !== undefined) {
        setOutput(result.output);
        setError(null);
        callbacksRef.current.onSuccess?.(input, result.output);
      } else {
        setOutput(undefined);
        const errorMessage = result.error || "처리 중 오류가 발생했습니다";
        setError(errorMessage);
        callbacksRef.current.onError?.(input, errorMessage);
      }
    } catch (e) {
      const errorMessage =
        e instanceof Error ? e.message : "알 수 없는 오류가 발생했습니다";
      setOutput(undefined);
      setError(errorMessage);
      callbacksRef.current.onError?.(input, errorMessage);
    } finally {
      setIsProcessing(false);
    }
  }, [input, toolOptions, processFunc, validate]);

  // Reset function
  const reset = useCallback(() => {
    setInput(initialInput ?? ("" as unknown as TInput));
    setOutput(undefined);
    setError(null);
    setToolOptions(initialOptions ?? ({} as TOptions));
  }, [initialInput, initialOptions]);

  // Options setter with functional update support
  const setOptions = useCallback(
    (value: TOptions | ((prev: TOptions) => TOptions)) => {
      setToolOptions((prev) =>
        typeof value === "function"
          ? (value as (prev: TOptions) => TOptions)(prev)
          : value,
      );
    },
    [],
  );

  return {
    // State
    input,
    output,
    error,
    options: toolOptions,
    isProcessing,

    // Actions
    setInput,
    setOptions,
    process,
    reset,

    // Utilities
    hasOutput: output !== undefined,
    hasError: error !== null,
  };
}
