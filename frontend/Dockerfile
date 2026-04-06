# Multi-stage build для оптимизации размера образа

# Stage 1: Build
FROM node:18-alpine AS builder

WORKDIR /app

# Для Docker-сборки явно контролируем URL API.
ARG REACT_APP_BACKEND_URL=
ENV REACT_APP_BACKEND_URL=$REACT_APP_BACKEND_URL

# Копируем package файлы
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем исходный код
COPY . .

# Собираем приложение
RUN npm run build

# Stage 2: Production
FROM nginx:alpine

# Копируем собранное приложение (включая статичные ассеты из public/, в т.ч. /public/globe)
COPY --from=builder /app/build /usr/share/nginx/html

# Копируем конфигурацию nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Открываем порт 8080
EXPOSE 8080

# Запускаем nginx
CMD ["nginx", "-g", "daemon off;"]

