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
  return <TextConverter slug={slug} copy={copy} common={common} />;
}
