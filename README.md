# Portfolio

A full-stack personal portfolio and developer showcase application designed with React, Vite, and Node.js.

---

## Overview

This repository contains the source code for my personal portfolio. It showcases technical projects, professional experience, and technical thinking through an interactive web interface backed by a dedicated Express service.

### Key Capabilities

- **Responsive Design & Theming**: Integrated dark and light modes with custom CSS tokens and glassmorphism styling.
- **Interactive UI**: Hardware-accelerated canvas background using Three.js, motion transitions via Framer Motion and GSAP, and smooth inertial scrolling via Lenis.
- **Visitor Analytics**: Server-backed visitor counter with rate-limiting and atomic JSON persistence to track engagement without third-party tracking cookies.
- **Contact Handling**: Transactional contact service supporting direct notifications and automated confirmation emails.
- **Command Palette**: Keyboard-driven navigation interface supporting shortcut access across all sections.

---

## Architecture & Technologies

### Frontend
- **Framework**: React 19, Vite
- **Styling**: Tailwind CSS
- **3D & Animation**: Three.js, GSAP, Framer Motion
- **Utilities**: Lenis, cmdk, react-icons, axios

### Backend
- **Runtime**: Node.js, Express
- **Security & Networking**: Helmet, CORS, express-rate-limit
- **Messaging**: Resend API, Nodemailer

---

## Directory Structure

```text
├── backend/
│   ├── data/                 # Local data persistence (views)
│   ├── routes/               # API route handlers (/contact, /views)
│   ├── server.js             # Express application entry point
│   └── package.json
├── frontend/
│   ├── public/               # Static assets
│   ├── src/
│   │   ├── components/       # UI sections and layout modules
│   │   ├── context/          # Application context providers
│   │   ├── hooks/            # Custom React hooks
│   │   ├── lib/              # Utility functions and API helpers
│   │   └── App.jsx
│   ├── vite.config.js
│   └── package.json
├── package.json              # Root workspace management
└── README.md
```

---

## Getting Started

### Prerequisites

- Node.js (version 20 or later)
- npm

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/krkunal404/portfolio.git
   cd portfolio
   ```

2. Install dependencies:
   ```bash
   npm install
   npm install --prefix backend
   npm install --prefix frontend
   ```

### Configuration

Create a `.env` file inside `backend/`:
```ini
PORT=5000
FRONTEND_URL=http://localhost:5173

# Email Service (Resend)
RESEND_API_KEY=your_resend_api_key
EMAIL_TO=krkunal406@gmail.com
```

Create a `.env` file inside `frontend/`:
```ini
VITE_API_URL=http://localhost:5000
```

### Running Locally

Start both the backend and frontend concurrently from the root directory:
```bash
npm run dev
```

- Frontend interface: `http://localhost:5173`
- Backend API server: `http://localhost:5000`

---

## Build & Production

To generate a production-ready client bundle:
```bash
npm run build --prefix frontend
```

The compiled assets will be written to `frontend/dist/`.

---

## Docker & Hosting

You can containerize and host the entire application (frontend + backend) in a single optimized Docker container.

### 1. Build and Run with Docker Compose (Recommended)

1. Ensure your environment variables are configured (e.g. create a `.env` in the root or in `backend/`).
2. Start the container in detached mode:
   ```bash
   docker compose up -d --build
   ```
3. Access your portfolio at `http://localhost:5000`.

To view container logs or stop:
```bash
docker compose logs -f
docker compose down
```

### 2. Build and Run with Docker CLI

Build image:
```bash
docker build -t portfolio:latest .
```

Run container:
```bash
docker run -d \
  -p 5000:5000 \
  -v portfolio_data:/app/backend/data \
  --name portfolio-app \
  portfolio:latest
```

---

## License

This project is licensed under the MIT License.
