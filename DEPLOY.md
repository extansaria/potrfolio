# Deploy: Free GitHub Pages + Google Apps Script

## 1) Deploy free API

1. Open [Google Apps Script](https://script.google.com/).
2. Create a new project.
3. Copy code from `google-apps-script/Code.gs`.
4. Create a Google Sheet and bind this Apps Script project to it (or create script directly from the sheet).
5. In Apps Script click `Deploy` -> `New deployment` -> type `Web app`.
6. Execute as: `Me`.
7. Who has access: `Anyone`.
8. Deploy and copy the Web App URL (ends with `/exec`).

## 2) Configure frontend build on GitHub

Set repository secret in GitHub:

- `REACT_APP_GOOGLE_API_URL=https://script.google.com/macros/s/.../exec`

Frontend workflow `.github/workflows/deploy-pages.yml` injects this secret at build time.

## 3) Result

- Contact form works through Google Apps Script.
- Event registration works through Google Apps Script.
- Event stats are stored/read from Google Sheet.
- Admin panel is intentionally disabled in this free mode on GitHub Pages.
