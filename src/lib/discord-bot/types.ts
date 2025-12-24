/**
 * Discord Bot 타입 정의
 *
 * Discord Interactions API 기반 서버리스 봇
 */

// ============================================
// Discord API 타입
// ============================================

export enum InteractionType {
  PING = 1,
  APPLICATION_COMMAND = 2,
  MESSAGE_COMPONENT = 3,
  APPLICATION_COMMAND_AUTOCOMPLETE = 4,
  MODAL_SUBMIT = 5,
}

export enum InteractionResponseType {
  PONG = 1,
  CHANNEL_MESSAGE_WITH_SOURCE = 4,
  DEFERRED_CHANNEL_MESSAGE_WITH_SOURCE = 5,
  DEFERRED_UPDATE_MESSAGE = 6,
  UPDATE_MESSAGE = 7,
  APPLICATION_COMMAND_AUTOCOMPLETE_RESULT = 8,
  MODAL = 9,
}

export enum ApplicationCommandType {
  CHAT_INPUT = 1,
  USER = 2,
  MESSAGE = 3,
}

export enum ApplicationCommandOptionType {
  SUB_COMMAND = 1,
  SUB_COMMAND_GROUP = 2,
  STRING = 3,
  INTEGER = 4,
  BOOLEAN = 5,
  USER = 6,
  CHANNEL = 7,
  ROLE = 8,
  MENTIONABLE = 9,
  NUMBER = 10,
  ATTACHMENT = 11,
}

// ============================================
// 인터랙션 타입
// ============================================

export interface DiscordInteraction {
  id: string;
  application_id: string;
  type: InteractionType;
  data?: InteractionData;
  guild_id?: string;
  channel_id?: string;
  member?: DiscordMember;
  user?: DiscordUser;
  token: string;
  version: number;
  message?: DiscordMessage;
  locale?: string;
}

export interface InteractionData {
  id: string;
  name: string;
  type: ApplicationCommandType;
  options?: InteractionOption[];
  custom_id?: string;
  component_type?: number;
  values?: string[];
  target_id?: string;
  resolved?: ResolvedData;
}

export interface InteractionOption {
  name: string;
  type: ApplicationCommandOptionType;
  value?: string | number | boolean;
  options?: InteractionOption[];
  focused?: boolean;
}

export interface ResolvedData {
  users?: Record<string, DiscordUser>;
  members?: Record<string, DiscordMember>;
  roles?: Record<string, DiscordRole>;
  channels?: Record<string, DiscordChannel>;
  messages?: Record<string, DiscordMessage>;
  attachments?: Record<string, DiscordAttachment>;
}

// ============================================
// Discord 엔티티 타입
// ============================================

export interface DiscordUser {
  id: string;
  username: string;
  discriminator: string;
  avatar?: string;
  bot?: boolean;
  global_name?: string;
}

export interface DiscordMember {
  user?: DiscordUser;
  nick?: string;
  avatar?: string;
  roles: string[];
  joined_at: string;
  permissions?: string;
}

export interface DiscordRole {
  id: string;
  name: string;
  color: number;
  permissions: string;
}

export interface DiscordChannel {
  id: string;
  type: number;
  name?: string;
}

export interface DiscordMessage {
  id: string;
  channel_id: string;
  content: string;
  author: DiscordUser;
  embeds?: DiscordEmbed[];
}

export interface DiscordAttachment {
  id: string;
  filename: string;
  size: number;
  url: string;
  content_type?: string;
}

// ============================================
// 응답 타입
// ============================================

export interface InteractionResponse {
  type: InteractionResponseType;
  data?: InteractionResponseData;
}

export interface InteractionResponseData {
  tts?: boolean;
  content?: string;
  embeds?: DiscordEmbed[];
  allowed_mentions?: AllowedMentions;
  flags?: number;
  components?: MessageComponent[];
  attachments?: Partial<DiscordAttachment>[];
}

export interface DiscordEmbed {
  title?: string;
  type?: "rich" | "image" | "video" | "gifv" | "article" | "link";
  description?: string;
  url?: string;
  timestamp?: string;
  color?: number;
  footer?: EmbedFooter;
  image?: EmbedMedia;
  thumbnail?: EmbedMedia;
  author?: EmbedAuthor;
  fields?: EmbedField[];
}

export interface EmbedFooter {
  text: string;
  icon_url?: string;
}

export interface EmbedMedia {
  url: string;
  height?: number;
  width?: number;
}

export interface EmbedAuthor {
  name: string;
  url?: string;
  icon_url?: string;
}

export interface EmbedField {
  name: string;
  value: string;
  inline?: boolean;
}

export interface AllowedMentions {
  parse?: ("roles" | "users" | "everyone")[];
  roles?: string[];
  users?: string[];
  replied_user?: boolean;
}

export interface MessageComponent {
  type: number;
  components?: MessageComponent[];
  style?: number;
  label?: string;
  emoji?: { name: string; id?: string };
  custom_id?: string;
  url?: string;
  disabled?: boolean;
  options?: SelectOption[];
  placeholder?: string;
  min_values?: number;
  max_values?: number;
}

export interface SelectOption {
  label: string;
  value: string;
  description?: string;
  emoji?: { name: string; id?: string };
  default?: boolean;
}

// ============================================
// 봇 명령어 정의
// ============================================

export interface BotCommand {
  name: string;
  description: string;
  options?: CommandOption[];
  handler: (interaction: DiscordInteraction) => Promise<InteractionResponse>;
}

export interface CommandOption {
  name: string;
  description: string;
  type: ApplicationCommandOptionType;
  required?: boolean;
  choices?: { name: string; value: string }[];
  min_length?: number;
  max_length?: number;
}

// ============================================
// 색상 상수
// ============================================

export const EMBED_COLORS = {
  PRIMARY: 0x6366f1, // Indigo
  SUCCESS: 0x10b981, // Green
  WARNING: 0xf59e0b, // Amber
  ERROR: 0xef4444, // Red
  INFO: 0x3b82f6, // Blue
} as const;
