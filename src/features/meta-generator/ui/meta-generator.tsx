"use client";

import { useMetaGenerator } from "../model/use-meta-generator";
import {
  Button,
  Input,
  Label,
  Textarea,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/shared/ui";
import { Copy, Check, RotateCcw, Image as ImageIcon } from "lucide-react";
import { useState } from "react";

function FormField({
  label,
  children,
  className,
}: {
  label: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`space-y-2 ${className || ""}`}>
      <Label>{label}</Label>
      {children}
    </div>
  );
}

export function MetaGenerator() {
  const {
    metaData,
    updateField,
    generatedCode,
    copyToClipboard,
    reset,
    previewData,
    syncOG,
    setSyncOG,
    syncTwitter,
    setSyncTwitter,
    robotsOptions,
    ogTypeOptions,
    twitterCardOptions,
  } = useMetaGenerator();

  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const success = await copyToClipboard(generatedCode);
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
          <Tabs defaultValue="basic">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="basic">기본</TabsTrigger>
              <TabsTrigger value="opengraph">Open Graph</TabsTrigger>
              <TabsTrigger value="twitter">Twitter</TabsTrigger>
            </TabsList>

            <TabsContent value="basic" className="space-y-4 mt-4">
              <FormField label="페이지 제목">
                <Input
                  value={metaData.title}
                  onChange={(e) => updateField("title", e.target.value)}
                  placeholder="페이지 제목"
                />
              </FormField>

              <FormField label="설명">
                <Textarea
                  value={metaData.description}
                  onChange={(e) => updateField("description", e.target.value)}
                  placeholder="페이지에 대한 간단한 설명 (150-160자 권장)"
                  className="min-h-[80px]"
                />
                <p className="text-xs text-muted-foreground">
                  {metaData.description.length}/160자
                </p>
              </FormField>

              <FormField label="키워드">
                <Input
                  value={metaData.keywords}
                  onChange={(e) => updateField("keywords", e.target.value)}
                  placeholder="키워드1, 키워드2, 키워드3"
                />
              </FormField>

              <div className="grid grid-cols-2 gap-4">
                <FormField label="작성자">
                  <Input
                    value={metaData.author}
                    onChange={(e) => updateField("author", e.target.value)}
                    placeholder="작성자 이름"
                  />
                </FormField>

                <FormField label="Robots">
                  <Select
                    value={metaData.robots}
                    onValueChange={(v) => updateField("robots", v)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {robotsOptions.map((opt) => (
                        <SelectItem key={opt.value} value={opt.value}>
                          {opt.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormField>
              </div>

              <FormField label="Canonical URL">
                <Input
                  value={metaData.canonical}
                  onChange={(e) => updateField("canonical", e.target.value)}
                  placeholder="https://example.com/page"
                />
              </FormField>

              <FormField label="테마 색상">
                <div className="flex gap-2">
                  <Input
                    type="color"
                    value={metaData.themeColor}
                    onChange={(e) => updateField("themeColor", e.target.value)}
                    className="w-12 h-10 p-1"
                  />
                  <Input
                    value={metaData.themeColor}
                    onChange={(e) => updateField("themeColor", e.target.value)}
                    className="font-mono"
                  />
                </div>
              </FormField>
            </TabsContent>

            <TabsContent value="opengraph" className="space-y-4 mt-4">
              <div className="flex items-center gap-2 mb-4">
                <input
                  type="checkbox"
                  id="syncOG"
                  checked={syncOG}
                  onChange={(e) => setSyncOG(e.target.checked)}
                  className="rounded"
                />
                <label htmlFor="syncOG" className="text-sm">
                  기본 필드와 동기화
                </label>
              </div>

              <FormField label="OG 제목">
                <Input
                  value={metaData.ogTitle}
                  onChange={(e) => updateField("ogTitle", e.target.value)}
                  placeholder="Open Graph 제목"
                />
              </FormField>

              <FormField label="OG 설명">
                <Textarea
                  value={metaData.ogDescription}
                  onChange={(e) => updateField("ogDescription", e.target.value)}
                  placeholder="Open Graph 설명"
                  className="min-h-[80px]"
                />
              </FormField>

              <FormField label="OG 이미지 URL">
                <Input
                  value={metaData.ogImage}
                  onChange={(e) => updateField("ogImage", e.target.value)}
                  placeholder="https://example.com/image.jpg (1200x630 권장)"
                />
              </FormField>

              <div className="grid grid-cols-2 gap-4">
                <FormField label="OG URL">
                  <Input
                    value={metaData.ogUrl}
                    onChange={(e) => updateField("ogUrl", e.target.value)}
                    placeholder="https://example.com/page"
                  />
                </FormField>

                <FormField label="OG 유형">
                  <Select
                    value={metaData.ogType}
                    onValueChange={(v) => updateField("ogType", v)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {ogTypeOptions.map((opt) => (
                        <SelectItem key={opt.value} value={opt.value}>
                          {opt.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormField>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <FormField label="사이트 이름">
                  <Input
                    value={metaData.ogSiteName}
                    onChange={(e) => updateField("ogSiteName", e.target.value)}
                    placeholder="사이트 이름"
                  />
                </FormField>

                <FormField label="로케일">
                  <Input
                    value={metaData.ogLocale}
                    onChange={(e) => updateField("ogLocale", e.target.value)}
                    placeholder="ko_KR"
                  />
                </FormField>
              </div>
            </TabsContent>

            <TabsContent value="twitter" className="space-y-4 mt-4">
              <div className="flex items-center gap-2 mb-4">
                <input
                  type="checkbox"
                  id="syncTwitter"
                  checked={syncTwitter}
                  onChange={(e) => setSyncTwitter(e.target.checked)}
                  className="rounded"
                />
                <label htmlFor="syncTwitter" className="text-sm">
                  OG 필드와 동기화
                </label>
              </div>

              <FormField label="카드 유형">
                <Select
                  value={metaData.twitterCard}
                  onValueChange={(v) => updateField("twitterCard", v)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {twitterCardOptions.map((opt) => (
                      <SelectItem key={opt.value} value={opt.value}>
                        {opt.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormField>

              <FormField label="제목">
                <Input
                  value={metaData.twitterTitle}
                  onChange={(e) => updateField("twitterTitle", e.target.value)}
                  placeholder="Twitter 카드 제목"
                />
              </FormField>

              <FormField label="설명">
                <Textarea
                  value={metaData.twitterDescription}
                  onChange={(e) => updateField("twitterDescription", e.target.value)}
                  placeholder="Twitter 카드 설명"
                  className="min-h-[80px]"
                />
              </FormField>

              <FormField label="이미지 URL">
                <Input
                  value={metaData.twitterImage}
                  onChange={(e) => updateField("twitterImage", e.target.value)}
                  placeholder="https://example.com/image.jpg"
                />
              </FormField>

              <div className="grid grid-cols-2 gap-4">
                <FormField label="@사이트">
                  <Input
                    value={metaData.twitterSite}
                    onChange={(e) => updateField("twitterSite", e.target.value)}
                    placeholder="@sitehandle"
                  />
                </FormField>

                <FormField label="@작성자">
                  <Input
                    value={metaData.twitterCreator}
                    onChange={(e) => updateField("twitterCreator", e.target.value)}
                    placeholder="@authorhandle"
                  />
                </FormField>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Right Panel - Preview */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label>미리보기</Label>
            <Button variant="outline" size="sm" onClick={reset}>
              <RotateCcw className="h-4 w-4 mr-2" />
              초기화
            </Button>
          </div>

          {/* Google Preview */}
          <div className="p-4 rounded-lg border bg-card">
            <h4 className="text-sm font-medium mb-2 text-muted-foreground">
              Google 검색 결과
            </h4>
            <div className="space-y-1">
              <p className="text-sm text-blue-600 dark:text-blue-400 truncate">
                {previewData.google.url}
              </p>
              <p className="text-lg text-blue-700 dark:text-blue-300 font-medium line-clamp-1">
                {previewData.google.title}
              </p>
              <p className="text-sm text-muted-foreground line-clamp-2">
                {previewData.google.description}
              </p>
            </div>
          </div>

          {/* Facebook Preview */}
          <div className="rounded-lg border overflow-hidden bg-card">
            <h4 className="text-sm font-medium p-3 border-b text-muted-foreground">
              Facebook / Open Graph
            </h4>
            {previewData.facebook.image ? (
              <div className="aspect-[1.91/1] bg-muted flex items-center justify-center">
                <ImageIcon className="h-12 w-12 text-muted-foreground" />
              </div>
            ) : (
              <div className="aspect-[1.91/1] bg-muted flex items-center justify-center">
                <span className="text-sm text-muted-foreground">1200x630 이미지</span>
              </div>
            )}
            <div className="p-3 space-y-1">
              <p className="text-xs text-muted-foreground uppercase">
                {previewData.facebook.siteName}
              </p>
              <p className="font-medium line-clamp-1">{previewData.facebook.title}</p>
              <p className="text-sm text-muted-foreground line-clamp-2">
                {previewData.facebook.description}
              </p>
            </div>
          </div>

          {/* Twitter Preview */}
          <div className="rounded-lg border overflow-hidden bg-card">
            <h4 className="text-sm font-medium p-3 border-b text-muted-foreground">
              Twitter Card
            </h4>
            {previewData.twitter.image ? (
              <div className="aspect-[2/1] bg-muted flex items-center justify-center">
                <ImageIcon className="h-12 w-12 text-muted-foreground" />
              </div>
            ) : (
              <div className="aspect-[2/1] bg-muted flex items-center justify-center">
                <span className="text-sm text-muted-foreground">Twitter 이미지</span>
              </div>
            )}
            <div className="p-3 space-y-1">
              <p className="font-medium line-clamp-1">{previewData.twitter.title}</p>
              <p className="text-sm text-muted-foreground line-clamp-2">
                {previewData.twitter.description}
              </p>
              <p className="text-xs text-muted-foreground">{previewData.twitter.site}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Generated Code */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label>생성된 메타 태그</Label>
          <Button variant="outline" size="sm" onClick={handleCopy}>
            {copied ? (
              <Check className="h-4 w-4 mr-2" />
            ) : (
              <Copy className="h-4 w-4 mr-2" />
            )}
            {copied ? "복사됨" : "복사"}
          </Button>
        </div>
        <pre className="p-4 rounded-lg bg-muted font-mono text-sm overflow-x-auto whitespace-pre-wrap">
          {generatedCode || "<!-- 위 필드를 입력하면 메타 태그가 생성됩니다 -->"}
        </pre>
      </div>
    </div>
  );
}
