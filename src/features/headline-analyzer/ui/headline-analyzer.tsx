"use client";

import {
  Lightbulb,
  TrendingUp,
  Clock,
  Hash,
  Type,
  Zap,
  Heart,
  BarChart3,
  RefreshCw,
} from "lucide-react";
import { useHeadlineAnalyzer } from "../model/use-headline-analyzer";
import { getGradeColor, getHeadlineTypeLabel } from "../lib/analyzer";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";
import { Textarea } from "@/shared/ui/textarea";
import { Button } from "@/shared/ui/button";
import { Badge } from "@/shared/ui/badge";
import { Progress } from "@/shared/ui/progress";
import { cn } from "@/shared/lib/utils";

export function HeadlineAnalyzer() {
  const { headline, setHeadline, analysis, clear, examples, loadExample } =
    useHeadlineAnalyzer();

  return (
    <div className="space-y-6">
      {/* Input Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Type className="h-5 w-5" />
            Enter Your Headline
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea
            placeholder="Type or paste your headline here..."
            value={headline}
            onChange={(e) => setHeadline(e.target.value)}
            className="min-h-[100px] text-lg"
          />
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" size="sm" onClick={clear}>
              <RefreshCw className="h-4 w-4 mr-2" />
              Clear
            </Button>
            <div className="flex-1" />
            <span className="text-sm text-muted-foreground self-center">
              Examples:
            </span>
            {examples.slice(0, 3).map((example, index) => (
              <Button
                key={index}
                variant="ghost"
                size="sm"
                onClick={() => loadExample(index)}
                className="text-xs max-w-[150px] truncate"
              >
                {example.slice(0, 20)}...
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Score Overview */}
      <div className="grid gap-4 md:grid-cols-4">
        {/* Overall Score */}
        <Card className="md:col-span-2">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Headline Score</p>
                <div className="flex items-baseline gap-2">
                  <span
                    className={cn(
                      "text-5xl font-bold",
                      getGradeColor(analysis.grade),
                    )}
                  >
                    {analysis.score}
                  </span>
                  <span
                    className={cn(
                      "text-3xl font-semibold",
                      getGradeColor(analysis.grade),
                    )}
                  >
                    {analysis.grade}
                  </span>
                </div>
              </div>
              <div className="text-right">
                <Badge variant="outline" className="mb-2">
                  {getHeadlineTypeLabel(analysis.headlineType)}
                </Badge>
                <Progress value={analysis.score} className="w-32" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-2">
              <Hash className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Word Count</span>
            </div>
            <p className="text-2xl font-bold mt-1">{analysis.wordCount}</p>
            <p className="text-xs text-muted-foreground">
              {analysis.seo.isOptimalWordCount ? "✓ Optimal" : "Suboptimal"}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Read Time</span>
            </div>
            <p className="text-2xl font-bold mt-1">{analysis.readingTime}s</p>
            <p className="text-xs text-muted-foreground">
              {analysis.characterCount} characters
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Analysis */}
      <div className="grid gap-4 md:grid-cols-2">
        {/* Word Balance */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <BarChart3 className="h-5 w-5" />
              Word Balance
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <WordBalanceBar
              label="Common Words"
              percentage={analysis.wordBalance.commonPercentage}
              words={analysis.wordBalance.commonWords}
              color="bg-slate-400"
            />
            <WordBalanceBar
              label="Uncommon Words"
              percentage={analysis.wordBalance.uncommonPercentage}
              words={analysis.wordBalance.uncommonWords}
              color="bg-blue-500"
            />
            <WordBalanceBar
              label="Emotional Words"
              percentage={analysis.wordBalance.emotionalPercentage}
              words={analysis.wordBalance.emotionalWords}
              color="bg-purple-500"
            />
            <WordBalanceBar
              label="Power Words"
              percentage={analysis.wordBalance.powerPercentage}
              words={analysis.wordBalance.powerWords}
              color="bg-orange-500"
            />
          </CardContent>
        </Card>

        {/* Sentiment & SEO */}
        <div className="space-y-4">
          {/* Sentiment */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Heart className="h-5 w-5" />
                Sentiment
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <Badge
                  variant={
                    analysis.sentiment.type === "positive"
                      ? "default"
                      : analysis.sentiment.type === "negative"
                        ? "destructive"
                        : "secondary"
                  }
                  className="text-base px-3 py-1 capitalize"
                >
                  {analysis.sentiment.type}
                </Badge>
                <span className="text-sm text-muted-foreground">
                  Score: {analysis.sentiment.score}
                </span>
              </div>
              {(analysis.sentiment.positiveWords.length > 0 ||
                analysis.sentiment.negativeWords.length > 0) && (
                <div className="mt-3 space-y-2">
                  {analysis.sentiment.positiveWords.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      <span className="text-xs text-green-600 dark:text-green-400">
                        +
                      </span>
                      {analysis.sentiment.positiveWords.map((word) => (
                        <Badge
                          key={word}
                          variant="outline"
                          className="text-xs bg-green-50 dark:bg-green-950"
                        >
                          {word}
                        </Badge>
                      ))}
                    </div>
                  )}
                  {analysis.sentiment.negativeWords.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      <span className="text-xs text-red-600 dark:text-red-400">
                        -
                      </span>
                      {analysis.sentiment.negativeWords.map((word) => (
                        <Badge
                          key={word}
                          variant="outline"
                          className="text-xs bg-red-50 dark:bg-red-950"
                        >
                          {word}
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>

          {/* SEO Factors */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <TrendingUp className="h-5 w-5" />
                SEO Factors
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-3">
                <SeoFactor
                  label="Has Numbers"
                  value={analysis.seo.hasNumbers}
                />
                <SeoFactor
                  label="Starts w/ Number"
                  value={analysis.seo.startsWithNumber}
                />
                <SeoFactor
                  label="Has Brackets"
                  value={analysis.seo.hasBrackets}
                />
                <SeoFactor
                  label="Optimal Length"
                  value={analysis.seo.isOptimalLength}
                />
              </div>
              <div className="mt-3">
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-muted-foreground">Length Score</span>
                  <span>{analysis.seo.lengthScore}%</span>
                </div>
                <Progress value={analysis.seo.lengthScore} />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Suggestions */}
      {analysis.suggestions.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Lightbulb className="h-5 w-5 text-yellow-500" />
              Suggestions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {analysis.suggestions.map((suggestion, index) => (
                <li key={index} className="flex items-start gap-2">
                  <Zap className="h-4 w-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">{suggestion}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

interface WordBalanceBarProps {
  label: string;
  percentage: number;
  words: string[];
  color: string;
}

function WordBalanceBar({
  label,
  percentage,
  words,
  color,
}: WordBalanceBarProps) {
  return (
    <div className="space-y-1">
      <div className="flex justify-between text-sm">
        <span>{label}</span>
        <span className="text-muted-foreground">{percentage}%</span>
      </div>
      <div className="h-2 bg-muted rounded-full overflow-hidden">
        <div
          className={cn("h-full rounded-full transition-all", color)}
          style={{ width: `${Math.min(percentage, 100)}%` }}
        />
      </div>
      {words.length > 0 && (
        <div className="flex flex-wrap gap-1 mt-1">
          {words.slice(0, 5).map((word) => (
            <Badge key={word} variant="secondary" className="text-xs">
              {word}
            </Badge>
          ))}
          {words.length > 5 && (
            <Badge variant="secondary" className="text-xs">
              +{words.length - 5}
            </Badge>
          )}
        </div>
      )}
    </div>
  );
}

interface SeoFactorProps {
  label: string;
  value: boolean;
}

function SeoFactor({ label, value }: SeoFactorProps) {
  return (
    <div className="flex items-center gap-2">
      <div
        className={cn(
          "w-3 h-3 rounded-full",
          value ? "bg-green-500" : "bg-muted",
        )}
      />
      <span className="text-sm">{label}</span>
    </div>
  );
}
