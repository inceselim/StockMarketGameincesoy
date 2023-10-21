import { StyleSheet } from "react-native";
import { colors } from "./colors";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:"#dddf"
    },
    content: {
        flex: 1,
        paddingHorizontal: 12,
    },
    twoColsView: {
        justifyContent: "space-between",
        flexDirection: "row",
        alignItems:"center"
    },
    threeColsView: {
        justifyContent: "space-between",
        flexDirection: "row"
    },
    textInput: {
        width: "100%",
        height: 45,
        backgroundColor: "#f4f4f4",
        borderRadius: 8,
        marginVertical: 12,
        borderWidth: 1,
        borderColor: "#ccc",
        color: "#001",
        paddingHorizontal: 14,
    },
    text1: {
        fontSize: 15,
        color: colors.blueLight
    },
    text1Bold: {
        fontSize: 15,
        color: colors.blueLight,
        fontWeight: "bold"
    }
})