"use client";

import { useTranslations } from "next-intl";
import { Textarea } from "@/shared/ui/textarea";
import { Button } from "@/shared/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";
import { Label } from "@/shared/ui/label";
import { Badge } from "@/shared/ui/badge";
import { Slider } from "@/shared/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/select";
import {
  Calculator,
  Trash2,
  DollarSign,
  Hash,
  FileText,
  AlertTriangle,
  Cpu,
  Sparkles,
} from "lucide-react";
import { useTokenCounter } from "../model/use-token-counter";
import { MODEL_INFO, OPENAI_MODELS, ANTHROPIC_MODELS } from "../lib/pricing";
import { formatCurrency, formatNumber } from "../lib/tokenizer";
import { AIModel } from "../lib/types";

export function TokenCounter() {
  const t = useTranslations("tools.token-counter");
  const tCommon = useTranslations("common");

  const {
    text,
    model,
    outputRatio,
    result,
    setText,
    setModel,
    setOutputRatio,
    clearText,
    modelInfo,
    isOverLimit,
  } = useTokenCounter();

  return (
    <div className="space-y-6">
      {/* Model Selection */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <Cpu className="h-4 w-4" />
            {t("selectModel")}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Select value={model} onValueChange={(v) => setModel(v as AIModel)}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <div className="px-2 py-1.5 text-xs font-semibold text-muted-foreground">
                OpenAI
              </div>
              {OPENAI_MODELS.map((m) => (
                <SelectItem key={m} value={m}>
                  <div className="flex items-center gap-2">
                    <span>{MODEL_INFO[m].name}</span>
                    <span className="text-xs text-muted-foreground">
                      ${MODEL_INFO[m].inputPrice}/$
                      {MODEL_INFO[m].outputPrice} per 1M
                    </span>
                  </div>
                </SelectItem>
              ))}
              <div className="px-2 py-1.5 text-xs font-semibold text-muted-foreground mt-2">
                Anthropic
              </div>
              {ANTHROPIC_MODELS.map((m) => (
                <SelectItem key={m} value={m}>
                  <div className="flex items-center gap-2">
                    <span>{MODEL_INFO[m].name}</span>
                    <span className="text-xs text-muted-foreground">
                      ${MODEL_INFO[m].inputPrice}/$
                      {MODEL_INFO[m].outputPrice} per 1M
                    </span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <div className="flex items-center gap-4 text-sm">
            <Badge variant="outline">
              {t("contextWindow")}: {formatNumber(modelInfo.contextWindow)}
            </Badge>
            <Badge variant="secondary">{modelInfo.description}</Badge>
          </div>
        </CardContent>
      </Card>

      {/* Input Section */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base flex items-center gap-2">
              <FileText className="h-4 w-4" />
              {t("inputText")}
            </CardTitle>
            <Button variant="ghost" size="sm" onClick={clearText}>
              <Trash2 className="h-4 w-4 mr-1" />
              {tCommon("clear")}
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder={t("placeholder")}
            className="h-[200px] sm:h-[250px] font-mono text-sm"
          />
        </CardContent>
      </Card>

      {/* Output Ratio Slider */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <Sparkles className="h-4 w-4" />
            {t("outputRatio")}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-4">
            <Slider
              value={[outputRatio]}
              onValueChange={(v) => setOutputRatio(v[0])}
              min={0.1}
              max={3.0}
              step={0.1}
              className="flex-1"
            />
            <span className="text-sm font-medium w-16 text-right">
              {outputRatio.toFixed(1)}x
            </span>
          </div>
          <p className="text-xs text-muted-foreground">
            {t("outputRatioHelp")}
          </p>
        </CardContent>
      </Card>

      {/* Results */}
      {result && (
        <div className="grid gap-4 md:grid-cols-2">
          {/* Token Count Card */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <Hash className="h-4 w-4" />
                {t("tokenCount")}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">{t("tokens")}</span>
                  <span className="text-2xl font-bold">
                    {formatNumber(result.count.tokens)}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">
                    {t("characters")}
                  </span>
                  <span className="font-medium">
                    {formatNumber(result.count.characters)}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">{t("words")}</span>
                  <span className="font-medium">
                    {formatNumber(result.count.words)}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">{t("lines")}</span>
                  <span className="font-medium">
                    {formatNumber(result.count.lines)}
                  </span>
                </div>

                {/* Context Usage */}
                <div className="pt-3 border-t">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-muted-foreground text-sm">
                      {t("contextUsage")}
                    </span>
                    <span className="text-sm font-medium">
                      {result.percentOfContext.toFixed(1)}%
                    </span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className={`h-full transition-all ${
                        isOverLimit
                          ? "bg-destructive"
                          : result.percentOfContext > 80
                            ? "bg-warning"
                            : "bg-primary"
                      }`}
                      style={{
                        width: `${Math.min(result.percentOfContext, 100)}%`,
                      }}
                    />
                  </div>
                  {isOverLimit && (
                    <div className="flex items-center gap-1 mt-2 text-destructive text-sm">
                      <AlertTriangle className="h-4 w-4" />
                      {t("exceedsContext")}
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Cost Estimate Card */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <DollarSign className="h-4 w-4" />
                {t("costEstimate")}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">
                    {t("inputCost")} ({formatNumber(result.count.tokens)}{" "}
                    tokens)
                  </span>
                  <span className="font-medium">
                    {formatCurrency(result.costEstimate.inputCost)}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">
                    {t("outputCost")} (
                    {formatNumber(result.costEstimate.outputTokensEstimate)}{" "}
                    tokens)
                  </span>
                  <span className="font-medium">
                    {formatCurrency(result.costEstimate.outputCost)}
                  </span>
                </div>
                <div className="flex justify-between items-center pt-3 border-t">
                  <span className="font-medium">{t("totalCost")}</span>
                  <span className="text-xl font-bold text-primary">
                    {formatCurrency(result.costEstimate.totalCost)}
                  </span>
                </div>

                {/* Price Info */}
                <div className="pt-3 border-t text-xs text-muted-foreground">
                  <div className="flex justify-between">
                    <span>{t("inputPrice")}</span>
                    <span>${modelInfo.inputPrice} / 1M tokens</span>
                  </div>
                  <div className="flex justify-between">
                    <span>{t("outputPrice")}</span>
                    <span>${modelInfo.outputPrice} / 1M tokens</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Empty State */}
      {!result && (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12 text-center">
            <Calculator className="h-12 w-12 text-muted-foreground/50 mb-4" />
            <p className="text-muted-foreground">{t("emptyState")}</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
