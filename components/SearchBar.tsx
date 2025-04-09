import React, { useEffect, useState } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function SearchBar({
  value,
  onChangeText,
  onMicPress,
  onCameraPress,
  onSearchPress,
}: any) {
  const router = useRouter();
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
        <TouchableOpacity style={styles.iconButton} onPress={onCameraPress}>
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
