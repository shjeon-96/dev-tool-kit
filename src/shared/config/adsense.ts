export const ADSENSE_CLIENT_ID = "ca-pub-4981986991458105";
export const GOOGLE_ADS_PRIVACY_URL =
  "https://policies.google.com/technologies/ads";
export const GOOGLE_ADS_SETTINGS_URL = "https://myadcenter.google.com/";

const ADSENSE_PUBLISHER_ID = ADSENSE_CLIENT_ID.replace(/^ca-/, "");

export const ADS_TXT_CONTENT = `google.com, ${ADSENSE_PUBLISHER_ID}, DIRECT, f08c47fec0942fa0\n`;
