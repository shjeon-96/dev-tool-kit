"use client";

import { useState, useCallback, useEffect, useRef } from "react";

export type Language =
  | "javascript"
  | "typescript"
  | "json"
  | "html"
  | "css"
  | "markdown"
  | "yaml"
  | "graphql";

export interface PrettierOptions {
  printWidth: number;
  tabWidth: number;
  useTabs: boolean;
  semi: boolean;
  singleQuote: boolean;
  quoteProps: "as-needed" | "consistent" | "preserve";
  jsxSingleQuote: boolean;
  trailingComma: "all" | "es5" | "none";
  bracketSpacing: boolean;
  bracketSameLine: boolean;
  arrowParens: "always" | "avoid";
  proseWrap: "always" | "never" | "preserve";
  htmlWhitespaceSensitivity: "css" | "strict" | "ignore";
  endOfLine: "lf" | "crlf" | "cr" | "auto";
}

const defaultOptions: PrettierOptions = {
  printWidth: 80,
  tabWidth: 2,
  useTabs: false,
  semi: true,
  singleQuote: false,
  quoteProps: "as-needed",
  jsxSingleQuote: false,
  trailingComma: "all",
  bracketSpacing: true,
  bracketSameLine: false,
  arrowParens: "always",
  proseWrap: "preserve",
  htmlWhitespaceSensitivity: "css",
  endOfLine: "lf",
};

const languageParserMap: Record<Language, string> = {
  javascript: "babel",
  typescript: "typescript",
  json: "json",
  html: "html",
  css: "css",
  markdown: "markdown",
  yaml: "yaml",
  graphql: "graphql",
};

interface PrettierModule {
  format: (code: string, options: Record<string, unknown>) => Promise<string>;
}

export function usePrettierPlayground() {
  const [inputCode, setInputCode] = useState("");
  const [outputCode, setOutputCode] = useState("");
  const [language, setLanguage] = useState<Language>("javascript");
  const [options, setOptions] = useState<PrettierOptions>(defaultOptions);
  const [isFormatting, setIsFormatting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Store prettier and plugins in refs to avoid re-loading
  const prettierRef = useRef<PrettierModule | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const pluginsRef = useRef<any[] | null>(null);

  // Load prettier and plugins dynamically
  useEffect(() => {
    const loadPrettier = async () => {
      try {
        const [
          prettier,
          parserBabel,
          parserEstree,
          parserTypescript,
          parserHtml,
          parserCss,
          parserMarkdown,
          parserYaml,
          parserGraphql,
        ] = await Promise.all([
          import("prettier/standalone"),
          import("prettier/plugins/babel"),
          import("prettier/plugins/estree"),
          import("prettier/plugins/typescript"),
          import("prettier/plugins/html"),
          import("prettier/plugins/postcss"),
          import("prettier/plugins/markdown"),
          import("prettier/plugins/yaml"),
          import("prettier/plugins/graphql"),
        ]);

        prettierRef.current = prettier;
        pluginsRef.current = [
          parserBabel,
          parserEstree,
          parserTypescript,
          parserHtml,
          parserCss,
          parserMarkdown,
          parserYaml,
          parserGraphql,
        ];
        setIsLoading(false);
      } catch (err) {
        console.error("Failed to load Prettier:", err);
        setError("Prettier 로드 중 오류가 발생했습니다");
        setIsLoading(false);
      }
    };

    loadPrettier();
  }, []);

  const updateOption = useCallback(
    <K extends keyof PrettierOptions>(key: K, value: PrettierOptions[K]) => {
      setOptions((prev) => ({ ...prev, [key]: value }));
    },
    []
  );

  const resetOptions = useCallback(() => {
    setOptions(defaultOptions);
  }, []);

  const format = useCallback(async () => {
    if (!inputCode.trim()) {
      setOutputCode("");
      setError(null);
      return;
    }

    if (!prettierRef.current || !pluginsRef.current) {
      return;
    }

    setIsFormatting(true);
    setError(null);

    try {
      const result = await prettierRef.current.format(inputCode, {
        parser: languageParserMap[language],
        plugins: pluginsRef.current,
        ...options,
      });
      setOutputCode(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : "포맷팅 중 오류가 발생했습니다");
      setOutputCode("");
    } finally {
      setIsFormatting(false);
    }
  }, [inputCode, language, options]);

  // Auto-format on input/option change with debounce
  useEffect(() => {
    if (isLoading) return;

    const timer = setTimeout(() => {
      format();
    }, 300);
    return () => clearTimeout(timer);
  }, [format, isLoading]);

  const generateConfig = useCallback(() => {
    const config: Record<string, unknown> = {};

    // Only include non-default values
    if (options.printWidth !== 80) config.printWidth = options.printWidth;
    if (options.tabWidth !== 2) config.tabWidth = options.tabWidth;
    if (options.useTabs) config.useTabs = options.useTabs;
    if (!options.semi) config.semi = options.semi;
    if (options.singleQuote) config.singleQuote = options.singleQuote;
    if (options.quoteProps !== "as-needed") config.quoteProps = options.quoteProps;
    if (options.jsxSingleQuote) config.jsxSingleQuote = options.jsxSingleQuote;
    if (options.trailingComma !== "all") config.trailingComma = options.trailingComma;
    if (!options.bracketSpacing) config.bracketSpacing = options.bracketSpacing;
    if (options.bracketSameLine) config.bracketSameLine = options.bracketSameLine;
    if (options.arrowParens !== "always") config.arrowParens = options.arrowParens;
    if (options.proseWrap !== "preserve") config.proseWrap = options.proseWrap;
    if (options.htmlWhitespaceSensitivity !== "css")
      config.htmlWhitespaceSensitivity = options.htmlWhitespaceSensitivity;
    if (options.endOfLine !== "lf") config.endOfLine = options.endOfLine;

    return JSON.stringify(config, null, 2);
  }, [options]);

  const copyToClipboard = useCallback(async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch {
      return false;
    }
  }, []);

  const exampleCode: Record<Language, string> = {
    javascript: `const hello = (name) => {console.log("Hello, " + name + "!")}
function add(a,b){return a+b}
const arr=[1,2,3,4,5].map(x=>x*2).filter(x=>x>5)`,
    typescript: `interface User {name:string;age:number;email?:string}
const greet = (user: User): string => {return \`Hello, \${user.name}!\`}
type Result<T> = {success:boolean;data:T|null;error?:string}`,
    json: `{"name":"John","age":30,"address":{"city":"Seoul","country":"Korea"},"hobbies":["reading","coding","gaming"]}`,
    html: `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>Hello</title></head><body><div class="container"><h1>Hello World</h1><p>This is a paragraph</p></div></body></html>`,
    css: `.container{display:flex;justify-content:center;align-items:center;padding:20px;margin:10px auto;background-color:#f0f0f0;border-radius:8px}`,
    markdown: `# Title
This is a paragraph with **bold** and *italic* text.
- Item 1
- Item 2
  - Nested item`,
    yaml: `name: John Doe
age: 30
address:
  city: Seoul
  country: Korea
hobbies:
  - reading
  - coding`,
    graphql: `query GetUser($id: ID!) {user(id: $id) {id name email posts {title content}}}`,
  };

  const loadExample = useCallback(() => {
    setInputCode(exampleCode[language]);
  }, [language, exampleCode]);

  const reset = useCallback(() => {
    setInputCode("");
    setOutputCode("");
    setError(null);
  }, []);

  return {
    inputCode,
    setInputCode,
    outputCode,
    language,
    setLanguage,
    options,
    updateOption,
    resetOptions,
    isFormatting: isFormatting || isLoading,
    error,
    generateConfig,
    copyToClipboard,
    loadExample,
    reset,
  };
}
