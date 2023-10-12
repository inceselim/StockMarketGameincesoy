import React, { useContext, useState } from 'react';
import { View, Text, SafeAreaView, ImageBackground, Image, TextInput, KeyboardAvoidingView, Alert } from 'react-native';
import { styles } from '../../../styles/styles';
import { useTranslation } from 'react-i18next';
import i18n from "../../../languages/index"
import { ButtonPrimary } from '../../../components/ButtonPrimary';
import { useNavigation } from '@react-navigation/native';
import { ButtonSecondary } from '../../../components/ButtonSecondary';
import { RegisterFirebase } from '../../../api/RegisterFirebase';
import B2 from '../../../ads/B/B2';
import { User, UserContext } from '../../../context/UserContext';

export default function RegisterScreen() {
    const { state, dispatch }: any = useContext(UserContext);
    const navigation: any = useNavigation();
    const { t }: any = useTranslation();
    const image = require('../../../assets/images/appstore.png');

    const [userName, setUserName] = useState("");
    const [userEmail, setUserEmail] = useState("");
    const [userPassword, setUserPassword] = useState("");

    // const RegisterMail = ({ userEmail, userPassword, userName }: any) => {
    //     console.log("userEmail,", userEmail)
    //     console.log("password,", userPassword)
    //     console.log("userName,", userName)
    //     if (userEmail == "") {
    //         Alert.alert(`${t("Please_enter_your_email")}`)
    //     }
    //     else if (userName == "") {
    //         Alert.alert(`${t("Please_enter_your_name")}`)
    //     }
    //     // else if (password != password1) {
    //     //     Alert.alert(`${t("Passwords_are_different")}`)
    //     // }
    //     else if (userPassword.length < 6) {
    //         Alert.alert(`${t("Password_is_too_short")}`)
    //     }
    //     else {
    //         RegisterFirebase(userEmail, userPassword, userName)
    //     }
    // }
    const handleRegister = ({ userName, userPassword }: User) => {
        const user = { userName: userName, userPassword: userPassword }; // Yeni kullanıcı bilgileri
        dispatch({ type: 'REGISTER', payload: user });
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <Image source={image} resizeMode="center" style={{ height: 200, marginTop: 12, width: "100%", opacity: 0.7 }} />
                <Text style={{ fontSize: 22, textAlign: "center", marginTop: 14, paddingTop: 15, fontWeight: "bold", fontStyle: 'italic', color: "#ccc" }}>{i18n.t("Register")}</Text>
                {/* <Text style={styles.text}>Inside</Text> */}
                <Text style={{ marginTop: 16 }} />
                <KeyboardAvoidingView behavior='height'>
                    <TextInput style={styles.textInput}
                        placeholder={`${i18n.t("User Name")}`}
                        placeholderTextColor={"#666"}
                        value={userName}
                        onChangeText={setUserName}
                        autoCapitalize="none"
                        textContentType="name"
                    />
                    <TextInput style={styles.textInput}
                        placeholder={`${i18n.t("Email Address")}`}
                        placeholderTextColor={"#666"}
                        value={userEmail}
                        onChangeText={setUserEmail}
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
                    <ButtonPrimary
                        onPress={() => handleRegister({ userName, userPassword })} text={`${i18n.t("Register")}`} />
                    <ButtonSecondary onPress={() => navigation.navigate("Login")} text={`${i18n.t("Login")}`} />
                </KeyboardAvoidingView>
            </View>
            <View style={{ alignItems: "center" }}>
                <B2 />
            </View>
        </SafeAreaView>
    );
}
