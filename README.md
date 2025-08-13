# 💰 IPAY — Paytm-like Wallet App

A monorepo-based Paytm-like wallet application built with **Next.js**, **Prisma**, **Turborepo**, and **Docker**.  
Supports both **User** and **Merchant** applications, along with a shared database and packages.

---

## 🚀 Quick Start

Follow these steps to run **IPAY** locally:

```bash
# 1️⃣ Clone the repository
git clone https://github.com/10xdevian/IPAY.git

# 2️⃣ Navigate into the project
cd IPAY

# 3️⃣ Install dependencies
npm install

# 4️⃣ Start PostgreSQL with Docker (if Docker Installed)
docker compose up -d

# 5️⃣ Create environment file (IN root)
cp .env.example.txt .env

# Edit `.env` and update your DATABASE_URL

# 6️⃣ (from the root) Run database migrations & generate Prisma Client

npx prisma migrate dev --schema=packages/db/prisma/schema.prisma
npx prisma generate --schema=packages/db/prisma/schema.prisma

# 7️⃣ Start the development server
npm run dev

```

---

# 📌 Features

- Paytm-inspired architecture
- Monorepo setup with Turborepo
- Prisma ORM for database management
- Supports Dockerized Postgres setup
- Modular apps (user-app, merchant-app, etc.)
- Modular packages (db, store(recoil), ui, zod.)

---

## 🎥 Project Demo

![Quick Preview](assets/demo.gif)

🎥 **Full Demo Video:** [Watch on YouTube](https://youtu.be/your_video_id)

---

## 🛠 Tech Stack

**Frontend:**  
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-38B2AC?logo=tailwindcss&logoColor=white)

**Backend:**  
![Prisma](https://img.shields.io/badge/Prisma-2D3748?logo=prisma&logoColor=white)  
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-336791?logo=postgresql&logoColor=white)

**DevOps & Tools:**  
![Docker](https://img.shields.io/badge/Docker-2496ED?logo=docker&logoColor=white)  
![GitHub Actions](https://img.shields.io/badge/GitHub_Actions-2088FF?logo=github-actions&logoColor=white)

---

**Repo setup:** [Paytm 1](https://projects.100xdevs.com/tracks/Paytm/paytm17-1)

**Adding WebHooks:** [Paytm 2](https://projects.100xdevs.com/tracks/PayTM2/paytm2-1)

# 💡 Types (Conventional Commits)

- feat: — new feature
- fix: — bug fix
- chore: — tooling/infra updates
- refactor: — code change that doesn’t fix a bug or add feature
- docs: — documentation changes
- style: — formatting, missing semi colons, etc
- test: — adding or fixing tests

[Dashboard](https://www.aniq-ui.com/en/templates/business-landing-page-nextjs-template)
