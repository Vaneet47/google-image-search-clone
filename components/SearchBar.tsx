import React from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

export default function SearchBar() {
  return (
    <View style={styles.container}>
      <Ionicons name='search' size={20} color='#9AA0A6' />
      <TextInput
        style={styles.input}
        placeholder='Search'
        placeholderTextColor='#9AA0A6'
      />
      <TouchableOpacity>
        <Ionicons name='mic' size={20} color='#9AA0A6' />
      </TouchableOpacity>
      <TouchableOpacity style={styles.iconRight}>
        <MaterialIcons name='photo-camera' size={20} color='#9AA0A6' />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#303134',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  input: {
    flex: 1,
    color: 'white',
    marginHorizontal: 8,
  },
  iconRight: {
    marginLeft: 10,
  },
});
