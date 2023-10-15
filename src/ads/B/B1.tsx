import React from 'react';
import { Platform } from 'react-native';
import { BannerAd, BannerAdSize, TestIds } from 'react-native-google-mobile-ads';

const adUnitId = Platform.OS === "ios" ?
    "ca-app-pub-1017432203303316/8396806328" :
    "ca-app-pub-1017432203303316/7828447222"


function B1() {
    return (
        <BannerAd
            unitId={adUnitId}
            size={BannerAdSize.INLINE_ADAPTIVE_BANNER}
            requestOptions={{
                requestNonPersonalizedAdsOnly: false,
            }}
        />
    );
}

export default B1;