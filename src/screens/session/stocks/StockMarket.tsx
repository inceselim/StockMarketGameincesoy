import { Dimensions, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
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

const StockMarket = (props: any) => {
    const { t }: any = useTranslation();
    const dispatch: any = useDispatch();
    const selectedStock: string = props.route.params.stock
    console.log("object")
    console.log("object", selectedStock)
    console.log("object")
    console.log("object")
    let aaValues: number[] = useSelector((state: any) => state.stockSlice.aa)
    let ccaValues: number[] = useSelector((state: any) => state.stockSlice.cca)
    let xahValues: number[] = useSelector((state: any) => state.stockSlice.xah)
    // let aaLastValue: number = stocksValues.aa[stocksValues.aa.length - 1]
    let stocksValues = selectStocks((state: any) => state.stockSlice)
    let aaLastVal: number = stocksValues.aa[stocksValues.aa.length - 1]
    let graphWidth: number = screenWidth * 0.91
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <HeaderMenu />
                <Text style={{ fontSize: 16, fontWeight: "500", paddingStart: 6 }}>{t("Stock_Name")}: {selectedStock.toLocaleUpperCase("tr-TR")}</Text>
                <LineChart
                    data={{
                        labels: [""],
                        datasets: [
                            {
                                data: selectedStock == "aa" ?
                                    aaValues :
                                    selectedStock == "cca" ?
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
                            borderRadius: 40,
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
            </View>
        </SafeAreaView>
    )
}

export default StockMarket;