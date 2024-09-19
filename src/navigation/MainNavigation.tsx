import React, { useContext, useEffect, useState } from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import auth from "@react-native-firebase/auth"

const Stack = createNativeStackNavigator();

//
// i18n
//
import i18n from '../languages';
import { useTranslation } from 'react-i18next'
import SessionNavigation from './SessionNavigation';
import { UserContext } from '../context/UserContext';
// --------


export default function MainNavigation() {
    const { state, dispatch }: any = useContext(UserContext);
    const [user1, setUser1] = useState("");
    const [log, setLog] = useState(false);
    let user;
    // let isLoggedData = useSelector(selectLogin)
    // let isUserMail = useSelector(selectUserEmail)

    function onAuthStateChanged(user1: any) {
        setUser1(user1)
        // isUserMail
        user = auth().currentUser;
        //console.log("user",user)
        // isUserMail
        // dispatch(logged())
        // LogUser()
    }
    useEffect(() => {
        // SubscriptionControl()
        auth().onUserChanged((user) => {
            if (user) {
                setLog(true)
                // dispatch(logged())
                // dispatch(LogUser())
            }
            else {
                setLog(false)
                // dispatch(logged())
                // dispatch(LogUser())
            }
        })
        const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
        // console.log("isLoggedData", isLoggedData)
        // console.log("CURRENT USER", auth().currentUser)
        return subscriber;
    }, []);
    const routeNameRef: any = React.useRef();
    const navigationRef: any = React.useRef();
    const [loading, setLoading] = useState(true);
    setTimeout(() => {
        setLoading(false)
    }, 1.3 * 1000);
    return (
        <NavigationContainer>
            <StatusBar hidden={true} />
            {/* {
                state.user == null ?
                    <AuthNavigation />
                    : */}
            <SessionNavigation />
            {/* } */}
        </NavigationContainer>
    );
}
