import React, { useState } from 'react';
import { View, Text, SafeAreaView, ImageBackground, Image, TextInput, KeyboardAvoidingView, Alert, TouchableOpacity } from 'react-native';
import { styles } from '../../../styles/styles';
import { useTranslation } from 'react-i18next';
import i18n from "../../../languages/index"
import { ButtonPrimary } from '../../../components/ButtonPrimary';
import { useNavigation } from '@react-navigation/native';
import { ButtonSecondary } from '../../../components/ButtonSecondary';
import { LoginFirebase } from '../../../api/LoginFirebase';

export default function LoginScreen() {
    const navigation: any = useNavigation();
    const { t }: any = useTranslation();
    const image = require('../../../assets/images/appstore.png');

    const [userEmail, setUserEmail] = useState("");
    const [userPassword, setUserPassword] = useState("");

    const login = ({ userEmail, userPassword }: any) => {
        if (userEmail !== '' && userPassword !== '') {
            LoginFirebase({ userEmail, userPassword });
        } else {
            Alert.alert('Tüm Alanları Doldurunuz');
        }
    };
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <Image source={image} resizeMode="center" style={{ height: 200, marginTop: 12, width: "100%", opacity: 0.7 }} />
                <Text style={{ fontSize: 22, textAlign: "center", marginTop: 14, paddingTop: 15, fontWeight: "bold", fontStyle: 'italic', color: "#ccc" }}>{i18n.t("Login")}</Text>
                {/* <Text style={styles.text}>Inside</Text> */}
                <Text style={{ marginTop: 16 }} />
                <KeyboardAvoidingView behavior='height'>
                    <TextInput style={styles.textInput}
                        placeholder={`${i18n.t("Email Address")}`}
                        value={userEmail}
                        onChangeText={setUserEmail}
                        placeholderTextColor={"#666"}
                        autoCapitalize="none"
                        textContentType="emailAddress"
                    />
                    <TextInput style={styles.textInput}
                        placeholder={`${i18n.t("Password")}`}
                        placeholderTextColor={"#666"}
                        value={userPassword}
                        onChangeText={setUserPassword}
                        autoCapitalize="none"
                        textContentType="password"
                    />
                    <TouchableOpacity onPress={()=>navigation.navigate("Reset")}>
                        <Text style={styles.text1Bold}>{`${i18n.t("Forgot Your Password")}`}</Text>
                    </TouchableOpacity>
                    <ButtonPrimary onPress={() => login({ userEmail, userPassword })} text={`${i18n.t("SignIn")}`} />
                    <ButtonSecondary onPress={() => navigation.navigate("Register")} text={`${i18n.t("Register")}`} />
                </KeyboardAvoidingView>
            </View>
        </SafeAreaView>
    );
}
