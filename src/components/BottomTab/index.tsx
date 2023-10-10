import React from "react";
import { Dimensions, Text, TouchableOpacity, View } from "react-native";
import { style } from "./style";
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import i18n from "../../languages";
import { Courthouse, Profile } from "iconsax-react-native";


export default function BottomTab() {
    const navigation: any = useNavigation();
    const { t }: any = useTranslation();
    return (
        <View style={style.container}>
            <TouchableOpacity style={style.btn} onPress={() => navigation.navigate("Home")}>
                <Courthouse size="32" color="#ba68c8" variant="Outline" />
                <Text style={style.btnText}>{i18n.t("Home")}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={style.btn} onPress={() => navigation.navigate("Profile")}>
                <Profile size="32" variant="Bulk" color="#ba68c8" />
                <Text style={style.btnText}>{i18n.t("Profile")}</Text>
            </TouchableOpacity>
        </View>
    );
}
