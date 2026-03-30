import React, { useState, useEffect } from 'react';
import { Calendar, Clock, MapPin, Users, Send, Loader2, CheckCircle, AlertCircle, User, Mail, Phone } from 'lucide-react';
import { upcomingEvents, eventStatuses } from '../data/events';

// Определяем URL backend в зависимости от окружения
// В production (Docker) nginx проксирует запросы, поэтому используем относительный путь
// В development используем полный URL
const getBackendUrl = () => {
  if (process.env.NODE_ENV === 'production') {
    // В production nginx проксирует /api/ к backend
    return '';
  }
  // В development используем localhost
  return process.env.REACT_APP_BACKEND_URL || 'http://localhost:3001';
};

const BACKEND_URL = getBackendUrl();
const REQUEST_TIMEOUT_MS = 12000;

const EventsSection = () => {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [events, setEvents] = useState(upcomingEvents);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    comment: ''
  });
  const [status, setStatus] = useState('idle'); // idle, loading, success, error
  const [errorMessage, setErrorMessage] = useState('');

  // Загрузка актуального количества регистраций
  useEffect(() => {
    const fetchEventStats = async () => {
      try {
        const response = await fetch(`${BACKEND_URL}/api/event-stats`);
        if (response.ok) {
          const data = await response.json();
          if (data.success && data.events) {
            setEvents(prevEvents => 
              prevEvents.map(event => {
                const stats = data.events.find(e => e.id === event.id);
                return stats ? { ...event, registeredCount: stats.registeredCount } : event;
              })
            );
          }
        }
      } catch (error) {
        console.error('Ошибка загрузки статистики событий:', error);
      }
    };

    fetchEventStats();
    // Обновляем каждые 30 секунд
    const interval = setInterval(fetchEventStats, 30000);
    return () => clearInterval(interval);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleRegister = (event) => {
    setSelectedEvent(event);
    setFormData({ name: '', email: '', phone: '', comment: '' });
    setStatus('idle');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');
    let timeoutId;

    try {
      // Валидация
      if (!formData.name.trim() || !formData.email.trim() || !formData.phone.trim()) {
        throw new Error('Пожалуйста, заполните все обязательные поля');
      }

      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        throw new Error('Введите корректный email');
      }

      if (!/^[\d\s+()-]+$/.test(formData.phone)) {
        throw new Error('Введите корректный номер телефона');
      }

      // Отправка на backend
      const controller = new AbortController();
      timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

      const response = await fetch(`${BACKEND_URL}/api/event-register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          eventId: selectedEvent.id,
          eventTitle: selectedEvent.title,
          eventDate: selectedEvent.date,
          eventTime: selectedEvent.time,
          eventLocation: selectedEvent.location
        }),
        signal: controller.signal
      });

      // Проверяем, что ответ - это JSON
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        const text = await response.text();
        console.error('Backend вернул не JSON:', text.substring(0, 200));
        throw new Error('Сервер недоступен. Убедитесь, что backend запущен.');
      }

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Ошибка при регистрации');
      }
      
      setStatus('success');
      setFormData({ name: '', email: '', phone: '', comment: '' });
      
      // Обновить счётчик мест
      setEvents(prevEvents => 
        prevEvents.map(event => 
          event.id === selectedEvent.id 
            ? { ...event, registeredCount: event.registeredCount + 1 }
            : event
        )
      );
      
      // Закрыть модалку через 3 секунды
      setTimeout(() => {
        setStatus('idle');
        setSelectedEvent(null);
      }, 3000);
    } catch (error) {
      if (error.name === 'AbortError') {
        setStatus('error');
        setErrorMessage('Сервер долго не отвечает. Попробуйте еще раз.');
        setTimeout(() => setStatus('idle'), 4000);
        return;
      }

      setStatus('error');
      setErrorMessage(error.message || 'Ошибка при регистрации');
      setTimeout(() => setStatus('idle'), 4000);
    } finally {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    }
  };

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('ru-RU', { 
      day: 'numeric', 
      month: 'long', 
      year: 'numeric' 
    });
  };

  return (
    <section id="events" className="py-20 md:py-32 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Заголовок секции */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Предстоящие мероприятия</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Делюсь опытом и знаниями на воркшопах и встречах
          </p>
        </div>

        {/* Список событий */}
        <div className="space-y-6">
          {events.map((event) => {
            const statusInfo = eventStatuses[event.status];
            
            return (
              <div 
                key={event.id}
                className="group relative overflow-hidden rounded-3xl bg-white/5 border border-white/10 hover:border-cyan-500/30 transition-all duration-300"
              >
                <div className="flex flex-col md:flex-row gap-6">
                  {/* Изображение события */}
                  <div className="md:w-2/5 relative">
                    <div className="relative h-64 md:h-full overflow-hidden rounded-t-3xl md:rounded-l-3xl md:rounded-tr-none">
                      <img 
                        src={event.image} 
                        alt={event.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      
                      {/* Статус события */}
                      <div className="absolute top-4 left-4">
                        <span className={`px-4 py-2 rounded-full text-sm font-medium backdrop-blur-md ${
                          statusInfo.color === 'green' 
                            ? 'bg-green-500/20 text-green-300 border border-green-500/30' 
                            : statusInfo.color === 'red'
                            ? 'bg-red-500/20 text-red-300 border border-red-500/30'
                            : 'bg-gray-500/20 text-gray-300 border border-gray-500/30'
                        }`}>
                          {statusInfo.label}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Информация о событии */}
                  <div className="md:w-3/5 p-6 md:p-8">
                    <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-cyan-400 transition-colors">
                      {event.title}
                    </h3>

                    <p className="text-gray-400 mb-6 leading-relaxed">
                      {event.description}
                    </p>

                    {/* Детали события */}
                    <div className="grid sm:grid-cols-2 gap-4 mb-6">
                      <div className="flex items-start gap-3">
                        <div className="p-2 rounded-lg bg-cyan-500/10 shrink-0">
                          <Calendar size={18} className="text-cyan-400" />
                        </div>
                        <div>
                          <span className="text-xs text-gray-500 block">Дата</span>
                          <span className="text-white text-sm font-medium">{formatDate(event.date)}</span>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <div className="p-2 rounded-lg bg-purple-500/10 shrink-0">
                          <Clock size={18} className="text-purple-400" />
                        </div>
                        <div>
                          <span className="text-xs text-gray-500 block">Время</span>
                          <span className="text-white text-sm font-medium">{event.time} ({event.duration})</span>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <div className="p-2 rounded-lg bg-pink-500/10 shrink-0">
                          <MapPin size={18} className="text-pink-400" />
                        </div>
                        <div>
                          <span className="text-xs text-gray-500 block">Место</span>
                          <span className="text-white text-sm font-medium">{event.location}</span>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <div className="p-2 rounded-lg bg-green-500/10 shrink-0">
                          <Users size={18} className="text-green-400" />
                        </div>
                        <div>
                          <span className="text-xs text-gray-500 block">Места</span>
                          <span className="text-white text-sm font-medium">
                            {event.seats - event.registeredCount} из {event.seats}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Темы */}
                    <div className="mb-6">
                      <span className="text-xs text-gray-500 block mb-3">Что будем обсуждать:</span>
                      <div className="flex flex-wrap gap-2">
                        {event.topics.map((topic, index) => (
                          <span 
                            key={index}
                            className="px-3 py-1 text-xs font-mono text-cyan-400 bg-cyan-500/10 rounded-full border border-cyan-500/20"
                          >
                            {topic}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Кнопка регистрации */}
                    {event.status === 'open' && (
                      <button
                        onClick={() => handleRegister(event)}
                        className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white font-semibold rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/25"
                      >
                        Зарегистрироваться на событие
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Модальное окно регистрации */}
      {selectedEvent && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          onClick={() => status !== 'loading' && setSelectedEvent(null)}
        >
          <div 
            className="relative max-w-2xl w-full bg-[#0a0a0f] rounded-3xl border border-white/10 p-8 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Заголовок модалки */}
            <div className="mb-6">
              <h3 className="text-2xl font-bold text-white mb-2">Регистрация на событие</h3>
              <p className="text-cyan-400 text-sm">{selectedEvent.title}</p>
            </div>

            {status !== 'success' ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  {/* Имя */}
                  <div className="space-y-2">
                    <label className="text-sm text-gray-400 flex items-center gap-2">
                      <User size={14} />
                      Ваше имя <span className="text-red-400">*</span>
                    </label>
                    <input
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Иван Иванов"
                      required
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-gray-500 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all"
                    />
                  </div>

                  {/* Email */}
                  <div className="space-y-2">
                    <label className="text-sm text-gray-400 flex items-center gap-2">
                      <Mail size={14} />
                      Email <span className="text-red-400">*</span>
                    </label>
                    <input
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="ivan@example.com"
                      required
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-gray-500 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all"
                    />
                  </div>
                </div>

                {/* Телефон */}
                <div className="space-y-2">
                  <label className="text-sm text-gray-400 flex items-center gap-2">
                    <Phone size={14} />
                    Телефон <span className="text-red-400">*</span>
                  </label>
                  <input
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+7 (999) 123-45-67"
                    required
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-gray-500 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all"
                  />
                </div>

                {/* Комментарий */}
                <div className="space-y-2">
                  <label className="text-sm text-gray-400 flex items-center gap-2">
                    Комментарий (необязательно)
                  </label>
                  <textarea
                    name="comment"
                    value={formData.comment}
                    onChange={handleChange}
                    placeholder="Есть ли у вас вопросы или пожелания к мероприятию?"
                    rows={3}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-gray-500 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 resize-none transition-all"
                  />
                </div>

                {/* Кнопки */}
                <div className="flex gap-4 pt-4">
                  <button
                    type="button"
                    onClick={() => setSelectedEvent(null)}
                    disabled={status === 'loading'}
                    className="flex-1 px-6 py-3 bg-white/5 border border-white/10 text-white rounded-xl hover:bg-white/10 transition-all disabled:opacity-50"
                  >
                    Отмена
                  </button>
                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="flex-1 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white font-semibold rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/25 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {status === 'loading' ? (
                      <>
                        <Loader2 size={18} className="animate-spin" />
                        Отправка...
                      </>
                    ) : status === 'error' ? (
                      <>
                        <AlertCircle size={18} />
                        Ошибка
                      </>
                    ) : (
                      <>
                        <Send size={18} />
                        Зарегистрироваться
                      </>
                    )}
                  </button>
                </div>

                {/* Сообщение об ошибке */}
                {status === 'error' && (
                  <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 text-sm">
                    {errorMessage}
                  </div>
                )}
              </form>
            ) : (
              // Успешная регистрация
              <div className="text-center py-8">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-500/20 border border-green-500/30 mb-4">
                  <CheckCircle size={32} className="text-green-400" />
                </div>
                <h4 className="text-xl font-bold text-white mb-2">Регистрация успешна!</h4>
                <p className="text-gray-400 mb-4">
                  Подтверждение отправлено на ваш email и в Telegram организатора.
                </p>
                <p className="text-sm text-cyan-400">
                  До встречи на мероприятии!
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
};

export default EventsSection;

