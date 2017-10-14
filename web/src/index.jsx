import React from 'react';
import ReactDOM from 'react-dom';
import configureStore from './store/configureStore';
import { AppContainer } from 'react-hot-loader';
import Root from './containers/Root'

const store = configureStore();

ReactDOM.render(
    <AppContainer>
        <Root store = {store} />
    </AppContainer>,
    document.getElementById('root')
);

if (module.hot) {
    module.hot.accept('./containers/Root', () => {
        const MyRoot = require('./containers/Root');
        render(
            <AppContainer>
                <MyRoot store = {store} />
            </AppContainer>,
            document.getElementById('root')
        );
    });
}
