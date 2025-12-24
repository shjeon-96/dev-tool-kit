# Community Bots Setup Guide

Web Toolkit의 Discord 및 Slack 봇 설정 가이드입니다.

## Discord Bot

### 기능

| 명령어       | 설명                      | 예시                      |
| ------------ | ------------------------- | ------------------------- |
| `/json`      | JSON 포맷팅/최소화        | `/json {"key":"value"}`   |
| `/hash`      | 해시 생성 (SHA-1/256/512) | `/hash hello world`       |
| `/base64`    | Base64 인코딩/디코딩      | `/base64 encode Hello`    |
| `/uuid`      | UUID 생성 (1-10개)        | `/uuid 5`                 |
| `/timestamp` | Unix 타임스탬프 변환      | `/timestamp now`          |
| `/url`       | URL 인코딩/디코딩         | `/url encode hello world` |
| `/help`      | 도움말 표시               | `/help`                   |

### 설정 방법

#### 1. Discord 애플리케이션 생성

1. [Discord Developer Portal](https://discord.com/developers/applications)로 이동
2. "New Application" 클릭
3. 이름 입력 (예: "Web Toolkit")
4. 생성된 애플리케이션에서 다음 정보 복사:
   - **Application ID** → `DISCORD_APPLICATION_ID`
   - **Public Key** → `DISCORD_PUBLIC_KEY`

#### 2. Bot 추가

1. 좌측 "Bot" 탭 클릭
2. "Add Bot" 클릭
3. "Reset Token" 클릭하여 토큰 복사 → `DISCORD_BOT_TOKEN`
4. "PUBLIC BOT" 활성화 (선택사항)

#### 3. Interactions Endpoint 설정

1. 좌측 "General Information" 탭
2. "INTERACTIONS ENDPOINT URL" 입력:
   ```
   https://web-toolkit.app/api/discord/interactions
   ```
3. Discord가 엔드포인트를 검증합니다

#### 4. 슬래시 명령어 등록

```bash
# 환경변수 설정
export DISCORD_APPLICATION_ID="your-app-id"
export DISCORD_BOT_TOKEN="your-bot-token"

# 글로벌 등록 (최대 1시간 소요)
npx tsx scripts/register-discord-commands.ts

# 특정 서버에만 등록 (즉시 반영, 테스트용)
export DISCORD_GUILD_ID="your-server-id"
npx tsx scripts/register-discord-commands.ts
```

#### 5. 봇 초대

1. "OAuth2" → "URL Generator" 탭
2. Scopes: `bot`, `applications.commands` 선택
3. Bot Permissions: 필요 없음 (슬래시 명령어만 사용)
4. 생성된 URL로 서버에 봇 초대

### 환경변수

```env
DISCORD_APPLICATION_ID=애플리케이션ID
DISCORD_PUBLIC_KEY=공개키
DISCORD_BOT_TOKEN=봇토큰
DISCORD_GUILD_ID=서버ID (선택, 테스트용)
```

---

## Slack Bot

### 기능

| 명령어          | 설명                 | 예시                           |
| --------------- | -------------------- | ------------------------------ |
| `/wt-json`      | JSON 포맷팅/최소화   | `/wt-json {"key":"value"}`     |
| `/wt-hash`      | 해시 생성            | `/wt-hash sha256 hello`        |
| `/wt-base64`    | Base64 인코딩/디코딩 | `/wt-base64 Hello`             |
| `/wt-uuid`      | UUID 생성            | `/wt-uuid 3`                   |
| `/wt-timestamp` | 타임스탬프 변환      | `/wt-timestamp now`            |
| `/wt-url`       | URL 인코딩/디코딩    | `/wt-url decode hello%20world` |
| `/wt-help`      | 도움말 표시          | `/wt-help`                     |

### 설정 방법

#### 1. Slack 앱 생성

1. [Slack API](https://api.slack.com/apps)로 이동
2. "Create New App" → "From scratch" 선택
3. 앱 이름과 워크스페이스 선택

#### 2. Slash Commands 추가

1. 좌측 "Slash Commands" 클릭
2. "Create New Command" 클릭
3. 각 명령어 추가:

| Command         | Request URL                                  | Description             |
| --------------- | -------------------------------------------- | ----------------------- |
| `/wt-json`      | `https://web-toolkit.app/api/slack/commands` | Format or minify JSON   |
| `/wt-hash`      | `https://web-toolkit.app/api/slack/commands` | Generate hash from text |
| `/wt-base64`    | `https://web-toolkit.app/api/slack/commands` | Encode or decode Base64 |
| `/wt-uuid`      | `https://web-toolkit.app/api/slack/commands` | Generate UUIDs          |
| `/wt-timestamp` | `https://web-toolkit.app/api/slack/commands` | Convert Unix timestamp  |
| `/wt-url`       | `https://web-toolkit.app/api/slack/commands` | Encode or decode URL    |
| `/wt-help`      | `https://web-toolkit.app/api/slack/commands` | Show all commands       |

#### 3. Signing Secret 복사

1. "Basic Information" → "App Credentials"
2. "Signing Secret" 복사 → `SLACK_SIGNING_SECRET`

#### 4. 앱 설치

1. "Install App" 탭
2. "Install to Workspace" 클릭
3. 권한 허용

### 환경변수

```env
SLACK_SIGNING_SECRET=서명비밀키
SLACK_BOT_TOKEN=봇토큰 (선택, 고급 기능용)
```

---

## 아키텍처

```
┌─────────────────────────────────────────────────────────┐
│                    Web Toolkit                          │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  Discord Bot                    Slack Bot               │
│  ┌─────────────────────┐       ┌─────────────────────┐  │
│  │ /api/discord/       │       │ /api/slack/         │  │
│  │   interactions      │       │   commands          │  │
│  └────────┬────────────┘       └────────┬────────────┘  │
│           │                              │              │
│           ▼                              ▼              │
│  ┌─────────────────────┐       ┌─────────────────────┐  │
│  │ lib/discord-bot/    │       │ lib/slack-bot/      │  │
│  │ - types.ts          │       │ - types.ts          │  │
│  │ - commands.ts       │       │ - commands.ts       │  │
│  │ - verify.ts         │       │ - verify.ts         │  │
│  └─────────────────────┘       └─────────────────────┘  │
│                                                         │
└─────────────────────────────────────────────────────────┘

서명 검증:
- Discord: Ed25519 (Web Crypto API)
- Slack: HMAC-SHA256

실행 환경:
- Edge Runtime (서버리스)
- 전 세계 엣지 노드에서 실행
```

---

## 보안

### Discord

- Ed25519 서명 검증
- Discord Public Key로 모든 요청 검증
- 잘못된 서명은 401 응답

### Slack

- HMAC-SHA256 서명 검증
- 타임스탬프 검증 (5분 이내)
- Timing-safe 비교로 타이밍 공격 방지

---

## 트러블슈팅

### Discord

**Q: 명령어가 표시되지 않아요**

- 글로벌 명령어는 최대 1시간까지 반영됩니다
- 테스트용으로 `DISCORD_GUILD_ID` 설정 후 재등록

**Q: "Invalid signature" 오류**

- `DISCORD_PUBLIC_KEY` 확인
- Developer Portal의 Public Key와 일치하는지 확인

### Slack

**Q: 명령어가 작동하지 않아요**

- Request URL이 정확한지 확인
- `SLACK_SIGNING_SECRET` 확인

**Q: "dispatch_failed" 오류**

- 서버가 3초 내에 응답하는지 확인
- Edge Runtime 사용으로 빠른 응답 보장

---

## 로드맵

- [ ] Discord 버튼 인터랙션 지원
- [ ] Slack 모달 UI 지원
- [ ] 더 많은 도구 명령어 추가
- [ ] Teams Bot 지원
