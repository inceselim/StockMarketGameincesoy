import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider, useDispatch, useSelector } from 'react-redux';
import auth from "@react-native-firebase/auth"
import { store } from '../redux/store/store';
import AuthNavigation from '../navigation/AuthNavigation';
import analytics from '@react-native-firebase/analytics';

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
    return (
        <NavigationContainer
            ref={navigationRef}
            onReady={() => {
                routeNameRef.current = navigationRef.current.getCurrentRoute().name;
            }}
            onStateChange={async () => {
                const previousRouteName = routeNameRef.current;
                const currentRouteName = navigationRef.current.getCurrentRoute().name;
                // console.log("previousRouteName", previousRouteName)
                // console.log("currentRouteName", currentRouteName)
                if (previousRouteName !== currentRouteName) {
                    await analytics().logScreenView({
                        screen_name: currentRouteName,
                        screen_class: currentRouteName,
                    });
                }
                routeNameRef.current = currentRouteName;
            }}
        >
            <StatusBar hidden={true} />
            {
                state.user == null ?
                    <AuthNavigation />
                    :
                    <SessionNavigation />
            }
        </NavigationContainer>
    );
}
