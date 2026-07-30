# Security Architecture

MusicIQ takes data security and privacy seriously. The following measures are implemented:

## Authentication
- **JWT (JSON Web Tokens)**: All API endpoints (except `/api/auth/**`) are secured using JWTs signed with a strong 256-bit secret.
- **Stateless Sessions**: The backend maintains no session state, protecting against CSRF attacks when combined with appropriate CORS policies.

## Authorization & Data Ownership
- **Row-Level Security / Ownership**: The `AlbumRepository` and `ActivityLogRepository` enforce tenant isolation by restricting all `SELECT`, `UPDATE`, and `DELETE` queries to the authenticated user's ID. It is computationally impossible for User A to view or mutate User B's albums.

## Password Storage
- Passwords are hashed using **BCrypt** with a high cost factor before being persisted to the database. Plaintext passwords are never logged or stored.

## Vulnerability Reporting
If you discover a security vulnerability within MusicIQ, please DO NOT open a public issue. Instead, email the maintainer directly.
