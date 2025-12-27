# Amethyst Showcase

React + Vite portfolio experience styled with Tailwind CSS and shadcn/ui. The project includes a backend (Node/Express + Mongo) for managing portfolio data.

## Prerequisites
- Node.js 18+ and npm
- (Optional) MongoDB if you run the backend locally

## Frontend
Install dependencies and start the Vite dev server:

```sh
npm install
npm run dev
```

Build for production:

```sh
npm run build
```

Preview the production build locally:

```sh
npm run preview
```

## Backend
Navigate to the backend folder, install packages, and start the API server:

```sh
cd backend
npm install
npm start
```

Configure environment variables in backend/.env as needed (MongoDB URI, JWT secret, etc.).

## Tech Stack
- Vite, React, TypeScript
- Tailwind CSS, shadcn/ui, Radix UI
- Node.js, Express, MongoDB (backend)

## Project Scripts
- `npm run dev` – start frontend dev server
- `npm run build` – create production build
- `npm run preview` – preview built frontend locally
