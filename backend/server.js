const express = require('express');
const cors = require('cors');
const axios = require('axios');
const { Pool } = require('pg');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Подключение к PostgreSQL
const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgresql://portfolio_user:portfolio_password@localhost:5432/portfolio_db',
  // В Docker PostgreSQL не требует SSL для локальных подключений
  ssl: false
});

// Проверка подключения к БД
pool.on('connect', () => {
  console.log('✅ Подключение к PostgreSQL установлено');
});

pool.on('error', (err) => {
  console.error('❌ Ошибка подключения к PostgreSQL:', err);
});

// Middleware
const allowedOrigins = (process.env.CORS_ORIGINS || '')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow non-browser requests and local tools (no Origin header).
      if (!origin) {
        callback(null, true);
        return;
      }

      if (allowedOrigins.length === 0 || allowedOrigins.includes(origin)) {
        callback(null, true);
        return;
      }

      callback(new Error('CORS policy: origin is not allowed'));
    }
  })
);
app.use(express.json());

// Telegram Bot API URL
const TELEGRAM_API_URL = `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}`;
const CHAT_ID = process.env.TELEGRAM_CHAT_ID;
const TELEGRAM_TIMEOUT_MS = parseInt(process.env.TELEGRAM_TIMEOUT_MS || '8000', 10);
const telegramClient = axios.create({
  timeout: TELEGRAM_TIMEOUT_MS
});

const sendTelegramMessage = async (text) => {
  return telegramClient.post(`${TELEGRAM_API_URL}/sendMessage`, {
    chat_id: CHAT_ID,
    text,
    parse_mode: 'HTML'
  });
};

const initializeDatabase = async () => {
  const initSqlPath = path.join(__dirname, 'init.sql');
  const sql = fs.readFileSync(initSqlPath, 'utf-8');
  await pool.query(sql);
  console.log('✅ База данных инициализирована');
};

// Проверка наличия токенов
if (!process.env.TELEGRAM_BOT_TOKEN || !process.env.TELEGRAM_CHAT_ID) {
  console.error('⚠️  Ошибка: TELEGRAM_BOT_TOKEN и TELEGRAM_CHAT_ID должны быть установлены в .env файле');
}

// Простая авторизация для админ-панели (можно улучшить с JWT)
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123';

// Middleware для проверки админ-пароля
const checkAdminAuth = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || authHeader !== `Bearer ${ADMIN_PASSWORD}`) {
    return res.status(401).json({ success: false, error: 'Неавторизован' });
  }
  next();
};

// Роут для отправки сообщения в Telegram
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // Валидация
    if (!name || !email || !message) {
      return res.status(400).json({ 
        success: false, 
        error: 'Все поля обязательны для заполнения' 
      });
    }

    // Проверка email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ 
        success: false, 
        error: 'Некорректный email адрес' 
      });
    }

    // Форматирование сообщения для Telegram
    const telegramMessage = `
📧 <b>Новое сообщение с портфолио</b>

👤 <b>Имя:</b> ${name}
📮 <b>Email:</b> ${email}

💬 <b>Сообщение:</b>
${message}

━━━━━━━━━━━━━━━━━━━━
🕐 ${new Date().toLocaleString('ru-RU', { 
  timeZone: 'Europe/Moscow',
  dateStyle: 'short',
  timeStyle: 'medium'
})}
    `.trim();

    // Отправка в Telegram
    const response = await sendTelegramMessage(telegramMessage);

    if (response.data.ok) {
      console.log('✅ Сообщение успешно отправлено в Telegram');
      res.json({ 
        success: true, 
        message: 'Сообщение успешно отправлено!' 
      });
    } else {
      throw new Error('Ошибка при отправке в Telegram');
    }

  } catch (error) {
    console.error('❌ Ошибка при отправке сообщения:', error.response?.data || error.message);
    
    // Более детальная обработка ошибок
    if (error.code === 'ECONNABORTED') {
      return res.status(504).json({
        success: false,
        error: 'Сервис уведомлений временно не отвечает. Попробуйте снова через минуту.'
      });
    }

    if (error.response?.status === 401) {
      return res.status(500).json({ 
        success: false, 
        error: 'Ошибка авторизации Telegram бота. Проверьте токен.' 
      });
    }
    
    if (error.response?.status === 400) {
      return res.status(500).json({ 
        success: false, 
        error: 'Ошибка при отправке в Telegram. Проверьте CHAT_ID.' 
      });
    }

    res.status(500).json({ 
      success: false, 
      error: 'Ошибка при отправке сообщения. Попробуйте позже.' 
    });
  }
});

// Роут для получения статистики событий
app.get('/api/event-stats', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT 
        e.id,
        COUNT(r.id) as registered_count
      FROM events e
      LEFT JOIN registrations r ON e.id = r.event_id
      GROUP BY e.id
    `);

    res.json({
      success: true,
      events: result.rows.map(row => ({
        id: row.id,
        registeredCount: parseInt(row.registered_count)
      }))
    });
  } catch (error) {
    console.error('Ошибка получения статистики:', error);
    res.status(500).json({ success: false, error: 'Ошибка сервера' });
  }
});

// Роут для регистрации на события
app.post('/api/event-register', async (req, res) => {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    
    const { name, email, phone, comment, eventId, eventTitle, eventDate, eventTime, eventLocation } = req.body;

    // Валидация
    if (!name || !email || !phone || !eventTitle || !eventId) {
      await client.query('ROLLBACK');
      return res.status(400).json({ 
        success: false, 
        error: 'Обязательные поля не заполнены' 
      });
    }

    // Проверка email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      await client.query('ROLLBACK');
      return res.status(400).json({ 
        success: false, 
        error: 'Некорректный email адрес' 
      });
    }

    // Проверка, не зарегистрирован ли уже этот email на это событие
    const existingReg = await client.query(
      'SELECT id FROM registrations WHERE event_id = $1 AND email = $2',
      [eventId, email]
    );

    if (existingReg.rows.length > 0) {
      await client.query('ROLLBACK');
      return res.status(400).json({ 
        success: false, 
        error: 'Вы уже зарегистрированы на это событие' 
      });
    }

    // Проверка количества мест
    const eventResult = await client.query('SELECT max_seats FROM events WHERE id = $1', [eventId]);
    if (eventResult.rows.length === 0) {
      await client.query('ROLLBACK');
      return res.status(404).json({ 
        success: false, 
        error: 'Событие не найдено' 
      });
    }

    const maxSeats = eventResult.rows[0].max_seats;
    const countResult = await client.query(
      'SELECT COUNT(*) as count FROM registrations WHERE event_id = $1',
      [eventId]
    );
    const currentCount = parseInt(countResult.rows[0].count);

    if (currentCount >= maxSeats) {
      await client.query('ROLLBACK');
      return res.status(400).json({ 
        success: false, 
        error: 'Все места на событие уже заняты' 
      });
    }

    // Добавляем регистрацию
    const insertResult = await client.query(
      `INSERT INTO registrations (event_id, name, email, phone, comment)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING id, registered_at`,
      [eventId, name, email, phone, comment || null]
    );

    const newCount = currentCount + 1;

    await client.query('COMMIT');

    // Форматирование сообщения для Telegram
    const telegramMessage = `
🎫 <b>Новая регистрация на событие</b>

📌 <b>Событие:</b> ${eventTitle}
📅 <b>Дата:</b> ${eventDate} в ${eventTime}
📍 <b>Место:</b> ${eventLocation}

━━━━━━━━━━━━━━━━━━━━

👤 <b>Участник:</b> ${name}
📧 <b>Email:</b> ${email}
📱 <b>Телефон:</b> ${phone}
${comment ? `\n💬 <b>Комментарий:</b>\n${comment}` : ''}

━━━━━━━━━━━━━━━━━━━━
📊 <b>Зарегистрировано:</b> ${newCount} из ${maxSeats}
🕐 <b>Время:</b> ${new Date().toLocaleString('ru-RU', { 
  timeZone: 'Europe/Moscow',
  dateStyle: 'short',
  timeStyle: 'medium'
})}
    `.trim();

    res.json({ 
      success: true, 
      message: 'Регистрация успешна! Подтверждение отправлено.',
      registeredCount: newCount
    });

    // Отправляем уведомление в Telegram уже после ответа клиенту,
    // чтобы сетевые задержки не блокировали регистрацию.
    sendTelegramMessage(telegramMessage)
      .then((response) => {
        if (response.data.ok) {
          console.log(`✅ Регистрация успешно отправлена в Telegram. Всего зарегистрировано: ${newCount}`);
        }
      })
      .catch((telegramError) => {
        console.error('Ошибка отправки в Telegram (регистрация сохранена):', telegramError.message);
      });

  } catch (error) {
    await client.query('ROLLBACK');
    console.error('❌ Ошибка при регистрации:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Ошибка при регистрации. Попробуйте позже или свяжитесь напрямую.' 
    });
  } finally {
    client.release();
  }
});

// ========== АДМИН-ПАНЕЛЬ API ==========

// Авторизация админа
app.post('/api/admin/login', async (req, res) => {
  try {
    const { password } = req.body;
    if (password === ADMIN_PASSWORD) {
      res.json({ 
        success: true, 
        message: 'Авторизация успешна',
        token: ADMIN_PASSWORD // В продакшене использовать JWT
      });
    } else {
      res.status(401).json({ 
        success: false, 
        error: 'Неверный пароль' 
      });
    }
  } catch (error) {
    res.status(500).json({ success: false, error: 'Ошибка сервера' });
  }
});

// Получить все события
app.get('/api/admin/events', checkAdminAuth, async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM events ORDER BY date, time');
    res.json({ success: true, events: result.rows });
  } catch (error) {
    console.error('Ошибка получения событий:', error);
    res.status(500).json({ success: false, error: 'Ошибка сервера' });
  }
});

// Получить всех участников события
app.get('/api/admin/registrations/:eventId', checkAdminAuth, async (req, res) => {
  try {
    const { eventId } = req.params;
    const result = await pool.query(
      `SELECT 
        r.*,
        e.title as event_title,
        e.date as event_date,
        e.time as event_time
      FROM registrations r
      JOIN events e ON r.event_id = e.id
      WHERE r.event_id = $1
      ORDER BY r.registered_at DESC`,
      [eventId]
    );
    res.json({ success: true, registrations: result.rows });
  } catch (error) {
    console.error('Ошибка получения регистраций:', error);
    res.status(500).json({ success: false, error: 'Ошибка сервера' });
  }
});

// Отметить участника как пришедшего
app.post('/api/admin/check-in/:registrationId', checkAdminAuth, async (req, res) => {
  try {
    const { registrationId } = req.params;
    const result = await pool.query(
      `UPDATE registrations 
       SET checked_in = true, checked_in_at = CURRENT_TIMESTAMP
       WHERE id = $1
       RETURNING *`,
      [registrationId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, error: 'Регистрация не найдена' });
    }

    res.json({ 
      success: true, 
      message: 'Участник отмечен как пришедший',
      registration: result.rows[0]
    });
  } catch (error) {
    console.error('Ошибка отметки участника:', error);
    res.status(500).json({ success: false, error: 'Ошибка сервера' });
  }
});

// Убрать отметку о приходе
app.post('/api/admin/check-out/:registrationId', checkAdminAuth, async (req, res) => {
  try {
    const { registrationId } = req.params;
    const result = await pool.query(
      `UPDATE registrations 
       SET checked_in = false, checked_in_at = NULL
       WHERE id = $1
       RETURNING *`,
      [registrationId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, error: 'Регистрация не найдена' });
    }

    res.json({ 
      success: true, 
      message: 'Отметка о приходе убрана',
      registration: result.rows[0]
    });
  } catch (error) {
    console.error('Ошибка снятия отметки:', error);
    res.status(500).json({ success: false, error: 'Ошибка сервера' });
  }
});

// Удалить участника
app.delete('/api/admin/registrations/:registrationId', checkAdminAuth, async (req, res) => {
  try {
    const { registrationId } = req.params;
    const result = await pool.query(
      'DELETE FROM registrations WHERE id = $1 RETURNING *',
      [registrationId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, error: 'Регистрация не найдена' });
    }

    res.json({ 
      success: true, 
      message: 'Участник удалён',
      registration: result.rows[0]
    });
  } catch (error) {
    console.error('Ошибка удаления участника:', error);
    res.status(500).json({ success: false, error: 'Ошибка сервера' });
  }
});

// Получить статистику события
app.get('/api/admin/stats/:eventId', checkAdminAuth, async (req, res) => {
  try {
    const { eventId } = req.params;
    const statsResult = await pool.query(
      `SELECT 
        COUNT(*) as total,
        COUNT(CASE WHEN checked_in = true THEN 1 END) as checked_in_count
      FROM registrations
      WHERE event_id = $1`,
      [eventId]
    );

    const eventResult = await pool.query('SELECT * FROM events WHERE id = $1', [eventId]);
    
    if (eventResult.rows.length === 0) {
      return res.status(404).json({ success: false, error: 'Событие не найдено' });
    }

    const stats = statsResult.rows[0];
    const event = eventResult.rows[0];

    res.json({
      success: true,
      stats: {
        total: parseInt(stats.total),
        checkedIn: parseInt(stats.checked_in_count),
        notCheckedIn: parseInt(stats.total) - parseInt(stats.checked_in_count),
        maxSeats: event.max_seats,
        availableSeats: event.max_seats - parseInt(stats.total)
      },
      event: event
    });
  } catch (error) {
    console.error('Ошибка получения статистики:', error);
    res.status(500).json({ success: false, error: 'Ошибка сервера' });
  }
});

// Health check
app.get('/api/health', async (req, res) => {
  try {
    // Проверка подключения к БД
    await pool.query('SELECT 1');
    res.json({ 
      status: 'ok', 
      timestamp: new Date().toISOString(),
      database: 'connected',
      telegramConfigured: !!(process.env.TELEGRAM_BOT_TOKEN && process.env.TELEGRAM_CHAT_ID)
    });
  } catch (error) {
    res.status(500).json({ 
      status: 'error', 
      database: 'disconnected',
      error: error.message 
    });
  }
});

const startServer = async () => {
  try {
    await initializeDatabase();

    app.listen(PORT, () => {
      console.log(`🚀 Backend сервер запущен на порту ${PORT}`);
      console.log(`📡 Telegram бот: ${process.env.TELEGRAM_BOT_TOKEN ? '✅ Настроен' : '❌ Не настроен'}`);
      console.log(`💬 Chat ID: ${process.env.TELEGRAM_CHAT_ID ? '✅ Настроен' : '❌ Не настроен'}`);
      console.log(`🗄️  База данных: PostgreSQL`);
      console.log(`🌐 CORS origins: ${allowedOrigins.length ? allowedOrigins.join(', ') : 'all'}`);
    });
  } catch (error) {
    console.error('❌ Не удалось инициализировать backend:', error.message);
    process.exit(1);
  }
};

startServer();
