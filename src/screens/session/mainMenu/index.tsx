import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, Alert } from 'react-native';
import { styles } from '../../../styles/styles';
import { colors } from '../../../styles/colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { balanceUpdate } from '../../../redux/features/balanceSlice';
import { stocksUpdateAA, stocksUpdateCCA, stocksUpdateXAH } from '../../../redux/features/ShareOwnedSlice';
import { dayUpdate } from '../../../redux/features/daySlice';
import { aaValUpdate, ccaValUpdate, xahValUpdate } from '../../../redux/features/stockSlice';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import i18n from "../../../languages/index"

export default function MainMenu() {
    const navigation: any = useNavigation();
    const dispatch: any = useDispatch();
    const { t }: any = useTranslation();
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
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <View style={{ justifyContent: "center", flex: 1 }}>
                    <TouchableOpacity onPress={() => navigation.navigate("Home")}
                        style={{
                            backgroundColor: colors.orange,
                            borderWidth: 1,
                            borderColor: colors.blueDark,
                            borderRadius: 8,
                            marginBottom: 20
                        }}>
                        <Text style={{
                            fontSize: 16,
                            fontWeight: "700",
                            textAlign: "center",
                            paddingVertical: 14
                        }}>{t("New Game")}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {
                        return (
                            navigation.navigate("Home"),
                            getData()
                        )

                    }}
                        style={{
                            backgroundColor: colors.orange,
                            borderWidth: 1,
                            borderColor: colors.blueDark,
                            borderRadius: 8,
                            marginBottom: 20
                        }}>
                        <Text style={{
                            fontSize: 16,
                            fontWeight: "700",
                            textAlign: "center",
                            paddingVertical: 14
                        }}>{t("Load Game")}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView >
    );
}
