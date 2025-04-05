// components/AccountModal.tsx
import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';

interface Props {
  isVisible: boolean;
  onClose: () => void;
}

export default function AccountModal({ isVisible, onClose }: Props) {
  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={onClose}
      style={styles.modal}
      animationIn='slideInUp'
      animationOut='slideOutDown'
    >
      <View style={styles.container}>
        <Image
          source={{ uri: 'https://i.pravatar.cc/150' }}
          style={styles.avatar}
        />
        <Text style={styles.name}>Vaneet Sharma</Text>
        <Text style={styles.email}>vaneet0708@gmail.com</Text>

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Manage your Google Account</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, { backgroundColor: '#303134' }]}
        >
          <Text style={[styles.buttonText, { color: '#fff' }]}>
            Add another account
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, { backgroundColor: '#303134' }]}
        >
          <Text style={[styles.buttonText, { color: '#fff' }]}>Sign out</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  container: {
    backgroundColor: '#202124',
    padding: 20,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignSelf: 'center',
    marginBottom: 12,
  },
  name: {
    fontSize: 18,
    color: 'white',
    textAlign: 'center',
    fontWeight: '600',
  },
  email: {
    fontSize: 14,
    color: '#aaa',
    textAlign: 'center',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#e8eaed',
    padding: 12,
    borderRadius: 8,
    marginVertical: 6,
  },
  buttonText: {
    textAlign: 'center',
    color: '#1a73e8',
    fontWeight: '500',
  },
});
