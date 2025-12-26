"use client";

/**
 * useConverter Hook
 *
 * 변환기 상태 관리 및 변환 로직을 담당하는 커스텀 훅
 * - 입력값 debounce 처리
 * - 자동 변환 (useMemo)
 * - 액션 핸들러 (복사, 초기화, 스왑, 예시 로드)
 */

import { useState, useMemo, useCallback } from "react";
import { useCopyToClipboard, useDebounce } from "@/shared/lib";
import type { Conversion } from "@/entities/converter";
import { getConverter, getExamples } from "@/entities/converter";

interface UseConverterProps {
  conversion: Conversion;
}

interface UseConverterReturn {
  // 상태
  input: string;
  output: string;
  error: string | null;
  copied: boolean;
  examples: ReturnType<typeof getExamples>;

  // 액션
  setInput: (value: string) => void;
  handleCopy: () => void;
  handleClear: () => void;
  handleSwap: () => void;
  handleLoadExample: () => void;

  // 조건
  canSwap: boolean;
  hasExamples: boolean;
}

export function useConverter({
  conversion,
}: UseConverterProps): UseConverterReturn {
  const [input, setInput] = useState("");
  const { copied, copy } = useCopyToClipboard();

  const debouncedInput = useDebounce(input, 300);

  // 자동 변환 (파생 상태)
  const { output, error } = useMemo(() => {
    if (!debouncedInput.trim()) {
      return { output: "", error: null };
    }

    const converter = getConverter(conversion.slug);
    if (!converter) {
      return { output: "", error: "Converter not found" };
    }

    const result = converter(debouncedInput);
    if (result.success) {
      return { output: result.output, error: null };
    } else {
      return { output: "", error: result.error || "Conversion failed" };
    }
  }, [debouncedInput, conversion.slug]);

  // 예시 데이터
  const examples = useMemo(
    () => getExamples(conversion.slug),
    [conversion.slug],
  );

  // 핸들러
  const handleCopy = useCallback(() => {
    copy(output);
  }, [copy, output]);

  const handleClear = useCallback(() => {
    setInput("");
  }, []);

  const handleSwap = useCallback(() => {
    if (conversion.direction === "bidirectional" && output) {
      setInput(output);
    }
  }, [conversion.direction, output]);

  const handleLoadExample = useCallback(() => {
    if (examples.length > 0) {
      setInput(examples[0].input);
    }
  }, [examples]);

  // 조건 계산
  const canSwap = conversion.direction === "bidirectional" && !!output;
  const hasExamples = examples.length > 0;

  return {
    // 상태
    input,
    output,
    error,
    copied,
    examples,

    // 액션
    setInput,
    handleCopy,
    handleClear,
    handleSwap,
    handleLoadExample,

    // 조건
    canSwap,
    hasExamples,
  };
}
