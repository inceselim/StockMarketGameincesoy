import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, SafeAreaView, Alert } from 'react-native';
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

const adUnitId = __DEV__ ? TestIds.REWARDED : 'ca-app-pub-xxxxxxxxxxxxx/yyyyyyyyyyyyyy';
const rewardedAd = RewardedAd.createForAdRequest(adUnitId, {
    requestNonPersonalizedAdsOnly: true,
    keywords: ['fashion', 'clothing'],
});

export const StatisticsScreen = () => {
    const [dataStatistics, setDataStatistics]: any = useState([])
    const [loading, setLoading] = useState(false);
    const navigation: any = useNavigation();

    const { t }: any = useTranslation();
    async function getStatistics() {
        database()
            .ref('/users/')
            .once('value')
            .then((snapshot: any) => {
                console.log('User data: ', snapshot);
                const dataArray = Object.values(snapshot.val()); // Veriyi diziye dönüştür
                console.log("a", dataArray)
                //
                // High Score Verilerini Büyükten Küçüğe Sıralama
                //
                setDataStatistics(dataArray.sort((a: any, b: any) => {
                    return b.score - a.score;
                }))
            })
            .then(() => {
            })
    }
    useEffect(() => {
        getStatistics()
    }, [])

    const [rewardedAdLoaded, setRewardedAdLoaded] = React.useState(false);
    useEffect(() => {
        // Start loading the rewarded ad straight away
        rewardedAd.load()
        if (rewardedAd.loaded) {
            setRewardedAdLoaded(true)
        }
        else if (RewardedAdEventType.EARNED_REWARD) {
            Alert.alert("Kazanıldı")
            rewardedAd.load()
        }
        else {
            rewardedAd.load()
        }

    }, [rewardedAd.loaded]);

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <ButtonPrimary
                    onPress={() => navigation.navigate("Home")}
                    text={`${i18n.t("Home")}`}>
                    <Bank size="16" color={colors.orange} />
                </ButtonPrimary>
                <ButtonSecondary
                    onPress={SignOut}
                    text={`${i18n.t("Sign Out")}`}>
                    <Bank size="16" color={colors.orange} />
                </ButtonSecondary>
                <Text style={{ color: colors.blueDark, fontSize: 18, fontWeight: "600", paddingBottom: 14 }}>{t("High Scores")}</Text>

                <ButtonPrimary
                    onPress={() => {
                        rewardedAd.show();
                    }}
                    disabled={rewardedAd.load}
                    text={!rewardedAd.load ? "Watch ad 500 $ Gift" : "Ads Loading..."} />
                <View style={{ borderRadius: 8, backgroundColor: colors.blueLight, borderWidth: 1, paddingVertical: 14 }}>
                    <FlatList data={dataStatistics}
                        ListHeaderComponent={
                            <View style={[styles.twoColsView, { paddingTop: 0, borderBottomWidth: 1, paddingBottom: 8, paddingHorizontal: 12 }]}>
                                <Text style={[styles.text1Bold, { fontSize: 17, color: colors.white }]}>{t("User").toUpperCase()}</Text>
                                <Text style={[styles.text1Bold, { fontSize: 17, color: colors.white }]}>{t("Score").toUpperCase()}</Text>
                            </View>}
                        renderItem={(item: any) => (
                            <View style={[styles.twoColsView, { paddingHorizontal: 12, }]}>
                                <Text style={{ lineHeight: 27, fontWeight: "500", color: colors.white }}>{item.item["name"].toUpperCase()}</Text>
                                <Text style={{ lineHeight: 27, fontWeight: "500", color: colors.white }}>{item.item.score}</Text>
                            </View>
                        )}
                    />
                </View>
            </View>
        </SafeAreaView>
    );
}