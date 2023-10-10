import React from 'react';
import { View, Text, SafeAreaView } from 'react-native';
import { styles } from '../../../styles/styles';
import BottomTab from '../../../components/BottomTab';
import SignOut from '../../../api/SignOutFirebase';
import { ButtonSecondary } from '../../../components/ButtonSecondary';
import { useTranslation } from 'react-i18next';
import i18n from "../../../languages/index"

export default function ProfileScreen() {
    const { t }: any = useTranslation();
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <Text>Profile</Text>
                <ButtonSecondary onPress={SignOut} text={`${i18n.t("SignOut")}`} />
            </View>
            <BottomTab />
        </SafeAreaView>
    );
}
