# HORAS-Cert Backend Setup Guide

This guide will help you set up the backend server for form submissions, email notifications, and admin dashboard.

## Prerequisites

- Node.js (v16 or higher)
- PostgreSQL database
- Email account (Gmail or SMTP server)

## Installation Steps

### 1. Install Backend Dependencies

```bash
cd server
npm install
```

### 2. Set Up Database

1. Create a PostgreSQL database:
```sql
CREATE DATABASE horascert;
```

2. Update the `.env` file with your database connection string:
```env
DATABASE_URL="postgresql://username:password@localhost:5432/horas_cert?schema=public"
```

### 3. Configure Environment Variables

Create a `.env` file in the `server` directory (copy from `.env.example`):

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/horas_cert?schema=public"

# Email Configuration (Nodemailer)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_SECURE=false
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
EMAIL_FROM=noreply@horas-cert.com
EMAIL_TO=info@horas-cert.com

# JWT Secret for Admin Authentication
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production

# Server Port
PORT=5000

# CORS Origin (React app URL)
CORS_ORIGIN=http://localhost:3000
```

**For Gmail:**
- Enable 2-factor authentication
- Generate an "App Password" (not your regular password)
- Use the app password in `EMAIL_PASS`

### 4. Run Database Migrations

```bash
cd server
npx prisma generate
npx prisma migrate dev --name init
```

This will create the database tables.

### 5. Create Admin User

You can create an admin user using the API or Prisma Studio:

**Using Prisma Studio:**
```bash
npx prisma studio
```

Then manually create an admin user in the `admins` table with a bcrypt-hashed password.

**Or use the registration endpoint:**
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "admin",
    "email": "admin@horas-cert.com",
    "password": "your-password"
  }'
```

**Note:** In production, disable the registration endpoint or protect it.

### 6. Start the Backend Server

```bash
cd server
npm run dev
```

The server will run on `http://localhost:5000`

### 7. Configure Frontend

Update your React app's `.env` file (in the root directory):

```env
REACT_APP_API_URL=http://localhost:5000
```

## API Endpoints

### Public Endpoints

- `POST /api/applications` - Submit certification application
- `POST /api/applications/contact` - Submit contact form
- `GET /api/health` - Health check

### Admin Endpoints (Requires Authentication)

- `POST /api/auth/login` - Admin login
- `GET /api/applications` - Get all applications (with filters)
- `GET /api/applications/:id` - Get single application

## Usage

### Submitting Forms

The frontend forms (Application and Contact) will automatically submit to the backend API when configured.

### Accessing Admin Dashboard

1. Navigate to `/admin/applications` in your React app
2. Login with your admin credentials
3. View, filter, and manage applications

## Production Deployment

1. Set `NODE_ENV=production`
2. Use a secure `JWT_SECRET`
3. Use a production database
4. Configure proper CORS origins
5. Set up SSL/TLS for email
6. Disable or protect the registration endpoint
7. Use environment variables for all sensitive data

## Troubleshooting

### Database Connection Issues
- Verify PostgreSQL is running
- Check DATABASE_URL format
- Ensure database exists

### Email Not Sending
- Verify email credentials
- For Gmail, use App Password
- Check firewall/network settings
- Verify SMTP port is open

### CORS Errors
- Update CORS_ORIGIN in backend .env
- Ensure frontend URL matches

### Authentication Issues
- Verify JWT_SECRET is set
- Check token expiration
- Clear localStorage and re-login

