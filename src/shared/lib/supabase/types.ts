/**
 * Supabase Database Types
 *
 * 이 파일은 수동으로 관리되거나 Supabase CLI로 자동 생성할 수 있습니다:
 * npx supabase gen types typescript --project-id <project-id> > src/shared/lib/supabase/types.ts
 */

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          email: string;
          name: string | null;
          avatar_url: string | null;
          tier: "free" | "pro" | "enterprise";
          locale: "en" | "ko" | "ja";
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          email: string;
          name?: string | null;
          avatar_url?: string | null;
          tier?: "free" | "pro" | "enterprise";
          locale?: "en" | "ko" | "ja";
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          name?: string | null;
          avatar_url?: string | null;
          tier?: "free" | "pro" | "enterprise";
          locale?: "en" | "ko" | "ja";
          created_at?: string;
          updated_at?: string;
        };
      };
      subscriptions: {
        Row: {
          id: string;
          user_id: string;
          provider: "lemonsqueezy" | "stripe";
          external_customer_id: string | null;
          external_subscription_id: string | null;
          status:
            | "active"
            | "canceled"
            | "past_due"
            | "trialing"
            | "paused"
            | null;
          plan_id: string | null;
          current_period_start: string | null;
          current_period_end: string | null;
          cancel_at_period_end: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          provider: "lemonsqueezy" | "stripe";
          external_customer_id?: string | null;
          external_subscription_id?: string | null;
          status?:
            | "active"
            | "canceled"
            | "past_due"
            | "trialing"
            | "paused"
            | null;
          plan_id?: string | null;
          current_period_start?: string | null;
          current_period_end?: string | null;
          cancel_at_period_end?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          provider?: "lemonsqueezy" | "stripe";
          external_customer_id?: string | null;
          external_subscription_id?: string | null;
          status?:
            | "active"
            | "canceled"
            | "past_due"
            | "trialing"
            | "paused"
            | null;
          plan_id?: string | null;
          current_period_start?: string | null;
          current_period_end?: string | null;
          cancel_at_period_end?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      usage_records: {
        Row: {
          id: string;
          user_id: string | null;
          tool_slug: string;
          action_type: string;
          quantity: number;
          metadata: Json;
          recorded_at: string;
        };
        Insert: {
          id?: string;
          user_id?: string | null;
          tool_slug: string;
          action_type: string;
          quantity?: number;
          metadata?: Json;
          recorded_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string | null;
          tool_slug?: string;
          action_type?: string;
          quantity?: number;
          metadata?: Json;
          recorded_at?: string;
        };
      };
      api_keys: {
        Row: {
          id: string;
          user_id: string;
          key_hash: string;
          key_prefix: string;
          name: string;
          last_used_at: string | null;
          created_at: string;
          expires_at: string | null;
          revoked_at: string | null;
        };
        Insert: {
          id?: string;
          user_id: string;
          key_hash: string;
          key_prefix: string;
          name?: string;
          last_used_at?: string | null;
          created_at?: string;
          expires_at?: string | null;
          revoked_at?: string | null;
        };
        Update: {
          id?: string;
          user_id?: string;
          key_hash?: string;
          key_prefix?: string;
          name?: string;
          last_used_at?: string | null;
          created_at?: string;
          expires_at?: string | null;
          revoked_at?: string | null;
        };
      };
      leads: {
        Row: {
          id: string;
          email: string;
          source_tool: string;
          lead_magnet: string | null;
          persona_tag: string | null;
          locale: string;
          utm_source: string | null;
          utm_medium: string | null;
          utm_campaign: string | null;
          subscribed_at: string;
          converted_to_user: boolean;
          converted_user_id: string | null;
          converted_at: string | null;
          converted_to_pro: boolean;
          converted_to_pro_at: string | null;
          unsubscribed: boolean;
          unsubscribed_at: string | null;
        };
        Insert: {
          id?: string;
          email: string;
          source_tool: string;
          lead_magnet?: string | null;
          persona_tag?: string | null;
          locale?: string;
          utm_source?: string | null;
          utm_medium?: string | null;
          utm_campaign?: string | null;
          subscribed_at?: string;
          converted_to_user?: boolean;
          converted_user_id?: string | null;
          converted_at?: string | null;
          converted_to_pro?: boolean;
          converted_to_pro_at?: string | null;
          unsubscribed?: boolean;
          unsubscribed_at?: string | null;
        };
        Update: {
          id?: string;
          email?: string;
          source_tool?: string;
          lead_magnet?: string | null;
          persona_tag?: string | null;
          locale?: string;
          utm_source?: string | null;
          utm_medium?: string | null;
          utm_campaign?: string | null;
          subscribed_at?: string;
          converted_to_user?: boolean;
          converted_user_id?: string | null;
          converted_at?: string | null;
          converted_to_pro?: boolean;
          converted_to_pro_at?: string | null;
          unsubscribed?: boolean;
          unsubscribed_at?: string | null;
        };
      };
      lead_magnets: {
        Row: {
          id: string;
          slug: string;
          tool_slugs: string[];
          persona_tag: string;
          title_en: string;
          title_ko: string | null;
          title_ja: string | null;
          description_en: string;
          description_ko: string | null;
          description_ja: string | null;
          download_url: string | null;
          file_type: string;
          is_active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          slug: string;
          tool_slugs: string[];
          persona_tag: string;
          title_en: string;
          title_ko?: string | null;
          title_ja?: string | null;
          description_en: string;
          description_ko?: string | null;
          description_ja?: string | null;
          download_url?: string | null;
          file_type?: string;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          slug?: string;
          tool_slugs?: string[];
          persona_tag?: string;
          title_en?: string;
          title_ko?: string | null;
          title_ja?: string | null;
          description_en?: string;
          description_ko?: string | null;
          description_ja?: string | null;
          download_url?: string | null;
          file_type?: string;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      api_usage: {
        Row: {
          id: string;
          api_key_id: string;
          endpoint: string;
          method: string;
          status_code: number;
          response_time_ms: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          api_key_id: string;
          endpoint: string;
          method: string;
          status_code: number;
          response_time_ms: number;
          created_at?: string;
        };
        Update: {
          id?: string;
          api_key_id?: string;
          endpoint?: string;
          method?: string;
          status_code?: number;
          response_time_ms?: number;
          created_at?: string;
        };
      };
    };
    Views: {
      user_profiles: {
        Row: {
          id: string | null;
          email: string | null;
          name: string | null;
          avatar_url: string | null;
          tier: string | null;
          locale: string | null;
          created_at: string | null;
          subscription_status: string | null;
          subscription_ends_at: string | null;
          cancel_at_period_end: boolean | null;
        };
      };
      daily_usage_summary: {
        Row: {
          user_id: string | null;
          usage_date: string | null;
          tool_slug: string | null;
          total_operations: number | null;
        };
      };
      lead_analytics: {
        Row: {
          source_tool: string | null;
          persona_tag: string | null;
          lead_magnet: string | null;
          total_leads: number | null;
          converted_users: number | null;
          converted_pro: number | null;
          pro_conversion_rate: number | null;
          date: string | null;
        };
      };
    };
    // eslint-disable-next-line @typescript-eslint/no-empty-object-type
    Functions: {};
    // eslint-disable-next-line @typescript-eslint/no-empty-object-type
    Enums: {};
  };
};

// Convenience types
export type User = Database["public"]["Tables"]["users"]["Row"];
export type Subscription = Database["public"]["Tables"]["subscriptions"]["Row"];
export type UsageRecord = Database["public"]["Tables"]["usage_records"]["Row"];
export type ApiKey = Database["public"]["Tables"]["api_keys"]["Row"];
export type Lead = Database["public"]["Tables"]["leads"]["Row"];
export type LeadMagnet = Database["public"]["Tables"]["lead_magnets"]["Row"];

export type UserProfile = Database["public"]["Views"]["user_profiles"]["Row"];
export type Tier = User["tier"];
