# URL Shortener

A full-stack URL shortener application built with modern technologies, demonstrating high-traffic handling, multi-layer caching, and clean architecture.

## Tech Stack

- **Backend**: NestJS (Node.js + TypeScript)
- **Frontend**: React + TypeScript + Vite
- **Database**: PostgreSQL
- **Caching**: Redis
- **Containerization**: Docker Compose

## Features

- Shorten long URLs with auto-generated or custom short codes
- Fast redirects with Redis caching (cache-aside pattern)
- Click analytics and statistics
- Rate limiting to handle high traffic
- Paginated URL listing
- Responsive modern UI

## Architecture Highlights

- **Multi-layer Caching**: Redis as L1 cache for URL lookups, PostgreSQL as persistent storage
- **Dependency Injection**: Full NestJS DI container for testability
- **Rate Limiting**: `@nestjs/throttler` for API protection
- **Input Validation**: `class-validator` DTOs
- **Unit Testing**: Jest with mocked dependencies

## Getting Started

### Prerequisites

- Node.js 18+
- Docker & Docker Compose

### 1. Start Infrastructure

```bash
docker-compose up -d
```

This starts PostgreSQL on port **5432** and Redis on port **6379**.

### 2. Start Backend

```bash
cd backend
cp .env.example .env  # or use defaults
npm install
npm run start:dev
```

Backend runs on [http://localhost:3000](http://localhost:3000)

### 3. Start Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on [http://localhost:5173](http://localhost:5173)

## API Endpoints

| Method | Endpoint              | Description              |
| ------ | --------------------- | ------------------------ |
| POST   | `/api/urls`           | Create short URL         |
| GET    | `/api/urls`           | List all URLs (paginated)|
| GET    | `/api/urls/:code/stats` | Get URL statistics     |
| DELETE | `/api/urls/:code`     | Delete a short URL       |
| GET    | `/:code`              | Redirect to original URL |

## Project Structure

```
├── backend/              # NestJS API server
│   ├── src/
│   │   ├── url/          # URL module (entity, service, controller, DTOs)
│   │   ├── app.module.ts
│   │   └── main.ts
│   └── .env
├── frontend/             # React + Vite frontend
│   ├── src/
│   │   ├── api/          # API client
│   │   ├── components/   # Reusable components
│   │   ├── pages/        # Page components
│   │   └── types/        # TypeScript types
├── docker-compose.yml
└── README.md
```

## License

MIT
