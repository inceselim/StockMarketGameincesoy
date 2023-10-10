import React from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import { useSelector } from 'react-redux';

const NoData = () => {
  let userToken = useSelector((state: any) => state.auth.userToken);
  let darkMode = useSelector((state: any) => state.darkMode.isDark);
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: darkMode ? '#000' : '#fff'}}>
      <View style={{ flex:1, backgroundColor: darkMode ? '#000' : '#fff',}}>
        <Text
          style={{
            color: darkMode ? '#fff' : '#003',
            fontSize: 28,
            fontWeight: 'bold',
            textAlign: 'center',
          }}>
          Veri Bulunamadı!...
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default NoData;

