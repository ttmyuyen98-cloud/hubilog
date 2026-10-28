/**
 * Reads a File object and converts it to a base64 Data URL.
 * Automatically checks file size and handles JPEG, PNG, WEBP, SVG.
 */
export function readFileAsDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    // Validate file type
    if (!file.type.startsWith('image/')) {
      reject(new Error('Vui lòng chọn một tệp hình ảnh hợp lệ (PNG, JPG, WEBP, SVG)'));
      return;
    }

    // Limit to 5MB
    if (file.size > 5 * 1024 * 1024) {
      reject(new Error('Kích thước ảnh không được vượt quá 5MB'));
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        resolve(reader.result);
      } else {
        reject(new Error('Không thể đọc dữ liệu tệp'));
      }
    };
    reader.onerror = () => {
      reject(new Error('Đã xảy ra lỗi khi đọc tệp'));
    };
    reader.readAsDataURL(file);
  });
}

/**
 * Validates whether a string is a valid image URL or data URI.
 */
export function isValidImageUrl(url: string): boolean {
  if (!url || typeof url !== 'string') return false;
  const trimmed = url.trim();
  if (trimmed.startsWith('data:image/')) return true;
  if (trimmed.startsWith('./') || trimmed.startsWith('/')) return true;
  try {
    const parsed = new URL(trimmed);
    return parsed.protocol === 'http:' || parsed.protocol === 'https:';
  } catch {
    return false;
  }
}
