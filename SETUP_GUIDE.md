# 🛠️ Setup Guide for New Improvements

This guide will help you set up and use the new tools and features added to the project.

## 📦 Installing New Dependencies

After pulling these changes, run:

```bash
npm install
```

This will install the new dev dependencies:

- ESLint and plugins (code quality)
- Prettier (code formatting)
- TypeScript types

## 🎨 Code Formatting with Prettier

### Format all files

```bash
npm run format
```

### Check formatting without changing files

```bash
npm run format:check
```

### Format on save (VS Code)

Add to `.vscode/settings.json`:

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode"
}
```

## 🔍 Linting with ESLint

### Check for linting issues

```bash
npm run lint
```

### Auto-fix linting issues

```bash
npm run lint:fix
```

### Enable ESLint in VS Code

1. Install "ESLint" extension by Microsoft
2. It will automatically use `.eslintrc.json`

## 🔐 Setting Up Google OAuth (Optional)

If you want to use Google Sign-In:

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Select your project
3. Navigate to Authentication > Sign-in method
4. Enable Google provider
5. Get your OAuth client IDs
6. Update [src/screens/LoginScreen.tsx](src/screens/LoginScreen.tsx#L38-L42):

```typescript
const [request, response, promptAsync] = Google.useAuthRequest({
  iosClientId: 'YOUR_IOS_CLIENT_ID.apps.googleusercontent.com',
  androidClientId: 'YOUR_ANDROID_CLIENT_ID.apps.googleusercontent.com',
  webClientId: 'YOUR_WEB_CLIENT_ID.apps.googleusercontent.com',
});
```

Or better yet, move them to environment variables!

## 🧪 Using the New Utilities

### Email/Password Validation

```typescript
import { validateEmail, validatePassword } from './utils/validation';

const emailValidation = validateEmail(email);
if (!emailValidation.isValid) {
  console.log(emailValidation.error); // "Please enter a valid email address"
}
```

### Error Handling

```typescript
import { showErrorAlert, retryOperation } from './utils/errorHandler';

// Show friendly error message
try {
  await someOperation();
} catch (error) {
  showErrorAlert(error, 'Operation Failed');
}

// Retry failed network requests
try {
  const data = await retryOperation(
    () => fetchData(),
    3, // max retries
    1000 // delay in ms
  );
} catch (error) {
  showErrorAlert(error);
}
```

### Error Boundary

Wrap components to catch React errors:

```typescript
import { ErrorBoundary } from './components';

function App() {
  return (
    <ErrorBoundary>
      <YourApp />
    </ErrorBoundary>
  );
}
```

## 🎯 Testing the Improvements

### 1. Test Password Visibility Toggle

- Open Login or Register screen
- Type a password
- Tap the eye icon
- Password should toggle between visible/hidden

### 2. Test Email Validation

- Enter invalid email (e.g., "test")
- Try to submit
- Should see red border and error message

### 3. Test Password Reset (Android-safe!)

- Go to Login screen
- Tap "Forgot Password?"
- Modal should appear (works on both iOS and Android)
- Enter email and send

### 4. Test Keyboard Dismiss

- Fill out login form
- Press enter/return on keyboard
- Keyboard should auto-dismiss and form submit

### 5. Test Error Messages

- Try to login with wrong password
- Should see user-friendly error message
- Turn off internet and try to login
- Should see network error message

## 🚀 Running the App

### Start development server

```bash
npm start
```

### Run on iOS

```bash
npm run ios
```

### Run on Android

```bash
npm run android
```

## 📱 Testing on Different Platforms

The password reset modal fix specifically helps Android users. To test:

1. **iOS**: Works with both the old Alert.prompt and new Modal
2. **Android**: Now works properly with the new Modal (previously crashed)

## ⚙️ Recommended VS Code Extensions

Install these for the best experience:

1. **ESLint** - Microsoft (code quality)
2. **Prettier** - Prettier (code formatting)
3. **ES7+ React/Redux/React-Native** - dsznajder (snippets)
4. **TypeScript Hero** - rbbit (organize imports)
5. **Error Lens** - Alexander (inline errors)

## 📚 Additional Resources

- [React Navigation Typing](https://reactnavigation.org/docs/typescript/)
- [Firebase Error Codes](https://firebase.google.com/docs/reference/js/auth)
- [Prettier Configuration](https://prettier.io/docs/en/configuration.html)
- [ESLint Rules](https://eslint.org/docs/latest/rules/)

## 🆘 Troubleshooting

### "Module not found" errors

```bash
npm install
npx expo start --clear
```

### ESLint not working

```bash
npm install --save-dev eslint
```

### Prettier not formatting

Check VS Code settings and ensure Prettier extension is installed

### TypeScript errors in navigation

Make sure `@react-navigation/stack` is installed:

```bash
npm install @react-navigation/stack
```

## ✅ Checklist

- [ ] Run `npm install`
- [ ] Test login/register flows
- [ ] Test password reset on Android
- [ ] Run `npm run lint` and fix any issues
- [ ] Run `npm run format` to format code
- [ ] Update OAuth credentials (if using Google Sign-In)
- [ ] Test on both iOS and Android

---

If you encounter any issues, check [IMPROVEMENTS.md](IMPROVEMENTS.md) for detailed information about what was changed.
