/**
 * Converter Functions - 실제 변환 로직 구현
 */

import type { ConversionResult } from "../model/types";
import yaml from "js-yaml";

// ===============================
// 데이터 직렬화 변환
// ===============================

export function jsonToYaml(input: string): ConversionResult {
  try {
    const parsed = JSON.parse(input);
    const output = yaml.dump(parsed, {
      indent: 2,
      lineWidth: -1,
      noRefs: true,
    });
    return { success: true, output };
  } catch (e) {
    return {
      success: false,
      output: "",
      error: e instanceof Error ? e.message : "Invalid JSON",
    };
  }
}

export function yamlToJson(input: string): ConversionResult {
  try {
    const parsed = yaml.load(input);
    const output = JSON.stringify(parsed, null, 2);
    return { success: true, output };
  } catch (e) {
    return {
      success: false,
      output: "",
      error: e instanceof Error ? e.message : "Invalid YAML",
    };
  }
}

export function jsonToCsv(input: string): ConversionResult {
  try {
    const parsed = JSON.parse(input);

    if (!Array.isArray(parsed)) {
      return {
        success: false,
        output: "",
        error: "Input must be a JSON array",
      };
    }

    if (parsed.length === 0) {
      return { success: true, output: "" };
    }

    // 모든 키 수집
    const allKeys = new Set<string>();
    parsed.forEach((item) => {
      if (typeof item === "object" && item !== null) {
        Object.keys(item).forEach((key) => allKeys.add(key));
      }
    });

    const headers = Array.from(allKeys);
    const rows = parsed.map((item) =>
      headers
        .map((header) => {
          const value = item[header];
          if (value === null || value === undefined) return "";
          if (typeof value === "object") return JSON.stringify(value);
          const stringValue = String(value);
          // CSV 이스케이프
          if (
            stringValue.includes(",") ||
            stringValue.includes('"') ||
            stringValue.includes("\n")
          ) {
            return `"${stringValue.replace(/"/g, '""')}"`;
          }
          return stringValue;
        })
        .join(","),
    );

    const output = [headers.join(","), ...rows].join("\n");
    return { success: true, output };
  } catch (e) {
    return {
      success: false,
      output: "",
      error: e instanceof Error ? e.message : "Invalid JSON",
    };
  }
}

export function csvToJson(input: string): ConversionResult {
  try {
    const lines = input.trim().split("\n");
    if (lines.length === 0) {
      return { success: true, output: "[]" };
    }

    // 헤더 파싱
    const headers = parseCsvLine(lines[0]);

    // 데이터 행 파싱
    const data = lines.slice(1).map((line) => {
      const values = parseCsvLine(line);
      const obj: Record<string, string> = {};
      headers.forEach((header, index) => {
        obj[header] = values[index] || "";
      });
      return obj;
    });

    return { success: true, output: JSON.stringify(data, null, 2) };
  } catch (e) {
    return {
      success: false,
      output: "",
      error: e instanceof Error ? e.message : "Invalid CSV",
    };
  }
}

// CSV 라인 파싱 헬퍼
function parseCsvLine(line: string): string[] {
  const result: string[] = [];
  let current = "";
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];

    if (inQuotes) {
      if (char === '"') {
        if (line[i + 1] === '"') {
          current += '"';
          i++;
        } else {
          inQuotes = false;
        }
      } else {
        current += char;
      }
    } else {
      if (char === '"') {
        inQuotes = true;
      } else if (char === ",") {
        result.push(current);
        current = "";
      } else {
        current += char;
      }
    }
  }
  result.push(current);

  return result;
}

// ===============================
// 인코딩 변환
// ===============================

export function textToBase64(input: string): ConversionResult {
  try {
    // UTF-8 문자열을 Base64로 인코딩
    const output = btoa(unescape(encodeURIComponent(input)));
    return { success: true, output };
  } catch (e) {
    return {
      success: false,
      output: "",
      error: e instanceof Error ? e.message : "Encoding failed",
    };
  }
}

export function base64ToText(input: string): ConversionResult {
  try {
    const output = decodeURIComponent(escape(atob(input.trim())));
    return { success: true, output };
  } catch (e) {
    return {
      success: false,
      output: "",
      error: e instanceof Error ? e.message : "Invalid Base64",
    };
  }
}

export function urlEncode(input: string): ConversionResult {
  try {
    const output = encodeURIComponent(input);
    return { success: true, output };
  } catch (e) {
    return {
      success: false,
      output: "",
      error: e instanceof Error ? e.message : "Encoding failed",
    };
  }
}

export function urlDecode(input: string): ConversionResult {
  try {
    const output = decodeURIComponent(input);
    return { success: true, output };
  } catch (e) {
    return {
      success: false,
      output: "",
      error: e instanceof Error ? e.message : "Invalid URL encoding",
    };
  }
}

// ===============================
// 색상 변환
// ===============================

export function hexToRgb(input: string): ConversionResult {
  try {
    const hex = input.replace(/^#/, "").trim();
    if (!/^[0-9A-Fa-f]{6}$/.test(hex) && !/^[0-9A-Fa-f]{3}$/.test(hex)) {
      return { success: false, output: "", error: "Invalid HEX color" };
    }

    const fullHex =
      hex.length === 3
        ? hex
            .split("")
            .map((c) => c + c)
            .join("")
        : hex;

    const r = parseInt(fullHex.substring(0, 2), 16);
    const g = parseInt(fullHex.substring(2, 4), 16);
    const b = parseInt(fullHex.substring(4, 6), 16);

    return { success: true, output: `rgb(${r}, ${g}, ${b})` };
  } catch (e) {
    return {
      success: false,
      output: "",
      error: e instanceof Error ? e.message : "Conversion failed",
    };
  }
}

export function rgbToHex(input: string): ConversionResult {
  try {
    const match = input.match(/(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})/);
    if (!match) {
      return {
        success: false,
        output: "",
        error: "Invalid RGB format. Use: r, g, b or rgb(r, g, b)",
      };
    }

    const r = Math.min(255, Math.max(0, parseInt(match[1])));
    const g = Math.min(255, Math.max(0, parseInt(match[2])));
    const b = Math.min(255, Math.max(0, parseInt(match[3])));

    const toHex = (n: number) => n.toString(16).padStart(2, "0");
    const output = `#${toHex(r)}${toHex(g)}${toHex(b)}`.toUpperCase();

    return { success: true, output };
  } catch (e) {
    return {
      success: false,
      output: "",
      error: e instanceof Error ? e.message : "Conversion failed",
    };
  }
}

export function hexToHsl(input: string): ConversionResult {
  const rgbResult = hexToRgb(input);
  if (!rgbResult.success) return rgbResult;

  const match = rgbResult.output.match(/(\d+)/g);
  if (!match) return { success: false, output: "", error: "Conversion failed" };

  const [r, g, b] = match.map(Number).map((n) => n / 255);
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

    switch (max) {
      case r:
        h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
        break;
      case g:
        h = ((b - r) / d + 2) / 6;
        break;
      case b:
        h = ((r - g) / d + 4) / 6;
        break;
    }
  }

  const output = `hsl(${Math.round(h * 360)}, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%)`;
  return { success: true, output };
}

export function rgbToHsl(input: string): ConversionResult {
  const hexResult = rgbToHex(input);
  if (!hexResult.success) return hexResult;
  return hexToHsl(hexResult.output);
}

// ===============================
// 숫자 진법 변환
// ===============================

export function decimalToBinary(input: string): ConversionResult {
  try {
    const num = BigInt(input.trim());
    const output = num.toString(2);
    return { success: true, output };
  } catch {
    return { success: false, output: "", error: "Invalid decimal number" };
  }
}

export function binaryToDecimal(input: string): ConversionResult {
  try {
    const clean = input.trim().replace(/^0b/i, "");
    if (!/^[01]+$/.test(clean)) {
      return { success: false, output: "", error: "Invalid binary number" };
    }
    const output = BigInt("0b" + clean).toString(10);
    return { success: true, output };
  } catch {
    return { success: false, output: "", error: "Invalid binary number" };
  }
}

export function decimalToHex(input: string): ConversionResult {
  try {
    const num = BigInt(input.trim());
    const output = num.toString(16).toUpperCase();
    return { success: true, output: "0x" + output };
  } catch {
    return { success: false, output: "", error: "Invalid decimal number" };
  }
}

export function hexToDecimal(input: string): ConversionResult {
  try {
    const clean = input.trim().replace(/^0x/i, "");
    if (!/^[0-9A-Fa-f]+$/.test(clean)) {
      return {
        success: false,
        output: "",
        error: "Invalid hexadecimal number",
      };
    }
    const output = BigInt("0x" + clean).toString(10);
    return { success: true, output };
  } catch {
    return { success: false, output: "", error: "Invalid hexadecimal number" };
  }
}

// ===============================
// 해시 생성
// ===============================

import CryptoJS from "crypto-js";

export function textToMd5(input: string): ConversionResult {
  try {
    const output = CryptoJS.MD5(input).toString();
    return { success: true, output };
  } catch (e) {
    return {
      success: false,
      output: "",
      error: e instanceof Error ? e.message : "Hash generation failed",
    };
  }
}

export function textToSha256(input: string): ConversionResult {
  try {
    const output = CryptoJS.SHA256(input).toString();
    return { success: true, output };
  } catch (e) {
    return {
      success: false,
      output: "",
      error: e instanceof Error ? e.message : "Hash generation failed",
    };
  }
}

// ===============================
// 시간 변환
// ===============================

export function unixToDate(input: string): ConversionResult {
  try {
    const timestamp = parseInt(input.trim());
    if (isNaN(timestamp)) {
      return { success: false, output: "", error: "Invalid Unix timestamp" };
    }

    // 초 단위인지 밀리초 단위인지 자동 감지
    const ms = timestamp > 1e12 ? timestamp : timestamp * 1000;
    const date = new Date(ms);

    if (isNaN(date.getTime())) {
      return { success: false, output: "", error: "Invalid timestamp" };
    }

    const output = date.toISOString();
    return {
      success: true,
      output,
      metadata: {
        local: date.toLocaleString(),
        utc: date.toUTCString(),
      },
    };
  } catch (e) {
    return {
      success: false,
      output: "",
      error: e instanceof Error ? e.message : "Conversion failed",
    };
  }
}

export function dateToUnix(input: string): ConversionResult {
  try {
    const date = new Date(input.trim());
    if (isNaN(date.getTime())) {
      return { success: false, output: "", error: "Invalid date format" };
    }

    const seconds = Math.floor(date.getTime() / 1000);
    return {
      success: true,
      output: seconds.toString(),
      metadata: {
        milliseconds: date.getTime(),
      },
    };
  } catch (e) {
    return {
      success: false,
      output: "",
      error: e instanceof Error ? e.message : "Conversion failed",
    };
  }
}

// ===============================
// 변환 함수 맵핑
// ===============================

export const converterMap: Record<string, (input: string) => ConversionResult> =
  {
    "json-to-yaml": jsonToYaml,
    "yaml-to-json": yamlToJson,
    "json-to-csv": jsonToCsv,
    "csv-to-json": csvToJson,
    "text-to-base64": textToBase64,
    "base64-to-text": base64ToText,
    "url-encode": urlEncode,
    "url-decode": urlDecode,
    "hex-to-rgb": hexToRgb,
    "rgb-to-hex": rgbToHex,
    "hex-to-hsl": hexToHsl,
    "rgb-to-hsl": rgbToHsl,
    "decimal-to-binary": decimalToBinary,
    "binary-to-decimal": binaryToDecimal,
    "decimal-to-hex": decimalToHex,
    "hex-to-decimal": hexToDecimal,
    "md5-hash-generator": textToMd5,
    "sha256-hash-generator": textToSha256,
    "unix-to-date": unixToDate,
    "date-to-unix": dateToUnix,
    "json-to-typescript": (_input: string) => ({
      success: true,
      output: "// Use the full JSON to TypeScript tool for complete conversion",
    }),
    "css-to-tailwind": (_input: string) => ({
      success: true,
      output: "// Use the full CSS to Tailwind tool for complete conversion",
    }),
  };

export function getConverter(
  slug: string,
): ((input: string) => ConversionResult) | undefined {
  return converterMap[slug];
}
