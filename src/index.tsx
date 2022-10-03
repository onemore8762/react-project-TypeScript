import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {store} from "./redux/redux-store";
import {RootStateType} from "./redux/store";


export const rerenderEntireTrie = (state: RootStateType) => {

    ReactDOM.render(
        <App appState={state} dispatch={store.dispatch.bind(store)} store={store}/>,
        document.getElementById('root')
    );
}

rerenderEntireTrie(store.getState())

store.subscribe(() => rerenderEntireTrie(store.getState()))