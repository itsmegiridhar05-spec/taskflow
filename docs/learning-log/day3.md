# Day 3: Task CRUD Endpoints & Automated Testing

**Date:** [YYYY-MM-DD]  
**Sprint / Phase:** Phase 3 - Core Business Logic & Testing  
**Focus Area:** FastAPI router implementation, Pydantic schemas, and Pytest coverage.

---

## 1. Objectives for Today
- [ ] Implement Task Pydantic schemas (`TaskCreate`, `TaskUpdate`, `TaskRead`).
- [ ] Build CRUD endpoints under `/api/v1/tasks`.
- [ ] Set up pytest database fixture using an in-memory SQLite database or rollback transactions.
- [ ] Write integration tests covering all CRUD operations, including validation failure cases.

---

## 2. Key Learnings & Concepts
- **Request / Response Schema Separation:** Why exposing internal database models directly is risky and how distinct Pydantic schemas enforce security and data isolation.
- **FastAPI Status Codes:** Using appropriate HTTP status codes (`201 Created` for insertions, `204 No Content` for deletions, `404 Not Found` for missing resources).
- **Test Isolation in Pytest:** Structuring fixtures to guarantee that each test runs in a clean, predictable database state without cross-test pollution.

---

## 3. Implementation Notes & Commands Executed
*Document commands and test outcomes:*
```bash
# Run backend test suite
pytest -v
```

---

## 4. Challenges & Troubleshooting
*Record any roadblocks encountered today, how you diagnosed them, and the solution applied:*
- *Challenge:* 
- *Solution:* 

---

## 5. Next Steps for Day 4
- Design user authentication and security layer.
- Implement password hashing (Passlib/Bcrypt) and JWT token generation.
