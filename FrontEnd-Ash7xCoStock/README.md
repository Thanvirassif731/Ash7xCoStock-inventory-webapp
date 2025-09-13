# CoStocks Web App

A modern web application built with React, TypeScript, and Vite for stock management and tracking.

## 🚀 Features

- **Modern Stack**: React 19 + TypeScript + Vite
- **Authentication**: Complete auth system with login/signup
- **Dashboard**: Interactive dashboard with charts and filters
- **Form Management**: React Hook Form with Yup validation
- **Routing**: React Router DOM with protected routes
- **API Integration**: Axios for HTTP requests
- **UI Components**: Modular components with SCSS styling
- **Toast Notifications**: User feedback system
- **Responsive Design**: Mobile-first approach

## 📋 Prerequisites

- Node.js (version 16 or higher)
- npm or yarn package manager

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd costocks-web-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

## 🏃‍♂️ Getting Started

### Development Server

Start the development server with hot module replacement:

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Build for Production

Create an optimized production build:

```bash
npm run build
```

### Preview Production Build

Preview the production build locally:

```bash
npm run preview
```

### Linting

Run ESLint to check code quality:

```bash
npm run lint
```

## 📁 Project Structure

```
src/
├── api/                 # API services and configuration
│   ├── authService.ts   # Authentication API calls
│   ├── axiosInstance.ts # Axios configuration
│   └── itemsService.ts  # Items/stocks API calls
├── assets/              # Static assets (images, icons)
├── components/          # Reusable UI components
│   ├── Card/           # Product card component
│   ├── ChartCard/      # Chart display component
│   ├── Hero/           # Hero section component
│   ├── Navbar/         # Navigation component
│   ├── Sidebar/        # Sidebar navigation
│   ├── Toast/          # Toast notifications
│   ├── TopFilters/     # Filter components
│   └── PrivateRoute.tsx # Route protection
├── contexts/            # React contexts
│   └── AuthContext.tsx # Authentication context
├── hooks/              # Custom React hooks
│   └── useAuth.ts      # Authentication hook
├── pages/              # Page components
│   ├── Dashboard.tsx   # Main dashboard page
│   ├── Login.tsx       # Login page
│   └── Signup.tsx      # User registration page
├── types/              # TypeScript type definitions
│   └── index.ts        # Shared types
├── App.tsx             # Main application component
├── main.tsx            # Application entry point
└── index.css           # Global styles
```

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the root directory for environment-specific variables:

```env
VITE_API_BASE_URL=your_api_base_url
VITE_APP_TITLE=CoStocks
```

### TypeScript Configuration

The project uses multiple TypeScript configurations:
- `tsconfig.json` - Main TypeScript config
- `tsconfig.app.json` - Application-specific config
- `tsconfig.node.json` - Node.js specific config

## 🧪 Development

### Architecture

- **Context API**: Authentication state management
- **Custom Hooks**: Reusable logic (useAuth)
- **Protected Routes**: Route-level authentication
- **Component Structure**: Modular, reusable components

### Code Style

The project uses ESLint for code linting. Configuration is in `eslint.config.js`.

### Form Validation

Forms use React Hook Form with Yup schema validation for robust form handling.

### API Integration

API calls are centralized in the `src/api/` directory using Axios with a configured instance.

### Styling

SCSS modules provide component-scoped styling with consistent design patterns.

## 📦 Dependencies

### Main Dependencies
- **React 19** - UI library
- **TypeScript** - Type safety
- **React Router DOM** - Client-side routing
- **React Hook Form** - Form management
- **Yup** - Schema validation
- **Axios** - HTTP client

### Development Dependencies
- **Vite** - Build tool and dev server
- **ESLint** - Code linting
- **TypeScript ESLint** - TypeScript-specific linting rules

## 🚀 Deployment

1. Build the project:
   ```bash
   npm run build
   ```

2. The `dist/` folder contains the production-ready files that can be deployed to any static hosting service.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit changes: `git commit -m 'Add feature'`
4. Push to branch: `git push origin feature-name`
5. Submit a pull request

## 📄 License

This project is private and proprietary.

---

Built by Thanvir Assif & Kesavarajan