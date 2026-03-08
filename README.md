# Full-Stack Starter — React + Express + PostgreSQL

A minimal three-tier application designed for learning:

| Layer      | Tech                    | Local              | Production |
|------------|-------------------------|--------------------|------------|
| Frontend   | React (Vite)            | localhost:5173     | Vercel     |
| Backend    | Node.js / Express       | localhost:3001     | Render     |
| Database   | PostgreSQL 17           | Docker             | Neon       |

---

## Repository Structure

```
root/
├── frontend/               # React Vite app
│   ├── src/
│   │   ├── components/
│   │   │   ├── ItemForm.jsx
│   │   │   └── ItemList.jsx
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── public/
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   └── .env.example
├── backend/                # Node.js + Express API
│   ├── src/
│   │   ├── routes/
│   │   │   └── items.js
│   │   ├── db.js
│   │   └── server.js
│   ├── package.json
│   └── .env.example
├── docker-compose.yml      # Local Postgres container
├── .gitignore
└── README.md
```

---

## Prerequisites

- **Node.js** v18 or newer
- **Docker** (for the local PostgreSQL database)

---

## Local Development

### 1. Start the database

```bash
docker compose up -d
```

This starts a PostgreSQL 17 container on port **5432** with:

| Variable            | Value      |
|---------------------|------------|
| `POSTGRES_USER`     | postgres   |
| `POSTGRES_PASSWORD` | postgres   |
| `POSTGRES_DB`       | appdb      |

### 2. Start the backend

```bash
cd backend
cp .env.example .env      # first time only, makes a copy of example env.
npm install               # first time only, installs dependancies for project listed in package.json. Run again if new dependancy. added.
npm run dev
```

The server starts on **http://localhost:3001** and automatically creates the `items` table.

### 3. Start the frontend

```bash
cd frontend
cp .env.example .env      # first time only
npm install               # first time only
npm run dev
```

Open **http://localhost:5173** in your browser.

---

## API Endpoints

| Method   | Path          | Description          |
|----------|---------------|----------------------|
| `GET`    | `/items`      | List all items       |
| `POST`   | `/items`      | Create a new item    |
| `DELETE`  | `/items/:id` | Delete an item by id |
| `GET`    | `/`           | Health check         |

### Example requests (curl)

```bash
# List items
curl http://localhost:3001/items

# Create an item
curl -X POST http://localhost:3001/items \
  -H "Content-Type: application/json" \
  -d '{"name": "Learn Express"}'

# Delete an item
curl -X DELETE http://localhost:3001/items/1
```

---

## Environment Variables

### Backend (`backend/.env`)

| Variable       | Description                        | Local default                                       |
|----------------|------------------------------------|-----------------------------------------------------|
| `DATABASE_URL` | PostgreSQL connection string       | `postgresql://postgres:postgres@localhost:5432/appdb` |
| `PORT`         | Port the server listens on         | `3001`                                              |

### Frontend (`frontend/.env`)

| Variable                | Description                | Local default               |
|-------------------------|----------------------------|-----------------------------|
| `VITE_BACKEND_API_URL`  | URL of the backend API     | `http://localhost:3001`     |

> Vite requires the `VITE_` prefix to expose variables to browser code.

---

## Deploying to Production

The same code runs in production — only environment variables change.

### Database → Neon

1. Create a free PostgreSQL 17 project at [neon.tech](https://neon.tech).
2. Copy the connection string (looks like `postgresql://user:pass@ep-xxx.neon.tech/neondb?sslmode=require`).

### Backend → Render

1. Push the repo to GitHub.
2. Create a new **Web Service** on [render.com](https://render.com).
3. Set the **Root Directory** to `backend`.
4. **Build Command:** `npm install`
5. **Start Command:** `npm start`
6. Add environment variable:
   - `DATABASE_URL` → your Neon connection string

### Frontend → Vercel

1. Create a new project on [vercel.com](https://vercel.com) and import the repo.
2. Set the **Root Directory** to `frontend`.
3. **Framework Preset:** Vite
4. Add environment variable:
   - `VITE_BACKEND_API_URL` → your Render backend URL (e.g. `https://your-backend.onrender.com`)

---

## Database Schema

The `items` table is created automatically when the backend starts:

```sql
CREATE TABLE IF NOT EXISTS items (
  id         SERIAL PRIMARY KEY,
  name       TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);
```

---

## Stopping Local Development

```bash
# Stop the Postgres container
docker compose down

# Remove the database volume (resets data)
docker compose down -v
```
