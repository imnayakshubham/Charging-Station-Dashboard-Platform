# Data Visualization Dashboard Platform

A modern React-based data visualization platform for charging station analytics and scenario modeling. Built with TypeScript, Vite, and Clerk authentication.

## 🚀 Features Implemented

### Core Functionality
- **Authentication System**: Complete user authentication flow using Clerk
  - Sign up/Sign in with email verification
  - Protected routes and layouts
  - Multi-factor authentication support

- **Dashboard Interface**: Comprehensive data visualization dashboard
  - Interactive charts using Chart.js and react-chartjs-2
  - KPI monitoring (Infrastructure Units, Charging Growth, Localization Change, Fleet Growth)
  - Scenario results analysis
  - Responsive grid layout

- **Variable Management System**: Advanced variable configuration panel
  - Categorized variables (3 categories with multiple variables each)
  - Search and filter functionality
  - Toggle active/inactive states
  - Detailed variable descriptions
  - Bulk operations support

- **Modern UI/UX**: Professional dark theme interface
  - Tailwind CSS with custom design system
  - Radix UI components for accessibility
  - Responsive design for mobile and desktop
  - Smooth animations and transitions
  - Custom color scheme with green accent colors

### Technical Features
- **State Management**: Zustand for global state management with devtools
- **Routing**: React Router v7 with protected/public layouts
- **Type Safety**: Full TypeScript implementation
- **Build System**: Vite for fast development and optimized builds
- **Code Quality**: ESLint configuration with React hooks and TypeScript rules

## 🛠️ Setup Instructions

### Prerequisites
- Node.js (v20 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/imnayakshubham/Charging-Station-Dashboard-Platform.git
   cd viz-dashboard-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Configuration**
   Create a `.env` file in the root directory:
   ```env
   VITE_CLERK_PUBLISHABLE_KEY=pk_test_your_clerk_key_here
   ```

4. **Clerk Setup**
   - Sign up at [clerk.com](https://clerk.com)
   - Create a new application
   - Copy your publishable key to the `.env` file

5. **Start Development Server**
   ```bash
   npm run dev
   ```

6. **Access the Application**
   - Open [http://localhost:3000](http://localhost:3000)
   - Sign up with your email
   - Verify your email address
   - Access the dashboard

## 🏗️ Technical Decisions and Trade-offs

### Architecture Choices
- **React 19**: Latest React version for improved performance and features
- **TypeScript**: Full type safety for better development experience and fewer runtime errors
- **Vite**: Fast build tool with excellent developer experience
- **Zustand**: Lightweight state management compared to Redux, simpler API
- **Tailwind CSS**: Utility-first CSS for rapid development and consistent design

### Component Structure
- **Layout-based Architecture**: Separate layouts for public and protected routes
- **Component Composition**: Reusable UI components with Radix UI primitives
- **Store Pattern**: Centralized state management with Zustand
- **Custom Hooks**: Reusable logic extraction (e.g., `use-mobile.ts`)

### Trade-offs Made
- **Clerk Authentication**: Third-party dependency for auth vs. custom implementation
  - ✅ Pros: Rapid development, security, maintenance-free
  - ❌ Cons: Vendor lock-in, potential costs for scale
  - ❌ Cons: No Password reset functionality

- **Static Data**: Mock data in store vs. API integration
  - ✅ Pros: Fast development, no backend dependency
  - ❌ Cons: Not production-ready, limited functionality
- **Tailwind CSS**: Utility classes vs. CSS modules
  - ✅ Pros: Rapid development, consistent design system
  - ❌ Cons: Larger bundle size, learning curve

## ⚠️ Known Limitations

### Current State
- **Mock Data**: All dashboard data is static/mocked
- **No Backend**: No API integration or data persistence
- **Limited Functionality**: Basic CRUD operations not implemented
- **Limited Mobile Support**: Some components may not be fully responsive
- **Component Refactoring**: Some components may need refactoring for better maintainability and performance

### Authentication Limitations
- **Email Verification Required**: Users must verify email before accessing dashboard
- **No Role-based Access**: All authenticated users have same permissions

### Performance Considerations
- **Bundle Size**: Multiple UI libraries may impact initial load time
- **No Code Splitting**: All routes loaded upfront
- **No Caching**: No data caching or offline support

## 🚀 Local Development Instructions

### Available Scripts
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

### Development Workflow
1. **Start Development Server**
   ```bash
   npm run dev
   ```

2. **Access Routes**
   - Landing Page: `http://localhost:3000/`
   - Sign In: `http://localhost:3000/sign-in`
   - Sign Up: `http://localhost:3000/sign-up`
   - Dashboard: `http://localhost:3000/dashboard` (requires authentication)

3. **Development Tips**
   - Use browser dev tools to inspect Zustand store state
   - Check Clerk dashboard for authentication logs
   - Use React DevTools for component debugging
   - Monitor Vite dev server for build errors

### File Structure
```
src/
├── components/          # React components
│   ├── Auth/           # Authentication components
│   ├── Dashboard/      # Dashboard-specific components
│   ├── LandingPage/    # Landing page component
│   ├── Sidebar/        # Navigation sidebar
│   └── ui/             # Reusable UI components
├── layouts/            # Layout components
├── store/              # Zustand store
├── hooks/              # Custom React hooks
├── lib/                # Utility functions
└── assets/             # Static assets
```

### Environment Variables
- `VITE_CLERK_PUBLISHABLE_KEY`: Required for authentication
- All environment variables must be prefixed with `VITE_` for Vite to expose them

---

**Note**: This is a demo/testing application. For production use, additional security measures, error handling, and backend integration would be required.