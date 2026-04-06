const getPublicBase = () => {
  if (typeof window !== 'undefined' && window.location.hostname.includes('github.io')) {
    const firstSegment = window.location.pathname.split('/').filter(Boolean)[0];
    return firstSegment ? `/${firstSegment}` : '';
  }

  const rawPublicUrl = process.env.PUBLIC_URL;
  if (rawPublicUrl && rawPublicUrl !== '.' && rawPublicUrl !== './') {
    return rawPublicUrl.replace(/\/$/, '');
  }

  return '';
};

export const toAssetUrl = (assetPath) => {
  if (!assetPath || typeof assetPath !== 'string') {
    return assetPath;
  }

  if (/^(https?:)?\/\//.test(assetPath) || assetPath.startsWith('data:')) {
    return assetPath;
  }

  const normalizedPath = assetPath.startsWith('/') ? assetPath : `/${assetPath}`;
  const basePath = getPublicBase();
  return `${basePath}${normalizedPath}`;
};
