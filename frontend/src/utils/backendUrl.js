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

const GOOGLE_API_URL = normalizeBaseUrl(process.env.REACT_APP_GOOGLE_API_URL);

export const API_MODE = GOOGLE_API_URL ? 'google' : 'backend';

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
export const isExternalBackendRequired = API_MODE === 'backend' && BACKEND_URL === null;
export const isAdminApiAvailable = API_MODE === 'backend' && !isExternalBackendRequired;

export const callPublicApi = (path, options = {}) => {
  const { method = 'GET', body, signal } = options;

  if (API_MODE === 'google') {
    return fetch(GOOGLE_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      signal,
      body: JSON.stringify({
        action: path,
        method,
        payload: body || null
      })
    });
  }

  if (isExternalBackendRequired) {
    return Promise.reject(
      new Error('API не настроен для GitHub Pages. Укажите REACT_APP_GOOGLE_API_URL.')
    );
  }

  return fetch(`${BACKEND_URL}${path}`, {
    method,
    headers: {
      'Content-Type': 'application/json'
    },
    signal,
    body: body ? JSON.stringify(body) : undefined
  });
};

export const buildApiUrl = (path) => {
  if (isExternalBackendRequired) {
    return null;
  }

  return `${BACKEND_URL}${path}`;
};
