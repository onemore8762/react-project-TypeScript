import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {store} from "./redux/redux-store";
import {RootStateType} from "./redux/store";
import {Provider} from './StoreContext';
import {BrowserRouter} from "react-router-dom";


export const rerenderEntireTrie = (state: RootStateType) => {

    ReactDOM.render(
        <BrowserRouter>
            <Provider store={store}><App/></Provider>
        </BrowserRouter>
        ,
        document.getElementById('root')
    );
}

rerenderEntireTrie(store.getState())

store.subscribe(() => rerenderEntireTrie(store.getState()))