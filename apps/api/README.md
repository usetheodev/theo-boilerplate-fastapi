# theo-boilerplate-api

FastAPI backend for theo-boilerplate-fastapi monorepo.

## Stack

- **Python 3.12**
- **FastAPI** - Web framework
- **SQLModel** - ORM (SQLAlchemy + Pydantic)
- **Alembic** - Database migrations
- **UV** - Package manager

## Development

```bash
# Install dependencies
uv sync

# Run development server
uv run uvicorn app.main:app --reload --port 3000

# Run migrations
uv run alembic upgrade head

# Create new migration
uv run alembic revision --autogenerate -m "description"
```

## API Endpoints

- `GET /health` - Health check
- `GET /docs` - Swagger UI
- `GET /redoc` - ReDoc

## Environment Variables

See `.env.example` in the root directory.
