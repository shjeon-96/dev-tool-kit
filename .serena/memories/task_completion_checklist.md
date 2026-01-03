# Task Completion Checklist

## 코드 작성 완료 후

### 1. 타입 검사

```bash
npm run build           # 빌드 시 타입 에러 확인
```

### 2. 린트 검사

```bash
npm run lint            # ESLint 검사
```

### 3. 테스트 실행

```bash
npm run test --run      # 단위 테스트
npm run test:e2e        # E2E 테스트 (필요시)
```

### 4. 도구 추가 시 추가 검사

```bash
npm run validate:tools  # 레지스트리 일관성 검사
```

## 새 도구 추가 체크리스트

1. [ ] `src/shared/types/tool.ts` - ToolSlug 타입 추가
2. [ ] `src/entities/tool/model/registry.ts` - 도구 메타데이터 등록
3. [ ] `src/features/[slug]/` - Feature 구현
   - `model/use-*.ts` - Hook
   - `lib/*.ts` - 순수 함수
   - `lib/*.test.ts` - 단위 테스트
   - `ui/*.tsx` - UI 컴포넌트
   - `index.ts` - 배럴 export
4. [ ] `src/entities/tool/model/component-map.ts` - Dynamic Import 등록
5. [ ] `messages/*.json` (6개 언어) - 번역 추가
6. [ ] `src/entities/tool/model/seo-content.ts` - SEO 콘텐츠 추가
7. [ ] `npm run validate:tools` - 유효성 검사 통과

## 커밋 전 체크리스트

1. [ ] 모든 테스트 통과
2. [ ] 린트 에러 없음
3. [ ] 빌드 성공
4. [ ] 불필요한 console.log 제거
5. [ ] 커밋 메시지 컨벤션 준수

## 커밋 메시지 컨벤션

```
<type>: <subject>

feat: 새로운 기능
fix: 버그 수정
refactor: 리팩토링
test: 테스트 추가/수정
docs: 문서 수정
chore: 빌드, 설정 변경
```
