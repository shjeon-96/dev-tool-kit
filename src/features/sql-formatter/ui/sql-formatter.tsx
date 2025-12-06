"use client";

import { useState } from "react";
import { useSqlFormatter, type SqlDialect } from "../model/use-sql-formatter";
import {
  Button,
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Switch,
} from "@/shared/ui";
import { Copy, Check, Trash2, ClipboardPaste, Wand2, Minimize2 } from "lucide-react";

const dialects: { value: SqlDialect; label: string }[] = [
  { value: "sql", label: "Standard SQL" },
  { value: "mysql", label: "MySQL" },
  { value: "postgresql", label: "PostgreSQL" },
  { value: "sqlite", label: "SQLite" },
  { value: "mariadb", label: "MariaDB" },
];

export function SqlFormatter() {
  const {
    input,
    output,
    error,
    options,
    setInput,
    handleFormat,
    handleMinify,
    updateOptions,
    copyToClipboard,
    handleClear,
    handlePaste,
  } = useSqlFormatter();

  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (output) {
      const success = await copyToClipboard(output);
      if (success) {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    }
  };

  return (
    <div className="space-y-6">
      {/* Options */}
      <div className="rounded-lg border p-4">
        <div className="grid gap-4 md:grid-cols-4">
          {/* Dialect */}
          <div className="space-y-2">
            <Label>SQL 방언</Label>
            <Select
              value={options.dialect}
              onValueChange={(value: SqlDialect) =>
                updateOptions({ dialect: value })
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {dialects.map((dialect) => (
                  <SelectItem key={dialect.value} value={dialect.value}>
                    {dialect.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Tab Width */}
          <div className="space-y-2">
            <Label>들여쓰기</Label>
            <Select
              value={options.tabWidth.toString()}
              onValueChange={(value) =>
                updateOptions({ tabWidth: parseInt(value) })
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="2">2 spaces</SelectItem>
                <SelectItem value="4">4 spaces</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Uppercase Keywords */}
          <div className="flex items-center justify-between md:flex-col md:items-start">
            <Label htmlFor="uppercase">대문자 키워드</Label>
            <Switch
              id="uppercase"
              checked={options.uppercase}
              onCheckedChange={(checked) => updateOptions({ uppercase: checked })}
            />
          </div>

          {/* Actions */}
          <div className="flex items-end gap-2">
            <Button onClick={handleFormat} className="flex-1">
              <Wand2 className="h-4 w-4 mr-2" />
              포맷
            </Button>
            <Button variant="outline" onClick={handleMinify}>
              <Minimize2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Error Display */}
      {error && (
        <div className="rounded-lg border border-destructive bg-destructive/10 p-4 text-destructive">
          {error}
        </div>
      )}

      {/* Editor */}
      <div className="grid gap-4 md:grid-cols-2">
        {/* Input */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label>입력 SQL</Label>
            <div className="flex gap-1">
              <Button variant="ghost" size="icon-sm" onClick={handlePaste}>
                <ClipboardPaste className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon-sm" onClick={handleClear}>
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <textarea
            className="flex min-h-[400px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 font-mono"
            placeholder="SELECT * FROM users WHERE id = 1;"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        </div>

        {/* Output */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label>포맷된 SQL</Label>
            <Button
              variant="ghost"
              size="icon-sm"
              onClick={handleCopy}
              disabled={!output}
            >
              {copied ? (
                <Check className="h-4 w-4" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
            </Button>
          </div>
          <textarea
            className="flex min-h-[400px] w-full rounded-md border border-input bg-muted px-3 py-2 text-sm font-mono"
            value={output}
            readOnly
            placeholder="포맷된 SQL이 여기에 표시됩니다"
          />
        </div>
      </div>
    </div>
  );
}
