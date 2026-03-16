# Development Environment Setup

## Initial Setup Commands

Run these commands in order to set up your development environment:

```bash
# Navigate to project directory
cd micro-habit-tracker

# Install all dependencies
npm install

# Start Expo development server
npm start
```

## Firebase Configuration

**IMPORTANT:** Before running the app, you MUST configure Firebase:

1. Open `src/firebase/config.ts`
2. Replace placeholder values with your Firebase project credentials
3. See `FIREBASE_SETUP.md` for detailed instructions

## Running the App

### iOS (Mac only)

```bash
# Make sure Xcode and iOS Simulator are installed
npm run ios

# Or press 'i' in the Expo terminal
```

### Android

```bash
# Make sure Android Studio and emulator are set up
npm run android

# Or press 'a' in the Expo terminal
```

### Physical Device

1. Install "Expo Go" app from App Store or Play Store
2. Scan the QR code shown in terminal
3. App will load on your device

## Development Tools

### Recommended VS Code Extensions

- ESLint
- Prettier
- React Native Tools
- Firebase Explorer
- TypeScript Hero

### VS Code Settings

```json
{
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "typescript.tsdk": "node_modules/typescript/lib"
}
```

## Package Scripts

```bash
# Start development server
npm start

# Start with cleared cache
npm start -- -c

# Run on iOS simulator
npm run ios

# Run on Android emulator
npm run android

# Run on web (experimental)
npm run web
```

## Useful Expo Commands

```bash
# Clear Expo cache
expo start -c

# Open on specific device
expo start --ios
expo start --android

# View logs
expo start --dev-client

# Check for updates
expo update

# Doctor (diagnose issues)
expo doctor
```

## Environment Variables (Optional)

For production, consider using environment variables:

1. Install: `npm install react-native-dotenv`
2. Create `.env` file:

```
FIREBASE_API_KEY=your_api_key
FIREBASE_AUTH_DOMAIN=your_auth_domain
FIREBASE_PROJECT_ID=your_project_id
```

3. Update `babel.config.js`:

```javascript
module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module:react-native-dotenv',
        {
          moduleName: '@env',
          path: '.env',
        },
      ],
    ],
  };
};
```

## Firebase Emulator (Optional for local development)

To test without hitting production Firebase:

```bash
# Install Firebase CLI
npm install -g firebase-tools

# Login to Firebase
firebase login

# Initialize Firebase
firebase init

# Start emulators
firebase emulators:start
```

Then update `src/firebase/config.ts`:

```typescript
import { connectAuthEmulator } from 'firebase/auth';
import { connectFirestoreEmulator } from 'firebase/firestore';

// In development only
if (__DEV__) {
  connectAuthEmulator(auth, 'http://localhost:9099');
  connectFirestoreEmulator(db, 'localhost', 8080);
}
```

## Testing

### Manual Testing Checklist

- [ ] User registration works
- [ ] User login works
- [ ] Create habit works
- [ ] Toggle completion works
- [ ] Streaks calculate correctly
- [ ] XP increases on completion
- [ ] Level updates correctly
- [ ] Notifications work (on device)
- [ ] Habit deletion works
- [ ] Logout works

### Test Account

For testing, create a test user:

- Email: test@streaky.com
- Password: test123

## Debugging

### React Native Debugger

1. Install: `brew install --cask react-native-debugger`
2. Start debugger: Open React Native Debugger app
3. In Expo: Shake device → "Debug Remote JS"

### Expo Dev Tools

- Press `d` in terminal to open developer menu
- Press `r` to reload
- Press `m` to toggle menu

### Viewing Logs

```bash
# iOS logs
npx react-native log-ios

# Android logs
npx react-native log-android

# Expo logs (automatic in terminal)
```

### Common Issues

**Metro bundler errors**

```bash
# Clear cache
expo start -c

# Reset Metro
watchman watch-del-all
rm -rf /tmp/metro-*
```

**Module not found errors**

```bash
# Reinstall dependencies
rm -rf node_modules
npm install
```

**iOS build issues**

```bash
cd ios
pod install
cd ..
```

**Android build issues**

```bash
cd android
./gradlew clean
cd ..
```

## Production Build

### iOS

```bash
# Build for App Store
expo build:ios

# Or with EAS
eas build --platform ios
```

### Android

```bash
# Build APK
expo build:android -t apk

# Build AAB for Play Store
expo build:android -t app-bundle

# Or with EAS
eas build --platform android
```

## Git Workflow

```bash
# Create feature branch
git checkout -b feature/new-feature

# Make changes and commit
git add .
git commit -m "Add new feature"

# Push to remote
git push origin feature/new-feature

# Create pull request on GitHub
```

## Code Quality

### Run Type Check

```bash
npx tsc --noEmit
```

### Format Code

```bash
# If you install Prettier
npx prettier --write "src/**/*.{ts,tsx}"
```

## Performance Monitoring

Consider adding:

- React Native Performance (built-in)
- Firebase Performance Monitoring
- Sentry for error tracking

## Documentation

- [Expo Docs](https://docs.expo.dev/)
- [React Native Docs](https://reactnative.dev/)
- [Firebase Docs](https://firebase.google.com/docs)
- [React Navigation Docs](https://reactnavigation.org/)

## Support

If you encounter issues:

1. Check this guide
2. Review error messages carefully
3. Search Expo forums
4. Check Stack Overflow
5. Review Firebase Console for data issues

Happy development! 🚀
