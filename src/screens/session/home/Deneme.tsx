import React, { useEffect, useState } from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, ScrollView, Dimensions, StyleSheet } from 'react-native';
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

// Add <TourGuideProvider/> at the root of you app!
export function App1() {
    // G1()
    return (
        <TourGuideProvider {...{ borderRadius: 16 }}>
            <AppContent />
        </TourGuideProvider>
    )
}

const AppContent = () => {
    const { t }: any = useTranslation();
    const iconProps = { size: 40, color: '#888' }

    // Use Hooks to control!
    const {
        canStart, // a boolean indicate if you can start tour guide
        start, // a function to start the tourguide
        stop, // a function  to stopping it
        eventEmitter, // an object for listening some events
    }: any = useTourGuideController()

    // Can start at mount 🎉
    // you need to wait until everything is registered 😁
    React.useEffect(() => {
        if (canStart) {
            // 👈 test if you can start otherwise nothing will happen
            start()
        }
    }, [canStart]) // 👈 don't miss it!

    const handleOnStart = () => console.log('start')
    const handleOnStop = () => console.log('stop')
    const handleOnStepChange = () => console.log(`stepChange`)

    React.useEffect(() => {
        eventEmitter.on('start', () => console.log('start'))
        eventEmitter.on('stop', () => console.log('stop'))
        eventEmitter.on('stepChange', () => console.log(`stepChange`))
        return () => eventEmitter.off('*', null)
    }, [])
    let balanceValue = useSelector((state: any) => state.balanceSlice.balance)
    return (
        <SafeAreaView style={styles.container}>

            <View style={styles.content}>
                <TourGuideZone zone={5} shape={'rectangle'}
                    text={'You can use this to play and pause the game and the day. Have Fun'}>
                    <HeaderMenu />
                </TourGuideZone>
                <TourGuideZone
                    zone={1}
                    shape='rectangle'
                    text={'Welcome to Stock Market Game. You can buy and sell stocks in this game. Have fun :)'}
                >
                </TourGuideZone>
                <ScrollView>
                    <View style={{
                        borderRadius: 8,
                        backgroundColor: colors.blueLight,
                        borderWidth: 1,
                        paddingHorizontal: "2%",
                        paddingVertical: 12,
                        marginBottom: 6
                    }}>
                        <TourGuideZone zone={2} shape={'rectangle'}
                            text={'This is your balance. You can use this to buy stocks.'}>
                            <View style={styles.twoColsView}>
                                <Text style={{ color: colors.blueDark, fontSize: 18, fontWeight: "600", }}>{t("Balance")}:</Text>
                                <Text style={{ color: colors.blueDark, fontSize: 18, fontWeight: "600", }}>{formatMoney(balanceValue)} $</Text>
                            </View>
                        </TourGuideZone>
                    </View>
                    <TourGuideZone zone={3} shape={'rectangle'}
                        text={'After selecting a stock here, you can examine its chart. You can look at its price, the amount of stock you have. You can buy and sell stocks from the bottom.'}>
                        <StockMarket />
                    </TourGuideZone>

                    <TourGuideZone zone={4} shape={'rectangle'}
                        text={'You can look here to be informed about rising and falling trends...'}>
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
                                <TouchableOpacity style={style.button} onPress={() => start()}>
                                    <Text style={style.buttonText}>TUTORIAL!</Text>
                                </TouchableOpacity>
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
                    </TourGuideZone>
                    {/* <View style={{ alignItems: "center" }}>
                <B2 />
            </View> */}
                </ScrollView >
            </View >
            {/* <BottomTab /> */}
        </SafeAreaView >

    )
}





const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        paddingTop: 40,
    },
    title: {
        fontSize: 24,
        textAlign: 'center',
    },
    profilePhoto: {
        width: 140,
        height: 140,
        borderRadius: 70,
        marginVertical: 20,
    },
    middleView: {
        flex: 1,
        alignItems: 'center',
    },
    button: {
        backgroundColor: '#2980b9',
        paddingVertical: 10,
        paddingHorizontal: 15,
        margin: 2,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
    },
    row: {
        width: '100%',
        padding: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    activeSwitchContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
        alignItems: 'center',
        paddingHorizontal: 40,
    },
})
