import type { ToolSlug } from "@/entities/tool";

export interface UseCase {
  slug: string;
  toolSlug: ToolSlug;
  keywords: string[];
}

export type UseCaseSlug =
  | "api-debugging"
  | "config-file-editing"
  | "token-debugging"
  | "image-optimization"
  | "password-hashing"
  | "email-validation";
