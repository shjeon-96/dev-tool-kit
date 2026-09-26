import type { AppDocument } from "./app-documents";

// 원본: image-to-pdf 저장소 web/app/privacy/page.tsx·support/page.tsx (최종 업데이트 2026-04-19).
// 게시 중인 https://soripdf-web.vercel.app 과 같다. 지원 페이지에는 날짜가 없어 파일의
// 마지막 커밋일(2026-04-19)을 쓴다. 문의 메일은 원본의 주소를 그대로 둔다.
const UPDATED = "2026-04-19";
const EMAIL = "tmdgns8937@naver.com";

export const SORIPDF_DOCUMENTS: {
  ko: { privacy: AppDocument; support: AppDocument };
} = {
  ko: {
    privacy: {
      title: "SoriPdf 개인정보 처리방침",
      description:
        "SoriPdf는 문서를 빠르게 PDF로 만들고 공유할 수 있게 설계된 iPhone 및 iPad용 앱이다.",
      lead: "SoriPdf는 문서를 빠르게 PDF로 만들고 공유할 수 있게 설계된 iPhone 및 iPad용 앱이다.",
      updatedAt: UPDATED,
      sections: [
        {
          title: "수집하는 정보",
          body: [
            "SoriPdf는 회원가입이나 로그인 기능을 제공하지 않으며, 사용자의 이름, 이메일, 전화번호 같은 개인정보를 앱 내부에서 수집하지 않는다.",
          ],
        },
        {
          title: "문서와 이미지 처리 방식",
          body: [
            "사용자가 촬영하거나 가져온 이미지, 생성한 PDF 파일, 보관함에 저장된 문서 메타데이터는 기본적으로 사용자의 기기 안에서 처리되고 저장된다. SoriPdf는 서버에 문서 이미지나 PDF를 업로드하지 않는다.",
          ],
        },
        {
          title: "사진 및 카메라 권한",
          body: [
            "카메라 권한은 문서 촬영, 사진 보관함 권한은 기존 이미지 불러오기를 위해 사용한다. 사용자는 iOS 설정에서 언제든지 권한을 변경할 수 있다.",
          ],
        },
        {
          title: "제3자 제공",
          body: [
            "SoriPdf는 사용자의 문서 이미지나 PDF를 제3자에게 판매하거나 제공하지 않는다. 다만 사용자가 직접 공유 기능을 사용해 외부 앱으로 문서를 전송하는 경우, 그 이후의 처리는 해당 서비스의 정책을 따른다.",
          ],
        },
        {
          title: "데이터 보관과 삭제",
          body: [
            "사용자가 앱에서 문서를 삭제하면 해당 문서는 기기 저장소에서 제거된다. 앱을 삭제하면 앱 내부에 저장된 데이터도 함께 제거될 수 있다.",
          ],
        },
        {
          title: "문의",
          body: [
            `이메일: ${EMAIL}`,
            "지원 페이지: https://soripdf-web.vercel.app/support",
          ],
        },
      ],
    },
    support: {
      title: "빠른 지원",
      description:
        "사용 중 막히는 내용이 있으면 아래 경로로 바로 확인하거나 문의하면 된다.",
      lead: "사용 중 막히는 내용이 있으면 아래 경로로 바로 확인하거나 문의하면 된다.",
      updatedAt: UPDATED,
      sections: [
        {
          title: "이메일 문의",
          links: [{ label: EMAIL, href: `mailto:${EMAIL}` }],
        },
        {
          title: "응답",
          body: ["확인 가능한 범위에서 순차적으로 답변한다."],
        },
        {
          title: "앱을 사용하려면 로그인해야 하나요?",
          body: ["아니다. SoriPdf는 로그인 없이 사용할 수 있다."],
        },
        {
          title: "문서 이미지나 PDF가 서버로 업로드되나요?",
          body: [
            "기본 흐름은 온디바이스 처리다. 사용자가 직접 공유를 선택한 경우에만 외부 앱으로 전송된다.",
          ],
        },
        {
          title: "사진 접근 권한과 카메라 권한은 왜 필요한가요?",
          body: [
            "카메라는 문서 촬영, 사진 권한은 기존 이미지 불러오기에만 사용한다.",
          ],
        },
        {
          title: "문서를 삭제하면 어떻게 되나요?",
          body: ["앱에서 삭제한 문서는 기기 저장소에서 제거된다."],
        },
        {
          title: "개인정보처리방침",
          body: [
            "권한과 데이터 처리 방식은 개인정보처리방침에서 확인할 수 있다.",
          ],
          links: [
            { label: "개인정보처리방침", href: "/ko/work/soripdf/privacy" },
          ],
        },
      ],
    },
  },
};
