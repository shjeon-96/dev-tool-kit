import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/ui/tabs";
import { JsonBulk } from "@/features/bulk-actions/json-bulk";
import { HashBulk } from "@/features/bulk-actions/hash-bulk";
import { QrBulk } from "@/features/bulk-actions/qr-bulk";
import { ImageBulk } from "@/features/bulk-actions/image-bulk";
import { FileJson, Hash, QrCode, Image, Layers } from "lucide-react";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("tools.bulk-actions");
  return {
    title: t("title"),
    description: t("description"),
  };
}

export default async function BulkActionsPage() {
  const t = await getTranslations("tools.bulk-actions");

  return (
    <div className="container max-w-6xl py-6">
      <div className="mb-8">
        <div className="flex items-center gap-3">
          <Layers className="h-8 w-8 text-primary" />
          <div>
            <h1 className="text-3xl font-bold">{t("title")}</h1>
            <p className="text-muted-foreground mt-1">{t("description")}</p>
          </div>
        </div>
      </div>

      <Tabs defaultValue="json" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:inline-grid">
          <TabsTrigger value="json" className="flex items-center gap-2">
            <FileJson className="h-4 w-4" />
            <span className="hidden sm:inline">JSON Formatter</span>
            <span className="sm:hidden">JSON</span>
          </TabsTrigger>
          <TabsTrigger value="hash" className="flex items-center gap-2">
            <Hash className="h-4 w-4" />
            <span className="hidden sm:inline">Hash Generator</span>
            <span className="sm:hidden">Hash</span>
          </TabsTrigger>
          <TabsTrigger value="qr" className="flex items-center gap-2">
            <QrCode className="h-4 w-4" />
            <span className="hidden sm:inline">QR Generator</span>
            <span className="sm:hidden">QR</span>
          </TabsTrigger>
          <TabsTrigger value="image" className="flex items-center gap-2">
            <Image className="h-4 w-4" />
            <span className="hidden sm:inline">Image Resize</span>
            <span className="sm:hidden">Image</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="json">
          <JsonBulk />
        </TabsContent>

        <TabsContent value="hash">
          <HashBulk />
        </TabsContent>

        <TabsContent value="qr">
          <QrBulk />
        </TabsContent>

        <TabsContent value="image">
          <ImageBulk />
        </TabsContent>
      </Tabs>
    </div>
  );
}
