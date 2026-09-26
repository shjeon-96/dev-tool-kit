import { SITE_EMAIL } from "@/shared/config/site";
import type { AppDocument, AppDocumentKind } from "./app-documents";

// 원본: talk-talk 저장소 web/src/content.mjs (2026-09-23). 스토어 URL을 이 사이트로
// 옮긴 뒤에는 이 파일이 원본이고, talk-talk 웹은 이 주소로 리다이렉트한다.
const UPDATED = "2026-09-23";

export const TALK_TALK_DOCUMENTS: {
  ko: Record<AppDocumentKind, AppDocument>;
} = {
  ko: {
    privacy: {
      title: "토크토크 개인정보 처리방침",
      description:
        "토크토크가 처리하는 계정, 음성, 안전 메타데이터와 외부 처리자, 보존·삭제 기준을 설명합니다.",
      lead: "PixelLogic은 토크토크 운영에 필요한 정보만 처리해요. 음성·전사를 장기 기억, 광고, 제3자 분석에 사용하지 않아요. 만 14세 미만의 직접 사용은 지원하지 않아요.",
      effectiveAt: UPDATED,
      updatedAt: UPDATED,
      sections: [
        {
          title: "적용 범위와 운영자",
          body: [
            "이 방침은 PixelLogic이 제공하는 토크토크 iOS 앱과 공식 지원 웹페이지에 적용돼요.",
            `개인정보 문의와 권리 행사는 ${SITE_EMAIL}으로 요청할 수 있어요.`,
          ],
        },
        {
          title: "처리하는 정보",
          items: [
            "계정: Supabase 사용자 ID, 로그인 제공자가 전달한 이름·이메일, 연결된 Apple·Google·Kakao 제공자 식별자, 로그인 세션",
            "동의·설정: 만 14세 이상 확인 시각, 동의 문서·제공자 설정 버전, 통화 권한 확인용 내부 프로필 ID. 실제 생년월일이나 학년은 받지 않음",
            "에피소드 진행: 완료한 이야기 ID만 현재 계정의 기기에 보관하고, 토크토크 데이터 삭제 때 기기에서도 삭제",
            "통화 처리: 현재 turn의 음성, 전사, AI 입력·출력. 앱·relay·토크토크 DB·파일·content log에는 저장하지 않음",
            "안전·운영 메타데이터: 비식별 category·action·policy version·시각, 통화 duration·turn count·scene ID, content 없는 성능·오류 정보",
            "보안 정보: App Attest key ID·public key·counter, 일회용 challenge·proof hash, authorization epoch. PIN 원문은 저장하지 않음",
            "구매 정보: 사용자 UUID, 상품 ID, entitlement·갱신·만료·환불 상태. 결제 카드 정보는 Apple이 처리하며 토크토크가 받지 않음",
            "구매 흐름 event: event 이름, HMAC으로 만든 비식별 계정 key, 상품·offering ID, 가격·통화, 결과 enum, 서버 시각. 대화 원문·음성·전사 없음",
            "지원 문의: 사용자가 이메일로 직접 보낸 연락처와 문의 내용",
          ],
        },
        {
          title: "이용 목적",
          items: [
            "로그인·동의·통화 권한 확인",
            "음성 인식, 안전한 AI 답변 생성, 음성 재생",
            "결제 상태·구매 복원·이용 권한 동기화",
            "안전 신고 처리, 부정 사용 방지, 장애 복구",
            "토크토크 데이터·계정 삭제와 법적 요청 대응",
          ],
        },
        {
          title: "외부 처리자와 국외 처리",
          body: [
            "통화 기능을 위해 아래 사업자가 정보를 처리할 수 있어요. 만 14세 미만의 직접 음성 사용 경로는 열지 않아요.",
          ],
          items: [
            "Supabase: 사용자 인증, 서울 리전 데이터베이스, Edge Function · 처리 지역: 한국 및 Supabase·하위 처리자가 운영하는 지역 · 항목: 계정·동의·보안·구독 상태",
            "Google Cloud: Speech-to-Text와 Text-to-Speech · 처리 지역: 미국 multi-region endpoint · 항목: 대화 중 음성·전사 요청, 승인된 TTS 문장",
            "OpenRouter: 승인된 DeepSeek 모델로 AI 답변을 전달하는 라우팅 · 처리 지역: 미국 및 OpenRouter·하위 처리자가 운영하는 지역 · 항목: 안전 검사·PII 제거 뒤 필요한 대화 문맥",
            "DeepSeek (OpenRouter 경유): 승인된 DeepSeek V4 Flash 모델의 AI 답변 생성 · 처리 지역: DeepSeek 정책에 따른 처리 지역 · 항목: OpenRouter가 전달하는 안전 검사·PII 제거 뒤 대화 문맥",
            "RevenueCat: App Store 구독 영수증 검증·entitlement 동기화 · 처리 지역: 미국 및 하위 처리자 운영 지역 · 항목: 사용자 UUID, 상품·거래·구독 상태",
            "Apple: Sign in with Apple, App Attest, App Store 결제 · 처리 지역: Apple 정책에 따른 지역 · 항목: 로그인·앱 무결성·구매 정보",
          ],
          links: [
            {
              label: "Supabase DPA 확인",
              href: "https://supabase.com/legal/dpa",
            },
            {
              label: "Google STT 데이터 사용 확인",
              href: "https://docs.cloud.google.com/speech-to-text/docs/v1/data-usage-faq",
            },
            {
              label: "OpenRouter 개인정보 처리 확인",
              href: "https://openrouter.ai/privacy",
            },
            {
              label: "DeepSeek 개인정보 처리방침 확인",
              href: "https://cdn.deepseek.com/policies/en-US/deepseek-privacy-policy.html",
            },
            {
              label: "RevenueCat DPA 확인",
              href: "https://www.revenuecat.com/dpa",
            },
            {
              label: "Apple 개인정보 보호 확인",
              href: "https://www.apple.com/legal/privacy/",
            },
          ],
        },
        {
          title: "보존과 삭제",
          items: [
            "raw audio: 현재 turn의 streaming memory만 사용하고 중단·완료·세션 종료 중 가장 빠른 시점에 폐기",
            "transcript: 현재 turn memory만 사용하고 앱·relay·DB·파일·log·cache 저장 0",
            "일회성 통화 요약: 화면 종료 또는 생성 후 15분 중 빠른 시점",
            "통화 메타데이터·안전 event·신고 메타데이터: 최대 30일",
            "구매 흐름 event: 최대 30일, 대화 원문·음성·전사 없음",
            "application server·crash log: 최대 30일, 음성·전사·token 제외. 공급자가 법적으로 유지하는 infrastructure audit log는 별도 정책을 따르며 app content를 넣지 않음",
            "동의·보안 credential·구독 상태: 목적 달성, 철회, 토크토크 데이터·계정 삭제 또는 법령상 보존 기간 중 먼저 적용되는 기준",
            "계정 삭제 job의 비밀 revoke credential: provider 처리 성공·terminal 직후 삭제",
          ],
          body: [
            "Google STT는 data logging에 가입하지 않은 streaming 요청의 audio·transcript를 메모리에서 처리하고 저장하지 않는다고 설명하고, Google TTS는 customer text·audio를 기록하지 않는다고 설명해요. OpenRouter와 DeepSeek·Supabase·RevenueCat·Apple은 각 사업자의 정책과 법적 의무에 따라 별도 보존할 수 있어요.",
          ],
          links: [
            {
              label: "Google TTS 데이터 처리 확인",
              href: "https://docs.cloud.google.com/text-to-speech/docs/data-logging",
            },
          ],
        },
        {
          title: "사용자의 권리와 계정 삭제",
          body: [
            "앱 설정에서 동의를 철회하고 토크토크 데이터 또는 계정을 삭제할 수 있어요.",
            "토크토크 계정을 삭제하면 토크토크 멤버십과 데이터가 삭제돼요. 이용 중인 다른 앱이 있으면 그 앱의 로그인과 데이터는 유지돼요. 다른 앱이 없는 마지막 계정이면 소셜 로그인 연결 해제 절차와 함께 공유 로그인 계정도 삭제돼요. 다시 가입해도 삭제한 토크토크 데이터는 복원되지 않아요.",
            `열람·정정·삭제·처리 제한 요청은 ${SITE_EMAIL}으로 보낼 수 있어요. 본인 확인에 필요한 최소 정보만 요청해요.`,
          ],
        },
        {
          title: "아동 정보 보호",
          body: [
            "만 14세 미만의 직접 사용은 지원하지 않으며 정확한 생년월일을 요구하지 않아요.",
            "고위험 발화나 개인정보가 포함된 발화는 일반 대화로 전달하지 않고 안전 안내로 전환해요. 긴급·의료·법률 상담 서비스가 아니에요.",
          ],
        },
        {
          title: "웹페이지와 쿠키",
          body: [
            "이 공식 안내 웹페이지는 광고·분석 SDK·비필수 쿠키·입력 form을 사용하지 않아요. 앱도 제3자 분석 SDK를 사용하지 않고, 구매 흐름은 위에서 밝힌 최소 first-party event만 기록해요. 호스팅 사업자는 보안과 전송을 위해 IP 주소 같은 접속 메타데이터를 처리할 수 있어요.",
          ],
        },
        {
          title: "방침 변경",
          body: [
            "처리 목적·수집 항목·국외 처리자가 크게 바뀌면 적용 전에 앱 또는 이 페이지에서 알려 드려요. 상단의 적용일과 변경일을 함께 확인할 수 있어요.",
          ],
        },
      ],
    },
    terms: {
      title: "토크토크 이용약관",
      description:
        "토크토크의 만 14세 이상 이용, AI 대화 범위, 구독·해지·계정 삭제 조건을 설명합니다.",
      lead: "토크토크는 만 14세 이상 사용자를 위한 AI 영어 음성 대화예요. 이용하면 아래 조건과 Apple 표준 최종 사용자 사용권 계약에 동의하게 돼요.",
      effectiveAt: UPDATED,
      updatedAt: UPDATED,
      sections: [
        {
          title: "서비스와 이용자",
          body: [
            "토크토크는 만 14세 이상이 직접 사용하는 AI 영어 대화 서비스예요. 만 14세 미만의 직접 사용은 지원하지 않아요.",
            "AI는 실제 사람, 친구, 교사, 부모가 아니며 그와 같이 행동하거나 관계를 약속하지 않아요.",
          ],
        },
        {
          title: "사용자의 책임",
          items: [
            "통화 전에 음성 처리 범위와 AI 고지를 확인하고 동의해요.",
            "자신의 로그인 계정과 기기 접근을 관리해요.",
            "연락처, 주소, 학교, 비밀번호, 사진 같은 개인정보를 대화에 넣지 않도록 안내해요.",
            "다른 사람의 계정·App Store 접근을 무단으로 사용하지 않아요.",
          ],
        },
        {
          title: "AI 답변과 안전 범위",
          body: [
            "AI 답변은 부정확하거나 맥락을 잘못 이해할 수 있어요. 교육 성취, 정확한 번역, 전문 상담 결과를 보장하지 않아요.",
            "응급, 의료, 법률, 정신건강 위기 대응 서비스가 아니에요. 위험하거나 불확실한 상황에서는 앱을 끝내고 적절한 전문기관에 연락해 주세요.",
          ],
        },
        {
          title: "구독과 결제",
          items: [
            "TalkTalk Plus는 Apple App Store의 자동 갱신 구독이에요.",
            "결제 전 화면에 표시되는 현지 통화 총액, 기간, 자동 갱신 조건이 적용돼요.",
            "구독은 현재 기간이 끝나기 전에 Apple 계정 설정에서 취소할 수 있어요. 취소해도 이미 결제한 기간이 끝날 때까지 이용할 수 있어요.",
            "구매 복원은 앱 설정이나 Plus 화면에서 실행해요. 미성년자의 구매에는 Apple 가족 공유의 구입 요청이 적용될 수 있어요. 환불·결제 수단·청구는 Apple 정책과 결정에 따라 처리돼요.",
            "광고, 코인, 소모성 결제, 외부 웹 결제는 제공하지 않아요.",
          ],
          links: [
            {
              label: "Apple 표준 EULA 읽기",
              href: "https://www.apple.com/legal/internet-services/itunes/dev/stdeula/",
            },
            {
              label: "Apple 구독 관리 방법 보기",
              href: "https://support.apple.com/HT202039",
            },
          ],
        },
        {
          title: "금지 행위",
          items: [
            "서비스·보안·사용량 제한을 우회하거나 자동화된 공격을 시도하는 행위",
            "다른 사람의 개인정보, 불법 콘텐츠, 권리를 침해하는 자료를 입력하는 행위",
            "서비스나 AI 답변을 사람의 전문 판단·긴급 대응으로 오인하게 배포하는 행위",
            "앱, API, 음성 자산을 무단 복제·재판매·역공학하는 행위. 법이 명시적으로 허용하는 범위는 제외해요.",
          ],
        },
        {
          title: "중단과 변경",
          body: [
            "안전, 보안, 법적 요구, 공급자 장애, 유지보수를 위해 일부 기능을 제한하거나 중단할 수 있어요. 중요한 변경은 가능한 범위에서 미리 알려 드려요.",
            "안전 기능, 계정 삭제, 구매 복원은 유료 여부와 무관하게 같은 기준을 적용해요.",
          ],
        },
        {
          title: "계정 삭제와 종료",
          body: [
            "앱 안에서 토크토크 계정 삭제를 요청할 수 있어요. 토크토크 데이터만 삭제하며 이용 중인 다른 앱의 로그인과 데이터는 유지돼요. 다른 앱이 없으면 공유 로그인 계정도 함께 삭제돼요. 재가입해도 삭제한 데이터는 복원되지 않아요.",
            "약관을 중대하게 위반하거나 서비스 안전을 해치는 경우 접근을 제한할 수 있어요. 법적 보존 의무가 있는 정보는 해당 기간 뒤 삭제해요.",
          ],
        },
        {
          title: "책임 범위",
          body: [
            "관련 법이 허용하는 범위에서 토크토크는 서비스가 항상 중단 없이 작동하거나 AI 답변이 완전히 정확하다고 보장하지 않아요. 소비자에게 법으로 보장된 권리는 제한하지 않아요.",
          ],
        },
        {
          title: "문의와 약관 변경",
          body: [
            `약관 문의는 ${SITE_EMAIL}으로 보내 주세요. 중요한 변경은 적용일 전에 앱 또는 이 페이지에서 알려 드려요.`,
          ],
        },
      ],
    },
    support: {
      title: "토크토크 지원",
      description:
        "토크토크 로그인, 마이크, 구독 복원, 안전 신고, 토크토크 데이터·계정 삭제 도움말입니다.",
      lead: "계정·구독·안전 문제를 아래 순서로 확인해 주세요. 해결되지 않으면 문의 메일에 기기 모델과 앱 버전만 적어 보내 주세요. 음성·전사·사진은 첨부하지 마세요.",
      updatedAt: UPDATED,
      sections: [
        {
          title: "로그인할 수 없어요",
          items: [
            "처음 사용한 Apple·Google·Kakao 계정과 같은 계정인지 확인해요.",
            "네트워크를 확인한 뒤 앱을 완전히 종료하고 다시 열어요.",
            "계정이 여러 PixelLogic 앱에서 공유된다는 점을 확인해요.",
          ],
        },
        {
          title: "마이크나 통화가 시작되지 않아요",
          items: [
            "iPhone 설정에서 토크토크의 마이크 권한을 확인해요.",
            "Bluetooth 통화 기기를 잠시 해제하고 iPhone 스피커로 다시 시도해요.",
            "연결 실패 뒤 다른 제공자로 자동 전환하지 않아요. 잠시 뒤 같은 계정으로 다시 시작해요.",
          ],
        },
        {
          title: "구매를 복원하고 싶어요",
          items: [
            "구매에 사용한 Apple 계정으로 App Store에 로그인했는지 확인해요.",
            "앱 설정이나 Plus 화면에서 ‘구매 복원’을 선택해요.",
            "환불·청구·결제 수단 변경은 Apple 지원에서 확인해요.",
          ],
          links: [
            {
              label: "Apple 결제 지원 보기",
              href: "https://support.apple.com/billing",
            },
          ],
        },
        {
          title: "AI 답변이 걱정돼요",
          body: [
            "통화를 즉시 끝내고 안전 안내를 확인해 주세요. 신고 행동이 보이면 서버가 제공한 안전 분류만 전송할 수 있어요. 대화 원문·음성·전사는 신고에 첨부하지 않아요.",
            "긴급하거나 위험한 상황은 지역 응급기관이나 적절한 전문기관에 연락해 주세요.",
          ],
        },
        {
          title: "토크토크 데이터나 계정을 삭제하고 싶어요",
          body: [
            "앱 설정에서 토크토크 데이터 삭제와 계정 삭제를 각각 선택할 수 있어요.",
            "토크토크 계정 삭제는 토크토크 데이터만 삭제하며 이용 중인 다른 앱은 그대로 유지해요. 다른 앱이 없는 경우 로그인 계정도 함께 삭제돼요. 화면에 표시되는 삭제 범위를 확인하고 소셜 계정으로 다시 확인한 뒤 요청해요. 재가입해도 삭제한 데이터는 복원되지 않아요.",
          ],
        },
        {
          title: "직접 문의하기",
          body: [
            "메일 제목에 ‘토크토크 문의’를 적고, 기기 모델·iOS 버전·앱 버전·문제가 생긴 화면만 알려 주세요. 비밀번호, 복구 키, 이름, 음성, 전사, 사진은 보내지 마세요.",
          ],
          links: [
            {
              label: "PixelLogic에 이메일 보내기",
              href: `mailto:${SITE_EMAIL}?subject=${encodeURIComponent("토크토크 문의")}`,
            },
          ],
        },
      ],
    },
  },
};
