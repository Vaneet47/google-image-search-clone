import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
  PermissionsAndroid,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import Voice from '@react-native-voice/voice';
import { useEffect, useState } from 'react';

const requestMicrophonePermission = async () => {
  if (Platform.OS === 'android') {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
      {
        title: 'Microphone Permission',
        message:
          'This app needs access to your microphone for speech recognition.',
        buttonPositive: 'OK',
      }
    );
    return granted === PermissionsAndroid.RESULTS.GRANTED;
  }
  return true;
};

export default function MicScreen() {
  const router = useRouter();

  const [isListening, setIsListening] = useState(false);
  const [recognizedText, setRecognizedText] = useState('');

  useEffect(() => {
    if (Voice) {
      Voice.onSpeechResults = onSpeechResults;
      Voice.onSpeechError = onSpeechError;
      Voice.onSpeechEnd = () => setIsListening(false);

      // Start listening as soon as screen loads
      startListening();
    }

    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, [Voice]);

  const startListening = async () => {
    const hasPermission = await requestMicrophonePermission();
    if (!hasPermission) return;

    try {
      setIsListening(true);
      await Voice.start('en-US');
    } catch (e) {
      console.error('Voice start error:', e);
    }
  };

  const onSpeechResults = (event: any) => {
    const spokenText = event.value?.[0];
    if (spokenText) {
      setRecognizedText(spokenText);
      setIsListening(false);
      // Navigate to /search with the spoken query
      setTimeout(() => {
        router.push({ pathname: '/search', params: { q: spokenText } });
      }, 1000);
    }
  };

  const onSpeechError = (error: any) => {
    console.error('Speech recognition error:', error);
    setIsListening(false);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Ionicons name='arrow-back' size={24} color='white' />
      </TouchableOpacity>

      <Text style={styles.text}>
        {isListening
          ? 'Listening...'
          : recognizedText
          ? `You said: ${recognizedText}`
          : 'Initializing...'}
      </Text>

      <View style={styles.dotsContainer}>
        <View style={[styles.dot, { backgroundColor: '#4285F4' }]} />
        <View style={[styles.dot, { backgroundColor: '#EA4335' }]} />
        <View style={[styles.dot, { backgroundColor: '#FBBC05' }]} />
        <View style={[styles.dot, { backgroundColor: '#34A853' }]} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#202124',
    paddingTop: 80,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 20,
  },
  text: {
    fontSize: 20,
    color: 'white',
    marginBottom: 30,
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 30,
    gap: 10,
  },
  dot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
});
