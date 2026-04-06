import React, { useState, useEffect } from 'react';
import { 
  Lock, LogOut, Calendar, Users, CheckCircle, XCircle, 
  Search, RefreshCw, UserCheck, UserX, Trash2, Home
} from 'lucide-react';
import { buildApiUrl } from '../utils/backendUrl';

const AdminPanel = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [registrations, setRegistrations] = useState([]);
  const [stats, setStats] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Проверка авторизации при загрузке
  useEffect(() => {
    const savedToken = localStorage.getItem('adminToken');
    if (savedToken) {
      setIsAuthenticated(true);
      loadEvents();
    }
  }, []);

  // Загрузка событий
  const loadEvents = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(buildApiUrl('/api/admin/events'), {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        setEvents(data.events);
        if (data.events.length > 0 && !selectedEvent) {
          setSelectedEvent(data.events[0]);
        }
      } else if (response.status === 401) {
        handleLogout();
      }
    } catch (error) {
      console.error('Ошибка загрузки событий:', error);
    }
  };

  // Загрузка регистраций события
  const loadRegistrations = async (eventId) => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(buildApiUrl(`/api/admin/registrations/${eventId}`), {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        setRegistrations(data.registrations);
      } else if (response.status === 401) {
        handleLogout();
      }
    } catch (error) {
      console.error('Ошибка загрузки регистраций:', error);
    }
  };

  // Загрузка статистики
  const loadStats = async (eventId) => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(buildApiUrl(`/api/admin/stats/${eventId}`), {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        setStats(data.stats);
      }
    } catch (error) {
      console.error('Ошибка загрузки статистики:', error);
    }
  };

  // Авторизация
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch(buildApiUrl('/api/admin/login'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ password })
      });

      const data = await response.json();

      if (data.success) {
        localStorage.setItem('adminToken', data.token);
        setIsAuthenticated(true);
        loadEvents();
      } else {
        setError(data.error || 'Неверный пароль');
      }
    } catch (error) {
      setError('Ошибка подключения к серверу');
    } finally {
      setLoading(false);
    }
  };

  // Выход
  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    setIsAuthenticated(false);
    setSelectedEvent(null);
    setRegistrations([]);
    setStats(null);
    setPassword('');
  };

  const goToPortfolio = () => {
    const { protocol, hostname } = window.location;
    window.location.href = `${protocol}//${hostname}`;
  };

  // Выбор события
  useEffect(() => {
    if (selectedEvent) {
      loadRegistrations(selectedEvent.id);
      loadStats(selectedEvent.id);
    }
  }, [selectedEvent]);

  // Отметить как пришедшего
  const handleCheckIn = async (registrationId) => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(buildApiUrl(`/api/admin/check-in/${registrationId}`), {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        if (selectedEvent) {
          loadRegistrations(selectedEvent.id);
          loadStats(selectedEvent.id);
        }
      }
    } catch (error) {
      console.error('Ошибка отметки участника:', error);
    }
  };

  // Убрать отметку
  const handleCheckOut = async (registrationId) => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(buildApiUrl(`/api/admin/check-out/${registrationId}`), {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        if (selectedEvent) {
          loadRegistrations(selectedEvent.id);
          loadStats(selectedEvent.id);
        }
      }
    } catch (error) {
      console.error('Ошибка снятия отметки:', error);
    }
  };

  // Удалить участника
  const handleDelete = async (registrationId) => {
    if (!window.confirm('Вы уверены, что хотите удалить этого участника? Это действие нельзя отменить.')) {
      return;
    }

    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(buildApiUrl(`/api/admin/registrations/${registrationId}`), {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        if (selectedEvent) {
          loadRegistrations(selectedEvent.id);
          loadStats(selectedEvent.id);
        }
      } else {
        const data = await response.json();
        alert(data.error || 'Ошибка при удалении участника');
      }
    } catch (error) {
      console.error('Ошибка удаления участника:', error);
      alert('Ошибка при удалении участника');
    }
  };

  // Фильтрация регистраций
  const filteredRegistrations = registrations.filter(reg => {
    const searchLower = searchTerm.toLowerCase();
    return (
      reg.name.toLowerCase().includes(searchLower) ||
      reg.email.toLowerCase().includes(searchLower) ||
      reg.phone.includes(searchTerm)
    );
  });

  // Форма авторизации
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white/5 border border-white/10 rounded-3xl p-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-cyan-500/10 border border-cyan-500/30 mb-4">
              <Lock size={32} className="text-cyan-400" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">Админ-панель</h2>
            <p className="text-gray-400 text-sm">Введите пароль для доступа</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="text-sm text-gray-400 block mb-2">Пароль</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-gray-500 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all"
                placeholder="Введите пароль"
                required
              />
            </div>

            {error && (
              <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 text-sm">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white font-semibold rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Вход...' : 'Войти'}
            </button>
          </form>
        </div>
      </div>
    );
  }

  // Основной интерфейс админ-панели
  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Заголовок */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Админ-панель</h1>
            <p className="text-gray-400">Управление регистрациями на события</p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={goToPortfolio}
              className="flex items-center gap-2 px-4 py-2 bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 rounded-xl hover:bg-cyan-500/20 transition-all"
            >
              <Home size={18} />
              На сайт портфолио
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-all"
            >
              <LogOut size={18} />
              Выйти
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Боковая панель со списком событий */}
          <div className="lg:col-span-1">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold flex items-center gap-2">
                  <Calendar size={20} />
                  События
                </h2>
                <button
                  onClick={loadEvents}
                  className="p-2 hover:bg-white/10 rounded-lg transition-all"
                  title="Обновить"
                >
                  <RefreshCw size={18} />
                </button>
              </div>
              
              <div className="space-y-2">
                {events.map(event => (
                  <button
                    key={event.id}
                    onClick={() => setSelectedEvent(event)}
                    className={`w-full text-left p-4 rounded-xl transition-all ${
                      selectedEvent?.id === event.id
                        ? 'bg-cyan-500/20 border border-cyan-500/30'
                        : 'bg-white/5 border border-white/10 hover:bg-white/10'
                    }`}
                  >
                    <div className="font-semibold text-white mb-1">{event.title}</div>
                    <div className="text-xs text-gray-400">
                      {new Date(event.date).toLocaleDateString('ru-RU')} в {event.time.slice(0, 5)}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Основная панель с участниками */}
          <div className="lg:col-span-2">
            {selectedEvent ? (
              <>
                {/* Статистика */}
                {stats && (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                    <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                      <div className="text-gray-400 text-sm mb-1">Всего</div>
                      <div className="text-2xl font-bold text-white">{stats.total}</div>
                    </div>
                    <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4">
                      <div className="text-green-400 text-sm mb-1 flex items-center gap-1">
                        <UserCheck size={14} />
                        Пришли
                      </div>
                      <div className="text-2xl font-bold text-green-400">{stats.checkedIn}</div>
                    </div>
                    <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-4">
                      <div className="text-yellow-400 text-sm mb-1 flex items-center gap-1">
                        <UserX size={14} />
                        Не пришли
                      </div>
                      <div className="text-2xl font-bold text-yellow-400">{stats.notCheckedIn}</div>
                    </div>
                    <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-4">
                      <div className="text-blue-400 text-sm mb-1">Свободно</div>
                      <div className="text-2xl font-bold text-blue-400">{stats.availableSeats}</div>
                    </div>
                  </div>
                )}

                {/* Поиск */}
                <div className="bg-white/5 border border-white/10 rounded-xl p-4 mb-6">
                  <div className="relative">
                    <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      placeholder="Поиск по имени, email или телефону..."
                      className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-gray-500 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20"
                    />
                  </div>
                </div>

                {/* Список участников */}
                <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
                  <div className="p-4 border-b border-white/10">
                    <h3 className="text-lg font-bold flex items-center gap-2">
                      <Users size={20} />
                      Участники ({filteredRegistrations.length})
                    </h3>
                  </div>
                  
                  <div className="divide-y divide-white/10 max-h-[600px] overflow-y-auto">
                    {filteredRegistrations.length === 0 ? (
                      <div className="p-8 text-center text-gray-400">
                        {searchTerm ? 'Ничего не найдено' : 'Нет зарегистрированных участников'}
                      </div>
                    ) : (
                      filteredRegistrations.map(reg => (
                        <div
                          key={reg.id}
                          className={`p-4 hover:bg-white/5 transition-all ${
                            reg.checked_in ? 'bg-green-500/5' : ''
                          }`}
                        >
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                <div className="font-semibold text-white">{reg.name}</div>
                                {reg.checked_in && (
                                  <span className="px-2 py-0.5 bg-green-500/20 text-green-300 text-xs rounded-full flex items-center gap-1">
                                    <CheckCircle size={12} />
                                    Пришёл
                                  </span>
                                )}
                              </div>
                              <div className="text-sm text-gray-400 space-y-1">
                                <div>📧 {reg.email}</div>
                                <div>📱 {reg.phone}</div>
                                {reg.comment && (
                                  <div className="mt-2 text-gray-500 italic">💬 {reg.comment}</div>
                                )}
                                <div className="text-xs text-gray-500 mt-2">
                                  Зарегистрирован: {new Date(reg.registered_at).toLocaleString('ru-RU')}
                                  {reg.checked_in_at && (
                                    <> • Пришёл: {new Date(reg.checked_in_at).toLocaleString('ru-RU')}</>
                                  )}
                                </div>
                              </div>
                            </div>
                            
                            <div className="flex gap-2">
                              {reg.checked_in ? (
                                <button
                                  onClick={() => handleCheckOut(reg.id)}
                                  className="px-4 py-2 bg-yellow-500/20 border border-yellow-500/30 text-yellow-300 rounded-lg hover:bg-yellow-500/30 transition-all flex items-center gap-2"
                                >
                                  <XCircle size={16} />
                                  Отменить
                                </button>
                              ) : (
                                <button
                                  onClick={() => handleCheckIn(reg.id)}
                                  className="px-4 py-2 bg-green-500/20 border border-green-500/30 text-green-300 rounded-lg hover:bg-green-500/30 transition-all flex items-center gap-2"
                                >
                                  <CheckCircle size={16} />
                                  Отметить
                                </button>
                              )}
                              <button
                                onClick={() => handleDelete(reg.id)}
                                className="px-4 py-2 bg-red-500/20 border border-red-500/30 text-red-300 rounded-lg hover:bg-red-500/30 transition-all flex items-center gap-2"
                                title="Удалить участника"
                              >
                                <Trash2 size={16} />
                                Удалить
                              </button>
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </>
            ) : (
              <div className="bg-white/5 border border-white/10 rounded-2xl p-12 text-center">
                <Calendar size={48} className="mx-auto mb-4 text-gray-400" />
                <p className="text-gray-400">Выберите событие для просмотра участников</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;

