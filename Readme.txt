📰 RAG News Intelligence API

A scalable Retrieval-Augmented Generation (RAG) REST API that answers user queries over a news corpus using embeddings, vector search, caching, and an LLM.

This project was built as part of the Backend Developer Assessment for Edwid Tech Pvt. Ltd., with a strong focus on API design, system architecture, scalability, and production readiness.

📌 Features

News ingestion pipeline (mock data / RSS ready)

Embedding generation (Jina / HuggingFace compatible)

Semantic search using Vector DB (Qdrant)

LLM-powered contextual answers (Google Gemini)

Session-based chat memory using Redis

Structured interaction logging using PostgreSQL

Dockerized setup for local development

Graceful degradation when optional services are unavailable

🏗️ System Architecture
Client (Postman / cURL)
        |
        v
Node.js (Express API)
        |
        |-- Redis (Chat Session Memory)
        |-- PostgreSQL (Interaction Logs)
        |-- Vector DB (Qdrant) [Optional]
        |
        v
LLM (Google Gemini)

🛠️ Tech Stack
Layer	Technology
Runtime	Node.js (Express)
LLM	Google Gemini
Embeddings	Jina / HuggingFace (pluggable)
Vector DB	Qdrant
Cache	Redis
Database	PostgreSQL
DevOps	Docker, Docker Compose
API Testing	Postman
📂 Project Structure
src/
├── app.js
├── server.js
├── routes/
├── controllers/
├── services/
│   ├── embedding.service.js
│   ├── ingestion.service.js
│   ├── llm.service.js
│   ├── vector.service.js
│   └── chatMemory.service.js
├── db/
│   └── postgres.js
└── utils/

🚀 API Endpoints
Health Check
GET /health

Ingest News Articles
POST /ingest

Chat (RAG Query)
POST /chat
Body:
{
  "sessionId": "session_1",
  "query": "What is the latest news about AI?"
}

Get Chat History
GET /history/:sessionId

Clear Chat History
DELETE /history/:sessionId

🐳 Docker Setup (Local)
Prerequisites

Docker

Docker Compose

Start All Services
docker compose up --build


This will start:

Node.js API

PostgreSQL

Redis

Qdrant (Vector DB)

🔐 Environment Variables

Create a .env file:

PORT=5000

DATABASE_URL=postgresql://<user>:<password>@<host>:<port>/<db>
REDIS_URL=redis://<host>:<port>

QDRANT_URL=http://localhost:6333

GEMINI_API_KEY=your_gemini_api_key

🧪 API Documentation

Postman Collection included in the repository:

/docs/RAG-News-Intelligence-Postman-Collection.json

🎥 Demo Video

An unlisted demo video (under 5 minutes) demonstrates:

Running the project using Docker

Sending queries via Postman

Receiving Gemini-powered responses

Viewing interaction logs in PostgreSQL

📹 Demo Link: (to be shared in email submission)

🌍 Live Deployment (Optional)

Hosted on Render (Free Tier):

👉 https://rag-news-intelligence-api.onrender.com

🚀 Deployment Notes

This service is deployed on Render (Free Tier) with managed cloud services.

Cloud Services Used

PostgreSQL: Render Managed PostgreSQL

Redis: Render Key-Value Store

Vector Database (Qdrant):

Disabled in cloud deployment due to free-tier limitations

Fully supported locally or on paid tiers via QDRANT_URL

Application degrades gracefully when vector DB is unavailable

Design Considerations

Environment-driven configuration

Fault-tolerant initialization

Production-ready architecture

⚠️ Limitations & Future Improvements
Current Limitations

Vector search disabled in free-tier cloud deployment

No token-level streaming responses

No authentication or rate limiting (out of scope)

Planned Improvements

Enable managed vector DB (Qdrant Cloud / Pinecone)

Streaming responses using SSE/WebSockets

API authentication and rate limiting

Observability (metrics, structured logs)

Background ingestion with job queues

🧠 Engineering Rationale

The system is designed with:

Clear separation of concerns

Modular, testable components

Scalability and extensibility in mind

Graceful degradation for optional dependencies

This ensures minimal refactoring is required to scale the platform into a full production RAG system.
