"use client";

import {
  usePrettierPlayground,
  type Language,
  type PrettierOptions,
} from "../model/use-prettier-playground";
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
  Switch,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/shared/ui";
import { Copy, Check, RotateCcw, FileCode, AlertCircle, Settings } from "lucide-react";
import { useState } from "react";

const languages: { value: Language; label: string }[] = [
  { value: "javascript", label: "JavaScript" },
  { value: "typescript", label: "TypeScript" },
  { value: "json", label: "JSON" },
  { value: "html", label: "HTML" },
  { value: "css", label: "CSS" },
  { value: "markdown", label: "Markdown" },
  { value: "yaml", label: "YAML" },
  { value: "graphql", label: "GraphQL" },
];

export function PrettierPlayground() {
  const {
    inputCode,
    setInputCode,
    outputCode,
    language,
    setLanguage,
    options,
    updateOption,
    resetOptions,
    isFormatting,
    error,
    generateConfig,
    copyToClipboard,
    loadExample,
    reset,
  } = usePrettierPlayground();

  const [copiedCode, setCopiedCode] = useState(false);
  const [copiedConfig, setCopiedConfig] = useState(false);

  const handleCopyCode = async () => {
    const success = await copyToClipboard(outputCode);
    if (success) {
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 2000);
    }
  };

  const handleCopyConfig = async () => {
    const success = await copyToClipboard(generateConfig());
    if (success) {
      setCopiedConfig(true);
      setTimeout(() => setCopiedConfig(false), 2000);
    }
  };

  return (
    <div className="space-y-6">
      {/* Toolbar */}
      <div className="flex items-center gap-4 flex-wrap">
        <div className="flex items-center gap-2">
          <Label>언어</Label>
          <Select value={language} onValueChange={(v) => setLanguage(v as Language)}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {languages.map((lang) => (
                <SelectItem key={lang.value} value={lang.value}>
                  {lang.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <Button variant="outline" size="sm" onClick={loadExample}>
          <FileCode className="h-4 w-4 mr-2" />
          예시 로드
        </Button>
        <Button variant="outline" size="sm" onClick={reset}>
          <RotateCcw className="h-4 w-4 mr-2" />
          초기화
        </Button>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Input */}
        <div className="space-y-2">
          <Label>입력 코드</Label>
          <Textarea
            value={inputCode}
            onChange={(e) => setInputCode(e.target.value)}
            placeholder="코드를 입력하세요..."
            className="font-mono text-sm min-h-[300px]"
          />
        </div>

        {/* Output */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label>
              포맷팅 결과
              {isFormatting && (
                <span className="ml-2 text-muted-foreground">(처리 중...)</span>
              )}
            </Label>
            <Button
              variant="outline"
              size="sm"
              onClick={handleCopyCode}
              disabled={!outputCode}
            >
              {copiedCode ? (
                <Check className="h-4 w-4 mr-2" />
              ) : (
                <Copy className="h-4 w-4 mr-2" />
              )}
              {copiedCode ? "복사됨" : "복사"}
            </Button>
          </div>
          <Textarea
            value={outputCode}
            readOnly
            placeholder="포맷팅 결과가 여기에 표시됩니다..."
            className="font-mono text-sm min-h-[300px]"
          />
        </div>
      </div>

      {/* Error */}
      {error && (
        <div className="flex items-center gap-2 p-3 rounded-lg bg-destructive/10 text-destructive">
          <AlertCircle className="h-4 w-4 flex-shrink-0" />
          <span className="text-sm">{error}</span>
        </div>
      )}

      {/* Options */}
      <Tabs defaultValue="common">
        <div className="flex items-center justify-between">
          <TabsList>
            <TabsTrigger value="common">
              <Settings className="h-4 w-4 mr-2" />
              일반 옵션
            </TabsTrigger>
            <TabsTrigger value="advanced">고급 옵션</TabsTrigger>
            <TabsTrigger value="config">.prettierrc</TabsTrigger>
          </TabsList>
          <Button variant="ghost" size="sm" onClick={resetOptions}>
            기본값으로 복원
          </Button>
        </div>

        <TabsContent value="common" className="space-y-4 mt-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <Label>줄 너비</Label>
              <Input
                type="number"
                value={options.printWidth}
                onChange={(e) =>
                  updateOption("printWidth", parseInt(e.target.value) || 80)
                }
                min={40}
                max={200}
              />
            </div>
            <div className="space-y-2">
              <Label>탭 너비</Label>
              <Input
                type="number"
                value={options.tabWidth}
                onChange={(e) =>
                  updateOption("tabWidth", parseInt(e.target.value) || 2)
                }
                min={1}
                max={8}
              />
            </div>
            <div className="flex items-center gap-2 pt-6">
              <Switch
                checked={options.useTabs}
                onCheckedChange={(checked) => updateOption("useTabs", checked)}
              />
              <Label>탭 사용</Label>
            </div>
            <div className="flex items-center gap-2 pt-6">
              <Switch
                checked={options.semi}
                onCheckedChange={(checked) => updateOption("semi", checked)}
              />
              <Label>세미콜론</Label>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="flex items-center gap-2">
              <Switch
                checked={options.singleQuote}
                onCheckedChange={(checked) => updateOption("singleQuote", checked)}
              />
              <Label>작은따옴표</Label>
            </div>
            <div className="flex items-center gap-2">
              <Switch
                checked={options.bracketSpacing}
                onCheckedChange={(checked) => updateOption("bracketSpacing", checked)}
              />
              <Label>괄호 공백</Label>
            </div>
            <div className="flex items-center gap-2">
              <Switch
                checked={options.bracketSameLine}
                onCheckedChange={(checked) => updateOption("bracketSameLine", checked)}
              />
              <Label>괄호 같은 줄</Label>
            </div>
            <div className="space-y-2">
              <Label>trailing comma</Label>
              <Select
                value={options.trailingComma}
                onValueChange={(v) =>
                  updateOption("trailingComma", v as PrettierOptions["trailingComma"])
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">all</SelectItem>
                  <SelectItem value="es5">es5</SelectItem>
                  <SelectItem value="none">none</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="advanced" className="space-y-4 mt-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <Label>Quote Props</Label>
              <Select
                value={options.quoteProps}
                onValueChange={(v) =>
                  updateOption("quoteProps", v as PrettierOptions["quoteProps"])
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="as-needed">as-needed</SelectItem>
                  <SelectItem value="consistent">consistent</SelectItem>
                  <SelectItem value="preserve">preserve</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center gap-2 pt-6">
              <Switch
                checked={options.jsxSingleQuote}
                onCheckedChange={(checked) => updateOption("jsxSingleQuote", checked)}
              />
              <Label>JSX 작은따옴표</Label>
            </div>
            <div className="space-y-2">
              <Label>Arrow Parens</Label>
              <Select
                value={options.arrowParens}
                onValueChange={(v) =>
                  updateOption("arrowParens", v as PrettierOptions["arrowParens"])
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="always">always</SelectItem>
                  <SelectItem value="avoid">avoid</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>End of Line</Label>
              <Select
                value={options.endOfLine}
                onValueChange={(v) =>
                  updateOption("endOfLine", v as PrettierOptions["endOfLine"])
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="lf">lf</SelectItem>
                  <SelectItem value="crlf">crlf</SelectItem>
                  <SelectItem value="cr">cr</SelectItem>
                  <SelectItem value="auto">auto</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <Label>Prose Wrap</Label>
              <Select
                value={options.proseWrap}
                onValueChange={(v) =>
                  updateOption("proseWrap", v as PrettierOptions["proseWrap"])
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="preserve">preserve</SelectItem>
                  <SelectItem value="always">always</SelectItem>
                  <SelectItem value="never">never</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>HTML 공백 민감도</Label>
              <Select
                value={options.htmlWhitespaceSensitivity}
                onValueChange={(v) =>
                  updateOption(
                    "htmlWhitespaceSensitivity",
                    v as PrettierOptions["htmlWhitespaceSensitivity"]
                  )
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="css">css</SelectItem>
                  <SelectItem value="strict">strict</SelectItem>
                  <SelectItem value="ignore">ignore</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="config" className="space-y-4 mt-4">
          <div className="flex items-center justify-between">
            <Label>.prettierrc 설정 파일</Label>
            <Button variant="outline" size="sm" onClick={handleCopyConfig}>
              {copiedConfig ? (
                <Check className="h-4 w-4 mr-2" />
              ) : (
                <Copy className="h-4 w-4 mr-2" />
              )}
              {copiedConfig ? "복사됨" : "복사"}
            </Button>
          </div>
          <pre className="p-4 rounded-lg bg-muted font-mono text-sm overflow-x-auto">
            {generateConfig()}
          </pre>
          <p className="text-sm text-muted-foreground">
            이 설정을 프로젝트 루트의 .prettierrc 파일에 저장하세요.
          </p>
        </TabsContent>
      </Tabs>
    </div>
  );
}
