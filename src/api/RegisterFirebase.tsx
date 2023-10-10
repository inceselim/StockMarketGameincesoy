import React, { useEffect } from 'react';
import { Alert } from 'react-native';

// Firebase
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import database, { firebase } from '@react-native-firebase/database';

//
// i18n
//
import i18n from '../languages';
import { useTranslation } from 'react-i18next'
// --------

export const RegisterFirebase = async (email: any, password: any, name: any) => {
    console.log("User REGISTER executed", email, password, name)
    try {
        await auth().createUserWithEmailAndPassword(email, password)
            .then(async (user: any) => {
                console.log('User account created & signed in!');
                const userId = user.user.uid
                console.log("userId", userId)

                try {
                    firebase
                        .app()
                        .database("https://stockmarketgameincesoy-default-rtdb.us-central1.firebasedatabase.app/")
                        .ref('/users/' + userId)
                        .set({
                            name: name,
                            score: 0,
                        })
                        .then(() => console.log('Data set.'))
                        .catch((e) => console.log("Register Firebase REALTIME ERROR: ", e))
                } catch (error) {
                    console.log('Add Product Err', error);
                }

                // firestore()
                //     .collection('users')
                //     .doc(userId)
                //     .set({
                //         userId: userId,
                //         name: name,
                //         score: 0,
                //     })
                //     .then(() => {
                //         console.log('User added!');
                //         console.log('User account created & signed in!');
                //     });
            })
    } catch (error: any) {
        if (error.code === 'auth/email-already-in-use') {
            console.log('That email address is already in use!');
            Alert.alert("That_email_address_is_already_in_use")
        }
        if (error.code === 'auth/invalid-email') {
            console.log('That email address is invalid!');
            Alert.alert("That_email_address_is_invalid")
        }
        console.log(error)
    }
}