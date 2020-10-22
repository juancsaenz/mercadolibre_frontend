/**
 * @author Camilo Sáenz
 * @file index.jsx
 * @description Client router manager
 */

 // Dependencies
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { renderRoutes } from 'react-router-config';
import Loadable from 'react-loadable';

// Commons
import routes from "../common/routes";
import configureStore from "../common/store/configureStore";

const store = configureStore();

Loadable.preloadReady().then(() => {
  ReactDOM.hydrate(
    <Provider store={store}>
      <BrowserRouter>
        { renderRoutes(routes) }
      </BrowserRouter>
    </Provider>,
    document.querySelector("#root")
  )
});