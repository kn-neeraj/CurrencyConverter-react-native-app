import React, { Component } from 'react';
import { View } from 'react-native';
import { StatusBar } from 'react-native';

import { Container } from '../components/Container';
import { Logo } from '../components/Logo';
import { InputWithButton } from '../components/TextInput';

const TEMP_BASE_CURRENCY = 'USD';
const TEMP_QUOTE_CURRENCY = 'GBP';
const TEMP_BASE_PRICE = '100';
const TEMP_QUOTE_PRICE = '81.72';

class Home extends Component {
    state = {
        quote_currency_price: TEMP_QUOTE_PRICE
    }
    handleConversion = (base_currency) => {
        //Assuming US to GBP 
        const quote_currency = 0.8172 * Number(base_currency);
        return String(quote_currency);
    }
    handlePressBaseCurrency = () => {
        console.log('pressed base');
    }
    handlePressQuoteCurrency = () => {
        console.log('pressed quote');
    }
    handleTextChange = (text) => {
        console.log('changed text : ', text)
        this.setState({ quote_currency_price: this.handleConversion(text) })
    }

    render() {
        return (
            <Container>
                <StatusBar translucent={false} barStyle="light-content" />
                <Logo />
                <InputWithButton
                    buttonText={TEMP_BASE_CURRENCY}
                    onPress={this.handlePressBaseCurrency}
                    defaultValue={TEMP_BASE_PRICE}
                    keyboardType='numeric'
                    onChangeText={this.handleTextChange}
                />
                <InputWithButton
                    buttonText={TEMP_QUOTE_CURRENCY}
                    onPress={this.handlePressQuoteCurrency}
                    editable={false}
                    //defaultValue={TEMP_QUOTE_PRICE}
                    value={this.state.quote_currency_price}
                />
            </Container>
        );
    }
}

export default Home;
