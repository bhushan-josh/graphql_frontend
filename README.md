# Frontend

A React-based frontend application that demonstrates and compares the performance differences between REST API and GraphQL endpoints. This project provides a visual interface to measure response times and data transfer sizes for both API types.

## 🚀 Features

- **REST API Demo**: Fetches user data, posts, and comments using traditional REST endpoints
- **GraphQL Demo**: Retrieves the same data using a single GraphQL query
- **Performance Comparison**: Real-time comparison of response times and data transfer sizes
- **Interactive UI**: Clean, modern interface with performance metrics display
- **TypeScript Support**: Full TypeScript implementation for better development experience

## 📋 Prerequisites

Before running this project, make sure you have:

- **Node.js** (version 16 or higher)
- **npm** package manager
- **Backend API endpoints** running (REST and GraphQL)

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd graphql_frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env` file in the root directory with the following variables:
   ```env
   VITE_REST_API_URL=http://localhost:3000/api
   VITE_GRAPHQL_API_URL=http://localhost:4000/graphql
   ```
   
   **Note**: Replace the URLs with your actual backend API endpoints.

## 🚀 Running the Application

### Development Mode
```bash
npm run dev
```

The application will start on `http://localhost:5173` (or the next available port).

## 📦 Dependencies

### Production Dependencies
- **React** (^19.1.0) - UI library
- **React DOM** (^19.1.0) - React rendering for web
- **React Router DOM** (^6.21.1) - Client-side routing

### Development Dependencies
- **TypeScript** (~5.8.3) - Type safety and enhanced development experience
- **Vite** (^4.5.1) - Build tool and development server
- **ESLint** (^9.30.1) - Code linting and formatting
- **@vitejs/plugin-react** (^4.6.0) - React plugin for Vite
- **TypeScript ESLint** (^8.35.1) - TypeScript support for ESLint

## 🏗️ Project Structure

```
frontend/
├── public/                 # Static assets
├── src/
│   ├── assets/            # Images and static files
│   ├── App.tsx           # Main application component
│   ├── RestDemo.tsx      # REST API demonstration component
│   ├── GraphqlDemo.tsx   # GraphQL demonstration component
│   ├── ApiDemoContext.tsx # Context for managing API state
│   ├── main.tsx          # Application entry point
│   └── index.css         # Global styles
├── package.json          # Dependencies and scripts
├── vite.config.ts        # Vite configuration
├── tsconfig.json         # TypeScript configuration
└── eslint.config.js      # ESLint configuration
```

## 🎯 How to Use

1. **Start the application** using `npm run dev`
2. **Navigate to the homepage** to see the performance comparison dashboard
3. **Click "REST API Demo"** to test REST endpoints
4. **Click "GraphQL Demo"** to test GraphQL endpoints
5. **Compare the performance metrics** displayed in real-time

## 🔧 Configuration

### Environment Variables

The application uses the following environment variables:

- `VITE_REST_API_URL`: URL for your REST API endpoints
- `VITE_GRAPHQL_API_URL`: URL for your GraphQL endpoint

### Backend Requirements

Your backend should provide:

**REST API Endpoints:**
- `GET /users/{id}` - Fetch user information
- `GET /users/{id}/posts` - Fetch user posts
- `GET /posts/{id}/comments` - Fetch post comments

**GraphQL Endpoint:**
- Single endpoint that accepts queries for user data with posts and comments


## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request
