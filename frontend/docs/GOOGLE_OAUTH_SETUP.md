# Google OAuth Setup for LexConnect

## Overview
This guide explains how to set up Google OAuth for the "Continue with Google" authentication feature in LexConnect.

## Prerequisites
- Google Cloud Platform account
- Access to Google Cloud Console

## Setup Steps

### 1. Create Google Cloud Project
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Click "Select a project" → "New Project"
3. Enter project name: "LexConnect"
4. Click "Create"

### 2. Enable Google+ API
1. In your project, go to "APIs & Services" → "Library"
2. Search for "Google+ API"
3. Click "Enable"

### 3. Configure OAuth Consent Screen
1. Go to "APIs & Services" → "OAuth consent screen"
2. Select "External" user type
3. Fill in required fields:
   - App name: LexConnect
   - User support email: your-email@example.com
   - Developer contact: your-email@example.com
4. Click "Save and Continue"
5. Add scopes:
   - `.../auth/userinfo.email`
   - `.../auth/userinfo.profile`
6. Click "Save and Continue"
7. Add test users (if in testing mode)

### 4. Create OAuth 2.0 Credentials
1. Go to "APIs & Services" → "Credentials"
2. Click "Create Credentials" → "OAuth client ID"
3. Select "Web application"
4. Configure:
   - Name: LexConnect Web Client
   - Authorized JavaScript origins:
     - `http://localhost:3000` (development)
     - `https://yourdomain.com` (production)
   - Authorized redirect URIs:
     - `http://localhost:3000` (development)
     - `https://yourdomain.com` (production)
5. Click "Create"
6. Copy the **Client ID** (you'll need this)

### 5. Configure Frontend

Create a `.env.local` file in the frontend directory:

\`\`\`env
NEXT_PUBLIC_API_URL=http://localhost:8000
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your_client_id_here.apps.googleusercontent.com
\`\`\`

### 6. Install Required Package

\`\`\`bash
npm install @react-oauth/google
\`\`\`

### 7. Backend Requirements

Your backend should have an endpoint:

**POST /auth/google**

Request body:
\`\`\`json
{
  "token": "google_id_token_here"
}
\`\`\`

Response:
\`\`\`json
{
  "user": {
    "id": "...",
    "name": "...",
    "email": "...",
    "role": "CLIENT" | "LAWYER" | "ADMIN"
  },
  "accessToken": "...",
  "refreshToken": "..."
}
\`\`\`

The backend should:
1. Verify the Google token
2. Extract user information (email, name)
3. Check if user exists in database
4. If new user, create account with role (may need additional step to select role)
5. Generate access and refresh tokens
6. Return user data and tokens

### 8. Implement Google Login Button (Optional)

For a production-ready implementation, update the login/register pages:

\`\`\`tsx
import { GoogleOAuthProvider, useGoogleLogin } from '@react-oauth/google';

// Wrap your app with GoogleOAuthProvider
<GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!}>
  <YourApp />
</GoogleOAuthProvider>

// In your login component
const login = useGoogleLogin({
  onSuccess: async (response) => {
    await loginWithGoogle(response.access_token);
  },
  onError: () => setError('Google login failed'),
});
\`\`\`

## Testing

1. Start your backend on `http://localhost:8000`
2. Start your frontend on `http://localhost:3000`
3. Click "Continue with Google" on login/register page
4. Verify Google OAuth flow works
5. Check that user is redirected to appropriate dashboard based on role

## Security Notes

- Never commit `.env.local` to version control
- Use HTTPS in production
- Keep Client Secret secure (server-side only)
- Implement CSRF protection
- Validate tokens on backend
- Set appropriate OAuth scopes (minimal required)

## Troubleshooting

**Error: redirect_uri_mismatch**
- Ensure redirect URIs in Google Console match exactly

**Error: invalid_client**
- Check that CLIENT_ID is correct
- Verify project is active in Google Console

**Token verification fails**
- Ensure backend verifies Google token properly
- Check token expiration

## Additional Resources

- [Google OAuth 2.0 Documentation](https://developers.google.com/identity/protocols/oauth2)
- [@react-oauth/google Documentation](https://www.npmjs.com/package/@react-oauth/google)
