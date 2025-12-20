import { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import Link from "next/link";

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;

  return {
    title: locale === "ko" ? "이용약관" : "Terms of Service",
    description:
      locale === "ko"
        ? "Web Toolkit 서비스 이용약관입니다."
        : "Terms of Service for Web Toolkit.",
  };
}

export default async function TermsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  if (locale === "ko") {
    return <TermsKorean locale={locale} />;
  }

  return <TermsEnglish locale={locale} />;
}

function TermsKorean({ locale }: { locale: string }) {
  return (
    <div className="max-w-4xl mx-auto">
      <article className="prose prose-neutral dark:prose-invert max-w-none">
        <h1 className="text-3xl font-bold tracking-tight">
          이용약관 (Terms of Service)
        </h1>
        <p className="text-muted-foreground">최종 수정일: 2025년 12월 20일</p>

        <p>
          <strong>Web Toolkit</strong>(이하 &quot;서비스&quot;)을 이용해 주셔서
          감사합니다. 본 이용약관은 귀하가 서비스를 이용할 때 적용되는 규칙과
          지침을 설명합니다. 서비스를 이용함으로써 귀하는 본 약관에 동의하는
          것으로 간주됩니다.
        </p>

        <h2 className="text-xl font-semibold mt-8">1. 서비스 개요</h2>
        <p>
          Web Toolkit은 개발자를 위한 무료 온라인 도구 모음입니다. 다음과 같은
          도구들을 제공합니다:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>JSON Formatter, JWT Decoder, Hash Generator 등 텍스트 도구</li>
          <li>Image Resizer, Video Compressor, Color Picker 등 미디어 도구</li>
          <li>Base64 Converter, URL Encoder 등 변환 도구</li>
          <li>Git, HTTP Status, Regex 등 개발자 치트시트</li>
        </ul>

        <h2 className="text-xl font-semibold mt-8">2. 서비스 이용</h2>
        <h3 className="text-lg font-medium mt-4">2.1 무료 이용</h3>
        <p>
          본 서비스는 무료로 제공되며, 별도의 가입이나 로그인 없이 이용할 수
          있습니다.
        </p>

        <h3 className="text-lg font-medium mt-4">2.2 클라이언트 측 처리</h3>
        <p>
          대부분의 도구는 귀하의 브라우저 내에서만 작동합니다. 입력한 데이터는
          서버로 전송되지 않으며, 페이지를 닫으면 삭제됩니다.
        </p>

        <h3 className="text-lg font-medium mt-4">2.3 허용되는 사용</h3>
        <p>귀하는 다음 목적으로 서비스를 이용할 수 있습니다:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>개인적인 개발 작업</li>
          <li>업무 목적의 데이터 처리</li>
          <li>교육 및 학습 목적</li>
        </ul>

        <h2 className="text-xl font-semibold mt-8">3. 금지 행위</h2>
        <p>다음 행위는 금지됩니다:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>서비스의 정상적인 운영을 방해하는 행위</li>
          <li>자동화된 수단을 사용한 대량 요청</li>
          <li>서비스의 보안을 손상시키려는 시도</li>
          <li>불법적인 목적으로의 사용</li>
        </ul>

        <h2 className="text-xl font-semibold mt-8">4. 지적 재산권</h2>
        <p>
          서비스의 디자인, 로고, 소프트웨어 코드 등은 저작권법에 의해
          보호됩니다. 귀하가 서비스를 통해 처리하는 데이터에 대한 권리는
          귀하에게 있습니다.
        </p>

        <h2 className="text-xl font-semibold mt-8">5. 책임의 제한</h2>
        <p>
          서비스는 &quot;있는 그대로&quot; 제공됩니다. 우리는 다음에 대해
          책임지지 않습니다:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>서비스 이용으로 인한 직접적 또는 간접적 손해</li>
          <li>서비스의 일시적 중단 또는 장애</li>
          <li>데이터 손실</li>
          <li>제3자 서비스와의 호환성 문제</li>
        </ul>

        <h2 className="text-xl font-semibold mt-8">6. 광고</h2>
        <p>
          본 서비스는 Google AdSense를 통해 광고를 게재할 수 있습니다. 광고 관련
          정보는{" "}
          <Link
            href={`/${locale}/privacy`}
            className="text-primary hover:underline"
          >
            개인정보처리방침
          </Link>
          을 참조하세요.
        </p>

        <h2 className="text-xl font-semibold mt-8">7. 약관 변경</h2>
        <p>
          본 약관은 필요에 따라 변경될 수 있습니다. 중요한 변경 사항이 있을 경우
          서비스 내 공지를 통해 알려드립니다.
        </p>

        <h2 className="text-xl font-semibold mt-8">8. 문의하기</h2>
        <p>본 약관에 대해 질문이 있으시면 아래로 연락해 주세요.</p>
        <p>
          <strong>Email:</strong> tmdgns893758@gmail.com
        </p>
      </article>
    </div>
  );
}

function TermsEnglish({ locale }: { locale: string }) {
  return (
    <div className="max-w-4xl mx-auto">
      <article className="prose prose-neutral dark:prose-invert max-w-none">
        <h1 className="text-3xl font-bold tracking-tight">Terms of Service</h1>
        <p className="text-muted-foreground">Last updated: December 20, 2025</p>

        <p>
          Thank you for using <strong>Web Toolkit</strong> (&quot;the
          Service&quot;). These Terms of Service explain the rules and
          guidelines that apply when you use our Service. By using the Service,
          you agree to these terms.
        </p>

        <h2 className="text-xl font-semibold mt-8">1. Service Overview</h2>
        <p>
          Web Toolkit is a free online collection of tools for developers. We
          provide:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Text tools like JSON Formatter, JWT Decoder, Hash Generator</li>
          <li>
            Media tools like Image Resizer, Video Compressor, Color Picker
          </li>
          <li>Conversion tools like Base64 Converter, URL Encoder</li>
          <li>Developer cheatsheets for Git, HTTP Status, Regex, and more</li>
        </ul>

        <h2 className="text-xl font-semibold mt-8">2. Use of Service</h2>
        <h3 className="text-lg font-medium mt-4">2.1 Free Usage</h3>
        <p>
          This Service is provided free of charge and can be used without
          registration or login.
        </p>

        <h3 className="text-lg font-medium mt-4">2.2 Client-Side Processing</h3>
        <p>
          Most tools operate entirely within your browser. Data you input is not
          sent to servers and is deleted when you close the page.
        </p>

        <h3 className="text-lg font-medium mt-4">2.3 Permitted Use</h3>
        <p>You may use the Service for:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Personal development work</li>
          <li>Business data processing</li>
          <li>Educational and learning purposes</li>
        </ul>

        <h2 className="text-xl font-semibold mt-8">3. Prohibited Activities</h2>
        <p>The following activities are prohibited:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Actions that interfere with normal service operation</li>
          <li>Bulk requests using automated means</li>
          <li>Attempts to compromise service security</li>
          <li>Use for illegal purposes</li>
        </ul>

        <h2 className="text-xl font-semibold mt-8">4. Intellectual Property</h2>
        <p>
          The design, logos, and software code of the Service are protected by
          copyright law. You retain all rights to data you process through the
          Service.
        </p>

        <h2 className="text-xl font-semibold mt-8">
          5. Limitation of Liability
        </h2>
        <p>
          The Service is provided &quot;as is&quot;. We are not responsible for:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Direct or indirect damages resulting from use of the Service</li>
          <li>Temporary service interruptions or failures</li>
          <li>Data loss</li>
          <li>Compatibility issues with third-party services</li>
        </ul>

        <h2 className="text-xl font-semibold mt-8">6. Advertising</h2>
        <p>
          This Service may display advertisements through Google AdSense. For
          advertising-related information, please refer to our{" "}
          <Link
            href={`/${locale}/privacy`}
            className="text-primary hover:underline"
          >
            Privacy Policy
          </Link>
          .
        </p>

        <h2 className="text-xl font-semibold mt-8">7. Changes to Terms</h2>
        <p>
          These terms may be changed as needed. We will notify you of
          significant changes through notices on the Service.
        </p>

        <h2 className="text-xl font-semibold mt-8">8. Contact Us</h2>
        <p>If you have questions about these terms, please contact us at:</p>
        <p>
          <strong>Email:</strong> tmdgns893758@gmail.com
        </p>
      </article>
    </div>
  );
}
