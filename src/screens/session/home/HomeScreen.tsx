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

export default function HomeScreen(): JSX.Element {
    const { t }: any = useTranslation();
    // G1()


    const iconProps = { size: 40, color: '#888' }

    // Use Hooks to control!
    const {
        canStart, // a boolean indicate if you can start tour guide
        start, // a function to start the tourguide
        stop, // a function  to stopping it
        eventEmitter, // an object for listening some events
    } = useTourGuideController()

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
        eventEmitter.on('start', handleOnStart)
        eventEmitter.on('stop', handleOnStop)
        eventEmitter.on('stepChange', handleOnStepChange)

        return () => {
            eventEmitter.off('start', handleOnStart)
            eventEmitter.off('stop', handleOnStop)
            eventEmitter.off('stepChange', handleOnStepChange)
        }
    }, [])
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
                            <TourGuideZone zone={3} shape={'This is your money'}>
                                <View style={styles.twoColsView}>
                                    <Text style={{ color: colors.blueDark, fontSize: 18, fontWeight: "600", }}>{t("Balance")}:</Text>
                                    <Text style={{ color: colors.blueDark, fontSize: 18, fontWeight: "600", }}>{formatMoney(store.getState().balanceSlice.balance)} $</Text>
                                </View>
                            </TourGuideZone>
                            <TouchableOpacity style={style.button} onPress={() => start()}>
                                <Text style={style.buttonText}>START THE TUTORIAL!</Text>
                            </TouchableOpacity>
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
