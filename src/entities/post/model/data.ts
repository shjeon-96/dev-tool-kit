import { BlogPost } from "./types";

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "how-client-side-ffmpeg-works",
    title: {
      en: "How We Built a Serverless Video Converter with WebAssembly",
      ko: "WebAssembly로 서버 없는 비디오 변환기를 만든 이야기",
      ja: "WebAssemblyを使用してサーバーレスビデオコンバーターを構築した方法",
    },
    excerpt: {
      en: "Learn how we used FFmpeg.wasm to process gigabytes of video directly in your browser without uploading anything to a server.",
      ko: "FFmpeg.wasm을 사용하여 서버 업로드 없이 브라우저에서 기가바이트 단위의 비디오를 직접 처리한 방법을 알아봅니다.",
      ja: "FFmpeg.wasmを使用して、サーバーに何もアップロードせずにブラウザでギガバイト単位のビデオを直接処理する方法を学びます。",
    },
    content: {
      en: `
# Introduction

Traditional video converters require you to upload your files to a server. This is slow, bandwidth-intensive, and raises privacy concerns. At **Web Toolkit**, we wanted to change that.

## Enter WebAssembly

WebAssembly (Wasm) allows us to run high-performance code, like C and C++, directly in the browser. By using **FFmpeg.wasm**, we compiled the industry-standard FFmpeg library to Wasm.

## How It Works

1.  **Loading Core**: The browser downloads the \`ffmpeg-core.wasm\` binary (about 25MB).
2.  **Virtual File System (MEMFS)**: We write the user's video file to an in-memory filesystem.
3.  **Processing**: FFmpeg commands run against this virtual file.
4.  **Extraction**: The converted file is read back from memory and offered for download.

\`\`\`typescript
const ffmpeg = new FFmpeg();
await ffmpeg.load();
await ffmpeg.writeFile('input.avi', await fetchFile(file));
await ffmpeg.exec(['-i', 'input.avi', 'output.mp4']);
const data = await ffmpeg.readFile('output.mp4');
\`\`\`

## Challenges & Solutions

### 1. Large File Handling
Browsers have memory limits. We use **SharedArrayBuffer** to handle large chunks of data efficiently without freezing the main thread.

### 2. Cross-Origin Isolation
To use \`SharedArrayBuffer\`, we had to set specific headers:
- \`Cross-Origin-Opener-Policy: same-origin\`
- \`Cross-Origin-Embedder-Policy: require-corp\`

## Conclusion

Client-side processing is the future of privacy-focused web tools. It reduces server costs to zero and gives users complete control over their data.
      `,
      ko: `
# 소개

전통적인 비디오 변환기들은 파일을 서버로 업로드해야 했습니다. 이는 느리고, 대역폭을 많이 소모하며, 개인정보 보호 문제를 야기합니다. **Web Toolkit**은 이를 바꾸고 싶었습니다.

## WebAssembly의 등장

WebAssembly (Wasm)는 브라우저에서 C나 C++ 같은 고성능 코드를 직접 실행할 수 있게 해줍니다. 우리는 **FFmpeg.wasm**을 사용하여 업계 표준인 FFmpeg 라이브러리를 Wasm으로 컴파일했습니다.

## 작동 원리

1.  **코어 로딩**: 브라우저가 \`ffmpeg-core.wasm\` 바이너리(약 25MB)를 다운로드합니다.
2.  **가상 파일 시스템 (MEMFS)**: 사용자의 비디오 파일을 메모리 내 파일 시스템에 씁니다.
3.  **처리**: FFmpeg 명령어가 이 가상 파일에 대해 실행됩니다.
4.  **추출**: 변환된 파일을 메모리에서 읽어와 다운로드를 제공합니다.

\`\`\`typescript
const ffmpeg = new FFmpeg();
await ffmpeg.load();
await ffmpeg.writeFile('input.avi', await fetchFile(file));
await ffmpeg.exec(['-i', 'input.avi', 'output.mp4']);
const data = await ffmpeg.readFile('output.mp4');
\`\`\`

## 도전 과제와 해결책

### 1. 대용량 파일 처리
브라우저는 메모리 제한이 있습니다. 우리는 **SharedArrayBuffer**를 사용하여 메인 스레드를 멈추지 않고 대용량 데이터 청크를 효율적으로 처리했습니다.

### 2. 크로스 오리진 격리 (Cross-Origin Isolation)
\`SharedArrayBuffer\`를 사용하기 위해 특정 헤더를 설정해야 했습니다:
- \`Cross-Origin-Opener-Policy: same-origin\`
- \`Cross-Origin-Embedder-Policy: require-corp\`

## 결론

클라이언트 사이드 처리는 개인정보 보호 중심 웹 도구의 미래입니다. 이는 서버 비용을 0으로 줄이고 사용자에게 데이터에 대한 완전한 통제권을 제공합니다.
      `,
      ja: `
# はじめに

従来のビデオコンバーターでは、ファイルをサーバーにアップロードする必要がありました。これは遅く、帯域幅を大量に消費し、プライバシーの懸念を引き起こします。**Web Toolkit**はこれを変えたいと考えました。

## WebAssemblyの登場

WebAssembly (Wasm) を使用すると、CやC++のような高性能コードをブラウザで直接実行できます。私たちは**FFmpeg.wasm**を使用して、業界標準のFFmpegライブラリをWasmにコンパイルしました。

## 仕組み

1.  **コアのロード**: ブラウザが\`ffmpeg-core.wasm\`バイナリ（約25MB）をダウンロードします。
2.  **仮想ファイルシステム (MEMFS)**: ユーザーのビデオファイルをメモリ内ファイルシステムに書き込みます。
3.  **処理**: FFmpegコマンドがこの仮想ファイルに対して実行されます。
4.  **抽出**: 変換されたファイルをメモリから読み取り、ダウンロード用に提供します。

\`\`\`typescript
const ffmpeg = new FFmpeg();
await ffmpeg.load();
await ffmpeg.writeFile('input.avi', await fetchFile(file));
await ffmpeg.exec(['-i', 'input.avi', 'output.mp4']);
const data = await ffmpeg.readFile('output.mp4');
\`\`\`

## 課題と解決策

### 1. 大容量ファイルの処理
ブラウザにはメモリ制限があります。**SharedArrayBuffer**を使用して、メインスレッドをフリーズさせることなく、大容量のデータチャンクを効率的に処理しました。

### 2. クロスオリジン分離 (Cross-Origin Isolation)
\`SharedArrayBuffer\`を使用するには、特定のヘッダーを設定する必要がありました：
- \`Cross-Origin-Opener-Policy: same-origin\`
- \`Cross-Origin-Embedder-Policy: require-corp\`

## 結論

クライアントサイド処理は、プライバシー重視のWebツールの未来です。これによりサーバーコストがゼロになり、ユーザーはデータを完全に制御できるようになります。
      `,
    },
    author: "Web Toolkit Team",
    date: "2024-12-25",
    category: "technical",
    tags: ["WebAssembly", "FFmpeg", "Privacy", "Performance"],
    readingTimeMinutes: 5,
  },
];
