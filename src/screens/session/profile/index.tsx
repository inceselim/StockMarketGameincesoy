import React, { useEffect, useState } from 'react';
import { View, Text, SafeAreaView, FlatList } from 'react-native';
import { styles } from '../../../styles/styles';
import BottomTab from '../../../components/BottomTab';
import SignOut from '../../../api/SignOutFirebase';
import { ButtonSecondary } from '../../../components/ButtonSecondary';
import { useTranslation } from 'react-i18next';
import i18n from "../../../languages/index"
import database from '@react-native-firebase/database';
import { colors } from '../../../styles/colors';
import B1 from '../../../ads/B/B1';
import B4 from '../../../ads/B/B4';

export default function ProfileScreen() {
    const [dataStatistics, setDataStatistics] = useState([]);
    async function getStatistics() {
        database()
            .ref('/users/')
            .once('value')
            .then((snapshot: any) => {
                console.log('User data: ', snapshot);
                const dataArray: any = Object.values(snapshot.val()); // Veriyi diziye dönüştür
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
    // G2()
    useEffect(() => {
        getStatistics()
    }, [])
    const { t }: any = useTranslation();
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <Text>Profile</Text>
                <Text style={{ color: colors.blueDark, fontSize: 18, fontWeight: "600", paddingBottom: 14 }}>{t("High Scores")}</Text>
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
                <View style={{ alignItems: "center",marginHorizontal:12 }}>
                    <B4 />
                </View>
                <ButtonSecondary onPress={SignOut} text={`${i18n.t("SignOut")}`} />
            </View>
            <BottomTab />
        </SafeAreaView>
    );
}
