import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { style } from './style';

export const ButtonSecondary = ({ onPress, text }: any) => {
    return (
        <TouchableOpacity style={style.btn} onPress={onPress}>
            <Text style={style.btnText}>{text}</Text>
        </TouchableOpacity>
    );
}
