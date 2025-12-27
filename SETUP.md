# Amethyst Portfolio - Setup Guide

## Prerequisites
- Node.js (v16 or higher)
- MongoDB (running locally or MongoDB Atlas)

## Backend Setup

1. **Navigate to backend folder:**
   ```bash
   cd backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure environment variables:**
   - Copy `.env.example` to `.env` if needed
   - Update `MONGODB_URI` with your MongoDB connection string
   - Change `JWT_SECRET` to a secure random string for production

4. **Start MongoDB** (if using local MongoDB):
   ```bash
   # On Windows (with MongoDB installed)
   mongod

   # On Mac/Linux
   sudo systemctl start mongod
   ```

5. **Run the backend server:**
   ```bash
   # Development mode (with auto-reload)
   npm run dev

   # Production mode
   npm start
   ```

   Server will run on `http://localhost:5000`

## Frontend Setup

1. **Navigate to root folder:**
   ```bash
   cd ..
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure environment:**
   - Create `.env` file in root directory (see `.env.example`)
   - Set `VITE_API_URL=http://localhost:5000`

4. **Run the frontend:**
   ```bash
   npm run dev
   ```

   Frontend will run on `http://localhost:8080`

## First Time Setup

1. **Create Admin Account:**
   - Go to `http://localhost:8080/admin`
   - The first user you register will automatically become the admin
   - Fill in:
     - Email address
     - Password
   - Click "Access Admin Panel"

2. **Customize Your Portfolio:**
   - Edit Hero section (name, title, subtitle)
   - Add your projects
   - Add work experience
   - Add skills
   - Add testimonials
   - Update contact information

## Important Notes

- **Data Persistence:** All changes made in the admin panel are now saved to MongoDB database
- **Authentication:** Admin access requires login with email/password
- **Security:**
  - Change JWT_SECRET in production
  - Use strong password for admin account
  - Consider using HTTPS in production
- **Deployment:** When deploying to Vercel/Netlify:
  - Backend should be deployed separately (e.g., Railway, Render, Heroku)
  - Update `VITE_API_URL` in frontend `.env` to point to your deployed backend URL
  - Update `CLIENT_URL` in backend `.env` to point to your deployed frontend URL

## Deployment Guide

### Backend Deployment (Example: Railway/Render)
1. Push backend folder to a Git repository
2. Connect to Railway/Render
3. Set environment variables:
   - `MONGODB_URI` (use MongoDB Atlas for production)
   - `JWT_SECRET`
   - `CLIENT_URL` (your Vercel/Netlify frontend URL)
4. Deploy

### Frontend Deployment (Vercel/Netlify)
1. Push entire project to Git repository
2. Connect to Vercel/Netlify
3. Set build settings:
   - Build command: `npm run build`
   - Output directory: `dist`
4. Set environment variable:
   - `VITE_API_URL` = your deployed backend URL
5. Deploy

## Troubleshooting

- **MongoDB Connection Error:** Ensure MongoDB is running and URI is correct
- **CORS Error:** Check that `CLIENT_URL` in backend matches your frontend URL
- **Authentication Error:** Verify JWT_SECRET is set and consistent
- **Changes Not Persisting:** Check browser console for API errors and ensure backend is running
