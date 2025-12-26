"use client";

import {
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Trash2,
  Search,
} from "lucide-react";
import { Button, Textarea, Label } from "@/shared/ui";
import { useValidateType } from "../model/use-validate-type";
import type { ValidateType, LocaleKey } from "@/entities/validate-type";

interface ValidateTypeToolProps {
  type: ValidateType;
  locale: string;
}

export function ValidateTypeTool({ type, locale }: ValidateTypeToolProps) {
  const { input, setInput, result, validate, clear, isProcessing } =
    useValidateType(type);

  const localeKey = locale as LocaleKey;

  const labels = {
    input: {
      en: "Input",
      ko: "입력",
      ja: "入力",
    },
    validate: {
      en: "Validate",
      ko: "검증",
      ja: "検証",
    },
    clear: {
      en: "Clear",
      ko: "지우기",
      ja: "クリア",
    },
    placeholder: {
      en: `Enter ${type.name} to validate...`,
      ko: `검증할 ${type.name}을(를) 입력하세요...`,
      ja: `検証する${type.name}を入力してください...`,
    },
    valid: {
      en: "Valid",
      ko: "유효함",
      ja: "有効",
    },
    invalid: {
      en: "Invalid",
      ko: "유효하지 않음",
      ja: "無効",
    },
    errors: {
      en: "Errors",
      ko: "오류",
      ja: "エラー",
    },
    warnings: {
      en: "Warnings",
      ko: "경고",
      ja: "警告",
    },
    details: {
      en: "Details",
      ko: "세부 정보",
      ja: "詳細",
    },
  };

  return (
    <div className="space-y-6">
      {/* Type Info Badge */}
      <div className="flex flex-wrap gap-2 text-xs">
        <span className="inline-flex items-center px-2 py-1 rounded-full bg-muted capitalize">
          {type.category}
        </span>
      </div>

      {/* Input */}
      <div className="space-y-2">
        <Label>{labels.input[localeKey] || labels.input.en}</Label>
        <Textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          rows={8}
          className="font-mono text-sm"
          placeholder={labels.placeholder[localeKey] || labels.placeholder.en}
        />
      </div>

      {/* Actions */}
      <div className="flex gap-2">
        <Button
          onClick={validate}
          disabled={isProcessing || !input.trim()}
          className="flex-1"
        >
          <Search className="h-4 w-4 mr-2" />
          {labels.validate[localeKey] || labels.validate.en}
        </Button>
        <Button variant="outline" onClick={clear}>
          <Trash2 className="h-4 w-4 mr-2" />
          {labels.clear[localeKey] || labels.clear.en}
        </Button>
      </div>

      {/* Result */}
      {result && (
        <div className="space-y-4">
          {/* Status */}
          <div
            className={`flex items-center gap-3 p-4 rounded-lg ${
              result.isValid ? "bg-success/10" : "bg-destructive/10"
            }`}
          >
            {result.isValid ? (
              <CheckCircle2 className="h-6 w-6 text-success" />
            ) : (
              <XCircle className="h-6 w-6 text-destructive" />
            )}
            <span
              className={`font-medium ${
                result.isValid ? "text-success" : "text-destructive"
              }`}
            >
              {result.isValid
                ? labels.valid[localeKey] || labels.valid.en
                : labels.invalid[localeKey] || labels.invalid.en}
            </span>
          </div>

          {/* Errors */}
          {result.errors.length > 0 && (
            <div className="space-y-2">
              <h4 className="font-medium flex items-center gap-2 text-destructive">
                <XCircle className="h-4 w-4" />
                {labels.errors[localeKey] || labels.errors.en} (
                {result.errors.length})
              </h4>
              <ul className="space-y-1 text-sm">
                {result.errors.map((error, index) => (
                  <li
                    key={index}
                    className="p-2 bg-destructive/10 rounded text-destructive"
                  >
                    {error}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Warnings */}
          {result.warnings.length > 0 && (
            <div className="space-y-2">
              <h4 className="font-medium flex items-center gap-2 text-warning">
                <AlertTriangle className="h-4 w-4" />
                {labels.warnings[localeKey] || labels.warnings.en} (
                {result.warnings.length})
              </h4>
              <ul className="space-y-1 text-sm">
                {result.warnings.map((warning, index) => (
                  <li
                    key={index}
                    className="p-2 bg-warning/10 rounded text-warning"
                  >
                    {warning}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Details */}
          {result.details && Object.keys(result.details).length > 0 && (
            <div className="space-y-2">
              <h4 className="font-medium">
                {labels.details[localeKey] || labels.details.en}
              </h4>
              <div className="grid grid-cols-2 gap-2 text-sm">
                {Object.entries(result.details).map(([key, value]) => (
                  <div key={key} className="p-2 bg-muted rounded">
                    <span className="text-muted-foreground">{key}: </span>
                    <span className="font-mono">{String(value)}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
