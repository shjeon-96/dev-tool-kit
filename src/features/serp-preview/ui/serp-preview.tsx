"use client";

import { useTranslations } from "next-intl";
import { Button } from "@/shared/ui";
import { Input } from "@/shared/ui";
import { Textarea } from "@/shared/ui";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui";
import { Label } from "@/shared/ui";
import { Badge } from "@/shared/ui";
import { Tabs, TabsList, TabsTrigger } from "@/shared/ui";
import { Monitor, Smartphone, Globe } from "lucide-react";
import { useSerpPreview } from "../model/use-serp-preview";
import {
  getStatusColor,
  getStatusBadgeVariant,
  truncateText,
  formatDisplayUrl,
} from "../lib/analyzer";
import { LIMITS } from "../lib/types";

export function SerpPreview() {
  const t = useTranslations("tools.serp-preview");
  const {
    data,
    device,
    analysis,
    updateUrl,
    updateTitle,
    updateDescription,
    setDevice,
    loadSample,
    clear,
  } = useSerpPreview();

  const maxTitlePixels =
    device === "desktop"
      ? LIMITS.TITLE.MAX_PIXELS_DESKTOP
      : LIMITS.TITLE.MAX_PIXELS_MOBILE;

  const maxDescPixels =
    device === "desktop"
      ? LIMITS.DESCRIPTION.MAX_PIXELS_DESKTOP
      : LIMITS.DESCRIPTION.MAX_PIXELS_MOBILE;

  const displayTitle =
    analysis.title.pixelWidth > maxTitlePixels
      ? truncateText(data.title, maxTitlePixels)
      : data.title;

  const displayDescription =
    analysis.description.pixelWidth > maxDescPixels
      ? truncateText(data.description, maxDescPixels)
      : data.description;

  return (
    <div className="space-y-6">
      {/* Input Form */}
      <Card>
        <CardHeader>
          <CardTitle>{t("input")}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label>{t("url")}</Label>
              {data.url && (
                <span className="text-xs text-muted-foreground">
                  {analysis.url.isValid ? "✓ Valid URL" : "⚠ Invalid URL"}
                </span>
              )}
            </div>
            <Input
              value={data.url}
              onChange={(e) => updateUrl(e.target.value)}
              placeholder="https://example.com/page"
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label>{t("title")}</Label>
              <div className="flex items-center gap-2">
                <Badge variant={getStatusBadgeVariant(analysis.title.status)}>
                  {data.title.length}/{LIMITS.TITLE.MAX_CHARS}
                </Badge>
                <span
                  className={`text-xs ${getStatusColor(analysis.title.status)}`}
                >
                  {analysis.title.message}
                </span>
              </div>
            </div>
            <Input
              value={data.title}
              onChange={(e) => updateTitle(e.target.value)}
              placeholder={t("titlePlaceholder")}
            />
            <div className="h-1 bg-muted rounded-full overflow-hidden">
              <div
                className={`h-full transition-all ${
                  analysis.title.status === "optimal"
                    ? "bg-green-500"
                    : analysis.title.status === "long"
                      ? "bg-red-500"
                      : "bg-yellow-500"
                }`}
                style={{
                  width: `${Math.min(100, (data.title.length / LIMITS.TITLE.MAX_CHARS) * 100)}%`,
                }}
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label>{t("description")}</Label>
              <div className="flex items-center gap-2">
                <Badge
                  variant={getStatusBadgeVariant(analysis.description.status)}
                >
                  {data.description.length}/{LIMITS.DESCRIPTION.MAX_CHARS}
                </Badge>
                <span
                  className={`text-xs ${getStatusColor(analysis.description.status)}`}
                >
                  {analysis.description.message}
                </span>
              </div>
            </div>
            <Textarea
              value={data.description}
              onChange={(e) => updateDescription(e.target.value)}
              placeholder={t("descriptionPlaceholder")}
              className="min-h-[80px]"
            />
            <div className="h-1 bg-muted rounded-full overflow-hidden">
              <div
                className={`h-full transition-all ${
                  analysis.description.status === "optimal"
                    ? "bg-green-500"
                    : analysis.description.status === "long"
                      ? "bg-red-500"
                      : "bg-yellow-500"
                }`}
                style={{
                  width: `${Math.min(100, (data.description.length / LIMITS.DESCRIPTION.MAX_CHARS) * 100)}%`,
                }}
              />
            </div>
          </div>

          <div className="flex gap-2">
            <Button variant="outline" onClick={loadSample}>
              {t("loadSample")}
            </Button>
            <Button variant="ghost" onClick={clear}>
              {t("clear")}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Preview */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>{t("preview")}</CardTitle>
            <Tabs
              value={device}
              onValueChange={(v) => setDevice(v as "desktop" | "mobile")}
            >
              <TabsList>
                <TabsTrigger value="desktop">
                  <Monitor className="h-4 w-4 mr-2" />
                  Desktop
                </TabsTrigger>
                <TabsTrigger value="mobile">
                  <Smartphone className="h-4 w-4 mr-2" />
                  Mobile
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </CardHeader>
        <CardContent>
          <div
            className={`bg-white dark:bg-gray-950 rounded-lg p-4 ${
              device === "mobile" ? "max-w-[400px] mx-auto" : ""
            }`}
          >
            {/* Google-style SERP Result */}
            <div className="space-y-1">
              {/* URL Line */}
              <div className="flex items-center gap-2 text-sm">
                <div className="w-7 h-7 rounded-full bg-muted flex items-center justify-center">
                  <Globe className="h-4 w-4 text-muted-foreground" />
                </div>
                <div>
                  <div className="text-xs text-muted-foreground">
                    {data.url ? formatDisplayUrl(data.url) : "example.com"}
                  </div>
                  <div className="text-xs text-muted-foreground truncate max-w-[300px]">
                    {data.url || "https://example.com"}
                  </div>
                </div>
              </div>

              {/* Title */}
              <h3 className="text-xl text-blue-600 dark:text-blue-400 hover:underline cursor-pointer leading-tight">
                {displayTitle || t("sampleTitle")}
              </h3>

              {/* Description */}
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                {displayDescription || t("sampleDescription")}
              </p>
            </div>
          </div>

          {/* Pixel Width Info */}
          <div className="mt-4 grid grid-cols-2 gap-4 text-sm text-muted-foreground">
            <div>
              <span className="font-medium">{t("titlePixelWidth")}:</span>{" "}
              {analysis.title.pixelWidth}px / {maxTitlePixels}px
            </div>
            <div>
              <span className="font-medium">{t("descPixelWidth")}:</span>{" "}
              {analysis.description.pixelWidth}px / {maxDescPixels}px
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tips */}
      <Card>
        <CardHeader>
          <CardTitle>{t("tips")}</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside">
            <li>{t("tip1")}</li>
            <li>{t("tip2")}</li>
            <li>{t("tip3")}</li>
            <li>{t("tip4")}</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
