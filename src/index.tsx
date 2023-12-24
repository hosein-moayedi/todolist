import React from 'react';
import { Provider } from 'react-redux';
import App from './app';
import { store } from './redux/store';

/**
 * Providing by redux provider
 */
const Root = () => {
    return (
        <Provider store={store}>
            <App />
        </Provider>
    );
};

export default Root;
