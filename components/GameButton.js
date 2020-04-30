import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform, TouchableNativeFeedback } from 'react-native';

import Colors from '../globalConst/colors';

const gameButton = props => {
    let ButtonComponent = TouchableOpacity;

    if (Platform.OS === 'android' && Platform.Version > 20) {
        ButtonComponent = TouchableNativeFeedback;
    }
    return (
        <View style={styles.buttonContainer}>
        <ButtonComponent onPress={props.onPress} activeOpacity={0.5}>
            <View style={styles.button}>
                <Text style={styles.title}>{props.children}</Text>
            </View>
        </ButtonComponent>
        </View>
    );
};

const styles = StyleSheet.create({
    buttonContainer:{
        borderRadius: 25,
        overflow: 'hidden'
    },
    button: {
        backgroundColor: Colors.primary,
        paddingHorizontal: 30,
        paddingVertical: 15,
        borderRadius: 30
    },
    title: {
        fontFamily: 'open-sans',
        color: 'white',
        fontSize: 16
    }
});

export default gameButton;
