import { Alert, Dimensions, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
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
import { store } from '../../../redux/store/store'
import { balanceAdd, balanceSubtract } from '../../../redux/features/balanceSlice'
import { AddStockAmount, SubstractStockAmount } from '../../../redux/features/ShareOwnedSlice'
import style from './style'
import formatMoney from '../../../features/FormatMoney'
import B2 from '../../../ads/B/B2'

const StockMarket = React.memo((props: any) => {
    const { t }: any = useTranslation();
    const dispatch: any = useDispatch();
    const navigation: any = useNavigation();

    const [amount, setAmount] = useState<any>(0);
    const [total, setTotal] = useState<any>(0);
    // const [selectedStock, setSelectedStock] = useState<any>(props.route.params.stock);
    let balance: number = useSelector((state: any) => state.balanceSlice.balance)

    let aaValues: number[] = useSelector((state: any) => state.stockSlice.aa)
    let ccaValues: number[] = useSelector((state: any) => state.stockSlice.cca)
    let xahValues: number[] = useSelector((state: any) => state.stockSlice.xah)
    let stockValaa: number = useSelector((state: any) => state.stockSlice.aa[state.stockSlice.aa.length - 1])
    let stockValcca: number = useSelector((state: any) => state.stockSlice.cca[state.stockSlice.cca.length - 1])
    let stockValxah: number = useSelector((state: any) => state.stockSlice.xah[state.stockSlice.xah.length - 1])
    // let aaLastValue: number = stocksValues.aa[stocksValues.aa.length - 1]
    let stocksValues = selectStocks((state: any) => state.stockSlice)
    let graphWidth: number = screenWidth * 0.94
    //
    // Tab Values
    //
    const [dataVal, setDataVal] = useState<number>(0)
    // -----------------------------------

    //
    // Buy/Sell Tab Values
    //
    const [tabBuySell, setTabBuySell] = useState(0);
    // -----------------------------------

    const BuyStocks = (props: any) => {
        const totalVal: any = Number(props.total)
        const key = props.key
        const stockAmount = props.amount
        // const totalVal: any = Number(props.total)
        // console.log("object", props)
        if (balance >= totalVal && stockAmount > 0) {
            dispatch(balanceSubtract(totalVal))
            dispatch(AddStockAmount(props))
        }
        else {
            Alert.alert(t("Error"), t("Balance_Not_Enough"))
        }
        setAmount(0)
    }
    const SellStocks = (props: any) => {
        const key: any = props.key
        const amount: any = props.amount
        const total: any = props.total

        let shareOwnedAA = store.getState().ShareOwnedSlice.aa;
        let shareOwnedCCA = store.getState().ShareOwnedSlice.cca;
        let shareOwnedXAH = store.getState().ShareOwnedSlice.xah;

        switch (key) {
            case "aa":
                if (shareOwnedAA >= amount) {
                    dispatch(balanceAdd(total))
                    dispatch(SubstractStockAmount(props))
                }
                else {
                    Alert.alert(t("Error"), t("Amount_Not_Enough"))
                }
                break;
            case "cca":
                if (shareOwnedCCA <= amount) {
                    dispatch(balanceAdd(total))
                    dispatch(SubstractStockAmount(props))
                }
                else {
                    Alert.alert(t("Error"), t("Amount_Not_Enough"))
                }
                break;
            case "xah":
                if (shareOwnedXAH <= amount) {
                    dispatch(balanceAdd(total))
                    dispatch(SubstractStockAmount(props))
                }
                else {
                    Alert.alert(t("Error"), t("Amount_Not_Enough"))
                }
                break;
            default:
                break;
        }
        setAmount(0)
    }
    return (
        <View>
            {/* <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginRight: 1 }}>
                    <DayCard />
                    <Text style={{
                        backgroundColor: "#eee",
                        paddingHorizontal: 12,
                        paddingVertical: 12,
                        height: 50,
                        justifyContent: "center",
                        fontSize: 14,
                        fontWeight: "700",
                        color: colors.blueDark,
                    }}>{formatMoney(balance.toFixed(2))}</Text>
                    <ButtonPrimary text={t("Home")} onPress={() => navigation.navigate("Home")} />
                </View> */}
            <ScrollView>
                <View style={style.header}>
                    <ScrollView horizontal>
                        <Pressable
                            onPress={() => setDataVal(0)}
                            style={
                                dataVal == 0 ?
                                    [
                                        style.headerButton,
                                        {
                                            backgroundColor:
                                                dataVal === 0 ? colors.orange : colors.white,
                                        },
                                    ]
                                    : [
                                        style.headerButton,
                                        {
                                            backgroundColor:
                                                dataVal === 0 ? colors.orange : colors.white
                                        }
                                    ]
                            }>
                            <Text
                                style={[style.headerButtonText, { color: dataVal == 0 ? "#eee" : "#001", fontSize: 16 }]}>
                                AA
                            </Text>
                        </Pressable>
                        <Pressable
                            onPress={() => setDataVal(1)}
                            style={
                                dataVal == 1 ?
                                    [
                                        style.headerButton,
                                        {
                                            backgroundColor:
                                                dataVal === 1 ? colors.orange : colors.white,
                                        },
                                    ]
                                    : [
                                        style.headerButton,
                                        {
                                            backgroundColor:
                                                dataVal === 1 ? colors.orange : colors.white
                                        }
                                    ]
                            }>
                            <Text
                                style={[style.headerButtonText, { color: dataVal == 1 ? "#eee" : "#001", fontSize: 16 }]}>
                                CCA
                            </Text>
                        </Pressable>
                        <Pressable
                            onPress={() => setDataVal(2)}
                            style={
                                dataVal == 2 ?
                                    [
                                        style.headerButton,
                                        {
                                            backgroundColor:
                                                dataVal === 2 ? colors.orange : colors.white,
                                        },
                                    ]
                                    : [
                                        style.headerButton,
                                        {
                                            backgroundColor:
                                                dataVal === 2 ? colors.orange : colors.white
                                        }
                                    ]
                            }>
                            <Text
                                style={[style.headerButtonText, { color: dataVal == 2 ? "#eee" : "#001", fontSize: 16 }]}>
                                XAH
                            </Text>
                        </Pressable>
                    </ScrollView>
                </View >
                <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                    <Text style={{ fontSize: 16, fontWeight: "500", paddingStart: 6 }}>{t("Stock_Name")}: <Text style={{ fontWeight: "bold" }}>{dataVal == 0 ? "AA" : dataVal == 1 ? "CCA" : "XAH"}</Text></Text>
                    <Text style={{ fontSize: 16, fontWeight: "500", paddingStart: 6 }}>{t("Price")}: <Text style={{ fontWeight: "bold" }}>{dataVal == 0 ? stockValaa : dataVal == 1 ? stockValcca : stockValxah}</Text></Text>
                    <Text style={{
                        paddingVertical: 2,
                        fontSize: 15,
                        fontWeight: "bold",
                        color: colors.blueDark,
                    }}>{t("Share Owned")}: {
                            dataVal == 0 ?
                                store.getState().ShareOwnedSlice.aa :
                                dataVal == 1 ?
                                    store.getState().ShareOwnedSlice.cca :
                                    store.getState().ShareOwnedSlice.xah
                        }</Text>
                </View>
                <LineChart
                    data={{
                        labels: [""],
                        datasets: [
                            {
                                data: dataVal == 0 ?
                                    aaValues :
                                    dataVal == 1 ?
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
                <ScrollView horizontal style={{ height: 50, }}>
                    <Pressable onPress={() => {
                        setTabBuySell(0)
                    }}
                        style={{
                            marginRight: 5,
                            borderRadius: 6,
                            height: 40,
                            width: 80,
                            backgroundColor: tabBuySell == 0 ? colors.blueDark : colors.white,
                        }}>
                        <Text style={{
                            textDecorationLine: tabBuySell == 0 ? "underline" : "none",
                            fontSize: 15, fontWeight: "bold",
                            lineHeight: 20,
                            paddingHorizontal: 10,
                            textAlign: "center",
                            paddingVertical: 10,
                            color: tabBuySell == 0 ? colors.white : colors.blueDark
                        }}>{t("Buy")}</Text>
                    </Pressable>
                    <Pressable onPress={() => {
                        setTabBuySell(1)
                    }}
                        style={{
                            marginRight: 5,
                            borderRadius: 6,
                            height: 40,
                            width: 80,
                            marginHorizontal: 12,
                            backgroundColor: tabBuySell == 1 ? colors.blueDark : colors.white,
                        }}
                    >
                        <Text style={{
                            textDecorationLine: tabBuySell == 1 ? "underline" : "none",
                            fontSize: 16, fontWeight: "bold",
                            lineHeight: 20,
                            paddingHorizontal: 10,
                            textAlign: "center",
                            paddingVertical: 10,
                            color: tabBuySell == 1 ? colors.white : colors.blueDark
                        }}>{t("Sell")}</Text>
                    </Pressable>
                </ScrollView>
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
                        <Pressable onPress={() => {
                            tabBuySell == 0 ?
                                setAmount(dataVal == 0 ?
                                    Math.floor(store.getState().balanceSlice.balance / store.getState().stockSlice.aa[store.getState().stockSlice.aa.length - 1]) :
                                    dataVal == 1 ?
                                        Math.floor(store.getState().balanceSlice.balance / store.getState().stockSlice.cca[store.getState().stockSlice.cca.length - 1]) :
                                        Math.floor(store.getState().balanceSlice.balance / store.getState().stockSlice.xah[store.getState().stockSlice.xah.length - 1])
                                ) :
                                setAmount(dataVal == 0 ?
                                    store.getState().ShareOwnedSlice.aa :
                                    dataVal == 1 ?
                                        store.getState().ShareOwnedSlice.cca :
                                        store.getState().ShareOwnedSlice.xah

                                )
                        }}>
                            <Text style={{
                                textDecorationLine: "underline",
                                fontSize: 16, fontWeight: "bold",
                                lineHeight: 20,
                                paddingBottom: 20
                            }}>{t("Maximum")}</Text>
                        </Pressable>
                        <Text style={{
                            paddingVertical: 2,
                            fontWeight: "bold",
                            color: colors.blueDark,
                        }}>{t("Stock_Value")}: {
                                dataVal == 0 ?
                                    ((store.getState().stockSlice.aa[store.getState().stockSlice.aa.length - 1]).toFixed(2)) :
                                    dataVal == 1 ?
                                        ((store.getState().stockSlice.cca[store.getState().stockSlice.cca.length - 1]).toFixed(2)) :
                                        ((store.getState().stockSlice.xah[store.getState().stockSlice.xah.length - 1]).toFixed(2))
                            } $</Text>
                        <Text style={{
                            paddingVertical: 2,
                            fontWeight: "bold",
                            color: colors.blueDark,
                        }}>{t("Stock_Amount")}: {amount}</Text>
                        <Text style={{
                            paddingVertical: 14,
                            fontWeight: "bold",
                            color: colors.blueDark,
                        }}>{t("Total")}: {
                                dataVal == 0 ?
                                    ((store.getState().stockSlice.aa[store.getState().stockSlice.aa.length - 1] * amount).toFixed(2)) :
                                    dataVal == 1 ?
                                        ((store.getState().stockSlice.cca[store.getState().stockSlice.cca.length - 1] * amount).toFixed(2)) :
                                        ((store.getState().stockSlice.xah[store.getState().stockSlice.xah.length - 1] * amount).toFixed(2))
                            } $</Text>
                    </View>


                    <View style={{ width: "30%" }}>
                        <TouchableOpacity onPress={() => tabBuySell == 0 ? BuyStocks({
                            key: dataVal == 0 ? "aa" : dataVal == 1 ? "cca" : "xah",
                            amount: amount,
                            total: dataVal == 0 ?
                                (store.getState().stockSlice.aa[store.getState().stockSlice.aa.length - 1] * amount) :
                                dataVal == 1 ?
                                    (store.getState().stockSlice.cca[store.getState().stockSlice.cca.length - 1] * amount) :
                                    (store.getState().stockSlice.xah[store.getState().stockSlice.xah.length - 1] * amount)
                        }) :
                            SellStocks({
                                key: dataVal == 0 ? "aa" : dataVal == 1 ? "cca" : "xah",
                                amount: amount,
                                total: dataVal == 0 ?
                                    (store.getState().stockSlice.aa[store.getState().stockSlice.aa.length - 1] * amount) :
                                    dataVal == 1 ?
                                        (store.getState().stockSlice.cca[store.getState().stockSlice.cca.length - 1] * amount) :
                                        (store.getState().stockSlice.xah[store.getState().stockSlice.xah.length - 1] * amount)
                            })} style={{
                                backgroundColor: tabBuySell == 0 ? colors.blueDark : colors.white,
                                width: "90%",
                                borderRadius: 6,
                                marginBottom: 6,
                            }}>
                            <Text style={{
                                paddingVertical: 12,
                                fontWeight: "bold",
                                color: tabBuySell == 0 ? colors.white : colors.blueDark,
                                textAlign: "center"
                            }}>{t("Confirm")}</Text>
                        </TouchableOpacity>
                        {/* <TouchableOpacity onPress={() => SellStocks({
                                key: dataVal == 0 ? "aa" : dataVal == 1 ? "cca" : "xah",
                                amount: amount,
                                total: dataVal == 0 ?
                                    (store.getState().stockSlice.aa[store.getState().stockSlice.aa.length - 1] * amount) :
                                    dataVal == 1 ?
                                        (store.getState().stockSlice.cca[store.getState().stockSlice.cca.length - 1] * amount) :
                                        (store.getState().stockSlice.xah[store.getState().stockSlice.xah.length - 1] * amount)
                            })} style={{
                                backgroundColor: tabBuySell == 0 ? colors.blueDark : colors.white,
                                width: "90%",
                                borderRadius: 6
                            }}>
                                <Text style={{
                                    paddingVertical: 12,
                                    fontWeight: "bold",
                                    color: tabBuySell == 0 ? colors.white : colors.blueDark,
                                    textAlign: "center"
                                }}>{t("Sell")}</Text>
                            </TouchableOpacity> */}
                    </View>
                </View>
                <View style={{ alignItems: "center", marginTop: 20 }}>
                    <B2 />
                </View>
            </ScrollView >
        </View >
    )
})

export default StockMarket;