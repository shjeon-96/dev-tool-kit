"use client";

import { useTranslations } from "next-intl";
import {
  Download,
  Copy,
  Check,
  RefreshCw,
  Eye,
  EyeOff,
  Type,
  Hash,
  Code2,
} from "lucide-react";
import { useState } from "react";
import { Button } from "@/shared/ui/button";
import { Label } from "@/shared/ui/label";
import { Textarea } from "@/shared/ui/textarea";
import { Input } from "@/shared/ui/input";
import { Slider } from "@/shared/ui/slider";
import { Switch } from "@/shared/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/ui/tabs";
import { useShareAsImage } from "../model/use-share-as-image";
import {
  themes,
  backgrounds,
  languages,
  type ExportFormat,
} from "../lib/types";
import { CodePreview } from "./code-preview";

export function ShareAsImage() {
  const t = useTranslations("tools.share-as-image");
  const [copied, setCopied] = useState(false);

  const {
    code,
    settings,
    isExporting,
    isCopying,
    previewRef,
    setCode,
    setTheme,
    setBackground,
    setLanguage,
    setFontSize,
    setLineHeight,
    setPaddingX,
    setPaddingY,
    setBorderRadius,
    setShowLineNumbers,
    setShowWindowControls,
    setWindowTitle,
    setWatermark,
    setScale,
    resetSettings,
    exportImage,
    copyToClipboard,
    getDetectedLanguage,
  } = useShareAsImage();

  const handleCopyImage = async () => {
    const success = await copyToClipboard();
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleExport = async (format: ExportFormat) => {
    await exportImage(format);
  };

  return (
    <div className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Left Column - Input & Settings */}
        <div className="space-y-6">
          {/* Code Input */}
          <div className="space-y-2">
            <Label className="flex items-center gap-2">
              <Code2 className="h-4 w-4" />
              {t("input.label")}
            </Label>
            <Textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder={t("input.placeholder")}
              className="min-h-[200px] font-mono text-sm"
            />
          </div>

          {/* Settings Tabs */}
          <Tabs defaultValue="theme" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="theme">{t("tabs.theme")}</TabsTrigger>
              <TabsTrigger value="style">{t("tabs.style")}</TabsTrigger>
              <TabsTrigger value="options">{t("tabs.options")}</TabsTrigger>
            </TabsList>

            {/* Theme Tab */}
            <TabsContent value="theme" className="space-y-4">
              {/* Theme Selection */}
              <div className="space-y-2">
                <Label>{t("settings.theme")}</Label>
                <div className="grid grid-cols-4 gap-2">
                  {Object.entries(themes).map(([key, theme]) => (
                    <button
                      key={key}
                      onClick={() => setTheme(key as keyof typeof themes)}
                      className={`rounded-lg border p-2 text-xs transition-all ${
                        settings.theme === key
                          ? "border-primary ring-2 ring-primary/20"
                          : "border-border hover:border-primary/50"
                      }`}
                      style={{ backgroundColor: theme.background }}
                    >
                      <span style={{ color: theme.color }}>{theme.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Background Selection */}
              <div className="space-y-2">
                <Label>{t("settings.background")}</Label>
                <div className="grid grid-cols-5 gap-2">
                  {Object.entries(backgrounds).map(([key, bg]) => (
                    <button
                      key={key}
                      onClick={() =>
                        setBackground(key as keyof typeof backgrounds)
                      }
                      className={`h-10 rounded-lg border transition-all ${
                        settings.background === key
                          ? "ring-2 ring-primary ring-offset-2"
                          : "hover:ring-1 hover:ring-primary/50"
                      } ${key === "transparent" ? "bg-[url('/checkerboard.svg')] bg-repeat" : ""}`}
                      style={{
                        background:
                          key !== "transparent" ? bg.value : undefined,
                      }}
                      title={bg.name}
                    />
                  ))}
                </div>
              </div>

              {/* Language Selection */}
              <div className="space-y-2">
                <Label>{t("settings.language")}</Label>
                <Select
                  value={settings.language}
                  onValueChange={(v) =>
                    setLanguage(v as typeof settings.language)
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {languages.map((lang) => (
                      <SelectItem key={lang.value} value={lang.value}>
                        {lang.label}
                        {lang.value === "auto" && code && (
                          <span className="ml-2 text-muted-foreground">
                            ({getDetectedLanguage()})
                          </span>
                        )}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </TabsContent>

            {/* Style Tab */}
            <TabsContent value="style" className="space-y-4">
              {/* Font Size */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label className="flex items-center gap-2">
                    <Type className="h-4 w-4" />
                    {t("settings.fontSize")}
                  </Label>
                  <span className="text-sm text-muted-foreground">
                    {settings.fontSize}px
                  </span>
                </div>
                <Slider
                  value={[settings.fontSize]}
                  onValueChange={([v]) => setFontSize(v)}
                  min={10}
                  max={24}
                  step={1}
                />
              </div>

              {/* Line Height */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label>{t("settings.lineHeight")}</Label>
                  <span className="text-sm text-muted-foreground">
                    {settings.lineHeight}
                  </span>
                </div>
                <Slider
                  value={[settings.lineHeight]}
                  onValueChange={([v]) => setLineHeight(v)}
                  min={1}
                  max={2.5}
                  step={0.1}
                />
              </div>

              {/* Padding X */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label>{t("settings.paddingX")}</Label>
                  <span className="text-sm text-muted-foreground">
                    {settings.paddingX}px
                  </span>
                </div>
                <Slider
                  value={[settings.paddingX]}
                  onValueChange={([v]) => setPaddingX(v)}
                  min={16}
                  max={64}
                  step={4}
                />
              </div>

              {/* Padding Y */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label>{t("settings.paddingY")}</Label>
                  <span className="text-sm text-muted-foreground">
                    {settings.paddingY}px
                  </span>
                </div>
                <Slider
                  value={[settings.paddingY]}
                  onValueChange={([v]) => setPaddingY(v)}
                  min={16}
                  max={64}
                  step={4}
                />
              </div>

              {/* Border Radius */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label>{t("settings.borderRadius")}</Label>
                  <span className="text-sm text-muted-foreground">
                    {settings.borderRadius}px
                  </span>
                </div>
                <Slider
                  value={[settings.borderRadius]}
                  onValueChange={([v]) => setBorderRadius(v)}
                  min={0}
                  max={24}
                  step={2}
                />
              </div>
            </TabsContent>

            {/* Options Tab */}
            <TabsContent value="options" className="space-y-4">
              {/* Window Title */}
              <div className="space-y-2">
                <Label>{t("settings.windowTitle")}</Label>
                <Input
                  value={settings.windowTitle}
                  onChange={(e) => setWindowTitle(e.target.value)}
                  placeholder={t("settings.windowTitlePlaceholder")}
                />
              </div>

              {/* Toggle Options */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label className="flex items-center gap-2">
                    <Hash className="h-4 w-4" />
                    {t("settings.showLineNumbers")}
                  </Label>
                  <Switch
                    checked={settings.showLineNumbers}
                    onCheckedChange={setShowLineNumbers}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <Label className="flex items-center gap-2">
                    {settings.showWindowControls ? (
                      <Eye className="h-4 w-4" />
                    ) : (
                      <EyeOff className="h-4 w-4" />
                    )}
                    {t("settings.showWindowControls")}
                  </Label>
                  <Switch
                    checked={settings.showWindowControls}
                    onCheckedChange={setShowWindowControls}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <Label>{t("settings.watermark")}</Label>
                  <Switch
                    checked={settings.watermark}
                    onCheckedChange={setWatermark}
                  />
                </div>
              </div>

              {/* Export Scale */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label>{t("settings.exportScale")}</Label>
                  <span className="text-sm text-muted-foreground">
                    {settings.scale}x
                  </span>
                </div>
                <Slider
                  value={[settings.scale]}
                  onValueChange={([v]) => setScale(v)}
                  min={1}
                  max={4}
                  step={0.5}
                />
              </div>

              {/* Reset Button */}
              <Button
                variant="outline"
                onClick={resetSettings}
                className="w-full"
              >
                <RefreshCw className="mr-2 h-4 w-4" />
                {t("actions.reset")}
              </Button>
            </TabsContent>
          </Tabs>
        </div>

        {/* Right Column - Preview */}
        <div className="space-y-4">
          <Label>{t("preview.label")}</Label>
          <div className="overflow-hidden rounded-lg border bg-muted/30">
            <div className="max-h-[500px] overflow-auto p-4">
              <CodePreview
                ref={previewRef}
                code={code || t("preview.placeholder")}
                settings={settings}
                detectedLanguage={getDetectedLanguage()}
              />
            </div>
          </div>

          {/* Export Actions */}
          <div className="grid grid-cols-2 gap-2">
            <Button
              onClick={handleCopyImage}
              disabled={!code || isCopying}
              variant="outline"
            >
              {copied ? (
                <Check className="mr-2 h-4 w-4" />
              ) : (
                <Copy className="mr-2 h-4 w-4" />
              )}
              {copied ? t("actions.copied") : t("actions.copy")}
            </Button>
            <Button
              onClick={() => handleExport("png")}
              disabled={!code || isExporting}
            >
              <Download className="mr-2 h-4 w-4" />
              {isExporting ? t("actions.exporting") : t("actions.downloadPng")}
            </Button>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <Button
              variant="secondary"
              onClick={() => handleExport("jpeg")}
              disabled={!code || isExporting}
            >
              <Download className="mr-2 h-4 w-4" />
              {t("actions.downloadJpeg")}
            </Button>
            <Button
              variant="secondary"
              onClick={() => handleExport("svg")}
              disabled={!code || isExporting}
            >
              <Download className="mr-2 h-4 w-4" />
              {t("actions.downloadSvg")}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
