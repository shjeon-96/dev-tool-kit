// Client-side (safe for use in client components)
export { createClient, getSupabaseClient } from "./client";

// Types (safe for use anywhere)
export type {
  Database,
  User,
  Subscription,
  UsageRecord,
  ApiKey,
  Lead,
  LeadMagnet,
  UserProfile,
  Tier,
} from "./types";

// NOTE: Server-side exports are in ./server.ts
// Import directly: import { createClient, createServiceClient } from "@/shared/lib/supabase/server"
// This prevents "next/headers" from being bundled in client components

// NOTE: Middleware helper is in ./middleware.ts
// Import directly: import { updateSession } from "@/shared/lib/supabase/middleware"
