import React, { useEffect, useState } from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { styles } from '../../../styles/styles';
import { useTranslation } from 'react-i18next';
import i18n from "../../../languages/index"
import { colors } from '../../../styles/colors';
import { useNavigation } from '@react-navigation/native';
import { ArchiveBook, ArrowDown2, ArrowRight2, Chart1 } from 'iconsax-react-native';

import B1 from '../../../ads/B/B1';
import B2 from '../../../ads/B/B2';
import B3 from '../../../ads/B/B3';
import G1 from '../../../ads/G/G1';
import BottomTab from '../../../components/BottomTab';
import HeaderMenu from '../../../components/HeaderMenu';
import { useDispatch, useSelector } from 'react-redux';
import { store } from '../../../redux/store/store';
import formatMoney from '../../../features/FormatMoney';

export default function HomeScreen(): JSX.Element {
    const dispatch: any = useDispatch();
    const { t }: any = useTranslation();
    const navigation: any = useNavigation();
    const [tabState, setTabState] = useState(true);
    let stockValaa: number = useSelector((state: any) => state.stockSlice.aa[state.stockSlice.aa.length - 1])
    let stockValcca: number = useSelector((state: any) => state.stockSlice.cca[state.stockSlice.cca.length - 1])
    let stockValxah: number = useSelector((state: any) => state.stockSlice.xah[state.stockSlice.xah.length - 1])
    // const [newsData, setNewsData] = useState()
    G1()
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <HeaderMenu />
                <ScrollView>
                    <View style={{
                        borderRadius: 8,
                        backgroundColor: colors.blueLight,
                        borderWidth: 1,
                        paddingHorizontal: "2%",
                        paddingVertical: 12
                    }}>
                        <View style={styles.twoColsView}>
                            <Text style={{ color: colors.blueDark, fontSize: 18, fontWeight: "600", }}>{t("Balance")}:</Text>
                            <Text style={{ color: colors.blueDark, fontSize: 18, fontWeight: "600", }}>{formatMoney(store.getState().balanceSlice.balance)} $</Text>
                        </View>
                    </View>
                    <View style={{
                        marginVertical: 12,
                        backgroundColor: colors.pink,
                        paddingHorizontal: 8,
                        paddingVertical: 12,
                        borderRadius: 8
                    }}>
                        <View style={{ alignItems: "center", flexDirection: "row", justifyContent: "center" }}>
                            <View style={{ flexDirection: "row", alignItems: "center", width: "50%" }}>
                                <Chart1 size="32" color={colors.white} />
                                <Text style={{
                                    fontSize: 16,
                                    fontWeight: "700",
                                    paddingStart: 8,
                                    color: colors.white
                                }}>{t("Stock Market")}</Text>
                            </View>
                            <View style={{ width: "50%", }}>
                                <TouchableOpacity style={[styles.twoColsView, {
                                    backgroundColor: colors.blueDark,
                                    borderRadius: 6,
                                }]}
                                    onPress={() => navigation.navigate("StockMarket")}>
                                    <Text style={{
                                        color: colors.white,
                                        flex: 1,
                                        fontSize: 15,
                                        lineHeight: 28,
                                        textAlign: "center",

                                        paddingHorizontal: 4,
                                        paddingVertical: 4,
                                        fontWeight: "bold"
                                    }}>Buy/Sell</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={[{ flexDirection: "column", paddingTop: 6 }]}>
                            <TouchableOpacity style={[styles.twoColsView,]}
                                onPress={() => navigation.navigate("StockMarket")}>
                                <Text style={{
                                    color: colors.white,
                                    flex: 1,
                                    fontSize: 15,
                                    lineHeight: 28,
                                    paddingHorizontal: 4,
                                    paddingVertical: 4,
                                    fontWeight: "bold"
                                }}>AA</Text>
                                <Text style={{
                                    color: colors.white,
                                    fontSize: 15,
                                    paddingHorizontal: 4,
                                    lineHeight: 28,
                                    paddingVertical: 4,
                                    fontWeight: "bold"
                                }}>{stockValaa.toFixed(2)}</Text>
                                <ArrowRight2 size="23" color={colors.white} />
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.twoColsView,]}
                                onPress={() => navigation.navigate("StockMarket")}>
                                <Text style={{
                                    color: colors.white,
                                    flex: 1,
                                    fontSize: 15,
                                    lineHeight: 28,
                                    paddingHorizontal: 4,
                                    paddingVertical: 4,
                                    fontWeight: "bold"
                                }}>CCA</Text>
                                <Text style={{
                                    color: colors.white,
                                    fontSize: 15,
                                    paddingHorizontal: 4,
                                    lineHeight: 28,
                                    paddingVertical: 4,
                                    fontWeight: "bold"
                                }}>{stockValcca.toFixed(2)}</Text>
                                <ArrowRight2 size="23" color={colors.white} />
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.twoColsView,]}
                                onPress={() => navigation.navigate("StockMarket")}>
                                <Text style={{
                                    color: colors.white,
                                    flex: 1,
                                    fontSize: 15,
                                    lineHeight: 28,
                                    paddingHorizontal: 4,
                                    paddingVertical: 4,
                                    fontWeight: "bold"
                                }}>XAH</Text>
                                <Text style={{
                                    color: colors.white,
                                    fontSize: 15,
                                    paddingHorizontal: 4,
                                    lineHeight: 28,
                                    paddingVertical: 4,
                                    fontWeight: "bold"
                                }}>{stockValxah.toFixed(2)}</Text>
                                <ArrowRight2 size="23" color={colors.white} />
                            </TouchableOpacity>
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
                        {
                            store.getState().newsSlice.news.map((item: any) => {
                                return (
                                    < View style={{ paddingVertical: 12 }
                                    }>
                                        <Text style={{
                                            fontSize: 16,
                                            fontWeight: "500",
                                            paddingStart: 8,
                                            color: colors.white
                                        }}>{t(item)}</Text>
                                    </View>)
                            }

                            )
                        }
                    </View>
                    {/* <View style={{ alignItems: "center" }}>
                        <B2 />
                    </View> */}
                </ScrollView >
            </View >
            <BottomTab />
        </SafeAreaView >
    );
}
