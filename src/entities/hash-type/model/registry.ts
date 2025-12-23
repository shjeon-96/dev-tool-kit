/**
 * Hash Type Registry
 * 해시 알고리즘별 pSEO 페이지를 위한 데이터 레지스트리
 */

import type { HashType, LocaleKey } from "./types";

export const allHashTypes: HashType[] = [
  // === 보안용 해시 (권장) ===
  {
    slug: "sha256",
    algorithm: "SHA-256",
    title: {
      en: "SHA-256 Hash Generator",
      ko: "SHA-256 해시 생성기",
      ja: "SHA-256ハッシュジェネレーター",
    },
    description: {
      en: "Generate secure SHA-256 hash values. 256-bit cryptographic hash function widely used for data integrity verification and digital signatures.",
      ko: "안전한 SHA-256 해시 값을 생성합니다. 데이터 무결성 검증과 디지털 서명에 널리 사용되는 256비트 암호화 해시 함수입니다.",
      ja: "安全なSHA-256ハッシュ値を生成します。データ整合性の検証とデジタル署名に広く使用される256ビット暗号ハッシュ関数です。",
    },
    keywords: {
      en: [
        "sha256",
        "sha-256",
        "hash generator",
        "cryptographic hash",
        "secure hash",
        "256-bit hash",
      ],
      ko: [
        "sha256",
        "sha-256",
        "해시 생성기",
        "암호화 해시",
        "보안 해시",
        "256비트 해시",
      ],
      ja: [
        "sha256",
        "sha-256",
        "ハッシュ生成",
        "暗号ハッシュ",
        "セキュアハッシュ",
        "256ビットハッシュ",
      ],
    },
    useCases: {
      en: [
        "File integrity verification",
        "Password hashing (with salt)",
        "Digital signatures",
        "Blockchain",
        "SSL/TLS certificates",
      ],
      ko: [
        "파일 무결성 검증",
        "비밀번호 해싱 (솔트 사용)",
        "디지털 서명",
        "블록체인",
        "SSL/TLS 인증서",
      ],
      ja: [
        "ファイル整合性検証",
        "パスワードハッシュ（ソルト使用）",
        "デジタル署名",
        "ブロックチェーン",
        "SSL/TLS証明書",
      ],
    },
    outputLength: 256,
    isSecure: true,
  },
  {
    slug: "sha512",
    algorithm: "SHA-512",
    title: {
      en: "SHA-512 Hash Generator",
      ko: "SHA-512 해시 생성기",
      ja: "SHA-512ハッシュジェネレーター",
    },
    description: {
      en: "Generate SHA-512 hash values. 512-bit cryptographic hash function offering higher security for sensitive applications.",
      ko: "SHA-512 해시 값을 생성합니다. 민감한 애플리케이션에 더 높은 보안을 제공하는 512비트 암호화 해시 함수입니다.",
      ja: "SHA-512ハッシュ値を生成します。機密性の高いアプリケーション向けに高いセキュリティを提供する512ビット暗号ハッシュ関数です。",
    },
    keywords: {
      en: [
        "sha512",
        "sha-512",
        "hash generator",
        "cryptographic hash",
        "512-bit hash",
        "secure hash algorithm",
      ],
      ko: [
        "sha512",
        "sha-512",
        "해시 생성기",
        "암호화 해시",
        "512비트 해시",
        "보안 해시 알고리즘",
      ],
      ja: [
        "sha512",
        "sha-512",
        "ハッシュ生成",
        "暗号ハッシュ",
        "512ビットハッシュ",
        "セキュアハッシュアルゴリズム",
      ],
    },
    useCases: {
      en: [
        "High-security applications",
        "Password storage",
        "Digital signatures",
        "Cryptographic protocols",
        "Government systems",
      ],
      ko: [
        "고보안 애플리케이션",
        "비밀번호 저장",
        "디지털 서명",
        "암호화 프로토콜",
        "정부 시스템",
      ],
      ja: [
        "高セキュリティアプリケーション",
        "パスワード保存",
        "デジタル署名",
        "暗号プロトコル",
        "政府システム",
      ],
    },
    outputLength: 512,
    isSecure: true,
  },
  {
    slug: "sha384",
    algorithm: "SHA-384",
    title: {
      en: "SHA-384 Hash Generator",
      ko: "SHA-384 해시 생성기",
      ja: "SHA-384ハッシュジェネレーター",
    },
    description: {
      en: "Generate SHA-384 hash values. A truncated version of SHA-512 providing 384-bit security level.",
      ko: "SHA-384 해시 값을 생성합니다. 384비트 보안 수준을 제공하는 SHA-512의 축약 버전입니다.",
      ja: "SHA-384ハッシュ値を生成します。384ビットのセキュリティレベルを提供するSHA-512の短縮版です。",
    },
    keywords: {
      en: [
        "sha384",
        "sha-384",
        "hash generator",
        "cryptographic hash",
        "384-bit hash",
      ],
      ko: ["sha384", "sha-384", "해시 생성기", "암호화 해시", "384비트 해시"],
      ja: [
        "sha384",
        "sha-384",
        "ハッシュ生成",
        "暗号ハッシュ",
        "384ビットハッシュ",
      ],
    },
    useCases: {
      en: [
        "TLS/SSL protocols",
        "Code signing",
        "Digital certificates",
        "Enterprise applications",
      ],
      ko: [
        "TLS/SSL 프로토콜",
        "코드 서명",
        "디지털 인증서",
        "엔터프라이즈 애플리케이션",
      ],
      ja: [
        "TLS/SSLプロトコル",
        "コード署名",
        "デジタル証明書",
        "エンタープライズアプリケーション",
      ],
    },
    outputLength: 384,
    isSecure: true,
  },
  {
    slug: "sha1",
    algorithm: "SHA-1",
    title: {
      en: "SHA-1 Hash Generator",
      ko: "SHA-1 해시 생성기",
      ja: "SHA-1ハッシュジェネレーター",
    },
    description: {
      en: "Generate SHA-1 hash values. 160-bit hash function. Note: SHA-1 is deprecated for security purposes but still used for checksums and legacy systems.",
      ko: "SHA-1 해시 값을 생성합니다. 160비트 해시 함수입니다. 참고: SHA-1은 보안 목적으로는 권장되지 않지만 체크섬과 레거시 시스템에서 여전히 사용됩니다.",
      ja: "SHA-1ハッシュ値を生成します。160ビットハッシュ関数です。注意：SHA-1はセキュリティ目的では非推奨ですが、チェックサムやレガシーシステムではまだ使用されています。",
    },
    keywords: {
      en: [
        "sha1",
        "sha-1",
        "hash generator",
        "160-bit hash",
        "git hash",
        "legacy hash",
      ],
      ko: [
        "sha1",
        "sha-1",
        "해시 생성기",
        "160비트 해시",
        "git 해시",
        "레거시 해시",
      ],
      ja: [
        "sha1",
        "sha-1",
        "ハッシュ生成",
        "160ビットハッシュ",
        "gitハッシュ",
        "レガシーハッシュ",
      ],
    },
    useCases: {
      en: [
        "Git version control",
        "Legacy system compatibility",
        "Non-security checksums",
        "File identification",
      ],
      ko: [
        "Git 버전 관리",
        "레거시 시스템 호환성",
        "비보안 체크섬",
        "파일 식별",
      ],
      ja: [
        "Gitバージョン管理",
        "レガシーシステム互換性",
        "非セキュリティチェックサム",
        "ファイル識別",
      ],
    },
    outputLength: 160,
    isSecure: false,
  },
  {
    slug: "md5",
    algorithm: "MD5",
    title: {
      en: "MD5 Hash Generator",
      ko: "MD5 해시 생성기",
      ja: "MD5ハッシュジェネレーター",
    },
    description: {
      en: "Generate MD5 hash values. 128-bit hash function commonly used for file checksums. Warning: MD5 is cryptographically broken and should not be used for security.",
      ko: "MD5 해시 값을 생성합니다. 파일 체크섬에 일반적으로 사용되는 128비트 해시 함수입니다. 경고: MD5는 암호학적으로 취약하며 보안 목적으로 사용해서는 안 됩니다.",
      ja: "MD5ハッシュ値を生成します。ファイルチェックサムによく使用される128ビットハッシュ関数です。警告：MD5は暗号学的に脆弱であり、セキュリティ目的で使用すべきではありません。",
    },
    keywords: {
      en: [
        "md5",
        "md5 hash",
        "hash generator",
        "128-bit hash",
        "file checksum",
        "checksum generator",
      ],
      ko: [
        "md5",
        "md5 해시",
        "해시 생성기",
        "128비트 해시",
        "파일 체크섬",
        "체크섬 생성기",
      ],
      ja: [
        "md5",
        "md5ハッシュ",
        "ハッシュ生成",
        "128ビットハッシュ",
        "ファイルチェックサム",
        "チェックサム生成",
      ],
    },
    useCases: {
      en: [
        "File integrity checks",
        "Data deduplication",
        "Cache keys",
        "Non-security fingerprinting",
      ],
      ko: [
        "파일 무결성 검사",
        "데이터 중복 제거",
        "캐시 키",
        "비보안 핑거프린팅",
      ],
      ja: [
        "ファイル整合性チェック",
        "データ重複排除",
        "キャッシュキー",
        "非セキュリティフィンガープリント",
      ],
    },
    outputLength: 128,
    isSecure: false,
  },
  // === HMAC 변형 ===
  {
    slug: "hmac-sha256",
    algorithm: "HMAC-SHA256",
    title: {
      en: "HMAC-SHA256 Generator",
      ko: "HMAC-SHA256 생성기",
      ja: "HMAC-SHA256ジェネレーター",
    },
    description: {
      en: "Generate HMAC-SHA256 message authentication codes. Combines SHA-256 with a secret key for secure message authentication.",
      ko: "HMAC-SHA256 메시지 인증 코드를 생성합니다. SHA-256과 비밀 키를 결합하여 안전한 메시지 인증을 제공합니다.",
      ja: "HMAC-SHA256メッセージ認証コードを生成します。SHA-256と秘密鍵を組み合わせて安全なメッセージ認証を提供します。",
    },
    keywords: {
      en: [
        "hmac",
        "hmac-sha256",
        "message authentication",
        "mac generator",
        "api signature",
        "jwt",
      ],
      ko: [
        "hmac",
        "hmac-sha256",
        "메시지 인증",
        "mac 생성기",
        "api 서명",
        "jwt",
      ],
      ja: [
        "hmac",
        "hmac-sha256",
        "メッセージ認証",
        "mac生成",
        "api署名",
        "jwt",
      ],
    },
    useCases: {
      en: [
        "API authentication",
        "JWT signing",
        "Webhook verification",
        "Data integrity with authentication",
      ],
      ko: ["API 인증", "JWT 서명", "웹훅 검증", "인증이 포함된 데이터 무결성"],
      ja: ["API認証", "JWT署名", "Webhook検証", "認証付きデータ整合性"],
    },
    outputLength: 256,
    isSecure: true,
  },
  {
    slug: "hmac-sha512",
    algorithm: "HMAC-SHA512",
    title: {
      en: "HMAC-SHA512 Generator",
      ko: "HMAC-SHA512 생성기",
      ja: "HMAC-SHA512ジェネレーター",
    },
    description: {
      en: "Generate HMAC-SHA512 message authentication codes. High-security keyed hash for message authentication.",
      ko: "HMAC-SHA512 메시지 인증 코드를 생성합니다. 메시지 인증을 위한 고보안 키 해시입니다.",
      ja: "HMAC-SHA512メッセージ認証コードを生成します。メッセージ認証のための高セキュリティキー付きハッシュです。",
    },
    keywords: {
      en: [
        "hmac",
        "hmac-sha512",
        "message authentication",
        "512-bit mac",
        "secure mac",
      ],
      ko: ["hmac", "hmac-sha512", "메시지 인증", "512비트 mac", "보안 mac"],
      ja: [
        "hmac",
        "hmac-sha512",
        "メッセージ認証",
        "512ビットmac",
        "セキュアmac",
      ],
    },
    useCases: {
      en: [
        "High-security API authentication",
        "Secure token generation",
        "Financial transactions",
      ],
      ko: ["고보안 API 인증", "보안 토큰 생성", "금융 거래"],
      ja: ["高セキュリティAPI認証", "セキュアトークン生成", "金融取引"],
    },
    outputLength: 512,
    isSecure: true,
  },
  // === 비암호화 해시 (빠른 처리용) ===
  {
    slug: "crc32",
    algorithm: "CRC32",
    title: {
      en: "CRC32 Checksum Calculator",
      ko: "CRC32 체크섬 계산기",
      ja: "CRC32チェックサム計算機",
    },
    description: {
      en: "Calculate CRC32 checksums for data integrity verification. Fast cyclic redundancy check commonly used in file formats and network protocols.",
      ko: "데이터 무결성 검증을 위한 CRC32 체크섬을 계산합니다. 파일 형식과 네트워크 프로토콜에서 일반적으로 사용되는 빠른 순환 중복 검사입니다.",
      ja: "データ整合性検証のためのCRC32チェックサムを計算します。ファイル形式やネットワークプロトコルで一般的に使用される高速な巡回冗長検査です。",
    },
    keywords: {
      en: [
        "crc32",
        "checksum",
        "cyclic redundancy check",
        "file checksum",
        "data integrity",
      ],
      ko: ["crc32", "체크섬", "순환 중복 검사", "파일 체크섬", "데이터 무결성"],
      ja: [
        "crc32",
        "チェックサム",
        "巡回冗長検査",
        "ファイルチェックサム",
        "データ整合性",
      ],
    },
    useCases: {
      en: [
        "ZIP file verification",
        "Network packet checking",
        "Storage integrity",
        "Error detection",
      ],
      ko: ["ZIP 파일 검증", "네트워크 패킷 검사", "저장소 무결성", "오류 감지"],
      ja: [
        "ZIPファイル検証",
        "ネットワークパケットチェック",
        "ストレージ整合性",
        "エラー検出",
      ],
    },
    outputLength: 32,
    isSecure: false,
  },
  {
    slug: "adler32",
    algorithm: "Adler-32",
    title: {
      en: "Adler-32 Checksum Calculator",
      ko: "Adler-32 체크섬 계산기",
      ja: "Adler-32チェックサム計算機",
    },
    description: {
      en: "Calculate Adler-32 checksums. A faster alternative to CRC32 used in zlib compression.",
      ko: "Adler-32 체크섬을 계산합니다. zlib 압축에서 사용되는 CRC32보다 빠른 대안입니다.",
      ja: "Adler-32チェックサムを計算します。zlib圧縮で使用されるCRC32より高速な代替手段です。",
    },
    keywords: {
      en: ["adler32", "adler-32", "checksum", "zlib", "compression checksum"],
      ko: ["adler32", "adler-32", "체크섬", "zlib", "압축 체크섬"],
      ja: ["adler32", "adler-32", "チェックサム", "zlib", "圧縮チェックサム"],
    },
    useCases: {
      en: [
        "Zlib/gzip compression",
        "Fast integrity checking",
        "Streaming data validation",
      ],
      ko: ["Zlib/gzip 압축", "빠른 무결성 검사", "스트리밍 데이터 검증"],
      ja: ["Zlib/gzip圧縮", "高速整合性チェック", "ストリーミングデータ検証"],
    },
    outputLength: 32,
    isSecure: false,
  },
  // === 파일 해시 전용 ===
  {
    slug: "file-md5",
    algorithm: "File MD5",
    title: {
      en: "File MD5 Hash Calculator",
      ko: "파일 MD5 해시 계산기",
      ja: "ファイルMD5ハッシュ計算機",
    },
    description: {
      en: "Calculate MD5 hash of files for integrity verification. Drag and drop files to instantly generate their MD5 checksums.",
      ko: "무결성 검증을 위해 파일의 MD5 해시를 계산합니다. 파일을 드래그 앤 드롭하여 즉시 MD5 체크섬을 생성하세요.",
      ja: "整合性検証のためにファイルのMD5ハッシュを計算します。ファイルをドラッグ＆ドロップして即座にMD5チェックサムを生成します。",
    },
    keywords: {
      en: [
        "file md5",
        "md5 checksum",
        "file hash",
        "file verification",
        "download verification",
      ],
      ko: ["파일 md5", "md5 체크섬", "파일 해시", "파일 검증", "다운로드 검증"],
      ja: [
        "ファイルmd5",
        "md5チェックサム",
        "ファイルハッシュ",
        "ファイル検証",
        "ダウンロード検証",
      ],
    },
    useCases: {
      en: [
        "Verify downloaded files",
        "Check file integrity",
        "Detect file tampering",
        "Compare file versions",
      ],
      ko: [
        "다운로드 파일 검증",
        "파일 무결성 확인",
        "파일 변조 감지",
        "파일 버전 비교",
      ],
      ja: [
        "ダウンロードファイル検証",
        "ファイル整合性確認",
        "ファイル改ざん検出",
        "ファイルバージョン比較",
      ],
    },
    outputLength: 128,
    isSecure: false,
  },
  {
    slug: "file-sha256",
    algorithm: "File SHA-256",
    title: {
      en: "File SHA-256 Hash Calculator",
      ko: "파일 SHA-256 해시 계산기",
      ja: "ファイルSHA-256ハッシュ計算機",
    },
    description: {
      en: "Calculate secure SHA-256 hash of files. Industry standard for software distribution and file integrity verification.",
      ko: "파일의 안전한 SHA-256 해시를 계산합니다. 소프트웨어 배포 및 파일 무결성 검증의 업계 표준입니다.",
      ja: "ファイルの安全なSHA-256ハッシュを計算します。ソフトウェア配布とファイル整合性検証の業界標準です。",
    },
    keywords: {
      en: [
        "file sha256",
        "sha256 checksum",
        "file hash",
        "secure file verification",
        "software verification",
      ],
      ko: [
        "파일 sha256",
        "sha256 체크섬",
        "파일 해시",
        "안전한 파일 검증",
        "소프트웨어 검증",
      ],
      ja: [
        "ファイルsha256",
        "sha256チェックサム",
        "ファイルハッシュ",
        "セキュアファイル検証",
        "ソフトウェア検証",
      ],
    },
    useCases: {
      en: [
        "Software download verification",
        "ISO image verification",
        "Secure file comparison",
        "Digital evidence",
      ],
      ko: [
        "소프트웨어 다운로드 검증",
        "ISO 이미지 검증",
        "안전한 파일 비교",
        "디지털 증거",
      ],
      ja: [
        "ソフトウェアダウンロード検証",
        "ISOイメージ検証",
        "セキュアファイル比較",
        "デジタル証拠",
      ],
    },
    outputLength: 256,
    isSecure: true,
  },
  // === 비밀번호 해싱 ===
  {
    slug: "bcrypt",
    algorithm: "bcrypt",
    title: {
      en: "Bcrypt Hash Generator",
      ko: "Bcrypt 해시 생성기",
      ja: "Bcryptハッシュジェネレーター",
    },
    description: {
      en: "Generate bcrypt password hashes with configurable cost factor. Adaptive password hashing algorithm designed to resist brute-force attacks.",
      ko: "설정 가능한 비용 계수로 bcrypt 비밀번호 해시를 생성합니다. 무차별 대입 공격에 저항하도록 설계된 적응형 비밀번호 해싱 알고리즘입니다.",
      ja: "設定可能なコストファクターでbcryptパスワードハッシュを生成します。ブルートフォース攻撃に耐性を持つ適応型パスワードハッシュアルゴリズムです。",
    },
    keywords: {
      en: [
        "bcrypt",
        "password hash",
        "password hashing",
        "secure password",
        "password encryption",
      ],
      ko: [
        "bcrypt",
        "비밀번호 해시",
        "비밀번호 해싱",
        "안전한 비밀번호",
        "비밀번호 암호화",
      ],
      ja: [
        "bcrypt",
        "パスワードハッシュ",
        "パスワードハッシング",
        "セキュアパスワード",
        "パスワード暗号化",
      ],
    },
    useCases: {
      en: [
        "User password storage",
        "Authentication systems",
        "Secure credential management",
      ],
      ko: ["사용자 비밀번호 저장", "인증 시스템", "안전한 자격 증명 관리"],
      ja: ["ユーザーパスワード保存", "認証システム", "セキュア資格情報管理"],
    },
    outputLength: 184,
    isSecure: true,
  },
  {
    slug: "argon2",
    algorithm: "Argon2",
    title: {
      en: "Argon2 Hash Generator",
      ko: "Argon2 해시 생성기",
      ja: "Argon2ハッシュジェネレーター",
    },
    description: {
      en: "Generate Argon2 password hashes. Winner of the Password Hashing Competition, recommended for modern password storage.",
      ko: "Argon2 비밀번호 해시를 생성합니다. 비밀번호 해싱 대회 우승자이며 현대적인 비밀번호 저장에 권장됩니다.",
      ja: "Argon2パスワードハッシュを生成します。Password Hashing Competition優勝者で、現代的なパスワード保存に推奨されています。",
    },
    keywords: {
      en: [
        "argon2",
        "argon2id",
        "password hash",
        "modern password hashing",
        "phc winner",
      ],
      ko: [
        "argon2",
        "argon2id",
        "비밀번호 해시",
        "현대적 비밀번호 해싱",
        "phc 우승자",
      ],
      ja: [
        "argon2",
        "argon2id",
        "パスワードハッシュ",
        "モダンパスワードハッシング",
        "phc優勝者",
      ],
    },
    useCases: {
      en: [
        "Modern password storage",
        "Key derivation",
        "Memory-hard hashing",
        "High-security authentication",
      ],
      ko: [
        "현대적 비밀번호 저장",
        "키 유도",
        "메모리 하드 해싱",
        "고보안 인증",
      ],
      ja: [
        "モダンパスワード保存",
        "鍵導出",
        "メモリハードハッシング",
        "高セキュリティ認証",
      ],
    },
    outputLength: 256,
    isSecure: true,
  },
  // === 특수 목적 해시 ===
  {
    slug: "blake2b",
    algorithm: "BLAKE2b",
    title: {
      en: "BLAKE2b Hash Generator",
      ko: "BLAKE2b 해시 생성기",
      ja: "BLAKE2bハッシュジェネレーター",
    },
    description: {
      en: "Generate BLAKE2b hash values. Faster than SHA-256 while maintaining high security, used in modern cryptographic applications.",
      ko: "BLAKE2b 해시 값을 생성합니다. 높은 보안을 유지하면서 SHA-256보다 빠르며, 현대 암호화 애플리케이션에서 사용됩니다.",
      ja: "BLAKE2bハッシュ値を生成します。高いセキュリティを維持しながらSHA-256より高速で、現代の暗号アプリケーションで使用されています。",
    },
    keywords: {
      en: [
        "blake2b",
        "blake2",
        "fast hash",
        "modern hash",
        "cryptographic hash",
      ],
      ko: ["blake2b", "blake2", "빠른 해시", "현대적 해시", "암호화 해시"],
      ja: [
        "blake2b",
        "blake2",
        "高速ハッシュ",
        "モダンハッシュ",
        "暗号ハッシュ",
      ],
    },
    useCases: {
      en: [
        "High-performance hashing",
        "Cryptocurrency",
        "Digital signatures",
        "File integrity",
      ],
      ko: ["고성능 해싱", "암호화폐", "디지털 서명", "파일 무결성"],
      ja: ["高性能ハッシング", "暗号通貨", "デジタル署名", "ファイル整合性"],
    },
    outputLength: 512,
    isSecure: true,
  },
  {
    slug: "xxhash",
    algorithm: "xxHash",
    title: {
      en: "xxHash Calculator",
      ko: "xxHash 계산기",
      ja: "xxHash計算機",
    },
    description: {
      en: "Calculate xxHash values for extremely fast non-cryptographic hashing. Ideal for hash tables, checksums, and data deduplication.",
      ko: "매우 빠른 비암호화 해싱을 위한 xxHash 값을 계산합니다. 해시 테이블, 체크섬, 데이터 중복 제거에 이상적입니다.",
      ja: "非常に高速な非暗号化ハッシングのためのxxHash値を計算します。ハッシュテーブル、チェックサム、データ重複排除に最適です。",
    },
    keywords: {
      en: [
        "xxhash",
        "fast hash",
        "non-cryptographic hash",
        "hash table",
        "checksum",
      ],
      ko: ["xxhash", "빠른 해시", "비암호화 해시", "해시 테이블", "체크섬"],
      ja: [
        "xxhash",
        "高速ハッシュ",
        "非暗号ハッシュ",
        "ハッシュテーブル",
        "チェックサム",
      ],
    },
    useCases: {
      en: [
        "Hash tables",
        "Data deduplication",
        "Fast checksums",
        "Cache keys",
        "Database indexing",
      ],
      ko: [
        "해시 테이블",
        "데이터 중복 제거",
        "빠른 체크섬",
        "캐시 키",
        "데이터베이스 인덱싱",
      ],
      ja: [
        "ハッシュテーブル",
        "データ重複排除",
        "高速チェックサム",
        "キャッシュキー",
        "データベースインデックス",
      ],
    },
    outputLength: 64,
    isSecure: false,
  },
  {
    slug: "murmur3",
    algorithm: "MurmurHash3",
    title: {
      en: "MurmurHash3 Calculator",
      ko: "MurmurHash3 계산기",
      ja: "MurmurHash3計算機",
    },
    description: {
      en: "Calculate MurmurHash3 values. Fast non-cryptographic hash function popular for hash-based lookups and data partitioning.",
      ko: "MurmurHash3 값을 계산합니다. 해시 기반 조회 및 데이터 파티셔닝에 인기 있는 빠른 비암호화 해시 함수입니다.",
      ja: "MurmurHash3値を計算します。ハッシュベースのルックアップとデータパーティショニングで人気のある高速非暗号ハッシュ関数です。",
    },
    keywords: {
      en: [
        "murmurhash",
        "murmur3",
        "fast hash",
        "consistent hashing",
        "data partitioning",
      ],
      ko: [
        "murmurhash",
        "murmur3",
        "빠른 해시",
        "일관된 해싱",
        "데이터 파티셔닝",
      ],
      ja: [
        "murmurhash",
        "murmur3",
        "高速ハッシュ",
        "コンシステントハッシング",
        "データパーティショニング",
      ],
    },
    useCases: {
      en: [
        "Consistent hashing",
        "Load balancing",
        "Bloom filters",
        "Data sharding",
      ],
      ko: ["일관된 해싱", "로드 밸런싱", "블룸 필터", "데이터 샤딩"],
      ja: [
        "コンシステントハッシング",
        "ロードバランシング",
        "ブルームフィルター",
        "データシャーディング",
      ],
    },
    outputLength: 128,
    isSecure: false,
  },
];

// ============================================
// Helper Functions
// ============================================

/**
 * slug로 해시 타입 찾기
 */
export function getHashTypeBySlug(slug: string): HashType | undefined {
  return allHashTypes.find((h) => h.slug === slug);
}

/**
 * 모든 해시 타입 slug 배열 반환
 */
export function getAllHashTypeSlugs(): string[] {
  return allHashTypes.map((h) => h.slug);
}

/**
 * 보안용 해시만 필터링
 */
export function getSecureHashTypes(): HashType[] {
  return allHashTypes.filter((h) => h.isSecure);
}

/**
 * 비보안(빠른) 해시만 필터링
 */
export function getNonSecureHashTypes(): HashType[] {
  return allHashTypes.filter((h) => !h.isSecure);
}

/**
 * 특정 로케일의 제목 반환
 */
export function getHashTypeTitle(
  hashType: HashType,
  locale: LocaleKey,
): string {
  return hashType.title[locale] || hashType.title.en;
}

/**
 * 특정 로케일의 설명 반환
 */
export function getHashTypeDescription(
  hashType: HashType,
  locale: LocaleKey,
): string {
  return hashType.description[locale] || hashType.description.en;
}

/**
 * 관련 해시 타입 반환 (같은 보안 수준 우선)
 */
export function getRelatedHashTypes(
  currentSlug: string,
  limit = 6,
): HashType[] {
  const current = getHashTypeBySlug(currentSlug);
  if (!current) return allHashTypes.slice(0, limit);

  // 같은 보안 수준의 해시 우선, 다른 것도 포함
  const sameSecurityLevel = allHashTypes.filter(
    (h) => h.slug !== currentSlug && h.isSecure === current.isSecure,
  );
  const differentSecurityLevel = allHashTypes.filter(
    (h) => h.slug !== currentSlug && h.isSecure !== current.isSecure,
  );

  return [...sameSecurityLevel, ...differentSecurityLevel].slice(0, limit);
}
