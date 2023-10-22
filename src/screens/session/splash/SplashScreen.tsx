import React from 'react';
import { View, Text, SafeAreaView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { balanceUpdate } from '../../../redux/features/balanceSlice';
import { stocksUpdateAA, stocksUpdateCCA, stocksUpdateXAH } from '../../../redux/features/ShareOwnedSlice';
import { dayUpdate } from '../../../redux/features/daySlice';
import { aaValUpdate, ccaValUpdate, xahValUpdate } from '../../../redux/features/stockSlice';
import { useDispatch } from 'react-redux';

export default function SplashScreen() {
    const dispatch: any = useDispatch();
    async function getData() {
        await AsyncStorage.getItem("@balance").then((e: any) => dispatch(balanceUpdate(e)))
        await AsyncStorage.getItem("@day").then((e: any) => dispatch(dayUpdate(e)))
        await AsyncStorage.getItem("@aa").then((e: any) => dispatch(stocksUpdateAA(e)))
        await AsyncStorage.getItem("@cca").then((e: any) => dispatch(stocksUpdateCCA(e)))
        await AsyncStorage.getItem("@xah").then((e: any) => dispatch(stocksUpdateXAH(e)))
        await AsyncStorage.getItem("@aaVal").then((e: any) => dispatch(aaValUpdate(e)))
        await AsyncStorage.getItem("@ccaVal").then((e: any) => dispatch(ccaValUpdate(e)))
        await AsyncStorage.getItem("@xahVal").then((e: any) => dispatch(xahValUpdate(e)))
    }

    getData()
    return (
        <SafeAreaView>
            <View>
                <Text></Text>
            </View>
        </SafeAreaView>
    );
}
