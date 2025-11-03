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
├── constants/                    # App constants and theme
│   └── theme.ts
├── hooks/                        # Custom React hooks
│   ├── use-color-scheme.ts
│   ├── use-color-scheme.web.ts
│   └── use-theme-color.ts
├── scripts/                      # Build and utility scripts
├── app.json                      # Expo configuration
├── tailwind.config.js           # TailwindCSS configuration
├── tsconfig.json                # TypeScript configuration
├── package.json                 # Dependencies and scripts
└── README.md                    # This file
```

## 🎨 Tech Stack

- **Framework**: React Native + Expo
- **Language**: TypeScript
- **Routing**: Expo Router (file-based routing)
- **Styling**: NativeWind (TailwindCSS for React Native)
- **Icons**: @expo/vector-icons (Ionicons)
- **Navigation**: React Navigation
- **State Management**: React Hooks

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

Create a `.env` file in the root directory (not included in repo):

```env
# API Configuration
API_URL=https://api.medigate.example.com
API_KEY=api_key_here

# Authentication
AUTH_SECRET=your_auth_secret_here
```

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

- **Email**: support.medigate@example.com
- **Phone**: 1-800-MEDIGATE
- **GitHub**: [@s23010843](https://github.com/s23010843)

## 📄 Acknowledgments

- React Native team for the amazing framework
- Expo for simplifying mobile development
- NativeWind for bringing TailwindCSS to React Native
- All contributors and supporters of this project

## 📚 Additional Documentation

- [Architecture Documentation](./ARCHITECTURE.md)
- [API Documentation](./docs/API.md) (Coming soon)
- [Contributing Guidelines](./CONTRIBUTING.md) (Coming soon)

---

Made with ❤️ for better healthcare accessibility