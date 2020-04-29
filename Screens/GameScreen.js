import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, View, Text, Button, Alert } from 'react-native';

import NumberContainer from '../components/NumberContainer';
import CardView from '../components/CardView';

const genRandNumber = (min, max, ex) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    const rndNum = Math.floor(Math.random() * (max - min)) + min;
    if (rndNum === ex) {
        return genRandNumber(min, max, ex);
    }
    else {
        return rndNum;
    }
};

const gameScreen = props => {
    const [currentGuess, setCurrentGuess] = useState(genRandNumber(0, 100, props.userSelectedNumber));
    const currentHigh = useRef(100);
    const currentLow = useRef(1);
    const [currCount, setCurrCount] = useState(0);
    const { userSelectedNumber, onOver } = props;

    useEffect(() => {
        if (currentGuess === userSelectedNumber) {
            console.log('currCount' + currCount);
            onOver(currCount);
        }
    }, [currentGuess, userSelectedNumber, onOver]);

    const nextGuesshandler = direction => {
        if ((direction === 'lower' && currentGuess < props.userSelectedNumber)
            || (direction === 'greater' && currentGuess > props.userSelectedNumber)) {
            Alert.alert('Wrong Input!',
                'Misdirection Identified.',
                [{ text: 'Conifrm', style: 'cancel' }]);
            return;
        }
        if (direction === 'lower') {
            currentHigh.current = currentGuess;
        }
        else {
            currentLow.current = currentGuess;
        }
        const nextNum = genRandNumber(currentLow.current, currentHigh.current, currentGuess);
        setCurrentGuess(nextNum);
        setCurrCount(currCount => currCount + 1);
    };
    return (
        <View style={styles.screen}>
            <Text>Number Gussed:</Text>
            <NumberContainer>{currentGuess}</NumberContainer>
            <CardView style={styles.buttonLayout}>
                <Button title="Lower" onPress={nextGuesshandler.bind(this, 'lower')} />
                <Button title="Greater" onPress={nextGuesshandler.bind(this, 'greater')} />
            </CardView>
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: "center"
    },
    buttonLayout: {
        flexDirection: "row",
        justifyContent: "space-around",
        marginTop: 20,
        width: 300,
        maxWidth: '80%'
    }
});

export default gameScreen;