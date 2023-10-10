import React from 'react';
import { Platform } from 'react-native';
import { BannerAd, BannerAdSize, TestIds } from 'react-native-google-mobile-ads';

const adUnitId = Platform.OS === "ios" ?
    "ca-app-pub-1017432203303316/2192977160" :
    "ca-app-pub-1017432203303316/8065881257"


function b2() {
    console.log("D1 ad id:" + adUnitId)
    return (
        <BannerAd
            unitId={adUnitId}
            size={BannerAdSize.BANNER}
            requestOptions={{
                requestNonPersonalizedAdsOnly: false,
            }}
        />
    );
}

export default b2;