# Deploy: Frontend + Backend

## Frontend (GitHub Pages)

- Frontend deploys via `.github/workflows/deploy-pages.yml`.
- Build uses `REACT_APP_BACKEND_URL` from GitHub Secrets.

Set repository secret:

- `REACT_APP_BACKEND_URL=https://<your-backend-domain>`

## Backend (Render)

Repository includes `render.yaml` with:

- Web service `portfolio-backend`
- PostgreSQL database `portfolio-postgres`
- Auto-init DB schema from `backend/init.sql` on startup

Set backend environment variables in Render:

- `ADMIN_PASSWORD`
- `TELEGRAM_BOT_TOKEN`
- `TELEGRAM_CHAT_ID`

`CORS_ORIGINS` defaults to `https://extansaria.github.io`.
