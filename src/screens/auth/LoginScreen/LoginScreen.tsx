import React, { useContext, useEffect, useState } from 'react';
import { View, Text, SafeAreaView, ImageBackground, Image, TextInput, KeyboardAvoidingView, Alert, TouchableOpacity } from 'react-native';
import { styles } from '../../../styles/styles';
import { useTranslation } from 'react-i18next';
import i18n from "../../../languages/index"
import { ButtonPrimary } from '../../../components/ButtonPrimary';
import { useNavigation } from '@react-navigation/native';
import { ButtonSecondary } from '../../../components/ButtonSecondary';
import { LoginFirebase } from '../../../api/LoginFirebase';
import B1 from '../../../ads/B/B1';
import { User, UserContext } from '../../../context/UserContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LoginScreen() {
    const { state, dispatch }: any = useContext(UserContext);

    const navigation: any = useNavigation();
    const { t }: any = useTranslation();
    const image = require('../../../assets/images/appstore.png');

    const [userName, setUserName] = useState("");
    const [userPassword, setUserPassword] = useState("");

    const login = ({ userEmail, userPassword }: any) => {
        if (userEmail !== '' && userPassword !== '') {
            LoginFirebase({ userEmail, userPassword });
        } else {
            Alert.alert('Tüm Alanları Doldurunuz');
        }
    };
    const rememberUser = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem('userData');
            console.log("jsonValue", jsonValue)
            const user: User = { userName: userName, userPassword: userPassword }; // Giriş yapan kullanıcı bilgileri
            dispatch({ type: 'LOGIN', payload: user });
            return jsonValue != null ? JSON.parse(jsonValue) : null;
        } catch (e) {
            // error reading value
        }
    };
    useEffect(() => {
        rememberUser()
    }, [])

    const handleLogin = ({ userName, userPassword }: User) => {
        if (userName == "" && userPassword == "") {
            Alert.alert("Hata", "Lütfen Tüm Alanları Doldurunuz...")
        }
        else {
            const user: User = { userName: userName, userPassword: userPassword }; // Giriş yapan kullanıcı bilgileri
            dispatch({ type: 'LOGIN', payload: user });
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
                        value={userName}
                        onChangeText={setUserName}
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
                    <TouchableOpacity onPress={() => navigation.navigate("Reset")}>
                        <Text style={styles.text1Bold}>{`${i18n.t("Forgot Your Password")}`}</Text>
                    </TouchableOpacity>
                    <ButtonPrimary onPress={() => handleLogin({ userName, userPassword })} text={`${i18n.t("SignIn")}`} />
                    <ButtonSecondary onPress={() => navigation.navigate("Register")} text={`${i18n.t("Register")}`} />
                </KeyboardAvoidingView>
            </View>
            <View style={{ alignItems: "center" }}>
                <B1 />
            </View>
        </SafeAreaView>
    );
}
