# SEO Strategy

## 🎯 SEO 목표

### 주요 목표
1. **오가닉 트래픽 극대화**: 검색 엔진에서 자연스러운 유입
2. **타겟 키워드 상위 노출**: 도구별 핵심 키워드 1페이지 진입
3. **도메인 권위 구축**: 고품질 백링크 및 신뢰도 확보
4. **국제화 대응**: 다국어 SEO 최적화

### 성과 지표 (KPI)
- 월간 오가닉 방문자: 100,000+
- 평균 검색 순위: Top 5
- 오가닉 트래픽 비율: 70%+
- 페이지 체류 시간: 5분+

---

## 🔍 기술적 SEO (Technical SEO)

### 1. 사이트 구조

#### URL 구조
```
https://devtoolkit.com/
├── /                          # 홈페이지
├── /tools/                    # 도구 목록
├── /tools/json-formatter      # 개별 도구 (정적 URL)
├── /tools/jwt-decoder
├── /tools/base64-converter
└── /sitemap.xml              # 동적 사이트맵
```

#### Sitemap 생성
```typescript
// app/sitemap.ts
import { tools } from '@/entities/tool';
import { SITE_CONFIG } from '@/shared/config';

export default function sitemap() {
  const baseUrl = SITE_CONFIG.url;
  
  const toolPages = Object.keys(tools).map((slug) => ({
    url: `${baseUrl}/tools/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/tools`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    ...toolPages,
  ];
}
```

#### Robots.txt
```typescript
// app/robots.ts
export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/api/',
    },
    sitemap: 'https://devtoolkit.com/sitemap.xml',
  };
}
```

### 2. 페이지 속도 최적화

#### Core Web Vitals 목표
- **LCP (Largest Contentful Paint)**: < 2.5초
- **FID (First Input Delay)**: < 100ms
- **CLS (Cumulative Layout Shift)**: < 0.1

#### 최적화 전략
```typescript
// next.config.ts
export default {
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
  },
  compress: true,
  poweredByHeader: false,
  
  // 정적 최적화
  output: 'standalone',
  
  // 번들 분석
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.optimization.splitChunks = {
        chunks: 'all',
        cacheGroups: {
          default: false,
          vendors: false,
          vendor: {
            name: 'vendor',
            chunks: 'all',
            test: /node_modules/,
          },
          common: {
            minChunks: 2,
            priority: 10,
            reuseExistingChunk: true,
            enforce: true,
          },
        },
      };
    }
    return config;
  },
};
```

### 3. 구조화된 데이터 (JSON-LD)

#### 홈페이지 Schema
```typescript
// app/layout.tsx
const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'DevToolkit',
  description: '개발자를 위한 온라인 도구 모음',
  url: 'https://devtoolkit.com',
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: 'https://devtoolkit.com/search?q={search_term_string}',
    },
    'query-input': 'required name=search_term_string',
  },
};
```

#### 도구별 Schema
```typescript
// app/tools/[slug]/page.tsx
const toolSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: tool.title,
  description: tool.description,
  url: `https://devtoolkit.com/tools/${slug}`,
  applicationCategory: 'DeveloperApplication',
  operatingSystem: 'Web Browser',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
  },
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.8',
    ratingCount: '1234',
  },
};
```

---

## 📝 콘텐츠 SEO

### 1. 키워드 연구 및 전략

#### 고가치 키워드 (월 검색량 10K+)
| 키워드 | 검색량 | 난이도 | 타겟 페이지 |
|--------|--------|---------|-------------|
| json formatter | 50K | Medium | /tools/json-formatter |
| base64 decode | 40K | Low | /tools/base64-converter |
| jwt decoder | 30K | Low | /tools/jwt-decoder |
| image resizer online | 25K | High | /tools/image-resizer |
| qr code generator | 60K | High | /tools/qr-generator |

#### 롱테일 키워드 전략
```
"json formatter online free"
"resize image without losing quality online"
"jwt token decoder with expiry time"
"base64 to image converter online"
```

### 2. 메타 태그 최적화

#### 동적 메타 태그 생성
```typescript
// app/tools/[slug]/page.tsx
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const tool = tools[slug as ToolSlug];

  return {
    title: `${tool.title} - Free Online Tool | DevToolkit`,
    description: `${tool.description} No installation required. 100% free and secure. Works in your browser.`,
    keywords: tool.keywords.join(', '),
    
    openGraph: {
      title: `${tool.title} - DevToolkit`,
      description: tool.description,
      url: `https://devtoolkit.com/tools/${slug}`,
      siteName: 'DevToolkit',
      images: [
        {
          url: `/og/${slug}.png`,
          width: 1200,
          height: 630,
          alt: tool.title,
        },
      ],
      locale: 'ko_KR',
      type: 'website',
    },
    
    twitter: {
      card: 'summary_large_image',
      title: `${tool.title} - DevToolkit`,
      description: tool.description,
      images: [`/og/${slug}.png`],
      creator: '@devtoolkit',
    },
    
    alternates: {
      canonical: `https://devtoolkit.com/tools/${slug}`,
      languages: {
        'en-US': `https://devtoolkit.com/en/tools/${slug}`,
        'ko-KR': `https://devtoolkit.com/ko/tools/${slug}`,
      },
    },
  };
}
```

### 3. 콘텐츠 구조

#### H태그 계층 구조
```html
<h1>JSON Formatter - 온라인 JSON 포맷터</h1>
  <h2>주요 기능</h2>
    <h3>JSON 검증</h3>
    <h3>포맷팅 옵션</h3>
  <h2>사용 방법</h2>
    <h3>1단계: JSON 입력</h3>
    <h3>2단계: 옵션 선택</h3>
  <h2>자주 묻는 질문</h2>
```

#### 콘텐츠 길이 가이드라인
- 도구 설명: 150-300 단어
- 사용 가이드: 300-500 단어
- FAQ: 5-10개 항목
- 관련 도구 추천: 3-5개

---

## 🌐 국제화 SEO (i18n)

### 1. 다국어 지원 전략

#### URL 구조
```
/ko/tools/json-formatter  # 한국어
/en/tools/json-formatter  # 영어
/ja/tools/json-formatter  # 일본어
```

#### hreflang 태그
```typescript
// 언어별 대체 페이지 명시
<link rel="alternate" hreflang="en" href="https://devtoolkit.com/en/tools/json-formatter" />
<link rel="alternate" hreflang="ko" href="https://devtoolkit.com/ko/tools/json-formatter" />
<link rel="alternate" hreflang="x-default" href="https://devtoolkit.com/tools/json-formatter" />
```

### 2. 지역별 최적화

#### 한국 시장
- 네이버 웹마스터도구 등록
- 다음 검색 등록
- 한국어 키워드 최적화

#### 글로벌 시장
- Google Search Console
- Bing Webmaster Tools
- 영어 콘텐츠 우선순위

---

## 📊 성능 모니터링

### 1. 추적 도구 설정

#### Google Analytics 4
```typescript
// app/layout.tsx
import { GoogleAnalytics } from '@next/third-parties/google';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <GoogleAnalytics gaId="G-XXXXXXXXXX" />
      </body>
    </html>
  );
}
```

#### Search Console 통합
- 사이트 소유권 확인
- 사이트맵 제출
- 인덱싱 요청

### 2. 핵심 지표 추적

#### 페이지별 추적
```typescript
// 도구 사용 이벤트
gtag('event', 'tool_use', {
  tool_name: 'json_formatter',
  action: 'format',
  value: 1,
});

// 전환 추적
gtag('event', 'conversion', {
  tool_name: 'json_formatter',
  action: 'download_result',
});
```

---

## 🔗 링크 빌딩 전략

### 1. 내부 링크 최적화
```typescript
// 관련 도구 추천
const relatedTools = {
  'json-formatter': ['jwt-decoder', 'base64-converter'],
  'image-resizer': ['app-icon-generator', 'qr-generator'],
};
```

### 2. 외부 링크 획득
- 개발자 커뮤니티 참여
- 기술 블로그 게스트 포스팅
- GitHub 프로젝트 연동
- Stack Overflow 답변

### 3. 백링크 품질 관리
- 도메인 권위도 30+ 사이트 우선
- 관련성 높은 사이트 집중
- 스팸 링크 정기 검토

---

## 📈 콘텐츠 마케팅

### 1. 블로그 콘텐츠 전략

#### 주제 예시
- "2024년 최고의 온라인 개발 도구 10선"
- "JWT 토큰 완벽 가이드"
- "이미지 최적화로 웹 성능 개선하기"

#### 발행 주기
- 주 1-2회 발행
- 도구 업데이트 공지
- 사용 팁 & 트릭

### 2. 소셜 미디어
- Twitter: 개발 팁 공유
- LinkedIn: 기술 아티클
- Reddit: 커뮤니티 참여

---

## 🚀 실행 로드맵

### Phase 1 (1-2개월)
- [ ] 기술적 SEO 기반 구축
- [ ] 핵심 도구 4개 최적화
- [ ] Google Search Console 설정
- [ ] 초기 콘텐츠 작성

### Phase 2 (3-4개월)
- [ ] 모든 도구 SEO 최적화
- [ ] 블로그 섹션 추가
- [ ] 백링크 캠페인 시작
- [ ] 다국어 지원 시작

### Phase 3 (5-6개월)
- [ ] 고급 Schema 마크업
- [ ] 비디오 콘텐츠 제작
- [ ] 국제 시장 확장
- [ ] SEO A/B 테스팅

---

## 📊 성공 측정

### 월간 리포트 항목
1. 오가닉 트래픽 증가율
2. 키워드 순위 변동
3. 페이지 속도 점수
4. 백링크 프로필
5. 전환율 분석

### 분기별 검토
1. SEO 전략 효과성
2. 경쟁사 분석
3. 알고리즘 변경 대응
4. 새로운 기회 발굴