# Infra
Only infra-related stuff

## Docker Compose
- Default: uses external Postgres (e.g., Supabase). Set `DATABASE_URL` in `infra/.env` (see `.env.example`) before running.
- Optional local DB: enable the `local-db` profile to spin up the bundled Postgres.

Examples (run from repo root):
```bash
# external DB (Supabase or other managed Postgres)
cp infra/.env.example infra/.env   # edit DATABASE_URL
docker compose -f infra/docker-compose.yml --env-file infra/.env up --build

# with local Postgres instead of Supabase
docker compose -f infra/docker-compose.yml --env-file infra/.env --profile local-db up --build
```
