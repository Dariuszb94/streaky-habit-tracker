# Google Sign-In Setup Guide

This guide will help you configure Google Sign-In for your Streaky app.

## Step 1: Enable Google Sign-In in Firebase Console

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project
3. Navigate to **Authentication** > **Sign-in method**
4. Click on **Google** in the list of providers
5. Click the **Enable** toggle
6. Add a support email (your email)
7. Click **Save**

## Step 2: Get OAuth Client IDs

After enabling Google Sign-In, you'll see your **Web client ID** displayed in the Firebase console. Copy this ID.

## Step 3: Configure iOS Client ID (for iOS app)

1. In Firebase Console, go to **Project Settings** (gear icon)
2. Scroll down to **Your apps**
3. Find your iOS app (or add one if you haven't)
4. Copy the **iOS bundle ID** (should be: `com.streaky.app`)
5. Go to [Google Cloud Console](https://console.cloud.google.com/)
6. Select your Firebase project
7. Go to **APIs & Services** > **Credentials**
8. Click **Create Credentials** > **OAuth client ID**
9. Select **iOS** as application type
10. Enter your iOS bundle ID: `com.streaky.app`
11. Click **Create**
12. Copy the **Client ID** that was created

## Step 4: Configure Android Client ID (for Android app)

1. In your terminal, run:
   ```bash
   cd android
   ./gradlew signingReport
   ```
2. Copy the **SHA-1** fingerprint from the debug keystore
3. Go to [Google Cloud Console](https://console.cloud.google.com/) > **Credentials**
4. Click **Create Credentials** > **OAuth client ID**
5. Select **Android** as application type
6. Enter your package name: `com.streaky.app`
7. Paste your SHA-1 fingerprint
8. Click **Create**
9. Copy the **Client ID** that was created

## Step 5: Update Your Code

Open `src/screens/LoginScreen.tsx` and find this section:

```typescript
const [request, response, promptAsync] = Google.useAuthRequest({
  iosClientId: 'YOUR_IOS_CLIENT_ID.apps.googleusercontent.com',
  androidClientId: 'YOUR_ANDROID_CLIENT_ID.apps.googleusercontent.com',
  webClientId: 'YOUR_WEB_CLIENT_ID.apps.googleusercontent.com',
});
```

Replace the placeholder values with your actual client IDs:

- **iosClientId**: The iOS OAuth client ID from Step 3
- **androidClientId**: The Android OAuth client ID from Step 4
- **webClientId**: The Web client ID from Step 2 (Firebase Console)

Example:

```typescript
const [request, response, promptAsync] = Google.useAuthRequest({
  iosClientId: '123456789-abc123.apps.googleusercontent.com',
  androidClientId: '123456789-xyz789.apps.googleusercontent.com',
  webClientId: '123456789-web123.apps.googleusercontent.com',
});
```

## Step 6: Test on Device

1. Start your Expo dev server:

   ```bash
   npx expo start
   ```

2. Open the app on your device (physical device recommended for OAuth)

3. Tap **"Continue with Google"** button

4. Complete the Google sign-in flow

5. You should be logged in automatically!

## Troubleshooting

### "Developer Error" on Google Sign-In

- Make sure your OAuth client IDs are correct
- Verify your bundle IDs and package names match exactly
- For iOS, ensure the bundle ID in `app.json` matches the one in Google Console

### "Invalid Client" Error

- Double-check that you copied the complete client IDs
- Make sure Google Sign-In is enabled in Firebase Console
- Verify you're using the Web client ID (not the Android/iOS auto-generated ones) for the webClientId parameter

### Sign-In Works but Can't Authenticate with Firebase

- Ensure Google Sign-In is enabled in Firebase Authentication settings
- Check that your Firebase project is properly configured in `src/firebase/config.ts`

## Additional Notes

- For Expo Go development, use physical devices as OAuth may not work properly in simulators
- When building standalone apps, you'll need to configure the OAuth redirect URIs in Google Cloud Console
- The Web Client ID is required even for mobile apps when using Firebase Authentication

## Security Best Practices

- Never commit your OAuth client secrets to version control
- Use environment variables for production builds
- Regularly review authorized apps in your Google account settings
- Monitor authentication logs in Firebase Console

## Support

If you encounter issues:

1. Check the [Expo Auth Session docs](https://docs.expo.dev/versions/latest/sdk/auth-session/)
2. Review [Firebase Authentication docs](https://firebase.google.com/docs/auth)
3. Check your Firebase Console logs for authentication errors
