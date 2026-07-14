import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ToastProvider } from './components/layout/Toast';
import { AuthProvider } from './context/AuthContext';
import { RootNavigator } from './navigation';

export default function App() {
  return (
    <SafeAreaProvider>
      <ToastProvider>
        <AuthProvider>
          <RootNavigator />
        </AuthProvider>
      </ToastProvider>
    </SafeAreaProvider>
  );
}
