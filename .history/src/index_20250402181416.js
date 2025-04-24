import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import ReactDom from "react-dom";
import { Provider } from "react-redux";
import store from "./store";
import wishliststore from './wishListStore';
import reportWebVitals from './reportWebVitals';
import "./components/translations/i18n";


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store} wishliststore>
  <App />
</Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
