import { View, Text } from 'react-native'
import React, { Children } from 'react'
import { ButtonPlus } from '../ButtonPlus'
import { Play, Stop } from 'iconsax-react-native'
import { colors } from '../../styles/colors'

const PlayCard = (props: any) => {
    const text = props.text
    return (
        <ButtonPlus onPress={props.onPress}>
            <Text style={{
                paddingRight: 2,
                fontWeight: "bold",
                fontStyle: "italic",
                color: colors.blueDark
            }}>
                {text}
            </Text>
            <>
                {
                    text == "Stop" ?
                        <Stop size="18" variant='Bulk' color={colors.white} />
                        :
                        <Play size="18" color={colors.white} />
                }
            </>
        </ButtonPlus>
    )
}

export default PlayCard