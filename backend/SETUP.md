# Backend Setup Instructions for LexConnect

## Environment Variables

Add these to your `backend/.env` file:

```env
# Server Configuration
PORT=8000
NODE_ENV=development

# Database Configuration
DATABASE_URL="postgresql://username:password@localhost:5432/lexconnect"

# JWT Configuration  
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_REFRESH_SECRET=your-super-secret-refresh-key-change-this-in-production
JWT_EXPIRES_IN=15m
JWT_REFRESH_EXPIRES_IN=7d

# Google OAuth
GOOGLE_CLIENT_ID=1046054928844-bpse7lrhkjp3u4she087h2tsc2ge6lek.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=<get-this-from-google-cloud-console>

# CORS
ALLOWED_ORIGINS=http://localhost:3000
```

## Setup Steps

### 1. Generate Strong JWT Secrets

Run these commands to generate secure random keys:

```bash
# For JWT_SECRET
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"

# For JWT_REFRESH_SECRET  
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

Copy the output and paste into your `.env` file.

### 2. Get Google Client Secret

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Navigate to APIs & Services → Credentials
3. Find your OAuth 2.0 Client ID (the one ending in ...apps.googleusercontent.com)
4. Copy the **Client Secret**
5. Add it to `.env` as `GOOGLE_CLIENT_SECRET`

### 3. Set Up Database

Update `DATABASE_URL` with your PostgreSQL connection string:
```
postgresql://USER:PASSWORD@HOST:PORT/DATABASE
```

Example:
```
postgresql://postgres:password@localhost:5432/lexconnect
```

### 4. Run Prisma Migrations

```bash
# Generate Prisma Client
npx prisma generate

# Create and apply database migrations
npx prisma migrate dev --name init
```

### 5. Start the Backend Server

```bash
npm run start:dev
```

The server should start on http://localhost:8000

## API Endpoints

Once running, your backend will provide these endpoints:

- `POST /auth/register` - Register new user
- `POST /auth/login` - Login with email/password
- `POST /auth/google` - Login/Register with Google OAuth
- `GET /auth/me` - Get current user (requires JWT token)
- `POST /auth/refresh` - Refresh access token

## Testing

### Test Registration:
```bash
curl -X POST http://localhost:8000/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123",
    "role": "CLIENT"
  }'
```

### Test Login:
```bash
curl -X POST http://localhost:8000/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'
```

### Test Google OAuth (from frontend):
Click "Continue with Google" button in your frontend app.

## Troubleshooting

**Prisma Client not found:**
```bash
npx prisma generate
```

**Port already in use:**
Change `PORT` in `.env` to a different port (e.g., 8001)

**Database connection error:**
- Verify PostgreSQL is running
- Check `DATABASE_URL` is correct
- Ensure database exists: `createdb lexconnect`
