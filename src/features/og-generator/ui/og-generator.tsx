"use client";

import { useEffect, useCallback } from "react";
import { useTranslations } from "next-intl";
import {
  Image,
  Download,
  Loader2,
  RefreshCw,
  Palette,
  Type,
  Layout,
  Settings2,
  Sparkles,
  AlertCircle,
  Clock,
} from "lucide-react";
import { useOGGenerator } from "../model/use-og-generator";
import {
  TEMPLATES,
  GRADIENT_PRESETS,
  OG_SIZES,
  FONT_CONFIGS,
  type TemplateType,
  type FontFamily,
  type GradientDirection,
} from "../lib/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui";
import { Button } from "@/shared/ui";
import { Input } from "@/shared/ui";
import { Label } from "@/shared/ui";
import { Slider } from "@/shared/ui";
import { RadioGroup, RadioGroupItem } from "@/shared/ui";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/ui";
import { Alert, AlertDescription } from "@/shared/ui";
import { cn } from "@/shared/lib/utils";

export function OGGenerator() {
  const t = useTranslations("tools.og-generator");
  const {
    config,
    previewUrl,
    isRendering,
    error,
    lastRenderTime,
    setConfig,
    setTemplate,
    setTitle,
    setSubtitle,
    setAuthor,
    setSiteName,
    setBackgroundColor,
    setGradient,
    setTextColor,
    setFontFamily,
    setTitleFontSize,
    setDimensions,
    renderPreview,
    downloadPNG,
    reset,
  } = useOGGenerator();

  // Auto-render preview on config change (debounced)
  useEffect(() => {
    const timer = setTimeout(() => {
      renderPreview();
    }, 500);
    return () => clearTimeout(timer);
  }, [config, renderPreview]);

  // Handle size selection
  const handleSizeChange = useCallback(
    (value: string) => {
      const size = OG_SIZES.find((s) => `${s.width}x${s.height}` === value);
      if (size) {
        setDimensions(size.width, size.height);
      }
    },
    [setDimensions],
  );

  return (
    <div className="space-y-6">
      {/* Preview Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Image className="h-5 w-5" />
            {t("preview.title")}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Preview Container */}
            <div
              className="relative overflow-hidden rounded-lg border bg-muted/50"
              style={{
                aspectRatio: `${config.width}/${config.height}`,
                maxHeight: "400px",
              }}
            >
              {isRendering && !previewUrl && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                </div>
              )}
              {previewUrl && (
                <img
                  src={previewUrl}
                  alt="OG Image Preview"
                  className={cn(
                    "w-full h-full object-contain transition-opacity",
                    isRendering && "opacity-50",
                  )}
                />
              )}
              {isRendering && previewUrl && (
                <div className="absolute top-2 right-2">
                  <Loader2 className="h-4 w-4 animate-spin text-primary" />
                </div>
              )}
            </div>

            {/* Preview Info */}
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <span>
                {config.width} × {config.height}px
              </span>
              {lastRenderTime && (
                <span className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {lastRenderTime.toFixed(0)}ms
                </span>
              )}
            </div>

            {/* Download Button */}
            <Button
              size="lg"
              className="w-full"
              onClick={() => downloadPNG()}
              disabled={isRendering || !previewUrl}
            >
              {isRendering ? (
                <>
                  <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                  {t("rendering")}
                </>
              ) : (
                <>
                  <Download className="h-5 w-5 mr-2" />
                  {t("download")}
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Error Display */}
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* Configuration Tabs */}
      <Tabs defaultValue="content" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="content" className="flex items-center gap-1">
            <Type className="h-4 w-4" />
            <span className="hidden sm:inline">{t("tabs.content")}</span>
          </TabsTrigger>
          <TabsTrigger value="template" className="flex items-center gap-1">
            <Layout className="h-4 w-4" />
            <span className="hidden sm:inline">{t("tabs.template")}</span>
          </TabsTrigger>
          <TabsTrigger value="style" className="flex items-center gap-1">
            <Palette className="h-4 w-4" />
            <span className="hidden sm:inline">{t("tabs.style")}</span>
          </TabsTrigger>
          <TabsTrigger value="settings" className="flex items-center gap-1">
            <Settings2 className="h-4 w-4" />
            <span className="hidden sm:inline">{t("tabs.settings")}</span>
          </TabsTrigger>
        </TabsList>

        {/* Content Tab */}
        <TabsContent value="content">
          <Card>
            <CardContent className="pt-6 space-y-4">
              <div className="space-y-2">
                <Label>{t("content.title")}</Label>
                <Input
                  value={config.title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder={t("content.titlePlaceholder")}
                />
              </div>

              <div className="space-y-2">
                <Label>{t("content.subtitle")}</Label>
                <Input
                  value={config.subtitle || ""}
                  onChange={(e) => setSubtitle(e.target.value)}
                  placeholder={t("content.subtitlePlaceholder")}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>{t("content.author")}</Label>
                  <Input
                    value={config.author || ""}
                    onChange={(e) => setAuthor(e.target.value)}
                    placeholder={t("content.authorPlaceholder")}
                  />
                </div>
                <div className="space-y-2">
                  <Label>{t("content.siteName")}</Label>
                  <Input
                    value={config.siteName || ""}
                    onChange={(e) => setSiteName(e.target.value)}
                    placeholder={t("content.siteNamePlaceholder")}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Template Tab */}
        <TabsContent value="template">
          <Card>
            <CardContent className="pt-6">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {TEMPLATES.map((template) => (
                  <button
                    key={template.id}
                    onClick={() => setTemplate(template.id)}
                    className={cn(
                      "relative rounded-lg border-2 p-4 text-left transition-all hover:border-primary",
                      config.template === template.id
                        ? "border-primary bg-primary/5"
                        : "border-muted",
                    )}
                  >
                    <div
                      className="h-16 rounded mb-2"
                      style={{ background: template.preview }}
                    />
                    <div className="font-medium text-sm">{template.name}</div>
                    <div className="text-xs text-muted-foreground">
                      {template.description}
                    </div>
                    {config.template === template.id && (
                      <Sparkles className="absolute top-2 right-2 h-4 w-4 text-primary" />
                    )}
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Style Tab */}
        <TabsContent value="style">
          <Card>
            <CardContent className="pt-6 space-y-6">
              {/* Gradient Presets */}
              {(config.template === "gradient" ||
                config.template === "blog" ||
                config.template === "social") && (
                <div className="space-y-3">
                  <Label>{t("style.gradientPresets")}</Label>
                  <div className="flex flex-wrap gap-2">
                    {GRADIENT_PRESETS.map((preset) => (
                      <button
                        key={preset.name}
                        onClick={() => setGradient(preset.from, preset.to)}
                        className={cn(
                          "h-8 w-8 rounded-full border-2 transition-all",
                          config.gradientFrom === preset.from &&
                            config.gradientTo === preset.to
                            ? "border-primary ring-2 ring-primary/30"
                            : "border-transparent",
                        )}
                        style={{
                          background: `linear-gradient(135deg, ${preset.from}, ${preset.to})`,
                        }}
                        title={preset.name}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Background Color */}
              {config.template === "basic" ||
              config.template === "product" ||
              config.template === "minimal" ? (
                <div className="space-y-2">
                  <Label>{t("style.backgroundColor")}</Label>
                  <div className="flex gap-2">
                    <Input
                      type="color"
                      value={config.backgroundColor}
                      onChange={(e) => setBackgroundColor(e.target.value)}
                      className="w-12 h-10 p-1 cursor-pointer"
                    />
                    <Input
                      value={config.backgroundColor}
                      onChange={(e) => setBackgroundColor(e.target.value)}
                      placeholder="#000000"
                    />
                  </div>
                </div>
              ) : null}

              {/* Text Color */}
              <div className="space-y-2">
                <Label>{t("style.textColor")}</Label>
                <div className="flex gap-2">
                  <Input
                    type="color"
                    value={config.textColor}
                    onChange={(e) => setTextColor(e.target.value)}
                    className="w-12 h-10 p-1 cursor-pointer"
                  />
                  <Input
                    value={config.textColor}
                    onChange={(e) => setTextColor(e.target.value)}
                    placeholder="#ffffff"
                  />
                </div>
              </div>

              {/* Font Size */}
              <div className="space-y-3">
                <div className="flex justify-between">
                  <Label>{t("style.titleSize")}</Label>
                  <span className="text-sm text-muted-foreground">
                    {config.titleFontSize}px
                  </span>
                </div>
                <Slider
                  value={[config.titleFontSize]}
                  min={32}
                  max={120}
                  step={4}
                  onValueChange={([value]) => setTitleFontSize(value)}
                />
              </div>

              {/* Font Family */}
              <div className="space-y-2">
                <Label>{t("style.fontFamily")}</Label>
                <RadioGroup
                  value={config.fontFamily}
                  onValueChange={(value) => setFontFamily(value as FontFamily)}
                  className="grid grid-cols-2 gap-2"
                >
                  {Object.entries(FONT_CONFIGS).map(([key, font]) => (
                    <div
                      key={key}
                      className="flex items-center space-x-2 rounded-md border p-3"
                    >
                      <RadioGroupItem value={key} id={key} />
                      <Label htmlFor={key} className="cursor-pointer">
                        {font.name}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Settings Tab */}
        <TabsContent value="settings">
          <Card>
            <CardContent className="pt-6 space-y-6">
              {/* Size Presets */}
              <div className="space-y-2">
                <Label>{t("settings.size")}</Label>
                <RadioGroup
                  value={`${config.width}x${config.height}`}
                  onValueChange={handleSizeChange}
                  className="space-y-2"
                >
                  {OG_SIZES.map((size) => (
                    <div
                      key={size.name}
                      className="flex items-center space-x-2 rounded-md border p-3"
                    >
                      <RadioGroupItem
                        value={`${size.width}x${size.height}`}
                        id={size.name}
                      />
                      <Label htmlFor={size.name} className="cursor-pointer">
                        {size.name}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>

              {/* Reset Button */}
              <Button variant="outline" onClick={reset} className="w-full">
                <RefreshCw className="h-4 w-4 mr-2" />
                {t("settings.reset")}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
