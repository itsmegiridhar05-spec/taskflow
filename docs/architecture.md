# TaskFlow Architecture

## 1. System Overview

TaskFlow is a modern, decoupled task-management application engineered for high developer productivity, clear separation of concerns, and automated quality assurance.

```
+--------------------------------------------------------------------+
|                         Client Browser                             |
+--------------------------------------------------------------------+
                                |  HTTP / REST
                                v
+--------------------------------------------------------------------+
|                      Frontend: Next.js (App Router)                |
|  - React 19 / TypeScript                                           |
|  - Tailwind CSS for styling                                        |
|  - Client-side data fetching & state management                    |
|  - Environment-based API client configuration                      |
+--------------------------------------------------------------------+
                                |  REST API (/api/v1)
                                v
+--------------------------------------------------------------------+
|                       Backend: FastAPI (Python)                    |
|  - Pydantic v2 data validation & settings                          |
|  - Modular routing (APIRouter)                                     |
|  - Asynchronous request handling                                   |
|  - Structured CORS and error middleware                            |
|  - SQLAlchemy 2.0 ORM + Alembic migrations                         |
+--------------------------------------------------------------------+
                                |  Database Driver
                                v
+--------------------------------------------------------------------+
|                         Persistence Layer                          |
|  - Local Dev: SQLite (`taskflow.db`)                               |
|  - Container / Prod: PostgreSQL 16                                 |
+--------------------------------------------------------------------+
```

---

## 2. Component Architecture

### 2.1 Backend Service (`backend/`)
- **FastAPI Framework:** Chosen for native async support, automatic OpenAPI/Swagger generation, and performance.
- **Pydantic v2:** Enforces strict request and response schemas, type conversion, and settings management via `pydantic-settings`.
- **Database Abstraction:** SQLAlchemy 2.0 provides an ORM mapping Python classes to database tables. Alembic manages version-controlled schema migrations.
- **Configuration Layer:** Centralized in `app.core.config.Settings`, reading configuration from environment variables or `.env` files.
- **Testing:** `pytest` paired with `httpx.ASGITransport` / `TestClient` for isolated end-to-end endpoint verification without requiring network sockets.

### 2.2 Frontend Service (`frontend/`)
- **Next.js (App Router):** Leverages modern server and client components, file-system routing, and built-in optimization.
- **TypeScript:** Strict type checks ensuring alignment with backend contract models.
- **Tailwind CSS:** Utility-first CSS providing a responsive, cohesive design system without bloat.
- **API Client:** Dedicated service layer (`src/lib/api.ts`) managing base URLs, headers, and type-safe fetch requests.

---

## 3. Directory Layout

```
taskflow/
├── backend/
│   ├── alembic/              # Database migration configurations and scripts
│   ├── app/
│   │   ├── api/              # API router definitions & versioned endpoints
│   │   │   └── v1/
│   │   │       ├── endpoints/
│   │   │       └── api.py
│   │   ├── core/             # Application configuration and settings
│   │   ├── schemas/          # Pydantic request/response models
│   │   └── main.py           # FastAPI entrypoint and middleware
│   ├── tests/                # Automated pytest suite
│   ├── alembic.ini           # Alembic migration configuration
│   ├── Dockerfile            # Container definition for backend service
│   └── requirements.txt      # Python dependencies
├── frontend/
│   ├── src/
│   │   ├── app/              # Next.js App Router pages and layouts
│   │   ├── components/       # Reusable UI components
│   │   └── lib/              # API clients and utilities
│   ├── Dockerfile            # Container definition for frontend service
│   └── package.json          # Node dependencies and build scripts
├── docs/                     # Architectural documentation, ADRs, learning logs
├── .github/                  # CI workflows and PR templates
├── docker-compose.yml        # Multi-container local orchestration
├── .env.example              # Environment variables template
├── .gitignore                # Git ignore rules for Python & Node
└── README.md                 # Primary project overview and instructions
```

---

## 4. Security & Configuration Best Practices
- **No Hardcoded Secrets:** Credentials, database connection strings, and secret keys are injected via environment variables.
- **CORS Management:** Backend explicitly restricts Allowed Origins using the `ALLOWED_ORIGINS` environment variable.
- **Input Validation:** All input payloads pass through Pydantic validators before reaching application logic.
