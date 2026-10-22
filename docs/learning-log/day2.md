# Day 2: Database Modeling & Alembic Migrations

**Date:** [YYYY-MM-DD]  
**Sprint / Phase:** Phase 2 - Persistence Layer  
**Focus Area:** SQLAlchemy 2.0 ORM models, Alembic environment, and database migrations.

---

## 1. Objectives for Today
- [ ] Define Task data model (`id`, `title`, `description`, `status`, `priority`, `due_date`, `created_at`, `updated_at`).
- [ ] Configure database engine and session dependency in FastAPI (`app/db/session.py`).
- [ ] Initialize and configure Alembic (`alembic revision --autogenerate -m "Initial task table"`).
- [ ] Apply migration locally (`alembic upgrade head`) and verify table creation in SQLite / PostgreSQL.

---

## 2. Key Learnings & Concepts
- **Declarative Base in SQLAlchemy 2.0:** How `Mapped` and `mapped_column` enhance type checking and IDE autocompletion.
- **Alembic Migration Lifecycle:** Understanding `upgrade()` and `downgrade()` functions and how Alembic tracks migration history with the `alembic_version` table.
- **Database Sessions in FastAPI:** Utilizing FastAPI dependency injection (`Depends(get_db)`) to ensure database sessions are cleanly opened and closed per request.

---

## 3. Implementation Notes & Commands Executed
*Document commands and architectural decisions:*
```bash
# Example: Running database migrations
alembic upgrade head
```

---

## 4. Challenges & Troubleshooting
*Record any roadblocks encountered today, how you diagnosed them, and the solution applied:*
- *Challenge:* 
- *Solution:* 

---

## 5. Next Steps for Day 3
- Implement CRUD endpoints for Task resource (`POST`, `GET`, `PUT`, `DELETE`).
- Write comprehensive unit and integration tests with pytest.
