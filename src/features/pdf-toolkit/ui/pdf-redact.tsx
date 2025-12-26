"use client";

import { useState, useCallback } from "react";
import { useTranslations } from "next-intl";
import {
  Upload,
  Shield,
  CreditCard,
  Phone,
  Mail,
  User,
  Search,
  Download,
  AlertTriangle,
  CheckCircle,
  FileText,
  Tag,
  X,
  Plus,
} from "lucide-react";
import { Button } from "@/shared/ui";
import { Label } from "@/shared/ui";
import { Input } from "@/shared/ui";
import { Checkbox } from "@/shared/ui";
import { RadioGroup, RadioGroupItem } from "@/shared/ui";
import type {
  PDFFile,
  RedactPattern,
  RedactOptions,
  RedactMatch,
} from "../lib/types";
import { REDACT_PATTERNS, scanPDF, redactPDF } from "../lib/redact";
import { cn } from "@/shared/lib/utils";

interface PdfRedactProps {
  files: PDFFile[];
  isProcessing: boolean;
  progress: number;
  downloadBlob: (blob: Blob, filename: string) => void;
}

const PATTERN_ICONS: Record<RedactPattern, typeof CreditCard> = {
  creditCard: CreditCard,
  ssn: User,
  phone: Phone,
  email: Mail,
  custom: Tag,
};

export function PdfRedact({
  files,
  isProcessing,
  progress,
  downloadBlob,
}: PdfRedactProps) {
  const t = useTranslations("tools.pdf-toolkit");
  const tc = useTranslations("common");

  const [selectedPatterns, setSelectedPatterns] = useState<RedactPattern[]>([
    "creditCard",
    "ssn",
  ]);
  const [customKeywords, setCustomKeywords] = useState<string[]>([]);
  const [newKeyword, setNewKeyword] = useState("");
  const [redactColor, setRedactColor] = useState<"black" | "white" | "gray">(
    "black",
  );
  const [scanResult, setScanResult] = useState<{
    matches: RedactMatch[];
    scanned: boolean;
  }>({ matches: [], scanned: false });
  const [localProcessing, setLocalProcessing] = useState(false);
  const [localProgress, setLocalProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const selectedFile = files[0];

  const togglePattern = useCallback((pattern: RedactPattern) => {
    setSelectedPatterns((prev) =>
      prev.includes(pattern)
        ? prev.filter((p) => p !== pattern)
        : [...prev, pattern],
    );
    setScanResult({ matches: [], scanned: false });
  }, []);

  const addKeyword = useCallback(() => {
    if (newKeyword.trim() && !customKeywords.includes(newKeyword.trim())) {
      setCustomKeywords((prev) => [...prev, newKeyword.trim()]);
      if (!selectedPatterns.includes("custom")) {
        setSelectedPatterns((prev) => [...prev, "custom"]);
      }
      setNewKeyword("");
      setScanResult({ matches: [], scanned: false });
    }
  }, [newKeyword, customKeywords, selectedPatterns]);

  const removeKeyword = useCallback((keyword: string) => {
    setCustomKeywords((prev) => prev.filter((k) => k !== keyword));
    setScanResult({ matches: [], scanned: false });
  }, []);

  const handleScan = useCallback(async () => {
    if (!selectedFile) return;

    setLocalProcessing(true);
    setError(null);

    const options: RedactOptions = {
      patterns: selectedPatterns,
      customKeywords,
      redactColor,
    };

    const result = await scanPDF(selectedFile.file, options);

    if (result.error) {
      setError(result.error);
    } else {
      setScanResult({ matches: result.matches, scanned: true });
    }

    setLocalProcessing(false);
  }, [selectedFile, selectedPatterns, customKeywords, redactColor]);

  const handleRedact = useCallback(async () => {
    if (!selectedFile) return;

    setLocalProcessing(true);
    setLocalProgress(0);
    setError(null);

    const options: RedactOptions = {
      patterns: selectedPatterns,
      customKeywords,
      redactColor,
    };

    const result = await redactPDF(
      selectedFile.file,
      options,
      setLocalProgress,
    );

    if (!result.success || !result.data) {
      setError(result.error || "Failed to redact PDF");
    } else if (result.matchCount === 0) {
      setError(t("redact.noMatches"));
    } else {
      // slice() creates a new Uint8Array with ArrayBuffer (not SharedArrayBuffer)
      const blob = new Blob([result.data.slice()], { type: "application/pdf" });
      const filename = selectedFile.name.replace(".pdf", "_redacted.pdf");
      downloadBlob(blob, filename);
    }

    setLocalProcessing(false);
  }, [
    selectedFile,
    selectedPatterns,
    customKeywords,
    redactColor,
    downloadBlob,
    t,
  ]);

  // Group matches by pattern
  const matchesByPattern = scanResult.matches.reduce(
    (acc, match) => {
      if (!acc[match.pattern]) acc[match.pattern] = [];
      acc[match.pattern].push(match);
      return acc;
    },
    {} as Record<RedactPattern, RedactMatch[]>,
  );

  if (!selectedFile) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <Upload className="h-12 w-12 text-muted-foreground mb-4" />
        <p className="text-muted-foreground">{t("redact.uploadPrompt")}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Selected File */}
      <div className="flex items-center gap-3 p-4 bg-muted/50 rounded-lg">
        <FileText className="h-8 w-8 text-destructive" />
        <div className="flex-1 min-w-0">
          <p className="font-medium truncate">{selectedFile.name}</p>
          <p className="text-sm text-muted-foreground">
            {selectedFile.pageCount} pages •{" "}
            {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
          </p>
        </div>
      </div>

      {/* Pattern Selection */}
      <div className="space-y-4">
        <Label className="text-base font-medium">{t("redact.patterns")}</Label>
        <div className="grid gap-3 sm:grid-cols-2">
          {(Object.keys(REDACT_PATTERNS) as RedactPattern[])
            .filter((p) => p !== "custom")
            .map((pattern) => {
              const config = REDACT_PATTERNS[pattern];
              const Icon = PATTERN_ICONS[pattern];
              const isSelected = selectedPatterns.includes(pattern);

              return (
                <div
                  key={pattern}
                  className={cn(
                    "flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-colors",
                    isSelected
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-muted-foreground",
                  )}
                  onClick={() => togglePattern(pattern)}
                >
                  <Checkbox checked={isSelected} />
                  <Icon className="h-5 w-5 text-muted-foreground" />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm">
                      {t(`redact.${pattern}`)}
                    </p>
                    <p className="text-xs text-muted-foreground truncate">
                      {t(`redact.${pattern}Desc`)}
                    </p>
                  </div>
                </div>
              );
            })}
        </div>
      </div>

      {/* Custom Keywords */}
      <div className="space-y-3">
        <Label className="text-base font-medium">
          {t("redact.customKeywords")}
        </Label>
        <div className="flex gap-2">
          <Input
            value={newKeyword}
            onChange={(e) => setNewKeyword(e.target.value)}
            placeholder={t("redact.keywordPlaceholder")}
            onKeyDown={(e) => e.key === "Enter" && addKeyword()}
          />
          <Button onClick={addKeyword} size="icon" variant="outline">
            <Plus className="h-4 w-4" />
          </Button>
        </div>
        {customKeywords.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {customKeywords.map((keyword) => (
              <span
                key={keyword}
                className="inline-flex items-center gap-1 px-2 py-1 bg-secondary text-secondary-foreground rounded-md text-sm"
              >
                {keyword}
                <button
                  onClick={() => removeKeyword(keyword)}
                  className="hover:text-destructive"
                >
                  <X className="h-3 w-3" />
                </button>
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Redaction Color */}
      <div className="space-y-3">
        <Label className="text-base font-medium">{t("redact.color")}</Label>
        <RadioGroup
          value={redactColor}
          onValueChange={(v) => setRedactColor(v as "black" | "white" | "gray")}
          className="flex gap-4"
        >
          <div className="flex items-center gap-2">
            <RadioGroupItem value="black" id="color-black" />
            <Label
              htmlFor="color-black"
              className="flex items-center gap-2 cursor-pointer"
            >
              <div className="w-4 h-4 bg-black rounded border" />
              {t("redact.colorBlack")}
            </Label>
          </div>
          <div className="flex items-center gap-2">
            <RadioGroupItem value="gray" id="color-gray" />
            <Label
              htmlFor="color-gray"
              className="flex items-center gap-2 cursor-pointer"
            >
              <div className="w-4 h-4 bg-gray-500 rounded border" />
              {t("redact.colorGray")}
            </Label>
          </div>
          <div className="flex items-center gap-2">
            <RadioGroupItem value="white" id="color-white" />
            <Label
              htmlFor="color-white"
              className="flex items-center gap-2 cursor-pointer"
            >
              <div className="w-4 h-4 bg-white rounded border" />
              {t("redact.colorWhite")}
            </Label>
          </div>
        </RadioGroup>
      </div>

      {/* Scan Result */}
      {scanResult.scanned && (
        <div
          className={cn(
            "p-4 rounded-lg",
            scanResult.matches.length > 0
              ? "bg-warning/10 border border-warning/20"
              : "bg-success/10 border border-success/20",
          )}
        >
          {scanResult.matches.length > 0 ? (
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-warning" />
                <span className="font-medium">
                  {t("redact.foundMatches", {
                    count: scanResult.matches.length,
                  })}
                </span>
              </div>
              <div className="space-y-2 text-sm">
                {Object.entries(matchesByPattern).map(([pattern, matches]) => {
                  const Icon = PATTERN_ICONS[pattern as RedactPattern];
                  return (
                    <div key={pattern} className="flex items-center gap-2">
                      <Icon className="h-4 w-4 text-muted-foreground" />
                      <span>
                        {t(`redact.${pattern}`)}: {matches.length}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-success" />
              <span>{t("redact.noSensitiveData")}</span>
            </div>
          )}
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
          <p className="text-destructive text-sm">{error}</p>
        </div>
      )}

      {/* Progress */}
      {localProcessing && (
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>{t("redact.processing")}</span>
            <span>{localProgress}%</span>
          </div>
          <div className="h-2 bg-secondary rounded-full overflow-hidden">
            <div
              className="h-full bg-primary transition-all duration-300"
              style={{ width: `${localProgress}%` }}
            />
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="flex gap-3">
        <Button
          onClick={handleScan}
          disabled={localProcessing || selectedPatterns.length === 0}
          variant="outline"
          className="flex-1"
        >
          <Search className="h-4 w-4 mr-2" />
          {t("redact.scan")}
        </Button>
        <Button
          onClick={handleRedact}
          disabled={localProcessing || selectedPatterns.length === 0}
          className="flex-1"
        >
          <Shield className="h-4 w-4 mr-2" />
          {t("redact.apply")}
        </Button>
      </div>

      {/* Warning */}
      <p className="text-xs text-muted-foreground text-center">
        {t("redact.warning")}
      </p>
    </div>
  );
}
