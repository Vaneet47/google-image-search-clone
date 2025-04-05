import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

export default function NewsCard() {
  return (
    <View style={styles.card}>
      <Image
        source={{ uri: 'https://source.unsplash.com/featured/?technology' }}
        style={styles.image}
      />
      <Text style={styles.title}>Breaking: New AI model outperforms GPT-4</Text>
      <Text style={styles.source}>TechCrunch · 2h ago</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#303134',
    borderRadius: 12,
    overflow: 'hidden',
    marginTop: 16,
  },
  image: {
    height: 150,
    width: '100%',
  },
  title: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
    padding: 12,
    paddingBottom: 4,
  },
  source: {
    color: '#9AA0A6',
    fontSize: 12,
    paddingHorizontal: 12,
    paddingBottom: 12,
  },
});
