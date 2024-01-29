import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.checkin',
  appName: 'Checkin-ionic',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  },
  android: {
    useLegacyBridge: true,
  }
};

export default config;
