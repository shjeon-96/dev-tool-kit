export type CaseType =
  | "lower"
  | "upper"
  | "title"
  | "sentence"
  | "camel"
  | "pascal"
  | "snake"
  | "kebab"
  | "constant"
  | "dot"
  | "path"
  | "reverse";

export interface ConvertResult {
  success: boolean;
  output: string;
  error?: string;
}

function splitWords(text: string): string[] {
  // Split by common delimiters and case boundaries
  return text
    .replace(/([a-z])([A-Z])/g, "$1 $2") // camelCase
    .replace(/([A-Z]+)([A-Z][a-z])/g, "$1 $2") // ABCDef
    .replace(/[-_./\\]+/g, " ") // delimiters
    .split(/\s+/)
    .filter((word) => word.length > 0);
}

export function convertCase(text: string, caseType: CaseType): ConvertResult {
  if (!text.trim()) {
    return {
      success: false,
      output: "",
      error: "Please enter text to convert",
    };
  }

  try {
    let result: string;
    const words = splitWords(text);

    switch (caseType) {
      case "lower":
        result = text.toLowerCase();
        break;

      case "upper":
        result = text.toUpperCase();
        break;

      case "title":
        result = words
          .map(
            (word) =>
              word.charAt(0).toUpperCase() + word.slice(1).toLowerCase(),
          )
          .join(" ");
        break;

      case "sentence":
        result = text
          .toLowerCase()
          .replace(/(^\s*\w|[.!?]\s*\w)/g, (c) => c.toUpperCase());
        break;

      case "camel":
        result = words
          .map((word, index) =>
            index === 0
              ? word.toLowerCase()
              : word.charAt(0).toUpperCase() + word.slice(1).toLowerCase(),
          )
          .join("");
        break;

      case "pascal":
        result = words
          .map(
            (word) =>
              word.charAt(0).toUpperCase() + word.slice(1).toLowerCase(),
          )
          .join("");
        break;

      case "snake":
        result = words.map((word) => word.toLowerCase()).join("_");
        break;

      case "kebab":
        result = words.map((word) => word.toLowerCase()).join("-");
        break;

      case "constant":
        result = words.map((word) => word.toUpperCase()).join("_");
        break;

      case "dot":
        result = words.map((word) => word.toLowerCase()).join(".");
        break;

      case "path":
        result = words.map((word) => word.toLowerCase()).join("/");
        break;

      case "reverse":
        result = text.split("").reverse().join("");
        break;

      default:
        result = text;
    }

    return { success: true, output: result };
  } catch (e) {
    return {
      success: false,
      output: "",
      error: e instanceof Error ? e.message : "Conversion failed",
    };
  }
}

export const caseOptions: { type: CaseType; label: string; example: string }[] =
  [
    { type: "lower", label: "lowercase", example: "hello world" },
    { type: "upper", label: "UPPERCASE", example: "HELLO WORLD" },
    { type: "title", label: "Title Case", example: "Hello World" },
    {
      type: "sentence",
      label: "Sentence case",
      example: "Hello world. This is example.",
    },
    { type: "camel", label: "camelCase", example: "helloWorld" },
    { type: "pascal", label: "PascalCase", example: "HelloWorld" },
    { type: "snake", label: "snake_case", example: "hello_world" },
    { type: "kebab", label: "kebab-case", example: "hello-world" },
    { type: "constant", label: "CONSTANT_CASE", example: "HELLO_WORLD" },
    { type: "dot", label: "dot.case", example: "hello.world" },
    { type: "path", label: "path/case", example: "hello/world" },
    { type: "reverse", label: "esreveR", example: "dlrow olleh" },
  ];
