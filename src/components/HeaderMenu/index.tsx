import React, { useContext, useEffect, useState } from 'react';
import { View, Text, SafeAreaView, Alert, } from 'react-native';
import { useTranslation } from 'react-i18next';
import i18n from "../../languages/index"
import { Play, Stop } from 'iconsax-react-native';
import { colors } from '../../styles/colors';
import { ButtonPlus } from '../../components/ButtonPlus';
import { useDispatch, useSelector } from 'react-redux';
import { aaTrendFalse, aaTrendMarketFalse, aaTrendMarketTrend, aaValUpdate, ccaTrendFalse, ccaTrendMarketFalse, ccaTrendMarketTrend, ccaValUpdate, selectStocks, xahTrendFalse, xahTrendMarketFalse, xahTrendMarketTrend, xahValUpdate } from '../../redux/features/stockSlice';
import { marketTrendChangeFalse, marketTrendChangeTrue, selectMarketTrend } from '../../redux/features/marketTrendSlice';
import { selectStockTrend, stockTrendChange, stockTrendChangeAAFalse, stockTrendChangeAATrue, stockTrendChangeCCAFalse, stockTrendChangeCCATrue, stockTrendChangeXAHFalse, stockTrendChangeXAHTrue } from '../../redux/features/stockTrendSlice';
import { store } from '../../redux/store/store';
import { dayChange, dayUpdate } from '../../redux/features/daySlice';
import { PlayContext } from '../../context/DayContext';
import DayCard from '../DayCard';
import PlayCard from '../PlayCard';
import { newsAdd } from '../../redux/features/newsSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { balanceUpdate } from '../../redux/features/balanceSlice';
import { stocksUpdateAA, stocksUpdateCCA, stocksUpdateXAH } from '../../redux/features/ShareOwnedSlice';

export default function HeaderMenu(): JSX.Element {
    const { isPlaying, togglePlaying } = useContext(PlayContext);
    const dispatch: any = useDispatch();
    let day: number = useSelector((state: any) => state.daySlice.day)

    let stocksValues = useSelector((state: any) => state.stockSlice)
    let marketTrendVal = useSelector((state: any) => state.marketTrendSlice.marketTrend)
    let stockTrendVal = useSelector((state: any) => state.stockTrendSlice)

    const [play, setPlay] = useState<boolean>(isPlaying);

    const [pivotTrend, setPivotTrend] = useState<number>(0);
    const [pivotTrendAA, setPivotTrendAA] = useState<number>(0);
    useEffect(() => {
        let aaLastValue: number = stocksValues.aa[stocksValues.aa.length - 1]
        let ccaLastValue: number = stocksValues.cca[stocksValues.cca.length - 1]
        let xahLastValue: number = stocksValues.xah[stocksValues.xah.length - 1]
        if (play) {
            setTimeout(() => {
                dispatch(dayChange())

                if (stockTrendVal.aaTrend == true) {
                    if (marketTrendVal == true) {
                        dispatch(aaTrendMarketTrend())
                    }
                    else {
                        dispatch(aaTrendMarketFalse())
                    }
                }
                else {
                    if (marketTrendVal == true) {
                        if (aaLastValue < 3) {
                            dispatch(aaTrendMarketTrend())
                        }
                        else {
                            dispatch(aaTrendFalse())
                        }
                    }
                    else {
                        if (aaLastValue < 3) {
                            dispatch(aaTrendMarketTrend())
                        }
                        else {
                            dispatch(aaTrendMarketFalse())
                        }
                    }
                }
                if (stockTrendVal.cca == true) {
                    if (marketTrendVal == true) {
                        dispatch(ccaTrendMarketTrend())
                    }
                    else {
                        dispatch(ccaTrendMarketFalse())
                    }
                }
                else {
                    if (marketTrendVal == true) {
                        if (ccaLastValue < 3) {
                            dispatch(ccaTrendMarketTrend())
                        }
                        else {
                            dispatch(ccaTrendFalse())
                        }
                    }
                    else {
                        if (aaLastValue < 3) {
                            dispatch(ccaTrendMarketTrend())
                        }
                        else {
                            dispatch(ccaTrendMarketFalse())
                        }
                    }
                }
                if (stockTrendVal.xah == true) {
                    if (marketTrendVal == true) {
                        dispatch(xahTrendMarketTrend())
                    }
                    else {
                        dispatch(xahTrendMarketFalse())
                    }
                }
                else {
                    if (marketTrendVal == true) {
                        if (xahLastValue < 3) {
                            dispatch(xahTrendMarketTrend())
                        }
                        else {
                            dispatch(xahTrendFalse())
                        }
                    }
                    else {
                        if (xahLastValue < 3) {
                            dispatch(xahTrendMarketTrend())
                        }
                        else {
                            dispatch(xahTrendMarketFalse())
                        }
                    }
                }
                if (store.getState().ShareOwnedSlice.aa != 22) {

                }
            }, 4 * 1000)
        }
        setPivotTrend(pivotTrend + 1);
        setPivotTrendAA(pivotTrendAA + 1);

        if (pivotTrend >= 31) {
            setPivotTrend(0)
            if (marketTrendVal == true) {
                console.log("marketTrend TRUE",)
                dispatch(marketTrendChangeFalse())
                dispatch(newsAdd(3))
            }
            else {
                console.log("marketTrend FALSE",)
                dispatch(marketTrendChangeTrue())
                dispatch(newsAdd(2))
            }
        }

        if (pivotTrendAA >= 16) {
            setPivotTrendAA(0)
            if (stockTrendVal.aaTrend == false || stocksValues.aa[stocksValues.aa.length - 1] < 3) {
                console.log("aaTrend false",)
                dispatch(newsAdd(0))
                dispatch(stockTrendChangeAATrue())
            }
            else {
                console.log("aaTrend TRUE")
                dispatch(stockTrendChangeAAFalse())
                dispatch(newsAdd(1))
            }
            if (stockTrendVal.ccaTrend == false || stocksValues.aa[stocksValues.aa.length - 1] < 3) {
                console.log("ccaTrend false",)
                dispatch(stockTrendChangeCCATrue())
                dispatch(newsAdd(4))
            }
            else {
                console.log("ccaTrend TRUE")
                dispatch(stockTrendChangeCCAFalse())
                dispatch(newsAdd(5))
            }
            if (stockTrendVal.xahTrend == false || stocksValues.aa[stocksValues.aa.length - 1] < 3) {
                console.log("xahTrend false",)
                dispatch(stockTrendChangeXAHTrue())
                dispatch(newsAdd(6))
            }
            else {
                console.log("xahTrend TRUE")
                dispatch(stockTrendChangeXAHFalse())
                dispatch(newsAdd(7))
            }
        }
    }, [play, day])
    const setValues = async () => {
        await AsyncStorage.setItem("@balance", String(store.getState().balanceSlice.balance))
        await AsyncStorage.setItem("@day", String(store.getState().daySlice.day))
        await AsyncStorage.setItem("@aa", String(store.getState().ShareOwnedSlice.aa))
        await AsyncStorage.setItem("@cca", String(store.getState().ShareOwnedSlice.cca))
        await AsyncStorage.setItem("@xah", String(store.getState().ShareOwnedSlice.xah))
        await AsyncStorage.setItem("@aaVal", String(store.getState().stockSlice.aa[store.getState().stockSlice.aa.length - 1]))
        await AsyncStorage.setItem("@ccaVal", String(store.getState().stockSlice.cca[store.getState().stockSlice.cca.length - 1]))
        await AsyncStorage.setItem("@xahVal", String(store.getState().stockSlice.xah[store.getState().stockSlice.xah.length - 1]))
    }
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
    useEffect(() => {
        if (day == 0) {
            getData
        }
        else {
            setValues()
        }
    }, [day])
    return (
        <View style={{ flexDirection: "row" }}>
            <DayCard />
            <PlayCard onPress={() => setPlay(!play)} text={play ? "Stop" : "Play"}>
            </PlayCard>
            {/* <ButtonPlus onPress={() => setPlay(!play)}>
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
            </ButtonPlus> */}
        </View>
    );
}
