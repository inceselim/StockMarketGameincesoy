import React, { useState } from 'react';
import { View, Text, SafeAreaView, ImageBackground, Image, TextInput, KeyboardAvoidingView, Alert, TouchableOpacity } from 'react-native';
import { styles } from '../../../styles/styles';
import { useTranslation } from 'react-i18next';
import i18n from "../../../languages/index"
import { ButtonPrimary } from '../../../components/ButtonPrimary';
import { useNavigation } from '@react-navigation/native';
import { ButtonSecondary } from '../../../components/ButtonSecondary';
import { LoginFirebase } from '../../../api/LoginFirebase';
import ResetPasswordFirebase from '../../../api/ResetPassword';
import B3 from '../../../ads/B/B3';

export default function ResetPasswordScreen() {
  const navigation: any = useNavigation();
  const { t }: any = useTranslation();
  const image = require('../../../assets/images/appstore.png');

  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");

  async function ResetPassword({ userEmail }: any) {
    if (userEmail != "") {
      ResetPasswordFirebase({ userEmail })
    }
    else {
      Alert.alert("Write a Email")
    }
  }
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Image source={image} resizeMode="center" style={{ height: 200, marginTop: 12, width: "100%", opacity: 0.7 }} />
        <Text style={{ fontSize: 22, textAlign: "center", marginTop: 14, paddingTop: 15, fontWeight: "bold", fontStyle: 'italic', color: "#ccc" }}>{i18n.t("Reset Password")}</Text>
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
          <ButtonPrimary onPress={() => ResetPassword({ userEmail })} text={`${i18n.t("Reset")}`} />
          <ButtonSecondary onPress={() => navigation.navigate("Login")} text={`${i18n.t("Login")}`} />
        </KeyboardAvoidingView>
      </View>
      <View style={{ alignItems: "center" }}>
        <B3 />
      </View>
    </SafeAreaView>
  );
}