"use client";

import { useTranslations } from "next-intl";
import { Button } from "@/shared/ui";
import { Textarea } from "@/shared/ui";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui";
import { Badge } from "@/shared/ui";
import { AlertCircle, AlertTriangle, Info, CheckCircle2 } from "lucide-react";
import { useMetaTagAnalyzer } from "../model/use-meta-tag-analyzer";
import { getGradeColor } from "../lib/analyzer";
import type { IssueLevel } from "../lib/types";

export function MetaTagAnalyzer() {
  const t = useTranslations("tools.meta-tag-analyzer");
  const {
    html,
    setHtml,
    result,
    isAnalyzing,
    error,
    analyze,
    loadSample,
    clear,
  } = useMetaTagAnalyzer();

  const getIssueIcon = (level: IssueLevel) => {
    switch (level) {
      case "error":
        return <AlertCircle className="h-4 w-4 text-destructive" />;
      case "warning":
        return <AlertTriangle className="h-4 w-4 text-warning" />;
      case "info":
        return <Info className="h-4 w-4 text-info" />;
    }
  };

  const getIssueBadgeVariant = (level: IssueLevel) => {
    switch (level) {
      case "error":
        return "destructive";
      case "warning":
        return "outline";
      case "info":
        return "secondary";
    }
  };

  return (
    <div className="space-y-6">
      {/* Input */}
      <Card>
        <CardHeader>
          <CardTitle>{t("htmlInput")}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea
            value={html}
            onChange={(e) => setHtml(e.target.value)}
            placeholder={t("placeholder")}
            className="font-mono text-sm min-h-[200px]"
          />
          <div className="flex gap-2">
            <Button onClick={analyze} disabled={isAnalyzing || !html.trim()}>
              {isAnalyzing ? t("analyzing") : t("analyze")}
            </Button>
            <Button variant="outline" onClick={loadSample}>
              {t("loadSample")}
            </Button>
            <Button variant="ghost" onClick={clear} disabled={!html}>
              {t("clear")}
            </Button>
          </div>
          {error && (
            <p className="text-sm text-destructive flex items-center gap-2">
              <AlertCircle className="h-4 w-4" />
              {error}
            </p>
          )}
        </CardContent>
      </Card>

      {/* Results */}
      {result && (
        <>
          {/* Score */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div
                    className={`text-5xl font-bold ${getGradeColor(result.grade)}`}
                  >
                    {result.grade}
                  </div>
                  <div>
                    <div className="text-2xl font-semibold">
                      {result.score}/100
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {t("seoScore")}
                    </div>
                  </div>
                </div>
                <div className="text-right text-sm text-muted-foreground">
                  <div>
                    {t("issues")}: {result.issues.length}
                  </div>
                  <div>
                    {t("wordCount")}: {result.wordCount}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Issues */}
          {result.issues.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5" />
                  {t("issuesFound")} ({result.issues.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {result.issues.map((issue, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-3 p-3 rounded-lg bg-muted/50"
                    >
                      {getIssueIcon(issue.level)}
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <Badge variant={getIssueBadgeVariant(issue.level)}>
                            {issue.type}
                          </Badge>
                          <span className="text-sm font-medium">
                            {issue.message}
                          </span>
                        </div>
                        {issue.suggestion && (
                          <p className="text-sm text-muted-foreground mt-1">
                            💡 {issue.suggestion}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {result.issues.length === 0 && (
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-3 text-success">
                  <CheckCircle2 className="h-6 w-6" />
                  <span className="font-medium">{t("noIssues")}</span>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Meta Tags */}
          <div className="grid md:grid-cols-2 gap-4">
            {/* Basic Meta */}
            <Card>
              <CardHeader>
                <CardTitle>{t("basicMeta")}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <MetaItem label="Title" value={result.meta.title} />
                <MetaItem label="Description" value={result.meta.description} />
                <MetaItem label="Keywords" value={result.meta.keywords} />
                <MetaItem label="Canonical" value={result.meta.canonical} />
                <MetaItem label="Viewport" value={result.meta.viewport} />
              </CardContent>
            </Card>

            {/* Open Graph */}
            <Card>
              <CardHeader>
                <CardTitle>Open Graph</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <MetaItem label="og:title" value={result.openGraph.title} />
                <MetaItem
                  label="og:description"
                  value={result.openGraph.description}
                />
                <MetaItem label="og:image" value={result.openGraph.image} />
                <MetaItem label="og:url" value={result.openGraph.url} />
                <MetaItem label="og:type" value={result.openGraph.type} />
              </CardContent>
            </Card>

            {/* Twitter Card */}
            <Card>
              <CardHeader>
                <CardTitle>Twitter Card</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <MetaItem
                  label="twitter:card"
                  value={result.twitterCard.card}
                />
                <MetaItem
                  label="twitter:title"
                  value={result.twitterCard.title}
                />
                <MetaItem
                  label="twitter:description"
                  value={result.twitterCard.description}
                />
                <MetaItem
                  label="twitter:image"
                  value={result.twitterCard.image}
                />
              </CardContent>
            </Card>

            {/* Headings */}
            <Card>
              <CardHeader>
                <CardTitle>{t("headings")}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <div>
                  <span className="font-medium">
                    H1 ({result.h1Tags.length}):
                  </span>
                  {result.h1Tags.length > 0 ? (
                    <ul className="list-disc list-inside ml-2 text-muted-foreground">
                      {result.h1Tags.map((h1, i) => (
                        <li key={i}>{h1}</li>
                      ))}
                    </ul>
                  ) : (
                    <span className="text-muted-foreground ml-2">없음</span>
                  )}
                </div>
                <div>
                  <span className="font-medium">
                    H2 ({result.h2Tags.length}):
                  </span>
                  {result.h2Tags.length > 0 ? (
                    <ul className="list-disc list-inside ml-2 text-muted-foreground">
                      {result.h2Tags.slice(0, 5).map((h2, i) => (
                        <li key={i}>{h2}</li>
                      ))}
                      {result.h2Tags.length > 5 && (
                        <li className="text-muted-foreground">
                          +{result.h2Tags.length - 5} more
                        </li>
                      )}
                    </ul>
                  ) : (
                    <span className="text-muted-foreground ml-2">없음</span>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </>
      )}
    </div>
  );
}

function MetaItem({ label, value }: { label: string; value?: string }) {
  return (
    <div className="flex gap-2">
      <span className="font-medium min-w-[120px]">{label}:</span>
      <span className={value ? "text-foreground" : "text-muted-foreground"}>
        {value || "—"}
      </span>
    </div>
  );
}
