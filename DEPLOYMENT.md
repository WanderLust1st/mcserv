# Deploying to Ubuntu Server

This guide walks you through deploying your Minecraft server website to an Ubuntu VPS.

## Prerequisites

- Ubuntu 20.04 or 22.04 LTS server
- Domain name pointing to your server's IP
- SSH access to the server
- Node.js 18+ installed (or will be installed)

## Step 1: Server Setup

```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js, npm, and build tools
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

# Install Git
sudo apt install -y git

# Install PM2 (process manager)
sudo npm install -g pm2

# Install Nginx and Certbot for HTTPS
sudo apt install -y nginx certbot python3-certbot-nginx
```

## Step 2: Clone and Build

```bash
# Clone your repository
git clone <your-repo-url> /var/www/minecraft-server
cd /var/www/minecraft-server

# Install dependencies
npm install

# Set environment variables
cp .env.example .env
nano .env  # Edit with your production values

# Generate NextAuth secret if needed
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))" >> .env

# Build for production
npm run build
```

## Step 3: Configure Environment Variables

Edit `.env` with these values:

```env
# Discord OAuth (from Discord Developer Portal)
DISCORD_CLIENT_ID=your_client_id
DISCORD_CLIENT_SECRET=your_client_secret
DISCORD_REDIRECT_URI=http://your-domain.com/api/auth/callback/discord

# NextAuth Security
NEXTAUTH_SECRET=<generated-secret>

# Admin Access (comma-separated Discord IDs)
ADMIN_DISCORD_IDS=admin_discord_id1,admin_discord_id2

# Server Configuration
SERVER_IP=play.yourserver.com
SERVER_PORT=25565

# Application URL (IMPORTANT for production)
NEXT_PUBLIC_APP_URL=https://your-domain.com

# Database
DATABASE_URL="file:./dev.db"
```

## Step 4: Configure Nginx

Create an Nginx config file:

```bash
sudo nano /etc/nginx/sites-available/minecraft-server
```

Add this configuration:

```nginx
server {
    listen 80;
    server_name your-domain.com www.your-domain.com;

    # Redirect HTTP to HTTPS
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name your-domain.com www.your-domain.com;

    # SSL certificates
    ssl_certificate /etc/letsencrypt/live/your-domain.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/your-domain.com/privkey.pem;

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;

    # Next.js app
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    # Static assets
    location /_next/static {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # API routes
    location /api {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
    }
}
```

Enable the site:

```bash
sudo ln -s /etc/nginx/sites-available/minecraft-server /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

## Step 5: Get SSL Certificate

```bash
sudo certbot --nginx -d your-domain.com -d www.your-domain.com
```

## Step 6: Start with PM2

```bash
# Start the application
pm2 start npm --name "minecraft-server" -- start next start

# Save PM2 configuration
pm2 save

# Enable auto-restart on server boot
pm2 startup
```

## Step 7: Verify Deployment

Visit `https://your-domain.com` to see your site!

## Monitoring and Maintenance

### Check application status:
```bash
pm2 status
```

### View logs:
```bash
pm2 logs minecraft-server --lines 100
```

### Restart if needed:
```bash
pm2 restart minecraft-server
```

### Backup database:
```bash
cp ./dev.db /backup/dev-$(date +%Y%m%d).db
```

## Troubleshooting

### App won't start:
```bash
pm2 logs minecraft-server
tail -f /var/www/minecraft-server/pm2.log
```

### Nginx errors:
```bash
sudo nginx -t
sudo systemctl status nginx
```

### PM2 not running:
```bash
sudo systemctl enable pm2-docker  # or use systemd service
```

## Security Checklist

- [ ] SSL certificates installed and auto-renewing
- [ ] Environment variables not exposed in git
- [ ] ADMIN_DISCORD_IDS limited to trusted users only
- [ ] Nginx security headers configured
- [ ] Regular backups scheduled
- [ ] Firewall rules configured (ufw)

## Next Steps

1. Set up automated database backups
2. Configure monitoring (e.g., Uptime Kuma, Prometheus)
3. Set up log rotation
4. Configure fail2ban for DDoS protection
