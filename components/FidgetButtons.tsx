import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialIcons, FontAwesome5 } from '@expo/vector-icons';

const fidgets = [
  {
    icon: <FontAwesome5 name='search' size={20} color='white' />,
    label: 'Search',
    color: '#4285F4',
  },
  {
    icon: <MaterialIcons name='translate' size={20} color='white' />,
    label: 'Translate',
    color: '#34A853',
  },
  {
    icon: <MaterialIcons name='camera-alt' size={20} color='white' />,
    label: 'Lens',
    color: '#EA4335',
  },
  {
    icon: <MaterialIcons name='mic' size={20} color='white' />,
    label: 'Voice',
    color: '#FBBC05',
  },
];

export default function FidgetButtons() {
  return (
    <View style={styles.container}>
      {fidgets.map((item, index) => (
        <TouchableOpacity
          key={index}
          style={[styles.button, { backgroundColor: item.color }]}
        >
          {item.icon}
          <Text style={styles.label}>{item.label}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 24,
  },
  button: {
    alignItems: 'center',
    padding: 10,
    borderRadius: 12,
    flex: 1,
    marginHorizontal: 4,
  },
  label: {
    marginTop: 6,
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },
});
