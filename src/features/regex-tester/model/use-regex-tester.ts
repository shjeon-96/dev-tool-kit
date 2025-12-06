"use client";

import { useState, useCallback, useMemo } from "react";

export interface RegexFlags {
  global: boolean;
  ignoreCase: boolean;
  multiline: boolean;
  dotAll: boolean;
  unicode: boolean;
  sticky: boolean;
}

export interface MatchResult {
  match: string;
  index: number;
  groups: Record<string, string> | undefined;
}

export function useRegexTester() {
  const [pattern, setPattern] = useState("");
  const [testString, setTestString] = useState("");
  const [replacement, setReplacement] = useState("");
  const [flags, setFlags] = useState<RegexFlags>({
    global: true,
    ignoreCase: false,
    multiline: false,
    dotAll: false,
    unicode: false,
    sticky: false,
  });

  const flagString = useMemo(() => {
    let str = "";
    if (flags.global) str += "g";
    if (flags.ignoreCase) str += "i";
    if (flags.multiline) str += "m";
    if (flags.dotAll) str += "s";
    if (flags.unicode) str += "u";
    if (flags.sticky) str += "y";
    return str;
  }, [flags]);

  const regex = useMemo(() => {
    if (!pattern) return null;
    try {
      return new RegExp(pattern, flagString);
    } catch {
      return null;
    }
  }, [pattern, flagString]);

  const error = useMemo(() => {
    if (!pattern) return null;
    try {
      new RegExp(pattern, flagString);
      return null;
    } catch (e) {
      return (e as Error).message;
    }
  }, [pattern, flagString]);

  const matches = useMemo((): MatchResult[] => {
    if (!regex || !testString) return [];

    const results: MatchResult[] = [];

    if (flags.global) {
      let match;
      const regexCopy = new RegExp(regex.source, regex.flags);
      while ((match = regexCopy.exec(testString)) !== null) {
        results.push({
          match: match[0],
          index: match.index,
          groups: match.groups,
        });
        if (match[0].length === 0) {
          regexCopy.lastIndex++;
        }
      }
    } else {
      const match = regex.exec(testString);
      if (match) {
        results.push({
          match: match[0],
          index: match.index,
          groups: match.groups,
        });
      }
    }

    return results;
  }, [regex, testString, flags.global]);

  const replacedString = useMemo(() => {
    if (!regex || !testString) return "";
    try {
      return testString.replace(regex, replacement);
    } catch {
      return "";
    }
  }, [regex, testString, replacement]);

  const highlightedText = useMemo(() => {
    if (!regex || !testString || matches.length === 0) return null;

    const parts: { text: string; isMatch: boolean }[] = [];
    let lastIndex = 0;

    matches.forEach((match) => {
      if (match.index > lastIndex) {
        parts.push({
          text: testString.slice(lastIndex, match.index),
          isMatch: false,
        });
      }
      parts.push({
        text: match.match,
        isMatch: true,
      });
      lastIndex = match.index + match.match.length;
    });

    if (lastIndex < testString.length) {
      parts.push({
        text: testString.slice(lastIndex),
        isMatch: false,
      });
    }

    return parts;
  }, [regex, testString, matches]);

  const toggleFlag = useCallback((flag: keyof RegexFlags) => {
    setFlags((prev) => ({ ...prev, [flag]: !prev[flag] }));
  }, []);

  const copyToClipboard = useCallback(async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch {
      return false;
    }
  }, []);

  const cheatSheet = useMemo(
    () => [
      { pattern: ".", desc: "모든 문자 (줄바꿈 제외)" },
      { pattern: "\\d", desc: "숫자 [0-9]" },
      { pattern: "\\w", desc: "단어 문자 [a-zA-Z0-9_]" },
      { pattern: "\\s", desc: "공백 문자" },
      { pattern: "^", desc: "문자열 시작" },
      { pattern: "$", desc: "문자열 끝" },
      { pattern: "*", desc: "0회 이상 반복" },
      { pattern: "+", desc: "1회 이상 반복" },
      { pattern: "?", desc: "0회 또는 1회" },
      { pattern: "{n}", desc: "정확히 n회" },
      { pattern: "{n,m}", desc: "n~m회 반복" },
      { pattern: "[abc]", desc: "문자 클래스" },
      { pattern: "[^abc]", desc: "부정 문자 클래스" },
      { pattern: "(x)", desc: "캡처 그룹" },
      { pattern: "(?:x)", desc: "비캡처 그룹" },
      { pattern: "x|y", desc: "x 또는 y" },
    ],
    []
  );

  const commonPatterns = useMemo(
    () => [
      { name: "이메일", pattern: "[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}" },
      { name: "URL", pattern: "https?:\\/\\/[\\w\\-]+(\\.[\\w\\-]+)+[/#?]?.*$" },
      { name: "전화번호 (한국)", pattern: "0\\d{1,2}-\\d{3,4}-\\d{4}" },
      { name: "IPv4 주소", pattern: "\\b(?:\\d{1,3}\\.){3}\\d{1,3}\\b" },
      { name: "날짜 (YYYY-MM-DD)", pattern: "\\d{4}-\\d{2}-\\d{2}" },
      { name: "HTML 태그", pattern: "<[^>]+>" },
      { name: "16진수 색상", pattern: "#[0-9A-Fa-f]{3,8}" },
    ],
    []
  );

  const applyPattern = useCallback((p: string) => {
    setPattern(p);
  }, []);

  return {
    pattern,
    setPattern,
    testString,
    setTestString,
    replacement,
    setReplacement,
    flags,
    toggleFlag,
    flagString,
    regex,
    error,
    matches,
    replacedString,
    highlightedText,
    copyToClipboard,
    cheatSheet,
    commonPatterns,
    applyPattern,
  };
}
