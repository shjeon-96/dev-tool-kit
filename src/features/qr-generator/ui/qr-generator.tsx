"use client";

import { useQrGenerator, type QRType } from "../model/use-qr-generator";
import {
  Button,
  Input,
  Label,
  Slider,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Switch,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/shared/ui";
import { Download, Link, Type, Wifi, User } from "lucide-react";
import { useLeadCaptureContext } from "@/features/lead-capture";

const qrTypes: { value: QRType; label: string; icon: typeof Link }[] = [
  { value: "url", label: "URL", icon: Link },
  { value: "text", label: "텍스트", icon: Type },
  { value: "wifi", label: "WiFi", icon: Wifi },
  { value: "vcard", label: "연락처", icon: User },
];

export function QrGenerator() {
  const {
    options,
    qrDataUrl,
    error,
    updateOptions,
    updateWifiData,
    updateVCardData,
    downloadQR,
  } = useQrGenerator();

  const { openModal } = useLeadCaptureContext();

  const handleDownload = (format: "png" | "svg") => {
    openModal("qr-generator", () => downloadQR(format));
  };

  return (
    <div className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Left Panel - Input */}
        <div className="space-y-6">
          {/* QR Type Selection */}
          <Tabs
            value={options.type}
            onValueChange={(value) => updateOptions({ type: value as QRType })}
          >
            <TabsList className="grid grid-cols-4 w-full">
              {qrTypes.map((type) => (
                <TabsTrigger key={type.value} value={type.value}>
                  <type.icon className="h-4 w-4 mr-2" />
                  {type.label}
                </TabsTrigger>
              ))}
            </TabsList>

            {/* URL Content */}
            <TabsContent value="url" className="space-y-4">
              <div className="space-y-2">
                <Label>URL 주소</Label>
                <Input
                  type="url"
                  placeholder="https://example.com"
                  value={options.content}
                  onChange={(e) => updateOptions({ content: e.target.value })}
                />
              </div>
            </TabsContent>

            {/* Text Content */}
            <TabsContent value="text" className="space-y-4">
              <div className="space-y-2">
                <Label>텍스트 내용</Label>
                <textarea
                  className="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  placeholder="QR 코드에 포함할 텍스트를 입력하세요"
                  value={options.content}
                  onChange={(e) => updateOptions({ content: e.target.value })}
                />
              </div>
            </TabsContent>

            {/* WiFi Content */}
            <TabsContent value="wifi" className="space-y-4">
              <div className="space-y-2">
                <Label>네트워크 이름 (SSID)</Label>
                <Input
                  placeholder="WiFi 네트워크 이름"
                  value={options.wifiData.ssid}
                  onChange={(e) => updateWifiData({ ssid: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>비밀번호</Label>
                <Input
                  type="password"
                  placeholder="WiFi 비밀번호"
                  value={options.wifiData.password}
                  onChange={(e) => updateWifiData({ password: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>암호화 방식</Label>
                <Select
                  value={options.wifiData.encryption}
                  onValueChange={(value: "WPA" | "WEP" | "nopass") =>
                    updateWifiData({ encryption: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="WPA">WPA/WPA2</SelectItem>
                    <SelectItem value="WEP">WEP</SelectItem>
                    <SelectItem value="nopass">암호 없음</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="hidden-network">숨겨진 네트워크</Label>
                <Switch
                  id="hidden-network"
                  checked={options.wifiData.hidden}
                  onCheckedChange={(checked) =>
                    updateWifiData({ hidden: checked })
                  }
                />
              </div>
            </TabsContent>

            {/* vCard Content */}
            <TabsContent value="vcard" className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>이름</Label>
                  <Input
                    placeholder="길동"
                    value={options.vcardData.firstName}
                    onChange={(e) =>
                      updateVCardData({ firstName: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label>성</Label>
                  <Input
                    placeholder="홍"
                    value={options.vcardData.lastName}
                    onChange={(e) =>
                      updateVCardData({ lastName: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label>전화번호</Label>
                <Input
                  type="tel"
                  placeholder="010-1234-5678"
                  value={options.vcardData.phone}
                  onChange={(e) => updateVCardData({ phone: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>이메일</Label>
                <Input
                  type="email"
                  placeholder="example@email.com"
                  value={options.vcardData.email}
                  onChange={(e) => updateVCardData({ email: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>소속/회사</Label>
                <Input
                  placeholder="회사명"
                  value={options.vcardData.organization}
                  onChange={(e) =>
                    updateVCardData({ organization: e.target.value })
                  }
                />
              </div>
            </TabsContent>
          </Tabs>

          {/* Style Options */}
          <div className="rounded-lg border p-4 space-y-4">
            <h3 className="font-medium">스타일 설정</h3>

            {/* Size */}
            <div className="space-y-2">
              <div className="flex justify-between">
                <Label>크기</Label>
                <span className="text-sm text-muted-foreground">
                  {options.size}px
                </span>
              </div>
              <Slider
                value={[options.size]}
                onValueChange={([value]) => updateOptions({ size: value })}
                min={100}
                max={500}
                step={50}
              />
            </div>

            {/* Colors */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>전경색</Label>
                <div className="flex gap-2">
                  <input
                    type="color"
                    value={options.foregroundColor}
                    onChange={(e) =>
                      updateOptions({ foregroundColor: e.target.value })
                    }
                    className="h-9 w-12 rounded border cursor-pointer"
                  />
                  <Input
                    value={options.foregroundColor}
                    onChange={(e) =>
                      updateOptions({ foregroundColor: e.target.value })
                    }
                    className="flex-1"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label>배경색</Label>
                <div className="flex gap-2">
                  <input
                    type="color"
                    value={options.backgroundColor}
                    onChange={(e) =>
                      updateOptions({ backgroundColor: e.target.value })
                    }
                    className="h-9 w-12 rounded border cursor-pointer"
                  />
                  <Input
                    value={options.backgroundColor}
                    onChange={(e) =>
                      updateOptions({ backgroundColor: e.target.value })
                    }
                    className="flex-1"
                  />
                </div>
              </div>
            </div>

            {/* Error Correction */}
            <div className="space-y-2">
              <Label>오류 정정 레벨</Label>
              <Select
                value={options.errorCorrectionLevel}
                onValueChange={(value: "L" | "M" | "Q" | "H") =>
                  updateOptions({ errorCorrectionLevel: value })
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="L">L (7%)</SelectItem>
                  <SelectItem value="M">M (15%)</SelectItem>
                  <SelectItem value="Q">Q (25%)</SelectItem>
                  <SelectItem value="H">H (30%)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Right Panel - Preview */}
        <div className="space-y-4">
          <div className="rounded-lg border p-4">
            <h3 className="font-medium mb-4">미리보기</h3>
            <div
              className="aspect-square rounded-lg flex items-center justify-center"
              style={{ backgroundColor: options.backgroundColor }}
            >
              {qrDataUrl ? (
                <img
                  src={qrDataUrl}
                  alt="QR Code"
                  className="max-w-full max-h-full"
                />
              ) : (
                <p className="text-muted-foreground text-sm">
                  내용을 입력하면 QR 코드가 생성됩니다
                </p>
              )}
            </div>
          </div>

          {/* Error Display */}
          {error && (
            <div className="rounded-lg border border-destructive bg-destructive/10 p-4 text-destructive text-sm">
              {error}
            </div>
          )}

          {/* Download Buttons */}
          {qrDataUrl && (
            <div className="flex gap-3">
              <Button onClick={() => handleDownload("png")} className="flex-1">
                <Download className="mr-2 h-4 w-4" />
                PNG 다운로드
              </Button>
              <Button
                variant="outline"
                onClick={() => handleDownload("svg")}
                className="flex-1"
              >
                <Download className="mr-2 h-4 w-4" />
                SVG 다운로드
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
