const { getDefaultConfig } = require('expo/metro-config');
const { withNativeWind } = require('nativewind/metro');

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

config.resolver.unstable_enablePackageExports = false;

module.exports = withNativeWind(config, { input: './global.css' });
// This configuration is for Metro bundler in an Expo project using NativeWind for styling.
// It sets up the default configuration and disables package exports for compatibility.
// The `withNativeWind` function is used to integrate NativeWind with the Metro bundler.
// The `input` option specifies the path to the global CSS file that NativeWind will use.
// The configuration is exported for use by the Metro bundler.
// This setup allows you to use Tailwind CSS classes in your React Native components.
// Ensure you have the necessary dependencies installed:
