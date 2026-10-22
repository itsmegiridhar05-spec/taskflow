# TaskFlow

A modern, production-grade task-management application built with a **FastAPI** backend, a **Next.js (App Router)** frontend, automated tests, comprehensive documentation, Docker Compose orchestration, and GitHub Actions CI.

---

## 🚀 Tech Stack

- **Backend:** Python 3.12+ / FastAPI, Pydantic v2, Pydantic-Settings, Uvicorn, SQLAlchemy 2.0, Alembic, Pytest
- **Frontend:** Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS
- **Database:** SQLite (local development zero-configuration) / PostgreSQL 16 (containerized / production)
- **DevOps & CI:** Docker, Docker Compose, GitHub Actions (`.github/workflows/ci.yml`)

---

## 📁 Repository Structure

```
taskflow/
├── backend/                  # FastAPI Python backend application
│   ├── alembic/              # Database migration configurations & scripts
│   ├── app/                  # Application source code
│   │   ├── api/v1/           # Versioned API routes & endpoints
│   │   ├── core/             # Pydantic Settings & environment config
│   │   ├── schemas/          # Pydantic request/response models
│   │   └── main.py           # FastAPI entrypoint, CORS, & health routes
│   ├── tests/                # Automated pytest suite
│   ├── alembic.ini           # Alembic CLI configuration
│   ├── Dockerfile            # Backend container definition
│   └── requirements.txt      # Python dependencies
├── frontend/                 # Next.js React TypeScript frontend
│   ├── src/
│   │   ├── app/              # App Router pages and layout
│   │   ├── components/       # Task dashboard & UI components
│   │   └── lib/              # Environment-based API client
│   ├── Dockerfile            # Frontend container definition
│   └── package.json          # Node dependencies and build scripts
├── docs/                     # Project documentation
│   ├── architecture.md       # High-level architecture & system design
│   ├── api.md                # REST API documentation & health contract
│   ├── adr/                  # Architecture Decision Records
│   │   ├── 0001-record-architecture-decisions.md
│   │   └── 0002-technology-stack-selection.md
│   └── learning-log/         # 7-Day sprint & learning journals
│       ├── day1.md ... day7.md
├── .github/                  # GitHub CI workflows and pull request templates
│   ├── workflows/ci.yml
│   └── pull_request_template.md
├── docker-compose.yml        # Multi-service local orchestration (db, backend, frontend)
├── .env.example              # Environment variables template
├── .gitignore                # Git ignore rules for Python, Node, & secrets
└── README.md                 # Primary project documentation
```

---

## ⚡ Quickstart

### 1. Environment Setup

Copy `.env.example` to create your local environment file:

```bash
cp .env.example .env
```

---

### 2. Running Locally

#### Backend (FastAPI)

1. Create and activate a Python virtual environment:
   ```bash
   # Windows (PowerShell)
   python -m venv .venv
   .venv\Scripts\Activate.ps1

   # macOS / Linux
   python3 -m venv .venv
   source .venv/bin/activate
   ```

2. Install dependencies:
   ```bash
   pip install -r backend/requirements.txt
   ```

3. Start the FastAPI development server:
   ```bash
   cd backend
   uvicorn app.main:app --reload --port 8000
   ```

- **API Base:** `http://localhost:8000`
- **Health Check:** `http://localhost:8000/health`
- **Interactive Swagger Docs:** `http://localhost:8000/docs`
- **Interactive ReDoc:** `http://localhost:8000/redoc`

#### Frontend (Next.js)

1. Install dependencies:
   ```bash
   cd frontend
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

- **Frontend App:** `http://localhost:3000`

---

### 3. Running with Docker Compose

Launch the full stack (PostgreSQL database, FastAPI backend, and Next.js frontend) with a single command:

```bash
docker compose up --build
```

---

## 🧪 Testing & Quality Assurance

### Run Backend Tests

```bash
cd backend
pytest -v tests
```

### Run Frontend Lint & Build Checks

```bash
cd frontend
npm run lint
npm run build
```

---

## 📖 Documentation & Learning Logs

- **[System Architecture](docs/architecture.md)** — Architectural diagrams, data flow, and design patterns.
- **[API Specification](docs/api.md)** — Endpoint contracts, schemas, and status codes.
- **[Architecture Decision Records](docs/adr/)** — Log of key technical decisions.
- **[Sprint Learning Logs](docs/learning-log/)** — Daily logs tracking implementation notes and learnings (Days 1–7).

---

## 🌿 Git & Pull Request Workflow

1. Always work on a feature branch (e.g. `feature/initial-setup`).
2. Verify all tests pass locally before staging changes:
   ```bash
   git status
   ```
3. Commit with clean, semantic commit messages:
   ```bash
   git add .
   git commit -m "feat: scaffold TaskFlow backend, frontend, documentation, and CI"
   ```
4. Push to remote feature branch and open a GitHub Pull Request using our [PR Template](.github/pull_request_template.md):
   ```bash
   git push -u origin feature/initial-setup
   ```