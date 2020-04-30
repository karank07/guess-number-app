import React from 'react';
import { View, Text, StyleSheet, Button, Image, Dimensions, ScrollView } from 'react-native';

import DefaultStyle from '../globalConst/DefaultStyle';
import Colors from '../globalConst/colors';
import GameButton from '../components/GameButton';

const gameOverScreen = (props) => {
    return (
        <ScrollView>
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
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 15
    },
    imageContainer: {
        height: Dimensions.get('window').width * 0.7,
        width: Dimensions.get('window').width * 0.7,
        marginVertical: Dimensions.get('window').height / 20,
        borderRadius: Dimensions.get('window').width * 0.7 / 2,
        overflow: 'hidden'

    },
    image: {
        height: '100%',
        width: '100%'
    },
    outputContainer: {
        marginHorizontal: 30,
        marginVertical: Dimensions.get('window').height / 50
    },
    highlight: {
        color: Colors.primary,
        fontFamily: 'open-sans-bold'
    },
    outputText: {
        textAlign: 'center',
        fontSize: Dimensions.get('window').height < 600 ? 12 : 20
    }
});

export default gameOverScreen;