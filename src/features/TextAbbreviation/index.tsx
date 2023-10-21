import React from 'react';
import { Text } from 'react-native';


//
// Text Abbrreviation / Yazı Kısaltma Fonksiyonu
//
// -----------------------
const MaxCharacterText = (text: string, maxLength: any = 30) => {
    if (text.length <= maxLength) {
        return text
    }
    else {
        const truncatedText: string = text.substring(0, maxLength - 3) + '...';
        return truncatedText
    }
};
export default MaxCharacterText;