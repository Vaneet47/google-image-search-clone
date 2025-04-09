import React, { useState } from 'react';
import { ScrollView, SafeAreaView, StatusBar, StyleSheet } from 'react-native';
import HeaderBar from '../components/HeaderBar';
import SearchBar from '../components/SearchBar';
import FidgetButtons from '../components/FidgetButtons';
import WeatherCards from '../components/WeatherCards';
import NewsCard from '../components/NewsCard';
import AccountModal from '@/components/AccoutModal';
import { useRouter } from 'expo-router';

export default function Home() {
  const router = useRouter();
  const [modalVisible, setModalVisible] = useState(false);

  const handleSearch = () => {
    router.push({ pathname: '/search' });
  };

  const handleMicPress = () => {
    router.push({ pathname: '/search/mic' });
  };
  const handleCameraPress = () => {
    router.push({ pathname: '/search/image-search' });
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle='light-content' backgroundColor='#202124' />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <HeaderBar onProfilePress={() => setModalVisible(true)} />
        <SearchBar
          onMicPress={handleMicPress}
          onCameraPress={handleCameraPress}
          onSearchPress={handleSearch}
        />
        <FidgetButtons />
        <WeatherCards />
        <NewsCard />
        <NewsCard />
      </ScrollView>
      <AccountModal
        isVisible={modalVisible}
        onClose={() => setModalVisible(false)}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#202124',
  },
  scrollContent: {
    padding: 16,
  },
});
