/**
 * Hash Type 정의
 */

export interface HashType {
  slug: string;
  algorithm: string;
  title: {
    en: string;
    ko: string;
    ja: string;
  };
  description: {
    en: string;
    ko: string;
    ja: string;
  };
  keywords: {
    en: string[];
    ko: string[];
    ja: string[];
  };
  useCases?: {
    en: string[];
    ko: string[];
    ja: string[];
  };
  outputLength?: number; // bits
  isSecure: boolean; // 보안용으로 권장되는지
}

export type LocaleKey = "en" | "ko" | "ja";

/**
 * 해시 타입별 고유 콘텐츠 (Thin Content 해결용)
 * - Cosine Similarity < 60% 달성 목표
 * - 각 해시 타입별 기술적 스펙, 역사, 취약점, 코드 예제 등 제공
 */
export interface UniqueHashContent {
  slug: string;

  // 기술 사양
  technicalSpecs: {
    outputLength: string; // 예: "256 bits (32 bytes)"
    blockSize: string; // 예: "512 bits"
    rounds: string; // 예: "64 rounds"
    structure: string; // 예: "Merkle-Damgård construction"
    wordSize: string; // 예: "32-bit words"
  };

  // 보안 등급 및 상태
  security: {
    level: "broken" | "weak" | "deprecated" | "secure" | "recommended";
    collisionResistance: string; // 예: "2^128 operations (birthday attack)"
    preimageResistance: string; // 예: "2^256 operations"
    secondPreimageResistance: string;
    quantumResistance: string; // 양자 컴퓨터 저항성
  };

  // 역사적 정보
  history: {
    createdYear: number;
    creator: string;
    organization?: string;
    standardization?: string; // 예: "FIPS 180-4"
    timeline: Array<{
      year: number;
      event: {
        en: string;
        ko: string;
        ja: string;
      };
    }>;
  };

  // 알려진 취약점
  vulnerabilities: Array<{
    name: string;
    year: number;
    description: {
      en: string;
      ko: string;
      ja: string;
    };
    severity: "critical" | "high" | "medium" | "low" | "informational";
    cve?: string;
  }>;

  // 실제 사용 사례 (상세)
  realWorldUseCases: Array<{
    industry: string;
    company?: string;
    useCase: {
      en: string;
      ko: string;
      ja: string;
    };
    whyThisHash: {
      en: string;
      ko: string;
      ja: string;
    };
  }>;

  // 코드 예제
  codeExamples: Array<{
    language: string;
    title: {
      en: string;
      ko: string;
      ja: string;
    };
    code: string;
    explanation: {
      en: string;
      ko: string;
      ja: string;
    };
  }>;

  // 다른 해시와의 비교
  comparison: {
    vsOthers: Array<{
      hash: string;
      comparison: {
        en: string;
        ko: string;
        ja: string;
      };
    }>;
    whenToUse: {
      en: string[];
      ko: string[];
      ja: string[];
    };
    whenNotToUse: {
      en: string[];
      ko: string[];
      ja: string[];
    };
  };

  // 성능 벤치마크
  performance: {
    speedMBps: string; // 예: "~400 MB/s on modern CPU"
    cpuCycles: string; // 예: "~6 cycles/byte"
    memoryUsage: string;
    parallelizable: boolean;
    hardwareAcceleration: string[]; // 예: ["Intel SHA Extensions", "ARM Cryptography"]
  };

  // RFC/표준 참조
  references: Array<{
    type: "RFC" | "FIPS" | "NIST" | "Paper" | "Website";
    identifier: string;
    title: string;
    url?: string;
  }>;
}
