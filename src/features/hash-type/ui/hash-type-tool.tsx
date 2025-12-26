"use client";

import { useEffect } from "react";
import { Copy, Trash2, Hash, Key, AlertTriangle, Shield } from "lucide-react";
import { Button, Textarea, Input, Label } from "@/shared/ui";
import { useCopyToClipboard } from "@/shared/lib/hooks";
import { useHashType } from "../model/use-hash-type";
import type { HashType, LocaleKey } from "@/entities/hash-type";

interface HashTypeToolProps {
  hashType: HashType;
  locale: string;
}

export function HashTypeTool({ hashType, locale }: HashTypeToolProps) {
  const {
    input,
    setInput,
    output,
    compute,
    clear,
    isComputing,
    secretKey,
    setSecretKey,
  } = useHashType(hashType);

  const { copy, copied } = useCopyToClipboard();

  // 입력이 변경되면 자동 계산
  useEffect(() => {
    const timer = setTimeout(() => {
      if (input) {
        compute();
      }
    }, 300);
    return () => clearTimeout(timer);
  }, [input, compute, secretKey]);

  const isHmac = hashType.algorithm.toLowerCase().includes("hmac");
  const localeKey = locale as LocaleKey;

  const labels = {
    inputPlaceholder: {
      en: "Enter text to hash...",
      ko: "해시할 텍스트를 입력하세요...",
      ja: "ハッシュするテキストを入力...",
    },
    secretKeyPlaceholder: {
      en: "Enter secret key for HMAC...",
      ko: "HMAC용 비밀 키를 입력하세요...",
      ja: "HMAC用の秘密鍵を入力...",
    },
    output: {
      en: "Hash Output",
      ko: "해시 출력",
      ja: "ハッシュ出力",
    },
    copy: {
      en: "Copy",
      ko: "복사",
      ja: "コピー",
    },
    copied: {
      en: "Copied!",
      ko: "복사됨!",
      ja: "コピー完了!",
    },
    clear: {
      en: "Clear",
      ko: "지우기",
      ja: "クリア",
    },
    secretKey: {
      en: "Secret Key",
      ko: "비밀 키",
      ja: "秘密鍵",
    },
    securityWarning: {
      en: "Not recommended for security purposes",
      ko: "보안 목적으로 권장되지 않음",
      ja: "セキュリティ目的には非推奨",
    },
    secure: {
      en: "Secure for cryptographic use",
      ko: "암호화 용도로 안전",
      ja: "暗号用途に安全",
    },
  };

  return (
    <div className="space-y-6">
      {/* Security Badge */}
      <div className="flex items-center gap-2">
        {hashType.isSecure ? (
          <div className="flex items-center gap-1.5 text-success text-sm">
            <Shield className="h-4 w-4" />
            <span>{labels.secure[localeKey] || labels.secure.en}</span>
          </div>
        ) : (
          <div className="flex items-center gap-1.5 text-warning text-sm">
            <AlertTriangle className="h-4 w-4" />
            <span>
              {labels.securityWarning[localeKey] || labels.securityWarning.en}
            </span>
          </div>
        )}
        {hashType.outputLength && (
          <span className="text-xs text-muted-foreground ml-2">
            {hashType.outputLength}-bit
          </span>
        )}
      </div>

      {/* HMAC Secret Key Input */}
      {isHmac && (
        <div className="space-y-2">
          <Label className="flex items-center gap-2">
            <Key className="h-4 w-4" />
            {labels.secretKey[localeKey] || labels.secretKey.en}
          </Label>
          <Input
            type="password"
            value={secretKey}
            onChange={(e) => setSecretKey(e.target.value)}
            placeholder={
              labels.secretKeyPlaceholder[localeKey] ||
              labels.secretKeyPlaceholder.en
            }
          />
        </div>
      )}

      {/* Input */}
      <div className="space-y-2">
        <Textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={
            labels.inputPlaceholder[localeKey] || labels.inputPlaceholder.en
          }
          rows={4}
          className="font-mono text-sm"
        />
      </div>

      {/* Output */}
      <div className="space-y-2">
        <Label className="flex items-center gap-2">
          <Hash className="h-4 w-4" />
          {labels.output[localeKey] || labels.output.en}
        </Label>
        <div className="relative">
          <Textarea
            value={output}
            readOnly
            rows={3}
            className="font-mono text-sm pr-20 break-all"
            placeholder={isComputing ? "Computing..." : ""}
          />
          {output && (
            <Button
              size="sm"
              variant="ghost"
              className="absolute top-2 right-2"
              onClick={() => copy(output)}
            >
              <Copy className="h-4 w-4 mr-1" />
              {copied
                ? labels.copied[localeKey] || labels.copied.en
                : labels.copy[localeKey] || labels.copy.en}
            </Button>
          )}
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-2">
        <Button variant="outline" onClick={clear} className="flex-1">
          <Trash2 className="h-4 w-4 mr-2" />
          {labels.clear[localeKey] || labels.clear.en}
        </Button>
      </div>
    </div>
  );
}
