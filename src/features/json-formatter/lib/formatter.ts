import { js_beautify } from "js-beautify";

export interface FormatResult {
  success: boolean;
  output: string;
  error?: string;
}

export function formatJson(input: string, indent: number = 2): FormatResult {
  try {
    const parsed = JSON.parse(input);
    const formatted = JSON.stringify(parsed, null, indent);
    return { success: true, output: formatted };
  } catch (e) {
    return {
      success: false,
      output: input,
      error: e instanceof Error ? e.message : "Invalid JSON",
    };
  }
}

export function minifyJson(input: string): FormatResult {
  try {
    const parsed = JSON.parse(input);
    const minified = JSON.stringify(parsed);
    return { success: true, output: minified };
  } catch (e) {
    return {
      success: false,
      output: input,
      error: e instanceof Error ? e.message : "Invalid JSON",
    };
  }
}

export function validateJson(input: string): FormatResult {
  try {
    JSON.parse(input);
    return { success: true, output: "Valid JSON" };
  } catch (e) {
    return {
      success: false,
      output: "",
      error: e instanceof Error ? e.message : "Invalid JSON",
    };
  }
}

export function beautifyJs(input: string): FormatResult {
  try {
    const beautified = js_beautify(input, {
      indent_size: 2,
      space_in_empty_paren: true,
    });
    return { success: true, output: beautified };
  } catch (e) {
    return {
      success: false,
      output: input,
      error: e instanceof Error ? e.message : "Formatting failed",
    };
  }
}
