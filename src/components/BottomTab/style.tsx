import { Dimensions, StyleSheet } from "react-native";
import { colors } from "../../styles/colors";

let screenWidth: any = Dimensions.get("window").width / 2

export const style = StyleSheet.create({
    container: {
        width: "100%",
        backgroundColor: "#ab48abf",
        flexDirection: "row",
        justifyContent: "space-between"
    },
    btn: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#dddf",
        width: screenWidth,
        paddingVertical: 14
    },
    btnText: {
        color: colors.blueDark,
        textAlign: "center",
        paddingStart: 8,
        fontWeight: "800"
    }
})