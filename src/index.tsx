import React, { useLayoutEffect, useState } from 'react';
import { Provider } from 'react-redux';
import App from './app';
import { store } from './redux/store';
import { Localization } from './localization';
import { View } from 'react-native';
import debug from './utils/debug';

/**
 * Providing by redux provider
 */
const Root = () => {
    const [languageIsReady, setLanguageIsReady] = useState(false);

    useLayoutEffect(() => {
        (async () => {
            try {
                await Localization.initialize();
                setLanguageIsReady(true);
            } catch (error) {
                debug.error('Error initializing app language:', error);
            }
        })();
    }, []);

    return (
        <>
            {languageIsReady && (
                <Provider store={store}>
                    <App />
                </Provider>
            )}
        </>
    );
};


export default Root;
