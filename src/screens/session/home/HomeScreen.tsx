import React, { useEffect, useState } from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { styles } from '../../../styles/styles';
import { useTranslation } from 'react-i18next';
import i18n from "../../../languages/index"
import { ButtonPrimary } from '../../../components/ButtonPrimary';
import { Activity, Bank, Play, Stop } from 'iconsax-react-native';
import { colors } from '../../../styles/colors';
import { ButtonPlus } from '../../../components/ButtonPlus';
import { useNavigation } from '@react-navigation/native';
import { ArchiveBook, ArrowDown2, ArrowRight2, Chart1 } from 'iconsax-react-native';
import {
    LineChart,
} from "react-native-chart-kit";
import B1 from '../../../ads/B/B1';
import B2 from '../../../ads/B/B2';
import B3 from '../../../ads/B/B3';
import G1 from '../../../ads/G/G1';
import { IStocks } from './IStocks';
import BottomTab from '../../../components/BottomTab';

export default function HomeScreen() {
    const { t }: any = useTranslation();
    const navigation: any = useNavigation();
    const [tabState, setTabState] = useState(true);

    G1()
    const [day, setDay] = useState<number>(0);
    const [play, setPlay] = useState<boolean>(false);
    const [pivotTrend, setPivotTrend] = useState<number>(0);
    const [pivotTrendAA, setPivotTrendAA] = useState<number>(0);
    const [stocks, setStocks] = useState<IStocks>({
        marketTrend: true,
        stocksTrend: { aaTrend: true, ccaTrend: false, xahTrend: false },
        stocks: {
            aa: [22], cca: [12], xah: [12]
        }
    });
    const [balance, setBalance] = useState<number>(1000)
    const nonZeroStocks = Object.entries(stocks.stocks).filter(([key, value]) => value !== 0);

    const addValueToAa = (newValue: number) => {
        const updatedStocks = { ...stocks }; // Mevcut nesneyi kopyala
        const aaArray = updatedStocks.stocks.aa || []; // "aa" dizisini al veya oluştur
        aaArray.push(newValue); // Yeni değeri ekle
        updatedStocks.stocks.aa = aaArray; // Güncellenmiş diziyi tekrar atan
        setStocks(updatedStocks); // Yeni nesneyi ayarla
    }

    useEffect(() => {
        if (play) {
            setTimeout(() => {
                setDay(day + 1)
                const aaLastValue: number = stocks.stocks.aa[stocks.stocks.aa.length - 1]

                if (aaLastValue < 2) {
                    setStocks((prevStocks) => ({
                        ...prevStocks,
                        stocksTrend: {
                            ...prevStocks.stocksTrend,
                            aaTrend: true,
                        },
                    }));
                }
                // ----------------------------
                if (stocks.stocksTrend.aaTrend == true) {
                    if (stocks.marketTrend == true) {
                        const aaNewValue: number = aaLastValue + Number((Math.random() * 2.4).toFixed(2))
                        addValueToAa(aaNewValue)
                    }
                    else {
                        const aaNewValue: number = aaLastValue + Number((Math.random() * 1.3).toFixed(2))
                        addValueToAa(aaNewValue)
                    }
                }
                else {
                    if (stocks.marketTrend == true) {
                        const aaNewValue: number = aaLastValue - Number((Math.random() * 1.3).toFixed(2))
                        addValueToAa(aaNewValue)
                    }
                    else {
                        const aaNewValue: number = aaLastValue - Number((Math.random() * 2.4).toFixed(2))
                        addValueToAa(aaNewValue)
                    }
                }

                // stocks.stocks.aa?.push(aa)
            }, 3 * 1000)
        }

        console.log("")
        console.log(stocks.marketTrend)
        console.log(stocks.stocksTrend.aaTrend)
        console.log("")

        setPivotTrend(pivotTrend + 1);
        setPivotTrendAA(pivotTrendAA + 1);

        if (pivotTrend == 10) {
            setPivotTrend(0)
            if (stocks.marketTrend == true) {
                console.log("marketTrend TRUE",)
                setStocks((prevStocks) => ({
                    ...prevStocks,
                    marketTrend:
                        false,
                }));
            }
            else {
                console.log("marketTrend FALSE",)
                setStocks((prevStocks) => ({
                    ...prevStocks,
                    marketTrend:
                        true,
                }));
            }
        }

        if (pivotTrendAA == 4) {
            setPivotTrendAA(0)
            if (stocks.stocksTrend.aaTrend == false || stocks.stocks.aa[stocks.stocks.aa.length - 1] < 3) {
                // console.log("aaTrend false",)
                setStocks((prevStocks) => ({
                    ...prevStocks,
                    stocksTrend: {
                        ...prevStocks.stocksTrend,
                        aaTrend: true,
                    },
                }));
            }
            else {
                // console.log("aaTrend TRUE")
                setStocks((prevStocks) => ({
                    ...prevStocks,
                    stocksTrend: {
                        ...prevStocks.stocksTrend,
                        aaTrend: false,
                    },
                }));
            }
        }

    }, [day, play])

    const [loading, setLoading] = useState(false);
    const [showStocksData, setShowStocksData] = useState<Boolean>(false)

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <View style={styles.threeColsView}>
                    <View style={{
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        backgroundColor: colors.pink,
                        borderRadius: 8,
                        paddingHorizontal: 14,
                        height: 50,
                        marginVertical: 10,
                        marginRight: 8,
                    }}>
                        <Text style={{
                            fontSize: 14,
                            color: colors.blueDark,
                            textAlign: "center",
                            fontWeight: "bold",
                        }}>{i18n.t("Day")}
                        </Text>
                        <Text style={{
                            fontSize: 18,
                            fontWeight: "bold",
                            color: colors.white
                        }}>{day}</Text>
                    </View>
                    <ButtonPlus onPress={() => setPlay(!play)}>
                        <Text style={{
                            paddingRight: 2,
                            fontWeight: "bold",
                            fontStyle: "italic",
                            color: colors.blueDark
                        }}>{play ? "Stop" : "Play"}</Text>
                        {
                            play ?
                                <Stop size="18" variant='Bulk' color={colors.white} />
                                :
                                <Play size="18" color={colors.white} />
                        }
                    </ButtonPlus>
                    <ScrollView>
                        <ButtonPrimary
                            onPress={() => navigation.navigate("StatisticsScreen")}
                            text={tabState ? `${i18n.t("Statistics")}` : `${i18n.t("My Account")}`}>
                            {
                                tabState ?
                                    <Bank size="16" color={colors.orange} />
                                    : <Activity size="16" color={colors.orange} />
                            }
                        </ButtonPrimary>
                    </ScrollView>
                </View>
                <ScrollView>
                    <View style={{
                        borderRadius: 8,
                        backgroundColor: colors.blueLight,
                        borderWidth: 1,
                        paddingHorizontal: 12,
                        paddingVertical: 14
                    }}>
                        <View style={styles.twoColsView}>
                            <Text style={{ color: colors.blueDark, fontSize: 18, fontWeight: "600", paddingBottom: 14 }}>{t("Balance")}:</Text>
                            <Text style={{ color: colors.blueDark, fontSize: 18, fontWeight: "600", paddingBottom: 14 }}>{balance} $</Text>
                        </View>
                    </View>
                    <View style={{
                        marginVertical: 12,
                        backgroundColor: colors.pink,
                        paddingHorizontal: 8,
                        paddingVertical: 12,
                        borderRadius: 8
                    }}>
                        <View style={{ flexDirection: "row", alignItems: "center" }}>
                            <Chart1 size="32" color={colors.white} />
                            <Text style={{
                                fontSize: 16,
                                fontWeight: "700",
                                paddingStart: 8,
                                color: colors.white
                            }}>{t("Stock Market")}</Text>
                        </View>
                        <View>
                            <View style={[styles.twoColsView, { paddingTop: 6 }]}>
                                <ScrollView
                                >
                                    {Object.entries(stocks.stocks).map(([key, value]) => {
                                        // console.log("object", key, value)
                                        return (
                                            <View key={key}
                                                style={[styles.twoColsView, {}]}>
                                                <Text style={{
                                                    color: colors.white,
                                                    fontSize: 15,
                                                    paddingHorizontal: 4,
                                                    paddingVertical: 4,
                                                    fontWeight: "bold"
                                                }}>{key}</Text>
                                                <Text style={{
                                                    color: colors.white,
                                                    fontSize: 15,
                                                    paddingHorizontal: 4,
                                                    paddingVertical: 4,
                                                    fontWeight: "bold"
                                                }}>{Number(stocks.stocks[key][stocks.stocks[key].length - 1]).toFixed(2)}</Text>
                                            </View>
                                        )
                                    })
                                    }
                                </ScrollView>
                            </View>

                        </View>
                    </View>
                    <View style={{
                        marginVertical: 12,
                        backgroundColor: colors.blueDark,
                        paddingHorizontal: 8,
                        paddingVertical: 12,
                        borderRadius: 8
                    }}>
                        <View style={{
                            flexDirection: "row",
                            alignItems: "center",
                        }}>
                            <ArchiveBook size="32" color="#FF8A65" />
                            <Text style={{
                                fontSize: 16,
                                fontWeight: "700",
                                paddingStart: 8,
                                color: colors.white
                            }}>{t("News")}</Text>
                        </View>
                        <Text />
                        <View style={{ paddingVertical: 12 }}>
                            <Text style={{
                                fontSize: 16,
                                fontWeight: "500",
                                paddingStart: 8,
                                color: colors.white
                            }}>{t("News1")}</Text>
                        </View>
                        <View style={{ paddingVertical: 8 }}>
                            <Text style={{
                                fontSize: 16,
                                fontWeight: "500",
                                paddingStart: 8,
                                color: colors.white
                            }}>{t("News2")}</Text>
                        </View>
                        <View style={{ paddingVertical: 8 }}>
                            <Text style={{
                                fontSize: 16,
                                fontWeight: "500",
                                paddingStart: 8,
                                color: colors.white
                            }}>{t("News3")}</Text>
                        </View>
                    </View>
                    <View style={{ alignItems: "center" }}>
                        <B1 />
                        <B2 />
                        <B3 />
                    </View>
                </ScrollView >
            </View>
            <BottomTab />
        </SafeAreaView>
    );
}
