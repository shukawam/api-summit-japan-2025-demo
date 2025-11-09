# Kong API Summit Japan 2025

This is an AI Agent demo for [Kong API Summit Japan 2025](https://jp.konghq.com/events/kongapisummitjapan2025).

## How to run?

- Install Docker and Docker Compose on your machine.
- Ensure `.env` contains any sensitive keys you want to pass through (e.g., `DECK_OPENAI_API_KEY`).
- Start the full stack with `docker compose up --build`.
- Tail service logs (e.g., `docker compose logs -f gateway`) to confirm readiness.
- When finished, stop everything with `docker compose down`.
