# Deploy: Docker (single public port)

This project runs in Docker with only one public port:

- `http://localhost` -> frontend + admin route
- backend and postgres are internal-only

## Start

```bash
docker compose up --build -d
```

## Stop

```bash
docker compose down
```

## Public Ports

- `80:8080` (frontend container)

No external mapping for backend or postgres.
