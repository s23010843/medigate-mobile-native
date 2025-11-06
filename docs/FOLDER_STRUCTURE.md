# 📁 Frontend Folder Structure Guide

**MediGate Mobile Native - React Native with Expo**

---

## 📊 Structure Overview

The frontend follows **React Native and Expo best practices** with a clean, modular architecture:

```
frontend/
├── app/                          # 🎯 Application screens (Expo Router)
├── assets/                       # 🖼️ Static assets (images, fonts)
├── components/                   # 🧩 Reusable UI components
├── constants/                    # ⚙️ Configuration and constants
├── contexts/                     # 🔄 React Context providers
├── docs/                         # 📚 Documentation
├── hooks/                        # 🎣 Custom React hooks
├── private/                      # 🔒 Development data (not in production)
├── scripts/                      # 📜 Build and utility scripts
├── services/                     # 🌐 API services layer
├── trash/                        # 🗑️ Deprecated code (to be removed)
│
├── .env                          # 🔐 Environment variables (local)
├── .env.example                  # 📋 Environment template
├── .gitignore                    # 🚫 Git ignore rules
│
├── babel.config.js               # 🔧 Babel configuration
├── metro.config.js               # 🚇 Metro bundler configuration
├── tailwind.config.js            # 🎨 TailwindCSS configuration
├── tsconfig.json                 # 📘 TypeScript configuration
├── eslint.config.js              # ✅ ESLint configuration
│
├── app.json                      # 📱 Expo app configuration
├── expo-env.d.ts                 # 🔤 Expo TypeScript definitions
├── global.css                    # 🎨 Global styles
├── nativewind-env.d.ts           # 🎨 NativeWind type definitions
├── netlify.toml                  # 🌐 Netlify deployment config
│
├── package.json                  # 📦 Dependencies and scripts
├── package-lock.json             # 🔒 Dependency lock file
│
├── LICENSE                       # ⚖️ MIT License
└── README.md                     # 📖 Project documentation
```

---

## 📂 Detailed Breakdown

### 🎯 `app/` - Application Screens (Expo Router)

File-based routing system powered by Expo Router. Each folder/file represents a route.

```
app/
├── _layout.tsx                   # Root layout with navigation
├── index.tsx                     # Welcome/Splash screen (/)
├── +not-found.tsx                # 404 error page
│
├── account-setup/                # User registration flow
│   └── index.tsx                 # /account-setup
│
├── appointments/                 # Appointment management
│   └── index.tsx                 # /appointments
│
├── dashboard/                    # Main dashboard (after login)
│   └── index.tsx                 # /dashboard
│
├── doctor-profile/               # Doctor details
│   └── index.tsx                 # /doctor-profile
│
├── emergency/                    # Emergency contacts
│   └── index.tsx                 # /emergency
│
├── error/                        # Error pages
│   ├── 429/                      # Rate limit error
│   │   └── index.tsx             # /error/429
│   └── 500/                      # Server error
│       └── index.tsx             # /error/500
│
├── health-records/               # Health records management
│   └── index.tsx                 # /health-records
│
├── login/                        # Authentication
│   └── index.tsx                 # /login
│
├── medication-tracker/           # Medication tracking
│   └── index.tsx                 # /medication-tracker
│
├── notifications/                # Notifications center
│   └── index.tsx                 # /notifications
│
├── pharmacy/                     # Pharmacy locator
│   └── index.tsx                 # /pharmacy
│
├── privacy-policy/               # Privacy policy (no auth)
│   └── index.tsx                 # /privacy-policy
│
├── profile/                      # User profile
│   └── index.tsx                 # /profile
│
├── settings/                     # App settings
│   └── index.tsx                 # /settings
│
└── terms-and-conditions/         # Terms of service (no auth)
    └── index.tsx                 # /terms-and-conditions
```

**Key Features:**
- 📍 File-based routing (folder = route)
- 🔄 Auto-redirect from welcome to dashboard/login
- 🔒 Protected routes with authentication checks
- ⚠️ Error handling (404, 429, 500)
- 📱 Responsive design across all screens

---

### 🧩 `components/` - Reusable UI Components

Shared components used across multiple screens.

```
components/
├── external-link.tsx             # External link component
├── haptic-tab.tsx                # Tab with haptic feedback
├── hello-wave.tsx                # Animated wave component
├── parallax-scroll-view.tsx      # Parallax scrolling view
├── themed-text.tsx               # Text with theme support
├── themed-view.tsx               # View with theme support
│
└── ui/                           # UI component library
    ├── bottom-navigation.tsx     # Bottom navigation bar
    ├── button.tsx                # Custom button
    ├── card.tsx                  # Card component
    ├── input.tsx                 # Input field
    ├── modal.tsx                 # Modal dialog
    └── ...                       # More UI components
```

**Principles:**
- ✅ Reusable across multiple screens
- 🎨 Theme-aware (light/dark mode)
- 📱 Responsive design
- ♿ Accessibility support
- 🔤 TypeScript typed

---

### 🖼️ `assets/` - Static Assets

Images, fonts, and other static files.

```
assets/
└── images/                       # Image assets
    ├── logo.png
    ├── splash.png
    ├── icon.png
    └── ...
```

**Guidelines:**
- 🖼️ Optimize images before adding
- 📦 Use appropriate formats (PNG, JPG, SVG)
- 📏 Provide multiple resolutions (@2x, @3x)
- 🎨 Use vector graphics when possible

---

### ⚙️ `constants/` - Configuration & Constants

Application-wide constants and configuration.

```
constants/
├── config.ts                     # API configuration & endpoints
└── theme.ts                      # Theme colors & styles
```

**`config.ts`** - API Configuration:
```typescript
export const API_CONFIG = {
  BASE_URL: process.env.EXPO_PUBLIC_API_URL || 'http://localhost:8888',
  TIMEOUT: 10000,
  ENDPOINTS: {
    AUTH: '/api/auth',
    DOCTORS: '/api/doctors',
    // ... all endpoints
  }
};
```

**`theme.ts`** - Theme Configuration:
```typescript
export const Colors = {
  light: { /* light theme colors */ },
  dark: { /* dark theme colors */ }
};
```

---

### 🔄 `contexts/` - React Context Providers

Global state management using React Context API.

```
contexts/
└── DataContext.tsx               # Global data provider with API services
```

**DataContext Features:**
- 🔐 Authentication state
- 👤 User data management
- 📊 Global data caching
- 🔄 Automatic data synchronization
- 🌐 API service integration

**Usage:**
```typescript
import { useData } from '@/contexts/DataContext';

const { user, doctors, appointments, isLoading } = useData();
```

---

### 🌐 `services/` - API Services Layer

Service-based architecture for API communication.

```
services/
└── api/
    ├── client.ts                 # HTTP client (Axios/Fetch)
    ├── types.ts                  # TypeScript interfaces
    ├── index.ts                  # Export all services
    │
    ├── userService.ts            # User operations
    ├── doctorService.ts          # Doctor operations
    ├── appointmentService.ts     # Appointment operations
    ├── medicationService.ts      # Medication operations
    ├── healthRecordService.ts    # Health record operations
    ├── notificationService.ts    # Notification operations
    ├── pharmacyService.ts        # Pharmacy operations
    └── emergencyService.ts       # Emergency contact operations
```

**Architecture:**
- 🔄 Automatic local/remote switching via `.env`
- 🔒 Centralized error handling
- 📝 TypeScript type safety
- 🔁 Request/response interceptors
- ⏱️ Timeout handling
- 🔄 Retry logic

**Local vs Remote:**
```typescript
// .env not set → Uses local JSON (private/user-data.json)
// .env set → Uses remote API (MongoDB backend)
EXPO_PUBLIC_API_URL=https://your-api.com
```

---

### 🎣 `hooks/` - Custom React Hooks

Reusable React hooks for common functionality.

```
hooks/
├── use-color-scheme.ts           # Color scheme detection (native)
├── use-color-scheme.web.ts       # Color scheme detection (web)
└── use-theme-color.ts            # Theme color management
```

**Custom Hooks:**
- 🎨 `useColorScheme()` - Get current color scheme
- 🎨 `useThemeColor()` - Get themed colors
- 🔐 `useAuth()` - Authentication state (can be added)
- 📊 `useData()` - Global data access (via DataContext)

---

### 📚 `docs/` - Documentation

Comprehensive project documentation.

```
docs/
├── ARCHITECTURE.md               # Frontend architecture overview
├── ARCHITECTURE_DIAGRAMS.md      # Visual architecture diagrams
├── API_INTEGRATION.md            # API integration guide
├── API_QUICK_REFERENCE.md        # Quick API reference
├── BACKEND_SETUP.md              # Backend setup instructions
├── CHECKLIST.md                  # Development checklist
├── DATA_INTEGRATION.md           # Data flow documentation
├── FEEDBACK_BACKEND_SETUP.md     # Feedback system setup
├── FOLDER_STRUCTURE.md           # This file
├── IMPLEMENTATION_COMPLETE.md    # Implementation summary
├── MIGRATION_SUMMARY.md          # Migration guide
└── APP_REPORT_FEATURE.md         # App report feature docs
```

**Documentation Types:**
- 🏗️ Architecture guides
- 📊 Visual diagrams
- 🔌 API integration
- 🚀 Setup instructions
- ✅ Checklists
- 📝 Implementation notes

---

### 📜 `scripts/` - Build & Utility Scripts

Automation scripts for development and deployment.

```
scripts/
├── build/                        # Build scripts
│   ├── build.bat                 # Windows build script
│   └── script.bat                # Windows utility script
│
└── reset-project.js              # Reset project cache
```

**Scripts Usage:**
```bash
# Reset project (clear cache)
npm run reset-project

# Build scripts (Windows)
cd scripts/build
.\build.bat
```

---

### 🔒 `private/` - Development Data

Local development data (NOT in production).

```
private/
└── user-data.json                # Local JSON data for development
```

**Purpose:**
- 🧪 Testing without backend
- 📊 Sample data structure
- 🚀 Quick prototyping
- 🔄 Automatic fallback when no API_URL

**⚠️ Important:**
- NOT deployed to production
- Added to `.gitignore`
- Only for local development

---

### 🗑️ `trash/` - Deprecated Code

Old/deprecated code kept for reference (to be removed).

```
trash/
├── (tabs)/                       # Old tab-based navigation
├── images/                       # Old images
├── messages/                     # Old messaging feature
├── modal.tsx                     # Old modal implementation
└── _layout.tsx                   # Old layout
```

**Status:**
- ⚠️ Deprecated - do not use
- 📦 Kept for reference
- 🗑️ Will be removed in future cleanup

---

## ⚙️ Configuration Files (Root Level)

### 🔧 Why Config Files Stay at Root

**React Native/Expo Requirement:**
- ❗ Metro bundler expects `metro.config.js` at root
- ❗ Babel expects `babel.config.js` at root
- ❗ TypeScript expects `tsconfig.json` at root
- ❗ ESLint expects `eslint.config.js` at root
- ❗ TailwindCSS expects `tailwind.config.js` at root

**Attempting to move these files will break:**
- ⛔ Build process
- ⛔ Hot reloading
- ⛔ Type checking
- ⛔ Linting
- ⛔ Styling

### 📄 Configuration Files

#### `babel.config.js`
```javascript
module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: ['nativewind/babel']
  };
};
```

#### `metro.config.js`
```javascript
// Metro bundler configuration
const { getDefaultConfig } = require('expo/metro-config');

module.exports = getDefaultConfig(__dirname);
```

#### `tsconfig.json`
```json
{
  "extends": "expo/tsconfig.base",
  "compilerOptions": {
    "strict": true,
    "paths": {
      "@/*": ["./*"]
    }
  }
}
```

#### `tailwind.config.js`
```javascript
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      // Custom theme
    }
  }
};
```

#### `eslint.config.js`
```javascript
module.exports = {
  extends: ['expo', 'prettier'],
  rules: {
    // Custom rules
  }
};
```

---

## 🌍 Environment Variables

### `.env` (Local - Not Committed)
```env
# API Configuration
EXPO_PUBLIC_API_URL=http://localhost:8888

# Optional Services
SENTRY_DSN=your-sentry-dsn
ANALYTICS_KEY=your-analytics-key
```

### `.env.example` (Template - Committed)
```env
# API Configuration
EXPO_PUBLIC_API_URL=https://api.medigate.com

# Optional: Error Tracking
SENTRY_DSN=

# Optional: Analytics
ANALYTICS_KEY=
```

**Usage:**
1. Copy `.env.example` to `.env`
2. Update values for your environment
3. Never commit `.env` to Git

---

## 📦 Dependencies (`package.json`)

### Core Dependencies
- **React Native**: 0.81.5
- **Expo**: ~54.0
- **TypeScript**: ~5.9.2
- **React**: 19.1.0

### UI & Styling
- **NativeWind**: ^4.2.1 (TailwindCSS for React Native)
- **TailwindCSS**: ^3.4.17

### Navigation
- **Expo Router**: ~6.0.14 (File-based routing)
- **React Navigation**: ^7.1.8

### Development
- **ESLint**: ^9.25.0
- **Expo CLI**: Built-in

---

## 🎯 Best Practices

### ✅ DO:
- ✅ Use TypeScript for type safety
- ✅ Follow file-based routing in `app/`
- ✅ Create reusable components in `components/`
- ✅ Use services for API calls
- ✅ Keep configuration in `constants/`
- ✅ Document new features in `docs/`
- ✅ Use contexts for global state
- ✅ Write custom hooks for reusable logic
- ✅ Optimize images in `assets/`
- ✅ Use environment variables for config

### ❌ DON'T:
- ❌ Move config files from root
- ❌ Commit `.env` file
- ❌ Use `trash/` folder code
- ❌ Hardcode API URLs
- ❌ Duplicate components
- ❌ Skip TypeScript types
- ❌ Ignore ESLint warnings
- ❌ Put logic in screen components
- ❌ Use large unoptimized images
- ❌ Expose sensitive data

---

## 🔄 Data Flow

```
User Interaction (Screen)
         ↓
    Component
         ↓
   Context/Hook
         ↓
   API Service
         ↓
   HTTP Client
         ↓
Local JSON OR Remote API
         ↓
   Response Data
         ↓
   Context Update
         ↓
  UI Re-render
```

---

## 🚀 Development Workflow

1. **Create Feature**
   - Add screen in `app/[feature]/index.tsx`
   - Create components in `components/`
   - Add service in `services/api/`
   - Update types in `services/api/types.ts`

2. **Add API Integration**
   - Create service function
   - Add TypeScript types
   - Update DataContext if needed
   - Test with local JSON first

3. **Style Component**
   - Use NativeWind (TailwindCSS)
   - Follow responsive design
   - Support dark mode
   - Test on multiple devices

4. **Document Changes**
   - Update relevant docs in `docs/`
   - Add comments to complex code
   - Update README if needed

5. **Test & Deploy**
   - Test on iOS/Android/Web
   - Run linter: `npm run lint`
   - Build: `npm run web:build`
   - Deploy to Netlify/Expo

---

## 📊 Folder Size Guidelines

| Folder | Typical Size | Max Items |
|--------|--------------|-----------|
| `app/` | 15-30 screens | ~20 routes |
| `components/` | 20-50 files | ~40 components |
| `services/` | 10-15 files | ~15 services |
| `hooks/` | 5-15 files | ~15 hooks |
| `contexts/` | 3-8 files | ~8 contexts |
| `constants/` | 3-10 files | ~10 configs |
| `docs/` | 10-20 files | No limit |
| `scripts/` | 5-10 files | ~10 scripts |

---

## 🔍 Quick Navigation Tips

### Find a Screen:
```
app/[screen-name]/index.tsx
```

### Find a Component:
```
components/[component-name].tsx
or
components/ui/[component-name].tsx
```

### Find an API Service:
```
services/api/[feature]Service.ts
```

### Find Configuration:
```
constants/[config-name].ts
```

### Find Documentation:
```
docs/[TOPIC].md
```

---

## 📝 Adding New Features

### 1. Add New Screen
```bash
# Create folder and file
mkdir app/new-feature
touch app/new-feature/index.tsx
```

### 2. Add Service (if needed)
```bash
touch services/api/newFeatureService.ts
```

### 3. Add Types
```typescript
// services/api/types.ts
export interface NewFeature {
  id: string;
  name: string;
  // ... other fields
}
```

### 4. Update Context (if needed)
```typescript
// contexts/DataContext.tsx
// Add new state and functions
```

### 5. Document
```bash
# Add to relevant documentation
echo "## New Feature" >> docs/FEATURES.md
```

---

## 🎓 Learning Resources

### React Native
- [React Native Docs](https://reactnative.dev/)
- [Expo Docs](https://docs.expo.dev/)

### Expo Router
- [Expo Router Docs](https://docs.expo.dev/router/introduction/)

### NativeWind
- [NativeWind Docs](https://www.nativewind.dev/)

### TypeScript
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

---

## 🆘 Troubleshooting

### Build Errors
```bash
# Clear cache and rebuild
npm run reset-project
rm -rf node_modules
npm install
```

### Config File Not Found
- ✅ Ensure config files are at root
- ❌ Never move babel/metro/tsconfig to subdirectories

### API Not Working
- Check `.env` file exists and has correct URL
- Verify `EXPO_PUBLIC_API_URL` prefix (required by Expo)
- Test local JSON fallback

### Import Errors
- Check `tsconfig.json` paths configuration
- Verify file extensions (.tsx, .ts)
- Restart Metro bundler

---

## ✨ Summary

The frontend follows a **clean, modular architecture** with:

- ✅ **Expo Router** for file-based routing
- ✅ **Service Layer** for API communication
- ✅ **TypeScript** for type safety
- ✅ **NativeWind** for styling
- ✅ **Context API** for state management
- ✅ **Comprehensive Documentation**
- ✅ **Responsive Design** for all devices
- ✅ **Development & Production** ready

**Config files stay at root** due to React Native/Expo requirements.

---

**For more information, see:**
- [Frontend Architecture](ARCHITECTURE.md)
- [API Integration Guide](API_INTEGRATION.md)
- [Backend Setup](BACKEND_SETUP.md)
- [Quick Reference](API_QUICK_REFERENCE.md)

---

**End of Folder Structure Guide**
