import React from 'react';
import { SafeAreaView, View, Text, ActivityIndicator, StatusBar } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import colors from '../../../styles/colors';

export default function LoadingCard() {
  let darkMode = useSelector((state: any) => state.darkMode.isDark);
  return (
    <SafeAreaView
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        backgroundColor: darkMode ? "#000" : "#f4f4f4",
      }}>
      <Text
        style={{
          fontSize: 25,
          color: darkMode ? "#fff" : "#003",
          fontWeight: 'bold',
          marginBottom: 20,
        }}>
        Lütfen Bekleyiniz...
      </Text>
      <ActivityIndicator
        style={{ justifyContent: 'center' }}
        size={80}
        color={darkMode ? '#fff' : '#a00'}
      />
    </SafeAreaView>
  );
}
