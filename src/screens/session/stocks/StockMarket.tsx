import { Dimensions, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { colors } from '../../../styles/colors'
import { LineChart } from 'react-native-chart-kit'
import { IStocks } from '../../../constants/IStocks'
import { useDispatch, useSelector } from 'react-redux'
import { styles } from '../../../styles/styles'
import HeaderMenu from '../../../components/HeaderMenu'

const StockMarket = (props: any) => {
    const dispatch: any = useDispatch();
    let aa: any = useSelector((state: any) => state.stockSlice.aa)
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <HeaderMenu />
            </View>
            <Text>StockMarket</Text>
            <LineChart
                data={{
                    labels: [""],
                    datasets: [
                        {
                            data: aa

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

export default StockMarket;