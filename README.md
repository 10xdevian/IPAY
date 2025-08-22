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
npx prisma studio --schema=packages/db/prisma/schema.prisma

# 7️⃣ Start the development server
npm run dev

```

---

# 📌 Features

- ###### Authentication

  - User can Login and Sign up
  - Password strength check → Require min length + special chars.
  - Input validation using zod
  - user cant send username just number or letter they need to send combination of both
  - user get input filed error if they put not correct data by following validation

- ###### SEO Optimized
  - I am using use Client only as wrapper not to full app
 


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

[Dashboard](https://dashboard-template-1-ivory.vercel.app/en/dashboard)

https://chatgpt.com/share/689ccc5f-c010-8009-a755-603cd2713258

https://www.conventionalcommits.org/en/v1.0.0/
