import { takeEvery, select, call, put } from 'redux-saga/effects';

// 1. when the base experience is changed
// 2. initially get conversion information

import { CHANGE_BASE_CURRENCY, GET_INITIAL_CONVERSION, CONVERSION_RESULT, CONVERSION_ERROR } from '../actions/currencies'

const URL_BASE = "https://api.frankfurter.app/"
const URL_BASE_LATEST = "latest"

export const getLatestRate = currency => {
    let url = URL_BASE + URL_BASE_LATEST + "?" + "base=" + String(currency);
    return fetch(url);
}
function* fetchLatestConversionRates(action) {
    try {
        let currency = action.currency;
        if (currency === undefined) {
            currency = yield select(state => state.currencies.baseCurrency);
        }
        const response = yield call(getLatestRate, currency);
        const result = yield response.json()
        if (result.error) {
            yield put({ type: CONVERSION_ERROR, error: result.error });
        } else {
            yield put({ type: CONVERSION_RESULT, result })
        }
    } catch (e) {
        console.log('Saga error', e);
        yield put({ type: CONVERSION_ERROR, error: e.message });
    }

}

//generator
export default function* rootSaga() {
    yield takeEvery(GET_INITIAL_CONVERSION, fetchLatestConversionRates);
    yield takeEvery(CHANGE_BASE_CURRENCY, fetchLatestConversionRates);
}