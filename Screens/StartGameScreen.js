import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, TouchableWithoutFeedback, Keyboard, Alert, ScrollView, KeyboardAvoidingView, Dimensions } from 'react-native';

import DefaultStyle from '../globalConst/DefaultStyle';
import CardView from '../components/CardView';
import Colors from '../globalConst/colors';
import InputField from '../components/inputField';
import NumberContainer from '../components/NumberContainer';
import GameButton from '../components/GameButton';

const startGameScreen = props => {
    const [buttonWidth, setButtonWidth] = useState(Dimensions.get('window').width / 4);
    const [fieldValue, setFieldValue] = useState('');
    const [number, setNumber] = useState('');
    const [gameMode, setGameMode] = useState(false);



    useEffect(() => {
        const updateSize = () => {
            setButtonWidth(setButtonWidth(Dimensions.get('window').width / 4));
        };

        Dimensions.addEventListener('change', updateSize);
        return () => {
            Dimensions.removeEventListener('change', updateSize);
        };
    });
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
                <Text style={DefaultStyle.bodyText}>Selected Number:</Text>
                <NumberContainer>{number}</NumberContainer>
                <GameButton onPress={props.startGame.bind(this, number)}>Start</GameButton>
            </CardView>);
    }
    return (
        <ScrollView>
            <KeyboardAvoidingView behavior="position" keyboardVerticalOffset={30}>
                <TouchableWithoutFeedback onPress={() => {
                    Keyboard.dismiss();
                }}>
                    <View style={styles.screen}>
                        <Text style={{ ...DefaultStyle.titleText, ...styles.title }}>Start Game Screen</Text>
                        <CardView style={styles.input}>
                            <Text style={DefaultStyle.bodyText}>Select a number (1-99)</Text>
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
                                <View style={{ width: buttonWidth }}><Button title="Reset" onPress={resetHandler} color={Colors.accent} /></View>
                                <View style={{ width: buttonWidth }}><Button title="Confirm" onPress={confirmInputHandler} color={Colors.primary} /></View>
                            </View>
                        </CardView>
                        {selectedNumberOutput}
                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </ScrollView>

    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: "center",
    },
    input: {
        width: '80%',
        maxWidth: '95%',
        minWidth: 300,
        alignItems: "center",
    },

    title: {
        marginVertical: 10,
    },
    buttonLayout: {
        flexDirection: "row",
        width: '100%',
        paddingHorizontal: 20,
        justifyContent: "space-between"
    },
    // button: {
    //     //width: 100
    //     width: '40%'
    // },
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