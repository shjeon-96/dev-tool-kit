"use client";

import { Files, Merge, Split, Minimize2 } from "lucide-react";
import { usePdfToolkit } from "../model/use-pdf-toolkit";
import { PdfMerge } from "./pdf-merge";
import { PdfSplit } from "./pdf-split";
import { PdfCompress } from "./pdf-compress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";
import type { PDFTab } from "../lib/types";

export function PdfToolkit() {
  const toolkit = usePdfToolkit();

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Files className="h-5 w-5" />
            PDF Toolkit
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs
            value={toolkit.activeTab}
            onValueChange={(v) => toolkit.setActiveTab(v as PDFTab)}
          >
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="merge" className="flex items-center gap-2">
                <Merge className="h-4 w-4" />
                Merge
              </TabsTrigger>
              <TabsTrigger value="split" className="flex items-center gap-2">
                <Split className="h-4 w-4" />
                Split
              </TabsTrigger>
              <TabsTrigger value="compress" className="flex items-center gap-2">
                <Minimize2 className="h-4 w-4" />
                Compress
              </TabsTrigger>
            </TabsList>

            <TabsContent value="merge" className="mt-6">
              <PdfMerge toolkit={toolkit} />
            </TabsContent>

            <TabsContent value="split" className="mt-6">
              <PdfSplit toolkit={toolkit} />
            </TabsContent>

            <TabsContent value="compress" className="mt-6">
              <PdfCompress toolkit={toolkit} />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
