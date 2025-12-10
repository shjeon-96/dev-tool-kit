import { jsonFormatterGuide } from "./json-formatter";
import { jwtDecoderGuide } from "./jwt-decoder";
import { base64ConverterGuide } from "./base64-converter";
import { regexTesterGuide } from "./regex-tester";
import { hashGeneratorGuide } from "./hash-generator";
import { imageResizerGuide } from "./image-resizer";
import { unixTimestampGuide } from "./unix-timestamp";
import { qrGeneratorGuide } from "./qr-generator";
import { appIconGeneratorGuide } from "./app-icon-generator";
import { colorPickerGuide } from "./color-picker";
import { urlParserGuide } from "./url-parser";
import { uuidGeneratorGuide } from "./uuid-generator";
import { baseConverterGuide } from "./base-converter";
import { sqlFormatterGuide } from "./sql-formatter";
import { cronParserGuide } from "./cron-parser";
import { markdownPreviewGuide } from "./markdown-preview";
import { diffCheckerGuide } from "./diff-checker";
import { loremGeneratorGuide } from "./lorem-generator";
import { urlEncoderGuide } from "./url-encoder";
import { htmlEntityGuide } from "./html-entity";
import { boxShadowGuide } from "./box-shadow";
import { gradientGeneratorGuide } from "./gradient-generator";
import { uaParserGuide } from "./ua-parser";
import { metaGeneratorGuide } from "./meta-generator";
import { curlBuilderGuide } from "./curl-builder";
import { svgOptimizerGuide } from "./svg-optimizer";
import { cssToTailwindGuide } from "./css-to-tailwind";
import { prettierPlaygroundGuide } from "./prettier-playground";
import type { Guide, GuideSlug } from "../model/types";

export const guides: Record<GuideSlug, Guide> = {
  "json-formatter": jsonFormatterGuide,
  "jwt-decoder": jwtDecoderGuide,
  "base64-converter": base64ConverterGuide,
  "regex-tester": regexTesterGuide,
  "hash-generator": hashGeneratorGuide,
  "image-resizer": imageResizerGuide,
  "unix-timestamp": unixTimestampGuide,
  "qr-generator": qrGeneratorGuide,
  "app-icon-generator": appIconGeneratorGuide,
  "color-picker": colorPickerGuide,
  "url-parser": urlParserGuide,
  "uuid-generator": uuidGeneratorGuide,
  "base-converter": baseConverterGuide,
  "sql-formatter": sqlFormatterGuide,
  "cron-parser": cronParserGuide,
  "markdown-preview": markdownPreviewGuide,
  "diff-checker": diffCheckerGuide,
  "lorem-generator": loremGeneratorGuide,
  "url-encoder": urlEncoderGuide,
  "html-entity": htmlEntityGuide,
  "box-shadow": boxShadowGuide,
  "gradient-generator": gradientGeneratorGuide,
  "ua-parser": uaParserGuide,
  "meta-generator": metaGeneratorGuide,
  "curl-builder": curlBuilderGuide,
  "svg-optimizer": svgOptimizerGuide,
  "css-to-tailwind": cssToTailwindGuide,
  "prettier-playground": prettierPlaygroundGuide,
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
