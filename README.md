<div align="center">
  <h1>🎵 MusicIQ</h1>
  <p><strong>Intelligent Personal Music Library & Analytics Dashboard</strong></p>

  [![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
  [![Build Status](https://github.com/anupam45/MusicIQ/actions/workflows/build-test.yml/badge.svg)](https://github.com/anupam45/MusicIQ/actions)
  [![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=next.js)](https://nextjs.org/)
  [![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3-brightgreen?logo=spring)](https://spring.io/)
  [![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-blue?logo=postgresql)](https://www.postgresql.org/)
</div>

---

## 📖 Overview

MusicIQ is a full-stack SaaS platform that empowers users to build, manage, and analyze their personal music libraries. It leverages the iTunes Search API to seamlessly import albums and generates deep analytical insights about your listening personality, collection health, and genre diversity.

---

## ✨ Features

- **🔐 Secure Authentication**: JWT-based stateless authentication with robust BCrypt password hashing.
- **🔍 Seamless Discovery**: Real-time integration with the iTunes Search API.
- **📊 Advanced Analytics**: Detailed library health, diversity scoring, and chronological collection mapping.
- **🤖 AI Insights Engine**: Heuristic-based generated insights evaluating listener persona and rating consistency.
- **🏆 Gamified Profiles**: Activity tracking, calculated achievements, and detailed user statistical breakdowns.

---

## 🏗 Architecture

MusicIQ employs a modern decoupled architecture:
- **Frontend**: React 19, Next.js 15 (App Router), Tailwind CSS v4, shadcn/ui.
- **Backend**: Java 21, Spring Boot 3, Spring Security, Hibernate.
- **Database**: PostgreSQL (Production) / H2 (Development).

> 📘 See [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) for full architectural details and diagrams.

---

## 🚀 Quick Start

### 1. Prerequisites
- [Docker](https://www.docker.com/) & Docker Compose
- [Node.js](https://nodejs.org/) v20+ (for local development)
- [Java](https://jdk.java.net/) 21 (for local development)

### 2. Environment Variables
Copy the example environment file:
```bash
cp .env.example .env
```
Ensure you set a secure `JWT_SECRET`.

### 3. Run with Docker Compose (Recommended)
```bash
docker-compose up --build
```
- Frontend: `http://localhost:3000`
- API Backend: `http://localhost:8080/api`
- Swagger Docs: `http://localhost:8080/swagger-ui.html`

---

## 📚 Documentation

Detailed documentation is available in the `docs/` directory:
- [Architecture & Diagrams](docs/ARCHITECTURE.md)
- [REST API Reference](docs/API.md)
- [Database Schema](docs/DATABASE.md)
- [Deployment Guide](docs/DEPLOYMENT.md)
- [Security Model](docs/SECURITY.md)
- [Future Roadmap](docs/ROADMAP.md)

---

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details on how to submit pull requests, report issues, and follow our code of conduct.

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
