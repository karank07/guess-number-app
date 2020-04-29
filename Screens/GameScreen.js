import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, View, Text, Button, Alert, FlatList, TouchableWithoutFeedback } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

import DefaultStyle from '../globalConst/DefaultStyle';
import NumberContainer from '../components/NumberContainer';
import CardView from '../components/CardView';
import GameButton from '../components/GameButton';

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

const renderlist = (listLength, itemData) => {

    return (
        <View style={styles.listItem}>
            <Text style={DefaultStyle.bodyText}>#{listLength - itemData.index}</Text>
            <Text style={DefaultStyle.bodyText}>{itemData.item}</Text>
        </View>
    );
}

const gameScreen = props => {
    const firstGuess = genRandNumber(0, 100, props.userSelectedNumber);
    const [currentGuess, setCurrentGuess] = useState(firstGuess);
    const currentHigh = useRef(100);
    const currentLow = useRef(1);
    const [pastGuess, setPastGuess] = useState([firstGuess.toString()]);
    const { userSelectedNumber, onOver } = props;

    useEffect(() => {
        if (currentGuess === userSelectedNumber) {
            onOver(pastGuess.length);
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
            currentLow.current = currentGuess + 1;
        }
        const nextNum = genRandNumber(currentLow.current, currentHigh.current, currentGuess);
        setCurrentGuess(nextNum);
        //setCurrCount(currCount => currCount + 1);
        setPastGuess(pastGuess => [nextNum.toString(), ...pastGuess]);
    };
    return (
        <View style={styles.screen}>
            <Text style={DefaultStyle.bodyText}>Number Gussed:</Text>
            <NumberContainer>{currentGuess}</NumberContainer>
            <CardView style={styles.buttonLayout}>
                <GameButton onPress={nextGuesshandler.bind(this, 'lower')} >
                    <FontAwesome name='minus' size={20} color='white' />
                </GameButton>
                <GameButton onPress={nextGuesshandler.bind(this, 'greater')} >
                    <FontAwesome name='plus' size={20} color='white' />
                </GameButton>
            </CardView>
            <View style={styles.listContainer}>
                <FlatList contentContainerStyle={styles.list}
                    keyExtractor={item => item}
                    data={pastGuess}
                    renderItem={renderlist.bind(this, pastGuess.length)} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 20,
        alignItems: "center"
    },
    buttonLayout: {
        flexDirection: "row",
        justifyContent: "space-around",
        marginTop: 10,
        width: 400,
        maxWidth: '90%'
    },
    listContainer: {
        flex: 1,
        width: '80%'
        
    },
    list: {
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        
    },
    listItem: {
        width: 150,
        flexDirection: 'row',
        borderColor: '#ccc',
        borderWidth: 1,
        padding: 10,
        marginVertical: 10,
        backgroundColor: 'white',
        justifyContent: 'space-between'
    }
});

export default gameScreen;