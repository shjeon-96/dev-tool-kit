"use client";

import { useState } from "react";
import { Check, Clipboard, RotateCcw, ShieldCheck } from "lucide-react";
import type { ToolSlug } from "@/shared/config/tools";
import type { getDictionary } from "@/shared/i18n/dictionaries";

type Dictionary = ReturnType<typeof getDictionary>;
type ToolCopy = Dictionary["tools"][ToolSlug];
type CommonCopy = Dictionary["common"];

function bytesToBase64(bytes: Uint8Array) {
  let binary = "";
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary);
}

function base64ToText(value: string) {
  const binary = atob(value.trim());
  const bytes = Uint8Array.from(binary, (character) => character.charCodeAt(0));
  return new TextDecoder("utf-8", { fatal: true }).decode(bytes);
}

function CopyButton({ value, common }: { value: string; common: CommonCopy }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    if (!value) return;
    await navigator.clipboard.writeText(value);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  }

  return (
    <button
      className="button button-copy"
      type="button"
      onClick={copy}
      disabled={!value}
    >
      {copied ? (
        <Check aria-hidden="true" size={16} />
      ) : (
        <Clipboard aria-hidden="true" size={16} />
      )}
      {copied ? common.copied : common.copy}
    </button>
  );
}

function WorkbenchHeader({ common }: { common: CommonCopy }) {
  return (
    <div className="workbench-header">
      <span className="workbench-lamp" aria-hidden="true" />
      <span>{common.privateBadge}</span>
      <span className="workbench-security">
        <ShieldCheck aria-hidden="true" size={15} />
        {common.browserOnly}
      </span>
    </div>
  );
}

function ErrorMessage({ message }: { message: string }) {
  return message ? (
    <p className="workbench-error" role="alert">
      {message}
    </p>
  ) : null;
}

function TextConverter({
  slug,
  copy,
  common,
}: {
  slug: "json-formatter" | "base64-converter" | "url-encoder";
  copy: ToolCopy;
  common: CommonCopy;
}) {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");

  function transform(mode: "primary" | "secondary") {
    try {
      let result = "";
      if (slug === "json-formatter") {
        const parsed: unknown = JSON.parse(input);
        result =
          mode === "primary"
            ? JSON.stringify(parsed, null, 2)
            : JSON.stringify(parsed);
      } else if (slug === "base64-converter") {
        result =
          mode === "primary"
            ? bytesToBase64(new TextEncoder().encode(input))
            : base64ToText(input);
      } else {
        result =
          mode === "primary"
            ? encodeURIComponent(input)
            : decodeURIComponent(input);
      }
      setOutput(result);
      setError("");
    } catch (caught) {
      setOutput("");
      setError(caught instanceof Error ? caught.message : common.error);
    }
  }

  function clear() {
    setInput("");
    setOutput("");
    setError("");
  }

  return (
    <div className="workbench">
      <WorkbenchHeader common={common} />
      <div className="workbench-columns">
        <label className="field-panel">
          <span>{copy.inputLabel}</span>
          <textarea
            value={input}
            onChange={(event) => setInput(event.target.value)}
            placeholder={copy.placeholder}
            spellCheck={false}
          />
        </label>
        <label className="field-panel output-panel">
          <span>{copy.outputLabel}</span>
          <textarea
            value={output}
            readOnly
            placeholder="—"
            spellCheck={false}
          />
          <CopyButton value={output} common={common} />
        </label>
      </div>
      <ErrorMessage message={error} />
      <div className="workbench-actions">
        <button
          className="button button-primary"
          type="button"
          onClick={() => transform("primary")}
        >
          {copy.primaryAction}
        </button>
        <button
          className="button button-secondary"
          type="button"
          onClick={() => transform("secondary")}
        >
          {copy.secondaryAction}
        </button>
        <button className="button button-quiet" type="button" onClick={clear}>
          <RotateCcw aria-hidden="true" size={16} /> {common.clear}
        </button>
      </div>
    </div>
  );
}

function UuidWorkbench({
  copy,
  common,
}: {
  copy: ToolCopy;
  common: CommonCopy;
}) {
  const [quantity, setQuantity] = useState(4);
  const [values, setValues] = useState<string[]>([]);

  function generate() {
    setValues(Array.from({ length: quantity }, () => crypto.randomUUID()));
  }

  return (
    <div className="workbench">
      <WorkbenchHeader common={common} />
      <div className="workbench-control-row">
        <label>
          <span>{copy.inputLabel}</span>
          <input
            type="number"
            min={1}
            max={20}
            value={quantity}
            onChange={(event) =>
              setQuantity(Math.min(20, Math.max(1, Number(event.target.value))))
            }
          />
        </label>
        <button
          className="button button-primary"
          type="button"
          onClick={generate}
        >
          {copy.primaryAction}
        </button>
      </div>
      <div className="result-list" aria-live="polite">
        {values.length ? (
          values.map((value) => <code key={value}>{value}</code>)
        ) : (
          <span>—</span>
        )}
      </div>
      <div className="workbench-actions">
        <CopyButton value={values.join("\n")} common={common} />
      </div>
    </div>
  );
}

function TimestampWorkbench({
  copy,
  common,
}: {
  copy: ToolCopy;
  common: CommonCopy;
}) {
  const [input, setInput] = useState("");
  const [rows, setRows] = useState<readonly [string, string][]>([]);
  const [error, setError] = useState("");

  function localInputValue(date: Date) {
    const offset = date.getTimezoneOffset() * 60_000;
    return new Date(date.getTime() - offset).toISOString().slice(0, 16);
  }

  function convert(value = input) {
    try {
      const date = new Date(value);
      if (!value || Number.isNaN(date.getTime())) throw new Error(common.error);
      setRows([
        ["Unix seconds", Math.floor(date.getTime() / 1000).toString()],
        ["Unix milliseconds", date.getTime().toString()],
        ["ISO 8601", date.toISOString()],
        ["UTC", date.toUTCString()],
        ["Local", date.toString()],
      ]);
      setError("");
    } catch (caught) {
      setRows([]);
      setError(caught instanceof Error ? caught.message : common.error);
    }
  }

  function useNow() {
    const value = localInputValue(new Date());
    setInput(value);
    convert(value);
  }

  const textOutput = rows
    .map(([label, value]) => `${label}: ${value}`)
    .join("\n");

  return (
    <div className="workbench">
      <WorkbenchHeader common={common} />
      <div className="workbench-control-row">
        <label>
          <span>{copy.inputLabel}</span>
          <input
            type="datetime-local"
            value={input}
            onChange={(event) => setInput(event.target.value)}
          />
        </label>
        <button
          className="button button-primary"
          type="button"
          onClick={() => convert()}
        >
          {copy.primaryAction}
        </button>
        <button
          className="button button-secondary"
          type="button"
          onClick={useNow}
        >
          {copy.secondaryAction}
        </button>
      </div>
      <ErrorMessage message={error} />
      <dl className="timestamp-results">
        {rows.length ? (
          rows.map(([label, value]) => (
            <div key={label}>
              <dt>{label}</dt>
              <dd>{value}</dd>
            </div>
          ))
        ) : (
          <div>
            <dt>{copy.outputLabel}</dt>
            <dd>—</dd>
          </div>
        )}
      </dl>
      <div className="workbench-actions">
        <CopyButton value={textOutput} common={common} />
      </div>
    </div>
  );
}

function HashWorkbench({
  copy,
  common,
}: {
  copy: ToolCopy;
  common: CommonCopy;
}) {
  const [input, setInput] = useState("");
  const [algorithm, setAlgorithm] = useState("SHA-256");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");

  async function generate() {
    try {
      const digest = await crypto.subtle.digest(
        algorithm,
        new TextEncoder().encode(input),
      );
      const hex = Array.from(new Uint8Array(digest), (byte) =>
        byte.toString(16).padStart(2, "0"),
      ).join("");
      setOutput(hex);
      setError("");
    } catch (caught) {
      setOutput("");
      setError(caught instanceof Error ? caught.message : common.error);
    }
  }

  return (
    <div className="workbench">
      <WorkbenchHeader common={common} />
      <label className="field-panel hash-input">
        <span>{copy.inputLabel}</span>
        <textarea
          value={input}
          onChange={(event) => setInput(event.target.value)}
          placeholder={copy.placeholder}
        />
      </label>
      <div className="workbench-control-row">
        <label>
          <span>{copy.secondaryAction}</span>
          <select
            value={algorithm}
            onChange={(event) => setAlgorithm(event.target.value)}
          >
            <option>SHA-256</option>
            <option>SHA-384</option>
            <option>SHA-512</option>
          </select>
        </label>
        <button
          className="button button-primary"
          type="button"
          onClick={generate}
        >
          {copy.primaryAction}
        </button>
      </div>
      <ErrorMessage message={error} />
      <div className="hash-output">
        <span>{copy.outputLabel}</span>
        <code>{output || "—"}</code>
        <CopyButton value={output} common={common} />
      </div>
    </div>
  );
}

type ExtendedTextSlug = Exclude<
  ToolSlug,
  | "json-formatter"
  | "base64-converter"
  | "uuid-generator"
  | "timestamp-converter"
  | "url-encoder"
  | "hash-generator"
  | "regex-tester"
  | "password-generator"
>;

const SAMPLE_VALUES: Partial<Record<ExtendedTextSlug, string>> = {
  "jwt-decoder":
    "eyJhbGciOiJub25lIiwidHlwIjoiSldUIn0.eyJzdWIiOiIxMjM0IiwibmFtZSI6IkFkYSIsImV4cCI6MTg5MzQ1NjAwMH0.",
  "color-converter": "#ff6b35",
  "case-converter": "customer account status",
  "number-base-converter": "0xff",
};

function decodeBase64Url(value: string) {
  const normalized = value.replace(/-/g, "+").replace(/_/g, "/");
  const padded = normalized.padEnd(Math.ceil(normalized.length / 4) * 4, "=");
  return base64ToText(padded);
}

function decodeJwt(value: string) {
  const parts = value.trim().split(".");
  if (parts.length !== 3) throw new Error("JWT must contain three segments.");
  const header = JSON.parse(decodeBase64Url(parts[0]));
  const payload = JSON.parse(decodeBase64Url(parts[1]));
  return JSON.stringify(
    {
      header,
      payload,
      timestamps: {
        issuedAt: payload.iat
          ? new Date(payload.iat * 1000).toISOString()
          : null,
        expiresAt: payload.exp
          ? new Date(payload.exp * 1000).toISOString()
          : null,
      },
      signatureVerified: false,
    },
    null,
    2,
  );
}

function encodeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function decodeHtml(value: string) {
  const textarea = document.createElement("textarea");
  textarea.innerHTML = value;
  return textarea.value;
}

function convertColor(value: string) {
  const trimmed = value.trim();
  let red: number;
  let green: number;
  let blue: number;
  const hex = trimmed.match(/^#([\da-f]{3}|[\da-f]{6})$/i);
  const rgb = trimmed.match(
    /^rgba?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})(?:\s*,\s*[\d.]+)?\s*\)$/i,
  );
  if (hex) {
    const digits =
      hex[1].length === 3
        ? hex[1]
            .split("")
            .map((digit) => digit + digit)
            .join("")
        : hex[1];
    red = Number.parseInt(digits.slice(0, 2), 16);
    green = Number.parseInt(digits.slice(2, 4), 16);
    blue = Number.parseInt(digits.slice(4, 6), 16);
  } else if (rgb) {
    [red, green, blue] = rgb.slice(1).map(Number);
    if ([red, green, blue].some((channel) => channel > 255))
      throw new Error("RGB channels must be between 0 and 255.");
  } else {
    throw new Error("Enter a 3/6-digit HEX value or an RGB color.");
  }
  const channels = [red, green, blue].map((channel) => channel / 255);
  const max = Math.max(...channels);
  const min = Math.min(...channels);
  const delta = max - min;
  let hue = 0;
  if (delta) {
    if (max === channels[0]) hue = ((channels[1] - channels[2]) / delta) % 6;
    else if (max === channels[1]) hue = (channels[2] - channels[0]) / delta + 2;
    else hue = (channels[0] - channels[1]) / delta + 4;
    hue = Math.round(hue * 60);
    if (hue < 0) hue += 360;
  }
  const lightness = (max + min) / 2;
  const saturation = delta ? delta / (1 - Math.abs(2 * lightness - 1)) : 0;
  const normalizedHex = `#${[red, green, blue]
    .map((channel) => channel.toString(16).padStart(2, "0"))
    .join("")}`;
  return [
    `HEX: ${normalizedHex}`,
    `RGB: rgb(${red}, ${green}, ${blue})`,
    `HSL: hsl(${hue}, ${Math.round(saturation * 100)}%, ${Math.round(lightness * 100)}%)`,
  ].join("\n");
}

function caseWords(value: string) {
  return (
    value
      .normalize("NFKC")
      .replace(/([a-z\d])([A-Z])/g, "$1 $2")
      .match(/[\p{L}\p{N}]+/gu)
      ?.map((word) => word.toLocaleLowerCase()) ?? []
  );
}

function caseVariants(value: string) {
  const words = caseWords(value);
  if (!words.length) throw new Error("Enter at least one letter or number.");
  const capitalize = (word: string) =>
    word[0].toLocaleUpperCase() + word.slice(1);
  return [
    `camelCase: ${words[0]}${words.slice(1).map(capitalize).join("")}`,
    `PascalCase: ${words.map(capitalize).join("")}`,
    `snake_case: ${words.join("_")}`,
    `kebab-case: ${words.join("-")}`,
    `UPPERCASE: ${words.join(" ").toLocaleUpperCase()}`,
    `lowercase: ${words.join(" ")}`,
  ].join("\n");
}

function generateSlug(value: string, preserveUnicode: boolean) {
  const normalized = preserveUnicode
    ? value.normalize("NFKC")
    : value.normalize("NFKD").replace(/[\u0300-\u036f]/g, "");
  const pattern = preserveUnicode ? /[^\p{L}\p{N}]+/gu : /[^a-zA-Z0-9]+/g;
  return normalized
    .toLocaleLowerCase()
    .replace(pattern, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/-{2,}/g, "-");
}

function convertNumberBase(value: string) {
  const trimmed = value.trim().replace(/_/g, "");
  if (!/^[+-]?(?:0[xX][\da-fA-F]+|0[bB][01]+|0[oO][0-7]+|\d+)$/.test(trimmed))
    throw new Error(
      "Enter a whole number with an optional 0x, 0b or 0o prefix.",
    );
  const number = BigInt(trimmed);
  const zero = BigInt(0);
  const sign = number < zero ? "-" : "";
  const absolute = number < zero ? -number : number;
  return [
    `Binary: ${sign}0b${absolute.toString(2)}`,
    `Octal: ${sign}0o${absolute.toString(8)}`,
    `Decimal: ${number.toString(10)}`,
    `Hexadecimal: ${sign}0x${absolute.toString(16).toUpperCase()}`,
  ].join("\n");
}

function parseCsv(value: string) {
  const rows: string[][] = [[""]];
  let quoted = false;
  const append = (character: string) => {
    const row = rows[rows.length - 1];
    row[row.length - 1] += character;
  };
  for (let index = 0; index < value.length; index += 1) {
    const character = value[index];
    if (quoted) {
      if (character === '"' && value[index + 1] === '"') {
        append('"');
        index += 1;
      } else if (character === '"') quoted = false;
      else append(character);
    } else if (character === '"') quoted = true;
    else if (character === ",") rows.at(-1)!.push("");
    else if (character === "\n") rows.push([""]);
    else if (character !== "\r") append(character);
  }
  if (quoted) throw new Error("CSV contains an unclosed quoted field.");
  if (rows.at(-1)?.length === 1 && rows.at(-1)?.[0] === "") rows.pop();
  const headers = rows.shift()?.map((header) => header.trim()) ?? [];
  if (!headers.length || headers.some((header) => !header))
    throw new Error("CSV needs a non-empty header row.");
  return rows.map((row) =>
    Object.fromEntries(
      headers.map((header, index) => [header, row[index] ?? ""]),
    ),
  );
}

function jsonToCsv(value: string) {
  const rows: unknown = JSON.parse(value);
  if (
    !Array.isArray(rows) ||
    !rows.every((row) => row && typeof row === "object" && !Array.isArray(row))
  )
    throw new Error("Enter a JSON array of objects.");
  const headers = Array.from(new Set(rows.flatMap((row) => Object.keys(row))));
  if (!headers.length)
    throw new Error("JSON objects need at least one property.");
  const escape = (cell: unknown) => {
    const text =
      cell == null
        ? ""
        : typeof cell === "object"
          ? JSON.stringify(cell)
          : String(cell);
    return /[",\n\r]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text;
  };
  return [headers, ...rows.map((row) => headers.map((header) => row[header]))]
    .map((row) => row.map(escape).join(","))
    .join("\n");
}

function parseQuery(value: string) {
  const query = value
    .trim()
    .replace(/^[^?]*\?/, "")
    .replace(/^\?/, "");
  const result: Record<string, string | string[]> = {};
  for (const [key, item] of new URLSearchParams(query)) {
    const current = result[key];
    result[key] =
      current === undefined
        ? item
        : Array.isArray(current)
          ? [...current, item]
          : [current, item];
  }
  return JSON.stringify(result, null, 2);
}

function buildQuery(value: string) {
  const source: unknown = JSON.parse(value);
  if (!source || typeof source !== "object" || Array.isArray(source))
    throw new Error("Enter a JSON object.");
  const params = new URLSearchParams();
  for (const [key, raw] of Object.entries(source)) {
    const values = Array.isArray(raw) ? raw : [raw];
    for (const item of values)
      if (item != null) params.append(key, String(item));
  }
  const query = params.toString();
  return query ? `?${query}` : "";
}

function toTypeName(value: string) {
  const words = caseWords(value);
  return (
    words.map((word) => word[0].toLocaleUpperCase() + word.slice(1)).join("") ||
    "Value"
  );
}

function jsonToTypeScript(value: string, aliases: boolean) {
  const source: unknown = JSON.parse(value);
  const definitions: string[] = [];
  const seen = new Set<string>();
  const infer = (item: unknown, name: string): string => {
    if (item === null) return "null";
    if (Array.isArray(item))
      return item.length ? `${infer(item[0], `${name}Item`)}[]` : "unknown[]";
    if (typeof item !== "object") return typeof item;
    const typeName = toTypeName(name);
    if (!seen.has(typeName)) {
      seen.add(typeName);
      const fields = Object.entries(item).map(([key, child]) => {
        const property = /^[A-Za-z_$][\w$]*$/.test(key)
          ? key
          : JSON.stringify(key);
        return `  ${property}: ${infer(child, key)};`;
      });
      definitions.unshift(
        aliases
          ? `type ${typeName} = {\n${fields.join("\n")}\n};`
          : `interface ${typeName} {\n${fields.join("\n")}\n}`,
      );
    }
    return typeName;
  };
  if (Array.isArray(source)) infer(source, "Root");
  else if (source && typeof source === "object") infer(source, "Root");
  else
    definitions.push(`${aliases ? "type" : "type"} Root = ${typeof source};`);
  return definitions.join("\n\n");
}

function textStatistics(value: string) {
  const words = value.match(/[\p{L}\p{N}]+(?:['’][\p{L}\p{N}]+)*/gu) ?? [];
  return [
    `Words: ${words.length}`,
    `Characters: ${Array.from(value).length}`,
    `Characters without spaces: ${Array.from(value.replace(/\s/gu, "")).length}`,
    `Lines: ${value ? value.split(/\r?\n/).length : 0}`,
    `UTF-8 bytes: ${new TextEncoder().encode(value).length}`,
  ].join("\n");
}

function transformExtended(
  slug: ExtendedTextSlug,
  input: string,
  secondary: boolean,
) {
  if (slug === "jwt-decoder") return decodeJwt(input);
  if (slug === "html-entity-converter")
    return secondary ? decodeHtml(input) : encodeHtml(input);
  if (slug === "color-converter") return convertColor(input);
  if (slug === "word-counter")
    return textStatistics(
      secondary ? input.trim().replace(/\s+/g, " ") : input,
    );
  if (slug === "case-converter") return caseVariants(input);
  if (slug === "slug-generator") return generateSlug(input, secondary);
  if (slug === "number-base-converter") return convertNumberBase(input);
  if (slug === "csv-json-converter")
    return secondary
      ? jsonToCsv(input)
      : JSON.stringify(parseCsv(input), null, 2);
  if (slug === "query-string-parser")
    return secondary ? buildQuery(input) : parseQuery(input);
  if (slug === "json-to-typescript") return jsonToTypeScript(input, secondary);
  if (slug === "text-sorter") {
    const lines = input.split(/\r?\n/);
    return lines
      .sort(
        (a, b) =>
          a.localeCompare(b, undefined, {
            numeric: true,
            sensitivity: "base",
          }) * (secondary ? -1 : 1),
      )
      .join("\n");
  }
  const seen = new Set<string>();
  return input
    .split(/\r?\n/)
    .filter((line) => {
      const key = secondary ? line.trim() : line;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    })
    .map((line) => (secondary ? line.trim() : line))
    .join("\n");
}

function ExtendedTextWorkbench({
  slug,
  copy,
  common,
}: {
  slug: ExtendedTextSlug;
  copy: ToolCopy;
  common: CommonCopy;
}) {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");

  function run(secondary = false) {
    try {
      const sample = secondary ? SAMPLE_VALUES[slug] : undefined;
      const source = sample ?? input;
      if (sample) setInput(sample);
      setOutput(transformExtended(slug, source, secondary && !sample));
      setError("");
    } catch (caught) {
      setOutput("");
      setError(caught instanceof Error ? caught.message : common.error);
    }
  }

  const swatch =
    slug === "color-converter"
      ? output.match(/HEX: (#[\da-f]{6})/i)?.[1]
      : undefined;
  return (
    <div className="workbench">
      <WorkbenchHeader common={common} />
      <div className="workbench-columns">
        <label className="field-panel">
          <span>{copy.inputLabel}</span>
          <textarea
            value={input}
            onChange={(event) => setInput(event.target.value)}
            placeholder={copy.placeholder}
            spellCheck={false}
          />
        </label>
        <label className="field-panel output-panel">
          <span>{copy.outputLabel}</span>
          {swatch ? (
            <i
              className="color-swatch"
              style={{ backgroundColor: swatch }}
              aria-label={swatch}
            />
          ) : null}
          <textarea
            value={output}
            readOnly
            placeholder="—"
            spellCheck={false}
          />
          <CopyButton value={output} common={common} />
        </label>
      </div>
      <ErrorMessage message={error} />
      <div className="workbench-actions">
        <button
          className="button button-primary"
          type="button"
          onClick={() => run()}
        >
          {copy.primaryAction}
        </button>
        <button
          className="button button-secondary"
          type="button"
          onClick={() => run(true)}
        >
          {copy.secondaryAction}
        </button>
        <button
          className="button button-quiet"
          type="button"
          onClick={() => {
            setInput("");
            setOutput("");
            setError("");
          }}
        >
          <RotateCcw aria-hidden="true" size={16} /> {common.clear}
        </button>
      </div>
    </div>
  );
}

function RegexWorkbench({
  copy,
  common,
}: {
  copy: ToolCopy;
  common: CommonCopy;
}) {
  const [pattern, setPattern] = useState("([A-Z]{2})-(\\d{4})");
  const [flags, setFlags] = useState("g");
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");

  function testPattern() {
    try {
      const expression = new RegExp(pattern, flags);
      const matches: { match: string; index: number; groups: string[] }[] = [];
      if (expression.global) {
        let match: RegExpExecArray | null;
        while ((match = expression.exec(input)) && matches.length < 500) {
          matches.push({
            match: match[0],
            index: match.index,
            groups: match.slice(1),
          });
          if (match[0] === "") expression.lastIndex += 1;
        }
      } else {
        const match = expression.exec(input);
        if (match)
          matches.push({
            match: match[0],
            index: match.index,
            groups: match.slice(1),
          });
      }
      setOutput(JSON.stringify({ count: matches.length, matches }, null, 2));
      setError("");
    } catch (caught) {
      setOutput("");
      setError(caught instanceof Error ? caught.message : common.error);
    }
  }

  return (
    <div className="workbench">
      <WorkbenchHeader common={common} />
      <div className="regex-controls">
        <label>
          <span>Pattern</span>
          <input
            value={pattern}
            onChange={(event) => setPattern(event.target.value)}
            spellCheck={false}
          />
        </label>
        <label>
          <span>Flags</span>
          <input
            value={flags}
            onChange={(event) => setFlags(event.target.value)}
            spellCheck={false}
          />
        </label>
      </div>
      <div className="workbench-columns">
        <label className="field-panel">
          <span>{copy.inputLabel}</span>
          <textarea
            value={input}
            onChange={(event) => setInput(event.target.value)}
            placeholder={copy.placeholder}
            spellCheck={false}
          />
        </label>
        <label className="field-panel output-panel">
          <span>{copy.outputLabel}</span>
          <textarea
            value={output}
            readOnly
            placeholder="—"
            spellCheck={false}
          />
          <CopyButton value={output} common={common} />
        </label>
      </div>
      <ErrorMessage message={error} />
      <div className="workbench-actions">
        <button
          className="button button-primary"
          type="button"
          onClick={testPattern}
        >
          {copy.primaryAction}
        </button>
        <button
          className="button button-secondary"
          type="button"
          onClick={() => {
            setPattern("([A-Z]{2})-(\\d{4})");
            setFlags("g");
            setInput("Order IDs: AB-1204, CD-9981");
          }}
        >
          {copy.secondaryAction}
        </button>
      </div>
    </div>
  );
}

function securePassword(length: number, characters: string) {
  if (!characters) throw new Error("Select at least one character set.");
  const result: string[] = [];
  const ceiling = 256 - (256 % characters.length);
  while (result.length < length) {
    const bytes = crypto.getRandomValues(
      new Uint8Array(length - result.length + 8),
    );
    for (const byte of bytes) {
      if (byte < ceiling) result.push(characters[byte % characters.length]);
      if (result.length === length) break;
    }
  }
  return result.join("");
}

function PasswordWorkbench({
  copy,
  common,
}: {
  copy: ToolCopy;
  common: CommonCopy;
}) {
  const [length, setLength] = useState(20);
  const [sets, setSets] = useState({
    upper: true,
    lower: true,
    numbers: true,
    symbols: true,
  });
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const labels = {
    upper: "A–Z",
    lower: "a–z",
    numbers: "0–9",
    symbols: "!@#$",
  } as const;
  function generate() {
    try {
      const characters = `${sets.upper ? "ABCDEFGHIJKLMNOPQRSTUVWXYZ" : ""}${sets.lower ? "abcdefghijklmnopqrstuvwxyz" : ""}${sets.numbers ? "0123456789" : ""}${sets.symbols ? "!@#$%^&*()-_=+[]{};:,.?" : ""}`;
      setOutput(securePassword(length, characters));
      setError("");
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : common.error);
    }
  }
  return (
    <div className="workbench">
      <WorkbenchHeader common={common} />
      <div className="password-controls">
        <label>
          <span>{copy.inputLabel}</span>
          <input
            type="range"
            min="12"
            max="64"
            value={length}
            onChange={(event) => setLength(Number(event.target.value))}
          />
          <strong>{length}</strong>
        </label>
        <div className="option-grid">
          {(Object.keys(labels) as (keyof typeof labels)[]).map((key) => (
            <label key={key}>
              <input
                type="checkbox"
                checked={sets[key]}
                onChange={(event) =>
                  setSets((current) => ({
                    ...current,
                    [key]: event.target.checked,
                  }))
                }
              />{" "}
              {labels[key]}
            </label>
          ))}
        </div>
      </div>
      <ErrorMessage message={error} />
      <div className="hash-output">
        <span>{copy.outputLabel}</span>
        <code>{output || "—"}</code>
        <CopyButton value={output} common={common} />
      </div>
      <div className="workbench-actions">
        <button
          className="button button-primary"
          type="button"
          onClick={generate}
        >
          {copy.primaryAction}
        </button>
      </div>
    </div>
  );
}

export function ToolWorkbench({
  slug,
  copy,
  common,
}: {
  slug: ToolSlug;
  copy: ToolCopy;
  common: CommonCopy;
}) {
  if (slug === "uuid-generator")
    return <UuidWorkbench copy={copy} common={common} />;
  if (slug === "timestamp-converter")
    return <TimestampWorkbench copy={copy} common={common} />;
  if (slug === "hash-generator")
    return <HashWorkbench copy={copy} common={common} />;
  if (slug === "regex-tester")
    return <RegexWorkbench copy={copy} common={common} />;
  if (slug === "password-generator")
    return <PasswordWorkbench copy={copy} common={common} />;
  if (
    slug === "jwt-decoder" ||
    slug === "html-entity-converter" ||
    slug === "color-converter" ||
    slug === "word-counter" ||
    slug === "case-converter" ||
    slug === "slug-generator" ||
    slug === "number-base-converter" ||
    slug === "csv-json-converter" ||
    slug === "query-string-parser" ||
    slug === "json-to-typescript" ||
    slug === "text-sorter" ||
    slug === "duplicate-line-remover"
  )
    return <ExtendedTextWorkbench slug={slug} copy={copy} common={common} />;
  return <TextConverter slug={slug} copy={copy} common={common} />;
}
