import React, { useState } from 'react';
import {
  ScrollView,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import HeaderBar from '../components/HeaderBar';
import SearchBar from '../components/SearchBar';
import FidgetButtons from '../components/FidgetButtons';
import WeatherCards from '../components/WeatherCards';
import NewsCard from '../components/NewsCard';
import AccountModal from '@/components/AccoutModal';

export default function Home() {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle='light-content' />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <HeaderBar onProfilePress={() => setModalVisible(true)} />
        <SearchBar />
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
