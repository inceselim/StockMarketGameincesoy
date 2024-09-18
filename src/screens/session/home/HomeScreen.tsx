import React, { useEffect, useState } from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { styles } from '../../../styles/styles';
import { useTranslation } from 'react-i18next';
import { colors } from '../../../styles/colors';
import { useNavigation } from '@react-navigation/native';
import { ArchiveBook, ArrowDown2, ArrowRight2, Chart1 } from 'iconsax-react-native';
import G1 from '../../../ads/G/G1';
import BottomTab from '../../../components/BottomTab';
import HeaderMenu from '../../../components/HeaderMenu';
import { useDispatch, useSelector } from 'react-redux';
import { store } from '../../../redux/store/store';
import formatMoney from '../../../features/FormatMoney';
import {
    TourGuideProvider, // Main provider
    TourGuideZone, // Main wrapper of highlight component
    TourGuideZoneByPosition, // Component to use mask on overlay (ie, position absolute)
    useTourGuideController, // hook to start, etc.
} from 'rn-tourguide'
import StockMarket from '../stocks/StockMarket';

export default function HomeScreen(): JSX.Element {
    const dispatch: any = useDispatch();
    const { t }: any = useTranslation();
    const navigation: any = useNavigation();
    const [tabState, setTabState] = useState(true);
    let stockValaa: number = useSelector((state: any) => state.stockSlice.aa[state.stockSlice.aa.length - 1])
    let stockValcca: number = useSelector((state: any) => state.stockSlice.cca[state.stockSlice.cca.length - 1])
    let stockValxah: number = useSelector((state: any) => state.stockSlice.xah[state.stockSlice.xah.length - 1])
    // G1()
    return (
        <TourGuideProvider {...{ borderRadius: 16 }}>
            <SafeAreaView style={styles.container}>
                <View style={styles.content}>
                    <HeaderMenu />
                    <ScrollView>
                        <View style={{
                            borderRadius: 8,
                            backgroundColor: colors.blueLight,
                            borderWidth: 1,
                            paddingHorizontal: "2%",
                            paddingVertical: 12,
                            marginBottom: 6
                        }}>
                            <View style={styles.twoColsView}>
                                <Text style={{ color: colors.blueDark, fontSize: 18, fontWeight: "600", }}>{t("Balance")}:</Text>
                                <Text style={{ color: colors.blueDark, fontSize: 18, fontWeight: "600", }}>{formatMoney(store.getState().balanceSlice.balance)} $</Text>
                            </View>
                        </View>

                        <StockMarket />
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
                {/* <BottomTab /> */}
            </SafeAreaView>
        </TourGuideProvider>
    );
}
