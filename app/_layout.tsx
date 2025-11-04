import { Stack } from 'expo-router';
import { DataProvider } from '../contexts/DataContext';

export default function RootLayout() {
  return (
    <DataProvider>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="index" />
        <Stack.Screen name="login/index" />
        <Stack.Screen name="account-setup/index" />
        <Stack.Screen name="dashboard/index" />
        <Stack.Screen name="appointments/index" />
        <Stack.Screen name="doctor-profile/index" />
        <Stack.Screen name="health-records/index" />
        <Stack.Screen name="medication-tracker/index" />
        <Stack.Screen name="notifications/index" />
        <Stack.Screen name="pharmacy/index" />
        <Stack.Screen name="profile/index" />
        <Stack.Screen name="settings/index" />
        <Stack.Screen name="emergency/index" />
        <Stack.Screen name="privacy-policy/index" />
        <Stack.Screen name="terms-and-conditions/index" />
        <Stack.Screen name="+not-found" />
      </Stack>
    </DataProvider>
  );
}
