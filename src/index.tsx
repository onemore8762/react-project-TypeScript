import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

const dialogs = [
    {id: 1, name: 'Dimych'},
    {id: 2, name: 'Andrey'},
    {id: 3, name: 'Sveta'},
    {id: 4, name: 'Sasha'},
    {id: 5, name: 'Viktor'},
    {id: 6, name: 'Denis'},
    {id: 7, name: 'Valera'},
]

const message = [
    {id: 1, message: 'Hi'},
    {id: 2, message: 'Yo'},
    {id: 3, message: 'How is your it-kamasutra?'},
    {id: 4, message: 'uoy'},
    {id: 5, message: 'Yo'},
    {id: 6, message: 'Hello'},
    {id: 7, message: 'KIss'},
]

const posts = [
    {id: 1, message: 'Hi, how are you?', likesCount: 12},
    {id: 2, message: 'Yo', likesCount: 2},
    {id: 2, message: 'What you doing?', likesCount: 15},

]

ReactDOM.render(
    <App dialogs={dialogs} message={message} posts={posts}/>,
  document.getElementById('root')
);