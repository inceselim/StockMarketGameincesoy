import React, { useContext, useEffect, useState } from 'react';
import { View, Text, FlatList, SafeAreaView, Platform } from 'react-native';
import database from '@react-native-firebase/database';
import { styles } from '../../../styles/styles';
import { useTranslation } from 'react-i18next';
import i18n from "../../../languages/index"
import { colors } from '../../../styles/colors';
import { ButtonPrimary } from '../../../components/ButtonPrimary';
import { RewardedAd, RewardedAdEventType, TestIds } from 'react-native-google-mobile-ads';
import { useNavigation } from '@react-navigation/native';
import { Bank } from 'iconsax-react-native';
import { ButtonSecondary } from '../../../components/ButtonSecondary';
import SignOut from '../../../api/SignOutFirebase';
import B4 from '../../../ads/B/B4';
import G2 from '../../../ads/G/G2';
import { User, UserContext } from '../../../context/UserContext';


const adUnitId = Platform.OS === "ios" ?
    "ca-app-pub-1017432203303316/2489959247" :
    "ca-app-pub-1017432203303316/8508572687"

const rewardedAd = RewardedAd.createForAdRequest(adUnitId, {
    requestNonPersonalizedAdsOnly: true,
    keywords: ['fashion', 'clothing'],
});

export const StatisticsScreen = () => {
    const [dataStatistics, setDataStatistics]: any = useState([])
    const [loading, setLoading] = useState(false);
    const navigation: any = useNavigation();

    const { t }: any = useTranslation();
    // async function getStatistics() {
    //     database()
    //         .ref('/users/')
    //         .once('value')
    //         .then((snapshot: any) => {
    //             console.log('User data: ', snapshot);
    //             const dataArray = Object.values(snapshot.val()); // Veriyi diziye dönüştür
    //             console.log("a", dataArray)
    //             //
    //             // High Score Verilerini Büyükten Küçüğe Sıralama
    //             //
    //             setDataStatistics(dataArray.sort((a: any, b: any) => {
    //                 return b.score - a.score;
    //             }))
    //         })
    //         .then(() => {
    //         })
    // }
    // // G2()
    // useEffect(() => {
    //     getStatistics()
    // }, [])

    const { state, dispatch }: any = useContext(UserContext);


    const handleLogout = () => {
        dispatch({ type: 'LOGOUT' });
    };
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <ButtonPrimary
                    onPress={() => navigation.navigate("Home")}
                    text={`${i18n.t("Home")}`}>
                    <Bank size="16" color={colors.orange} />
                </ButtonPrimary>
                <ButtonSecondary
                    onPress={handleLogout}
                    text={`${i18n.t("Sign Out")}`}>
                    <Bank size="16" color={colors.orange} />
                </ButtonSecondary>
                <Text style={{ color: colors.blueDark, fontSize: 18, fontWeight: "600", paddingBottom: 14 }}>{t("High Scores")}</Text>

                <View style={{ alignItems: "center" }}>
                    <B4 />
                </View>
            </View>
        </SafeAreaView>
    );
}