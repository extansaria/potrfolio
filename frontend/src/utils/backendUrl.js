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

export const getBackendUrl = () => {
  const fromEnv = normalizeBaseUrl(process.env.REACT_APP_BACKEND_URL);
  if (fromEnv) {
    return fromEnv;
  }

  if (process.env.NODE_ENV === 'production') {
    // Docker/Nginx production: frontend and backend share host via /api proxy.
    return '';
  }

  return 'http://localhost:3001';
};

export const BACKEND_URL = getBackendUrl();
export const isExternalBackendRequired = false;
export const isAdminApiAvailable = true;

export const callPublicApi = async (path, options = {}) => {
  const { method = 'GET', body, signal } = options;

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
  return `${BACKEND_URL}${path}`;
};
