/**
 * Image Resize Target Registry - 모든 리사이즈 타겟 정의
 */

import type { ResizeTarget } from "./types";

// 파일 사이즈 타겟
const fileSizeTargets: ResizeTarget[] = [
  {
    slug: "resize-image-to-10kb",
    type: "file-size",
    targetSizeKB: 10,
    title: {
      en: "Resize Image to 10KB - Free Online Image Compressor",
      ko: "이미지 10KB로 리사이즈 - 무료 온라인 이미지 압축",
      ja: "画像を10KBにリサイズ - 無料オンライン画像圧縮",
    },
    description: {
      en: "Resize and compress your images to exactly 10KB. Perfect for email attachments, form uploads, and low-bandwidth requirements. 100% free, no signup required.",
      ko: "이미지를 정확히 10KB로 리사이즈하고 압축하세요. 이메일 첨부, 폼 업로드, 저대역폭 요구사항에 적합합니다. 100% 무료, 회원가입 불필요.",
      ja: "画像を正確に10KBにリサイズ・圧縮。メール添付、フォームアップロード、低帯域幅要件に最適。100%無料、登録不要。",
    },
    keywords: {
      en: [
        "resize image to 10kb",
        "compress image 10kb",
        "reduce image size 10kb",
        "10kb image converter",
        "image compressor online",
      ],
      ko: [
        "이미지 10kb 리사이즈",
        "10kb 이미지 압축",
        "이미지 크기 줄이기 10kb",
        "10kb 이미지 변환",
      ],
      ja: [
        "画像 10kb リサイズ",
        "10kb 画像圧縮",
        "画像サイズ 10kb",
        "10kb 画像変換",
      ],
    },
    useCases: {
      en: [
        "Email attachments with size limits",
        "Form uploads with file restrictions",
        "Low bandwidth websites",
      ],
      ko: [
        "크기 제한이 있는 이메일 첨부",
        "파일 제한이 있는 폼 업로드",
        "저대역폭 웹사이트",
      ],
      ja: [
        "サイズ制限のあるメール添付",
        "ファイル制限のあるフォームアップロード",
        "低帯域幅ウェブサイト",
      ],
    },
  },
  {
    slug: "resize-image-to-20kb",
    type: "file-size",
    targetSizeKB: 20,
    title: {
      en: "Resize Image to 20KB - Free Online Image Compressor",
      ko: "이미지 20KB로 리사이즈 - 무료 온라인 이미지 압축",
      ja: "画像を20KBにリサイズ - 無料オンライン画像圧縮",
    },
    description: {
      en: "Resize and compress your images to exactly 20KB. Ideal for web thumbnails, profile pictures, and lightweight graphics. 100% free, works in browser.",
      ko: "이미지를 정확히 20KB로 리사이즈하고 압축하세요. 웹 썸네일, 프로필 사진, 가벼운 그래픽에 이상적입니다. 100% 무료, 브라우저에서 작동.",
      ja: "画像を正確に20KBにリサイズ・圧縮。ウェブサムネイル、プロフィール画像、軽量グラフィックに最適。100%無料、ブラウザで動作。",
    },
    keywords: {
      en: [
        "resize image to 20kb",
        "compress image 20kb",
        "reduce image size 20kb",
        "20kb image converter",
      ],
      ko: [
        "이미지 20kb 리사이즈",
        "20kb 이미지 압축",
        "이미지 크기 줄이기 20kb",
      ],
      ja: ["画像 20kb リサイズ", "20kb 画像圧縮", "画像サイズ 20kb"],
    },
    useCases: {
      en: ["Web thumbnails", "Small profile pictures", "Lightweight graphics"],
      ko: ["웹 썸네일", "작은 프로필 사진", "가벼운 그래픽"],
      ja: ["ウェブサムネイル", "小さなプロフィール画像", "軽量グラフィック"],
    },
  },
  {
    slug: "resize-image-to-50kb",
    type: "file-size",
    targetSizeKB: 50,
    title: {
      en: "Resize Image to 50KB - Free Online Image Compressor",
      ko: "이미지 50KB로 리사이즈 - 무료 온라인 이미지 압축",
      ja: "画像を50KBにリサイズ - 無料オンライン画像圧縮",
    },
    description: {
      en: "Resize and compress your images to exactly 50KB. Perfect balance between quality and file size for web use. 100% free, no upload to server.",
      ko: "이미지를 정확히 50KB로 리사이즈하고 압축하세요. 웹 사용을 위한 품질과 파일 크기의 완벽한 균형. 100% 무료, 서버 업로드 없음.",
      ja: "画像を正確に50KBにリサイズ・圧縮。ウェブ用の品質とファイルサイズの完璧なバランス。100%無料、サーバーアップロードなし。",
    },
    keywords: {
      en: [
        "resize image to 50kb",
        "compress image 50kb",
        "reduce image size 50kb",
        "50kb image compressor",
      ],
      ko: [
        "이미지 50kb 리사이즈",
        "50kb 이미지 압축",
        "이미지 크기 줄이기 50kb",
      ],
      ja: ["画像 50kb リサイズ", "50kb 画像圧縮", "画像サイズ 50kb"],
    },
    useCases: {
      en: ["Blog post images", "Product thumbnails", "Email newsletters"],
      ko: ["블로그 포스트 이미지", "상품 썸네일", "이메일 뉴스레터"],
      ja: ["ブログ投稿画像", "商品サムネイル", "メールニュースレター"],
    },
  },
  {
    slug: "resize-image-to-100kb",
    type: "file-size",
    targetSizeKB: 100,
    title: {
      en: "Resize Image to 100KB - Free Online Image Compressor",
      ko: "이미지 100KB로 리사이즈 - 무료 온라인 이미지 압축",
      ja: "画像を100KBにリサイズ - 無料オンライン画像圧縮",
    },
    description: {
      en: "Resize and compress your images to exactly 100KB. Great for high-quality web images while keeping fast load times. 100% free, privacy-first.",
      ko: "이미지를 정확히 100KB로 리사이즈하고 압축하세요. 빠른 로딩을 유지하면서 고품질 웹 이미지에 적합합니다. 100% 무료, 개인정보 보호 우선.",
      ja: "画像を正確に100KBにリサイズ・圧縮。高速な読み込みを維持しながら高品質なウェブ画像に最適。100%無料、プライバシー優先。",
    },
    keywords: {
      en: [
        "resize image to 100kb",
        "compress image 100kb",
        "reduce image size 100kb",
        "100kb image compressor",
      ],
      ko: [
        "이미지 100kb 리사이즈",
        "100kb 이미지 압축",
        "이미지 크기 줄이기 100kb",
      ],
      ja: ["画像 100kb リサイズ", "100kb 画像圧縮", "画像サイズ 100kb"],
    },
    useCases: {
      en: [
        "High-quality web images",
        "Social media posts",
        "E-commerce products",
      ],
      ko: ["고품질 웹 이미지", "소셜 미디어 포스트", "이커머스 상품"],
      ja: ["高品質ウェブ画像", "ソーシャルメディア投稿", "Eコマース商品"],
    },
  },
  {
    slug: "resize-image-to-200kb",
    type: "file-size",
    targetSizeKB: 200,
    title: {
      en: "Resize Image to 200KB - Free Online Image Compressor",
      ko: "이미지 200KB로 리사이즈 - 무료 온라인 이미지 압축",
      ja: "画像を200KBにリサイズ - 無料オンライン画像圧縮",
    },
    description: {
      en: "Resize and compress your images to exactly 200KB. Perfect for passport photos, ID documents, and government form submissions. 100% free.",
      ko: "이미지를 정확히 200KB로 리사이즈하고 압축하세요. 여권 사진, 신분증 문서, 정부 양식 제출에 완벽합니다. 100% 무료.",
      ja: "画像を正確に200KBにリサイズ・圧縮。パスポート写真、身分証明書、政府フォーム提出に最適。100%無料。",
    },
    keywords: {
      en: [
        "resize image to 200kb",
        "compress image 200kb",
        "passport photo 200kb",
        "200kb image compressor",
      ],
      ko: ["이미지 200kb 리사이즈", "200kb 이미지 압축", "여권사진 200kb"],
      ja: ["画像 200kb リサイズ", "200kb 画像圧縮", "パスポート写真 200kb"],
    },
    useCases: {
      en: [
        "Passport photo applications",
        "ID document uploads",
        "Government form submissions",
      ],
      ko: ["여권 사진 신청", "신분증 문서 업로드", "정부 양식 제출"],
      ja: ["パスポート写真申請", "身分証明書アップロード", "政府フォーム提出"],
    },
  },
  {
    slug: "resize-image-to-500kb",
    type: "file-size",
    targetSizeKB: 500,
    title: {
      en: "Resize Image to 500KB - Free Online Image Compressor",
      ko: "이미지 500KB로 리사이즈 - 무료 온라인 이미지 압축",
      ja: "画像を500KBにリサイズ - 無料オンライン画像圧縮",
    },
    description: {
      en: "Resize and compress your images to exactly 500KB. Ideal for detailed product images, portfolio pieces, and high-resolution thumbnails.",
      ko: "이미지를 정확히 500KB로 리사이즈하고 압축하세요. 상세한 상품 이미지, 포트폴리오, 고해상도 썸네일에 이상적입니다.",
      ja: "画像を正確に500KBにリサイズ・圧縮。詳細な商品画像、ポートフォリオ、高解像度サムネイルに最適。",
    },
    keywords: {
      en: [
        "resize image to 500kb",
        "compress image 500kb",
        "reduce image size 500kb",
      ],
      ko: [
        "이미지 500kb 리사이즈",
        "500kb 이미지 압축",
        "이미지 크기 줄이기 500kb",
      ],
      ja: ["画像 500kb リサイズ", "500kb 画像圧縮", "画像サイズ 500kb"],
    },
    useCases: {
      en: [
        "Detailed product images",
        "Portfolio pieces",
        "High-resolution thumbnails",
      ],
      ko: ["상세한 상품 이미지", "포트폴리오 작품", "고해상도 썸네일"],
      ja: ["詳細な商品画像", "ポートフォリオ作品", "高解像度サムネイル"],
    },
  },
  {
    slug: "resize-image-to-1mb",
    type: "file-size",
    targetSizeKB: 1024,
    title: {
      en: "Resize Image to 1MB - Free Online Image Compressor",
      ko: "이미지 1MB로 리사이즈 - 무료 온라인 이미지 압축",
      ja: "画像を1MBにリサイズ - 無料オンライン画像圧縮",
    },
    description: {
      en: "Resize and compress your images to exactly 1MB. Perfect for high-quality photos, print-ready images, and professional portfolios.",
      ko: "이미지를 정확히 1MB로 리사이즈하고 압축하세요. 고품질 사진, 인쇄용 이미지, 전문 포트폴리오에 완벽합니다.",
      ja: "画像を正確に1MBにリサイズ・圧縮。高品質写真、印刷用画像、プロフェッショナルポートフォリオに最適。",
    },
    keywords: {
      en: [
        "resize image to 1mb",
        "compress image 1mb",
        "reduce image size 1mb",
      ],
      ko: ["이미지 1mb 리사이즈", "1mb 이미지 압축", "이미지 크기 줄이기 1mb"],
      ja: ["画像 1mb リサイズ", "1mb 画像圧縮", "画像サイズ 1mb"],
    },
    useCases: {
      en: [
        "High-quality photos",
        "Print-ready images",
        "Professional portfolios",
      ],
      ko: ["고품질 사진", "인쇄용 이미지", "전문 포트폴리오"],
      ja: ["高品質写真", "印刷用画像", "プロフェッショナルポートフォリオ"],
    },
  },
  {
    slug: "resize-image-to-2mb",
    type: "file-size",
    targetSizeKB: 2048,
    title: {
      en: "Resize Image to 2MB - Free Online Image Compressor",
      ko: "이미지 2MB로 리사이즈 - 무료 온라인 이미지 압축",
      ja: "画像を2MBにリサイズ - 無料オンライン画像圧縮",
    },
    description: {
      en: "Resize and compress your images to exactly 2MB. Ideal for social media banners, website headers, and marketing materials.",
      ko: "이미지를 정확히 2MB로 리사이즈하고 압축하세요. 소셜 미디어 배너, 웹사이트 헤더, 마케팅 자료에 이상적입니다.",
      ja: "画像を正確に2MBにリサイズ・圧縮。ソーシャルメディアバナー、ウェブサイトヘッダー、マーケティング資料に最適。",
    },
    keywords: {
      en: [
        "resize image to 2mb",
        "compress image 2mb",
        "reduce image size 2mb",
      ],
      ko: ["이미지 2mb 리사이즈", "2mb 이미지 압축", "이미지 크기 줄이기 2mb"],
      ja: ["画像 2mb リサイズ", "2mb 画像圧縮", "画像サイズ 2mb"],
    },
    useCases: {
      en: ["Social media banners", "Website headers", "Marketing materials"],
      ko: ["소셜 미디어 배너", "웹사이트 헤더", "마케팅 자료"],
      ja: [
        "ソーシャルメディアバナー",
        "ウェブサイトヘッダー",
        "マーケティング資料",
      ],
    },
  },
];

// 디멘션 타겟 - 정사각형
const squareDimensionTargets: ResizeTarget[] = [
  {
    slug: "resize-image-to-100x100",
    type: "dimension",
    targetWidth: 100,
    targetHeight: 100,
    title: {
      en: "Resize Image to 100x100 Pixels - Free Online Tool",
      ko: "이미지 100x100 픽셀로 리사이즈 - 무료 온라인 도구",
      ja: "画像を100x100ピクセルにリサイズ - 無料オンラインツール",
    },
    description: {
      en: "Resize your images to exactly 100x100 pixels. Perfect for small icons, avatar thumbnails, and favicon generation.",
      ko: "이미지를 정확히 100x100 픽셀로 리사이즈하세요. 작은 아이콘, 아바타 썸네일, 파비콘 생성에 완벽합니다.",
      ja: "画像を正確に100x100ピクセルにリサイズ。小さなアイコン、アバターサムネイル、ファビコン生成に最適。",
    },
    keywords: {
      en: [
        "resize image 100x100",
        "100x100 pixels",
        "square image 100px",
        "icon resize",
      ],
      ko: ["이미지 100x100 리사이즈", "100x100 픽셀", "정사각형 이미지 100px"],
      ja: ["画像 100x100 リサイズ", "100x100 ピクセル", "正方形画像 100px"],
    },
  },
  {
    slug: "resize-image-to-200x200",
    type: "dimension",
    targetWidth: 200,
    targetHeight: 200,
    title: {
      en: "Resize Image to 200x200 Pixels - Free Online Tool",
      ko: "이미지 200x200 픽셀로 리사이즈 - 무료 온라인 도구",
      ja: "画像を200x200ピクセルにリサイズ - 無料オンラインツール",
    },
    description: {
      en: "Resize your images to exactly 200x200 pixels. Ideal for profile pictures, thumbnails, and small product images.",
      ko: "이미지를 정확히 200x200 픽셀로 리사이즈하세요. 프로필 사진, 썸네일, 작은 상품 이미지에 이상적입니다.",
      ja: "画像を正確に200x200ピクセルにリサイズ。プロフィール画像、サムネイル、小さな商品画像に最適。",
    },
    keywords: {
      en: [
        "resize image 200x200",
        "200x200 pixels",
        "square image 200px",
        "profile picture size",
      ],
      ko: ["이미지 200x200 리사이즈", "200x200 픽셀", "정사각형 이미지 200px"],
      ja: ["画像 200x200 リサイズ", "200x200 ピクセル", "正方形画像 200px"],
    },
  },
  {
    slug: "resize-image-to-500x500",
    type: "dimension",
    targetWidth: 500,
    targetHeight: 500,
    title: {
      en: "Resize Image to 500x500 Pixels - Free Online Tool",
      ko: "이미지 500x500 픽셀로 리사이즈 - 무료 온라인 도구",
      ja: "画像を500x500ピクセルにリサイズ - 無料オンラインツール",
    },
    description: {
      en: "Resize your images to exactly 500x500 pixels. Perfect for e-commerce product images, social media profiles, and web graphics.",
      ko: "이미지를 정확히 500x500 픽셀로 리사이즈하세요. 이커머스 상품 이미지, 소셜 미디어 프로필, 웹 그래픽에 완벽합니다.",
      ja: "画像を正確に500x500ピクセルにリサイズ。Eコマース商品画像、ソーシャルメディアプロフィール、ウェブグラフィックに最適。",
    },
    keywords: {
      en: [
        "resize image 500x500",
        "500x500 pixels",
        "square image 500px",
        "product image size",
      ],
      ko: ["이미지 500x500 리사이즈", "500x500 픽셀", "정사각형 이미지 500px"],
      ja: ["画像 500x500 リサイズ", "500x500 ピクセル", "正方形画像 500px"],
    },
  },
  {
    slug: "resize-image-to-800x800",
    type: "dimension",
    targetWidth: 800,
    targetHeight: 800,
    title: {
      en: "Resize Image to 800x800 Pixels - Free Online Tool",
      ko: "이미지 800x800 픽셀로 리사이즈 - 무료 온라인 도구",
      ja: "画像を800x800ピクセルにリサイズ - 無料オンラインツール",
    },
    description: {
      en: "Resize your images to exactly 800x800 pixels. Ideal for high-resolution product images, YouTube channel art, and social media.",
      ko: "이미지를 정확히 800x800 픽셀로 리사이즈하세요. 고해상도 상품 이미지, YouTube 채널 아트, 소셜 미디어에 이상적입니다.",
      ja: "画像を正確に800x800ピクセルにリサイズ。高解像度商品画像、YouTubeチャンネルアート、ソーシャルメディアに最適。",
    },
    keywords: {
      en: [
        "resize image 800x800",
        "800x800 pixels",
        "square image 800px",
        "youtube profile size",
      ],
      ko: ["이미지 800x800 리사이즈", "800x800 픽셀", "정사각형 이미지 800px"],
      ja: ["画像 800x800 リサイズ", "800x800 ピクセル", "正方形画像 800px"],
    },
  },
  {
    slug: "resize-image-to-1000x1000",
    type: "dimension",
    targetWidth: 1000,
    targetHeight: 1000,
    title: {
      en: "Resize Image to 1000x1000 Pixels - Free Online Tool",
      ko: "이미지 1000x1000 픽셀로 리사이즈 - 무료 온라인 도구",
      ja: "画像を1000x1000ピクセルにリサイズ - 無料オンラインツール",
    },
    description: {
      en: "Resize your images to exactly 1000x1000 pixels. Perfect for high-quality Instagram posts, product photography, and web galleries.",
      ko: "이미지를 정확히 1000x1000 픽셀로 리사이즈하세요. 고품질 인스타그램 포스트, 상품 사진, 웹 갤러리에 완벽합니다.",
      ja: "画像を正確に1000x1000ピクセルにリサイズ。高品質Instagramポスト、商品写真、ウェブギャラリーに最適。",
    },
    keywords: {
      en: [
        "resize image 1000x1000",
        "1000x1000 pixels",
        "square image 1000px",
        "instagram post size",
      ],
      ko: [
        "이미지 1000x1000 리사이즈",
        "1000x1000 픽셀",
        "정사각형 이미지 1000px",
      ],
      ja: [
        "画像 1000x1000 リサイズ",
        "1000x1000 ピクセル",
        "正方形画像 1000px",
      ],
    },
  },
];

// 디멘션 타겟 - 16:9 비율
const widescreenDimensionTargets: ResizeTarget[] = [
  {
    slug: "resize-image-to-1920x1080",
    type: "dimension",
    targetWidth: 1920,
    targetHeight: 1080,
    title: {
      en: "Resize Image to 1920x1080 (Full HD) - Free Online Tool",
      ko: "이미지 1920x1080 (Full HD)로 리사이즈 - 무료 온라인 도구",
      ja: "画像を1920x1080 (Full HD)にリサイズ - 無料オンラインツール",
    },
    description: {
      en: "Resize your images to 1920x1080 pixels (Full HD). Perfect for desktop wallpapers, YouTube thumbnails, and presentations.",
      ko: "이미지를 1920x1080 픽셀(Full HD)로 리사이즈하세요. 데스크톱 배경화면, YouTube 썸네일, 프레젠테이션에 완벽합니다.",
      ja: "画像を1920x1080ピクセル(Full HD)にリサイズ。デスクトップ壁紙、YouTubeサムネイル、プレゼンテーションに最適。",
    },
    keywords: {
      en: [
        "resize image 1920x1080",
        "full hd image",
        "1080p image resize",
        "hd wallpaper size",
      ],
      ko: ["이미지 1920x1080 리사이즈", "풀HD 이미지", "1080p 이미지"],
      ja: ["画像 1920x1080 リサイズ", "フルHD画像", "1080p画像"],
    },
  },
  {
    slug: "resize-image-to-1280x720",
    type: "dimension",
    targetWidth: 1280,
    targetHeight: 720,
    title: {
      en: "Resize Image to 1280x720 (HD) - Free Online Tool",
      ko: "이미지 1280x720 (HD)로 리사이즈 - 무료 온라인 도구",
      ja: "画像を1280x720 (HD)にリサイズ - 無料オンラインツール",
    },
    description: {
      en: "Resize your images to 1280x720 pixels (HD). Ideal for YouTube thumbnails, blog headers, and web banners.",
      ko: "이미지를 1280x720 픽셀(HD)로 리사이즈하세요. YouTube 썸네일, 블로그 헤더, 웹 배너에 이상적입니다.",
      ja: "画像を1280x720ピクセル(HD)にリサイズ。YouTubeサムネイル、ブログヘッダー、ウェブバナーに最適。",
    },
    keywords: {
      en: [
        "resize image 1280x720",
        "hd image resize",
        "720p image",
        "youtube thumbnail size",
      ],
      ko: ["이미지 1280x720 리사이즈", "HD 이미지", "720p 이미지"],
      ja: ["画像 1280x720 リサイズ", "HD画像", "720p画像"],
    },
  },
];

// 플랫폼별 타겟 - Instagram
const instagramTargets: ResizeTarget[] = [
  {
    slug: "resize-image-for-instagram-post",
    type: "platform",
    targetWidth: 1080,
    targetHeight: 1080,
    platform: "Instagram",
    title: {
      en: "Resize Image for Instagram Post (1080x1080) - Free Tool",
      ko: "인스타그램 포스트용 이미지 리사이즈 (1080x1080) - 무료 도구",
      ja: "Instagramポスト用画像リサイズ (1080x1080) - 無料ツール",
    },
    description: {
      en: "Resize your photos to the perfect Instagram post size (1080x1080). Optimize your images for maximum engagement on Instagram.",
      ko: "완벽한 인스타그램 포스트 크기(1080x1080)로 사진을 리사이즈하세요. 인스타그램에서 최대 참여를 위해 이미지를 최적화하세요.",
      ja: "完璧なInstagramポストサイズ(1080x1080)に写真をリサイズ。Instagramで最大のエンゲージメントのために画像を最適化。",
    },
    keywords: {
      en: [
        "instagram post size",
        "resize for instagram",
        "1080x1080 instagram",
        "instagram image dimensions",
      ],
      ko: [
        "인스타그램 포스트 크기",
        "인스타그램용 리사이즈",
        "인스타그램 이미지 크기",
      ],
      ja: [
        "Instagramポストサイズ",
        "Instagram用リサイズ",
        "Instagram画像サイズ",
      ],
    },
  },
  {
    slug: "resize-image-for-instagram-story",
    type: "platform",
    targetWidth: 1080,
    targetHeight: 1920,
    platform: "Instagram",
    title: {
      en: "Resize Image for Instagram Story (1080x1920) - Free Tool",
      ko: "인스타그램 스토리용 이미지 리사이즈 (1080x1920) - 무료 도구",
      ja: "Instagramストーリー用画像リサイズ (1080x1920) - 無料ツール",
    },
    description: {
      en: "Resize your images to the perfect Instagram Story size (1080x1920). Create stunning vertical content for your stories.",
      ko: "완벽한 인스타그램 스토리 크기(1080x1920)로 이미지를 리사이즈하세요. 스토리를 위한 멋진 세로 콘텐츠를 만드세요.",
      ja: "完璧なInstagramストーリーサイズ(1080x1920)に画像をリサイズ。ストーリー用の素晴らしい縦型コンテンツを作成。",
    },
    keywords: {
      en: [
        "instagram story size",
        "resize for instagram story",
        "1080x1920 image",
        "instagram story dimensions",
      ],
      ko: [
        "인스타그램 스토리 크기",
        "인스타그램 스토리용 리사이즈",
        "1080x1920 이미지",
      ],
      ja: [
        "Instagramストーリーサイズ",
        "Instagramストーリー用リサイズ",
        "1080x1920画像",
      ],
    },
  },
  {
    slug: "resize-image-for-instagram-profile",
    type: "platform",
    targetWidth: 320,
    targetHeight: 320,
    platform: "Instagram",
    title: {
      en: "Resize Image for Instagram Profile (320x320) - Free Tool",
      ko: "인스타그램 프로필용 이미지 리사이즈 (320x320) - 무료 도구",
      ja: "Instagramプロフィール用画像リサイズ (320x320) - 無料ツール",
    },
    description: {
      en: "Resize your profile picture to the perfect Instagram profile size (320x320). Make a great first impression.",
      ko: "완벽한 인스타그램 프로필 크기(320x320)로 프로필 사진을 리사이즈하세요. 좋은 첫인상을 만드세요.",
      ja: "完璧なInstagramプロフィールサイズ(320x320)にプロフィール写真をリサイズ。素晴らしい第一印象を。",
    },
    keywords: {
      en: [
        "instagram profile size",
        "instagram profile picture",
        "320x320 profile",
        "instagram avatar size",
      ],
      ko: [
        "인스타그램 프로필 크기",
        "인스타그램 프로필 사진",
        "320x320 프로필",
      ],
      ja: [
        "Instagramプロフィールサイズ",
        "Instagramプロフィール写真",
        "320x320プロフィール",
      ],
    },
  },
];

// 플랫폼별 타겟 - Facebook, Twitter, YouTube
const socialMediaTargets: ResizeTarget[] = [
  {
    slug: "resize-image-for-facebook-post",
    type: "platform",
    targetWidth: 1200,
    targetHeight: 630,
    platform: "Facebook",
    title: {
      en: "Resize Image for Facebook Post (1200x630) - Free Tool",
      ko: "페이스북 포스트용 이미지 리사이즈 (1200x630) - 무료 도구",
      ja: "Facebookポスト用画像リサイズ (1200x630) - 無料ツール",
    },
    description: {
      en: "Resize your images to the optimal Facebook post size (1200x630). Maximize engagement with perfectly sized images.",
      ko: "최적의 페이스북 포스트 크기(1200x630)로 이미지를 리사이즈하세요. 완벽한 크기의 이미지로 참여를 극대화하세요.",
      ja: "最適なFacebookポストサイズ(1200x630)に画像をリサイズ。完璧なサイズの画像でエンゲージメントを最大化。",
    },
    keywords: {
      en: [
        "facebook post size",
        "resize for facebook",
        "1200x630 image",
        "facebook image dimensions",
      ],
      ko: ["페이스북 포스트 크기", "페이스북용 리사이즈", "1200x630 이미지"],
      ja: ["Facebookポストサイズ", "Facebook用リサイズ", "1200x630画像"],
    },
  },
  {
    slug: "resize-image-for-twitter-post",
    type: "platform",
    targetWidth: 1200,
    targetHeight: 675,
    platform: "Twitter/X",
    title: {
      en: "Resize Image for Twitter/X Post (1200x675) - Free Tool",
      ko: "트위터/X 포스트용 이미지 리사이즈 (1200x675) - 무료 도구",
      ja: "Twitter/Xポスト用画像リサイズ (1200x675) - 無料ツール",
    },
    description: {
      en: "Resize your images to the optimal Twitter/X post size (1200x675). Make your tweets stand out with perfectly sized images.",
      ko: "최적의 트위터/X 포스트 크기(1200x675)로 이미지를 리사이즈하세요. 완벽한 크기의 이미지로 트윗을 돋보이게 하세요.",
      ja: "最適なTwitter/Xポストサイズ(1200x675)に画像をリサイズ。完璧なサイズの画像でツイートを目立たせる。",
    },
    keywords: {
      en: [
        "twitter post size",
        "resize for twitter",
        "1200x675 image",
        "x post dimensions",
      ],
      ko: ["트위터 포스트 크기", "트위터용 리사이즈", "X 포스트 크기"],
      ja: ["Twitterポストサイズ", "Twitter用リサイズ", "Xポストサイズ"],
    },
  },
  {
    slug: "resize-image-for-youtube-thumbnail",
    type: "platform",
    targetWidth: 1280,
    targetHeight: 720,
    platform: "YouTube",
    title: {
      en: "Resize Image for YouTube Thumbnail (1280x720) - Free Tool",
      ko: "유튜브 썸네일용 이미지 리사이즈 (1280x720) - 무료 도구",
      ja: "YouTubeサムネイル用画像リサイズ (1280x720) - 無料ツール",
    },
    description: {
      en: "Resize your images to the perfect YouTube thumbnail size (1280x720). Create eye-catching thumbnails that drive clicks.",
      ko: "완벽한 유튜브 썸네일 크기(1280x720)로 이미지를 리사이즈하세요. 클릭을 유도하는 눈에 띄는 썸네일을 만드세요.",
      ja: "完璧なYouTubeサムネイルサイズ(1280x720)に画像をリサイズ。クリックを促す目を引くサムネイルを作成。",
    },
    keywords: {
      en: [
        "youtube thumbnail size",
        "resize for youtube",
        "1280x720 thumbnail",
        "youtube image dimensions",
      ],
      ko: ["유튜브 썸네일 크기", "유튜브용 리사이즈", "1280x720 썸네일"],
      ja: [
        "YouTubeサムネイルサイズ",
        "YouTube用リサイズ",
        "1280x720サムネイル",
      ],
    },
  },
  {
    slug: "resize-image-for-og-image",
    type: "platform",
    targetWidth: 1200,
    targetHeight: 630,
    platform: "Open Graph",
    title: {
      en: "Resize Image for OG Image / Social Share (1200x630) - Free Tool",
      ko: "OG 이미지 / 소셜 공유용 이미지 리사이즈 (1200x630) - 무료 도구",
      ja: "OG画像 / ソーシャルシェア用画像リサイズ (1200x630) - 無料ツール",
    },
    description: {
      en: "Resize your images for Open Graph (OG) sharing (1200x630). Ensure your links look perfect when shared on social media.",
      ko: "Open Graph(OG) 공유용(1200x630)으로 이미지를 리사이즈하세요. 소셜 미디어에서 공유할 때 링크가 완벽하게 보이도록 하세요.",
      ja: "Open Graph(OG)シェア用(1200x630)に画像をリサイズ。ソーシャルメディアで共有時にリンクが完璧に見えるように。",
    },
    keywords: {
      en: [
        "og image size",
        "open graph image",
        "social share image",
        "1200x630 og",
      ],
      ko: ["og 이미지 크기", "오픈 그래프 이미지", "소셜 공유 이미지"],
      ja: ["og画像サイズ", "オープングラフ画像", "ソーシャルシェア画像"],
    },
  },
];

// 파비콘 타겟
const faviconTargets: ResizeTarget[] = [
  {
    slug: "resize-image-for-favicon-32",
    type: "platform",
    targetWidth: 32,
    targetHeight: 32,
    platform: "Favicon",
    title: {
      en: "Resize Image for Favicon 32x32 - Free Online Tool",
      ko: "파비콘 32x32용 이미지 리사이즈 - 무료 온라인 도구",
      ja: "ファビコン32x32用画像リサイズ - 無料オンラインツール",
    },
    description: {
      en: "Resize your image to 32x32 pixels for favicon use. The standard size for browser tab icons.",
      ko: "파비콘용으로 이미지를 32x32 픽셀로 리사이즈하세요. 브라우저 탭 아이콘의 표준 크기입니다.",
      ja: "ファビコン用に画像を32x32ピクセルにリサイズ。ブラウザタブアイコンの標準サイズ。",
    },
    keywords: {
      en: ["favicon 32x32", "favicon size", "browser icon", "tab icon size"],
      ko: ["파비콘 32x32", "파비콘 크기", "브라우저 아이콘"],
      ja: ["ファビコン 32x32", "ファビコンサイズ", "ブラウザアイコン"],
    },
  },
  {
    slug: "resize-image-for-favicon-192",
    type: "platform",
    targetWidth: 192,
    targetHeight: 192,
    platform: "Favicon",
    title: {
      en: "Resize Image for Favicon 192x192 (Android) - Free Tool",
      ko: "파비콘 192x192 (Android)용 이미지 리사이즈 - 무료 도구",
      ja: "ファビコン192x192 (Android)用画像リサイズ - 無料ツール",
    },
    description: {
      en: "Resize your image to 192x192 pixels for Android home screen icons. Required for PWA manifest.",
      ko: "Android 홈 화면 아이콘용으로 이미지를 192x192 픽셀로 리사이즈하세요. PWA 매니페스트에 필요합니다.",
      ja: "Androidホーム画面アイコン用に画像を192x192ピクセルにリサイズ。PWAマニフェストに必要。",
    },
    keywords: {
      en: ["favicon 192x192", "android icon", "pwa icon", "manifest icon"],
      ko: ["파비콘 192x192", "안드로이드 아이콘", "PWA 아이콘"],
      ja: ["ファビコン 192x192", "Androidアイコン", "PWAアイコン"],
    },
  },
  {
    slug: "resize-image-for-favicon-512",
    type: "platform",
    targetWidth: 512,
    targetHeight: 512,
    platform: "Favicon",
    title: {
      en: "Resize Image for Favicon 512x512 (PWA) - Free Tool",
      ko: "파비콘 512x512 (PWA)용 이미지 리사이즈 - 무료 도구",
      ja: "ファビコン512x512 (PWA)用画像リサイズ - 無料ツール",
    },
    description: {
      en: "Resize your image to 512x512 pixels for PWA splash screens. The largest icon size for Progressive Web Apps.",
      ko: "PWA 스플래시 화면용으로 이미지를 512x512 픽셀로 리사이즈하세요. Progressive Web App의 가장 큰 아이콘 크기입니다.",
      ja: "PWAスプラッシュスクリーン用に画像を512x512ピクセルにリサイズ。Progressive Web Appの最大アイコンサイズ。",
    },
    keywords: {
      en: [
        "favicon 512x512",
        "pwa splash",
        "app icon 512",
        "progressive web app icon",
      ],
      ko: ["파비콘 512x512", "PWA 스플래시", "앱 아이콘 512"],
      ja: ["ファビコン 512x512", "PWAスプラッシュ", "アプリアイコン 512"],
    },
  },
];

// 모든 타겟 합치기
export const allResizeTargets: ResizeTarget[] = [
  ...fileSizeTargets,
  ...squareDimensionTargets,
  ...widescreenDimensionTargets,
  ...instagramTargets,
  ...socialMediaTargets,
  ...faviconTargets,
];

// 슬러그로 타겟 찾기
export function getResizeTargetBySlug(slug: string): ResizeTarget | undefined {
  return allResizeTargets.find((target) => target.slug === slug);
}

// 모든 슬러그 가져오기
export function getAllResizeTargetSlugs(): string[] {
  return allResizeTargets.map((target) => target.slug);
}

// 타입별 타겟 가져오기
export function getResizeTargetsByType(
  type: ResizeTarget["type"],
): ResizeTarget[] {
  return allResizeTargets.filter((target) => target.type === type);
}

// 플랫폼별 타겟 가져오기
export function getResizeTargetsByPlatform(platform: string): ResizeTarget[] {
  return allResizeTargets.filter((target) => target.platform === platform);
}

// 관련 타겟 가져오기
export function getRelatedResizeTargets(
  currentSlug: string,
  limit: number = 4,
): ResizeTarget[] {
  const current = getResizeTargetBySlug(currentSlug);
  if (!current) return [];

  return allResizeTargets
    .filter(
      (target) => target.slug !== currentSlug && target.type === current.type,
    )
    .slice(0, limit);
}
