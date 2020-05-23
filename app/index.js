import React from 'react';
import EStyleSheet from 'react-native-extended-stylesheet';
import { Provider } from 'react-redux';

import { View } from 'react-native';
import Navigator from './config/routes';
import store from "./config/store";

EStyleSheet.build({
    $textColor: '#0275d8',
    $primaryBlue: '#4F6D7A',
    $border: '#E2E2E2',
    $white: '#FFFFFF',
    $inputText: '#797979',
    $lightGray: '#F0F0F0',
    $darkText: '#343434',
});

export default () => (
    <Provider store={store}>
        <Navigator onNavigationStateChange={null} />
    </Provider>
);
