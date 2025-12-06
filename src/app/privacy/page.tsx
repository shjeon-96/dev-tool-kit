import { Metadata } from "next";

export const metadata: Metadata = {
  title: "개인정보처리방침",
  description: "Web Toolkit의 개인정보 처리방침 및 데이터 보안 정책입니다.",
};

export default function PrivacyPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <article className="prose prose-neutral dark:prose-invert max-w-none">
        <h1 className="text-3xl font-bold tracking-tight">
          개인정보 처리방침 (Privacy Policy)
        </h1>
        <p className="text-muted-foreground">최종 수정일: 2025년 12월 06일</p>

        <p>
          <strong>Web Toolkit</strong>(이하 &quot;서비스&quot;)은 사용자의
          개인정보 보호를 매우 중요하게 생각합니다. 본 개인정보 처리방침은
          귀하가 본 서비스를 이용할 때 귀하의 정보가 어떻게 관리되는지
          설명합니다.
        </p>

        <h2 className="text-xl font-semibold mt-8">
          1. 데이터의 처리 방식 (Client-side Only)
        </h2>
        <p>
          본 서비스의 핵심 도구들(JSON Formatter, JWT Decoder, Image Resizer
          등)은{" "}
          <strong>사용자의 브라우저 내부(Client-side)에서만 작동</strong>합니다.
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            귀하가 입력한 텍스트, 코드, 이미지 파일 등은{" "}
            <strong>서버로 전송되거나 저장되지 않습니다.</strong>
          </li>
          <li>
            모든 연산은 귀하의 기기 메모리상에서 즉시 처리되며, 페이지를
            새로고침하면 데이터는 휘발됩니다.
          </li>
        </ul>

        <h2 className="text-xl font-semibold mt-8">
          2. 광고 및 쿠키 (Google AdSense)
        </h2>
        <p>
          본 서비스는 운영 비용 충당을 위해 <strong>Google AdSense</strong>를
          통해 광고를 게재합니다.
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            Google 및 타사 공급업체는 쿠키(Cookie)를 사용하여 귀하의 본 사이트 및
            기타 웹사이트 방문 기록을 바탕으로 광고를 게재할 수 있습니다.
          </li>
          <li>
            Google은 광고 쿠키를 사용하여 귀하에게 적절한 광고를 제공합니다.
          </li>
          <li>
            사용자는{" "}
            <a
              href="https://www.google.com/settings/ads"
              target="_blank"
              rel="nofollow noopener noreferrer"
              className="text-primary hover:underline"
            >
              광고 설정
            </a>
            에서 맞춤형 광고를 선택 해제할 수 있습니다.
          </li>
        </ul>

        <h2 className="text-xl font-semibold mt-8">3. 로그 데이터 (Log Data)</h2>
        <p>
          대부분의 웹사이트와 마찬가지로, 본 서비스의 호스팅 서버(Vercel)는 방문
          시 브라우저가 전송하는 정보를 자동으로 수집할 수 있습니다. 이 데이터에는
          귀하의 IP 주소, 브라우저 유형 및 버전, 방문 시간, 참조 페이지 등이
          포함될 수 있으며, 이는 서비스의 안정성 확보와 기술적 문제 해결을
          위해서만 사용됩니다.
        </p>

        <h2 className="text-xl font-semibold mt-8">
          4. 외부 링크 (External Links)
        </h2>
        <p>
          본 서비스는 외부 사이트로 연결되는 링크를 포함할 수 있습니다. 해당 외부
          사이트의 개인정보 보호 정책은 본 서비스와 무관하므로, 방문 시 해당
          사이트의 정책을 확인하시기 바랍니다.
        </p>

        <h2 className="text-xl font-semibold mt-8">5. 문의하기</h2>
        <p>
          본 개인정보 처리방침에 대해 궁금한 점이 있으시면 아래 이메일로 문의해
          주시기 바랍니다.
        </p>
        <p>
          <strong>Email:</strong> tmdgns893758@gmail.com
        </p>
      </article>
    </div>
  );
}
