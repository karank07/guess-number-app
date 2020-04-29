import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

import Colors from '../globalConst/colors';

const gameButton = props => {
    return (
        <TouchableOpacity onPress={props.onPress} activeOpacity={0.5}>
            <View style={styles.button}>
                <Text style={styles.title}>{props.children}</Text>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
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
