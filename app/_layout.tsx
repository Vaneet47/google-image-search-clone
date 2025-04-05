import { Stack } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function RootLayout() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#202124' }}>
      <Stack screenOptions={{ headerShown: false }}/>
    </SafeAreaView>
  );
}
