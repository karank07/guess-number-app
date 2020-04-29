import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import Header from './components/Header';
import StartGameScreen from './Screens/StartGameScreen';
import GameScreen from './Screens/GameScreen';
import GameOverScreen from './Screens/GameOverScreen';

export default function App() {
  const [selectedNumber, setSelectedNumber] = useState();
  const [guessCounter, setGuessCounter] = useState(0);

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
