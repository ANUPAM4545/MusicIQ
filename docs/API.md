# API Documentation

The MusicIQ Backend provides a RESTful API. Swagger UI is available out of the box when running the server in development mode.

## Base URL
`/api`

## Authentication

All protected routes require a Bearer token in the `Authorization` header.

```http
Authorization: Bearer <JWT_TOKEN>
```

## Endpoints

### Auth
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Authenticate a user and receive a JWT

### Albums
- `GET /api/albums` - Retrieve user's saved albums
- `POST /api/albums` - Save an album
- `PUT /api/albums/{id}` - Update album details (notes, ratings)
- `DELETE /api/albums/{id}` - Remove an album from the library

### Search
- `GET /api/search?term={term}` - Search iTunes API for albums

### Analytics & Insights
- `GET /api/analytics/overview` - Fetch dashboard statistics
- `GET /api/ai/insights` - Fetch generated AI insights based on listening history

### Profile
- `GET /api/profile` - Fetch full user profile
- `PUT /api/profile` - Update profile data
- `GET /api/profile/stats` - Fetch user's library statistics
- `GET /api/profile/activity` - Fetch recent activity log
