"use client";

import { useState, useCallback, useMemo } from "react";
import { LoremIpsum } from "lorem-ipsum";

export type GenerateUnit = "words" | "sentences" | "paragraphs";

const koreanWords = [
  "안녕", "세상", "프로그램", "개발", "테스트", "문서", "코드", "함수",
  "변수", "클래스", "객체", "배열", "문자열", "숫자", "논리", "조건",
  "반복", "모듈", "패키지", "라이브러리", "프레임워크", "서버", "클라이언트",
  "데이터", "베이스", "쿼리", "응답", "요청", "인터페이스", "컴포넌트",
  "상태", "이벤트", "핸들러", "콜백", "비동기", "동기", "타입", "제네릭",
];

export function useLoremGenerator() {
  const [unit, setUnit] = useState<GenerateUnit>("paragraphs");
  const [count, setCount] = useState(3);
  const [useHtml, setUseHtml] = useState(false);
  const [useKorean, setUseKorean] = useState(false);
  const [startWithLorem, setStartWithLorem] = useState(true);

  const lorem = useMemo(() => {
    return new LoremIpsum({
      sentencesPerParagraph: {
        max: 8,
        min: 4,
      },
      wordsPerSentence: {
        max: 16,
        min: 4,
      },
    });
  }, []);

  const generateKorean = useCallback((count: number, unit: GenerateUnit): string => {
    const getRandomWord = () => koreanWords[Math.floor(Math.random() * koreanWords.length)];

    const generateSentence = () => {
      const wordCount = Math.floor(Math.random() * 8) + 4;
      const words = Array(wordCount).fill(0).map(getRandomWord);
      return words.join(" ") + ".";
    };

    const generateParagraph = () => {
      const sentenceCount = Math.floor(Math.random() * 4) + 3;
      return Array(sentenceCount).fill(0).map(generateSentence).join(" ");
    };

    switch (unit) {
      case "words":
        return Array(count).fill(0).map(getRandomWord).join(" ");
      case "sentences":
        return Array(count).fill(0).map(generateSentence).join(" ");
      case "paragraphs":
        return Array(count).fill(0).map(generateParagraph).join("\n\n");
    }
  }, []);

  const generatedText = useMemo(() => {
    if (useKorean) {
      return generateKorean(count, unit);
    }

    let text = "";
    switch (unit) {
      case "words":
        text = lorem.generateWords(count);
        break;
      case "sentences":
        text = lorem.generateSentences(count);
        break;
      case "paragraphs":
        text = lorem.generateParagraphs(count);
        break;
    }

    if (startWithLorem && !text.toLowerCase().startsWith("lorem")) {
      text = "Lorem ipsum dolor sit amet, " + text;
    }

    if (useHtml && unit === "paragraphs") {
      text = text.split("\n").map(p => `<p>${p}</p>`).join("\n");
    }

    return text;
  }, [lorem, unit, count, useHtml, useKorean, startWithLorem, generateKorean]);

  const copyToClipboard = useCallback(async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch {
      return false;
    }
  }, []);

  const handleRegenerate = useCallback(() => {
    // Force re-render by toggling a hidden state
    setCount(c => c);
  }, []);

  return {
    unit,
    setUnit,
    count,
    setCount,
    useHtml,
    setUseHtml,
    useKorean,
    setUseKorean,
    startWithLorem,
    setStartWithLorem,
    generatedText,
    copyToClipboard,
    handleRegenerate,
  };
}
