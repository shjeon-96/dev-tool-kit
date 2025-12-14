"use client";

import { useState } from "react";
import { useUuidGenerator, type IdType } from "../model/use-uuid-generator";
import {
  Button,
  Input,
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Switch,
} from "@/shared/ui";
import { Copy, Check, RefreshCw, Trash2 } from "lucide-react";

const idTypes: { value: IdType; label: string; description: string }[] = [
  { value: "uuid-v4", label: "UUID v4", description: "랜덤 기반 (권장)" },
  { value: "uuid-v1", label: "UUID v1", description: "시간 기반" },
  { value: "ulid", label: "ULID", description: "정렬 가능한 ID" },
];

export function UuidGenerator() {
  const {
    options,
    generatedIds,
    updateOptions,
    handleGenerate,
    copyToClipboard,
    copyAllToClipboard,
    handleClear,
  } = useUuidGenerator();

  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [copiedAll, setCopiedAll] = useState(false);

  const handleCopy = async (text: string, index: number) => {
    const success = await copyToClipboard(text);
    if (success) {
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    }
  };

  const handleCopyAll = async () => {
    const success = await copyAllToClipboard();
    if (success) {
      setCopiedAll(true);
      setTimeout(() => setCopiedAll(false), 2000);
    }
  };

  return (
    <div className="space-y-6">
      {/* Options */}
      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-lg border p-4 space-y-4">
          <h3 className="font-medium">생성 옵션</h3>

          {/* Type Selection */}
          <div className="space-y-2">
            <Label htmlFor="id-type-select">ID 타입</Label>
            <Select
              value={options.type}
              onValueChange={(value: IdType) => updateOptions({ type: value })}
            >
              <SelectTrigger id="id-type-select" aria-label="Select ID type">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {idTypes.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    <div className="flex flex-col">
                      <span>{type.label}</span>
                      <span className="text-xs text-muted-foreground">
                        {type.description}
                      </span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Count */}
          <div className="space-y-2">
            <Label htmlFor="id-count-input">생성 개수</Label>
            <Input
              id="id-count-input"
              type="number"
              min={1}
              max={100}
              value={options.count}
              onChange={(e) =>
                updateOptions({
                  count: Math.min(
                    100,
                    Math.max(1, parseInt(e.target.value) || 1),
                  ),
                })
              }
              aria-label="Number of IDs to generate (1-100)"
            />
          </div>

          {/* Format Options */}
          <div className="flex items-center justify-between">
            <Label htmlFor="uppercase">대문자</Label>
            <Switch
              id="uppercase"
              checked={options.uppercase}
              onCheckedChange={(checked) =>
                updateOptions({ uppercase: checked })
              }
            />
          </div>

          {options.type !== "ulid" && (
            <div className="flex items-center justify-between">
              <Label htmlFor="no-dashes">하이픈 제거</Label>
              <Switch
                id="no-dashes"
                checked={options.noDashes}
                onCheckedChange={(checked) =>
                  updateOptions({ noDashes: checked })
                }
              />
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="rounded-lg border p-4 space-y-4">
          <h3 className="font-medium">생성</h3>
          <div className="space-y-3">
            <Button
              onClick={handleGenerate}
              className="w-full"
              aria-label={`Generate ${options.count} IDs`}
            >
              <RefreshCw className="h-4 w-4 mr-2" aria-hidden="true" />
              {options.count}개 생성
            </Button>
            {generatedIds.length > 0 && (
              <>
                <Button
                  variant="outline"
                  onClick={handleCopyAll}
                  className="w-full"
                  aria-label={
                    copiedAll ? "All IDs copied" : "Copy all IDs to clipboard"
                  }
                >
                  {copiedAll ? (
                    <Check className="h-4 w-4 mr-2" aria-hidden="true" />
                  ) : (
                    <Copy className="h-4 w-4 mr-2" aria-hidden="true" />
                  )}
                  전체 복사
                </Button>
                <Button
                  variant="outline"
                  onClick={handleClear}
                  className="w-full"
                  aria-label="Clear all generated IDs"
                >
                  <Trash2 className="h-4 w-4 mr-2" aria-hidden="true" />
                  초기화
                </Button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Generated IDs */}
      {generatedIds.length > 0 && (
        <div className="rounded-lg border p-4">
          <h3 className="font-medium mb-4">
            생성된 ID ({generatedIds.length}개)
          </h3>
          <div className="space-y-2 max-h-[400px] overflow-y-auto">
            {generatedIds.map((id, index) => (
              <div
                key={index}
                className="flex items-center justify-between gap-2 p-2 bg-muted rounded-lg"
              >
                <code className="text-sm font-mono flex-1 break-all">{id}</code>
                <Button
                  variant="ghost"
                  size="icon-sm"
                  onClick={() => handleCopy(id, index)}
                  aria-label={
                    copiedIndex === index ? "Copied" : "Copy ID to clipboard"
                  }
                >
                  {copiedIndex === index ? (
                    <Check className="h-4 w-4" aria-hidden="true" />
                  ) : (
                    <Copy className="h-4 w-4" aria-hidden="true" />
                  )}
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
