# Authentication Practice App 🔐

A robust Node.js authentication application built to master advanced security concepts and Passport.js strategies.

## 🚀 About The Project

This project serves as a comprehensive playground for learning and implementing secure authentication flows in a modern web application. It goes beyond the basics to explore real-world scenarios like token management and password recovery.

**Key Learning Goals:**

- Mastering **Passport.js** with multiple strategies.
- Understanding stateless authentication with **JWTs**.
- Implementing secure **Refresh Token** rotation.
- Building complete **Password Reset** flows.

## 🛠️ Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB (Mongoose)
- **Authentication**: Passport.js (Local & JWT Strategies)
- **Frontend**: EJS Templates, TailwindCSS
- **Security**: argon2, jsonwebtoken, cookie-parser

## ✨ Features

### 1. Authentication Strategies

- **Local Strategy**: Traditional email/password login.
- **JWT Strategy**: Secure, stateless route protection using JSON Web Tokens.
- **Google OAuth**: Social login integration with account linking support.

### 2. Advanced Token Management

- **Access Tokens**: Short-lived tokens for immediate access (15 mins).
- **Refresh Tokens**: Long-lived, httpOnly cookies to securely rotate access tokens without forcing user re-login.

### 3. User Management

- **Registration & Login**: Complete flows with validation.
- **Role-Based Access**: Support for `User` and `Admin` roles.
- **Secure Logout**: Proper cleanup of cookies and sessions.

### 4. Password Recovery

- **Forgot Password**: Secure flow generating time-limited reset tokens.
- **Reset Password**: Verifies tokens and updates credentials securely.

## 📂 Project Structure

```
src/
├── config/         # Passport & Database configuration
├── controllers/    # Logic for Auth, Password, and Dashboard
├── middleware/     # Custom auth middleware
├── models/         # Mongoose User schemas
├── routes/         # Express route definitions
├── views/          # EJS templates (Pages & Errors)
└── server.js       # App entry point
```

## 📝 Usage

1.  **Install Dependencies**:
    ```bash
    npm install
    ```
2.  **Environment Setup**:
    Create a `.env` file with:
    ```env
    MONGO_URL=your_mongodb_uri
    JWT_SECRET_KEY=your_access_token_secret
    JWT_REFRESH_SECRET=your_refresh_token_secret
    PORT=3000
    GOOGLE_CLIENT_ID=your_google_client_id
    GOOGLE_CLIENT_SECRET=your_google_client_secret
    GOOGLE_CALLBACK_URL=http://localhost:3000/auth/google/callback
    ```
3.  **Run the App**:
    ```bash
    npm run dev
    ```
