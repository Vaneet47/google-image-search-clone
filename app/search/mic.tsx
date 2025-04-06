import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
// import Voice from '@react-native-voice/voice';
import { useEffect, useState } from 'react';

export default function MicScreen() {
  const router = useRouter();

  const [text, setText] = useState('');
  const [listening, setListening] = useState(false);

  // useEffect(() => {
  //   Voice.onSpeechStart = () => setListening(true);
  //   Voice.onSpeechEnd = () => setListening(false);
  //   Voice.onSpeechResults = onSpeechResults;
  //   Voice.onSpeechError = onSpeechError;

  //   startListening();

  //   return () => {
  //     Voice.destroy().then(Voice.removeAllListeners);
  //   };
  // }, []);

  // const startListening = async () => {
  //   try {
  //     await Voice.start('en-US');
  //   } catch (e) {
  //     console.error('Error starting Voice:', e);
  //   }
  // };

  const onSpeechResults = (event: any) => {
    const spokenText = event.value?.[0];
    if (spokenText) {
      setText(spokenText);
      setTimeout(() => {
        router.push({ pathname: '/search', params: { q: spokenText } });
      }, 1000);
    }
  };

  const onSpeechError = (e: any) => {
    console.error('Speech error:', e);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Ionicons name='arrow-back' size={24} color='white' />
      </TouchableOpacity>

      {/* <Text style={styles.text}>Speak now</Text> */}
      <Text style={styles.text}>
        {listening ? 'Listening...' : 'Initializing...'}
      </Text>

      <View style={styles.dotsContainer}>
        <View style={[styles.dot, { backgroundColor: '#4285F4' }]} />
        <View style={[styles.dot, { backgroundColor: '#EA4335' }]} />
        <View style={[styles.dot, { backgroundColor: '#FBBC05' }]} />
        <View style={[styles.dot, { backgroundColor: '#34A853' }]} />
      </View>

      {/* <TouchableOpacity style={styles.songButton}>
        <FontAwesome name='music' size={16} color='white' />
        <Text style={styles.songText}>Search a song</Text>
      </TouchableOpacity> */}
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
  songButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#5F6368',
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 6,
  },
  songText: {
    color: 'white',
    marginLeft: 8,
  },
});
