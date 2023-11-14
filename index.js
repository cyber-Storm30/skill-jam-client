import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import React, {useEffect} from 'react';
import {Provider} from 'react-redux';
import {persistor, store} from './src/redux/store';
import {PersistGate} from 'redux-persist/integration/react';

const RNRedux = () => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  );
};

AppRegistry.registerComponent(appName, () => RNRedux);
