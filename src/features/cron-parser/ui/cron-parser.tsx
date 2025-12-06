"use client";

import { useState } from "react";
import { useCronParser, cronPresets } from "../model/use-cron-parser";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import {
  Button,
  Input,
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui";
import { Copy, Check, RotateCcw, Clock, Calendar } from "lucide-react";

export function CronParser() {
  const {
    expression,
    setExpression,
    description,
    nextExecutions,
    nextCount,
    setNextCount,
    error,
    applyPreset,
    copyToClipboard,
    handleClear,
  } = useCronParser();

  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (expression) {
      const success = await copyToClipboard(expression);
      if (success) {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    }
  };

  const cronFields = [
    { label: "분", range: "0-59", position: 1 },
    { label: "시", range: "0-23", position: 2 },
    { label: "일", range: "1-31", position: 3 },
    { label: "월", range: "1-12", position: 4 },
    { label: "요일", range: "0-6", position: 5 },
  ];

  return (
    <div className="space-y-6">
      {/* Expression Input */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label>Cron 표현식</Label>
          <div className="flex gap-1">
            <Button variant="ghost" size="icon-sm" onClick={handleCopy}>
              {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
            </Button>
            <Button variant="ghost" size="icon-sm" onClick={handleClear}>
              <RotateCcw className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <Input
          type="text"
          placeholder="* * * * *"
          value={expression}
          onChange={(e) => setExpression(e.target.value)}
          className="font-mono text-lg text-center"
        />
      </div>

      {/* Field Reference */}
      <div className="rounded-lg border p-4">
        <div className="grid grid-cols-5 gap-2 text-center text-sm">
          {cronFields.map((field) => (
            <div key={field.position}>
              <p className="font-medium">{field.label}</p>
              <p className="text-xs text-muted-foreground">{field.range}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Error Display */}
      {error && (
        <div className="rounded-lg border border-destructive bg-destructive/10 p-4 text-destructive">
          {error}
        </div>
      )}

      {/* Description */}
      {description && !error && (
        <div className="rounded-lg border p-4 bg-muted">
          <div className="flex items-center gap-2 mb-2">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">설명</span>
          </div>
          <p className="text-lg font-medium">{description}</p>
        </div>
      )}

      <div className="grid gap-6 md:grid-cols-2">
        {/* Presets */}
        <div className="rounded-lg border p-4">
          <h3 className="font-medium mb-3">프리셋</h3>
          <div className="grid grid-cols-2 gap-2">
            {cronPresets.map((preset) => (
              <Button
                key={preset.expression}
                variant={expression === preset.expression ? "secondary" : "outline"}
                size="sm"
                onClick={() => applyPreset(preset)}
                className="justify-start"
              >
                <span className="truncate">{preset.label}</span>
              </Button>
            ))}
          </div>
        </div>

        {/* Next Executions */}
        <div className="rounded-lg border p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-medium flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              다음 실행
            </h3>
            <Select
              value={nextCount.toString()}
              onValueChange={(value) => setNextCount(parseInt(value))}
            >
              <SelectTrigger className="w-20">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="5">5회</SelectItem>
                <SelectItem value="10">10회</SelectItem>
                <SelectItem value="20">20회</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {nextExecutions.length > 0 ? (
            <div className="space-y-2 max-h-[300px] overflow-y-auto">
              {nextExecutions.map((date, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between text-sm p-2 bg-muted rounded"
                >
                  <span className="text-muted-foreground">{index + 1}</span>
                  <span className="font-mono">
                    {format(date, "yyyy-MM-dd HH:mm:ss", { locale: ko })}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground text-center py-4">
              유효한 표현식을 입력하세요
            </p>
          )}
        </div>
      </div>

      {/* Quick Reference */}
      <div className="rounded-lg border p-4">
        <h3 className="font-medium mb-3">특수 문자</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div>
            <code className="bg-muted px-2 py-1 rounded">*</code>
            <span className="ml-2 text-muted-foreground">모든 값</span>
          </div>
          <div>
            <code className="bg-muted px-2 py-1 rounded">,</code>
            <span className="ml-2 text-muted-foreground">값 목록</span>
          </div>
          <div>
            <code className="bg-muted px-2 py-1 rounded">-</code>
            <span className="ml-2 text-muted-foreground">범위</span>
          </div>
          <div>
            <code className="bg-muted px-2 py-1 rounded">/</code>
            <span className="ml-2 text-muted-foreground">간격</span>
          </div>
        </div>
      </div>
    </div>
  );
}
