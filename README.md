# MusicIQ – AI-Powered Music Library & Analytics Platform

Welcome to the MusicIQ repository! This project is an AI-powered platform for managing, analyzing, and exploring music libraries.

## Milestone 1: Project Foundation

This milestone establishes the production-ready full-stack foundation for the MusicIQ platform.

### Tech Stack

**Backend**:
- Java 21
- Spring Boot 3.x
- PostgreSQL 16
- Maven
- Spring Security (Base)
- Spring Data JPA
- MapStruct & Lombok
- SpringDoc OpenAPI

**Frontend**:
- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS v4
- shadcn/ui
- React Query & Axios
- Framer Motion & Recharts

### Setup Instructions

#### Prerequisites
- Docker & Docker Compose
- Java 21+
- Node.js 20+

#### 1. Database Setup
Start the PostgreSQL database using Docker Compose:
```bash
docker-compose up -d
```

#### 2. Backend Setup
Navigate to the backend directory and run the Spring Boot application:
```bash
cd backend
./mvnw spring-boot:run
```
Swagger UI will be accessible at: `http://localhost:8080/swagger-ui.html`

#### 3. Frontend Setup
Navigate to the frontend directory, install dependencies, and start the development server:
```bash
cd frontend
npm install
npm run dev
```
The application will be accessible at: `http://localhost:3000`

---
*Note: This is a milestone placeholder README. The final documentation will be provided upon project completion.*
