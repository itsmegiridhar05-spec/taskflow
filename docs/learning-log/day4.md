# Day 4: Authentication, Authorization & Security

**Date:** [YYYY-MM-DD]  
**Sprint / Phase:** Phase 4 - Security & Identity  
**Focus Area:** User model, password hashing, JWT authentication, and protected routes.

---

## 1. Objectives for Today
- [ ] Create User model and migration (`id`, `email`, `hashed_password`, `is_active`).
- [ ] Implement secure password hashing using `bcrypt` / `passlib` or `cryptography`.
- [ ] Build `/api/v1/auth/token` endpoint issuing signed JSON Web Tokens (JWT).
- [ ] Implement `get_current_user` FastAPI dependency and protect task endpoints.
- [ ] Scope task access so users can only view and manage their own tasks.

---

## 2. Key Learnings & Concepts
- **Stateless Authentication with JWT:** Understanding token structure (Header, Payload, Signature) and why expiration (`exp`) is critical for token security.
- **Dependency Injection for Auth:** How FastAPI's `OAuth2PasswordBearer` and `Depends(get_current_user)` elegantly intercept incoming requests, validate headers, and inject the authenticated user into endpoint handlers.
- **Data Isolation:** Ensuring multi-tenant safety by filtering database queries with `owner_id == current_user.id`.

---

## 3. Implementation Notes & Commands Executed
*Document commands and security checks:*
```bash
# Example: Testing authenticated endpoint
curl -H "Authorization: Bearer <TOKEN>" http://localhost:8000/api/v1/tasks
```

---

## 4. Challenges & Troubleshooting
*Record any roadblocks encountered today, how you diagnosed them, and the solution applied:*
- *Challenge:* 
- *Solution:* 

---

## 5. Next Steps for Day 5
- Build out the Next.js frontend task dashboard interface.
- Implement responsive task list, status toggling, and new task form.
