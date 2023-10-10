import React, { useState, useEffect } from 'react';
import auth from '@react-native-firebase/auth';
import { logged } from '../redux/features/authSlice/authSlice';
import { useDispatch } from 'react-redux';

export function AuthFirebase() {
    const dispatch = useDispatch()
    function onAuthStateChanged() {
        console.log("ssss")
        dispatch(logged())
    }

    useEffect(() => {
        const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
        return subscriber; // unsubscribe on unmount
    }, []);
}

export function UserLogIn({ userEmail, password }: any) {
    console.log("email", userEmail)
    console.log("password", password)
    let correctLogin = false;
    auth()
        .signInWithEmailAndPassword(userEmail, password)
        .then(() => {
            console.log('User signed in!');
            correctLogin = !correctLogin;
        })
        .catch(error => {
            if (error.code === 'auth/email-already-in-use') {
                console.log('That email address is already in use!');
            }

            if (error.code === 'auth/invalid-email') {
                console.log('That email address is invalid!');
            }

            console.error(error);
        });
    return correctLogin;

}
export const UserRegister = () => {
    auth()
        .createUserWithEmailAndPassword('jane.doe@example.com', 'SuperSecretPassword!')
        .then(() => {
            console.log('User account created & signed in!');
        })
        .catch(error => {
            if (error.code === 'auth/email-already-in-use') {
                console.log('That email address is already in use!');
            }

            if (error.code === 'auth/invalid-email') {
                console.log('That email address is invalid!');
            }

            console.error(error);
        });
}