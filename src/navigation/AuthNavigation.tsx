import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

//
// i18n
//
import i18n from '../languages';
import { useTranslation } from 'react-i18next'
// --------

import LoginScreen from '../screens/auth/LoginScreen/LoginScreen';
import RegisterScreen from '../screens/auth/RegisterScreen/RegisterScreen';
import ResetPasswordScreen from '../screens/auth/ResetPasswordScreen/ResetPasswordScreen';

const Stack = createNativeStackNavigator();

export default function AuthNavigation() {
    return (
        <Stack.Navigator initialRouteName='SignIn' screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
            <Stack.Screen name="Reset" component={ResetPasswordScreen} />
        </Stack.Navigator>
    );
}
