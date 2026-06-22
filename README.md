# 📝 Note Auth App

A full-stack note-taking application with authentication, profile management, and email verification — built with the MERN stack.

---

## 🌐 Live Demo

| Frontend | Backend |
|----------|---------|
| [note-auth-eta.vercel.app](https://note-auth-eta.vercel.app) | [note-auth-production.up.railway.app](https://note-auth-production.up.railway.app) |

---

## ✨ Features

- 🔐 **Authentication** — Register, login, logout with JWT
- ✅ **Email Verification** — Verify account via email link (powered by Brevo)
- 🔑 **Forgot Password** — OTP-based password reset via email
- 📝 **Notes CRUD** — Create, read, update and delete personal notes
- 👤 **Profile Management** — Update full name and avatar (base64)
- 🔒 **Change Password** — Secure password update from profile page
- 📬 **Feedback System** — Logged-in users can send feedback directly to inbox
- 📱 **Fully Responsive** — Works on mobile, tablet and desktop

---

## 🛠️ Tech Stack

### Frontend
| Technology | Purpose |
|-----------|---------|
| React + Vite | UI framework |
| Tailwind CSS | Styling |
| React Router v6 | Client-side routing |
| Axios | HTTP requests |
| Lucide React | Icons |
| shadcn/ui | UI components (Avatar, Dropdown, Badge) |

### Backend
| Technology | Purpose |
|-----------|---------|
| Node.js + Express | Server framework |
| MongoDB + Mongoose | Database |
| JWT | Authentication tokens |
| bcrypt | Password hashing |
| Brevo (sib-api-v3-sdk) | Transactional emails |
| Cookie Parser | Cookie handling |
| CORS | Cross-origin requests |

---

## 📁 Project Structure

```
note-auth-app/
├── backend/
│   ├── config/
│   │   └── config.js            # Environment variable exports
│   ├── controllers/
│   │   ├── auth.controller.js   # Register, login, logout, verify, OTP
│   │   ├── note.controller.js   # CRUD for notes
│   │   ├── profile.controller.js# Get/update profile, avatar, password
│   │   └── feedback.controller.js# Send feedback email
│   ├── middleware/
│   │   └── auth.middleware.js   # JWT verification
│   ├── models/
│   │   ├── user.model.js        # User schema
│   │   └── note.model.js        # Note schema
│   ├── routes/
│   │   ├── auth.route.js
│   │   ├── note.route.js
│   │   ├── profile.route.js
│   │   └── feedback.route.js
│   ├── utils/
│   │   ├── brevoClient.js       # Shared Brevo API instance
│   │   ├── verifyMail.js        # Verification + OTP email senders
│   │   └── email-templates.js  # HTML email templates
│   ├── app.js
│   └── server.js
│
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── Navbar.jsx
    │   │   ├── Hero.jsx
    │   │   └── ui/              # shadcn components
    │   ├── context/
    │   │   └── userContext.jsx  # Global user state
    │   ├── pages/
    │   │   ├── Home.jsx         # Landing page (Hero, Features, About, Reviews)
    │   │   ├── Notes.jsx
    │   │   ├── Profile.jsx
    │   │   ├── Feedback.jsx
    │   │   ├── Login.jsx
    │   │   ├── Register.jsx
    │   │   ├── ForgotPassword.jsx
    │   │   ├── VerifyOtp.jsx
    │   │   └── ResetPassword.jsx
    │   ├── App.jsx
    │   └── main.jsx
    └── vercel.json              # SPA routing fix for Vercel
```

---

## 🚀 Getting Started

### Prerequisites

Make sure you have these installed:
- [Node.js](https://nodejs.org/) (v18 or above)
- [MongoDB](https://www.mongodb.com/) (local or Atlas)
- A [Brevo](https://www.brevo.com/) account (free tier is enough)

---

### 1. Clone the repository

```bash
git clone https://github.com/CWJihad/note-auth.git
cd note-auth-app
```

---

### 2. Backend setup

```bash
cd backend
npm install
```

Create a `.env` file inside the `backend` folder:

```env
PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key

# Brevo email service
BREVO_API_KEY=your_brevo_api_key
MAIL_FROM=your_verified_sender@email.com
RECEIVER_EMAIL=your_inbox@email.com

# URLs
BACKEND_URL=http://localhost:3000
CLIENT_URL=http://localhost:5173

NODE_ENV=development
```

Start the backend:

```bash
npm run dev
```

---

### 3. Frontend setup

```bash
cd frontend
npm install
```

Create a `.env` file inside the `frontend` folder:

```env
VITE_API_URL=http://localhost:3000
```

Start the frontend:

```bash
npm run dev
```

The app will be running at `http://localhost:5173`.

---

## 📧 Email Setup (Brevo)

This app uses [Brevo](https://www.brevo.com/) to send emails instead of Gmail SMTP — because platforms like Railway block outbound SMTP ports.

1. Sign up at [brevo.com](https://www.brevo.com/) (free — 300 emails/day)
2. Go to **Settings → SMTP & API → API Keys** → create a new key
3. Go to **Senders, Domains & Dedicated IPs** → add and verify your sender email
4. Paste the API key and verified sender email into your `.env`

---

## 🌍 Deployment

### Backend → Railway

1. Push your backend to GitHub
2. Create a new project on [Railway](https://railway.app/)
3. Connect your GitHub repo
4. Add all your `.env` variables in Railway's **Variables** tab
5. Set `NODE_ENV=production`

### Frontend → Vercel

1. Push your frontend to GitHub
2. Import the project on [Vercel](https://vercel.com/)
3. Add `VITE_API_URL=https://your-railway-backend-url.up.railway.app` in Vercel's **Environment Variables**
4. Make sure `vercel.json` exists in your frontend root for SPA routing:

```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

---

## 🔑 API Endpoints

### Auth
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/auth/register` | Register new user | ❌ |
| POST | `/api/auth/login` | Login | ❌ |
| POST | `/api/auth/logout` | Logout | ❌ |
| GET | `/api/auth/verify-email` | Verify email via token link | ❌ |
| POST | `/api/auth/forgot-password` | Send OTP to email | ❌ |
| POST | `/api/auth/verify-otp` | Verify OTP | ❌ |
| POST | `/api/auth/reset-password` | Reset password with new one | ❌ |

### Notes
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/notes` | Get all notes for user | ✅ |
| POST | `/api/notes` | Create a note | ✅ |
| PUT | `/api/notes/:id` | Update a note | ✅ |
| DELETE | `/api/notes/:id` | Delete a note | ✅ |

### Profile
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/profile` | Get profile | ✅ |
| PUT | `/api/profile` | Update full name | ✅ |
| PUT | `/api/profile/avatar` | Update avatar (base64) | ✅ |
| PUT | `/api/profile/password` | Change password | ✅ |

### Feedback
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/feedback` | Send feedback email | ✅ |

## 🤝 Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you'd like to change.

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

## 👨‍💻 Author

Built with ❤️ by **Md Jihad Khan**  
[GitHub](https://github.com/CWJihad) · [LinkedIn](https://www.linkedin.com/in/cwjihad/)
