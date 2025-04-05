import React, { useEffect, useState } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import Voice from '@react-native-community/voice';
import { useRouter } from 'expo-router';

export default function SearchBar({
  value,
  onChangeText,
  onMicPress,
  onSearchPress,
}: any) {
  const router = useRouter();

  //   const [text, setText] = useState('');
  //   const [isListening, setIsListening] = useState(false);

  //   useEffect(() => {
  //     Voice.onSpeechResults = (e) => {
  //       const spokenText = e.value?.[0];
  //       if (spokenText) {
  //         setText(spokenText);
  //       }
  //       setIsListening(false);
  //     };

  //     return () => {
  //       Voice.destroy().then(Voice.removeAllListeners);
  //     };
  //   }, []);

  //   const startListening = async () => {
  //     try {
  //       setIsListening(true);
  //       await Voice.start('en-US');
  //     } catch (error) {
  //       console.error('Speech error:', error);
  //     }
  //   };

  return (
    <View style={styles.container}>
      <Ionicons name='search' size={20} color='#9AA0A6' />
      <TextInput
        style={styles.input}
        placeholder='Search'
        placeholderTextColor='#9AA0A6'
        value={value}
        onChangeText={onChangeText}
        returnKeyType='search'
        onSubmitEditing={onSearchPress}
        onFocus={() => {
          router.push('/search');
        }}
      />

      <View style={styles.iconGroup}>
        <TouchableOpacity onPress={onMicPress}>
          <Ionicons name='mic' size={20} color='#9AA0A6' />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.iconButton}
          onPress={() => {
            // Navigate to lens search screen here
            console.log('Navigate to Lens screen');
          }}
        >
          <MaterialIcons name='photo-camera' size={20} color='#9AA0A6' />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#303134',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 999,
    paddingHorizontal: 14,
    paddingVertical: 10,
    marginTop: 10,
  },
  input: {
    flex: 1,
    color: 'white',
    marginHorizontal: 10,
    fontSize: 16,
  },
  iconGroup: {
    flexDirection: 'row',
    gap: 8,
  },
  iconButton: {
    paddingHorizontal: 6,
  },
});
