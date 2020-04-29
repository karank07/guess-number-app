import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { AppLoading } from 'expo';
import * as Font from 'expo-font';

import Header from './components/Header';
import StartGameScreen from './Screens/StartGameScreen';
import GameScreen from './Screens/GameScreen';
import GameOverScreen from './Screens/GameOverScreen';

const fetchFonts = () => {
  return Font.loadAsync({
    'open-sans': require('./assets/Fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/Fonts/OpenSans-Bold.ttf')
  });
};

export default function App() {
  const [selectedNumber, setSelectedNumber] = useState();
  const [guessCounter, setGuessCounter] = useState(0);
  const [dataLoaded, setDataLoaded] = useState(false);

  if (!dataLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setDataLoaded(true)} />
    )
  }
  const configNewGame = () => {
    setGuessCounter(0);
    setSelectedNumber(null);
  };

  const startGameHandler = userInput => {
    setSelectedNumber(userInput);

  };

  const gameOverHandler = count => {
    setGuessCounter(count);
  }

  let gameOutput = <StartGameScreen startGame={startGameHandler} />;
  if (selectedNumber && guessCounter === 0) {
    gameOutput = <GameScreen
      userSelectedNumber={selectedNumber}
      onOver={gameOverHandler} />;
  } else if (guessCounter > 0) {
    gameOutput = <GameOverScreen
      guessCount={guessCounter}
      userSelectedNumber={selectedNumber}
      onReset={configNewGame} />
  }

  return (
    <View style={styles.container}>
      <Header title='Guess The Number' />
      {gameOutput}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

  }
});
