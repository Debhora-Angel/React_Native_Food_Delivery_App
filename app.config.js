import 'dotenv/config';

export default ({ config }) => ({
  ...config,
  name: "MyFirstApp",
  slug: "MyFirstApp",
  version: "1.0.0",
  orientation: "portrait",
  icon: "./assets/icon.png",
  userInterfaceStyle: "light",
  newArchEnabled: true,
  splash: {
    resizeMode: "contain",
    backgroundColor: "#ffffff"
  },
  ios: {
    supportsTablet: true
  },
  android: {
    package: "com.myfirstapp.app",
    edgeToEdgeEnabled: true,
    config: {
      googleMaps: {
        apiKey: process.env.GOOGLE_MAPS_KEY
      }
    }
  },
  extra: {
    eas: {
      projectId: "6617f7d5-f234-4e57-ac96-f748ce44cec6"
    },
    googleMapsApiKey: process.env.GOOGLE_MAPS_KEY
  },
  owner: "debhora15"
});
