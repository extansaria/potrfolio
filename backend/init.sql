-- Создание таблицы событий
CREATE TABLE IF NOT EXISTS events (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    date DATE NOT NULL,
    time TIME NOT NULL,
    location VARCHAR(255) NOT NULL,
    max_seats INTEGER NOT NULL DEFAULT 50,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Создание таблицы регистраций
CREATE TABLE IF NOT EXISTS registrations (
    id SERIAL PRIMARY KEY,
    event_id INTEGER NOT NULL REFERENCES events(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50) NOT NULL,
    comment TEXT,
    checked_in BOOLEAN DEFAULT FALSE,
    checked_in_at TIMESTAMP,
    registered_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Создание индексов для быстрого поиска
CREATE INDEX IF NOT EXISTS idx_registrations_event_id ON registrations(event_id);
CREATE INDEX IF NOT EXISTS idx_registrations_email ON registrations(email);
CREATE INDEX IF NOT EXISTS idx_registrations_checked_in ON registrations(checked_in);

-- Вставка тестового события (если его еще нет)
INSERT INTO events (id, title, description, date, time, location, max_seats)
VALUES (1, 'Современный Frontend: От React до Production', 
        'Практический воркшоп по разработке современных веб-приложений', 
        '2025-12-15', '18:00:00', 'Точка кипения ПРОМТЕХДИЗАЙН', 30)
ON CONFLICT (id) DO NOTHING;

