export const optimizeImage = (url) => {
  if (!url || typeof url !== 'string') return url;
  if (url.includes('cloudinary.com') && url.includes('/upload/') && !url.includes('f_auto,q_auto')) {
    return url.replace('/upload/', '/upload/f_auto,q_auto/');
  }
  return url;
};
