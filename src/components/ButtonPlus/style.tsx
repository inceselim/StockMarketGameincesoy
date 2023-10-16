import { StyleSheet } from "react-native";
import { colors } from "../../styles/colors";

export const style = StyleSheet.create({
    btn: {
        backgroundColor: colors.orange,
        borderRadius: 8,
        height:50,
        marginVertical: 12,
        marginHorizontal: 4,
        paddingHorizontal: 8,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center"
    },
    btnText: {
        color: colors.white,
        paddingStart: 14,
        paddingVertical: 14,
        textAlign: "center",
        fontSize: 14,
        fontWeight: "bold"
    }
})