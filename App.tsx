import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ToastProvider } from './components/layout/Toast';
import { RootNavigator } from './navigation';

export default function App() {
  return (
    <SafeAreaProvider>
      <ToastProvider>
        <RootNavigator />
      </ToastProvider>
    </SafeAreaProvider>
  );
}
