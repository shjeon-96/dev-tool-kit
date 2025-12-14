"use client";

import { useState } from "react";
import { useBaseConverter, type NumberBase } from "../model/use-base-converter";
import { Button, Input, Label } from "@/shared/ui";
import { Copy, Check, RotateCcw } from "lucide-react";

interface BaseInputProps {
  label: string;
  base: NumberBase;
  value: string;
  sourceBase: NumberBase;
  onInputChange: (value: string, base: NumberBase) => void;
  onCopy: (text: string) => Promise<boolean>;
}

function BaseInput({
  label,
  base,
  value,
  sourceBase,
  onInputChange,
  onCopy,
}: BaseInputProps) {
  const [copied, setCopied] = useState(false);
  const isSource = sourceBase === base;
  const inputId = `base-${base}-input`;

  const handleCopy = async () => {
    if (value) {
      const success = await onCopy(value);
      if (success) {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <Label
          htmlFor={inputId}
          className={isSource ? "text-primary font-medium" : ""}
        >
          {label}
          {isSource && <span className="ml-2 text-xs">(입력)</span>}
        </Label>
        <Button
          variant="ghost"
          size="icon-sm"
          onClick={handleCopy}
          disabled={!value}
          aria-label={copied ? "Copied to clipboard" : `Copy ${label} value`}
        >
          {copied ? (
            <Check className="h-3 w-3" aria-hidden="true" />
          ) : (
            <Copy className="h-3 w-3" aria-hidden="true" />
          )}
        </Button>
      </div>
      <Input
        id={inputId}
        type="text"
        value={value}
        onChange={(e) => onInputChange(e.target.value, base)}
        placeholder={`${base}진수 입력`}
        className={`font-mono ${isSource ? "border-primary" : ""}`}
        aria-label={`Enter ${label}`}
      />
    </div>
  );
}

export function BaseConverter() {
  const {
    input,
    sourceBase,
    convertedValues,
    error,
    handleInputChange,
    copyToClipboard,
    handleClear,
  } = useBaseConverter();

  const bases: {
    label: string;
    base: NumberBase;
    key: keyof NonNullable<typeof convertedValues>;
  }[] = [
    { label: "2진수 (Binary)", base: 2, key: "binary" },
    { label: "8진수 (Octal)", base: 8, key: "octal" },
    { label: "10진수 (Decimal)", base: 10, key: "decimal" },
    { label: "16진수 (Hexadecimal)", base: 16, key: "hexadecimal" },
  ];

  const getValue = (
    base: NumberBase,
    key: keyof NonNullable<typeof convertedValues>,
  ): string => {
    if (sourceBase === base) return input;
    return convertedValues?.[key] || "";
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          아무 진법의 입력 필드에 숫자를 입력하면 자동으로 다른 진법으로
          변환됩니다.
        </p>
        <Button
          variant="outline"
          size="sm"
          onClick={handleClear}
          aria-label="Reset all values"
        >
          <RotateCcw className="h-4 w-4 mr-2" aria-hidden="true" />
          초기화
        </Button>
      </div>

      {/* Error Display */}
      {error && (
        <div
          role="alert"
          aria-live="polite"
          className="rounded-lg border border-destructive bg-destructive/10 p-4 text-destructive"
        >
          {error}
        </div>
      )}

      {/* Converters */}
      <div className="grid gap-4 md:grid-cols-2">
        {bases.map(({ label, base, key }) => (
          <div key={base} className="rounded-lg border p-4">
            <BaseInput
              label={label}
              base={base}
              value={getValue(base, key)}
              sourceBase={sourceBase}
              onInputChange={handleInputChange}
              onCopy={copyToClipboard}
            />
          </div>
        ))}
      </div>

      {/* Quick Reference */}
      <div className="rounded-lg border p-4">
        <h3 className="font-medium mb-3">빠른 참조</h3>
        <div className="grid grid-cols-4 gap-4 text-sm">
          <div>
            <p className="text-muted-foreground mb-1">10진수</p>
            <p className="font-mono">0-9</p>
          </div>
          <div>
            <p className="text-muted-foreground mb-1">2진수</p>
            <p className="font-mono">0-1</p>
          </div>
          <div>
            <p className="text-muted-foreground mb-1">8진수</p>
            <p className="font-mono">0-7</p>
          </div>
          <div>
            <p className="text-muted-foreground mb-1">16진수</p>
            <p className="font-mono">0-9, A-F</p>
          </div>
        </div>
      </div>
    </div>
  );
}
