"use client";

import {
  useCurlBuilder,
  type HttpMethod,
  type AuthType,
  type BodyType,
} from "../model/use-curl-builder";
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
  Switch,
} from "@/shared/ui";
import { Copy, Check, Plus, Trash2, RotateCcw, Upload } from "lucide-react";
import { useState } from "react";

const methods: HttpMethod[] = ["GET", "POST", "PUT", "PATCH", "DELETE", "HEAD", "OPTIONS"];

const methodColors: Record<HttpMethod, string> = {
  GET: "text-green-600",
  POST: "text-blue-600",
  PUT: "text-orange-600",
  PATCH: "text-purple-600",
  DELETE: "text-red-600",
  HEAD: "text-gray-600",
  OPTIONS: "text-gray-600",
};

export function CurlBuilder() {
  const {
    method,
    setMethod,
    url,
    setUrl,
    headers,
    addHeader,
    removeHeader,
    updateHeader,
    queryParams,
    addQueryParam,
    removeQueryParam,
    updateQueryParam,
    authType,
    setAuthType,
    authUsername,
    setAuthUsername,
    authPassword,
    setAuthPassword,
    authToken,
    setAuthToken,
    bodyType,
    setBodyType,
    bodyContent,
    setBodyContent,
    curlCommand,
    parseCurl,
    copyToClipboard,
    reset,
  } = useCurlBuilder();

  const [copied, setCopied] = useState(false);
  const [importCurl, setImportCurl] = useState("");
  const [showImport, setShowImport] = useState(false);

  const handleCopy = async () => {
    const success = await copyToClipboard(curlCommand);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleImport = () => {
    if (parseCurl(importCurl)) {
      setImportCurl("");
      setShowImport(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Import Section */}
      {showImport && (
        <div className="p-4 rounded-lg border bg-card space-y-3">
          <div className="flex items-center justify-between">
            <Label>cURL 명령어 가져오기</Label>
            <Button variant="ghost" size="sm" onClick={() => setShowImport(false)}>
              닫기
            </Button>
          </div>
          <Textarea
            value={importCurl}
            onChange={(e) => setImportCurl(e.target.value)}
            placeholder="curl 명령어를 붙여넣으세요..."
            className="font-mono text-sm min-h-[100px]"
          />
          <Button onClick={handleImport} disabled={!importCurl}>
            <Upload className="h-4 w-4 mr-2" />
            가져오기
          </Button>
        </div>
      )}

      {/* URL Bar */}
      <div className="flex gap-2">
        <Select value={method} onValueChange={(v) => setMethod(v as HttpMethod)}>
          <SelectTrigger className="w-32">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {methods.map((m) => (
              <SelectItem key={m} value={m}>
                <span className={methodColors[m]}>{m}</span>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Input
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://api.example.com/endpoint"
          className="flex-1 font-mono"
        />
        <Button variant="outline" onClick={() => setShowImport(!showImport)}>
          <Upload className="h-4 w-4" />
        </Button>
        <Button variant="outline" onClick={reset}>
          <RotateCcw className="h-4 w-4" />
        </Button>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="params">
        <TabsList>
          <TabsTrigger value="params">
            Params {queryParams.length > 0 && `(${queryParams.length})`}
          </TabsTrigger>
          <TabsTrigger value="headers">
            Headers {headers.length > 0 && `(${headers.length})`}
          </TabsTrigger>
          <TabsTrigger value="auth">Auth</TabsTrigger>
          <TabsTrigger value="body">Body</TabsTrigger>
        </TabsList>

        {/* Query Params */}
        <TabsContent value="params" className="space-y-3">
          {queryParams.map((param) => (
            <div key={param.id} className="flex items-center gap-2">
              <Switch
                checked={param.enabled}
                onCheckedChange={(checked) => updateQueryParam(param.id, { enabled: checked })}
              />
              <Input
                value={param.key}
                onChange={(e) => updateQueryParam(param.id, { key: e.target.value })}
                placeholder="Key"
                className="flex-1"
              />
              <Input
                value={param.value}
                onChange={(e) => updateQueryParam(param.id, { value: e.target.value })}
                placeholder="Value"
                className="flex-1"
              />
              <Button variant="ghost" size="sm" onClick={() => removeQueryParam(param.id)}>
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
          <Button variant="outline" size="sm" onClick={addQueryParam}>
            <Plus className="h-4 w-4 mr-2" />
            파라미터 추가
          </Button>
        </TabsContent>

        {/* Headers */}
        <TabsContent value="headers" className="space-y-3">
          {headers.map((header) => (
            <div key={header.id} className="flex items-center gap-2">
              <Switch
                checked={header.enabled}
                onCheckedChange={(checked) => updateHeader(header.id, { enabled: checked })}
              />
              <Input
                value={header.key}
                onChange={(e) => updateHeader(header.id, { key: e.target.value })}
                placeholder="Header Name"
                className="flex-1"
              />
              <Input
                value={header.value}
                onChange={(e) => updateHeader(header.id, { value: e.target.value })}
                placeholder="Value"
                className="flex-1"
              />
              <Button variant="ghost" size="sm" onClick={() => removeHeader(header.id)}>
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
          <Button variant="outline" size="sm" onClick={addHeader}>
            <Plus className="h-4 w-4 mr-2" />
            헤더 추가
          </Button>
        </TabsContent>

        {/* Auth */}
        <TabsContent value="auth" className="space-y-4">
          <div className="space-y-2">
            <Label>인증 유형</Label>
            <Select value={authType} onValueChange={(v) => setAuthType(v as AuthType)}>
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">None</SelectItem>
                <SelectItem value="basic">Basic Auth</SelectItem>
                <SelectItem value="bearer">Bearer Token</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {authType === "basic" && (
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Username</Label>
                <Input
                  value={authUsername}
                  onChange={(e) => setAuthUsername(e.target.value)}
                  placeholder="username"
                />
              </div>
              <div className="space-y-2">
                <Label>Password</Label>
                <Input
                  type="password"
                  value={authPassword}
                  onChange={(e) => setAuthPassword(e.target.value)}
                  placeholder="password"
                />
              </div>
            </div>
          )}

          {authType === "bearer" && (
            <div className="space-y-2">
              <Label>Token</Label>
              <Input
                value={authToken}
                onChange={(e) => setAuthToken(e.target.value)}
                placeholder="your-token-here"
                className="font-mono"
              />
            </div>
          )}
        </TabsContent>

        {/* Body */}
        <TabsContent value="body" className="space-y-4">
          <div className="space-y-2">
            <Label>Body 유형</Label>
            <Select value={bodyType} onValueChange={(v) => setBodyType(v as BodyType)}>
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">None</SelectItem>
                <SelectItem value="json">JSON</SelectItem>
                <SelectItem value="form">Form Data</SelectItem>
                <SelectItem value="raw">Raw</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {bodyType !== "none" && (
            <div className="space-y-2">
              <Label>
                {bodyType === "json" ? "JSON Body" : bodyType === "form" ? "Form Data" : "Raw Body"}
              </Label>
              <Textarea
                value={bodyContent}
                onChange={(e) => setBodyContent(e.target.value)}
                placeholder={
                  bodyType === "json"
                    ? '{"key": "value"}'
                    : bodyType === "form"
                    ? "key=value&key2=value2"
                    : "Enter raw body..."
                }
                className="font-mono text-sm min-h-[150px]"
              />
            </div>
          )}
        </TabsContent>
      </Tabs>

      {/* Generated cURL */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label>생성된 cURL 명령어</Label>
          <Button variant="outline" size="sm" onClick={handleCopy} disabled={!curlCommand}>
            {copied ? <Check className="h-4 w-4 mr-2" /> : <Copy className="h-4 w-4 mr-2" />}
            {copied ? "복사됨" : "복사"}
          </Button>
        </div>
        <pre className="p-4 rounded-lg bg-muted font-mono text-sm overflow-x-auto whitespace-pre-wrap">
          {curlCommand || "URL을 입력하면 cURL 명령어가 생성됩니다"}
        </pre>
      </div>
    </div>
  );
}
