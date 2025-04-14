export const MIME_Types: Record<string, string> = {
  mp4: "video/mp4",
  m4v: "video/mp4",
  mov: "video/quicktime",
  qt: "video/quicktime",
  webm: "video/webm",
  ogv: "video/ogg",
  ogg: "video/ogg",
  avi: "video/x-msvideo",
  wmv: "video/x-ms-wmv",
  flv: "video/x-flv",
  mkv: "video/x-matroska",
  "3gp": "video/3gpp",
  "3g2": "video/3gpp2",
  mpeg: "video/mpeg",
  mpg: "video/mpeg",
  jpg: "image/jpeg",
  jpeg: "image/jpeg",
  png: "image/png",
  gif: "image/gif",
  webp: "image/webp",
  svg: "image/svg+xml",
  svgz: "image/svg+xml",
  bmp: "image/bmp",
  ico: "image/x-icon",
  tif: "image/tiff",
  tiff: "image/tiff",
  avif: "image/avif",
  apng: "image/apng",
  jfif: "image/jpeg",
  pjpeg: "image/jpeg",
  pjp: "image/jpeg",
};

/**
 * Добавляет атрибут type с MIME-типом для всех тегов img в HTML-строке
 * @param htmlText Входной HTML-текст
 * @returns Обработанный HTML-текст с добавленными атрибутами type
 */
export function addMimeTypesToImgTags(htmlText: string): string {
  // Регулярное выражение для поиска тегов img
  const imgTagRegex = /<img\s+([^>]*?)src=["']([^"']+)["']([^>]*?)>/gi;
  
  return htmlText.replace(imgTagRegex, (match, beforeSrc, src, afterSrc) => {
    // Извлекаем расширение файла из URL
    const extension = src.split('.').pop()?.toLowerCase().split(/[#?]/)[0] || '';
    
    // Получаем MIME-тип из нашей коллекции
    const mimeType = MIME_Types[extension] || 'application/octet-stream';
    
    // Проверяем, есть ли уже атрибут type
    const hasTypeAttr = /type=["'][^"']*["']/i.test(match);
    
    // Если атрибут type уже есть, не изменяем его
    if (hasTypeAttr) {
      return match;
    }
    
    // Добавляем атрибут type
    return `<img ${beforeSrc}src="${src}" type="${mimeType}"${afterSrc}>`;
  });
}