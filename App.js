import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import Header from './components/Header';
import StartGameScreen from './Screens/StartGameScreen';
import GameScreen from './Screens/GameScreen';

export default function App() {
  const [selectedNumber, setSelectedNumber] = useState();
  
  const startGameHandler = userInput => {
    setSelectedNumber(userInput);
  };
  
  let startGameOutput = <StartGameScreen startGame={startGameHandler}/>;
  if (selectedNumber) {
    startGameOutput = <GameScreen userSelectedNumber={selectedNumber}/>;
  }
  
  return (
    <View style={styles.container}>
      <Header title='Guess The Number' />
      {startGameOutput}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

  }
});
