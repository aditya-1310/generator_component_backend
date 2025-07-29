# AccioJob – AI-Driven Component Playground

AccioJob is a full-stack playground where developers can chat with an AI to spin up React components, preview them live, tweak the code, and export straight into their own projects.

---

## 1. High-Level Architecture

```mermaid
%% GitHub renders Mermaid diagrams
flowchart TD
    subgraph Frontend \n(React + Vite)
        FE[SPA – App.jsx & feature components]
        FE -->|REST| API
    end

    subgraph Backend \n(Node.js + Express)
        API[Express Router /controllers] --> Service
    end

    subgraph Services
        Service[Business Logic & Validation] --> DB[(MongoDB)]
        Service --> AI[(Generative AI)]
    end

    FE <-->|Component JSX/CSS| Sandpack[In-browser Sandbox]
```

### Flow
1. The React SPA sends chat & prompt data to `/api/generate` (or session routes).
2. Service layer forwards prompts to the generative-AI SDK and receives JSX/CSS + assistant text.
3. Responses are persisted to MongoDB under a **Session** document (`chatHistory`, `components`).
4. Front-end updates live preview via **Sandpack** so users can interact instantly.

---

## 2. State-Management & Persistence Strategy

Frontend:
* **React `useState`** holds transient UI state: current sessionId, chat messages, generated component preview.
* On every user message we **optimistically** append the user bubble, then POST to the backend.
* AI responses are streamed back; once received we push them into state and update Sandpack files.

Backend:
* **MongoDB** with two primary collections:
  * `users` – credentials & profile.
  * `sessions` – user-specific chat history + generated component list.
* The `sessionService` abstracts DB operations (`createSessionService`, `getSessionById`, etc.).
* All mutations go through the service layer, enabling validation & future caching.

Persistence lifecycle:
1. When a new chat begins the client calls `POST /api/session` to create a record.
2. Each `/generate` call writes the prompt/response into that session’s `chatHistory` and, when JSX exists, pushes the component into `components`.
3. When the SPA reloads it calls `GET /api/session/:id` to hydrate the UI from Mongo.

---

## 3. Key Decisions & Trade-Offs

| Area | Decision | Why | Trade-offs |
|------|----------|-----|------------|
| **Sandboxing** | Use **@codesandbox/sandpack-react** in the browser for previews | Instant feedback, no server-side compilation required | Large bundles run entirely in client; limited to browser capabilities |
| **Auto-save** | Persist every prompt/response under a `Session` document | Zero-loss UX; enables session switching | High write frequency; mitigated by lightweight docs |
| **Chat History Model** | Array of `{role, content}` objects | Mirrors open-AI style schema & keeps ordering | Document may grow large; consider pagination/TTL if necessary |
| **AI Provider** | External Gen-AI SDK (Gemini/OpenAI) | Leverage best-in-class LLMs | Cost & network latency; must secure API keys |
| **Authentication** | JSON Web Tokens (JWT) | Stateless, simple to verify | Tokens stored in localStorage – susceptible to XSS if not careful |
| **Tech Stack** | Node/Express/Mongo + React/Vite | Rapid prototyping, popular ecosystem | No types by default (consider TS in future) |



> Built with ❤️ by the Adi😁.
