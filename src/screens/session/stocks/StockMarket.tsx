import { Dimensions, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { colors } from '../../../styles/colors'
import { LineChart } from 'react-native-chart-kit'
import { IStocks } from '../home/IStocks'

type Props = {}

const StockMarket = (props: Props) => {
    const [stocks, setStocks] = useState<IStocks>({
        marketTrend: true,
        stocksTrend: { aaTrend: true },
        stocks: {
            aa: [22], abc: 12, cas: 12
        }
    });
    return (
        <SafeAreaView>
            <Text>StockMarket</Text>
            <LineChart
                data={{
                    labels: [""],
                    datasets: [
                        {
                            data: stocks.stocks.aa

                        }
                    ]
                }}
                width={Dimensions.get("window").width - 50} // from react-native
                height={220}
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
                        borderRadius: 60
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
        </SafeAreaView>
    )
}

export default StockMarket

const styles = StyleSheet.create({})