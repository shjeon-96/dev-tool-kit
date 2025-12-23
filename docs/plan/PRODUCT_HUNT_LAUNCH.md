# Product Hunt 런칭 가이드

> Web-Toolkit.app Product Hunt 런칭 준비 체크리스트 및 콘텐츠

**목표 런칭일**: TBD (준비 완료 후 화요일~목요일 중 선택)
**상태**: 준비 중

---

## 1. 제품 페이지 콘텐츠

### 1.1 기본 정보

```yaml
Name: Web Toolkit
Tagline: "30+ dev tools, 100% client-side, works offline"
Website: https://web-toolkit.app
```

### 1.2 One-liner (140자 이내)

**English:**

> The privacy-first developer toolkit. 30+ tools for JSON, images, encoding & more — all processed locally, never uploaded to servers.

**Korean (참고용):**

> 프라이버시 최우선 개발자 툴킷. JSON, 이미지, 인코딩 등 30+ 도구 — 모든 처리는 로컬에서, 서버 업로드 없음.

### 1.3 Description (260자 이내)

**Version A (Privacy Focus):**

> Tired of online tools sending your data to unknown servers? Web Toolkit processes everything in your browser. Format JSON, decode JWTs, resize images, generate UUIDs — all 100% client-side with PWA offline support. No signup, no tracking, just tools that work.

**Version B (All-in-One Focus):**

> Stop switching between 10 different websites. Web Toolkit combines 30+ developer tools in one fast, modern interface. JSON formatter, image resizer, hash generator, color picker, and more. Works offline, supports dark mode, and never collects your data.

### 1.4 Full Description

```markdown
## Why Web Toolkit?

Every developer uses online tools daily — formatting JSON, decoding Base64, generating UUIDs. But most tools are:

- ❌ Slow and cluttered with ads
- ❌ Sending your data to servers (privacy risk!)
- ❌ Requiring signups for basic features
- ❌ Not working offline

**Web Toolkit is different.**

## 🚀 Features

**30+ Essential Developer Tools:**

- 📝 Text & Code: JSON Formatter, Diff Checker, Markdown Editor
- 🖼️ Media: Image Resizer, PDF Toolkit, QR Generator
- 🔐 Security: Hash Generator, Password Generator, JWT Decoder
- 🔄 Converters: JSON↔YAML, Base64, URL Encoder
- 📊 SEO: Schema Generator, Meta Analyzer, Sitemap Generator

**Privacy by Design:**

- 100% client-side processing
- Your data NEVER leaves your browser
- No analytics tracking (except optional crash reports)

**Modern Developer Experience:**

- ⚡ Blazing fast (Next.js 15 + Turbopack)
- 🌙 Dark mode (system-aware)
- 📱 PWA with offline support
- 🌐 Multilingual (EN, KO, JA)

## 🎯 Perfect For

- Frontend/Backend developers
- DevOps engineers
- Security professionals
- Students learning to code
- Anyone who values privacy

## 🛠️ Tech Stack

Built with Next.js 15, TypeScript, Tailwind CSS, and WebAssembly for heavy processing. Open architecture designed for extensibility.

---

**Try it now — no signup required!**
https://web-toolkit.app
```

---

## 2. 비주얼 자료

### 2.1 스크린샷 (5장)

| 순서 | 내용                     | 파일명                     | 해상도   |
| ---- | ------------------------ | -------------------------- | -------- |
| 1    | Hero - 홈페이지 전체     | `ph-01-hero.png`           | 1270x760 |
| 2    | JSON Formatter 작동 화면 | `ph-02-json-formatter.png` | 1270x760 |
| 3    | Image Resizer 비교 화면  | `ph-03-image-resizer.png`  | 1270x760 |
| 4    | 다크모드 + 모바일 반응형 | `ph-04-dark-mobile.png`    | 1270x760 |
| 5    | SEO 도구 (SERP Preview)  | `ph-05-seo-tools.png`      | 1270x760 |

**스크린샷 가이드라인:**

- [ ] 브라우저 UI 제거 (도구 영역만)
- [ ] 실제 작동 중인 데이터 표시
- [ ] 고해상도 (Retina 대응 2x)
- [ ] 라이트/다크 모드 혼합

### 2.2 갤러리 이미지

```
assets/product-hunt/
├── ph-01-hero.png
├── ph-02-json-formatter.png
├── ph-03-image-resizer.png
├── ph-04-dark-mobile.png
├── ph-05-seo-tools.png
├── ph-logo-256.png
├── ph-thumbnail.png (240x240)
└── ph-gif-demo.gif (optional)
```

### 2.3 데모 영상 (선택)

**길이:** 30-60초
**내용:**

1. 홈페이지 진입 (3초)
2. JSON Formatter 데모 (10초)
3. Image Resizer 드래그앤드롭 (10초)
4. JWT Decoder 토큰 분석 (8초)
5. 오프라인 모드 시연 (5초)
6. 다크모드 토글 (3초)
7. CTA + URL (5초)

---

## 3. 런칭 전략

### 3.1 타이밍

**최적 런칭 시간:**

- 요일: **화요일 ~ 목요일** (경쟁 적음)
- 시간: **오전 12:01 PST** (Product Hunt 리셋 시간)
- 한국 시간: **오후 5:01 KST**

**피해야 할 날:**

- 월요일: 주말 적체된 제품 많음
- 금요일: 주말 진입 전 관심도 하락
- 공휴일: 낮은 활성 사용자

### 3.2 헌터(Hunter) 전략

**Option A: Self-Hunt**

- 장점: 즉시 런칭 가능, 제품 완벽 이해
- 단점: 팔로워 없으면 노출 제한

**Option B: Hunter 섭외**

- 타겟: 1K+ 팔로워, 개발자 도구 관심
- 접근법: Twitter DM, LinkedIn 메시지
- 메시지 템플릿:

```
Hi [Name]! 👋

I've been following your work on Product Hunt and really admire
your taste in developer tools.

I built Web-Toolkit.app — a privacy-first collection of 30+
developer tools that run entirely in the browser.

Would you be interested in hunting it? Happy to give you
early access and answer any questions!

[Your Name]
```

### 3.3 런칭 당일 플랜

```
시간표 (KST 기준)

17:00 - 제품 라이브 확인
17:05 - 첫 업보트 (자신 + 팀)
17:10 - 첫 댓글 작성 (Maker Comment)
17:30 - SNS 공유 (Twitter, LinkedIn)
18:00 - 커뮤니티 알림 (Slack, Discord)
19:00 - 1시간차 순위 확인
20:00 - 댓글 응답 정리
22:00 - 중간 순위 스크린샷
24:00 - 취침 전 최종 업데이트

익일
08:00 - 아침 댓글 응답
12:00 - 최종 순위 기록
```

---

## 4. Maker Comment 템플릿

### 4.1 런칭 첫 댓글

```markdown
Hey Product Hunt! 👋

I'm thrilled to finally share Web Toolkit with you all!

**The Problem:**
I got frustrated using online tools that were slow,
ad-heavy, and sending my data to unknown servers.
Every time I needed to format JSON or decode a JWT,
I had to trust some random website with potentially
sensitive data.

**The Solution:**
Web Toolkit runs 100% in your browser. Your data never
leaves your device. It even works offline thanks to PWA!

**What's included:**

- 30+ tools across Text, Media, Converters, Security, and SEO
- Dark mode that follows your system
- Multilingual support (EN, KO, JA)
- No signup required — just use it!

I'd love to hear:

1. Which tool is most useful for your workflow?
2. What tools should I add next?

Thanks for checking it out! 🙏
```

### 4.2 FAQ 응답 템플릿

**Q: Is it really free?**

> Yes, completely free! There's a Pro tier for power users
> who need bulk processing, but all core tools work without
> any limitations.

**Q: How does it work offline?**

> Web Toolkit is a Progressive Web App (PWA). Once you visit,
> it caches everything locally. You can even "install" it to
> your desktop/phone for quick access.

**Q: Is my data really private?**

> Absolutely. All processing happens via JavaScript in your
> browser. Check the Network tab in DevTools — you won't see
> any data leaving your machine.

**Q: What's the tech stack?**

> Next.js 15 with Turbopack, TypeScript, Tailwind CSS, and
> WebAssembly for heavy processing tasks like image
> manipulation.

---

## 5. 프로모션 채널

### 5.1 런칭 당일

| 채널                  | 액션                | 타이밍        |
| --------------------- | ------------------- | ------------- |
| Twitter/X             | 런칭 트윗 + 스레드  | 런칭 즉시     |
| LinkedIn              | 개인 스토리 포스트  | 런칭 30분 후  |
| Reddit r/SideProject  | 런칭 소식 공유      | 런칭 1시간 후 |
| Discord (개발자 서버) | 런칭 알림           | 런칭 즉시     |
| 디스콰이엇            | 메이커로그 업데이트 | 런칭 즉시     |

### 5.2 트윗 템플릿

```
🚀 Just launched on Product Hunt!

Web Toolkit — 30+ developer tools that run 100% in your browser.

✅ JSON Formatter, Image Resizer, JWT Decoder, and more
✅ Your data never leaves your device
✅ Works offline
✅ No signup required

Would love your support! 🙏

🔗 [Product Hunt Link]

#buildinpublic #devtools #producthunt
```

---

## 6. 체크리스트

### 6.1 런칭 2주 전

- [ ] Product Hunt 계정 활성화 (최소 30일 된 계정)
- [ ] 스크린샷 5장 준비
- [ ] 로고 (240x240 PNG) 준비
- [ ] Description 최종 확정
- [ ] 헌터 섭외 시도

### 6.2 런칭 1주 전

- [ ] Draft 제출
- [ ] 팀/친구에게 예고
- [ ] SNS 티저 포스트
- [ ] Maker Comment 작성
- [ ] FAQ 응답 준비

### 6.3 런칭 전날

- [ ] 모든 도구 최종 점검
- [ ] 모바일 반응형 확인
- [ ] 오류 로깅 확인
- [ ] 알람 설정 (런칭 시간)

### 6.4 런칭 당일

- [ ] 첫 댓글 작성
- [ ] SNS 공유
- [ ] 실시간 댓글 응답
- [ ] 순위 모니터링
- [ ] 스크린샷 기록

### 6.5 런칭 후

- [ ] 결과 정리 (순위, 업보트, 댓글)
- [ ] 피드백 기반 개선 계획
- [ ] 블로그 회고 작성
- [ ] 뱃지 추가 (필요시)

---

## 7. 성공 지표

| 지표          | 목표   | 최소   |
| ------------- | ------ | ------ |
| 최종 순위     | Top 5  | Top 20 |
| 업보트        | 300+   | 100+   |
| 댓글          | 50+    | 20+    |
| 웹사이트 방문 | 5,000+ | 1,000+ |
| 신규 사용자   | 500+   | 100+   |

---

## 8. 참고 자료

- [Product Hunt Launch Guide](https://www.producthunt.com/launch)
- [Best Practices for Product Hunt](https://blog.producthunt.com/)
- [Top Developer Tools on PH](https://www.producthunt.com/topics/developer-tools)

---

_마지막 업데이트: 2025-12-23_
