import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { style } from './style';

export const ButtonPlus = ({ onPress, text, children }: any) => {
    return (
        <TouchableOpacity style={style.btn} onPress={onPress}>
            {children}
        </TouchableOpacity>
    );
}
