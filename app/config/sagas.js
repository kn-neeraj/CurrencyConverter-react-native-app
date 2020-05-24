import { takeEvery } from 'redux-saga/effects';

// 1. when the base experience is changed
// 2. initially get conversion information

import { CHANGE_BASE_CURRENCY, GET_INITIAL_CONVERSION } from '../actions/currencies'

function* fetchLatestConversionRates(action) {
    console.log("TODO: Update the things", action);
    yield;
}

//generator
export default function* rootSaga() {
    yield takeEvery(GET_INITIAL_CONVERSION, fetchLatestConversionRates);
    yield takeEvery(CHANGE_BASE_CURRENCY, fetchLatestConversionRates);
}