import type { Locale } from "@/shared/config/site";
import type { CompanyGameState } from "@/shared/types/company-survival";
import { calculateCompanyScore } from "@/shared/lib/company-survival/game";
import { getCompanyProfile } from "@/entities/company-scenario/data/profiles";
import { COMPANY_COPY } from "./copy";

function escapeXml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

export function createResultCardSvg({
  locale,
  challengeNumber,
  game,
  streak,
}: {
  locale: Locale;
  challengeNumber: number;
  game: CompanyGameState;
  streak: number;
}) {
  const copy = COMPANY_COPY[locale];
  const status = game.status === "playing" ? "survived" : game.status;
  const profile = getCompanyProfile(game.industry);
  const title = escapeXml(copy.status[status].title);
  const metric = (key: keyof typeof game.metrics) =>
    `${escapeXml(copy.metrics[key])} ${game.metrics[key]}`;

  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="#111713"/>
  <path d="M0 110H1200M0 520H1200M760 0V630" stroke="#dfff63" stroke-opacity=".18"/>
  <circle cx="1090" cy="560" r="310" fill="none" stroke="#dfff63" stroke-opacity=".16"/>
  <rect x="52" y="48" width="58" height="58" fill="#dfff63" transform="rotate(-4 81 77)"/>
  <text x="81" y="84" text-anchor="middle" fill="#111713" font-family="monospace" font-size="18" font-weight="800">R10</text>
  <text x="132" y="82" fill="#f3eedf" font-family="monospace" font-size="20" font-weight="800" letter-spacing="4">RUNWAY 10</text>
  <text x="1148" y="76" text-anchor="end" fill="#dfff63" font-family="monospace" font-size="17">${profile.code} / #${challengeNumber}</text>
  <text x="52" y="172" fill="#ff674d" font-family="monospace" font-size="16" font-weight="800" letter-spacing="3">FINAL SURVIVAL REPORT</text>
  <text x="52" y="260" fill="#f3eedf" font-family="serif" font-size="64" font-weight="700">${title}</text>
  <text x="52" y="342" fill="#9da69e" font-family="monospace" font-size="18">${metric("cash")}  /  ${metric("morale")}  /  ${metric("trust")}  /  ${metric("momentum")}</text>
  <text x="52" y="454" fill="#9da69e" font-family="monospace" font-size="15" letter-spacing="2">${escapeXml(copy.score)}</text>
  <text x="52" y="506" fill="#dfff63" font-family="monospace" font-size="48" font-weight="800">${calculateCompanyScore(game)}</text>
  <text x="1148" y="454" text-anchor="end" fill="#9da69e" font-family="monospace" font-size="15" letter-spacing="2">${escapeXml(copy.currentStreak)}</text>
  <text x="1148" y="506" text-anchor="end" fill="#ff674d" font-family="monospace" font-size="48" font-weight="800">${streak}</text>
  <text x="52" y="574" fill="#9da69e" font-family="monospace" font-size="15">web-toolkit.app</text>
  <text x="1148" y="574" text-anchor="end" fill="#f3eedf" font-family="monospace" font-size="15">10 DECISIONS. NO UNDO.</text>
</svg>`;
}

export async function saveResultCard(svg: string, challengeNumber: number) {
  const source = URL.createObjectURL(
    new Blob([svg], { type: "image/svg+xml;charset=utf-8" }),
  );
  try {
    const image = new Image();
    image.src = source;
    await image.decode();
    const canvas = document.createElement("canvas");
    canvas.width = 1200;
    canvas.height = 630;
    const context = canvas.getContext("2d");
    if (!context) throw new Error("Canvas 2D context unavailable");
    context.drawImage(image, 0, 0);
    const blob = await new Promise<Blob>((resolve, reject) => {
      canvas.toBlob(
        (value) =>
          value ? resolve(value) : reject(new Error("PNG encoding failed")),
        "image/png",
      );
    });
    const downloadUrl = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = downloadUrl;
    link.download = `runway-10-${challengeNumber}.png`;
    link.click();
    URL.revokeObjectURL(downloadUrl);
  } finally {
    URL.revokeObjectURL(source);
  }
}
