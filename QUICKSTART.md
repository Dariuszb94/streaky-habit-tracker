# Quick Start Guide - Streaky

Get up and running in 5 minutes! ⚡

## Prerequisites Check

```bash
# Check Node.js version (should be 16+)
node --version

# Check if Expo CLI is installed
expo --version

# If not installed:
npm install -g expo-cli
```

## 1. Install Dependencies (2 min)

```bash
cd micro-habit-tracker
npm install
```

## 2. Firebase Setup (2 min)

### Quick Firebase Setup:

1. **Create Firebase Project**
   - Visit: https://console.firebase.google.com/
   - Click "Add project" → Name it "streaky" → Create

2. **Get Config**
   - Project Settings (⚙️) → General → "Your apps"
   - Click Web icon (</>) → Register app
   - Copy the `firebaseConfig` object

3. **Update Config File**
   - Open `src/firebase/config.ts`
   - Paste your Firebase config

4. **Enable Authentication**
   - Firebase Console → Authentication → Get Started
   - Enable "Email/Password"

5. **Create Firestore**
   - Firebase Console → Firestore Database → Create Database
   - Start in "test mode" → Enable

6. **Set Security Rules**
   - Firestore → Rules tab
   - Copy rules from `FIREBASE_SETUP.md`
   - Publish

## 3. Start the App (1 min)

```bash
npm start
```

Then:

- Press `i` for iOS Simulator
- Press `a` for Android Emulator
- Scan QR code with Expo Go app on your phone

## 4. Test the App

1. **Register** a new account
2. **Create** your first habit
3. **Toggle** completion
4. **View** your stats

That's it! 🎉

## Troubleshooting

**App won't start?**

```bash
# Clear cache and restart
expo start -c
```

**Firebase errors?**

- Double-check `src/firebase/config.ts` has your real config
- Verify Email/Password auth is enabled
- Check Firestore is created

**Can't log in?**

- Clear app data and try again
- Check Firebase Console → Authentication for user

## What's Next?

- 📱 Test on physical device
- 🎨 Customize habit icons
- 🔔 Set up notifications
- 📊 Track your progress
- 🔥 Build those streaks!

## File Structure Overview

```
src/
├── components/     # UI components (HabitCard, Button, etc.)
├── screens/        # App screens (Home, Login, Stats, etc.)
├── hooks/          # Custom hooks (useAuth, useHabits, etc.)
├── services/       # Firebase services (auth, habits, etc.)
├── utils/          # Helper functions (dates, streaks, XP)
├── navigation/     # Navigation setup
├── firebase/       # 🔥 UPDATE THIS with your config
└── types/          # TypeScript types
```

## Key Files to Know

- `src/firebase/config.ts` - **UPDATE THIS FIRST**
- `App.tsx` - App entry point
- `src/navigation/AppNavigator.tsx` - Navigation structure
- `src/screens/HomeScreen.tsx` - Main habits list
- `src/hooks/useAuth.ts` - Authentication logic

## Common Commands

```bash
# Start development server
npm start

# Start with cache cleared
expo start -c

# Run on iOS
npm run ios

# Run on Android
npm run android

# Install new dependency
npm install <package-name>
```

## Development Workflow

1. Make changes to code
2. Save file (auto-reloads in Expo)
3. Test on simulator/device
4. Repeat!

Hot reloading is enabled, so changes appear instantly! ⚡

## Need Help?

1. Check `README.md` for full documentation
2. Review `FIREBASE_SETUP.md` for detailed Firebase setup
3. Check Expo docs: https://docs.expo.dev
4. Check Firebase docs: https://firebase.google.com/docs

Happy coding! 🚀
