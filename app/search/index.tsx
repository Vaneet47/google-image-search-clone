import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { router } from 'expo-router';
import { useLocalSearchParams } from 'expo-router';

const allSuggestions = [
  'sleeveless gilet jacket',
  'sequins skirt',
  'cut out bodysuit',
  'floral crop top',
  'neon green shirt',
  'oversized jackets',
  'puffer vest',
  'summer cotton trousers',
];

const mockResults = [
  {
    id: '1',
    image: 'https://via.placeholder.com/150',
    title: 'Purple Top - Amazon',
    link: 'amazon.com',
  },
  {
    id: '2',
    image: 'https://via.placeholder.com/150',
    title: 'Lavender Shirt - Myntra',
    link: 'myntra.com',
  },
];

export default function SearchScreen() {
  const { q, imageUri } = useLocalSearchParams();

  console.log({ imageUri });

  const searchQuery = Array.isArray(q) ? q[0] : q ?? '';
  const [query, setQuery] = useState(searchQuery);

  const filtered = allSuggestions.filter((s) =>
    s.toLowerCase().includes(query.toLowerCase())
  );

  const handleMicPress = () => {
    router.replace({ pathname: '/search/mic' });
  };

  const handleCameraPress = () => {
    router.replace({ pathname: '/search/image-search' });
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={styles.container}
    >
      <View style={styles.inputRow}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name='arrow-back' size={24} color='white' />
        </TouchableOpacity>
        <TextInput
          placeholder='Search or type URL'
          placeholderTextColor='#9AA0A6'
          style={styles.input}
          value={query}
          onChangeText={setQuery}
          autoFocus
        />
        <TouchableOpacity onPress={handleMicPress}>
          <Ionicons name='mic' size={20} color='#9AA0A6' />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleCameraPress}>
          <Ionicons name='camera' size={20} color='#9AA0A6' />
        </TouchableOpacity>
      </View>

      <FlatList
        data={filtered}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.recentItem}>
            <Ionicons
              name='time-outline'
              size={16}
              color='#9AA0A6'
              style={{ marginRight: 8 }}
            />
            <Text style={styles.recentText}>{item}</Text>
          </View>
        )}
      />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#202124',
    paddingHorizontal: 16,
    paddingTop: 60,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#303134',
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginBottom: 16,
  },
  input: {
    flex: 1,
    color: 'white',
    marginHorizontal: 8,
  },
  recentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  recentText: {
    color: 'white',
  },
});
