# JobPortal

A full-stack job portal where employers post openings and candidates discover and apply for roles — built with a React front end, an Express/MongoDB back end, and Firebase Authentication.

**Live Site:** https://job-portal-three-blond.vercel.app

**API:** https://jobportal-67jv.onrender.com

---

## Overview

Career Code connects job seekers with employers. Candidates can browse open roles, view details, and apply with a LinkedIn/GitHub/resume link. Employers (HR) can post new openings, track applicants, and update application status — all protected behind Firebase-verified routes so only the right people can see or change the right data.

## Features

**For candidates**
- Browse and search job listings
- View full job details
- Apply to a job with LinkedIn, GitHub, and resume links
- Track the status of submitted applications

**For employers**
- Post new job openings with salary range, requirements, and responsibilities
- View and manage jobs they've posted
- Review applicants per job and update application status (Review, Interview, Hired, Rejected)

**Platform**
- Firebase Authentication (email/password + Google sign-in)
- Protected routes on both client and server
- Ownership checks — HR can only manage their own jobs and applicants
- Rate limiting, input validation, and sanitized requests on the API

## Tech Stack

**Frontend**
- React 19
- Vite
- Tailwind CSS + daisyUI
- React Router
- Axios
- Firebase Auth (client SDK)
- Motion (animations)
- SweetAlert2

**Backend**
- Node.js + Express.js
- MongoDB
- Firebase Admin SDK (token verification)
- express-rate-limit, helmet, express-mongo-sanitize

## Project Structure

```
career-code/
├── client/        # React front end (Vite)
│   └── src/
│       ├── pages/       # Route-level components
│       ├── routes/      # PrivateRoute, router config
│       ├── context/     # AuthContext, AuthProvider
│       ├── hooks/       # useAuth, useAxiosSecure
│       └── firebase/    # Firebase client config
└── server/        # Express API
    ├── routes/     # jobs.routes.js, applications.routes.js
    ├── middleware/ # auth, rate limiting
    └── config/     # db.js, firebase.js
```

## Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- A MongoDB Atlas cluster
- A Firebase project with Authentication enabled

### 1. Clone the repository
```bash
git clone <repository-url>
cd career-code
```

### 2. Set up the backend
```bash
cd server
npm install
```

Create a `.env` file in `server/`:
```
DB_USER=your_mongodb_username
DB_PASS=your_mongodb_password
FB_SERVICE_KEY=your_base64_encoded_firebase_service_account_key
PORT=5000
CLIENT_URL=http://localhost:5173
```

Run the server:
```bash
npm run dev
```

### 3. Set up the frontend
```bash
cd client
npm install
```

Create a `.env.local` file in `client/`:
```
VITE_apiKey=your_firebase_api_key
VITE_authDomain=your_firebase_auth_domain
VITE_projectId=your_firebase_project_id
VITE_storageBucket=your_firebase_storage_bucket
VITE_messagingSenderId=your_firebase_messaging_sender_id
VITE_appId=your_firebase_app_id
VITE_API_URL=http://localhost:5000
```

Run the client:
```bash
npm run dev
```

## API Overview

| Method | Endpoint                        | Description                          | Auth |
|--------|----------------------------------|---------------------------------------|------|
| GET    | `/jobs`                          | Get all job listings                  | Public |
| GET    | `/jobs/:id`                      | Get a single job                      | Public |
| POST   | `/jobs`                          | Post a new job                        | Required |
| DELETE | `/jobs/:id`                      | Delete a job (owner only)             | Required |
| GET    | `/jobs/applications`             | Get jobs posted by an HR, with applicant counts | Required |
| POST   | `/applications`                  | Submit a job application              | Required |
| GET    | `/applications`                  | Get applications submitted by a user  | Required |
| GET    | `/applications/job/:job_id`      | Get applicants for a job (owner only) | Required |
| PATCH  | `/applications/:id`               | Update an application's status (owner only) | Required |

## Security

- All write and owner-specific routes verify the caller's Firebase ID token
- Ownership is checked server-side — HR data is scoped to `req.decoded.email`, never trusted from the request body alone
- Rate limiting on sensitive endpoints
- `helmet` for secure HTTP headers and `express-mongo-sanitize` against query injection
- CORS restricted to the deployed client origin

## License

This project is open source and available for learning and personal use.
