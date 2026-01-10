export type {
  Author,
  LocalizedAuthor,
  SocialProfiles,
  CreateAuthorInput,
  UpdateAuthorInput,
} from "./model/types";

export { localizeAuthor, getSocialProfileUrls } from "./model/types";

export {
  getAllAuthors,
  getAuthorBySlug,
  getAuthorById,
  getAuthorsByExpertise,
  getAllAuthorSlugs,
  getFeaturedAuthors,
} from "./model/queries";
