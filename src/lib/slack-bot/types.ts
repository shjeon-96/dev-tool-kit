/**
 * Slack Bot 타입 정의
 *
 * Slack Bolt API 기반 서버리스 봇
 */

// ============================================
// Slack 슬래시 명령어 타입
// ============================================

export interface SlackSlashCommand {
  token: string;
  team_id: string;
  team_domain: string;
  channel_id: string;
  channel_name: string;
  user_id: string;
  user_name: string;
  command: string;
  text: string;
  api_app_id: string;
  is_enterprise_install: string;
  response_url: string;
  trigger_id: string;
}

// ============================================
// Slack 블록 타입
// ============================================

export type SlackBlockType =
  | "section"
  | "divider"
  | "header"
  | "context"
  | "actions"
  | "image";

export interface SlackTextObject {
  type: "plain_text" | "mrkdwn";
  text: string;
  emoji?: boolean;
}

export interface SlackBlock {
  type: SlackBlockType;
  text?: SlackTextObject;
  block_id?: string;
  accessory?: SlackAccessory;
  elements?: SlackElement[];
  fields?: SlackTextObject[];
}

export interface SlackAccessory {
  type: "button" | "image";
  text?: SlackTextObject;
  url?: string;
  action_id?: string;
  image_url?: string;
  alt_text?: string;
}

export interface SlackElement {
  type: "button" | "mrkdwn" | "plain_text" | "image";
  text?: string | SlackTextObject;
  url?: string;
  action_id?: string;
  image_url?: string;
  alt_text?: string;
}

// ============================================
// Slack 응답 타입
// ============================================

export interface SlackResponse {
  response_type?: "in_channel" | "ephemeral";
  text?: string;
  blocks?: SlackBlock[];
  attachments?: SlackAttachment[];
  replace_original?: boolean;
  delete_original?: boolean;
  unfurl_links?: boolean;
  unfurl_media?: boolean;
}

export interface SlackAttachment {
  color?: string;
  fallback?: string;
  title?: string;
  title_link?: string;
  text?: string;
  fields?: SlackAttachmentField[];
  footer?: string;
  footer_icon?: string;
  ts?: number;
  mrkdwn_in?: ("text" | "pretext" | "fields")[];
}

export interface SlackAttachmentField {
  title: string;
  value: string;
  short?: boolean;
}

// ============================================
// 봇 명령어 정의
// ============================================

export interface SlackBotCommand {
  name: string;
  description: string;
  usage?: string;
  handler: (command: SlackSlashCommand) => Promise<SlackResponse>;
}

// ============================================
// 색상 상수
// ============================================

export const SLACK_COLORS = {
  PRIMARY: "#6366f1", // Indigo
  SUCCESS: "#10b981", // Green
  WARNING: "#f59e0b", // Amber
  ERROR: "#ef4444", // Red
  INFO: "#3b82f6", // Blue
} as const;
