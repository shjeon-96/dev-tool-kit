import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import { createTrendItemImage } from "../src/entities/trend-item/data/item-images.ts";

const itemDataPath = path.join(
  process.cwd(),
  "src/entities/trend-item/data/items.ts",
);
const outputDirectory = path.join(
  process.cwd(),
  "public/images/trend-battle/generated",
);

const apiKey = process.env.OPENAI_API_KEY;
const requestedIds = new Set(readRequestedIds());
const force = process.argv.includes("--force");
const dryRun = process.argv.includes("--dry-run");
const missingOnly = process.argv.includes("--missing");
const limit = readNumberOption("--limit");

if (!apiKey && !dryRun) {
  console.error("OPENAI_API_KEY is required to generate item images.");
  process.exit(1);
}

const trendItems = parseTrendItems(await readFile(itemDataPath, "utf8"));
let entries = trendItems
  .filter((item) => (requestedIds.size > 0 ? requestedIds.has(item.id) : true))
  .map((item) => [item.id, createTrendItemImage(item), item]);

if (entries.length === 0) {
  console.error("No matching item image prompts found.");
  process.exit(1);
}

await mkdir(outputDirectory, { recursive: true });

if (missingOnly) {
  const filteredEntries = [];

  for (const entry of entries) {
    const [itemId] = entry;
    const outputPath = path.join(outputDirectory, `${itemId}.webp`);

    if (!(await fileExists(outputPath))) {
      filteredEntries.push(entry);
    }
  }

  entries = filteredEntries;
}

if (typeof limit === "number") {
  entries = entries.slice(0, limit);
}

if (dryRun) {
  for (const [itemId, image, item] of entries) {
    console.log(`${itemId}\t${item.category}\t${item.name}\t${image.src}`);
  }
  console.log(`total ${entries.length}`);
  process.exit(0);
}

for (const [itemId, image] of entries) {
  const outputPath = path.join(outputDirectory, `${itemId}.webp`);

  if (!force && await fileExists(outputPath)) {
    console.log(`skip ${itemId}: already exists`);
    continue;
  }

  console.log(`generate ${itemId}`);

  const response = await fetch("https://api.openai.com/v1/images/generations", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "gpt-image-1",
      prompt: image.prompt,
      size: "1536x1024",
      quality: "medium",
      output_format: "webp",
      response_format: "b64_json",
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`OpenAI image generation failed for ${itemId}: ${errorText}`);
  }

  const payload = await response.json();
  const encodedImage = payload.data?.[0]?.b64_json;

  if (typeof encodedImage !== "string") {
    throw new Error(`OpenAI image generation returned no image for ${itemId}`);
  }

  await writeFile(outputPath, Buffer.from(encodedImage, "base64"));
  console.log(`saved ${path.relative(process.cwd(), outputPath)}`);
}

async function fileExists(filePath) {
  try {
    await readFile(filePath);
    return true;
  } catch {
    return false;
  }
}

function readNumberOption(name) {
  const index = process.argv.indexOf(name);
  if (index === -1) return undefined;

  const value = Number.parseInt(process.argv[index + 1] ?? "", 10);
  if (!Number.isFinite(value) || value < 1) {
    throw new Error(`${name} must be followed by a positive integer`);
  }

  return value;
}

function readRequestedIds() {
  const ids = [];
  const optionsWithValues = new Set(["--limit"]);

  for (let index = 2; index < process.argv.length; index += 1) {
    const argument = process.argv[index];

    if (optionsWithValues.has(argument)) {
      index += 1;
      continue;
    }

    if (!argument.startsWith("--")) {
      ids.push(argument);
    }
  }

  return ids;
}

function parseTrendItems(source) {
  const groups = [];
  const groupPattern =
    /category: "([^"]+)",[\s\S]*?seeds: \[([\s\S]*?)\n\s*\],/g;

  for (const match of source.matchAll(groupPattern)) {
    const [, category, seedBlock] = match;
    const itemPattern =
      /\["([^"]+)", "((?:\\"|[^"])*)", [0-9.]+, "((?:\\"|[^"])*)"\]/g;

    for (const itemMatch of seedBlock.matchAll(itemPattern)) {
      const [, id, rawName] = itemMatch;
      groups.push({
        id,
        name: rawName.replaceAll('\\"', '"'),
        category,
      });
    }
  }

  return groups;
}
