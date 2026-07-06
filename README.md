# Minecraft Server Website

A modern, high-performance website for your private Minecraft server featuring Discord authentication, admin panel with RBAC, and beautiful Framer Motion animations.

![Minecraft Server Website](https://img.shields.io/badge/Next.js-15-black) ![TypeScript](https://img.shields.io/badge/TypeScript-5-blue) ![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-cyan)

## ✨ Features

- 🎮 **Modern Gaming Aesthetic** - Dark mode with neon accents and glassmorphism
- ✨ **Beautiful Animations** - Framer Motion for smooth page transitions and effects
- 🔐 **Discord OAuth Authentication** - Secure login with NextAuth.js v5
- 👨‍💼 **Admin Panel** - RBAC-protected dashboard for server management
- 📊 **Server Status Widget** - Real-time player count and server info
- 🚀 **Performance Optimized** - Next.js 15 App Router with proper code splitting

## 🛠️ Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **UI Components**: [Shadcn UI](https://ui.shadcn.com/)
- **Authentication**: [NextAuth.js v5](https://next-auth.js.org/) with Discord Provider
- **Database**: [Prisma ORM](https://prisma.io/) with SQLite

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v18 or higher)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

## 🚀 Quick Start

### 1. Clone and Install Dependencies

```bash
cd ai
npm install
```

### 2. Configure Environment Variables

Copy the example environment file and fill in your values:

```bash
cp .env.example .env
```

Edit `.env` with your values:

```env
# Discord OAuth Configuration
DISCORD_CLIENT_ID=your_discord_client_id_here
DISCORD_CLIENT_SECRET=your_discord_client_secret_here
DISCORD_REDIRECT_URI=http://localhost:3000/api/auth/callback/discord

# NextAuth Security - Generate with: node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
NEXTAUTH_SECRET=your_generated_secret_here

# Admin Access Control (comma-separated Discord IDs)
ADMIN_DISCORD_IDS=your_discord_id1,your_discord_id2

# Server Configuration
SERVER_IP=play.yourserver.com
SERVER_PORT=25565
```

### 3. Generate NextAuth Secret

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Copy the output and paste it into your `.env` file as `NEXTAUTH_SECRET`.

### 4. Set Up Discord OAuth

1. Go to [Discord Developer Portal](https://discord.com/developers/applications)
2. Create a new application
3. Go to "OAuth2" → "General" and copy Client ID and Client Secret
4. Add redirect URI: `http://localhost:3000/api/auth/callback/discord`
5. Paste the values into your `.env` file

### 5. Get Your Discord IDs

1. Open Discord and go to User Settings → Advanced
2. Enable "Developer Mode"
3. Right-click your username and select "Copy ID"
4. Add your admin Discord IDs to `ADMIN_DISCORD_IDS` in `.env`

### 6. Generate Database Schema

```bash
npx prisma generate
npx prisma db push
```

### 7. Run Development Server

```bash
npm run dev
```

Visit `http://localhost:3000` to see your website!

## 📁 Project Structure

```
ai/
├── prisma/
│   └── schema.prisma          # Database schema
├── src/
│   ├── app/
│   │   ├── (auth)/
│   │   │   └── login/
│   │   │       └── page.tsx   # Discord OAuth login
│   │   ├── admin/
│   │   │   └── page.tsx       # Admin dashboard
│   │   ├── api/
│   │   │   ├── auth/          # NextAuth routes
│   │   │   └── server-status/ # Server status API
│   │   ├── globals.css        # Global styles with animations
│   │   ├── layout.tsx         # Root layout
│   │   └── page.tsx           # Landing page
│   ├── components/
│   │   ├── ui/                # Shadcn UI components
│   │   ├── AdminGuard.tsx     # RBAC middleware
│   │   ├── ConnectionGuide.tsx
│   │   ├── ParticleBackground.tsx
│   │   └── ServerStatusWidget.tsx
│   └── lib/
│       ├── auth.ts            # NextAuth configuration
│       ├── auth-config.ts
│       ├── session.ts         # Session utilities
│       ├── server-config.ts   # Server settings
│       └── utils.ts           # Utility functions
├── .env.example               # Environment variables template
├── package.json
├── tsconfig.json
├── tailwind.config.ts
└── next.config.js
```

## 🔐 Authentication Flow

1. User visits the website
2. Clicks "Sign in with Discord"
3. Redirected to Discord OAuth
4. After authorization, redirected back to the app
5. Session is created and user can access protected routes

## 👨‍💼 Admin Panel Access

The admin panel is protected by RBAC:

- Only users with Discord IDs in `ADMIN_DISCORD_IDS` can access `/admin`
- Unauthorized users see a clean 403 Forbidden page
- Admins can manage server news and view user list

## 🎨 Customization

### Change Server IP

Edit `SERVER_IP` in `.env`:

```env
SERVER_IP=play.yourserver.com
```

### Customize Colors

Edit `tailwind.config.ts` to change the neon color palette:

```typescript
colors: {
  neon: {
    purple: "#a855f7",   // Change this
    blue: "#3b82f6",
    cyan: "#06b6d4",
    // etc.
  },
}
```

### Add Real Server Status

Replace the mock status in `src/app/api/server-status/route.ts`:

```typescript
// Install: npm install minecraft-server-status
import { fetchServerStatus } from "minecraft-server-status"

const status = await fetchServerStatus("play.yourserver.com")
return NextResponse.json(status)
```

## 📦 Deployment

### Build for Production

```bash
npm run build
```

### Environment Variables for Production

Update `.env`:

```env
NEXT_PUBLIC_APP_URL=https://yourserver.com
DATABASE_URL="file:./production.db"
```

### Deploy to Vercel

1. Install Vercel CLI: `npm i -g vercel`
2. Run: `vercel`
3. Follow the prompts

## 🤝 Support

- [Discord Server](#) - Join our community
- [Twitter](#) - Follow us for updates
- [YouTube](#) - Watch server highlights

## ⚖️ License

This project is licensed under the MIT License.

## 🎮 Disclaimer

This website is not affiliated with or endorsed by Mojang AB. Minecraft is a trademark of Mojang Synergies AB.
