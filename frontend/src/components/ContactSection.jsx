import React, { useState } from 'react';
import { Send, Loader2, CheckCircle, AlertCircle, Mail, MessageSquare, User } from 'lucide-react';
import { personalInfo } from '../data/mock';
import { callPublicApi } from '../utils/backendUrl';
const REQUEST_TIMEOUT_MS = 12000;

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [status, setStatus] = useState('idle'); // idle, loading, success, error
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');
    let timeoutId;

    // Пока используем mock для демонстрации
    // Будет заменено на реальный API
    try {
      // Валидация
      if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
        throw new Error('Пожалуйста, заполните все поля');
      }

      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        throw new Error('Введите корректный email');
      }

      // Отправка на backend
      const controller = new AbortController();
      timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

      const response = await callPublicApi('/api/contact', {
        method: 'POST',
        body: formData,
        signal: controller.signal
      });
      // Проверяем Content-Type перед парсингом JSON
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        const text = await response.text();
        console.error('Backend вернул не JSON:', text.substring(0, 200));
        throw new Error('Сервер недоступен. Проверьте доступность backend API.');
      }

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Ошибка при отправке сообщения');
      }
      
      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
      
      // Сброс статуса через 3 секунды
      setTimeout(() => setStatus('idle'), 3000);
    } catch (error) {
      if (error.name === 'AbortError') {
        setStatus('error');
        setErrorMessage('Сервер долго не отвечает. Попробуйте еще раз.');
        setTimeout(() => setStatus('idle'), 3000);
        return;
      }

      setStatus('error');
      setErrorMessage(error.message || 'Ошибка при отправке');
      setTimeout(() => setStatus('idle'), 3000);
    } finally {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    }
  };

  return (
    <section id="contact" className="py-20 md:py-32 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Заголовок секции */}
        <div className="text-center mb-16">
          <span className="text-cyan-400 text-sm font-mono mb-4 block">{''}</span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Связь со мной</h2>
          <p className="text-gray-400 max-w-xl mx-auto">
            Если у вас есть вопросы или предложения, я всегда открыт для общения.
            Сообщение придёт мне напрямую в Telegram.
          </p>
        </div>

        {/* Форма */}
        <div className="p-8 rounded-3xl bg-white/5 border border-white/10">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid sm:grid-cols-2 gap-6">
              {/* Имя */}
              <div className="space-y-2">
                <label className="text-sm text-gray-400 flex items-center gap-2">
                  <User size={14} />
                  Ваше имя
                </label>
                <input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Иван Иванов"
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-gray-500 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all"
                />
              </div>

              {/* Email */}
              <div className="space-y-2">
                <label className="text-sm text-gray-400 flex items-center gap-2">
                  <Mail size={14} />
                  Email
                </label>
                <input
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="ivan@example.com"
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-gray-500 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all"
                />
              </div>
            </div>

            {/* Сообщение */}
            <div className="space-y-2">
              <label className="text-sm text-gray-400 flex items-center gap-2">
                <MessageSquare size={14} />
                Сообщение
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Напишите ваше сообщение..."
                rows={5}
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-gray-500 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 resize-none transition-all"
              />
            </div>

            {/* Кнопка отправки */}
            <button
              type="submit"
              disabled={status === 'loading'}
              className="w-full py-6 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white font-semibold rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/25 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {status === 'loading' ? (
                <>
                  <Loader2 size={20} className="animate-spin mr-2" />
                  Отправка...
                </>
              ) : status === 'success' ? (
                <>
                  <CheckCircle size={20} className="mr-2" />
                  Отправлено!
                </>
              ) : status === 'error' ? (
                <>
                  <AlertCircle size={20} className="mr-2" />
                  {errorMessage}
                </>
              ) : (
                <>
                  <Send size={20} className="mr-2" />
                  Отправить сообщение
                </>
              )}
            </button>
          </form>

          {/* Альтернативные контакты */}
          <div className="mt-8 pt-8 border-t border-white/10 text-center">
            <p className="text-gray-500 text-sm mb-4">Или свяжитесь напрямую:</p>
            <div className="flex items-center justify-center gap-6 flex-wrap">
              <a 
                href={`mailto:${personalInfo.email}`}
                className="text-gray-400 hover:text-cyan-400 transition-colors text-sm"
              >
                {personalInfo.email}
              </a>
              <span className="text-gray-600 hidden sm:block">•</span>
              <a 
                href={`https://t.me/${personalInfo.telegram.replace('@', '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-cyan-400 transition-colors text-sm"
              >
                {personalInfo.telegram}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;