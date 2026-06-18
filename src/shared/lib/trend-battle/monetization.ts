type PublicLaunchEnv = Record<string, string | undefined>;

const adsenseClientPattern = /^ca-pub-\d+$/;

export function getGoogleAdsenseClient(env: PublicLaunchEnv = process.env) {
  const client = env.NEXT_PUBLIC_GOOGLE_ADSENSE_CLIENT?.trim();

  if (!client) return undefined;

  if (!adsenseClientPattern.test(client)) {
    throw new Error(
      "NEXT_PUBLIC_GOOGLE_ADSENSE_CLIENT must match ca-pub-<digits>",
    );
  }

  return client;
}

export function getGoogleSiteVerification(env: PublicLaunchEnv = process.env) {
  const token = env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION?.trim();

  return token || undefined;
}
