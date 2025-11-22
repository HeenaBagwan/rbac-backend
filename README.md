# RBAC System - Backend

This is the **backend** of the Role-Based Access Control (RBAC) system.  
It is built using **Node.js**, **Express.js**, and **MongoDB** (via Mongoose).  
The backend provides API endpoints for user authentication, role management, permissions, and access control.

## Features

- JWT-based authentication
- Role-based permissions
- CRUD operations for users and roles
- Secure API endpoints with middleware
- Seed data for initial roles, permissions, and users

## Technologies

- Node.js
- Express.js
- MongoDB + Mongoose
- bcryptjs (password hashing)
- jsonwebtoken (JWT)
- dotenv (environment variables)

## Project Structure

backend/
├── controllers/ # Controllers for roles, users, etc.
├── middleware/ # Authentication & RBAC middleware
├── models/ # MongoDB models (User, Role, Permission)
├── routes/ # API routes
├── seed.js # Script to seed initial data
├── db.js # MongoDB connection
├── server.js # Express server entry point
└── package.json # Project dependencies


## Environment Variables

Create a `.env` file in the backend root:

PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/rbac_system
JWT_SECRET=verysecret


## Scripts

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Run seed script to initialize roles, permissions, and users
node seed.js

# Start production server
node server.js
