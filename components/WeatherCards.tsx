// components/WeatherCards.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function WeatherCards() {
  return (
    <View style={styles.card}>
      <View style={styles.row}>
        <MaterialCommunityIcons
          name='weather-partly-cloudy'
          size={24}
          color='#FABB05'
        />
        <Text style={styles.text}>Gurugram · AQI 183 · 32°C</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#303134',
    borderRadius: 12,
    padding: 16,
    marginTop: 16,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    marginLeft: 10,
    color: 'white',
    fontSize: 14,
  },
});
