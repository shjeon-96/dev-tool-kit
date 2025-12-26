"use client";

import { useTranslations } from "next-intl";
import { Button } from "@/shared/ui";
import { Input } from "@/shared/ui";
import { Textarea } from "@/shared/ui";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui";
import { Label } from "@/shared/ui";
import { Badge } from "@/shared/ui";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/ui";
import { Plus, Trash2, Copy, Download, Upload } from "lucide-react";
import { useRobotsGenerator } from "../model/use-robots-generator";
import { DEFAULT_USER_AGENTS, COMMON_PATHS } from "../lib/types";
import { useCopyToClipboard } from "@/shared/lib/hooks";

export function RobotsGenerator() {
  const t = useTranslations("tools.robots-generator");
  const { copied, copy } = useCopyToClipboard();
  const {
    config,
    output,
    importText,
    setImportText,
    addUserAgent,
    removeUserAgent,
    updateUserAgent,
    addRule,
    removeRule,
    updateRule,
    setSitemapUrl,
    setCrawlDelay,
    loadSample,
    reset,
    importFromText,
    downloadFile,
  } = useRobotsGenerator();

  const handleCopy = async () => {
    await copy(output);
  };

  return (
    <div className="space-y-6">
      <Tabs defaultValue="editor">
        <TabsList>
          <TabsTrigger value="editor">{t("editor")}</TabsTrigger>
          <TabsTrigger value="import">{t("import")}</TabsTrigger>
        </TabsList>

        <TabsContent value="editor" className="space-y-4">
          {/* User Agents */}
          {config.userAgents.map((ua, index) => (
            <Card key={ua.id}>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base flex items-center gap-2">
                    User-agent {index + 1}
                    <Badge variant="outline">{ua.userAgent}</Badge>
                  </CardTitle>
                  {config.userAgents.length > 1 && (
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeUserAgent(ua.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* User Agent Select */}
                <div className="flex gap-2">
                  <Select
                    value={ua.userAgent}
                    onValueChange={(value) => updateUserAgent(ua.id, value)}
                  >
                    <SelectTrigger className="flex-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {DEFAULT_USER_AGENTS.map((agent) => (
                        <SelectItem key={agent.value} value={agent.value}>
                          {agent.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Input
                    value={ua.userAgent}
                    onChange={(e) => updateUserAgent(ua.id, e.target.value)}
                    placeholder={t("customUserAgent")}
                    className="flex-1"
                  />
                </div>

                {/* Rules */}
                <div className="space-y-2">
                  <Label>{t("rules")}</Label>
                  {ua.rules.map((rule) => (
                    <div key={rule.id} className="flex items-center gap-2">
                      <Select
                        value={rule.type}
                        onValueChange={(value) =>
                          updateRule(ua.id, rule.id, {
                            type: value as "allow" | "disallow",
                          })
                        }
                      >
                        <SelectTrigger className="w-[120px]">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="allow">
                            <span className="text-success">Allow</span>
                          </SelectItem>
                          <SelectItem value="disallow">
                            <span className="text-destructive">Disallow</span>
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <Select
                        value={rule.path}
                        onValueChange={(value) =>
                          updateRule(ua.id, rule.id, { path: value })
                        }
                      >
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder={t("selectPath")} />
                        </SelectTrigger>
                        <SelectContent>
                          {COMMON_PATHS.map((path) => (
                            <SelectItem key={path.value} value={path.value}>
                              {path.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <Input
                        value={rule.path}
                        onChange={(e) =>
                          updateRule(ua.id, rule.id, { path: e.target.value })
                        }
                        placeholder="/path/"
                        className="flex-1"
                      />
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeRule(ua.id, rule.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => addRule(ua.id, "allow")}
                    >
                      <Plus className="h-4 w-4 mr-1" />
                      Allow
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => addRule(ua.id, "disallow")}
                    >
                      <Plus className="h-4 w-4 mr-1" />
                      Disallow
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}

          <Button variant="outline" onClick={addUserAgent} className="w-full">
            <Plus className="h-4 w-4 mr-2" />
            {t("addUserAgent")}
          </Button>

          {/* Global Settings */}
          <Card>
            <CardHeader>
              <CardTitle>{t("globalSettings")}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>{t("sitemapUrl")}</Label>
                  <Input
                    value={config.sitemapUrl || ""}
                    onChange={(e) => setSitemapUrl(e.target.value)}
                    placeholder="https://example.com/sitemap.xml"
                  />
                </div>
                <div className="space-y-2">
                  <Label>{t("crawlDelay")}</Label>
                  <Input
                    type="number"
                    min={0}
                    value={config.crawlDelay || ""}
                    onChange={(e) =>
                      setCrawlDelay(
                        e.target.value
                          ? parseInt(e.target.value, 10)
                          : undefined,
                      )
                    }
                    placeholder="1"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="flex gap-2">
            <Button variant="outline" onClick={loadSample}>
              {t("loadSample")}
            </Button>
            <Button variant="ghost" onClick={reset}>
              {t("reset")}
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="import" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>{t("importTitle")}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea
                value={importText}
                onChange={(e) => setImportText(e.target.value)}
                placeholder={t("importPlaceholder")}
                className="font-mono text-sm min-h-[200px]"
              />
              <Button onClick={importFromText} disabled={!importText.trim()}>
                <Upload className="h-4 w-4 mr-2" />
                {t("importButton")}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Output */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>{t("output")}</span>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={handleCopy}>
                <Copy className="h-4 w-4 mr-2" />
                {copied ? t("copied") : t("copy")}
              </Button>
              <Button variant="outline" size="sm" onClick={downloadFile}>
                <Download className="h-4 w-4 mr-2" />
                {t("download")}
              </Button>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <pre className="bg-muted p-4 rounded-lg text-sm font-mono overflow-x-auto whitespace-pre-wrap">
            {output || t("emptyOutput")}
          </pre>
        </CardContent>
      </Card>
    </div>
  );
}
