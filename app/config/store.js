import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';

import reducers from '../reducers';

const middleware = [];
if (process.env.NODE_ENV === 'development') {
    console.log("yes dev mode on..")
    middleware.push(logger);
}
else {
    console.log("dev mode not on");
}

export default createStore(reducers, applyMiddleware(...middleware));