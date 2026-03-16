# Streaky Setup Checklist

Use this checklist to ensure everything is properly configured:

## ✅ Initial Setup

- [ ] Node.js (v16+) installed
- [ ] npm or yarn installed
- [ ] Expo CLI installed globally (`npm install -g expo-cli`)
- [ ] Git initialized (optional)
- [ ] Code editor ready (VS Code recommended)

## ✅ Project Setup

- [ ] Cloned/downloaded project
- [ ] Navigated to project directory: `cd micro-habit-tracker`
- [ ] Installed dependencies: `npm install`
- [ ] No installation errors

## ✅ Firebase Setup

- [ ] Created Firebase project at console.firebase.google.com
- [ ] Copied Firebase web config credentials
- [ ] Updated `src/firebase/config.ts` with actual credentials
- [ ] Enabled Email/Password authentication
- [ ] Created Firestore database
- [ ] Set Firestore security rules (from FIREBASE_SETUP.md)
- [ ] Published security rules

## ✅ Firebase Collections

These will auto-create on first use:

- [ ] `habits` collection (created automatically)
- [ ] `habitCompletions` collection (created automatically)
- [ ] `userStats` collection (created automatically)

## ✅ Development Environment

- [ ] iOS Simulator installed (Mac only) OR
- [ ] Android Emulator installed OR
- [ ] Expo Go app on physical device
- [ ] Can run `npm start` successfully
- [ ] Metro bundler starts without errors
- [ ] Can access app on device/simulator

## ✅ App Testing

### Authentication

- [ ] Can register new account
- [ ] User appears in Firebase Console → Authentication
- [ ] Can log in with created account
- [ ] Can log out
- [ ] Session persists after app restart

### Habits

- [ ] Can create new habit
- [ ] Habit appears in Firestore
- [ ] Can see habit on home screen
- [ ] Can tap to view habit details
- [ ] Can delete habit

### Completions

- [ ] Can toggle habit completion
- [ ] Completion saved in Firestore
- [ ] Completion persists after refresh
- [ ] Can uncomplete habit

### Streaks

- [ ] Streak shows 0 initially
- [ ] Streak increases on consecutive days
- [ ] Fire emoji appears
- [ ] Longest streak tracked

### XP & Leveling

- [ ] XP increases on completion
- [ ] Level increases at 100 XP
- [ ] Progress bar updates
- [ ] XP shown in profile

### Stats

- [ ] Stats screen loads
- [ ] Weekly completion rate calculated
- [ ] Total completions shown
- [ ] Motivational messages appear

### Profile

- [ ] User email displayed
- [ ] Level shown
- [ ] XP shown
- [ ] Achievements displayed
- [ ] Milestones show locked/unlocked

### Notifications (Physical Device Only)

- [ ] Notification permission requested
- [ ] Can set reminder time
- [ ] Notification received at reminder time
- [ ] Notification opens app

## ✅ Data Verification

Check Firebase Console:

### Authentication

- [ ] User created in Authentication → Users

### Firestore → habits

- [ ] Document created with:
  - [ ] id
  - [ ] name
  - [ ] icon
  - [ ] createdAt
  - [ ] userId
  - [ ] reminderTime (if set)

### Firestore → habitCompletions

- [ ] Document created with:
  - [ ] id
  - [ ] habitId
  - [ ] date (YYYY-MM-DD)
  - [ ] completed (boolean)
  - [ ] completedAt

### Firestore → userStats

- [ ] Document created with:
  - [ ] userId
  - [ ] xp
  - [ ] level
  - [ ] totalHabitsCompleted
  - [ ] longestStreak

## ✅ UI/UX Check

- [ ] All screens load without errors
- [ ] Navigation works smoothly
- [ ] Tab bar displays correctly
- [ ] Icons render properly
- [ ] Emoji icons visible
- [ ] Cards have proper shadows
- [ ] Progress bars animate
- [ ] Pull-to-refresh works
- [ ] Loading states show
- [ ] Error alerts appear when needed

## ✅ Code Quality

- [ ] No TypeScript errors
- [ ] No console errors
- [ ] No console warnings
- [ ] App doesn't crash
- [ ] Smooth performance

## ✅ Documentation

- [ ] Read README.md
- [ ] Read FIREBASE_SETUP.md
- [ ] Read QUICKSTART.md
- [ ] Understand project structure

## ✅ Production Readiness

Before deploying:

- [ ] Updated Firebase config with production credentials
- [ ] Updated Firestore security rules for production
- [ ] Tested on both iOS and Android
- [ ] Tested on physical devices
- [ ] Updated app.json with proper bundle ID
- [ ] Updated app name and version
- [ ] Created app icons
- [ ] Created splash screen
- [ ] Set up error tracking (optional)
- [ ] Set up analytics (optional)

## 🚀 Ready to Deploy

- [ ] All tests pass
- [ ] No critical bugs
- [ ] Firebase configured properly
- [ ] App performs well
- [ ] Ready to build for production

## 📝 Build Commands

### iOS

```bash
expo build:ios
# or
eas build --platform ios
```

### Android

```bash
expo build:android
# or
eas build --platform android
```

## ✅ Post-Deployment

- [ ] App published to App Store (iOS)
- [ ] App published to Play Store (Android)
- [ ] Set up monitoring
- [ ] Set up crash reporting
- [ ] Monitor Firebase usage
- [ ] Collect user feedback

## 🎉 Completion

When all items are checked:

- ✅ Your Streaky app is fully set up!
- ✅ Ready for development
- ✅ Ready for testing
- ✅ Ready for production deployment

## 🆘 Troubleshooting

If any item fails, refer to:

- `DEVELOPMENT.md` for development issues
- `FIREBASE_SETUP.md` for Firebase issues
- `README.md` for general documentation
- Expo docs for Expo-specific issues
- Firebase docs for Firebase issues

## 📞 Need Help?

Common issues:

1. **Firebase errors** → Check config.ts has correct credentials
2. **App won't start** → Run `expo start -c` to clear cache
3. **Login fails** → Check Firebase Authentication is enabled
4. **Data not saving** → Check Firestore rules are published
5. **Notifications not working** → Test on physical device

---

**Happy habit building! 🔥**

Keep this checklist handy during development!
