import type { UseCase, UseCaseSlug } from "./types";

export const useCases: Record<UseCaseSlug, UseCase> = {
  "api-debugging": {
    slug: "api-debugging",
    toolSlug: "json-formatter",
    keywords: [
      "api response debugging",
      "debug json api",
      "format api response",
      "api troubleshooting",
    ],
  },
  "config-file-editing": {
    slug: "config-file-editing",
    toolSlug: "json-formatter",
    keywords: [
      "edit package.json",
      "tsconfig editing",
      "json config file",
      "format config file",
    ],
  },
  "token-debugging": {
    slug: "token-debugging",
    toolSlug: "jwt-decoder",
    keywords: [
      "debug jwt token",
      "jwt expired error",
      "token claims debugging",
      "authentication debugging",
    ],
  },
  "image-optimization": {
    slug: "image-optimization",
    toolSlug: "image-resizer",
    keywords: [
      "optimize images for web",
      "reduce image file size",
      "compress images online",
      "web image optimization",
    ],
  },
  "password-hashing": {
    slug: "password-hashing",
    toolSlug: "hash-generator",
    keywords: [
      "generate password hash",
      "md5 password",
      "sha256 password hash",
      "verify file checksum",
    ],
  },
  "email-validation": {
    slug: "email-validation",
    toolSlug: "regex-tester",
    keywords: [
      "email regex pattern",
      "validate email regex",
      "email format validation",
      "regex email test",
    ],
  },
};

export function getUseCaseSlugs(): UseCaseSlug[] {
  return Object.keys(useCases) as UseCaseSlug[];
}

export function getUseCase(slug: string): UseCase | undefined {
  return useCases[slug as UseCaseSlug];
}

export function getUseCasesByTool(toolSlug: string): UseCase[] {
  return Object.values(useCases).filter((uc) => uc.toolSlug === toolSlug);
}

export function getAllUseCases(): UseCase[] {
  return Object.values(useCases);
}
