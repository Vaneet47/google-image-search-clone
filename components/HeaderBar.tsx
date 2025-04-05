import React from 'react';
import { View, Image, StyleSheet, TouchableOpacity } from 'react-native';

export default function HeaderBar({
  onProfilePress,
}: {
  onProfilePress: () => void;
}) {
  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/images/google_logo.png')}
        style={styles.logo}
      />
      <TouchableOpacity onPress={onProfilePress}>
        <Image
          source={{ uri: 'https://i.pravatar.cc/150' }}
          style={styles.avatar}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logo: {
    height: 30,
    width: 90,
    resizeMode: 'contain',
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
  },
});
