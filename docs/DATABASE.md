# Database Architecture

MusicIQ uses a relational database model managed by Spring Data JPA and Hibernate.
In development, it uses an embedded H2 database (persisted to the file system). In production, it utilizes PostgreSQL.

## Entity Relationship Diagram

```mermaid
erDiagram
    USERS {
        uuid id PK
        string email
        string password
        string username
        string role
        timestamp created_at
        timestamp last_login
    }
    ALBUMS {
        uuid id PK
        uuid user_id FK
        string itunes_id
        string title
        string artist
        string genre
        int personal_rating
        text personal_notes
    }
    ACTIVITY_LOGS {
        uuid id PK
        uuid user_id FK
        string action_type
        string entity_id
        string details
        timestamp created_at
    }

    USERS ||--o{ ALBUMS : "saves"
    USERS ||--o{ ACTIVITY_LOGS : "generates"
```

## Data Isolation

Data isolation is strictly enforced at the repository layer. 
Every data fetch is scoped to the `user_id` extracted securely from the JWT token.

```java
List<Album> findByUserId(UUID userId);
```
