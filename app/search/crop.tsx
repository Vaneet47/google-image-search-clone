// app/search/crop.tsx
import React from 'react';
import { Image, StyleSheet, View, Dimensions } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

export default function ImageCropScreen() {
  const { imageUri } = useLocalSearchParams();
  console.log({ imageUri });
  if (!imageUri) return null;

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: imageUri as string }}
        style={styles.image}
        resizeMode='contain'
      />

      {/* Crop Box Overlay will go here */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  image: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    position: 'absolute',
  },
});
