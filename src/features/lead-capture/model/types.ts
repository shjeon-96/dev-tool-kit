export interface Lead {
  id: string;
  email: string;
  sourceTool: string;
  leadMagnetId: string;
  personaTag: string;
  subscribedAt: Date;
  convertedToPro: boolean;
  convertedAt: Date | null;
  unsubscribed: boolean;
}

export interface LeadCaptureState {
  isOpen: boolean;
  toolSlug: string | null;
  pendingDownload: (() => void) | null;
}

export interface CaptureLeadRequest {
  email: string;
  sourceTool: string;
  leadMagnetId: string;
  personaTag: string;
}

export interface CaptureLeadResponse {
  success: boolean;
  message?: string;
  leadMagnetUrl?: string;
}
