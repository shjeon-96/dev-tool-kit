import { SITE_EMAIL } from "@/shared/config/site";
import type { AppDocument } from "./app-documents";

// 원본: https://sola-scheduler-6476537626.web.app/privacy.html, /terms.html
// (2026-09-26 수집). sol-calendar 저장소에는 원본 파일이 없어 배포된 HTML을 옮겼다.
// 원본에 최종 수정일이 없어 updatedAt은 시행일과 같게 둔다. 원본에 도입 문단이 없어
// lead·description은 첫 절의 첫 문장을 쓴다.
const EFFECTIVE = "2026-09-16";

export const SOL_SCHEDULER_DOCUMENTS: {
  ko: { privacy: AppDocument; terms: AppDocument };
} = {
  ko: {
    privacy: {
      title: "솔라 개인정보 처리방침",
      description:
        "솔라(기존 Scheduler)는 선택한 로그인 제공자의 계정 식별자, 이메일과 기본 프로필, 직접 입력한 일정·할 일·설정을 계정 연결과 동기화에 사용해요.",
      lead: "솔라(기존 Scheduler)는 선택한 로그인 제공자의 계정 식별자, 이메일과 기본 프로필, 직접 입력한 일정·할 일·설정을 계정 연결과 동기화에 사용해요.",
      effectiveAt: EFFECTIVE,
      updatedAt: EFFECTIVE,
      sections: [
        {
          title: "처리하는 정보와 목적",
          body: [
            "솔라(기존 Scheduler)는 선택한 로그인 제공자의 계정 식별자, 이메일과 기본 프로필, 직접 입력한 일정·할 일·설정을 계정 연결과 동기화에 사용해요. 게스트 이용 시 Firebase가 익명 계정 식별자를 만들어요. Google Calendar, Gmail이나 연락처에는 접근하지 않아요.",
          ],
        },
        {
          title: "저장과 처리 제공자",
          body: [
            "기존 이용자의 기록을 유지하기 위해 이 앱은 Google Firebase Authentication과 Cloud Firestore를 사용해요. 계정·기록은 Google이 제공하는 서버에서 처리될 수 있어요. 날짜·요일 스티커와 일부 화면 설정은 현재 기기에 저장하며, 홈 화면 위젯은 앱이 제공한 일정·할 일·스티커 사본을 기기에 저장해요. 이 앱의 Firebase 계정은 다른 PixelLogic 앱의 Supabase 계정과 분리되어 있어요.",
          ],
        },
        {
          title: "광고와 기기 정보",
          body: [
            "배너 및 보상형 광고에 Google AdMob을 사용해요. AdMob은 광고 제공, 측정, 부정 이용 방지를 위해 광고 식별자, IP 주소, 기기·앱 정보, 광고 상호작용과 진단 정보를 처리할 수 있어요. iOS의 앱 추적 권한은 시스템에서 선택할 수 있으며, 거부해도 달력과 할 일을 이용할 수 있어요. Google 개인정보처리방침: https://policies.google.com/privacy",
          ],
        },
        {
          title: "보관과 계정 삭제",
          body: [
            "설정의 계정 삭제에서 본인 확인 후 이 앱의 일정·할 일·서버 설정·기기 스티커·위젯 기록과 Firebase 로그인 계정을 삭제할 수 있어요. 다른 PixelLogic 앱의 계정과 기록에는 영향을 주지 않아요. 삭제 도중 연결이 끊기면 앱에서 다시 삭제를 진행해 주세요. 삭제를 시작한 계정의 이전 세션이 기록을 다시 만들지 못하도록 삭제 시각과 불투명한 계정 식별자로 구성된 보안 차단 기록을 보관해요. 백업과 서비스 제공자의 보안 기록은 해당 제공자의 보관 정책과 법적 의무에 따라 처리돼요.",
          ],
        },
        {
          title: "이용자의 권리와 문의",
          body: [
            `앱에서 기록을 조회·수정·삭제할 수 있어요. 로그인할 수 없거나 개인정보 처리에 문의가 있으면 ${SITE_EMAIL}으로 연락해 주세요. 계정 소유 확인 후 요청을 처리해요. 비밀번호나 인증 코드를 보내지 마세요.`,
          ],
        },
        {
          title: "방침 변경",
          body: [
            "처리 목적이나 제공자가 달라지면 이 페이지와 앱 안내를 갱신해요. 중요한 변경은 시행 전에 알려 드려요.",
          ],
        },
      ],
    },
    terms: {
      title: "솔라 이용약관",
      description:
        "솔라는 개인 일정과 할 일을 저장하고 기기 위젯·스티커·테마를 제공하는 앱이에요.",
      lead: "솔라는 개인 일정과 할 일을 저장하고 기기 위젯·스티커·테마를 제공하는 앱이에요.",
      effectiveAt: EFFECTIVE,
      updatedAt: EFFECTIVE,
      sections: [
        {
          title: "서비스",
          body: [
            "솔라는 개인 일정과 할 일을 저장하고 기기 위젯·스티커·테마를 제공하는 앱이에요. 네트워크나 기기 설정에 따라 동기화와 알림이 지연될 수 있으므로 중요한 약속은 별도로 확인해 주세요.",
          ],
        },
        {
          title: "계정과 기록",
          body: [
            "본인의 계정만 사용하고 다른 사람의 기록에 접근하거나 서비스를 방해하지 마세요. 직접 작성한 기록의 권리는 작성자에게 있어요. 게스트 계정과 기기에 저장된 스티커는 기기 초기화나 로그인 상태 손실 시 복구하지 못할 수 있어요.",
          ],
        },
        {
          title: "광고와 이용 종료",
          body: [
            "앱에는 배너 광고와 사용자가 선택한 보상형 광고가 표시될 수 있어요. 앱 내 계정 삭제로 이용을 종료할 수 있으며, 삭제한 기록은 복구할 수 없어요. 개인정보 처리와 삭제 범위는 개인정보 처리방침에서 확인할 수 있어요.",
          ],
        },
        {
          title: "문의",
          body: [
            `서비스 이용과 지원 요청은 ${SITE_EMAIL}으로 보내 주세요. 이 약관은 관련 법령에 따른 이용자의 권리를 제한하지 않아요.`,
          ],
        },
      ],
    },
  },
};
