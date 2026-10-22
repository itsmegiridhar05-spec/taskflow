# Day 7: Docker, CI/CD Automation & PR Preparation

**Date:** [YYYY-MM-DD]  
**Sprint / Phase:** Phase 7 - DevOps, CI/CD & Delivery  
**Focus Area:** Docker Compose configuration, GitHub Actions workflow, and Pull Request readiness.

---

## 1. Objectives for Today
- [ ] Configure `Dockerfile` for backend (FastAPI + Uvicorn).
- [ ] Configure `Dockerfile` for frontend (Next.js production build / standalone runner).
- [ ] Define `docker-compose.yml` orchestrating backend, frontend, and PostgreSQL services.
- [ ] Implement GitHub Actions CI (`.github/workflows/ci.yml`) running linting and test suites.
- [ ] Create standardized Pull Request template (`.github/pull_request_template.md`).
- [ ] Submit Pull Request from `feature/initial-setup` into `main` and verify CI pass.

---

## 2. Key Learnings & Concepts
- **Multi-Service Docker Orchestration:** How Docker Compose networks bridge communication between backend and frontend containers using container hostnames.
- **CI Matrix & Caching:** Speeding up GitHub Actions pipelines by caching pip and npm dependency directories.
- **Pull Request Best Practices:** Writing clear summaries, linking issues, and maintaining checklists to facilitate smooth peer review.

---

## 3. Implementation Notes & Commands Executed
*Document commands and container checks:*
```bash
# Build and run containers locally
docker compose up --build
```

---

## 4. Challenges & Troubleshooting
*Record any roadblocks encountered today, how you diagnosed them, and the solution applied:*
- *Challenge:* 
- *Solution:* 

---

## 5. Retrospective & Future Roadmap
- *What went well:* 
- *What could be improved:* 
- *Next development milestones:* 
