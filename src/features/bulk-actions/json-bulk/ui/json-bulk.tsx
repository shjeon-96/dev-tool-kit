"use client";

import { useState, useCallback } from "react";
import {
  FileJson,
  Plus,
  Play,
  Trash2,
  Download,
  Copy,
  Upload,
  Crown,
  Loader2,
} from "lucide-react";
import {
  useJsonBulk,
  type JsonBulkItem,
  type BulkOperation,
} from "../model/use-json-bulk";
import { Button } from "@/shared/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/shared/ui/card";
import { Badge } from "@/shared/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/ui/table";
import { useToast } from "@/shared/ui/toast";
import { UpgradeModal } from "@/entities/subscription";
import {
  BulkStatusIcon,
  BulkStatsBar,
  BulkProgressBar,
  EmptyDropzone,
} from "@/shared/ui/bulk-status";
import { useFileDropzone, formatSize } from "@/shared/lib";

export function JsonBulk() {
  const {
    items,
    operation,
    indent,
    isProcessing,
    progress,
    stats,
    limits,
    isPro,
    setOperation,
    setIndent,
    addFiles,
    removeItem,
    clearAll,
    processAll,
    downloadItem,
    downloadAll,
    copyItem,
  } = useJsonBulk();

  const { showToast } = useToast();
  const [showUpgrade, setShowUpgrade] = useState(false);

  const handleFilesSelected = useCallback(
    async (files: File[]) => {
      const fileList = files as unknown as FileList;
      const result = await addFiles(fileList);
      if (!result.success) {
        if (!isPro) {
          setShowUpgrade(true);
        }
        showToast(result.error || "Limit reached", "error");
      }
    },
    [addFiles, isPro, showToast],
  );

  const { isDragging, getDropzoneProps, getInputProps, openFileDialog } =
    useFileDropzone({
      accept: ".json,application/json",
      multiple: true,
      maxFiles: limits.maxFiles,
      onFilesSelected: handleFilesSelected,
      onError: (error) => showToast(error, "error"),
      disabled: isProcessing,
    });

  const handleCopy = useCallback(
    async (item: JsonBulkItem) => {
      const success = await copyItem(item);
      if (success) {
        showToast("Copied to clipboard", "success");
      }
    },
    [copyItem, showToast],
  );

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <FileJson className="h-5 w-5" />
                Bulk JSON Formatter
              </CardTitle>
              <CardDescription>
                Format or minify multiple JSON files at once
              </CardDescription>
            </div>
            {!isPro && (
              <Badge variant="outline" className="gap-1">
                <Crown className="h-3 w-3" />
                Free: {limits.maxFiles} file
              </Badge>
            )}
          </div>
        </CardHeader>
        <CardContent>
          {/* Controls */}
          <div className="flex flex-wrap gap-4 mb-6">
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Operation:</span>
              <Select
                value={operation}
                onValueChange={(v) => setOperation(v as BulkOperation)}
              >
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="format">Format</SelectItem>
                  <SelectItem value="minify">Minify</SelectItem>
                  <SelectItem value="validate">Validate</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {operation === "format" && (
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">Indent:</span>
                <Select
                  value={indent.toString()}
                  onValueChange={(v) => setIndent(parseInt(v))}
                >
                  <SelectTrigger className="w-20">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="2">2</SelectItem>
                    <SelectItem value="4">4</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}

            <div className="flex-1" />

            <div className="flex items-center gap-2">
              <input {...getInputProps()} />
              <Button
                variant="outline"
                onClick={openFileDialog}
                disabled={isProcessing}
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Files
              </Button>

              {items.length > 0 && (
                <>
                  <Button
                    onClick={processAll}
                    disabled={isProcessing || stats.pending === 0}
                  >
                    {isProcessing ? (
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    ) : (
                      <Play className="h-4 w-4 mr-2" />
                    )}
                    Process All
                  </Button>

                  {stats.success > 0 && (
                    <Button variant="outline" onClick={downloadAll}>
                      <Download className="h-4 w-4 mr-2" />
                      Download ZIP
                    </Button>
                  )}

                  <Button
                    variant="ghost"
                    onClick={clearAll}
                    disabled={isProcessing}
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Clear
                  </Button>
                </>
              )}
            </div>
          </div>

          {/* Drop Zone */}
          {items.length === 0 && (
            <EmptyDropzone
              {...getDropzoneProps()}
              icon={<Upload className="h-12 w-12 text-muted-foreground" />}
              title="Drop JSON files here"
              description={`or click to browse (max ${limits.maxFiles} file${limits.maxFiles > 1 ? "s" : ""})`}
              isDragging={isDragging}
            />
          )}

          {/* Progress */}
          <BulkProgressBar
            isProcessing={isProcessing}
            progress={progress}
            className="mb-4"
          />

          {/* Stats */}
          {items.length > 0 && <BulkStatsBar stats={stats} className="mb-4" />}

          {/* Items Table */}
          {items.length > 0 && (
            <div className="border rounded-lg overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-10">Status</TableHead>
                    <TableHead>File Name</TableHead>
                    <TableHead className="w-24">Input Size</TableHead>
                    <TableHead className="w-24">Output Size</TableHead>
                    <TableHead className="w-32">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {items.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>
                        <BulkStatusIcon status={item.status} />
                      </TableCell>
                      <TableCell>
                        <div>
                          <span className="font-medium">{item.name}</span>
                          {item.error && (
                            <p className="text-xs text-red-500 mt-1">
                              {item.error}
                            </p>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {formatSize(item.input.length)}
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {item.output ? formatSize(item.output.length) : "-"}
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          {item.status === "success" && (
                            <>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleCopy(item)}
                              >
                                <Copy className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => downloadItem(item)}
                              >
                                <Download className="h-4 w-4" />
                              </Button>
                            </>
                          )}
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => removeItem(item.id)}
                            disabled={isProcessing}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Upgrade Modal */}
      <UpgradeModal
        open={showUpgrade}
        onOpenChange={setShowUpgrade}
        feature="bulk-json"
        currentLimit={`${limits.maxFiles} file`}
        proLimit="100 files"
      />
    </div>
  );
}
