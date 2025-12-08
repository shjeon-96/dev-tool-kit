import type { Guide } from "../model/types";

export const hashGeneratorGuide: Guide = {
  slug: "hash-generator",
  sections: [
    {
      id: "what-is-hash",
      titleKey: "guides.hash-generator.sections.whatIsHash.title",
      contentKey: "guides.hash-generator.sections.whatIsHash.content",
      code: `// Input: "Hello, World!"
// Different hash outputs:

MD5:    65a8e27d8879283831b664bd8b7f0ad4
SHA-1:  0a0a9f2a6772942557ab5355d76af442f8f65e01
SHA-256: dffd6021bb2bd5b0af676290809ec3a53191dd81c7f70a4b28688a362182986f
SHA-512: 374d794a95cdcfd8b35993185fef9ba368f160d8daf432d08ba9f1ed1e5abe6cc...`,
      language: "text",
    },
    {
      id: "md5-vs-sha",
      titleKey: "guides.hash-generator.sections.md5VsSha.title",
      contentKey: "guides.hash-generator.sections.md5VsSha.content",
      code: `// Hash Comparison Table
┌───────────┬──────────────┬───────────────┬─────────────┐
│ Algorithm │ Output Size  │ Security      │ Speed       │
├───────────┼──────────────┼───────────────┼─────────────┤
│ MD5       │ 128 bits     │ ❌ Broken     │ ⚡ Fast     │
│ SHA-1     │ 160 bits     │ ⚠️ Weak      │ ⚡ Fast     │
│ SHA-256   │ 256 bits     │ ✅ Secure     │ Medium      │
│ SHA-512   │ 512 bits     │ ✅ Very Secure│ Slower      │
└───────────┴──────────────┴───────────────┴─────────────┘`,
      language: "text",
    },
    {
      id: "use-cases",
      titleKey: "guides.hash-generator.sections.useCases.title",
      contentKey: "guides.hash-generator.sections.useCases.content",
      code: `// 1. File integrity verification
sha256sum myfile.zip
# Output: a3f2c9b8e7d6... myfile.zip

// 2. Password hashing (with salt - use bcrypt instead!)
const bcrypt = require('bcrypt');
const hash = await bcrypt.hash(password, 10);

// 3. Data deduplication
const fileHash = crypto.createHash('sha256')
  .update(fileBuffer)
  .digest('hex');

// 4. Git commit IDs (SHA-1)
git log --oneline
# 7a2b3c4 Fix login bug`,
      language: "javascript",
    },
    {
      id: "hash-verification",
      titleKey: "guides.hash-generator.sections.hashVerification.title",
      contentKey: "guides.hash-generator.sections.hashVerification.content",
      code: `// Verify downloaded file integrity
# Linux/Mac
echo "expected_hash  filename" | sha256sum -c

# Windows PowerShell
(Get-FileHash filename -Algorithm SHA256).Hash -eq "expected_hash"

// JavaScript comparison
const expectedHash = "a3f2c9b8...";
const actualHash = crypto.createHash('sha256')
  .update(data)
  .digest('hex');

const isValid = expectedHash === actualHash;`,
      language: "bash",
    },
    {
      id: "security-best-practices",
      titleKey: "guides.hash-generator.sections.securityBestPractices.title",
      contentKey:
        "guides.hash-generator.sections.securityBestPractices.content",
    },
  ],
  relatedTools: ["jwt-decoder", "base64-converter", "uuid-generator"],
  keywords: [
    "md5 vs sha256",
    "password hash check",
    "generate sha256",
    "file hash verification",
    "md5 checksum generator",
    "sha256 online",
    "hash comparison tool",
    "verify file integrity",
  ],
  difficulty: "intermediate",
  readTime: 6,
};
