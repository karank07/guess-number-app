import React from 'react';
import { View, Text, StyleSheet, Button, Image } from 'react-native';

import DefaultStyle from '../globalConst/DefaultStyle';
import Colors from '../globalConst/colors';
import GameButton from '../components/GameButton';

const gameOverScreen = (props) => {
    return (
        <View style={styles.screen}>
            <Text style={DefaultStyle.titleText}>The Game is Over!</Text>
            <View style={styles.imageContainer}>
                <Image source={require('../assets/original.png')} style={styles.image} />
            </View>
            <View style={styles.outputContainer}>
                <Text style={{ ...DefaultStyle.bodyText, ...styles.outputText }}>It took
                <Text style={styles.highlight}> {props.guessCount} </Text>
                 rounds to guess your number
                <Text style={styles.highlight}> {props.userSelectedNumber}</Text>
                </Text>
            </View>
            <GameButton onPress={props.onReset} >New Game</GameButton>
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },
    imageContainer: {
        height: 300,
        width: 300,
        marginVertical: 20,
        borderRadius: 150,
        overflow: 'hidden'

    },
    image: {
        height: '100%',
        width: '100%'
    },
    outputContainer: {
        marginHorizontal: 30,
        marginVertical: 20
    },
    highlight: {
        color: Colors.primary,
        fontFamily: 'open-sans-bold'
    },
    outputText: {
        textAlign: 'center'
    }
});

export default gameOverScreen;