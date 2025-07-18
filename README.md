# 📱 React Native Contacts App

A **cross-platform mobile application** built with [React Native](https://reactnative.dev), using **SQLite** for local database storage. The app allows users to **upload their own SQLite database** and perform **real-time, dynamic search** on the contact data.

> ⚡ Seamlessly search through your own contact datasets — lightweight, offline, and fast.

---

## 🚀 Features

- 📂 Upload custom SQLite database files
- 🔍 Dynamic search bar with real-time filtering
- 🧩 Auto-detects and renders based on database schema
- 🟢 Built using native React Native CLI (no Expo)
- 📱 Supports both **Android** and **iOS**

## 🧰 Tech Stack

**Frontend / Mobile Framework**
- [React Native](https://reactnative.dev) — cross-platform mobile app framework

**Database**
- [SQLite](https://www.sqlite.org/index.html) — embedded local database
- [react-native-sqlite-storage](https://github.com/andpor/react-native-sqlite-storage) — SQLite bindings for React Native

**Development Tools**
- [React Native CLI](https://github.com/react-native-community/cli) — native CLI to bootstrap and manage the app
- [Metro Bundler](https://facebook.github.io/metro/) — JavaScript bundler for React Native

**Optional Utilities**
- [VS Code](https://code.visualstudio.com/) — recommended IDE
- [Android Studio / Xcode](https://reactnative.dev/docs/environment-setup) — native build tools for Android and iOS


## 🎥 Demo Video
https://github.com/user-attachments/assets/5ef075ef-a390-4dd8-b997-f079a79bd650

# Getting Started

> **Note**: Make sure you have completed the [Set Up Your Environment](https://reactnative.dev/docs/set-up-your-environment) guide before proceeding.

## 1. Clone the Repository

```bash
git clone https://github.com/sud3801/ContactsAppCLI.git
cd ContactsAppCLI

## Step 1: Start Metro

First, you will need to run **Metro**, the JavaScript build tool for React Native.

To start the Metro dev server, run the following command from the root of your React Native project:

```sh
# Using npm
npm start

# OR using Yarn
yarn start
```

## Step 2: Build and run your app

With Metro running, open a new terminal window/pane from the root of your React Native project, and use one of the following commands to build and run your Android or iOS app:

### Android

```sh
# Using npm
npm run android

# OR using Yarn
yarn android
```

### iOS

For iOS, remember to install CocoaPods dependencies (this only needs to be run on first clone or after updating native deps).

The first time you create a new project, run the Ruby bundler to install CocoaPods itself:

```sh
bundle install
```

Then, and every time you update your native dependencies, run:

```sh
bundle exec pod install
```

For more information, please visit [CocoaPods Getting Started guide](https://guides.cocoapods.org/using/getting-started.html).

```sh
# Using npm
npm run ios

# OR using Yarn
yarn ios
```

If everything is set up correctly, you should see your new app running in the Android Emulator, iOS Simulator, or your connected device.

This is one way to run your app — you can also build it directly from Android Studio or Xcode.

## Step 3: Modify your app

Now that you have successfully run the app, let's make changes!

Open `App.tsx` in your text editor of choice and make some changes. When you save, your app will automatically update and reflect these changes — this is powered by [Fast Refresh](https://reactnative.dev/docs/fast-refresh).

When you want to forcefully reload, for example to reset the state of your app, you can perform a full reload:

- **Android**: Press the <kbd>R</kbd> key twice or select **"Reload"** from the **Dev Menu**, accessed via <kbd>Ctrl</kbd> + <kbd>M</kbd> (Windows/Linux) or <kbd>Cmd ⌘</kbd> + <kbd>M</kbd> (macOS).
- **iOS**: Press <kbd>R</kbd> in iOS Simulator.

## Congratulations! :tada:

You've successfully run and modified your React Native App. :partying_face:

### Now what?

- If you want to add this new React Native code to an existing application, check out the [Integration guide](https://reactnative.dev/docs/integration-with-existing-apps).
- If you're curious to learn more about React Native, check out the [docs](https://reactnative.dev/docs/getting-started).

# Troubleshooting

If you're having issues getting the above steps to work, see the [Troubleshooting](https://reactnative.dev/docs/troubleshooting) page.

# Learn More

To learn more about React Native, take a look at the following resources:

- [React Native Website](https://reactnative.dev) - learn more about React Native.
- [Getting Started](https://reactnative.dev/docs/environment-setup) - an **overview** of React Native and how setup your environment.
- [Learn the Basics](https://reactnative.dev/docs/getting-started) - a **guided tour** of the React Native **basics**.
- [Blog](https://reactnative.dev/blog) - read the latest official React Native **Blog** posts.
- [`@facebook/react-native`](https://github.com/facebook/react-native) - the Open Source; GitHub **repository** for React Native.
