/**
 * Fallback Module
 *
 * Safari/Firefox 등 File System Access API를 지원하지 않는 브라우저용 폴백
 */

export {
  downloadAsZip,
  downloadFile,
  createZipBlob,
  readZipFile,
} from "./zip-fallback";
