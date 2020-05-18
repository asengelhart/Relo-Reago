import React from 'react';
import {render} from 'react-dom';
import { Provider } from 'react-redux';
import {Button, Icon} from 'react-materialize';
import { createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import './index.css';
import App from './App';
import RootReducer from './reducers/root';
// import * as serviceWorker from './serviceWorker';

const store = createStore(RootReducer, applyMiddleware(thunk));
const changeCol = (event) => {
  if(event.currentTarget.classList.contains("grey")) {
    event.currentTarget.classList.replace("grey", "teal")
  } else {
    event.currentTarget.classList.replace("teal", "grey")
  }
  debugger
}

render(
  // <Provider store={store}>
  //   <App />
  // </Provider>,
  <Button className="teal" onClick={changeCol} bleegablarg="Jimmy"><Icon>thumb_up</Icon></Button>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
