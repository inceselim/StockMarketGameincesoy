import React, { useEffect } from 'react';
import auth from '@react-native-firebase/auth';
import { Alert } from 'react-native';

//
// i18n
//
import i18n from '../languages/index';
import { useTranslation } from 'react-i18next'
// --------

export default function ResetPasswordFirebase(userEmail: any) {
    // const { t }: any = useTranslation();
    console.log("Reset Pass executed", userEmail.userEmail)
    auth()
        .sendPasswordResetEmail(userEmail.userEmail)
        .then(() => {
            console.log('Email Gönderildi...!');
            Alert.alert(("Email_sended"), ("Dont_Forget control the Spam folder"))
        })
        .catch((err: any) => {
            Alert.alert("Error")
        })
}