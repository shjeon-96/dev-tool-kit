export interface IconSize {
  name: string;
  size: number;
  scale?: number;
  filename: string;
}

export interface IconPlatform {
  name: string;
  id: string;
  sizes: IconSize[];
}

export const iconPlatforms: IconPlatform[] = [
  {
    name: "iOS",
    id: "ios",
    sizes: [
      { name: "iPhone Notification", size: 20, scale: 2, filename: "Icon-20@2x.png" },
      { name: "iPhone Notification", size: 20, scale: 3, filename: "Icon-20@3x.png" },
      { name: "iPhone Settings", size: 29, scale: 2, filename: "Icon-29@2x.png" },
      { name: "iPhone Settings", size: 29, scale: 3, filename: "Icon-29@3x.png" },
      { name: "iPhone Spotlight", size: 40, scale: 2, filename: "Icon-40@2x.png" },
      { name: "iPhone Spotlight", size: 40, scale: 3, filename: "Icon-40@3x.png" },
      { name: "iPhone App", size: 60, scale: 2, filename: "Icon-60@2x.png" },
      { name: "iPhone App", size: 60, scale: 3, filename: "Icon-60@3x.png" },
      { name: "iPad Notification", size: 20, scale: 1, filename: "Icon-20.png" },
      { name: "iPad Notification", size: 20, scale: 2, filename: "Icon-20@2x-ipad.png" },
      { name: "iPad Settings", size: 29, scale: 1, filename: "Icon-29.png" },
      { name: "iPad Settings", size: 29, scale: 2, filename: "Icon-29@2x-ipad.png" },
      { name: "iPad Spotlight", size: 40, scale: 1, filename: "Icon-40.png" },
      { name: "iPad Spotlight", size: 40, scale: 2, filename: "Icon-40@2x-ipad.png" },
      { name: "iPad App", size: 76, scale: 1, filename: "Icon-76.png" },
      { name: "iPad App", size: 76, scale: 2, filename: "Icon-76@2x.png" },
      { name: "iPad Pro", size: 83.5, scale: 2, filename: "Icon-83.5@2x.png" },
      { name: "App Store", size: 1024, scale: 1, filename: "Icon-1024.png" },
    ],
  },
  {
    name: "Android",
    id: "android",
    sizes: [
      { name: "LDPI", size: 36, filename: "mipmap-ldpi/ic_launcher.png" },
      { name: "MDPI", size: 48, filename: "mipmap-mdpi/ic_launcher.png" },
      { name: "HDPI", size: 72, filename: "mipmap-hdpi/ic_launcher.png" },
      { name: "XHDPI", size: 96, filename: "mipmap-xhdpi/ic_launcher.png" },
      { name: "XXHDPI", size: 144, filename: "mipmap-xxhdpi/ic_launcher.png" },
      { name: "XXXHDPI", size: 192, filename: "mipmap-xxxhdpi/ic_launcher.png" },
      { name: "Play Store", size: 512, filename: "playstore-icon.png" },
    ],
  },
  {
    name: "Favicon",
    id: "favicon",
    sizes: [
      { name: "Favicon 16", size: 16, filename: "favicon-16x16.png" },
      { name: "Favicon 32", size: 32, filename: "favicon-32x32.png" },
      { name: "Apple Touch", size: 180, filename: "apple-touch-icon.png" },
      { name: "Android Chrome 192", size: 192, filename: "android-chrome-192x192.png" },
      { name: "Android Chrome 512", size: 512, filename: "android-chrome-512x512.png" },
      { name: "MS Tile", size: 150, filename: "mstile-150x150.png" },
    ],
  },
];

export function getActualSize(iconSize: IconSize): number {
  return iconSize.scale ? Math.round(iconSize.size * iconSize.scale) : iconSize.size;
}
