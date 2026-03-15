# 🎬 HollywoodAI — AI-Powered Movie Summary Platform

> Instantly digest any movie in minutes with high-quality AI-generated summaries and audio playback.

**Live Demo:** [hollywoodai.vercel.app](https://hollywood-ai-ivory.vercel.app)

---

## 🚀 Overview

HollywoodAI is a full-stack SaaS web application that leverages artificial intelligence to deliver 
instant movie summaries with audio narration. Removing the need to spend hours watching content 
before deciding if it's worth your time.

Built with a focus on real-world product engineering, HollywoodAI includes a complete 
authentication system, subscription-based access control, Stripe payment integration, 
and a fully responsive UI. Mirroring the architecture of production-grade consumer applications.

---

## ✨ Key Features

- 🤖 **AI-Generated Summaries** — Instant, high-quality movie summaries powered by AI
- 🔊 **Audio Playback** — Listen to summaries with a full-featured audio player (play, pause, skip, progress bar)
- 🔐 **Authentication** — Email/password and Google OAuth via Firebase Auth
- 💳 **Stripe Payments** — Full subscription flow with Premium and VIP+ tiers via Stripe + Firebase Extension
- 🔒 **Access Control** — Role-based content gating (Basic / Premium / VIP+)
- ❤️ **Favorites** — Save and manage favorite movies with persistent state
- 🔍 **Live Search** — Debounced real-time movie search
- 📱 **Fully Responsive** — Optimized across all screen sizes

---

## 🛠 Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| State Management | Redux Toolkit |
| Authentication | Firebase Auth (Email + Google OAuth) |
| Database | Firebase Firestore |
| Payments | Stripe + Firestore Stripe Payments Extension |
| Deployment | Vercel |

---

## 🏗 Architecture Highlights

- **App Router** with dynamic routes (`/summary/[id]`, `/player/[id]`) for SEO-friendly movie pages
- **Redux** for global state management across auth, favorites, and modal flows
- **Firebase Firestore** as the backend database with real-time listeners for Stripe checkout sessions
- **Stripe webhook integration** via Firebase Extension for subscription lifecycle management
- **Protected routes** with subscription tier checking before granting content access
- **Custom audio player** built from scratch with `useContext`, `useRef`, and `requestAnimationFrame`

---

## 🚦 Getting Started

### Prerequisites
- Node.js 18+
- Firebase project with Firestore and Authentication enabled
- Stripe account with the Firestore Stripe Payments extension installed

---

## 📁 Project Structure
```
├── app/
│   ├── Dashboard/        # Main dashboard page
│   ├── summary/[id]/     # Movie detail & summary page
│   ├── player/[id]/      # Audio player page
│   ├── favorites/        # Saved movies page
│   ├── plans/            # Subscription plans & Stripe checkout
│   ├── account/          # User account management
│   └── stripe/           # Stripe payment utilities
├── components/           # Reusable UI components
├── redux/                # Redux store, slices
├── data/                 # Data fetching utilities
└── public/               # Static assets
```

---

## 👨‍💻 Author

**Roberto V.**
[GitHub](https://github.com/robertoV00) • [Live Demo](https://hollywood-ai-ivory.vercel.app)
