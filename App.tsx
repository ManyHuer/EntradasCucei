/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {
  useColorScheme,
} from 'react-native';

import INICIO from "./Navegacion";

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <INICIO/>
  );
}

export default App;