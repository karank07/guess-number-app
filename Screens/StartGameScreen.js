import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, TouchableWithoutFeedback, Keyboard, Alert } from 'react-native';

import CardView from '../components/CardView';
import Colors from '../globalConst/colors';
import InputField from '../components/inputField';
import NumberContainer from '../components/NumberContainer';

const startGameScreen = props => {
    const [fieldValue, setFieldValue] = useState('');
    const [number, setNumber] = useState('');
    const [gameMode, setGameMode] = useState(false);

    const inputHandler = (input) => {
        setFieldValue(input.replace(/[^0-9]/g, ''));
    };

    const resetHandler = () => {
        setFieldValue('');
        setGameMode(false);
    };
    const confirmInputHandler = () => {
        const selectedNumber = parseInt(fieldValue);
        if (isNaN(selectedNumber) || selectedNumber <= 0 || selectedNumber > 99) {
            Alert.alert('Invalid Number!',
                'Number should be between 1 to 99.',
                [{ text: 'confirm', style: 'destructive', onPress: resetHandler }])
            return;
        }
        setFieldValue('');
        setGameMode(true);
        setNumber(selectedNumber);
        Keyboard.dismiss();
    };
    let selectedNumberOutput;
    if (gameMode) {
        selectedNumberOutput =
            (<CardView style={styles.summaryContainer}>
                <Text>Selected Number:</Text>
                <NumberContainer>{number}</NumberContainer>
                <Button title="Start" onPress={props.startGame.bind(this, number)} />
            </CardView>);
    }
    return (
        <TouchableWithoutFeedback onPress={() => {
            Keyboard.dismiss();
        }}>
            <View style={styles.screen}>
                <Text style={styles.title}>Start Game Screen</Text>
                <CardView style={styles.input}>
                    <Text>Select a number</Text>
                    <InputField
                        style={styles.inputField}
                        blurOnSubmit
                        autoCorrect={false}
                        keyboardType="number-pad"
                        maxLength={2}
                        value={fieldValue}
                        onChangeText={inputHandler}
                    />
                    <View style={styles.buttonLayout}>
                        <View style={styles.button}><Button title="Reset" onPress={resetHandler} color={Colors.accent} /></View>
                        <View style={styles.button}><Button title="Confirm" onPress={confirmInputHandler} color={Colors.primary} /></View>
                    </View>
                </CardView>
                {selectedNumberOutput}
            </View>
        </TouchableWithoutFeedback>

    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: "center",
    },
    input: {
        width: 300,
        maxWidth: '80%',
        alignItems: "center",
    },

    title: {
        fontSize: 20,
        marginVertical: 10
    },
    buttonLayout: {
        flexDirection: "row",
        width: '100%',
        paddingHorizontal: 20,
        justifyContent: "space-between"
    },
    button: {
        width: 100
    },
    inputField: {
        width: 50,
        textAlign: "center"
    },
    summaryContainer: {
        marginTop: 20,
        alignItems: "center"
    }
});

export default startGameScreen;