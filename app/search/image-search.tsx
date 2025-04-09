import { Ionicons } from '@expo/vector-icons';
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';

export default function ImageSearchScreen() {
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef<CameraView>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const router = useRouter();

  if (!permission) return <View />;
  if (!permission.granted) {
    return (
      <View style={styles.center}>
        <Text>We need permission to show the camera</Text>
        <TouchableOpacity onPress={requestPermission}>
          <Text>Grant</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const handleCapture = async () => {
    if (cameraRef.current) {
      try {
        const photo = await cameraRef.current.takePictureAsync({
          quality: 0.8,
          base64: false,
          skipProcessing: true,
        });
        console.log('📸 Captured photo:', photo);
        Alert.alert('Image Captured', photo?.uri);
      } catch (error) {
        console.log('Error capturing image:', error);
      }
    }
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      const uri = result.assets[0].uri;
      setCapturedImage(uri);
      router.push({ pathname: '/search', params: { imageUri: uri } });
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <CameraView
        ref={cameraRef}
        style={{ flex: 1, alignItems: 'center' }}
        facing='back'
      >
        <View style={styles.overlay}>
          <View style={styles.focusBox} />
        </View>

        <View style={styles.galleryButtonContainer}>
          <TouchableOpacity style={styles.galleryButton} onPress={pickImage}>
            <Text style={styles.buttonText}>
              <Ionicons name='image-sharp' size={28} color='#9AA0A6' />
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.captureButtonContainer}>
          <TouchableOpacity
            style={styles.captureButton}
            onPress={handleCapture}
          >
            <Text style={styles.buttonText}>
              <Ionicons name='search-sharp' size={36} color='#9AA0A6' />
            </Text>
          </TouchableOpacity>
        </View>
      </CameraView>
    </View>
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  overlay: {
    position: 'absolute',
    top: '25%',
    left: '10%',
    width: '80%',
    height: '40%',
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  focusBox: {
    flex: 1,
    width: '100%',
    borderWidth: 2,
    borderColor: 'white',
    borderRadius: 16,
  },
  galleryButtonContainer: {
    position: 'absolute',
    bottom: 50,
    left: 40,
    width: 70,
    height: 70,
    flexDirection: 'row',
    borderWidth: 2.5,
    borderColor: '#fff',
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
  },
  captureButtonContainer: {
    position: 'absolute',
    bottom: 40,
    width: 90,
    height: 90,
    flexDirection: 'row',
    borderWidth: 2.5,
    borderColor: '#fff',
    borderRadius: 45,
    justifyContent: 'center',
    alignItems: 'center',
  },
  captureButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  galleryButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  miniButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#eee',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 24,
  },
});
