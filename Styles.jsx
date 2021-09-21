import { Dimensions, StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        height: 200,
        width: 350,
        borderRadius: 10
    },
    item: {
        width: Dimensions.get('screen').width,
        height: 250,
        borderWidth: 0.5,
        top: 180,
        padding: 10,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonsContainer: {
        backgroundColor: 'red',
        width: Dimensions.get('screen').width,
        height: 50,
        bottom: 250,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around'
    }
});