import React, { useEffect, useState } from 'react';
import { View, Text, SafeAreaView, } from 'react-native';
import { styles } from '../../styles/styles';
import { useTranslation } from 'react-i18next';
import i18n from "../../languages/index"
import { ButtonPrimary } from '../../components/ButtonPrimary';
import { Play, Stop } from 'iconsax-react-native';
import { colors } from '../../styles/colors';
import { ButtonPlus } from '../../components/ButtonPlus';
import { ArchiveBook, ArrowDown2, ArrowRight2, Chart1 } from 'iconsax-react-native';
import { IStocks } from '../../constants/IStocks';
import BottomTab from '../../components/BottomTab';
import { useDispatch, useSelector } from 'react-redux';
import { aaTrendFalse, aaTrendMarketFalse, aaTrendMarketTrend, selectStocks } from '../../redux/features/stockSlice';
import { marketTrendChangeFalse, marketTrendChangeTrue, selectMarketTrend } from '../../redux/features/marketTrendSlice';
import { selectStockTrend, stockTrendChange, stockTrendChangeAAFalse, stockTrendChangeAATrue } from '../../redux/features/stockTrendSlice';

export default function HeaderMenu() {
    const dispatch: any = useDispatch();
    let aa = useSelector((state: any) => state.stockSlice.aa)
    let stocksValues = selectStocks((state: any) => state.stockSlice)
    let marketTrendVal = selectMarketTrend((state: any) => state)
    let stockTrendVal = selectStockTrend((state: any) => state)

    const [day, setDay] = useState<number>(0);
    const [play, setPlay] = useState<boolean>(false);

    const [pivotTrend, setPivotTrend] = useState<number>(0);
    const [pivotTrendAA, setPivotTrendAA] = useState<number>(0);

    useEffect(() => {
        let aaLastValue: number = stocksValues.aa[stocksValues.aa.length - 1]
        if (play) {
            setTimeout(() => {
                setDay(day + 1)

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

    }, [day, play])
    return (
        <SafeAreaView>
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
        </SafeAreaView>
    );
}
