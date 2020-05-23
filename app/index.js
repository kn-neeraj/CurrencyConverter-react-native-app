import React from 'react';
import EStyleSheet from 'react-native-extended-stylesheet';

import Home from './screens/Home';
import { View } from 'react-native';

EStyleSheet.build({
    $textColor: '#0275d8',
    $primaryBlue: '#4F6D7A',
    $border: '#E2E2E2',
    $white: '#FFFFFF',
    $inputText: '#797979',
    $lightGray: '#F0F0F0'
});

function App() {
    return <Home />
}

export default App;