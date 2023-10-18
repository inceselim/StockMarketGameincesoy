import { Dimensions, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { colors } from '../../../styles/colors'
import { LineChart } from 'react-native-chart-kit'
import { IStocks } from '../../../interfaces/IStocks'
import { useDispatch, useSelector } from 'react-redux'
import { styles } from '../../../styles/styles'
import HeaderMenu from '../../../components/HeaderMenu'
import { selectStocks } from '../../../redux/features/stockSlice'
import screenWidth from '../../../constants/screenWidth'
import { useTranslation } from 'react-i18next';
import i18n from "../../../languages/index"
import PlayCard from '../../../components/PlayCard'
import DayCard from '../../../components/DayCard'
import { ButtonPrimary } from '../../../components/ButtonPrimary'
import { useNavigation } from '@react-navigation/native'

const StockMarket = (props: any) => {
    const { t }: any = useTranslation();
    const dispatch: any = useDispatch();
    const navigation: any = useNavigation();

    const [amount, setAmount] = useState<any>(0);
    const [total, setTotal] = useState<any>(0);
    let balance: number = useSelector((state: any) => state.balanceSlice.balance)


    const selectedStock: string = props.route.params.stock
    let aaValues: number[] = useSelector((state: any) => state.stockSlice.aa)
    let ccaValues: number[] = useSelector((state: any) => state.stockSlice.cca)
    let xahValues: number[] = useSelector((state: any) => state.stockSlice.xah)
    // let aaLastValue: number = stocksValues.aa[stocksValues.aa.length - 1]
    let stocksValues = selectStocks((state: any) => state.stockSlice)
    let aaLastVal: number = stocksValues.aa[stocksValues.aa.length - 1]
    let graphWidth: number = screenWidth * 0.94
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginRight: 1 }}>
                    <DayCard />
                    <Text style={{
                        backgroundColor: "#eee",
                        paddingHorizontal: 12,
                        paddingVertical: 12,
                        height: 50,
                        justifyContent: "center",
                        fontSize: 16,
                        fontWeight: "500",
                        color: colors.blueDark,
                    }}>{t("Balance")}: <Text style={{ fontWeight: "bold" }}>{balance}</Text></Text>
                    <ButtonPrimary text={t("Home")} onPress={() => navigation.navigate("Home")} />
                </View>
                <ScrollView>
                    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                        <Text style={{ fontSize: 16, fontWeight: "500", paddingStart: 6 }}>{t("Stock_Name")}: <Text style={{ fontWeight: "bold" }}>{selectedStock.toLocaleUpperCase("tr-TR")}</Text></Text>
                        <Text style={{
                            paddingVertical: 2,
                            fontSize:15,
                            fontWeight: "bold",
                            color: colors.blueDark,
                        }}>{t("Share Owned")}: {11}</Text>
                    </View>
                    <LineChart
                        data={{
                            labels: [""],
                            datasets: [
                                {
                                    data: selectedStock == "aa" ?
                                        aaValues :
                                        selectedStock == "cca" ?
                                            ccaValues :
                                            xahValues

                                }
                            ]
                        }}
                        width={graphWidth} // from react-native
                        height={260}
                        fromZero

                        yAxisLabel="$"
                        segments={5}
                        withInnerLines
                        withHorizontalLabels
                        withScrollableDot={false}
                        withDots={false}
                        withOuterLines={false}
                        withVerticalLabels={false}
                        withVerticalLines={false}
                        yAxisSuffix="k"
                        fromNumber={0}
                        yAxisInterval={1} // optional, defaults to 1
                        chartConfig={{
                            backgroundColor: colors.pink,
                            backgroundGradientFrom: colors.pink,
                            backgroundGradientTo: colors.pink,
                            decimalPlaces: 0, // optional, defaults to 2dp
                            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                            style: {
                                borderRadius: 20,
                                width: screenWidth
                            },
                            propsForDots: {
                                r: "0",
                                strokeWidth: "0",
                                stroke: colors.orange
                            }
                        }}
                        bezier
                        style={{
                            marginVertical: 8,
                            borderRadius: 16
                        }}
                    />
                    <View style={{ flexDirection: "row", backgroundColor: colors.blueLight, padding: 12, borderRadius: 8, alignItems: "center", justifyContent: "space-between" }}>
                        <View style={{ width: "65%" }}>
                            <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                                <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 6, }}>
                                    <Text style={{ fontWeight: "bold", paddingEnd: 8 }}>{t("Enter_Amount")}:</Text>
                                    <TextInput style={{
                                        borderRadius: 8,
                                        backgroundColor: colors.white,
                                        color: colors.blueDark,
                                        width: 80,
                                        height: 40,
                                        marginBottom: 8,
                                        borderWidth: 1,
                                        borderColor: colors.blueLight,
                                        paddingStart: 8,
                                    }}
                                        value={amount}
                                        onChangeText={(e) => setAmount(e.replace(/[^0-9]/, ''))}
                                        textContentType='telephoneNumber'
                                        placeholder={t("Amount")}
                                        inputMode='decimal'
                                        keyboardType='number-pad'
                                        placeholderTextColor={colors.blue}
                                    />
                                </View>
                            </View>
                            <Text style={{
                                paddingVertical: 2,
                                fontWeight: "bold",
                                color: colors.blueDark,
                            }}>{t("Stock_Value")}: {stocksValues.aa[stocksValues.aa.length - 1]} $</Text>
                            <Text style={{
                                paddingVertical: 2,
                                fontWeight: "bold",
                                color: colors.blueDark,
                            }}>{t("Stock_Amount")}: {amount}</Text>
                            <Text style={{
                                paddingVertical: 14,
                                fontWeight: "bold",
                                color: colors.blueDark,
                            }}>{t("Total")}: {stocksValues.aa[stocksValues.aa.length - 1] * amount} $</Text>
                            <Text style={{
                                paddingVertical: 14,
                                fontWeight: "bold",
                                color: colors.blueDark,
                            }}>{t("Last_Balance")}: {balance - (stocksValues.aa[stocksValues.aa.length - 1] * amount)} $</Text>
                        </View>

                        <View style={{ width: "30%" }}>
                            <TouchableOpacity onPress={null} style={{
                                backgroundColor: colors.blueDark,
                                width: "90%",
                                borderRadius: 6,
                                marginBottom: 6,
                            }}>
                                <Text style={{ paddingVertical: 12, fontWeight: "bold", color: colors.white, textAlign: "center" }}>{t("Buy")}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={null} style={{
                                backgroundColor: colors.blueDark,
                                width: "90%",
                                borderRadius: 6
                            }}>
                                <Text style={{ paddingVertical: 12, fontWeight: "bold", color: colors.white, textAlign: "center" }}>{t("Sell")}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
            </View >
        </SafeAreaView >
    )
}

export default StockMarket;