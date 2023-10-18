import React from 'react';
import { View, Text } from 'react-native';
import { colors } from '../../styles/colors';
import { useTranslation } from 'react-i18next';
import i18n from '../../languages';
import { useSelector } from 'react-redux';

const DayCard: React.FC = () => {
    let day: number = useSelector((state: any) => state.daySlice.day)
    const { t }: any = useTranslation();
    return (
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
    );
}
export default DayCard;
