# 🏥 MediGate Mobile Native

[![React Native](https://img.shields.io/badge/React%20Native-0.81.5-blue.svg)](https://reactnative.dev/)
[![Expo](https://img.shields.io/badge/Expo-~54.0-black.svg)](https://expo.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue.svg)](https://www.typescriptlang.org/)
[![NativeWind](https://img.shields.io/badge/NativeWind-4.2-38bdf8.svg)](https://www.nativewind.dev/)

MediGate is a comprehensive healthcare mobile application designed to bridge the gap between patients and healthcare services. In today's fast-paced world, managing medical appointments, accessing doctors, tracking medications, and storing health records can be overwhelming. MediGate makes all of this simple, secure, and accessible from your smartphone.

## ✨ Features

- 🔐 **Secure Authentication** - User login and account management
- 📱 **Responsive Design** - Works seamlessly on smartwatch, mobile, tablet, PC, and TV
- 📅 **Appointment Booking** - Schedule and manage medical appointments
- 📋 **Health Records** - Store and access your medical history
- 💊 **Prescription Management** - Track medications and refills
- 💬 **Direct Messaging** - Communicate with healthcare providers
- 🔒 **Privacy & Security** - HIPAA compliant with encrypted data
- 🌐 **Auto-redirect** - Smart routing based on authentication status
- ⚠️ **Error Handling** - User-friendly error pages (404, 429, 500)
- ✨ **API Integration** - Service-based architecture ready for MongoDB
- 🔄 **Easy Migration** - Switch from local JSON to production backend with just .env change

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Expo CLI
- iOS Simulator (for macOS) or Android Emulator

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/s23010843/medigate-mobile-native.git
cd medigate-mobile-native
```

2. **Install dependencies**
```bash
npm install
# or
yarn install
```

3. **Start the development server**
```bash
npm start
# or
expo start
```

4. **Run on specific platform**
```bash
# iOS
npm run ios

# Android
npm run android

# Web
npm run web
```

## 📁 Project Structure

```
medigate-mobile-native/
├── app/                          # Application screens (Expo Router)
│   ├── +not-found.tsx           # 404 Error page
│   ├── index.tsx                # Welcome/Splash screen with auto-redirect
│   ├── account-setup/           # User registration flow
│   │   └── index.tsx
│   ├── dashboard/               # Main dashboard after login
│   │   └── index.tsx
│   ├── login/                   # Authentication screen
│   │   └── index.tsx
│   ├── error/                   # Error pages
│   │   ├── 429/                 # Rate limit error
│   │   │   └── index.tsx
│   │   └── 500/                 # Server error
│   │       └── index.tsx
│   ├── privacy-policy/          # Privacy policy (no auth required)
│   │   └── index.tsx
│   └── terms-and-conditions/    # Terms of service (no auth required)
│       └── index.tsx
├── assets/                       # Images, fonts, and static files
│   └── images/
├── components/                   # Reusable UI components
│   ├── external-link.tsx
│   ├── haptic-tab.tsx
│   ├── hello-wave.tsx
│   ├── parallax-scroll-view.tsx
│   ├── themed-text.tsx
│   ├── themed-view.tsx
│   └── ui/                      # UI component library
├── constants/                    # App constants and configuration
│   ├── theme.ts                 # Theme configuration
│   └── config.ts                # ✨ API configuration and endpoints
├── contexts/                     # ✨ React Context providers
│   └── DataContext.tsx          # Global state management with API services
├── services/                     # ✨ NEW: Service layer
│   └── api/                     # API services
│       ├── client.ts            # HTTP client (local/remote switching)
│       ├── types.ts             # TypeScript interfaces
│       ├── userService.ts       # User operations
│       ├── doctorService.ts     # Doctor operations
│       ├── appointmentService.ts
│       ├── medicationService.ts
│       ├── healthRecordService.ts
│       ├── notificationService.ts
│       ├── pharmacyService.ts
│       ├── emergencyService.ts
│       └── index.ts             # Export all services
├── private/                      # Private data (not in production)
│   └── user-data.json           # Development data source
├── docs/                         # ✨ Documentation
│   ├── API_INTEGRATION.md       # Architecture details
│   ├── BACKEND_SETUP.md         # Backend implementation guide
│   ├── API_QUICK_REFERENCE.md   # Quick start guide
│   └── MIGRATION_SUMMARY.md     # Implementation summary
├── hooks/                        # Custom React hooks
│   ├── use-color-scheme.ts
│   ├── use-color-scheme.web.ts
│   └── use-theme-color.ts
├── scripts/                      # Build and utility scripts
├── .env.example                  # ✨ Environment variables template
├── app.json                      # Expo configuration
├── tailwind.config.js           # TailwindCSS configuration
├── tsconfig.json                # TypeScript configuration
├── package.json                 # Dependencies and scripts
└── README.md                    # This file
```

✨ **New**: Service-based API architecture with MongoDB migration support!

## 🎨 Tech Stack

- **Framework**: React Native + Expo
- **Language**: TypeScript
- **Routing**: Expo Router (file-based routing)
- **Styling**: NativeWind (TailwindCSS for React Native)
- **Icons**: @expo/vector-icons (Ionicons)
- **Navigation**: React Navigation
- **State Management**: React Context API
- **API Architecture**: Service-based with automatic local/remote switching
- **Type Safety**: Full TypeScript support with comprehensive interfaces

## 📱 Responsive Design

MediGate is fully responsive across all device sizes:

| Device | Width Range | Optimizations |
|--------|------------|---------------|
| Smartwatch | < 250px | Compact layout, simplified text |
| Mobile | 250-767px | Optimized for touch, vertical layout |
| Tablet | 768-1023px | Two-column layouts, larger touch targets |
| Desktop/PC | 1024-1919px | Multi-column layouts, hover effects |
| TV | ≥ 1920px | Large text, simplified navigation |

## 🔒 Authentication Flow

1. **Welcome Screen** (`/`) - Shows for 2 seconds with auto-redirect
2. **Auth Check** - Verifies if user is logged in
3. **Redirect**:
   - If logged in → Dashboard (`/dashboard`)
   - If not logged in → Login (`/login`)

## 🛣️ Routes

| Route | Description | Auth Required |
|-------|-------------|---------------|
| `/` | Welcome/Splash screen | No |
| `/login` | Login page | No |
| `/dashboard` | Main dashboard | Yes |
| `/account-setup` | Registration | No |
| `/privacy-policy` | Privacy policy | No |
| `/terms-and-conditions` | Terms of service | No |
| `/error/429` | Rate limit error | No |
| `/error/500` | Server error | No |
| `*` (404) | Page not found | No |

## 🛠️ Available Scripts

```bash
# Start development server
npm start

# Run on iOS simulator
npm run ios

# Run on Android emulator
npm run android

# Run on web browser
npm run web

# Build for web
npm run web:build

# Lint code
npm run lint

# Reset project (clean cache)
npm run reset-project
```

## 🎯 Environment Setup

### Development Mode (Current)

The app currently uses local JSON data. No backend setup needed!

```bash
# Just start the app
npm start
```

Data is loaded from: `private/user-data.json`

### Production Mode (Future)

Create a `.env` file in the root directory:

```env
# API Configuration
EXPO_PUBLIC_API_URL=https://api.medigate.com

# Optional: Third-party services
SENTRY_DSN=your-sentry-dsn
ANALYTICS_KEY=your-analytics-key
```

See `.env.example` for all available options.

### 🔄 Switching to MongoDB Backend

**Step 1**: Set up backend (see `docs/BACKEND_SETUP.md`)

**Step 2**: Update `.env`:
```env
EXPO_PUBLIC_API_URL=https://your-backend-url.com
```

**Step 3**: Rebuild app
```bash
npx expo build
```

That's it! The app automatically switches from local JSON to your backend API.

📚 **Learn More**: 
- [API Integration Guide](./docs/API_INTEGRATION.md)
- [Backend Setup Guide](./docs/BACKEND_SETUP.md)
- [Quick Reference](./docs/API_QUICK_REFERENCE.md)
- [Migration Summary](./docs/MIGRATION_SUMMARY.md)

## 🧪 Testing

```bash
# Run tests (to be implemented)
npm test

# Run tests with coverage
npm run test:coverage
```

## 📦 Building for Production

### Android

```bash
# Build APK
eas build --platform android

# Build AAB (for Play Store)
eas build --platform android --profile production
```

### iOS

```bash
# Build for iOS
eas build --platform ios

# Build for App Store
eas build --platform ios --profile production
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Contact & Support

- **Email**: support@medigate.example.com
- **Phone**: 1-800-MEDIGATE
- **GitHub**: [@s23010843](https://github.com/s23010843)

## 📄 Acknowledgments

- React Native team for the amazing framework
- Expo for simplifying mobile development
- NativeWind for bringing TailwindCSS to React Native
- All contributors and supporters of this project

## 📚 Additional Documentation

- **[Architecture Documentation](./ARCHITECTURE.md)** - App architecture overview
- **[API Integration Guide](./docs/API_INTEGRATION.md)** - Complete API architecture
- **[Backend Setup Guide](./docs/BACKEND_SETUP.md)** - How to create backend API
- **[Quick Reference](./docs/API_QUICK_REFERENCE.md)** - Quick start guide
- **[Migration Summary](./docs/MIGRATION_SUMMARY.md)** - Implementation details
- **[Data Integration](./docs/DATA_INTEGRATION.md)** - Data flow documentation

---

Made with ❤️ for better healthcare accessibility