#!/usr/bin/env node
// 디자인 규칙 래칫 — 웹(React/Next.js/Tailwind/CSS) 템플릿
//
// design-set 스킬의 UI 규칙에서 기계로 검사할 수 있는 항목을 고정한다.
// 현재 위반 수 = 상한. 늘어나면 실패, 줄이면 상한도 내린다.
//
// 설치: scripts/ratchet/design_rules.mjs 로 복사 → CONFIG 조정 → `node scripts/ratchet/design_rules.mjs`
// 첫 실행이 출력하는 수를 scripts/ratchet/limits.json 에 적는다. package.json "test"에 연결.
import { readFileSync, readdirSync, statSync, existsSync } from "node:fs";
import { join, extname } from "node:path";
import { execSync } from "node:child_process";

const CONFIG = {
  uiDirs: ["src"],
  exts: [".tsx", ".jsx", ".ts", ".js", ".css", ".scss"],
  tokenFiles: [
    /tailwind\.config\./,
    /globals\.css$/,
    /tokens?\./,
    /theme\./,
    /src[\\/]app[\\/]og[\\/]route\./,
    /src[\\/]shared[\\/]i18n[\\/]legal\.ts$/,
  ],
  limitsPath: "scripts/ratchet/limits.json",
  speechStyle: "haeyo",
};

const files = [];
(function walk(dirs) {
  for (const d of dirs) {
    if (!existsSync(d)) continue;
    for (const name of readdirSync(d)) {
      if (name === "node_modules" || name.startsWith(".")) continue;
      const p = join(d, name);
      if (statSync(p).isDirectory()) walk([p]);
      else if (
        CONFIG.exts.includes(extname(p)) &&
        !CONFIG.tokenFiles.some((re) => re.test(p))
      )
        files.push(p);
    }
  }
})(CONFIG.uiDirs);

const scan = (test) => {
  const hits = [];
  for (const f of files) {
    readFileSync(f, "utf8")
      .split("\n")
      .forEach((line, i) => {
        const t = line.trim();
        if (t.startsWith("//") || t.startsWith("*") || t.startsWith("/*"))
          return;
        if (test(line)) hits.push(`${f}:${i + 1}  ${t.slice(0, 120)}`);
      });
  }
  return hits;
};

const RULES = {
  // 1 폰트 크기 리터럴: text-[13px], font-size: 13px, fontSize: 13
  type_literal: scan((l) =>
    /text-\[\d+(px|rem)\]|font-size:\s*[\d.]+(px|rem)|fontSize:\s*['"]?\d/.test(
      l,
    ),
  ),
  // 2 색 리터럴: #hex, rgb(, hsl(, 기본 팔레트 클래스(bg-indigo-500 등)
  color_literal: scan((l) =>
    /#[0-9a-fA-F]{3,8}\b|rgba?\(|hsla?\(|\b(bg|text|border|from|to|via)-(slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-\d{2,3}\b/.test(
      l,
    ),
  ),
  // 9 즉석 간격: p-[13px], gap-[7px], margin: 13px
  spacing_literal: scan((l) =>
    /\b(p|px|py|pt|pb|pl|pr|m|mx|my|mt|mb|ml|mr|gap|space-[xy]|w|h)-\[\d+(px|rem)\]|(margin|padding|gap)(-\w+)?:\s*\d+px/.test(
      l,
    ),
  ),
  // §7 슬롭 텔: 보라·인디고 그라디언트, 유리, 과한 그림자, 순검정
  slop_tell: scan((l) =>
    /from-(indigo|violet|purple)-\d+.*to-(indigo|violet|purple|blue|pink)-\d+|backdrop-blur|shadow-(2xl|xl)\b|bg-black\b|#000\b|font-\[?Inter/.test(
      l,
    ),
  ),
  // 이모지 아이콘
  emoji_in_ui: scan(
    (l) =>
      /[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}]/u.test(l) && /[가-힣>]/.test(l),
  ),
  // 10 문체 섞임
  speech_mix: scan((l) => {
    const m = l.match(/['"`>]([^'"`<]*[가-힣][^'"`<]*)['"`<]/);
    if (!m) return false;
    return CONFIG.speechStyle === "haeyo"
      ? /(니다|니까)[.!?\s]/.test(m[1] + " ")
      : /요[.!?\s]/.test(m[1] + " ");
  }),
};

const limits = existsSync(CONFIG.limitsPath)
  ? JSON.parse(readFileSync(CONFIG.limitsPath, "utf8"))
  : {};
let failed = false;
for (const [key, hits] of Object.entries(RULES)) {
  const limit = limits[key];
  if (limit === undefined) {
    console.log(
      `ratchet[${key}] 첫 실행 — limits.json에 "${key}": ${hits.length}`,
    );
    continue;
  }
  if (hits.length > limit) {
    failed = true;
    console.error(
      `✗ ratchet[${key}] ${hits.length} > 상한 ${limit}\n  ${hits.join("\n  ")}`,
    );
  } else if (hits.length < limit)
    console.log(
      `ratchet[${key}] ${hits.length} < ${limit} — 상한을 ${hits.length}로 내리세요`,
    );
  else console.log(`✓ ratchet[${key}] ${hits.length}`);
}
// limits.json은 감소 방향으로만
try {
  const prev = JSON.parse(
    execSync(`git show HEAD:${CONFIG.limitsPath}`, {
      stdio: ["ignore", "pipe", "ignore"],
    }).toString(),
  );
  for (const [k, v] of Object.entries(limits))
    if (prev[k] !== undefined && v > prev[k]) {
      failed = true;
      console.error(
        `✗ ratchet[${k}] 상한이 ${prev[k]} → ${v}로 올랐다. 상한은 내리기만 한다.`,
      );
    }
} catch {
  /* 첫 커밋 전 */
}
process.exit(failed ? 1 : 0);
