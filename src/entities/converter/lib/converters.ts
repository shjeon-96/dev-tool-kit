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

// ===============================
// XML 변환
// ===============================

export function jsonToXml(input: string): ConversionResult {
  try {
    const parsed = JSON.parse(input);
    const output = objectToXml(parsed, "root");
    return {
      success: true,
      output: `<?xml version="1.0" encoding="UTF-8"?>\n${output}`,
    };
  } catch (e) {
    return {
      success: false,
      output: "",
      error: e instanceof Error ? e.message : "Invalid JSON",
    };
  }
}

function objectToXml(obj: unknown, tagName: string, indent = ""): string {
  if (obj === null || obj === undefined) {
    return `${indent}<${tagName}/>\n`;
  }

  if (Array.isArray(obj)) {
    return obj.map((item) => objectToXml(item, tagName, indent)).join("");
  }

  if (typeof obj === "object") {
    const entries = Object.entries(obj as Record<string, unknown>);
    if (entries.length === 0) {
      return `${indent}<${tagName}/>\n`;
    }
    const children = entries
      .map(([key, value]) => objectToXml(value, key, indent + "  "))
      .join("");
    return `${indent}<${tagName}>\n${children}${indent}</${tagName}>\n`;
  }

  return `${indent}<${tagName}>${escapeXml(String(obj))}</${tagName}>\n`;
}

function escapeXml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export function xmlToJson(input: string): ConversionResult {
  try {
    const parser = new DOMParser();
    const doc = parser.parseFromString(input, "text/xml");
    const errorNode = doc.querySelector("parsererror");
    if (errorNode) {
      return { success: false, output: "", error: "Invalid XML" };
    }
    const result = xmlNodeToObject(doc.documentElement);
    return { success: true, output: JSON.stringify(result, null, 2) };
  } catch (e) {
    return {
      success: false,
      output: "",
      error: e instanceof Error ? e.message : "Invalid XML",
    };
  }
}

function xmlNodeToObject(node: Element): unknown {
  const result: Record<string, unknown> = {};

  // 자식 노드 처리
  for (const child of Array.from(node.children)) {
    const key = child.tagName;
    const value =
      child.children.length > 0
        ? xmlNodeToObject(child)
        : child.textContent || "";

    if (result[key] !== undefined) {
      // 같은 키가 있으면 배열로
      if (!Array.isArray(result[key])) {
        result[key] = [result[key]];
      }
      (result[key] as unknown[]).push(value);
    } else {
      result[key] = value;
    }
  }

  // 자식이 없으면 텍스트 반환
  if (Object.keys(result).length === 0) {
    return node.textContent || "";
  }

  return result;
}

// ===============================
// TOML 변환
// ===============================

export function jsonToToml(input: string): ConversionResult {
  try {
    const parsed = JSON.parse(input);
    const output = objectToToml(parsed);
    return { success: true, output };
  } catch (e) {
    return {
      success: false,
      output: "",
      error: e instanceof Error ? e.message : "Invalid JSON",
    };
  }
}

function objectToToml(obj: unknown, prefix = ""): string {
  if (typeof obj !== "object" || obj === null) {
    return "";
  }

  let result = "";
  const entries = Object.entries(obj as Record<string, unknown>);

  // 먼저 단순 값들 처리
  for (const [key, value] of entries) {
    if (typeof value !== "object" || value === null) {
      result += `${key} = ${toTomlValue(value)}\n`;
    }
  }

  // 객체들 처리 (테이블로)
  for (const [key, value] of entries) {
    if (typeof value === "object" && value !== null && !Array.isArray(value)) {
      const tableKey = prefix ? `${prefix}.${key}` : key;
      result += `\n[${tableKey}]\n`;
      result += objectToToml(value, tableKey);
    }
  }

  // 배열 처리
  for (const [key, value] of entries) {
    if (Array.isArray(value)) {
      if (value.every((v) => typeof v !== "object" || v === null)) {
        result += `${key} = [${value.map(toTomlValue).join(", ")}]\n`;
      } else {
        // 테이블 배열
        for (const item of value) {
          const tableKey = prefix ? `${prefix}.${key}` : key;
          result += `\n[[${tableKey}]]\n`;
          result += objectToToml(item, tableKey);
        }
      }
    }
  }

  return result;
}

function toTomlValue(value: unknown): string {
  if (typeof value === "string") {
    return `"${value.replace(/"/g, '\\"')}"`;
  }
  if (typeof value === "boolean" || typeof value === "number") {
    return String(value);
  }
  if (value === null) {
    return '""';
  }
  return '""';
}

export function tomlToJson(input: string): ConversionResult {
  try {
    const result = parseToml(input);
    return { success: true, output: JSON.stringify(result, null, 2) };
  } catch (e) {
    return {
      success: false,
      output: "",
      error: e instanceof Error ? e.message : "Invalid TOML",
    };
  }
}

function parseToml(input: string): Record<string, unknown> {
  const result: Record<string, unknown> = {};
  let currentTable: Record<string, unknown> = result;
  let currentPath: string[] = [];

  const lines = input.split("\n");

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;

    // 테이블 배열 [[key]]
    const tableArrayMatch = trimmed.match(/^\[\[([^\]]+)\]\]$/);
    if (tableArrayMatch) {
      const path = tableArrayMatch[1].split(".");
      currentPath = path;
      const parent = getNestedObject(result, path.slice(0, -1));
      const key = path[path.length - 1];
      if (!Array.isArray(parent[key])) {
        parent[key] = [];
      }
      const newObj: Record<string, unknown> = {};
      (parent[key] as unknown[]).push(newObj);
      currentTable = newObj;
      continue;
    }

    // 테이블 [key]
    const tableMatch = trimmed.match(/^\[([^\]]+)\]$/);
    if (tableMatch) {
      const path = tableMatch[1].split(".");
      currentPath = path;
      currentTable = getNestedObject(result, path);
      continue;
    }

    // 키-값 쌍
    const kvMatch = trimmed.match(/^([^=]+)=(.*)$/);
    if (kvMatch) {
      const key = kvMatch[1].trim();
      const value = parseTomlValue(kvMatch[2].trim());
      currentTable[key] = value;
    }
  }

  return result;
}

function getNestedObject(
  obj: Record<string, unknown>,
  path: string[],
): Record<string, unknown> {
  let current = obj;
  for (const key of path) {
    if (!(key in current)) {
      current[key] = {};
    }
    current = current[key] as Record<string, unknown>;
  }
  return current;
}

function parseTomlValue(value: string): unknown {
  // 문자열
  if (value.startsWith('"') && value.endsWith('"')) {
    return value.slice(1, -1).replace(/\\"/g, '"');
  }
  if (value.startsWith("'") && value.endsWith("'")) {
    return value.slice(1, -1);
  }
  // 불린
  if (value === "true") return true;
  if (value === "false") return false;
  // 배열
  if (value.startsWith("[") && value.endsWith("]")) {
    const inner = value.slice(1, -1);
    if (!inner.trim()) return [];
    return inner.split(",").map((v) => parseTomlValue(v.trim()));
  }
  // 숫자
  const num = Number(value);
  if (!isNaN(num)) return num;
  // 그 외는 문자열로
  return value;
}

// ===============================
// 숫자 8진수 변환
// ===============================

export function decimalToOctal(input: string): ConversionResult {
  try {
    const num = BigInt(input.trim());
    const output = num.toString(8);
    return { success: true, output: "0o" + output };
  } catch {
    return { success: false, output: "", error: "Invalid decimal number" };
  }
}

export function octalToDecimal(input: string): ConversionResult {
  try {
    const clean = input.trim().replace(/^0o/i, "");
    if (!/^[0-7]+$/.test(clean)) {
      return { success: false, output: "", error: "Invalid octal number" };
    }
    const output = BigInt("0o" + clean).toString(10);
    return { success: true, output };
  } catch {
    return { success: false, output: "", error: "Invalid octal number" };
  }
}

export function binaryToHex(input: string): ConversionResult {
  const decResult = binaryToDecimal(input);
  if (!decResult.success) return decResult;
  return decimalToHex(decResult.output);
}

export function hexToBinary(input: string): ConversionResult {
  const decResult = hexToDecimal(input);
  if (!decResult.success) return decResult;
  return decimalToBinary(decResult.output);
}

export function octalToHex(input: string): ConversionResult {
  const decResult = octalToDecimal(input);
  if (!decResult.success) return decResult;
  return decimalToHex(decResult.output);
}

export function hexToOctal(input: string): ConversionResult {
  const decResult = hexToDecimal(input);
  if (!decResult.success) return decResult;
  return decimalToOctal(decResult.output);
}

export function octalToBinary(input: string): ConversionResult {
  const decResult = octalToDecimal(input);
  if (!decResult.success) return decResult;
  return decimalToBinary(decResult.output);
}

export function binaryToOctal(input: string): ConversionResult {
  const decResult = binaryToDecimal(input);
  if (!decResult.success) return decResult;
  return decimalToOctal(decResult.output);
}

// ===============================
// HSL 역변환
// ===============================

export function hslToHex(input: string): ConversionResult {
  try {
    const match = input.match(/(\d+)\s*,\s*(\d+)%?\s*,\s*(\d+)%?/);
    if (!match) {
      return {
        success: false,
        output: "",
        error: "Invalid HSL format. Use: h, s%, l% or hsl(h, s%, l%)",
      };
    }

    const h = parseInt(match[1]) / 360;
    const s = parseInt(match[2]) / 100;
    const l = parseInt(match[3]) / 100;

    const { r, g, b } = hslToRgbValues(h, s, l);
    const toHex = (n: number) =>
      Math.round(n * 255)
        .toString(16)
        .padStart(2, "0");

    return {
      success: true,
      output: `#${toHex(r)}${toHex(g)}${toHex(b)}`.toUpperCase(),
    };
  } catch (e) {
    return {
      success: false,
      output: "",
      error: e instanceof Error ? e.message : "Conversion failed",
    };
  }
}

export function hslToRgb(input: string): ConversionResult {
  try {
    const match = input.match(/(\d+)\s*,\s*(\d+)%?\s*,\s*(\d+)%?/);
    if (!match) {
      return {
        success: false,
        output: "",
        error: "Invalid HSL format. Use: h, s%, l% or hsl(h, s%, l%)",
      };
    }

    const h = parseInt(match[1]) / 360;
    const s = parseInt(match[2]) / 100;
    const l = parseInt(match[3]) / 100;

    const { r, g, b } = hslToRgbValues(h, s, l);

    return {
      success: true,
      output: `rgb(${Math.round(r * 255)}, ${Math.round(g * 255)}, ${Math.round(b * 255)})`,
    };
  } catch (e) {
    return {
      success: false,
      output: "",
      error: e instanceof Error ? e.message : "Conversion failed",
    };
  }
}

function hslToRgbValues(
  h: number,
  s: number,
  l: number,
): { r: number; g: number; b: number } {
  let r: number, g: number, b: number;

  if (s === 0) {
    r = g = b = l;
  } else {
    const hue2rgb = (p: number, q: number, t: number) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    };

    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }

  return { r, g, b };
}

// ===============================
// HTML Entity 변환
// ===============================

const HTML_ENTITIES: Record<string, string> = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;",
  "/": "&#x2F;",
  "`": "&#x60;",
  "=": "&#x3D;",
};

export function textToHtmlEntity(input: string): ConversionResult {
  try {
    const output = input.replace(
      /[&<>"'`=\/]/g,
      (char) => HTML_ENTITIES[char] || char,
    );
    return { success: true, output };
  } catch (e) {
    return {
      success: false,
      output: "",
      error: e instanceof Error ? e.message : "Encoding failed",
    };
  }
}

export function htmlEntityToText(input: string): ConversionResult {
  try {
    const textarea =
      typeof document !== "undefined"
        ? document.createElement("textarea")
        : null;

    if (textarea) {
      textarea.innerHTML = input;
      return { success: true, output: textarea.value };
    }

    // Server-side fallback
    const output = input
      .replace(/&amp;/g, "&")
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">")
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'")
      .replace(/&#x2F;/g, "/")
      .replace(/&#x60;/g, "`")
      .replace(/&#x3D;/g, "=")
      .replace(/&#(\d+);/g, (_, code) => String.fromCharCode(parseInt(code)))
      .replace(/&#x([0-9a-fA-F]+);/g, (_, code) =>
        String.fromCharCode(parseInt(code, 16)),
      );

    return { success: true, output };
  } catch (e) {
    return {
      success: false,
      output: "",
      error: e instanceof Error ? e.message : "Decoding failed",
    };
  }
}

// ===============================
// ASCII 변환
// ===============================

export function textToAscii(input: string): ConversionResult {
  try {
    const codes = Array.from(input).map((char) => char.charCodeAt(0));
    return { success: true, output: codes.join(" ") };
  } catch (e) {
    return {
      success: false,
      output: "",
      error: e instanceof Error ? e.message : "Conversion failed",
    };
  }
}

export function asciiToText(input: string): ConversionResult {
  try {
    const codes = input
      .trim()
      .split(/[\s,]+/)
      .map((s) => parseInt(s.trim()));
    if (codes.some(isNaN)) {
      return { success: false, output: "", error: "Invalid ASCII codes" };
    }
    const output = String.fromCharCode(...codes);
    return { success: true, output };
  } catch (e) {
    return {
      success: false,
      output: "",
      error: e instanceof Error ? e.message : "Conversion failed",
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

export function textToSha1(input: string): ConversionResult {
  try {
    const output = CryptoJS.SHA1(input).toString();
    return { success: true, output };
  } catch (e) {
    return {
      success: false,
      output: "",
      error: e instanceof Error ? e.message : "Hash generation failed",
    };
  }
}

export function textToSha512(input: string): ConversionResult {
  try {
    const output = CryptoJS.SHA512(input).toString();
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
    // 데이터 직렬화
    "json-to-yaml": jsonToYaml,
    "yaml-to-json": yamlToJson,
    "json-to-csv": jsonToCsv,
    "csv-to-json": csvToJson,
    "json-to-xml": jsonToXml,
    "xml-to-json": xmlToJson,
    "json-to-toml": jsonToToml,
    "toml-to-json": tomlToJson,
    "yaml-to-xml": (input) => {
      const jsonResult = yamlToJson(input);
      if (!jsonResult.success) return jsonResult;
      return jsonToXml(jsonResult.output);
    },
    "xml-to-yaml": (input) => {
      const jsonResult = xmlToJson(input);
      if (!jsonResult.success) return jsonResult;
      return jsonToYaml(jsonResult.output);
    },
    "yaml-to-csv": (input) => {
      const jsonResult = yamlToJson(input);
      if (!jsonResult.success) return jsonResult;
      return jsonToCsv(jsonResult.output);
    },
    "csv-to-yaml": (input) => {
      const jsonResult = csvToJson(input);
      if (!jsonResult.success) return jsonResult;
      return jsonToYaml(jsonResult.output);
    },
    "yaml-to-toml": (input) => {
      const jsonResult = yamlToJson(input);
      if (!jsonResult.success) return jsonResult;
      return jsonToToml(jsonResult.output);
    },
    "toml-to-yaml": (input) => {
      const jsonResult = tomlToJson(input);
      if (!jsonResult.success) return jsonResult;
      return jsonToYaml(jsonResult.output);
    },
    "xml-to-csv": (input) => {
      const jsonResult = xmlToJson(input);
      if (!jsonResult.success) return jsonResult;
      return jsonToCsv(jsonResult.output);
    },
    "csv-to-xml": (input) => {
      const jsonResult = csvToJson(input);
      if (!jsonResult.success) return jsonResult;
      return jsonToXml(jsonResult.output);
    },
    "xml-to-toml": (input) => {
      const jsonResult = xmlToJson(input);
      if (!jsonResult.success) return jsonResult;
      return jsonToToml(jsonResult.output);
    },
    "toml-to-xml": (input) => {
      const jsonResult = tomlToJson(input);
      if (!jsonResult.success) return jsonResult;
      return jsonToXml(jsonResult.output);
    },
    "csv-to-toml": (input) => {
      const jsonResult = csvToJson(input);
      if (!jsonResult.success) return jsonResult;
      return jsonToToml(jsonResult.output);
    },
    "toml-to-csv": (input) => {
      const jsonResult = tomlToJson(input);
      if (!jsonResult.success) return jsonResult;
      return jsonToCsv(jsonResult.output);
    },

    // 인코딩/디코딩
    "text-to-base64": textToBase64,
    "base64-to-text": base64ToText,
    "url-encode": urlEncode,
    "url-decode": urlDecode,
    "text-to-html-entity": textToHtmlEntity,
    "html-entity-to-text": htmlEntityToText,
    "text-to-ascii": textToAscii,
    "ascii-to-text": asciiToText,

    // 색상 변환
    "hex-to-rgb": hexToRgb,
    "rgb-to-hex": rgbToHex,
    "hex-to-hsl": hexToHsl,
    "rgb-to-hsl": rgbToHsl,
    "hsl-to-hex": hslToHex,
    "hsl-to-rgb": hslToRgb,

    // 숫자 진법 변환
    "decimal-to-binary": decimalToBinary,
    "binary-to-decimal": binaryToDecimal,
    "decimal-to-hex": decimalToHex,
    "hex-to-decimal": hexToDecimal,
    "decimal-to-octal": decimalToOctal,
    "octal-to-decimal": octalToDecimal,
    "binary-to-hex": binaryToHex,
    "hex-to-binary": hexToBinary,
    "binary-to-octal": binaryToOctal,
    "octal-to-binary": octalToBinary,
    "octal-to-hex": octalToHex,
    "hex-to-octal": hexToOctal,

    // 해시 생성
    "md5-hash-generator": textToMd5,
    "sha256-hash-generator": textToSha256,
    "sha1-hash-generator": textToSha1,
    "sha512-hash-generator": textToSha512,

    // 시간 변환
    "unix-to-date": unixToDate,
    "date-to-unix": dateToUnix,

    // 코드 변환 (플레이스홀더)
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
