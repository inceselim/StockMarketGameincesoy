import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { style } from './style';

export const ButtonPrimary = ({ onPress, text, children, disabled = false }: any) => {
    return (
        <TouchableOpacity
            disabled={disabled}
            style={style.btn} onPress={onPress}>
            {children}
            <Text style={style.btnText}>{text}</Text>
        </TouchableOpacity>
    );
}
