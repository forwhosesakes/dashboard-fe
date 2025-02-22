type FileSizeUnit = 'بايت' | 'كيلوبايت' | 'ميجابايت' | 'جيجابايت' | 'تيرابايت';

export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 بايت';

  const units: FileSizeUnit[] = ['بايت', 'كيلوبايت', 'ميجابايت', 'جيجابايت', 'تيرابايت'];
  const k = 1024;
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  const size = parseFloat((bytes / Math.pow(k, i)).toFixed(2));
  

  return `${size} ${units[i]}`;
};

