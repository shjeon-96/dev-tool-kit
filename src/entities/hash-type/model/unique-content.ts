/**
 * Unique Hash Content Database
 * Thin Content 해결을 위한 해시 타입별 고유 콘텐츠
 * 목표: 페이지 간 Cosine Similarity < 60%
 */

import type { UniqueHashContent } from "./types";

// ============================================
// MD5 - 레거시 해시 (보안 취약)
// ============================================
export const MD5_CONTENT: UniqueHashContent = {
  slug: "md5",

  technicalSpecs: {
    outputLength: "128 bits (16 bytes, 32 hex characters)",
    blockSize: "512 bits (64 bytes)",
    rounds: "64 rounds (4 rounds × 16 operations)",
    structure: "Merkle-Damgård construction with Davies-Meyer compression",
    wordSize: "32-bit words",
  },

  security: {
    level: "broken",
    collisionResistance:
      "Broken - collisions found in seconds (2^18 complexity)",
    preimageResistance: "2^123.4 operations (theoretically weakened)",
    secondPreimageResistance: "2^123.4 operations",
    quantumResistance:
      "None - vulnerable to Grover's algorithm (2^64 operations)",
  },

  history: {
    createdYear: 1991,
    creator: "Ronald Rivest",
    organization: "MIT",
    standardization: "RFC 1321 (April 1992)",
    timeline: [
      {
        year: 1991,
        event: {
          en: "MD5 designed by Ronald Rivest at MIT as successor to MD4",
          ko: "Ronald Rivest가 MIT에서 MD4의 후속으로 MD5 설계",
          ja: "Ronald RivestがMITでMD4の後継としてMD5を設計",
        },
      },
      {
        year: 1996,
        event: {
          en: "First collision attacks discovered by Hans Dobbertin",
          ko: "Hans Dobbertin에 의해 첫 충돌 공격 발견",
          ja: "Hans Dobbertinによる最初の衝突攻撃の発見",
        },
      },
      {
        year: 2004,
        event: {
          en: "Wang et al. demonstrate practical collision attacks",
          ko: "Wang 등이 실용적인 충돌 공격 시연",
          ja: "Wangらが実用的な衝突攻撃を実証",
        },
      },
      {
        year: 2008,
        event: {
          en: "Collision found in 1 minute on standard laptop",
          ko: "일반 노트북에서 1분 만에 충돌 발견",
          ja: "標準的なノートPCで1分以内に衝突を発見",
        },
      },
      {
        year: 2012,
        event: {
          en: "Flame malware exploits MD5 weakness in Windows Update",
          ko: "Flame 악성코드가 Windows Update의 MD5 취약점 악용",
          ja: "FlameマルウェアがWindows UpdateのMD5の脆弱性を悪用",
        },
      },
    ],
  },

  vulnerabilities: [
    {
      name: "Collision Attack",
      year: 2004,
      description: {
        en: "Two different inputs can produce the same MD5 hash. Attackers can create malicious files with identical hashes to legitimate ones.",
        ko: "두 개의 다른 입력이 동일한 MD5 해시를 생성할 수 있습니다. 공격자는 정상 파일과 동일한 해시를 가진 악성 파일을 만들 수 있습니다.",
        ja: "2つの異なる入力が同じMD5ハッシュを生成できます。攻撃者は正当なファイルと同一のハッシュを持つ悪意のあるファイルを作成できます。",
      },
      severity: "critical",
    },
    {
      name: "Chosen-Prefix Collision",
      year: 2009,
      description: {
        en: "Attackers can create collisions with chosen prefixes, enabling certificate forgery and other sophisticated attacks.",
        ko: "공격자는 선택한 접두사로 충돌을 생성하여 인증서 위조 및 기타 정교한 공격이 가능합니다.",
        ja: "攻撃者は選択したプレフィックスで衝突を作成でき、証明書偽造などの高度な攻撃が可能になります。",
      },
      severity: "critical",
      cve: "CVE-2009-2409",
    },
    {
      name: "Length Extension Attack",
      year: 2004,
      description: {
        en: "Given hash(message), attacker can compute hash(message || padding || extension) without knowing the original message.",
        ko: "hash(message)가 주어지면 공격자는 원본 메시지를 모르고도 hash(message || padding || extension)을 계산할 수 있습니다.",
        ja: "hash(message)が与えられると、攻撃者は元のメッセージを知らなくてもhash(message || padding || extension)を計算できます。",
      },
      severity: "high",
    },
  ],

  realWorldUseCases: [
    {
      industry: "Software Distribution",
      company: "Linux Distributions",
      useCase: {
        en: "File checksum verification for detecting download corruption (not security)",
        ko: "다운로드 손상 감지를 위한 파일 체크섬 검증 (보안 목적 아님)",
        ja: "ダウンロード破損検出のためのファイルチェックサム検証（セキュリティ目的ではない）",
      },
      whyThisHash: {
        en: "Extremely fast, widely supported, sufficient for detecting accidental corruption",
        ko: "매우 빠르고, 널리 지원되며, 우발적 손상 감지에 충분",
        ja: "非常に高速で、広くサポートされ、偶発的な破損の検出には十分",
      },
    },
    {
      industry: "Database",
      company: "Various",
      useCase: {
        en: "Cache key generation and data deduplication",
        ko: "캐시 키 생성 및 데이터 중복 제거",
        ja: "キャッシュキー生成とデータ重複排除",
      },
      whyThisHash: {
        en: "Speed is priority over security, low collision probability for cache purposes",
        ko: "보안보다 속도가 우선, 캐시 목적에는 낮은 충돌 확률",
        ja: "セキュリティより速度が優先、キャッシュ目的には低い衝突確率",
      },
    },
    {
      industry: "Legacy Systems",
      company: "Enterprise",
      useCase: {
        en: "Backward compatibility with older systems that only support MD5",
        ko: "MD5만 지원하는 이전 시스템과의 하위 호환성",
        ja: "MD5のみをサポートする古いシステムとの下位互換性",
      },
      whyThisHash: {
        en: "Required for integration with legacy infrastructure",
        ko: "레거시 인프라와의 통합에 필요",
        ja: "レガシーインフラとの統合に必要",
      },
    },
  ],

  codeExamples: [
    {
      language: "JavaScript",
      title: {
        en: "Generate MD5 hash using crypto-js",
        ko: "crypto-js를 사용한 MD5 해시 생성",
        ja: "crypto-jsを使用したMD5ハッシュ生成",
      },
      code: `import CryptoJS from 'crypto-js';

const text = "Hello, World!";
const hash = CryptoJS.MD5(text).toString();
console.log(hash); // "65a8e27d8879283831b664bd8b7f0ad4"`,
      explanation: {
        en: "crypto-js library provides a simple API for MD5 hashing in browser and Node.js environments.",
        ko: "crypto-js 라이브러리는 브라우저와 Node.js 환경에서 MD5 해싱을 위한 간단한 API를 제공합니다.",
        ja: "crypto-jsライブラリはブラウザとNode.js環境でMD5ハッシングのための簡単なAPIを提供します。",
      },
    },
    {
      language: "Python",
      title: {
        en: "Generate MD5 hash using hashlib",
        ko: "hashlib를 사용한 MD5 해시 생성",
        ja: "hashlibを使用したMD5ハッシュ生成",
      },
      code: `import hashlib

text = "Hello, World!"
hash_object = hashlib.md5(text.encode())
print(hash_object.hexdigest())  # "65a8e27d8879283831b664bd8b7f0ad4"`,
      explanation: {
        en: "Python's built-in hashlib module provides MD5 functionality. Note: encode() converts string to bytes.",
        ko: "Python의 내장 hashlib 모듈은 MD5 기능을 제공합니다. 참고: encode()는 문자열을 바이트로 변환합니다.",
        ja: "Pythonの組み込みhashlibモジュールはMD5機能を提供します。注意：encode()は文字列をバイトに変換します。",
      },
    },
    {
      language: "Go",
      title: {
        en: "Generate MD5 hash in Go",
        ko: "Go에서 MD5 해시 생성",
        ja: "GoでMD5ハッシュ生成",
      },
      code: `package main

import (
    "crypto/md5"
    "encoding/hex"
    "fmt"
)

func main() {
    data := []byte("Hello, World!")
    hash := md5.Sum(data)
    fmt.Println(hex.EncodeToString(hash[:]))
    // Output: 65a8e27d8879283831b664bd8b7f0ad4
}`,
      explanation: {
        en: "Go's crypto/md5 package provides native MD5 support. Use hex.EncodeToString for hexadecimal output.",
        ko: "Go의 crypto/md5 패키지는 네이티브 MD5 지원을 제공합니다. 16진수 출력에는 hex.EncodeToString을 사용합니다.",
        ja: "Goのcrypto/md5パッケージはネイティブMD5サポートを提供します。16進数出力にはhex.EncodeToStringを使用します。",
      },
    },
    {
      language: "Bash",
      title: {
        en: "Generate MD5 hash using command line",
        ko: "명령줄에서 MD5 해시 생성",
        ja: "コマンドラインでMD5ハッシュ生成",
      },
      code: `# Linux/macOS
echo -n "Hello, World!" | md5sum
# Output: 65a8e27d8879283831b664bd8b7f0ad4  -

# macOS alternative
echo -n "Hello, World!" | md5
# Output: 65a8e27d8879283831b664bd8b7f0ad4`,
      explanation: {
        en: "Use -n flag with echo to prevent adding newline. md5sum is standard on Linux, md5 on macOS.",
        ko: "echo와 함께 -n 플래그를 사용하여 줄바꿈 추가를 방지합니다. md5sum은 Linux에서, md5는 macOS에서 표준입니다.",
        ja: "echoで-nフラグを使用して改行の追加を防ぎます。md5sumはLinuxで、md5はmacOSで標準です。",
      },
    },
  ],

  comparison: {
    vsOthers: [
      {
        hash: "SHA-256",
        comparison: {
          en: "MD5 is 2-3x faster but cryptographically broken. Use SHA-256 for any security purpose.",
          ko: "MD5는 2-3배 빠르지만 암호학적으로 취약합니다. 보안 목적에는 SHA-256을 사용하세요.",
          ja: "MD5は2-3倍高速ですが、暗号学的に脆弱です。セキュリティ目的にはSHA-256を使用してください。",
        },
      },
      {
        hash: "SHA-1",
        comparison: {
          en: "Both are deprecated for security. SHA-1 is slightly more secure but also broken. Neither should be used for security.",
          ko: "둘 다 보안용으로 권장되지 않습니다. SHA-1이 약간 더 안전하지만 역시 취약합니다.",
          ja: "両方ともセキュリティ目的では非推奨です。SHA-1はわずかに安全ですが、やはり脆弱です。",
        },
      },
      {
        hash: "BLAKE3",
        comparison: {
          en: "BLAKE3 is faster AND more secure than MD5. Modern replacement for non-cryptographic hashing.",
          ko: "BLAKE3는 MD5보다 빠르고 더 안전합니다. 비암호화 해싱의 현대적 대안입니다.",
          ja: "BLAKE3はMD5より高速で安全です。非暗号ハッシングの現代的な代替手段です。",
        },
      },
      {
        hash: "xxHash",
        comparison: {
          en: "xxHash is 5-10x faster for non-cryptographic use. Better choice for checksums and hash tables.",
          ko: "xxHash는 비암호화 용도로 5-10배 빠릅니다. 체크섬과 해시 테이블에 더 좋은 선택입니다.",
          ja: "xxHashは非暗号用途で5-10倍高速です。チェックサムやハッシュテーブルにはより良い選択です。",
        },
      },
    ],
    whenToUse: {
      en: [
        "Legacy system compatibility requirements",
        "Non-security file checksums for corruption detection",
        "Cache key generation (internal use only)",
        "Data deduplication in non-adversarial environments",
      ],
      ko: [
        "레거시 시스템 호환성 요구사항",
        "손상 감지용 비보안 파일 체크섬",
        "캐시 키 생성 (내부 사용만)",
        "비적대적 환경에서의 데이터 중복 제거",
      ],
      ja: [
        "レガシーシステムとの互換性要件",
        "破損検出用の非セキュリティファイルチェックサム",
        "キャッシュキー生成（内部使用のみ）",
        "非敵対的環境でのデータ重複排除",
      ],
    },
    whenNotToUse: {
      en: [
        "Password hashing (use bcrypt or Argon2)",
        "Digital signatures",
        "SSL/TLS certificates",
        "Any security-critical application",
        "File integrity in adversarial environments",
      ],
      ko: [
        "비밀번호 해싱 (bcrypt 또는 Argon2 사용)",
        "디지털 서명",
        "SSL/TLS 인증서",
        "모든 보안 중요 애플리케이션",
        "적대적 환경에서의 파일 무결성",
      ],
      ja: [
        "パスワードハッシング（bcryptまたはArgon2を使用）",
        "デジタル署名",
        "SSL/TLS証明書",
        "すべてのセキュリティクリティカルなアプリケーション",
        "敵対的環境でのファイル整合性",
      ],
    },
  },

  performance: {
    speedMBps: "~500 MB/s on modern CPU (single-threaded)",
    cpuCycles: "~5 cycles per byte",
    memoryUsage: "Minimal - 128 bytes state",
    parallelizable: false,
    hardwareAcceleration: [],
  },

  references: [
    {
      type: "RFC",
      identifier: "RFC 1321",
      title: "The MD5 Message-Digest Algorithm",
      url: "https://www.rfc-editor.org/rfc/rfc1321",
    },
    {
      type: "RFC",
      identifier: "RFC 6151",
      title: "Updated Security Considerations for MD5",
      url: "https://www.rfc-editor.org/rfc/rfc6151",
    },
    {
      type: "Paper",
      identifier: "Wang et al. 2004",
      title: "Collisions for Hash Functions MD4, MD5, HAVAL-128 and RIPEMD",
      url: "https://eprint.iacr.org/2004/199",
    },
  ],
};

// ============================================
// SHA-256 - 권장 보안 해시
// ============================================
export const SHA256_CONTENT: UniqueHashContent = {
  slug: "sha256",

  technicalSpecs: {
    outputLength: "256 bits (32 bytes, 64 hex characters)",
    blockSize: "512 bits (64 bytes)",
    rounds: "64 rounds",
    structure: "Merkle-Damgård construction with Davies-Meyer compression",
    wordSize: "32-bit words",
  },

  security: {
    level: "secure",
    collisionResistance: "2^128 operations (birthday attack)",
    preimageResistance: "2^256 operations",
    secondPreimageResistance: "2^256 operations",
    quantumResistance:
      "Partial - Grover's algorithm reduces to 2^128 (still secure for now)",
  },

  history: {
    createdYear: 2001,
    creator: "NSA (National Security Agency)",
    organization: "NIST",
    standardization: "FIPS 180-2 (2002), FIPS 180-4 (2015)",
    timeline: [
      {
        year: 2001,
        event: {
          en: "SHA-256 published by NIST as part of SHA-2 family",
          ko: "NIST가 SHA-2 계열의 일부로 SHA-256 발표",
          ja: "NISTがSHA-2ファミリーの一部としてSHA-256を発表",
        },
      },
      {
        year: 2002,
        event: {
          en: "Adopted as FIPS 180-2 standard",
          ko: "FIPS 180-2 표준으로 채택",
          ja: "FIPS 180-2標準として採用",
        },
      },
      {
        year: 2009,
        event: {
          en: "Bitcoin uses SHA-256 for proof-of-work and address generation",
          ko: "비트코인이 작업 증명과 주소 생성에 SHA-256 사용",
          ja: "BitcoinがProof-of-Workとアドレス生成にSHA-256を使用",
        },
      },
      {
        year: 2015,
        event: {
          en: "Major browsers deprecate SHA-1 certificates, SHA-256 becomes standard",
          ko: "주요 브라우저들이 SHA-1 인증서 지원 중단, SHA-256이 표준이 됨",
          ja: "主要ブラウザがSHA-1証明書を非推奨に、SHA-256が標準に",
        },
      },
      {
        year: 2017,
        event: {
          en: "All major CAs (Certificate Authorities) require SHA-256 for SSL certificates",
          ko: "모든 주요 CA가 SSL 인증서에 SHA-256 요구",
          ja: "すべての主要CAがSSL証明書にSHA-256を要求",
        },
      },
    ],
  },

  vulnerabilities: [
    {
      name: "Length Extension Attack",
      year: 2001,
      description: {
        en: "Like all Merkle-Damgård constructions, SHA-256 is vulnerable to length extension attacks. Use HMAC-SHA256 for keyed hashing.",
        ko: "모든 Merkle-Damgård 구조처럼 SHA-256도 길이 확장 공격에 취약합니다. 키 기반 해싱에는 HMAC-SHA256을 사용하세요.",
        ja: "すべてのMerkle-Damgård構造と同様に、SHA-256は長さ拡張攻撃に脆弱です。鍵付きハッシングにはHMAC-SHA256を使用してください。",
      },
      severity: "medium",
    },
  ],

  realWorldUseCases: [
    {
      industry: "Cryptocurrency",
      company: "Bitcoin",
      useCase: {
        en: "Proof-of-Work mining and transaction verification",
        ko: "작업 증명 채굴 및 거래 검증",
        ja: "Proof-of-Workマイニングとトランザクション検証",
      },
      whyThisHash: {
        en: "Well-analyzed security, hardware acceleration available, 256-bit security level",
        ko: "잘 분석된 보안성, 하드웨어 가속 가능, 256비트 보안 수준",
        ja: "十分に分析されたセキュリティ、ハードウェアアクセラレーション利用可能、256ビットセキュリティレベル",
      },
    },
    {
      industry: "Web Security",
      company: "All major websites",
      useCase: {
        en: "SSL/TLS certificate signing and verification",
        ko: "SSL/TLS 인증서 서명 및 검증",
        ja: "SSL/TLS証明書の署名と検証",
      },
      whyThisHash: {
        en: "Industry standard since 2017, required by all Certificate Authorities",
        ko: "2017년 이후 업계 표준, 모든 인증 기관에서 요구",
        ja: "2017年以降の業界標準、すべての認証局が要求",
      },
    },
    {
      industry: "Software Distribution",
      company: "npm, PyPI, Docker",
      useCase: {
        en: "Package integrity verification and content-addressable storage",
        ko: "패키지 무결성 검증 및 콘텐츠 주소 지정 저장소",
        ja: "パッケージ整合性検証とコンテンツアドレス可能ストレージ",
      },
      whyThisHash: {
        en: "Secure against tampering, widely supported, sufficient performance",
        ko: "변조에 안전, 널리 지원됨, 충분한 성능",
        ja: "改ざんに対して安全、広くサポート、十分なパフォーマンス",
      },
    },
    {
      industry: "Government",
      company: "US Federal Agencies",
      useCase: {
        en: "Document signing and classified information protection",
        ko: "문서 서명 및 기밀 정보 보호",
        ja: "文書署名と機密情報保護",
      },
      whyThisHash: {
        en: "FIPS 180-4 approved, meets federal security requirements",
        ko: "FIPS 180-4 승인, 연방 보안 요구사항 충족",
        ja: "FIPS 180-4承認、連邦セキュリティ要件を満たす",
      },
    },
  ],

  codeExamples: [
    {
      language: "JavaScript",
      title: {
        en: "Generate SHA-256 using Web Crypto API",
        ko: "Web Crypto API를 사용한 SHA-256 생성",
        ja: "Web Crypto APIを使用したSHA-256生成",
      },
      code: `async function sha256(message) {
  const msgBuffer = new TextEncoder().encode(message);
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

// Usage
const hash = await sha256("Hello, World!");
console.log(hash);
// "dffd6021bb2bd5b0af676290809ec3a53191dd81c7f70a4b28688a362182986f"`,
      explanation: {
        en: "Web Crypto API is the native browser API for cryptographic operations. It's fast, secure, and doesn't require external libraries.",
        ko: "Web Crypto API는 암호화 작업을 위한 네이티브 브라우저 API입니다. 빠르고 안전하며 외부 라이브러리가 필요 없습니다.",
        ja: "Web Crypto APIは暗号操作のためのネイティブブラウザAPIです。高速で安全で、外部ライブラリを必要としません。",
      },
    },
    {
      language: "Python",
      title: {
        en: "Generate SHA-256 using hashlib",
        ko: "hashlib를 사용한 SHA-256 생성",
        ja: "hashlibを使用したSHA-256生成",
      },
      code: `import hashlib

# String hashing
text = "Hello, World!"
hash_object = hashlib.sha256(text.encode())
print(hash_object.hexdigest())
# "dffd6021bb2bd5b0af676290809ec3a53191dd81c7f70a4b28688a362182986f"

# File hashing
def sha256_file(filepath):
    sha256 = hashlib.sha256()
    with open(filepath, 'rb') as f:
        for chunk in iter(lambda: f.read(4096), b''):
            sha256.update(chunk)
    return sha256.hexdigest()`,
      explanation: {
        en: "Python's hashlib provides optimized SHA-256 implementation. Use chunked reading for large files to avoid memory issues.",
        ko: "Python의 hashlib는 최적화된 SHA-256 구현을 제공합니다. 큰 파일은 청크 읽기를 사용하여 메모리 문제를 방지하세요.",
        ja: "Pythonのhashlibは最適化されたSHA-256実装を提供します。大きなファイルにはチャンク読み取りを使用してメモリ問題を回避してください。",
      },
    },
    {
      language: "Node.js",
      title: {
        en: "Generate SHA-256 using crypto module",
        ko: "crypto 모듈을 사용한 SHA-256 생성",
        ja: "cryptoモジュールを使用したSHA-256生成",
      },
      code: `const crypto = require('crypto');

// String hashing
const text = "Hello, World!";
const hash = crypto.createHash('sha256').update(text).digest('hex');
console.log(hash);
// "dffd6021bb2bd5b0af676290809ec3a53191dd81c7f70a4b28688a362182986f"

// Stream hashing for large files
const fs = require('fs');
const hashStream = crypto.createHash('sha256');
fs.createReadStream('large-file.bin')
  .pipe(hashStream)
  .on('finish', () => console.log(hashStream.digest('hex')));`,
      explanation: {
        en: "Node.js crypto module uses OpenSSL for hardware-accelerated hashing when available.",
        ko: "Node.js crypto 모듈은 가능한 경우 하드웨어 가속 해싱을 위해 OpenSSL을 사용합니다.",
        ja: "Node.jsのcryptoモジュールは、可能な場合はハードウェアアクセラレーションハッシングのためにOpenSSLを使用します。",
      },
    },
    {
      language: "Bash",
      title: {
        en: "Generate SHA-256 using command line",
        ko: "명령줄에서 SHA-256 생성",
        ja: "コマンドラインでSHA-256生成",
      },
      code: `# String hashing
echo -n "Hello, World!" | sha256sum
# dffd6021bb2bd5b0af676290809ec3a53191dd81c7f70a4b28688a362182986f  -

# File hashing
sha256sum myfile.txt
# dffd6021bb2bd5b0af676290809ec3a53191dd81c7f70a4b28688a362182986f  myfile.txt

# Verify downloaded file
echo "expected_hash  filename" | sha256sum -c -
# filename: OK`,
      explanation: {
        en: "sha256sum is standard on most Unix systems. Use -c flag to verify files against known hashes.",
        ko: "sha256sum은 대부분의 Unix 시스템에서 표준입니다. -c 플래그를 사용하여 알려진 해시와 파일을 검증하세요.",
        ja: "sha256sumはほとんどのUnixシステムで標準です。-cフラグを使用して既知のハッシュに対してファイルを検証します。",
      },
    },
  ],

  comparison: {
    vsOthers: [
      {
        hash: "SHA-512",
        comparison: {
          en: "SHA-512 provides 256-bit security (same as SHA-256 for practical purposes) but is faster on 64-bit systems. SHA-256 is more commonly used.",
          ko: "SHA-512는 256비트 보안(실용적으로 SHA-256과 동일)을 제공하지만 64비트 시스템에서 더 빠릅니다. SHA-256이 더 일반적으로 사용됩니다.",
          ja: "SHA-512は256ビットセキュリティ（実用的にはSHA-256と同じ）を提供しますが、64ビットシステムではより高速です。SHA-256がより一般的に使用されています。",
        },
      },
      {
        hash: "SHA-3",
        comparison: {
          en: "SHA-3 uses different construction (Keccak) and is immune to length extension attacks. SHA-256 is faster and more widely supported.",
          ko: "SHA-3는 다른 구조(Keccak)를 사용하며 길이 확장 공격에 면역입니다. SHA-256이 더 빠르고 널리 지원됩니다.",
          ja: "SHA-3は異なる構造（Keccak）を使用し、長さ拡張攻撃に耐性があります。SHA-256はより高速で広くサポートされています。",
        },
      },
      {
        hash: "BLAKE2b",
        comparison: {
          en: "BLAKE2b is faster than SHA-256 with equivalent security. Consider for new projects without legacy requirements.",
          ko: "BLAKE2b는 동등한 보안으로 SHA-256보다 빠릅니다. 레거시 요구사항이 없는 새 프로젝트에 고려하세요.",
          ja: "BLAKE2bは同等のセキュリティでSHA-256より高速です。レガシー要件のない新しいプロジェクトに検討してください。",
        },
      },
      {
        hash: "MD5",
        comparison: {
          en: "SHA-256 is 2-3x slower but cryptographically secure. Always use SHA-256 over MD5 for any security purpose.",
          ko: "SHA-256은 2-3배 느리지만 암호학적으로 안전합니다. 보안 목적에는 항상 MD5 대신 SHA-256을 사용하세요.",
          ja: "SHA-256は2-3倍遅いですが、暗号学的に安全です。セキュリティ目的には常にMD5よりSHA-256を使用してください。",
        },
      },
    ],
    whenToUse: {
      en: [
        "Digital signatures and certificate verification",
        "File integrity verification (security-critical)",
        "Blockchain and cryptocurrency applications",
        "Password storage with proper salting (consider bcrypt/Argon2)",
        "Content-addressable storage (Git, IPFS)",
      ],
      ko: [
        "디지털 서명 및 인증서 검증",
        "파일 무결성 검증 (보안 중요)",
        "블록체인 및 암호화폐 애플리케이션",
        "적절한 솔팅을 사용한 비밀번호 저장 (bcrypt/Argon2 고려)",
        "콘텐츠 주소 지정 저장소 (Git, IPFS)",
      ],
      ja: [
        "デジタル署名と証明書検証",
        "ファイル整合性検証（セキュリティクリティカル）",
        "ブロックチェーンと暗号通貨アプリケーション",
        "適切なソルティングを使用したパスワード保存（bcrypt/Argon2を検討）",
        "コンテンツアドレス可能ストレージ（Git、IPFS）",
      ],
    },
    whenNotToUse: {
      en: [
        "Password hashing without salt (use bcrypt/Argon2)",
        "When speed is critical and security isn't (use xxHash)",
        "Keyed hashing without HMAC construction",
      ],
      ko: [
        "솔트 없는 비밀번호 해싱 (bcrypt/Argon2 사용)",
        "속도가 중요하고 보안이 중요하지 않을 때 (xxHash 사용)",
        "HMAC 구조 없는 키 기반 해싱",
      ],
      ja: [
        "ソルトなしのパスワードハッシング（bcrypt/Argon2を使用）",
        "速度が重要でセキュリティが重要でない場合（xxHashを使用）",
        "HMAC構造なしの鍵付きハッシング",
      ],
    },
  },

  performance: {
    speedMBps: "~250 MB/s on modern CPU (single-threaded), ~2 GB/s with SHA-NI",
    cpuCycles: "~12 cycles per byte (software), ~3 cycles with SHA-NI",
    memoryUsage: "Minimal - 256 bytes state",
    parallelizable: false,
    hardwareAcceleration: [
      "Intel SHA Extensions (SHA-NI)",
      "AMD SHA Extensions",
      "ARM Cryptography Extensions (ARMv8-A)",
    ],
  },

  references: [
    {
      type: "FIPS",
      identifier: "FIPS 180-4",
      title: "Secure Hash Standard (SHS)",
      url: "https://csrc.nist.gov/publications/detail/fips/180/4/final",
    },
    {
      type: "RFC",
      identifier: "RFC 6234",
      title: "US Secure Hash Algorithms (SHA and SHA-based HMAC and HKDF)",
      url: "https://www.rfc-editor.org/rfc/rfc6234",
    },
    {
      type: "NIST",
      identifier: "NIST SP 800-107",
      title: "Recommendation for Applications Using Approved Hash Algorithms",
      url: "https://csrc.nist.gov/publications/detail/sp/800-107/rev-1/final",
    },
  ],
};

// ============================================
// bcrypt - 비밀번호 해싱 전용
// ============================================
export const BCRYPT_CONTENT: UniqueHashContent = {
  slug: "bcrypt",

  technicalSpecs: {
    outputLength: "184 bits (60 character encoded string)",
    blockSize: "N/A - key derivation function",
    rounds: "Configurable: 2^cost (default cost=10 = 1024 rounds)",
    structure: "Blowfish-based key derivation with Eksblowfish",
    wordSize: "N/A",
  },

  security: {
    level: "recommended",
    collisionResistance:
      "N/A - designed for password hashing, not collision resistance",
    preimageResistance: "Computational cost scales with cost factor",
    secondPreimageResistance: "N/A",
    quantumResistance: "Partial - cost factor provides some resistance",
  },

  history: {
    createdYear: 1999,
    creator: "Niels Provos and David Mazières",
    organization: "OpenBSD Project",
    standardization: "No formal standard - de facto industry standard",
    timeline: [
      {
        year: 1999,
        event: {
          en: "bcrypt introduced in OpenBSD 2.1",
          ko: "OpenBSD 2.1에서 bcrypt 도입",
          ja: "OpenBSD 2.1でbcryptが導入",
        },
      },
      {
        year: 2006,
        event: {
          en: "bcrypt gains widespread adoption in web frameworks",
          ko: "웹 프레임워크에서 bcrypt가 널리 채택됨",
          ja: "Webフレームワークでbcryptが広く採用される",
        },
      },
      {
        year: 2013,
        event: {
          en: "Adobe breach exposes poorly hashed passwords, bcrypt adoption increases",
          ko: "Adobe 유출로 취약한 해시된 비밀번호 노출, bcrypt 채택 증가",
          ja: "Adobe侵害で不適切にハッシュされたパスワードが露出、bcrypt採用が増加",
        },
      },
      {
        year: 2015,
        event: {
          en: "OWASP recommends bcrypt with cost factor 10+ for password storage",
          ko: "OWASP가 비밀번호 저장에 비용 계수 10 이상의 bcrypt 권장",
          ja: "OWASPがパスワード保存にコストファクター10以上のbcryptを推奨",
        },
      },
    ],
  },

  vulnerabilities: [
    {
      name: "72-byte Password Limit",
      year: 1999,
      description: {
        en: "bcrypt only processes the first 72 bytes of a password. Longer passwords are truncated silently.",
        ko: "bcrypt는 비밀번호의 처음 72바이트만 처리합니다. 더 긴 비밀번호는 조용히 잘립니다.",
        ja: "bcryptはパスワードの最初の72バイトのみを処理します。長いパスワードは静かに切り捨てられます。",
      },
      severity: "low",
    },
    {
      name: "2011 PHP Implementation Bug",
      year: 2011,
      description: {
        en: "PHP's crypt() truncated passwords at null bytes. Fixed in later versions.",
        ko: "PHP의 crypt()가 null 바이트에서 비밀번호를 잘랐습니다. 이후 버전에서 수정됨.",
        ja: "PHPのcrypt()がnullバイトでパスワードを切り捨てていました。後のバージョンで修正されました。",
      },
      severity: "high",
      cve: "CVE-2011-2483",
    },
  ],

  realWorldUseCases: [
    {
      industry: "Web Applications",
      company: "Majority of modern web apps",
      useCase: {
        en: "User password storage and authentication",
        ko: "사용자 비밀번호 저장 및 인증",
        ja: "ユーザーパスワードの保存と認証",
      },
      whyThisHash: {
        en: "Adaptive cost factor, built-in salt, resistant to rainbow tables and GPU attacks",
        ko: "적응형 비용 계수, 내장 솔트, 레인보우 테이블 및 GPU 공격에 저항",
        ja: "適応型コストファクター、組み込みソルト、レインボーテーブルとGPU攻撃に耐性",
      },
    },
    {
      industry: "Framework Defaults",
      company: "Rails, Django, Laravel",
      useCase: {
        en: "Default password hashing mechanism in major frameworks",
        ko: "주요 프레임워크의 기본 비밀번호 해싱 메커니즘",
        ja: "主要フレームワークのデフォルトパスワードハッシングメカニズム",
      },
      whyThisHash: {
        en: "Battle-tested, well-understood security properties, easy to use correctly",
        ko: "실전 검증됨, 잘 이해된 보안 속성, 올바르게 사용하기 쉬움",
        ja: "実戦で検証済み、よく理解されたセキュリティ特性、正しく使いやすい",
      },
    },
  ],

  codeExamples: [
    {
      language: "JavaScript",
      title: {
        en: "Password hashing with bcryptjs",
        ko: "bcryptjs를 사용한 비밀번호 해싱",
        ja: "bcryptjsを使用したパスワードハッシング",
      },
      code: `import bcrypt from 'bcryptjs';

// Hash a password
const password = "userPassword123";
const saltRounds = 10; // Cost factor

const hash = await bcrypt.hash(password, saltRounds);
console.log(hash);
// "$2a$10$N9qo8uLOickgx2ZMRZoMy..."

// Verify a password
const isMatch = await bcrypt.compare(password, hash);
console.log(isMatch); // true`,
      explanation: {
        en: "bcryptjs is a pure JavaScript implementation. Salt is automatically generated and embedded in the hash output.",
        ko: "bcryptjs는 순수 JavaScript 구현입니다. 솔트는 자동으로 생성되어 해시 출력에 포함됩니다.",
        ja: "bcryptjsは純粋なJavaScript実装です。ソルトは自動的に生成され、ハッシュ出力に埋め込まれます。",
      },
    },
    {
      language: "Python",
      title: {
        en: "Password hashing with bcrypt",
        ko: "bcrypt를 사용한 비밀번호 해싱",
        ja: "bcryptを使用したパスワードハッシング",
      },
      code: `import bcrypt

# Hash a password
password = b"userPassword123"
salt = bcrypt.gensalt(rounds=12)  # Cost factor
hashed = bcrypt.hashpw(password, salt)

# Verify a password
if bcrypt.checkpw(password, hashed):
    print("Password matches!")
else:
    print("Password does not match!")`,
      explanation: {
        en: "Python's bcrypt library wraps the OpenBSD implementation. Password must be bytes, not string.",
        ko: "Python의 bcrypt 라이브러리는 OpenBSD 구현을 래핑합니다. 비밀번호는 문자열이 아닌 바이트여야 합니다.",
        ja: "Pythonのbcryptライブラリは OpenBSD実装をラップしています。パスワードは文字列ではなくバイトでなければなりません。",
      },
    },
    {
      language: "PHP",
      title: {
        en: "Password hashing with password_hash",
        ko: "password_hash를 사용한 비밀번호 해싱",
        ja: "password_hashを使用したパスワードハッシング",
      },
      code: `<?php
// Hash a password (PHP 5.5+)
$password = "userPassword123";
$hash = password_hash($password, PASSWORD_BCRYPT, ['cost' => 12]);

// Verify a password
if (password_verify($password, $hash)) {
    echo "Password matches!";
}

// Check if rehash is needed (cost factor changed)
if (password_needs_rehash($hash, PASSWORD_BCRYPT, ['cost' => 13])) {
    $newHash = password_hash($password, PASSWORD_BCRYPT, ['cost' => 13]);
}
?>`,
      explanation: {
        en: "PHP's password_hash() is the recommended way. password_needs_rehash() helps with gradual cost factor upgrades.",
        ko: "PHP의 password_hash()가 권장되는 방법입니다. password_needs_rehash()는 점진적 비용 계수 업그레이드에 도움이 됩니다.",
        ja: "PHPのpassword_hash()が推奨される方法です。password_needs_rehash()は段階的なコストファクターのアップグレードに役立ちます。",
      },
    },
  ],

  comparison: {
    vsOthers: [
      {
        hash: "Argon2",
        comparison: {
          en: "Argon2 is newer (2015) and PHC winner. It's memory-hard, making GPU attacks harder. Use Argon2id for new projects.",
          ko: "Argon2는 더 새롭고(2015) PHC 우승자입니다. 메모리 하드로 GPU 공격을 어렵게 합니다. 새 프로젝트에는 Argon2id를 사용하세요.",
          ja: "Argon2はより新しく（2015年）、PHC優勝者です。メモリハードでGPU攻撃を困難にします。新しいプロジェクトにはArgon2idを使用してください。",
        },
      },
      {
        hash: "scrypt",
        comparison: {
          en: "scrypt is memory-hard like Argon2. bcrypt is CPU-hard only. scrypt has higher memory requirements.",
          ko: "scrypt는 Argon2처럼 메모리 하드입니다. bcrypt는 CPU 하드만입니다. scrypt는 더 높은 메모리 요구사항이 있습니다.",
          ja: "scryptはArgon2のようにメモリハードです。bcryptはCPUハードのみです。scryptはより高いメモリ要件があります。",
        },
      },
      {
        hash: "PBKDF2",
        comparison: {
          en: "PBKDF2 is NIST-approved but GPU-friendly. bcrypt is more resistant to GPU attacks.",
          ko: "PBKDF2는 NIST 승인이지만 GPU 친화적입니다. bcrypt가 GPU 공격에 더 저항력이 있습니다.",
          ja: "PBKDF2はNIST承認ですがGPUフレンドリーです。bcryptはGPU攻撃により耐性があります。",
        },
      },
    ],
    whenToUse: {
      en: [
        "User password storage in web applications",
        "When Argon2 is not available in your platform",
        "When you need a well-tested, widely-understood solution",
        "Gradual migration from weaker hashing algorithms",
      ],
      ko: [
        "웹 애플리케이션의 사용자 비밀번호 저장",
        "플랫폼에서 Argon2를 사용할 수 없을 때",
        "잘 테스트되고 널리 이해된 솔루션이 필요할 때",
        "약한 해싱 알고리즘에서 점진적 마이그레이션",
      ],
      ja: [
        "Webアプリケーションでのユーザーパスワード保存",
        "プラットフォームでArgon2が利用できない場合",
        "十分にテストされ、広く理解されたソリューションが必要な場合",
        "弱いハッシングアルゴリズムからの段階的な移行",
      ],
    },
    whenNotToUse: {
      en: [
        "File hashing or checksums (too slow)",
        "Non-password cryptographic operations",
        "When 72-byte password limit is a concern",
        "New projects where Argon2 is available",
      ],
      ko: [
        "파일 해싱 또는 체크섬 (너무 느림)",
        "비밀번호가 아닌 암호화 작업",
        "72바이트 비밀번호 제한이 문제될 때",
        "Argon2를 사용할 수 있는 새 프로젝트",
      ],
      ja: [
        "ファイルハッシングまたはチェックサム（遅すぎる）",
        "パスワード以外の暗号操作",
        "72バイトパスワード制限が問題になる場合",
        "Argon2が利用可能な新しいプロジェクト",
      ],
    },
  },

  performance: {
    speedMBps: "Intentionally slow - ~100 hashes/sec at cost=10",
    cpuCycles: "Configurable via cost factor (2^cost iterations)",
    memoryUsage: "4KB (fixed)",
    parallelizable: false,
    hardwareAcceleration: [],
  },

  references: [
    {
      type: "Paper",
      identifier: "Provos & Mazières 1999",
      title: "A Future-Adaptable Password Scheme",
      url: "https://www.usenix.org/legacy/events/usenix99/provos.html",
    },
    {
      type: "Website",
      identifier: "OWASP",
      title: "Password Storage Cheat Sheet",
      url: "https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html",
    },
  ],
};

// ============================================
// BLAKE2b - 현대적 고성능 해시
// ============================================
export const BLAKE2B_CONTENT: UniqueHashContent = {
  slug: "blake2b",

  technicalSpecs: {
    outputLength: "1 to 512 bits (configurable, default 512 bits)",
    blockSize: "1024 bits (128 bytes)",
    rounds: "12 rounds",
    structure: "HAIFA construction (Merkle-Damgård variant)",
    wordSize: "64-bit words",
  },

  security: {
    level: "recommended",
    collisionResistance: "2^256 operations (for 512-bit output)",
    preimageResistance: "2^512 operations",
    secondPreimageResistance: "2^512 operations",
    quantumResistance: "Partial - Grover's algorithm reduces to 2^256",
  },

  history: {
    createdYear: 2012,
    creator:
      "Jean-Philippe Aumasson, Samuel Neves, Zooko Wilcox-O'Hearn, Christian Winnerlein",
    organization: "Independent researchers",
    standardization: "RFC 7693 (2015)",
    timeline: [
      {
        year: 2008,
        event: {
          en: "BLAKE submitted to SHA-3 competition, reaches final round",
          ko: "BLAKE가 SHA-3 대회에 제출, 최종 라운드 진출",
          ja: "BLAKEがSHA-3コンペティションに提出され、最終ラウンドに進出",
        },
      },
      {
        year: 2012,
        event: {
          en: "BLAKE2 released as faster alternative to SHA-3 finalist BLAKE",
          ko: "BLAKE2가 SHA-3 최종 후보 BLAKE의 더 빠른 대안으로 출시",
          ja: "BLAKE2がSHA-3ファイナリストBLAKEのより高速な代替として公開",
        },
      },
      {
        year: 2015,
        event: {
          en: "BLAKE2 standardized in RFC 7693",
          ko: "BLAKE2가 RFC 7693으로 표준화",
          ja: "BLAKE2がRFC 7693で標準化",
        },
      },
      {
        year: 2020,
        event: {
          en: "BLAKE3 released with parallelization support",
          ko: "병렬화 지원과 함께 BLAKE3 출시",
          ja: "並列化サポート付きでBLAKE3がリリース",
        },
      },
    ],
  },

  vulnerabilities: [],

  realWorldUseCases: [
    {
      industry: "Cryptocurrency",
      company: "Zcash, Siacoin",
      useCase: {
        en: "Proof-of-Work and transaction hashing",
        ko: "작업 증명 및 거래 해싱",
        ja: "Proof-of-Workとトランザクションハッシング",
      },
      whyThisHash: {
        en: "Faster than SHA-256 with equivalent security, ASIC resistance",
        ko: "동등한 보안으로 SHA-256보다 빠름, ASIC 저항",
        ja: "同等のセキュリティでSHA-256より高速、ASIC耐性",
      },
    },
    {
      industry: "File Sync",
      company: "Restic, Syncthing",
      useCase: {
        en: "Content-addressable storage and file deduplication",
        ko: "콘텐츠 주소 지정 저장소 및 파일 중복 제거",
        ja: "コンテンツアドレス可能ストレージとファイル重複排除",
      },
      whyThisHash: {
        en: "Fast hashing for large files, keyed mode for MAC",
        ko: "대용량 파일의 빠른 해싱, MAC을 위한 키 모드",
        ja: "大きなファイルの高速ハッシング、MAC用のキーモード",
      },
    },
    {
      industry: "Password Managers",
      company: "1Password, Bitwarden",
      useCase: {
        en: "Key derivation and vault encryption",
        ko: "키 유도 및 볼트 암호화",
        ja: "鍵導出とボールト暗号化",
      },
      whyThisHash: {
        en: "Built-in keyed mode, personalization, and salt support",
        ko: "내장 키 모드, 개인화 및 솔트 지원",
        ja: "組み込みキーモード、パーソナライゼーション、ソルトサポート",
      },
    },
  ],

  codeExamples: [
    {
      language: "JavaScript",
      title: {
        en: "Generate BLAKE2b hash using hash-wasm",
        ko: "hash-wasm을 사용한 BLAKE2b 해시 생성",
        ja: "hash-wasmを使用したBLAKE2bハッシュ生成",
      },
      code: `import { blake2b } from 'hash-wasm';

const text = "Hello, World!";
const hash = await blake2b(text);
console.log(hash);
// "a2764d133a16816b5847a737a786f2ece4c148095c5faa73e24b4cc5d666c3e4..."

// With custom output length
const hash256 = await blake2b(text, 256); // 256-bit output`,
      explanation: {
        en: "hash-wasm uses WebAssembly for near-native performance in browsers and Node.js.",
        ko: "hash-wasm은 브라우저와 Node.js에서 네이티브에 가까운 성능을 위해 WebAssembly를 사용합니다.",
        ja: "hash-wasmはブラウザとNode.jsでネイティブに近いパフォーマンスのためにWebAssemblyを使用します。",
      },
    },
    {
      language: "Python",
      title: {
        en: "Generate BLAKE2b hash using hashlib",
        ko: "hashlib를 사용한 BLAKE2b 해시 생성",
        ja: "hashlibを使用したBLAKE2bハッシュ生成",
      },
      code: `import hashlib

# Basic usage
text = b"Hello, World!"
h = hashlib.blake2b(text)
print(h.hexdigest())

# With key (keyed mode for MAC)
key = b"secret-key"
h = hashlib.blake2b(text, key=key, digest_size=32)
print(h.hexdigest())

# With personalization
h = hashlib.blake2b(text, person=b"MyApp")
print(h.hexdigest())`,
      explanation: {
        en: "Python 3.6+ includes BLAKE2b in hashlib. Supports key, salt, and personalization parameters.",
        ko: "Python 3.6+는 hashlib에 BLAKE2b를 포함합니다. key, salt, personalization 매개변수를 지원합니다.",
        ja: "Python 3.6以降はhashlibにBLAKE2bを含みます。key、salt、personalizationパラメータをサポートします。",
      },
    },
    {
      language: "Rust",
      title: {
        en: "Generate BLAKE2b hash using blake2 crate",
        ko: "blake2 crate를 사용한 BLAKE2b 해시 생성",
        ja: "blake2クレートを使用したBLAKE2bハッシュ生成",
      },
      code: `use blake2::{Blake2b512, Digest};

fn main() {
    let mut hasher = Blake2b512::new();
    hasher.update(b"Hello, World!");
    let result = hasher.finalize();
    println!("{:x}", result);
}`,
      explanation: {
        en: "Rust's blake2 crate provides a type-safe API with compile-time digest size verification.",
        ko: "Rust의 blake2 crate는 컴파일 타임 다이제스트 크기 검증과 함께 타입 안전 API를 제공합니다.",
        ja: "Rustのblake2クレートはコンパイル時ダイジェストサイズ検証付きの型安全なAPIを提供します。",
      },
    },
  ],

  comparison: {
    vsOthers: [
      {
        hash: "SHA-256",
        comparison: {
          en: "BLAKE2b is 2-3x faster than SHA-256 in software with equivalent security. Prefer BLAKE2b for new projects.",
          ko: "BLAKE2b는 소프트웨어에서 동등한 보안으로 SHA-256보다 2-3배 빠릅니다. 새 프로젝트에는 BLAKE2b를 선호하세요.",
          ja: "BLAKE2bはソフトウェアで同等のセキュリティでSHA-256の2-3倍高速です。新しいプロジェクトにはBLAKE2bを推奨します。",
        },
      },
      {
        hash: "BLAKE3",
        comparison: {
          en: "BLAKE3 is newer and parallelizable. BLAKE2b is single-threaded but more widely supported.",
          ko: "BLAKE3는 더 새롭고 병렬화 가능합니다. BLAKE2b는 단일 스레드이지만 더 널리 지원됩니다.",
          ja: "BLAKE3はより新しく並列化可能です。BLAKE2bはシングルスレッドですがより広くサポートされています。",
        },
      },
      {
        hash: "SHA-3",
        comparison: {
          en: "Both are modern and secure. BLAKE2b is faster in software; SHA-3 has NIST standardization.",
          ko: "둘 다 현대적이고 안전합니다. BLAKE2b가 소프트웨어에서 더 빠르고, SHA-3는 NIST 표준화가 있습니다.",
          ja: "両方とも現代的で安全です。BLAKE2bはソフトウェアでより高速で、SHA-3にはNIST標準化があります。",
        },
      },
    ],
    whenToUse: {
      en: [
        "High-performance file hashing",
        "Content-addressable storage",
        "Keyed hashing (built-in MAC mode)",
        "Password hashing with Argon2",
        "General-purpose cryptographic hashing",
      ],
      ko: [
        "고성능 파일 해싱",
        "콘텐츠 주소 지정 저장소",
        "키 기반 해싱 (내장 MAC 모드)",
        "Argon2를 사용한 비밀번호 해싱",
        "범용 암호화 해싱",
      ],
      ja: [
        "高性能ファイルハッシング",
        "コンテンツアドレス可能ストレージ",
        "キー付きハッシング（組み込みMACモード）",
        "Argon2を使用したパスワードハッシング",
        "汎用暗号ハッシング",
      ],
    },
    whenNotToUse: {
      en: [
        "When SHA-256 is required for compliance (FIPS)",
        "When hardware SHA acceleration is critical",
        "Legacy systems without BLAKE2 support",
      ],
      ko: [
        "규정 준수를 위해 SHA-256이 필요할 때 (FIPS)",
        "하드웨어 SHA 가속이 중요할 때",
        "BLAKE2 지원이 없는 레거시 시스템",
      ],
      ja: [
        "コンプライアンスのためにSHA-256が必要な場合（FIPS）",
        "ハードウェアSHAアクセラレーションが重要な場合",
        "BLAKE2サポートのないレガシーシステム",
      ],
    },
  },

  performance: {
    speedMBps: "~1 GB/s on modern CPU (single-threaded)",
    cpuCycles: "~3 cycles per byte",
    memoryUsage: "Minimal - 336 bytes state",
    parallelizable: false,
    hardwareAcceleration: [],
  },

  references: [
    {
      type: "RFC",
      identifier: "RFC 7693",
      title:
        "The BLAKE2 Cryptographic Hash and Message Authentication Code (MAC)",
      url: "https://www.rfc-editor.org/rfc/rfc7693",
    },
    {
      type: "Paper",
      identifier: "Aumasson et al. 2013",
      title: "BLAKE2: simpler, smaller, fast as MD5",
      url: "https://blake2.net/blake2.pdf",
    },
    {
      type: "Website",
      identifier: "BLAKE2 Official",
      title: "BLAKE2 — fast secure hashing",
      url: "https://blake2.net/",
    },
  ],
};

// ============================================
// 고유 콘텐츠 맵핑 및 헬퍼
// ============================================

export const uniqueHashContents: Record<string, UniqueHashContent> = {
  md5: MD5_CONTENT,
  sha256: SHA256_CONTENT,
  bcrypt: BCRYPT_CONTENT,
  blake2b: BLAKE2B_CONTENT,
};

/**
 * slug로 고유 콘텐츠 조회
 */
export function getUniqueHashContent(
  slug: string,
): UniqueHashContent | undefined {
  return uniqueHashContents[slug];
}

/**
 * 모든 고유 콘텐츠가 있는 해시 slug 목록
 */
export function getHashSlugsWithUniqueContent(): string[] {
  return Object.keys(uniqueHashContents);
}
