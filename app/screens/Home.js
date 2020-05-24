import React, { Component } from 'react';
import { View } from 'react-native';
import { StatusBar } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from "react-redux";

import { Container } from '../components/Container';
import { Logo } from '../components/Logo';
import { InputWithButton } from '../components/TextInput';

import { changeCurrencyAmount } from '../actions/currencies';

//const TEMP_BASE_CURRENCY = 'USD';
//const TEMP_QUOTE_CURRENCY = 'GBP';
//const TEMP_BASE_PRICE = '100';
//const TEMP_QUOTE_PRICE = '81.72';

class Home extends Component {
    static propTypes = {
        navigation: PropTypes.object,
        dispatch: PropTypes.func,
        baseCurrency: PropTypes.string,
        quoteCurrency: PropTypes.string,
        amount: PropTypes.number,
        conversionRate: PropTypes.number,
        isFetching: PropTypes.bool,
    };
    handleConversion = (base_currency) => {
        //Assuming US to GBP 
        const quote_currency = 0.8172 * Number(base_currency);
        return String(quote_currency);
    }
    handlePressBaseCurrency = () => {
        this.props.navigation.navigate('CurrencyList', { title: 'Base Currency', type: 'base' });
        console.log('pressed base');
    }
    handlePressQuoteCurrency = () => {
        this.props.navigation.navigate('CurrencyList', { title: 'Quote Currency', type: 'quote' });
        console.log('pressed quote');
    }
    handleTextChange = (amount) => {
        const { dispatch } = this.props;
        dispatch(changeCurrencyAmount(amount));
        //this.setState({ quote_currency_price: this.handleConversion(amount) })
    }

    render() {
        let quotePrice = (this.props.amount * this.props.conversionRate).toFixed(2);
        if (this.props.isFetching) {
            quotePrice = '...';
        }
        return (
            <Container>
                <StatusBar translucent={false} barStyle="light-content" />
                <Logo />
                <InputWithButton
                    buttonText={this.props.baseCurrency}
                    onPress={this.handlePressBaseCurrency}
                    defaultValue={this.props.amount.toString()}
                    keyboardType='numeric'
                    onChangeText={this.handleTextChange}
                />
                <InputWithButton
                    buttonText={this.props.quoteCurrency}
                    onPress={this.handlePressQuoteCurrency}
                    editable={false}
                    value={quotePrice}
                />
            </Container>
        );
    }
}

const mapStateToProps = (state) => {
    const baseCurrency = state.currencies.baseCurrency;
    const quoteCurrency = state.currencies.quoteCurrency;
    const conversionSelector = state.currencies.conversions[baseCurrency] || {};
    const rates = conversionSelector.rates || {};

    return {
        baseCurrency,
        quoteCurrency,
        amount: state.currencies.amount,
        conversionRate: rates[quoteCurrency] || 0,
        isFetching: conversionSelector.isFetching,
    };
}
export default connect(mapStateToProps)(Home);
