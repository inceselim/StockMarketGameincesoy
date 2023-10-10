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



interface IAccount {
    stocks: {
        aa?: number;
        ab?: number;
    };
}

export default function HomeScreen() {
    const { t }: any = useTranslation();
    const navigation: any = useNavigation();
    const [tabState, setTabState] = useState(true);

    const [day, setDay] = useState<number>(0);
    const [play, setPlay] = useState<boolean>(false);
    G1()
    useEffect(() => {
        if (play) {
            setTimeout(() => {
                setDay(day + 1)
            }, 3 * 1000)
        }
    }, [day, play])

    const [loading, setLoading] = useState(false);
    const [showStocksData, setShowStocksData] = useState<Boolean>(false)

    const [balance, setBalance] = useState<number>(1000)
    const [account, setAccount] = useState<IAccount>({ stocks: { aa: 2, ab: 10 } })
    const nonZeroStocks = Object.entries(account.stocks).filter(([key, value]) => value !== 0);
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <ScrollView>
                    <View style={styles.threeColsView}>
                        <View style={{
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center",
                            backgroundColor: colors.pink,
                            borderRadius: 8,
                            paddingHorizontal: 14,
                            height: 50,
                            marginVertical: 12,
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
                                    <Stop size="32" variant='Bulk' color={colors.white} />
                                    :
                                    <Play size="32" color={colors.white} />
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
                </ScrollView>
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
                        <TouchableOpacity onPress={() => setShowStocksData(!showStocksData)}
                            style={styles.twoColsView}>
                            {
                                !showStocksData ?
                                    <Text style={{
                                        paddingTop: 6,
                                        color: colors.white,
                                        fontSize: 18,
                                        fontWeight: "bold",
                                    }}>Stocks</Text>
                                    : <Text />
                            }
                            {
                                !showStocksData ?
                                    <ArrowRight2 size="25" color={colors.white} />
                                    : <ArrowDown2 size="25" color={colors.white} />
                            }
                        </TouchableOpacity>
                        {
                            showStocksData == true &&
                            <>
                                <View style={styles.twoColsView}>
                                    <Text style={{
                                        paddingTop: 6,
                                        color: colors.white,
                                        fontSize: 18,
                                        fontWeight: "bold",
                                    }}>{t("Stocks")}</Text>
                                    <Text style={{
                                        paddingTop: 6,
                                        color: colors.white,
                                        fontSize: 18,
                                        fontWeight: "bold",
                                    }}>{t("Amount")}</Text>
                                </View>
                                {
                                    nonZeroStocks.map(([key, value]) => (
                                        <View key={key}
                                            style={styles.twoColsView}>
                                            <Text style={{ color: colors.blueDark, fontSize: 18, fontWeight: "600", paddingBottom: 14 }}>{key}</Text>
                                            <Text style={{ color: colors.blueDark, fontSize: 18, fontWeight: "600", paddingBottom: 14 }}>{value}</Text>
                                        </View>
                                    ))
                                }
                            </>
                        }
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
                                <Text style={{ color: colors.white, fontSize: 15, }}>asdasd</Text>
                                {
                                    !showStocksData ?
                                        <ArrowRight2 size="25" color={colors.white} />
                                        : <ArrowDown2 size="25" color={colors.white} />
                                }
                            </View>
                            <LineChart
                                data={{
                                    labels: ["January", "February", "March", "April", "May", "June"],
                                    datasets: [
                                        {
                                            data: [
                                                Math.random() * 100,
                                                Math.random() * 100,
                                                Math.random() * 100,
                                                Math.random() * 100,
                                                Math.random() * 100,
                                                Math.random() * 100,
                                                Math.random() * 100,
                                                Math.random() * 100,
                                                Math.random() * 100,
                                                Math.random() * 100,
                                                Math.random() * 100,
                                                Math.random() * 100,
                                                Math.random() * 100,
                                                Math.random() * 100
                                            ]
                                        }
                                    ]
                                }}
                                width={Dimensions.get("window").width - 50} // from react-native
                                height={220}
                                yAxisLabel="$"
                                yAxisSuffix="k"
                                fromNumber={0}
                                yAxisInterval={1} // optional, defaults to 1
                                chartConfig={{
                                    backgroundColor: colors.pink,
                                    backgroundGradientFrom: colors.pink,
                                    backgroundGradientTo: colors.pink,
                                    decimalPlaces: 2, // optional, defaults to 2dp
                                    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                                    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                                    style: {
                                        borderRadius: 60
                                    },
                                    propsForDots: {
                                        r: "4",
                                        strokeWidth: "2",
                                        stroke: colors.orange
                                    }
                                }}
                                bezier
                                style={{
                                    marginVertical: 8,
                                    borderRadius: 16
                                }}
                            />
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
            {/* <BottomTab /> */}
        </SafeAreaView>
    );
}
