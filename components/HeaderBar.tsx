import React from 'react';
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

export default function HeaderBar() {
  return (
    <View style={styles.container}>
      <Ionicons name='flask' size={24} color='white' />
      <View style={styles.right}>
        <MaterialIcons
          name='star-border'
          size={24}
          color='white'
          style={styles.icon}
        />
        <TouchableOpacity>
          <Image
            source={{ uri: 'https://i.pravatar.cc/300' }} // placeholder avatar
            style={styles.avatar}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  right: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 12,
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
  },
});
