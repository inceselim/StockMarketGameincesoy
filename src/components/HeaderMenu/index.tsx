import React, { useContext, useEffect, useState } from 'react';
import { View, Text, SafeAreaView, Alert, } from 'react-native';
import { useTranslation } from 'react-i18next';
import i18n from "../../languages/index"
import { Play, Stop } from 'iconsax-react-native';
import { colors } from '../../styles/colors';
import { ButtonPlus } from '../../components/ButtonPlus';
import { useDispatch, useSelector } from 'react-redux';
import { aaTrendFalse, aaTrendMarketFalse, aaTrendMarketTrend, selectStocks } from '../../redux/features/stockSlice';
import { marketTrendChangeFalse, marketTrendChangeTrue, selectMarketTrend } from '../../redux/features/marketTrendSlice';
import { selectStockTrend, stockTrendChange, stockTrendChangeAAFalse, stockTrendChangeAATrue } from '../../redux/features/stockTrendSlice';
import { store } from '../../redux/store/store';
import { dayChange } from '../../redux/features/daySlice';
import { PlayContext } from '../../context/DayContext';

export default function HeaderMenu(): JSX.Element {
    const { isPlaying, togglePlaying } = useContext(PlayContext);
    const dispatch: any = useDispatch();
    let aa = useSelector((state: any) => state.stockSlice.aa)
    let day: number = useSelector((state: any) => state.daySlice.day)

    let stocksValues = selectStocks((state: any) => state.stockSlice)
    let marketTrendVal = selectMarketTrend((state: any) => state)
    let stockTrendVal = selectStockTrend((state: any) => state)

    const [play, setPlay] = useState<boolean>(isPlaying);

    const [pivotTrend, setPivotTrend] = useState<number>(0);
    const [pivotTrendAA, setPivotTrendAA] = useState<number>(0);
    useEffect(() => {
        let aaLastValue: number = stocksValues.aa[stocksValues.aa.length - 1]
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
            }, 3 * 1000)
        }
        setPivotTrend(pivotTrend + 1);
        setPivotTrendAA(pivotTrendAA + 1);

        if (pivotTrend == 10) {
            setPivotTrend(0)
            if (marketTrendVal == true) {
                console.log("marketTrend TRUE",)
                dispatch(marketTrendChangeFalse())
            }
            else {
                console.log("marketTrend FALSE",)
                dispatch(marketTrendChangeTrue())
            }
        }

        if (pivotTrendAA == 4) {
            setPivotTrendAA(0)
            if (stockTrendVal.aaTrend == false || stocksValues.aa[stocksValues.aa.length - 1] < 3) {
                console.log("aaTrend false",)
                dispatch(stockTrendChangeAATrue())
            }
            else {
                console.log("aaTrend TRUE")
                dispatch(stockTrendChangeAAFalse())
            }
        }
    }, [play,day])
    return (
        <View style={{ flexDirection: "row" }}>
            <View style={{
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                width: "30%",
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
                        <Stop size="18" variant='Bulk' color={colors.white} />
                        :
                        <Play size="18" color={colors.white} />
                }
            </ButtonPlus>
        </View>
    );
}
