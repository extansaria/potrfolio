const normalizeBaseUrl = (value) => {
  if (!value || typeof value !== 'string') {
    return null;
  }

  const trimmed = value.trim();
  if (!trimmed || trimmed === '.' || trimmed === './') {
    return null;
  }

  return trimmed.replace(/\/$/, '');
};

const isGithubPagesHost = () =>
  typeof window !== 'undefined' && window.location.hostname.includes('github.io');

export const getBackendUrl = () => {
  const fromEnv = normalizeBaseUrl(process.env.REACT_APP_BACKEND_URL);
  if (fromEnv) {
    return fromEnv;
  }

  if (process.env.NODE_ENV === 'production') {
    // On GitHub Pages there is no reverse proxy (/api), so an external backend URL is required.
    if (isGithubPagesHost()) {
      return null;
    }

    // Docker/Nginx production: frontend and backend share host via /api proxy.
    return '';
  }

  return 'http://localhost:3001';
};

export const BACKEND_URL = getBackendUrl();
export const isExternalBackendRequired = BACKEND_URL === null;

export const buildApiUrl = (path) => {
  if (isExternalBackendRequired) {
    return null;
  }

  return `${BACKEND_URL}${path}`;
};
