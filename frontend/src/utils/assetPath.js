const getGithubPagesBase = () => {
  if (typeof window === 'undefined') {
    return '';
  }

  if (!window.location.hostname.includes('github.io')) {
    return '';
  }

  const firstSegment = window.location.pathname.split('/').filter(Boolean)[0];
  return firstSegment ? `/${firstSegment}` : '';
};

export const toAssetUrl = (assetPath) => {
  if (!assetPath || typeof assetPath !== 'string') {
    return assetPath;
  }

  if (/^(https?:)?\/\//.test(assetPath) || assetPath.startsWith('data:')) {
    return assetPath;
  }

  const normalizedPath = assetPath.startsWith('/') ? assetPath : `/${assetPath}`;
  const basePath = process.env.PUBLIC_URL || getGithubPagesBase();
  return `${basePath}${normalizedPath}`;
};
