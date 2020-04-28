import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import Colors from '../globalConst/colors';

const numberContainer = (props) => {
    return (
        <View style={styles.container}>
            <Text>{props.children}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginVertical: 10,
        borderWidth: 2,
        borderColor: Colors.accent,
        padding: 10,
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center"
    }
});
export default numberContainer;