import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/logOnlyInProduction';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import './index.css';
import App from './app/App';
import registerServiceWorker from './registerServiceWorker';
import reducer from './reducers';

const middleware = [thunk];

const composeEnhancers = composeWithDevTools({
  // options like actionSanitizer, stateSanitizer
});

const store = createStore(reducer, /* preloadedState, */
  composeEnhancers(applyMiddleware(...middleware)));
  // other store enhancers if any

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'));

registerServiceWorker();
