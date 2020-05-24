import React, { Component } from 'react';
import { FlatList, View, StatusBar } from 'react-native';
import { ListItem, Separator } from '../components/List'
import currencies from '../data/currencies'
import PropTypes from 'prop-types';
import { changeBaseCurrency, changeQuoteCurrency } from '../actions/currencies';
import { connect } from 'react-redux';

const TEMP_CURRENT_CURRENCY = 'CAD';

class CurrencyList extends Component {
    static propTypes = {
        navigation: PropTypes.object,
        dispatch: PropTypes.func,
        baseCurrency: PropTypes.string,
        quoteCurrency: PropTypes.string,
    }
    handlePress = (currency) => {
        console.log("row press");
        const { type } = this.props.navigation.state.params;
        if (type === 'base') {
            //TODO: Dispatch change base
            this.props.dispatch(changeBaseCurrency(currency))
        } else if (type === 'quote') {
            this.props.dispatch(changeQuoteCurrency(currency))
        }
        this.props.navigation.goBack(null);
    };

    render() {
        const { baseCurrency, quoteCurrency, navigation } = this.props;
        let comparisonCurrency = baseCurrency;
        if (navigation.state.params.type === 'quote') {
            comparisonCurrency = quoteCurrency;
        }
        return (
            <View style={{ flex: 1 }}>
                <StatusBar barStyle='default' translucent={false}></StatusBar>
                <FlatList
                    data={currencies}
                    renderItem={({ item }) =>
                        <ListItem
                            text={item}
                            selected={item === comparisonCurrency}
                            onPress={() => this.handlePress(item)}
                        />
                    }
                    keyExtractor={(item) => item}
                    ItemSeparatorComponent={Separator}
                />
            </View>
        );
    }

};

const mapStateToProps = (state) => {
    return {
        baseCurrency: state.currencies.baseCurrency,
        quoteCurrency: state.currencies.quoteCurrency,
    }
}
export default connect(mapStateToProps)(CurrencyList);