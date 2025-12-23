"use client";

import { useTranslations } from "next-intl";
import { useSitemapGenerator } from "../model/use-sitemap-generator";
import { CHANGE_FREQUENCIES, PRIORITY_OPTIONS } from "../lib/types";
import {
  Button,
  Textarea,
  Label,
  Switch,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui";
import {
  FileCode,
  Download,
  Copy,
  Trash2,
  Play,
  FileText,
  AlertCircle,
  Check,
  Globe,
} from "lucide-react";
import { useState } from "react";

export function SitemapGenerator() {
  const t = useTranslations("tools.sitemap-generator");
  const [copied, setCopied] = useState(false);

  const {
    urlInput,
    options,
    output,
    error,
    stats,
    domainValidation,
    setUrlInput,
    updateOptions,
    generate,
    clear,
    download,
    copy,
    loadSample,
  } = useSitemapGenerator();

  const handleCopy = async () => {
    const success = await copy();
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Left Panel - Input */}
        <div className="space-y-4">
          {/* URL Input */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="url-input">{t("urlInput")}</Label>
              <Button variant="ghost" size="sm" onClick={loadSample}>
                <FileText className="h-4 w-4 mr-1" />
                {t("loadSample")}
              </Button>
            </div>
            <Textarea
              id="url-input"
              value={urlInput}
              onChange={(e) => setUrlInput(e.target.value)}
              placeholder={t("urlPlaceholder")}
              className="min-h-[200px] font-mono text-sm"
            />
            <p className="text-xs text-muted-foreground">{t("urlHint")}</p>
          </div>

          {/* Stats */}
          {stats.totalUrls > 0 && (
            <div className="rounded-lg border bg-muted/50 p-4">
              <div className="flex items-center gap-2 mb-2">
                <Globe className="h-4 w-4 text-muted-foreground" />
                <span className="font-medium">{t("stats")}</span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>
                  <span className="text-muted-foreground">
                    {t("totalUrls")}:
                  </span>{" "}
                  <span className="font-medium">{stats.totalUrls}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">{t("domains")}:</span>{" "}
                  <span className="font-medium">{stats.uniqueDomains}</span>
                </div>
              </div>
              {!domainValidation.valid &&
                domainValidation.invalidUrls.length > 0 && (
                  <div className="mt-2 text-xs text-yellow-600 dark:text-yellow-400">
                    <AlertCircle className="h-3 w-3 inline mr-1" />
                    {t("multipleDomains")}
                  </div>
                )}
            </div>
          )}

          {/* Options */}
          <div className="rounded-lg border p-4 space-y-4">
            <h3 className="font-medium">{t("options")}</h3>

            <div className="flex items-center justify-between">
              <Label htmlFor="include-lastmod">{t("includeLastmod")}</Label>
              <Switch
                id="include-lastmod"
                checked={options.includeLastmod}
                onCheckedChange={(checked) =>
                  updateOptions({ includeLastmod: checked })
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="pretty-print">{t("prettyPrint")}</Label>
              <Switch
                id="pretty-print"
                checked={options.prettyPrint}
                onCheckedChange={(checked) =>
                  updateOptions({ prettyPrint: checked })
                }
              />
            </div>

            <div className="space-y-2">
              <Label>{t("defaultChangefreq")}</Label>
              <Select
                value={options.defaultChangefreq}
                onValueChange={(value) =>
                  updateOptions({
                    defaultChangefreq:
                      value as typeof options.defaultChangefreq,
                  })
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {CHANGE_FREQUENCIES.map((freq) => (
                    <SelectItem key={freq.value} value={freq.value}>
                      {freq.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>{t("defaultPriority")}</Label>
              <Select
                value={String(options.defaultPriority)}
                onValueChange={(value) =>
                  updateOptions({ defaultPriority: parseFloat(value) })
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {PRIORITY_OPTIONS.map((opt) => (
                    <SelectItem key={opt.value} value={String(opt.value)}>
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2">
            <Button onClick={generate} className="flex-1">
              <Play className="h-4 w-4 mr-2" />
              {t("generate")}
            </Button>
            <Button variant="outline" onClick={clear}>
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Right Panel - Output */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label>{t("output")}</Label>
            {output && (
              <div className="flex gap-2">
                <Button variant="ghost" size="sm" onClick={handleCopy}>
                  {copied ? (
                    <Check className="h-4 w-4 mr-1 text-green-500" />
                  ) : (
                    <Copy className="h-4 w-4 mr-1" />
                  )}
                  {copied ? t("copied") : t("copy")}
                </Button>
                <Button variant="ghost" size="sm" onClick={download}>
                  <Download className="h-4 w-4 mr-1" />
                  {t("download")}
                </Button>
              </div>
            )}
          </div>

          {error && (
            <div className="rounded-lg border border-destructive bg-destructive/10 p-4 text-sm text-destructive">
              <AlertCircle className="h-4 w-4 inline mr-2" />
              {error}
            </div>
          )}

          <div className="relative">
            <Textarea
              value={output}
              readOnly
              placeholder={t("outputPlaceholder")}
              className="min-h-[400px] font-mono text-sm"
            />
            {output && (
              <div className="absolute top-2 right-2 flex items-center gap-1 rounded bg-muted px-2 py-1 text-xs">
                <FileCode className="h-3 w-3" />
                sitemap.xml
              </div>
            )}
          </div>

          {output && (
            <div className="text-xs text-muted-foreground">
              {t("fileSize")}: {(new Blob([output]).size / 1024).toFixed(2)} KB
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
