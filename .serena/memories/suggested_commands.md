# Suggested Commands for dev-tool-kit

## Development

```bash
nvm use 20              # Node.js 20+ 필수
npm install             # 의존성 설치
npm run dev             # 개발 서버 (Turbopack) - http://localhost:3000
npm run build           # 프로덕션 빌드
npm start               # 프로덕션 서버 실행
```

## Testing

```bash
npm run test            # Vitest 단위 테스트 (watch 모드)
npm run test [pattern]  # 특정 패턴 테스트 (예: formatter)
npm run test --run      # 단일 실행 (watch 없이, CI용)
npm run test:coverage   # 커버리지 리포트 생성
npm run test:ui         # Vitest UI 모드
npm run test:e2e        # Playwright E2E 테스트
npm run test:e2e:ui     # Playwright UI 모드 (디버깅용)
```

## Code Quality

```bash
npm run lint            # ESLint 검사
npm run validate:tools  # 도구 레지스트리 유효성 검사
```

## Analysis

```bash
npm run analyze         # 번들 분석 (ANALYZE=true)
```

## Remotion (Video Generation)

```bash
npm run remotion:studio # Remotion 스튜디오
npm run remotion:render # 비디오 렌더링
```

## Git / System (Darwin/macOS)

```bash
git status              # 변경사항 확인
git diff                # 변경 내용 확인
git add .               # 스테이징
git commit -m "msg"     # 커밋
git push                # 푸시
ls -la                  # 디렉토리 목록
find . -name "*.ts"     # 파일 찾기
grep -r "pattern" src/  # 패턴 검색
```
