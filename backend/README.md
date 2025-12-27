# Portfolio Backend - MERN Stack

Complete Node.js/Express/MongoDB backend for the portfolio site.

## Quick Start

### 1. Install Dependencies
```bash
cd backend
npm install
```

### 2. Configure Environment
```bash
cp .env.example .env
# Edit .env with your MongoDB URI and JWT secret
```

### 3. Start MongoDB
Make sure MongoDB is running locally or use MongoDB Atlas.

### 4. Run Server
```bash
# Development
npm run dev

# Production
npm start
```

Server runs on `http://localhost:5000`

## API Endpoints

### Authentication
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register (first user = admin) |
| POST | `/api/auth/login` | Login, returns JWT |
| GET | `/api/auth/me` | Get current user (protected) |
| PUT | `/api/auth/password` | Change password (protected) |

### Public
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/portfolio` | Get all portfolio data |
| GET | `/api/health` | Health check |

### Admin Protected Routes
All require `Authorization: Bearer <token>` header with admin role.

| Resource | Endpoints |
|----------|-----------|
| Hero | `GET/PUT /api/portfolio/admin/hero` |
| Projects | `GET/POST /api/portfolio/admin/projects`, `PUT/DELETE /:id` |
| Experiences | `GET/POST /api/portfolio/admin/experiences`, `PUT/DELETE /:id` |
| Skills | `GET/POST /api/portfolio/admin/skills`, `PUT/DELETE /:id` |
| Testimonials | `GET/POST /api/portfolio/admin/testimonials`, `PUT/DELETE /:id` |
| Contact | `GET/PUT /api/portfolio/admin/contact` |
| Education | `GET/POST /api/portfolio/admin/education`, `PUT/DELETE /:id` |
| Certifications | `GET/POST /api/portfolio/admin/certifications`, `PUT/DELETE /:id` |

## Project Structure
```
backend/
├── config/db.js           # MongoDB connection
├── controllers/           # Route handlers
│   ├── authController.js
│   └── portfolioController.js
├── middleware/
│   └── authMiddleware.js  # JWT & admin verification
├── models/                # Mongoose schemas
│   ├── User.js
│   ├── Hero.js
│   ├── Project.js
│   ├── Experience.js
│   ├── Skill.js
│   ├── Testimonial.js
│   ├── Contact.js
│   ├── Education.js
│   └── Certification.js
├── routes/
│   ├── authRoutes.js
│   └── portfolioRoutes.js
├── .env.example
├── package.json
├── README.md
└── server.js
```

## Security Features
- Password hashing with bcrypt
- JWT authentication
- Role-based access control (admin/user)
- Input validation with express-validator
- CORS configuration

## Connect Frontend
Update your React frontend to use these API endpoints instead of localStorage.
