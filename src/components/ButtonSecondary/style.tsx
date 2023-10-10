import { StyleSheet } from "react-native";
import { colors } from "../../styles/colors";

export const style = StyleSheet.create({
    btn: {
        backgroundColor: colors.blueLight,
        borderRadius: 8,
        marginVertical: 12,
        borderWidth:1,
        borderColor:colors.blueDark,
    },
    btnText: {
        color: colors.white,
        paddingVertical: 14,
        textAlign: "center",
        fontSize: 15,
        fontWeight: "bold"
    }
})