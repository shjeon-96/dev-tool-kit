"use client";

import { useUAParser } from "../model/use-ua-parser";
import {
  Button,
  Label,
  Textarea,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui";
import { Copy, Check, RefreshCw, Monitor, Smartphone, Globe } from "lucide-react";
import { useState } from "react";

function InfoCard({
  title,
  icon,
  items,
}: {
  title: string;
  icon: React.ReactNode;
  items: { label: string; value?: string }[];
}) {
  return (
    <div className="p-4 rounded-lg border bg-card">
      <div className="flex items-center gap-2 mb-3">
        {icon}
        <h3 className="font-semibold">{title}</h3>
      </div>
      <div className="space-y-2">
        {items.map((item) => (
          <div key={item.label} className="flex justify-between text-sm">
            <span className="text-muted-foreground">{item.label}</span>
            <span className="font-mono">{item.value || "-"}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function UAParser() {
  const {
    userAgent,
    setUserAgent,
    parsedResult,
    isCurrentBrowser,
    useCurrentBrowser,
    copyToClipboard,
    commonUserAgents,
  } = useUAParser();

  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const success = await copyToClipboard(userAgent);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handlePresetChange = (value: string) => {
    const preset = commonUserAgents.find((ua) => ua.name === value);
    if (preset) {
      setUserAgent(preset.ua);
    }
  };

  return (
    <div className="space-y-6">
      {/* Input Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Label>User Agent 문자열</Label>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={useCurrentBrowser}
              className={isCurrentBrowser ? "border-primary" : ""}
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              현재 브라우저
            </Button>
            <Button variant="outline" size="sm" onClick={handleCopy}>
              {copied ? (
                <Check className="h-4 w-4 mr-2" />
              ) : (
                <Copy className="h-4 w-4 mr-2" />
              )}
              {copied ? "복사됨" : "복사"}
            </Button>
          </div>
        </div>

        <Textarea
          value={userAgent}
          onChange={(e) => setUserAgent(e.target.value)}
          placeholder="User Agent 문자열을 입력하세요..."
          className="font-mono text-sm min-h-[80px]"
        />

        <div className="flex items-center gap-4">
          <Label className="whitespace-nowrap">프리셋</Label>
          <Select onValueChange={handlePresetChange}>
            <SelectTrigger>
              <SelectValue placeholder="일반적인 User Agent 선택..." />
            </SelectTrigger>
            <SelectContent>
              {commonUserAgents.map((ua) => (
                <SelectItem key={ua.name} value={ua.name}>
                  {ua.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Parsed Results */}
      {parsedResult && (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <InfoCard
            title="브라우저"
            icon={<Globe className="h-5 w-5 text-blue-500" />}
            items={[
              { label: "이름", value: parsedResult.browser.name },
              { label: "버전", value: parsedResult.browser.version },
              { label: "메이저 버전", value: parsedResult.browser.major },
            ]}
          />

          <InfoCard
            title="엔진"
            icon={<Monitor className="h-5 w-5 text-green-500" />}
            items={[
              { label: "이름", value: parsedResult.engine.name },
              { label: "버전", value: parsedResult.engine.version },
            ]}
          />

          <InfoCard
            title="운영체제"
            icon={<Monitor className="h-5 w-5 text-purple-500" />}
            items={[
              { label: "이름", value: parsedResult.os.name },
              { label: "버전", value: parsedResult.os.version },
            ]}
          />

          <InfoCard
            title="디바이스"
            icon={<Smartphone className="h-5 w-5 text-orange-500" />}
            items={[
              { label: "제조사", value: parsedResult.device.vendor },
              { label: "모델", value: parsedResult.device.model },
              { label: "유형", value: parsedResult.device.type || "Desktop" },
            ]}
          />

          <InfoCard
            title="CPU"
            icon={<Monitor className="h-5 w-5 text-red-500" />}
            items={[
              { label: "아키텍처", value: parsedResult.cpu.architecture },
            ]}
          />
        </div>
      )}

      {/* Summary */}
      {parsedResult && (
        <div className="p-4 rounded-lg bg-muted">
          <h3 className="font-semibold mb-2">요약</h3>
          <p className="text-sm text-muted-foreground">
            {parsedResult.browser.name || "알 수 없는 브라우저"}{" "}
            {parsedResult.browser.version || ""} on{" "}
            {parsedResult.os.name || "알 수 없는 OS"}{" "}
            {parsedResult.os.version || ""}
            {parsedResult.device.type && ` (${parsedResult.device.type})`}
          </p>
        </div>
      )}
    </div>
  );
}
