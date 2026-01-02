# HORAS-CERT ISO Certification Platform

A production-grade, full-stack ISO certification platform with React frontend and Node.js/Express backend. Includes admin dashboard, application management, certificate validation, and email notifications.

## Features

- **Responsive Frontend**: React SPA with professional design
- **Admin Dashboard**: Manage certificates, applications, and email inquiries
- **Application Management**: Multi-step form for ISO certification applications
- **Certificate Validation**: Public certificate verification system
- **Email Integration**: Automated email notifications and contact form handling
- **Secure Authentication**: JWT-based admin authentication with role-based access
- **Rate Limiting**: Protection against abuse on login and contact forms
- **File Management**: Secure file uploads via Supabase Storage
- **Database**: MongoDB for data persistence

## Technology Stack

**Frontend:**

- React 18
- React Router
- Axios
- Pure CSS

**Backend:**

- Node.js / Express
- MongoDB + Mongoose
- JWT Authentication
- Multer for file uploads
- Supabase Storage
- Winston logging
- Nodemailer for email

## Quick Start

### 1. Frontend Setup

```bash
# Install dependencies
npm install

# Set up environment
cp src/.env.example src/.env
# Edit src/.env with your backend URL

# Development server
npm start

# Build for production
npm run build
```

### 2. Backend Setup

```bash
cd server

# Install dependencies
npm install

# Set up environment
cp .env.example .env
# Edit .env with your MongoDB, email, and JWT config (see below)

# Start server
npm run dev        # Development
npm start          # Production
```

## Environment Configuration

### Frontend (src/.env)

```env
REACT_APP_API_URL=http://localhost:5001
REACT_APP_BACKEND_ENABLED=true
```

### Backend (server/.env)

Required variables:

```env
# Server
NODE_ENV=development
PORT=5001

# Database
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/Horascert?retryWrites=true&w=majority

# JWT
JWT_SECRET=change_this_to_a_strong_random_string_in_production
JWT_EXPIRE=4h

# CORS
CORS_ORIGIN=http://localhost:3000

# Frontend & Company
FRONTEND_URL=http://localhost:3000
COMPANY_WEBSITE=https://horascert.com

# Email (Nodemailer)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
EMAIL_FROM=noreply@horascert.com
EMAIL_TO=info@horascert.com

# Storage (Supabase)
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# Logging
LOG_LEVEL=info
```

**Email Setup (Gmail):**

1. Enable 2-factor authentication on your Google account
2. Generate an "App Password" at https://myaccount.google.com/apppasswords
3. Use the generated 16-character password in EMAIL_PASS

**Supabase Setup:**

1. Create a Supabase project
2. Get API URL and Service Role Key from project settings
3. Create a storage bucket named `applications` or as preferred

## Project Structure

```
├── src/                      # React frontend
│   ├── pages/               # Page components
│   ├── components/          # Reusable components
│   ├── services/            # API client (api.js)
│   ├── App.js               # Main app with routing
│   └── index.js             # React entry point
│
├── server/                  # Express backend
│   ├── models/              # Mongoose schemas
│   ├── routes/              # API routes
│   ├── middleware/          # Auth, rate limiting, errors
│   ├── config/              # Database, email config
│   ├── controllers/         # Business logic
│   ├── services/            # External services (Supabase)
│   ├── utils/               # Helpers (logger, cache)
│   └── server.js            # Express app entry point
│
└── build/                   # Production frontend build
```

## API Endpoints

### Authentication

- `POST /api/v1/auth/login` - Admin login
- `POST /api/v1/auth/logout` - Admin logout
- `GET /api/v1/auth/verify` - Verify admin session

### Admin Routes (protected)

- `GET /api/v1/admin/applications` - List applications
- `PUT /api/v1/admin/applications/:id` - Update application
- `GET /api/v1/admin/emails` - List contact emails
- `PUT /api/v1/admin/emails/:id/status` - Update email status

### Public Routes

- `POST /api/v1/applications` - Submit application (with file upload)
- `POST /api/v1/emails` - Submit contact form
- `GET /api/v1/certificates` - List certificates
- `POST /api/v1/certificates` - Create certificate (admin)

## Deployment

### Frontend (Vercel / Netlify / Static Hosting)

```bash
npm run build
# Deploy 'build' folder to your hosting
```

### Backend (Heroku / Railway / DigitalOcean)

1. Ensure `.env` is configured with production values
2. Push to your hosting platform
3. Verify MongoDB connection and environment variables
4. Run: `npm start`

**Important:** Never commit `.env` files to version control. Use platform environment variables.

## Security Notes

- ✅ JWT tokens stored in secure httpOnly cookies
- ✅ Input validation on all forms (frontend + backend)
- ✅ Rate limiting on login and contact forms
- ✅ CORS configured to specific origin
- ✅ File uploads restricted to PDF and image MIME types
- ✅ 10MB file size limit
- ✅ No sensitive data in logs
- ✅ Production: Secure cookies enabled, NODE_ENV=production

## Production Checklist

- [ ] All `.env` files configured with production values
- [ ] MongoDB Atlas or production database set up
- [ ] Email service configured and tested
- [ ] Supabase storage bucket created
- [ ] Frontend built: `npm run build`
- [ ] Backend running on production server
- [ ] CORS_ORIGIN set to your production domain
- [ ] JWT_SECRET set to strong random value
- [ ] NODE_ENV=production
- [ ] HTTPS enabled on frontend
- [ ] Error logging verified
- [ ] Database backups configured

## Troubleshooting

**Login not working:**

- Check JWT_SECRET matches between frontend and backend
- Verify MongoDB connection
- Check browser console for CORS errors
- Ensure email/password credentials exist in database

**File uploads failing:**

- Verify Supabase credentials are correct
- Check file MIME type (PDF, JPEG, PNG only)
- Ensure file size < 10MB
- Check storage bucket exists and is public

**Email not sending:**

- Verify EMAIL_USER and EMAIL_PASS are correct
- Test with Gmail app password (not regular password)
- Check EMAIL_HOST and EMAIL_PORT for your provider
- Verify EMAIL_FROM is a valid address

## Support

For issues or questions, check application logs:

- Frontend: Browser console and Network tab
- Backend: Check `/logs/error.log` and `/logs/combined.log`

## License

Copyright © 2025 HORAS-CERT. All rights reserved.
