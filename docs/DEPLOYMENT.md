# Deployment Guide

MusicIQ is designed to be deployed using Docker containers.

## Prerequisites
- Docker Engine & Docker Compose
- A secure 256-bit JWT Secret

## Local Development Deployment
You can spin up the entire application locally using Docker Compose:

```bash
docker-compose up --build -d
```

This will start:
1. PostgreSQL Database (`:5432`)
2. Spring Boot Backend (`:8080`)
3. Next.js Frontend (`:3000`)

## Production Deployment Checklist
1. **Change Secrets**: Generate a strong `JWT_SECRET` and secure PostgreSQL passwords.
2. **Reverse Proxy**: Configure NGINX or Traefik to handle SSL/TLS termination and route traffic to ports `3000` (frontend) and `8080` (API).
3. **Database Volume**: Ensure the `postgres_data` Docker volume is backed up regularly.
