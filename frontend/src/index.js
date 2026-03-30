import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

// Автоматический редирект на админку если порт 3000 или в URL есть admin-port
// Проверяем и через window.location.port, и через hostname (для облачных платформ)
const currentPort = window.location.port;
const isAdminPort = currentPort === '3000' || 
                    window.location.hostname.includes('admin') ||
                    window.location.search.includes('admin-port=true');

if (isAdminPort && window.location.pathname === '/') {
  window.location.href = '/admin';
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

