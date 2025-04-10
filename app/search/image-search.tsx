import { Ionicons } from '@expo/vector-icons';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Image,
  ImageBackground,
  Dimensions,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { manipulateAsync, SaveFormat } from 'expo-image-manipulator';
import { useRouter } from 'expo-router';
import CropBox from '@/components/CropBox';
import SearchBar from '@/components/SearchBar';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

export default function ImageSearchScreen() {
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef<CameraView>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [croppedUri, setCroppedUri] = useState<string | null>(null);
  const [cropBoxRect, setCropBoxRect] = useState({
    x: 0,
    y: 0,
    width: 210,
    height: 210,
  });

  const router = useRouter();

  useEffect(() => {
    if (capturedImage) {
      // cropImage(capturedImage, cropBoxRect);
      console.log({ cropBoxRect });
    }
  }, [cropBoxRect]);

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
          quality: 1,
        });
        const resized = await manipulateAsync(
          photo.uri,
          [{ resize: { width: screenWidth, height: screenHeight } }],
          { compress: 1, format: SaveFormat.PNG }
        );
        setCapturedImage(resized?.uri);
      } catch (error) {
        console.log('Error capturing image:', error);
      }
    }
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: 'images',
      allowsEditing: false,
      quality: 1,
    });

    if (!result.canceled) {
      const uri = result.assets[0].uri;
      setCapturedImage(uri);
    }
  };

  const cropImage = async (uri: string | null, rect: typeof cropBoxRect) => {
    if (!uri) return;
    try {
      const result = await manipulateAsync(
        uri,
        [
          {
            crop: {
              originX: rect.x,
              originY: rect.y,
              width: rect.width,
              height: rect.height,
            },
          },
        ],
        { compress: 1, format: SaveFormat.PNG }
      );
      setCroppedUri(result.uri);
      console.log('✅ Cropped image updated:', result.uri);
    } catch (err) {
      console.error('Error cropping image:', err);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      {!capturedImage ? (
        <CameraView
          ref={cameraRef}
          style={{ flex: 1, alignItems: 'center' }}
          facing='back'
        >
          <View style={styles.galleryButtonContainer}>
            <TouchableOpacity style={styles.galleryButton} onPress={pickImage}>
              <Ionicons name='image-sharp' size={28} color='#9AA0A6' />
            </TouchableOpacity>
          </View>

          <View style={styles.captureButtonContainer}>
            <TouchableOpacity
              style={styles.captureButton}
              onPress={handleCapture}
            >
              <Ionicons name='search-sharp' size={36} color='#9AA0A6' />
            </TouchableOpacity>
          </View>
        </CameraView>
      ) : (
        <View
          style={{
            width: screenWidth,
            height: screenHeight,
            backgroundColor: 'black',
          }}
        >
          <ImageBackground
            source={{ uri: capturedImage }}
            style={{ flex: 1 }}
            resizeMode='contain'
          >
            <CropBox onUpdateRect={(rect) => setCropBoxRect(rect)} />
            <SearchBar />
          </ImageBackground>
        </View>
      )}
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
});
