# Vinod Kumar Banothu - Personal Portfolio 🚀

A modern, full-stack personal portfolio website built to showcase my projects, technical skills, and professional experience. 

The project is structured as a robust **monorepo** utilizing npm workspaces to seamlessly share API specifications, type definitions, and database schemas between the frontend and backend.

## 🌍 Live Demo

- **Frontend (Vercel):** [https://vinodkumar-eight.vercel.app](https://vinodkumar-eight.vercel.app)
- **Backend API (Render):** [https://vinodkumar.onrender.com](https://vinodkumar.onrender.com)

---

## 🛠️ Tech Stack

### Frontend (`/client`)
- **Framework:** React 19 + Vite
- **Styling:** Tailwind CSS v4, Radix UI Primitives, Lucide Icons
- **Animations:** Framer Motion, tailwind-animate
- **Routing:** Wouter
- **Data Fetching:** TanStack React Query v5
- **API Integration:** Auto-generated fetch clients via Orval (OpenAPI)

### Backend (`/server`)
- **Runtime:** Node.js
- **Framework:** Express.js v5
- **Database:** MongoDB (via Mongoose)
- **Schema Validation:** Zod
- **Logging:** Pino

### Monorepo & Shared Libraries (`/lib`)
- **Workspaces:** npm workspaces
- **Language:** TypeScript

---

## 📁 Project Structure

```text
vport/
├── client/                 # React frontend application
│   ├── src/                # Components, pages, and hooks
│   ├── public/             # Static assets (e.g., resume.pdf)
│   └── vercel.json         # Vercel deployment & proxy rules
├── server/                 # Express backend API
│   ├── src/                # API routes, controllers, and models
│   └── .env                # Backend environment variables
├── lib/                    # Shared monorepo packages
│   ├── api-client-react/   # Auto-generated React Query hooks (Orval)
│   ├── api-spec/           # OpenAPI specifications
│   ├── api-zod/            # Shared Zod validation schemas
│   └── db/                 # Database utilities
├── package.json            # Root workspace configuration
└── README.md
```

---

## 🚀 Features

- **Dynamic Data:** Content (About, Projects, Skills) is served dynamically from a MongoDB database.
- **Fallback Mechanism:** Includes robust fallback data rendering if the database connection temporarily fails.
- **Modern UI/UX:** Highly responsive layout with beautiful scroll and reveal animations using Framer Motion.
- **Type-Safe API:** End-to-end type safety. The frontend API hooks are automatically generated from the backend's OpenAPI specification.
- **Direct CV Download:** Easy access to download my latest resume directly from the hero section.

---

## 💻 Local Development

### Prerequisites
- Node.js (v18+)
- MongoDB (Local or Atlas Cluster)

### 1. Install Dependencies
Navigate to the root directory and install all workspace dependencies:
```bash
npm install
```

### 2. Environment Variables
Create a `.env` file in the `server` directory:
```env
PORT=4000
MONGODB_URI=your_mongodb_connection_string
CLIENT_URL=http://localhost:5173
```
Create a `.env` file in the `client` directory:
```env
VITE_API_URL=http://localhost:4000
```

### 3. Run the Application
You can start the frontend and backend servers using the workspace commands from the root directory:

**Start the Backend Server:**
```bash
npm run dev:server
```

**Start the Frontend Client:**
```bash
npm run dev:client
```

The frontend will be available at `http://localhost:5173` and the backend at `http://localhost:4000`.

---

## 👤 Author

**Vinod Kumar Banothu**
- GitHub: https://github.com/banothuvinodkumar
- LinkedIn: https://www.linkedin.com/in/vinod-kumar-banothu-559a14325
- Email: itsvinodkumarcse@gmail.com