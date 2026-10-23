# Sevra

## Overview

Sevra is a full-stack e-commerce application featuring a React frontend and a Node.js/Express backend. It supports user authentication (registration, login, password reset), product management with categories and subcategories, shopping cart functionality, and order processing. The application is designed to be deployable as a web application and as a native Android app via Capacitor.

The backend uses MongoDB for data persistence and Cloudinary for image storage. Authentication is handled via JWT tokens stored in HTTP-only cookies, with support for refresh tokens. Role-based access control distinguishes between standard users and administrators.

## Key Features

- **User Authentication**: Registration, login, logout, password reset, and password change.
- **Role-Based Access Control**: Distinction between `user` and `admin` roles with protected routes.
- **Product Management**: CRUD operations for products, categories, and subcategories. Admins can manage inventory; all users can view products.
- **Shopping Cart**: Add, remove, update, and empty cart items.
- **Order Management**: Create, view, update, and delete orders. Support for bulk order creation from cart.
- **Product Reviews**: Users can post reviews; admins can edit or delete reviews.
- **Image Upload**: Product images are uploaded to Cloudinary.
- **Mobile Support**: Capacitor configuration for Android app packaging.
- **Secure Cookies**: JWTs are stored in HTTP-only, secure (in production) cookies with appropriate `SameSite` policies.

## Architecture

The application follows a standard client-server architecture:

- **Frontend (React)**: A single-page application (SPA) built with Vite. It uses React Router for client-side routing and Zustand (via `useAuthStore`) for state management. API calls are made to the backend, and authentication state is persisted via cookies.
- **Backend (Node.js/Express)**: A RESTful API server. It connects to MongoDB via Mongoose and handles business logic, authentication, and authorization.
- **Database (MongoDB)**: Stores user, product, category, order, and review data.
- **Image Storage (Cloudinary)**: Handles storage and delivery of product images.

### Data Flow

1. The frontend makes HTTP requests to the backend API.
2. The backend validates requests, checks authentication/authorization via middleware, and interacts with MongoDB.
3. For image uploads, the backend sends files to Cloudinary and stores the resulting URL in MongoDB.
4. The frontend renders data based on API responses and manages local state for UI interactions.

## Tech Stack

- **Frontend**:
  - React
  - Vite
  - React Router
  - Tailwind CSS
  - Zustand (implied by `useAuthStore`)
  - Remixicon
  - React Hot Toast
  - Capacitor (for Android)
- **Backend**:
  - Node.js
  - Express
  - Mongoose (MongoDB ODM)
  - JWT (jsonwebtoken)
  - Bcrypt (password hashing)
  - Cloudinary (image storage)
  - CORS
  - Cookie Parser
  - Dotenv
- **Database**:
  - MongoDB

## Project Structure

```
E-Comm/
├── backend/
│   ├── config/
│   │   ├── cloudinary.js       # Cloudinary configuration
│   │   └── db.js               # MongoDB connection
│   ├── controllers/
│   │   └── authController.js   # Authentication logic
│   ├── routes/
│   │   ├── authRoutes.js       # Auth endpoints
│   │   ├── cartRoutes.js       # Cart endpoints
│   │   ├── categoryRoute.js    # Category endpoints
│   │   ├── orderRoute.js       # Order endpoints
│   │   ├── productRoute.js     # Product endpoints
│   │   ├── productVariantRoute.js # Product variant endpoints (stub)
│   │   ├── reviewRoute.js      # Review endpoints
│   │   ├── subCategoryRoute.js # Subcategory endpoints
│   │   └── userRoutes.js       # User endpoints
│   └── server.js               # Express app entry point
└── frontend/
    ├── android/                # Capacitor Android project
    ├── src/
    │   ├── components/
    │   │   └── ProtectedRoute.jsx # Route protection component
    │   ├── App.jsx             # Main app component with routing
    │   ├── index.css           # Global styles (Tailwind)
    │   └── main.jsx            # React entry point
    ├── capacitor.config.json   # Capacitor configuration
    ├── eslint.config.js        # ESLint configuration
    ├── index.html              # HTML entry point
    └── vite.config.js          # Vite configuration
```

## Prerequisites

- **Node.js** (version not specified in source, but required for Express and Vite)
- **MongoDB** instance (local or Atlas)
- **Cloudinary** account (for image storage)
- **Capacitor CLI** (if building the Android app)

## Installation

### Backend

1. Navigate to the `backend` directory.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the `backend` directory with the following variables (see Configuration section).

### Frontend

1. Navigate to the `frontend` directory.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Configure the API base URL in the frontend code (likely in `src/api/api.js`, which is not provided but referenced in `App.jsx`).

### Android App (Optional)

1. Ensure Capacitor is installed.
2. Build the frontend:
   ```bash
   npm run build
   ```
3. Sync with Capacitor:
   ```bash
   npx cap sync android
   ```
4. Open the Android project in Android Studio:
   ```bash
   npx cap open android
   ```

## Configuration

### Backend Environment Variables

Create a `.env` file in the `backend` directory with the following variables:

```env
# Server
PORT=5000
NODE_ENV=development # or "production"

# Database
MONGO_URI=mongodb://localhost:27017/sevra

# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Frontend URL (for CORS)
FRONTEND_API_URL=http://localhost:5173
```

### Frontend Configuration

The frontend likely requires an API base URL configuration. This is typically set in an environment variable or a configuration file (e.g., `src/api/api.js`). The exact location and variable name could not be determined from the provided files.

## Usage

### Running the Backend

```bash
cd backend
npm start
```

The server will listen on the port specified by the `PORT` environment variable.

### Running the Frontend

```bash
cd frontend
npm run dev
```

The frontend will be available at `http://localhost:5173` (default Vite port).

### Building for Production

```bash
cd frontend
npm run build
```

The build output will be in the `dist` directory, which is configured as the `webDir` in `capacitor.config.json`.

## API Reference

### Authentication

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/register` | Register a new user | No |
| POST | `/login` | Login with email and password | No |
| POST | `/logout` | Logout (clears cookies) | Yes |
| GET | `/me` | Get current user info | Yes |
| POST | `/refresh` | Refresh access token | No (uses refresh token cookie) |
| POST | `/reset-password/:token` | Reset password using token | No |
| POST | `/change-password` | Change password | Yes |

### Categories

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/categories` | Get all categories | No |
| POST | `/categories` | Create a category | Admin |
| PUT | `/categories/:id` | Update a category | Admin |
| DELETE | `/categories/:id` | Delete a category | Admin |

### Subcategories

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/subcategories` | Get all subcategories | No |
| POST | `/subcategories` | Create a subcategory | Admin |
| PUT | `/subcategories/:id` | Update a subcategory | Admin |
| DELETE | `/subcategories/:id` | Delete a subcategory | Admin |

### Products

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/products` | Get all products | No |
| GET | `/products/:id` | Get a product by ID | Yes |
| POST | `/products` | Create a product (with image upload) | Admin |
| PUT | `/products/:id` | Update a product | Admin |
| DELETE | `/products/:id` | Delete a product | Admin |

### Reviews

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/reviews` | Get all reviews | No |
| POST | `/reviews` | Create a review | Yes |
| PUT | `/reviews/:id` | Update a review | Admin |
| DELETE | `/reviews/:id` | Delete a review | Admin |

### Cart

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/cart` | Get user's cart | Yes |
| POST | `/cart` | Add item to cart | Yes |
| PATCH | `/cart/:id` | Update cart item | Yes |
| DELETE | `/cart/:id` | Remove item from cart | Yes |
| DELETE | `/cart` | Empty cart | Yes |

### Orders

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/order` | Get user's orders | Yes |
| POST | `/order` | Create an order | Yes |
| POST | `/order/all` | Create orders from all cart items | Yes |
| PUT | `/order/:id` | Update an order | Yes |
| DELETE | `/order/:id` | Delete an order | Yes |

### Users

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/users` | Get all users | Admin |
| GET | `/users/me` | Get current user's location | Yes |
| DELETE | `/users/:id` | Delete a user | Admin |

## Example

### Registering a User

```bash
curl -X POST http://localhost:5000/register \
  -H "Content-Type: application/json" \
  -d '{
    "fullName": "John Doe",
    "email": "john@example.com",
    "password": "securepassword123"
  }'
```

### Logging In

```bash
curl -X POST http://localhost:5000/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "securepassword123"
  }'
```

### Getting Current User

```bash
curl -X GET http://localhost:5000/me \
  -H "Cookie: access_token=your_jwt_token"
```

## Error Handling and Limitations

- **Authentication Errors**: The backend returns appropriate HTTP status codes (e.g., 401 for unauthorized, 403 for forbidden) and JSON error messages.
- **Validation**: The backend validates input data (e.g., checking for existing email during registration).
- **CORS**: The backend restricts CORS to allowed origins (`FRONTEND_API_URL`, `https://localhost`, `capacitor://localhost`).
- **Cookie Security**: Cookies are set as `httpOnly` and `secure` in production. The `SameSite` attribute is set to `none` in production and `lax` in development.
- **Product Variant Route**: The `productVariantRoute.js` file is a stub with no implemented routes.
- **Email Verification**: Email verification routes are commented out in `authRoutes.js` and `App.jsx`, indicating this feature is not currently active.
- **Forgot Password**: The forgot password route is commented out in `authRoutes.js` and `App.jsx`.

## Security Considerations

- **Password Hashing**: Passwords are hashed using bcrypt with a salt round of 10.
- **JWT Tokens**: Access and refresh tokens are generated using JWT. Access tokens are short-lived, and refresh tokens are used to obtain new access tokens.
- **HTTP-Only Cookies**: JWTs are stored in HTTP-only cookies to prevent XSS attacks.
- **CORS**: CORS is restricted to specific origins to prevent unauthorized cross-origin requests.
- **Role-Based Access Control**: Middleware (`verifyToken`, `authorizeRole`) ensures that only authorized users can access specific routes.
- **Input Validation**: The backend validates input data to prevent common vulnerabilities.

## Contributing

Contributions are welcome. Please follow these general guidelines:

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Make your changes and commit them with clear, descriptive messages.
4. Push your branch to your fork.
5. Open a pull request to
