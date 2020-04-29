import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

const gameOverScreen = (props) => {
    return (
        <View style={styles.screen}>
            <Text>The Game is Over!</Text>
            <Text>It took {props.guessCount} guesses!</Text>
            <Text>Number was: {props.userSelectedNumber}</Text>
            <Button title="New Game" onPress={props.onReset}/>
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    }
});

export default gameOverScreen;