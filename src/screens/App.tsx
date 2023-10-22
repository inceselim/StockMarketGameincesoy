import React, { useCallback, useEffect, useContext } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider, useDispatch } from 'react-redux';
import { store } from '../redux/store/store';
import MainNavigation from '../navigation/MainNavigation';
import mobileAds, { MaxAdContentRating } from 'react-native-google-mobile-ads';
import {
  getTrackingStatus,
  requestTrackingPermission,
  TrackingStatus,
} from 'react-native-tracking-transparency';
import { Alert } from 'react-native';
import { UserContextProvider } from '../context/UserContext'; // Context dosyanızın yolunu güncelleyin
import { PlayContextProvider } from '../context/DayContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { balanceUpdate } from '../redux/features/balanceSlice';
import { dayUpdate } from '../redux/features/daySlice';
import { stocksUpdateAA, stocksUpdateCCA, stocksUpdateXAH } from '../redux/features/ShareOwnedSlice';
import { aaValUpdate, ccaValUpdate, xahValUpdate } from '../redux/features/stockSlice';

const Stack = createNativeStackNavigator();

export default function App(): JSX.Element {
  const [trackingStatus, setTrackingStatus] = React.useState<
    TrackingStatus | '(loading)'
  >('(loading)');


  async function permissionTransparency() {
    await mobileAds().initialize();
    //
    // Tracking Permission
    //
    const status = await requestTrackingPermission();
    setTrackingStatus(status);
    getTrackingStatus()
      .then((status: any) => {
        setTrackingStatus(status);
      })
  }
  useEffect(() => {
    mobileAds()
      .setRequestConfiguration({
        // Update all future requests suitable for parental guidance
        maxAdContentRating: MaxAdContentRating.PG,

        // Indicates that you want your content treated as child-directed for purposes of COPPA.
        tagForChildDirectedTreatment: true,

        // Indicates that you want the ad request to be handled in a
        // manner suitable for users under the age of consent.
        tagForUnderAgeOfConsent: true,

        // An array of test device IDs to allow.
        testDeviceIdentifiers: ['EMULATOR'],
      })
    permissionTransparency()
  }, [])
  console.log("object")
  return (
    <Provider store={store}>
      <UserContextProvider>
        <PlayContextProvider>
          <MainNavigation />
        </PlayContextProvider>
      </UserContextProvider>
    </Provider>
  );
}
