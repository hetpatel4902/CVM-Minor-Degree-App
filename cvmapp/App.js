import 'react-native-gesture-handler';
import '@azure/core-asynciterator-polyfill';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {View, Text} from 'react-native';
import React, {useEffect} from 'react';
import AuthContextProvider from './src/Context/AuthContext';
import Router from './Router/index';
import SplashScreen from 'react-native-splash-screen';

const App = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);
  return (
    <NavigationContainer>
      <GestureHandlerRootView style={{flex: 1}}>
        <AuthContextProvider>
          <Router />
          {/* <Text>JAY SHREE KRISHNA</Text> */}
        </AuthContextProvider>
      </GestureHandlerRootView>
    </NavigationContainer>
  );
};

export default App;
