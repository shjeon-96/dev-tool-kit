import { jsonFormatterGuide } from "./json-formatter";
import { jwtDecoderGuide } from "./jwt-decoder";
import { base64ConverterGuide } from "./base64-converter";
import { regexTesterGuide } from "./regex-tester";
import { hashGeneratorGuide } from "./hash-generator";
import type { Guide, GuideSlug } from "../model/types";

export const guides: Record<GuideSlug, Guide> = {
  "json-formatter": jsonFormatterGuide,
  "jwt-decoder": jwtDecoderGuide,
  "base64-converter": base64ConverterGuide,
  "regex-tester": regexTesterGuide,
  "hash-generator": hashGeneratorGuide,
};

export function getGuide(slug: string): Guide | undefined {
  return guides[slug as GuideSlug];
}

export function getGuideSlugs(): GuideSlug[] {
  return Object.keys(guides) as GuideSlug[];
}

export function getAllGuides(): Guide[] {
  return Object.values(guides);
}
