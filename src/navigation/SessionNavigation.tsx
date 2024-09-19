import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

//
// i18n
//
import i18n from '../languages';
import { useTranslation } from 'react-i18next'
// --------
import HomeScreen from '../screens/session/home/HomeScreen';
import ProfileScreen from '../screens/session/profile';
import { StatisticsScreen } from '../screens/session/statistics/StatisticsScreen';
import StockMarket from '../screens/session/stocks/StockMarket';
import MainMenu from '../screens/session/mainMenu';
import { App1 } from '../screens/session/home/Deneme';

const Stack = createNativeStackNavigator();

export default function SessionNavigation() {
    return (
        <Stack.Navigator initialRouteName='App1' screenOptions={{ headerShown: false }}>
            <Stack.Screen name="App1" component={App1} />
            {/* <Stack.Screen name="Home" component={HomeScreen} /> */}
            <Stack.Screen name="StockMarket" component={StockMarket} />
        </Stack.Navigator>
    );
}
