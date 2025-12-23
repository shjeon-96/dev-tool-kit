/**
 * Content Similarity Measurement Script
 *
 * Purpose: Measure cosine similarity between pSEO pages to verify Thin Content mitigation
 * Target: < 60% similarity between pages (from AUTOMATED_TRAFFIC_ENGINEERING_v1.1.md)
 *
 * Usage:
 *   npx tsx scripts/measure-content-similarity.ts
 *   npx tsx scripts/measure-content-similarity.ts --type hash
 *   npx tsx scripts/measure-content-similarity.ts --verbose
 */

import {
  getAllHashTypeSlugs,
  getHashTypeBySlug,
} from "../src/entities/hash-type";
import {
  getUniqueHashContent,
  getHashSlugsWithUniqueContent,
} from "../src/entities/hash-type/model/unique-content";

// ============================================================================
// TF-IDF and Cosine Similarity Implementation
// ============================================================================

interface Document {
  slug: string;
  tokens: string[];
  hasUniqueContent: boolean;
}

interface TfIdfVector {
  [term: string]: number;
}

interface SimilarityResult {
  slug1: string;
  slug2: string;
  similarity: number;
  hasUniqueContent1: boolean;
  hasUniqueContent2: boolean;
}

/**
 * Tokenize text into words
 */
function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9가-힣ぁ-んァ-ン一-龥\s]/g, " ")
    .split(/\s+/)
    .filter((token) => token.length > 2);
}

/**
 * Calculate term frequency for a document
 */
function calculateTf(tokens: string[]): Map<string, number> {
  const tf = new Map<string, number>();
  for (const token of tokens) {
    tf.set(token, (tf.get(token) || 0) + 1);
  }
  // Normalize by document length
  const length = tokens.length;
  for (const [term, count] of tf) {
    tf.set(term, count / length);
  }
  return tf;
}

/**
 * Calculate inverse document frequency
 */
function calculateIdf(documents: Document[]): Map<string, number> {
  const idf = new Map<string, number>();
  const docCount = documents.length;

  // Count documents containing each term
  const termDocCount = new Map<string, number>();
  for (const doc of documents) {
    const uniqueTerms = new Set(doc.tokens);
    for (const term of uniqueTerms) {
      termDocCount.set(term, (termDocCount.get(term) || 0) + 1);
    }
  }

  // Calculate IDF
  for (const [term, count] of termDocCount) {
    idf.set(term, Math.log(docCount / count) + 1);
  }

  return idf;
}

/**
 * Calculate TF-IDF vector for a document
 */
function calculateTfIdf(
  tokens: string[],
  idf: Map<string, number>,
): TfIdfVector {
  const tf = calculateTf(tokens);
  const tfidf: TfIdfVector = {};

  for (const [term, tfValue] of tf) {
    const idfValue = idf.get(term) || 0;
    tfidf[term] = tfValue * idfValue;
  }

  return tfidf;
}

/**
 * Calculate cosine similarity between two TF-IDF vectors
 */
function cosineSimilarity(vec1: TfIdfVector, vec2: TfIdfVector): number {
  const allTerms = new Set([...Object.keys(vec1), ...Object.keys(vec2)]);

  let dotProduct = 0;
  let magnitude1 = 0;
  let magnitude2 = 0;

  for (const term of allTerms) {
    const v1 = vec1[term] || 0;
    const v2 = vec2[term] || 0;
    dotProduct += v1 * v2;
    magnitude1 += v1 * v1;
    magnitude2 += v2 * v2;
  }

  magnitude1 = Math.sqrt(magnitude1);
  magnitude2 = Math.sqrt(magnitude2);

  if (magnitude1 === 0 || magnitude2 === 0) {
    return 0;
  }

  return dotProduct / (magnitude1 * magnitude2);
}

// ============================================================================
// Content Extraction
// ============================================================================

/**
 * Extract text content for a hash type page
 */
function extractHashPageContent(
  slug: string,
  locale: "en" | "ko" | "ja" = "en",
): string {
  const hashType = getHashTypeBySlug(slug);
  if (!hashType) return "";

  const parts: string[] = [];

  // Basic hash type info
  parts.push(hashType.title[locale] || hashType.title.en);
  parts.push(hashType.description[locale] || hashType.description.en);
  parts.push(hashType.algorithm);

  // Keywords
  const keywords = hashType.keywords[locale] || hashType.keywords.en;
  parts.push(keywords.join(" "));

  // Use cases
  const useCases = hashType.useCases?.[locale] || hashType.useCases?.en || [];
  parts.push(useCases.join(" "));

  // Security status
  parts.push(hashType.isSecure ? "secure recommended" : "insecure deprecated");

  // Unique content (if available)
  const uniqueContent = getUniqueHashContent(slug);
  if (uniqueContent) {
    // Technical specs
    const specs = uniqueContent.technicalSpecs;
    parts.push(specs.outputLength);
    parts.push(specs.blockSize);
    parts.push(specs.rounds);
    parts.push(specs.structure);
    parts.push(specs.wordSize);

    // Security details
    const security = uniqueContent.security;
    parts.push(security.level);
    parts.push(security.collisionResistance);
    parts.push(security.preimageResistance);
    parts.push(security.secondPreimageResistance);
    parts.push(security.quantumResistance);

    // History
    const history = uniqueContent.history;
    parts.push(history.creator);
    parts.push(history.organization || "");
    parts.push(history.standardization || "");
    for (const event of history.timeline) {
      parts.push(event.event[locale] || event.event.en);
    }

    // Vulnerabilities
    for (const vuln of uniqueContent.vulnerabilities) {
      parts.push(vuln.name);
      parts.push(vuln.description[locale] || vuln.description.en);
      parts.push(vuln.severity);
    }

    // Real world use cases
    for (const useCase of uniqueContent.realWorldUseCases) {
      parts.push(useCase.industry);
      parts.push(useCase.company || "");
      parts.push(useCase.useCase[locale] || useCase.useCase.en);
      parts.push(useCase.whyThisHash[locale] || useCase.whyThisHash.en);
    }

    // Code examples
    for (const example of uniqueContent.codeExamples) {
      parts.push(example.language);
      parts.push(example.title[locale] || example.title.en);
      parts.push(example.code);
      parts.push(example.explanation[locale] || example.explanation.en);
    }

    // Comparison
    for (const comp of uniqueContent.comparison.vsOthers) {
      parts.push(comp.hash);
      parts.push(comp.comparison[locale] || comp.comparison.en);
    }
    parts.push(
      (
        uniqueContent.comparison.whenToUse[locale] ||
        uniqueContent.comparison.whenToUse.en
      ).join(" "),
    );
    parts.push(
      (
        uniqueContent.comparison.whenNotToUse[locale] ||
        uniqueContent.comparison.whenNotToUse.en
      ).join(" "),
    );

    // Performance
    const perf = uniqueContent.performance;
    parts.push(perf.speedMBps);
    parts.push(perf.cpuCycles);
    parts.push(perf.memoryUsage);
    parts.push(perf.hardwareAcceleration.join(" "));

    // References
    for (const ref of uniqueContent.references) {
      parts.push(ref.type);
      parts.push(ref.identifier);
      parts.push(ref.title);
    }
  }

  return parts.join(" ");
}

// ============================================================================
// Main Analysis
// ============================================================================

interface AnalysisOptions {
  verbose?: boolean;
  locale?: "en" | "ko" | "ja";
  threshold?: number;
}

function analyzeHashContentSimilarity(options: AnalysisOptions = {}): void {
  const { verbose = false, locale = "en", threshold = 0.6 } = options;

  console.log("═".repeat(70));
  console.log("📊 Content Similarity Analysis - Hash Pages");
  console.log("═".repeat(70));
  console.log(`Locale: ${locale}`);
  console.log(`Target: < ${(threshold * 100).toFixed(0)}% similarity`);
  console.log("");

  // Get all hash slugs
  const allSlugs = getAllHashTypeSlugs();
  const slugsWithUniqueContent = getHashSlugsWithUniqueContent();

  console.log(`Total hash types: ${allSlugs.length}`);
  console.log(`With unique content: ${slugsWithUniqueContent.length}`);
  console.log(
    `Without unique content: ${allSlugs.length - slugsWithUniqueContent.length}`,
  );
  console.log("");

  // Extract content and create documents
  const documents: Document[] = allSlugs.map((slug) => {
    const content = extractHashPageContent(slug, locale);
    return {
      slug,
      tokens: tokenize(content),
      hasUniqueContent: slugsWithUniqueContent.includes(slug),
    };
  });

  // Calculate IDF across all documents
  const idf = calculateIdf(documents);

  // Calculate TF-IDF vectors
  const vectors = new Map<string, TfIdfVector>();
  for (const doc of documents) {
    vectors.set(doc.slug, calculateTfIdf(doc.tokens, idf));
  }

  // Calculate all pairwise similarities
  const results: SimilarityResult[] = [];
  for (let i = 0; i < documents.length; i++) {
    for (let j = i + 1; j < documents.length; j++) {
      const doc1 = documents[i];
      const doc2 = documents[j];
      const vec1 = vectors.get(doc1.slug)!;
      const vec2 = vectors.get(doc2.slug)!;
      const similarity = cosineSimilarity(vec1, vec2);

      results.push({
        slug1: doc1.slug,
        slug2: doc2.slug,
        similarity,
        hasUniqueContent1: doc1.hasUniqueContent,
        hasUniqueContent2: doc2.hasUniqueContent,
      });
    }
  }

  // Sort by similarity (highest first)
  results.sort((a, b) => b.similarity - a.similarity);

  // Analyze results
  const exceededThreshold = results.filter((r) => r.similarity >= threshold);
  const belowThreshold = results.filter((r) => r.similarity < threshold);

  // Pages with unique content comparisons
  const bothUnique = results.filter(
    (r) => r.hasUniqueContent1 && r.hasUniqueContent2,
  );
  const oneUnique = results.filter(
    (r) =>
      (r.hasUniqueContent1 || r.hasUniqueContent2) &&
      !(r.hasUniqueContent1 && r.hasUniqueContent2),
  );
  const noneUnique = results.filter(
    (r) => !r.hasUniqueContent1 && !r.hasUniqueContent2,
  );

  // Report
  console.log("─".repeat(70));
  console.log("📈 Summary");
  console.log("─".repeat(70));
  console.log(`Total comparisons: ${results.length}`);
  console.log(
    `❌ Exceeded threshold (≥${(threshold * 100).toFixed(0)}%): ${exceededThreshold.length}`,
  );
  console.log(
    `✅ Below threshold (<${(threshold * 100).toFixed(0)}%): ${belowThreshold.length}`,
  );
  console.log("");

  // Average similarities by category
  const avgBothUnique =
    bothUnique.length > 0
      ? bothUnique.reduce((sum, r) => sum + r.similarity, 0) / bothUnique.length
      : 0;
  const avgOneUnique =
    oneUnique.length > 0
      ? oneUnique.reduce((sum, r) => sum + r.similarity, 0) / oneUnique.length
      : 0;
  const avgNoneUnique =
    noneUnique.length > 0
      ? noneUnique.reduce((sum, r) => sum + r.similarity, 0) / noneUnique.length
      : 0;
  const avgAll =
    results.length > 0
      ? results.reduce((sum, r) => sum + r.similarity, 0) / results.length
      : 0;

  console.log("─".repeat(70));
  console.log("📊 Average Similarity by Category");
  console.log("─".repeat(70));
  console.log(
    `Both have unique content (${bothUnique.length} pairs): ${(avgBothUnique * 100).toFixed(1)}%`,
  );
  console.log(
    `One has unique content (${oneUnique.length} pairs):  ${(avgOneUnique * 100).toFixed(1)}%`,
  );
  console.log(
    `Neither has unique content (${noneUnique.length} pairs): ${(avgNoneUnique * 100).toFixed(1)}%`,
  );
  console.log(`Overall average: ${(avgAll * 100).toFixed(1)}%`);
  console.log("");

  // Show highest similarity pairs
  if (exceededThreshold.length > 0) {
    console.log("─".repeat(70));
    console.log(
      `⚠️  High Similarity Pairs (≥${(threshold * 100).toFixed(0)}%)`,
    );
    console.log("─".repeat(70));
    const toShow = verbose ? exceededThreshold : exceededThreshold.slice(0, 10);
    for (const result of toShow) {
      const u1 = result.hasUniqueContent1 ? "✓" : "✗";
      const u2 = result.hasUniqueContent2 ? "✓" : "✗";
      console.log(
        `  ${(result.similarity * 100).toFixed(1)}% | ${result.slug1} [${u1}] ↔ ${result.slug2} [${u2}]`,
      );
    }
    if (!verbose && exceededThreshold.length > 10) {
      console.log(`  ... and ${exceededThreshold.length - 10} more`);
    }
    console.log("");
  }

  // Show lowest similarity pairs (good examples)
  if (verbose) {
    console.log("─".repeat(70));
    console.log("✅ Lowest Similarity Pairs (best differentiation)");
    console.log("─".repeat(70));
    const lowest = results.slice(-10).reverse();
    for (const result of lowest) {
      const u1 = result.hasUniqueContent1 ? "✓" : "✗";
      const u2 = result.hasUniqueContent2 ? "✓" : "✗";
      console.log(
        `  ${(result.similarity * 100).toFixed(1)}% | ${result.slug1} [${u1}] ↔ ${result.slug2} [${u2}]`,
      );
    }
    console.log("");
  }

  // Per-page analysis
  console.log("─".repeat(70));
  console.log("📄 Per-Page Average Similarity");
  console.log("─".repeat(70));

  const pageAverages = new Map<
    string,
    { sum: number; count: number; hasUnique: boolean }
  >();
  for (const doc of documents) {
    pageAverages.set(doc.slug, {
      sum: 0,
      count: 0,
      hasUnique: doc.hasUniqueContent,
    });
  }

  for (const result of results) {
    const p1 = pageAverages.get(result.slug1)!;
    const p2 = pageAverages.get(result.slug2)!;
    p1.sum += result.similarity;
    p1.count += 1;
    p2.sum += result.similarity;
    p2.count += 1;
  }

  const sortedPages = Array.from(pageAverages.entries())
    .map(([slug, data]) => ({
      slug,
      avg: data.count > 0 ? data.sum / data.count : 0,
      hasUnique: data.hasUnique,
    }))
    .sort((a, b) => b.avg - a.avg);

  for (const page of sortedPages) {
    const icon = page.hasUnique ? "✓" : "✗";
    const status = page.avg >= threshold ? "⚠️" : "✅";
    console.log(
      `  ${status} ${(page.avg * 100).toFixed(1)}% | ${page.slug} [${icon}]`,
    );
  }
  console.log("");

  // Recommendations
  console.log("─".repeat(70));
  console.log("💡 Recommendations");
  console.log("─".repeat(70));

  const pagesNeedingContent = sortedPages
    .filter((p) => !p.hasUnique && p.avg >= threshold)
    .slice(0, 5);

  if (pagesNeedingContent.length > 0) {
    console.log("Priority pages needing unique content:");
    for (const page of pagesNeedingContent) {
      console.log(
        `  • ${page.slug} (${(page.avg * 100).toFixed(1)}% avg similarity)`,
      );
    }
  } else if (avgAll < threshold) {
    console.log("✅ All pages are below the similarity threshold. Great job!");
  } else {
    console.log("Consider adding unique content to pages without it.");
  }

  console.log("");
  console.log("═".repeat(70));
  console.log("Legend: [✓] = has unique content, [✗] = no unique content");
  console.log("═".repeat(70));
}

// ============================================================================
// CLI
// ============================================================================

const args = process.argv.slice(2);
const verbose = args.includes("--verbose") || args.includes("-v");
const locale =
  (args.find((a) => a.startsWith("--locale="))?.split("=")[1] as
    | "en"
    | "ko"
    | "ja") || "en";
const threshold = parseFloat(
  args.find((a) => a.startsWith("--threshold="))?.split("=")[1] || "0.6",
);

analyzeHashContentSimilarity({ verbose, locale, threshold });
