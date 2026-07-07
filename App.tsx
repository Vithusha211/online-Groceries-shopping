import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import LoadingScreen from './screens/LoadingScreen';
import LoginScreen from './screens/LoginScreen';
import SignUpScreen from './screens/SignUpScreen';
import WelcomeScreen from './screens/WelcomeScreen';

type AppScreen = 'loading' | 'welcome' | 'login' | 'signup' | 'home';

export default function App() {
  const [screen, setScreen] = useState<AppScreen>('loading');

  useEffect(() => {
    const timer = setTimeout(() => setScreen('welcome'), 2500);
    return () => clearTimeout(timer);
  }, []);

  if (screen === 'loading') {
    return <LoadingScreen />;
  }

  return (
    <SafeAreaProvider>
      {screen === 'welcome' ? (
        <WelcomeScreen onGetStarted={() => setScreen('login')} />
      ) : screen === 'login' ? (
        <LoginScreen
          onLogin={() => setScreen('home')}
          onSignUp={() => setScreen('signup')}
        />
      ) : screen === 'signup' ? (
        <SignUpScreen
          onLogin={() => setScreen('login')}
          onSignUp={() => setScreen('home')}
        />
      ) : (
        <View style={styles.container}>
          <Text>Open up App.tsx to start working on your app!</Text>
        </View>
      )}
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#fff',
    flex: 1,
    justifyContent: 'center',
  },
});
