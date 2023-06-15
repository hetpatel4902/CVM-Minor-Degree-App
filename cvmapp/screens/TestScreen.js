import {View, Text, AppState, Platform} from 'react-native';
import React, {useEffect, useState} from 'react';
import SystemSetting from 'react-native-system-setting';
import NetInfo from '@react-native-community/netinfo';
const TestScreen = () => {
  const appState = useRef(AppState.currentState);
  const [appStateVisible, setAppStateVisible] = useState(appState.current);
  const [maxTabMistake, setMaxTabMistake] = useState(3);
  let trying = 2;
  useEffect(() => {
    const trial = () => {
      if (Platform.OS === 'android') {
        AppState.addEventListener('blur', () => {
          console.log('no please');
        });
      }
    };
    trial();
    // return () => {
    //   trial.remove();
    // };
  }, []);
  useEffect(() => {
    // const blurEventListener = AppState.addEventListener('blur', () => {
    //   console.log('blur');
    // });
    // const focusEventListener = AppState.addEventListener('focus', () => {
    //   console.log('focus event trigger');
    // });
    const subscription = AppState.addEventListener(
      'change',
      async nextAppState => {
        if (
          appState.current.match(/inactive|background/) &&
          nextAppState === 'active'
        ) {
          console.log('App has come to the foreground!');
        }

        appState.current = nextAppState;
        setAppStateVisible(appState.current);
        if (appState.current == 'background') {
          trying = trying - 1;
          setMaxTabMistake(maxTab => maxTab - 1);
          console.log(trying);
          if (trying <= 0) {
            console.log('you are disqualified');
          }
          console.log('inactive');
        } else if (appState.current === 'active') {
          console.log('active');
        }
      },
    );
    return () => {
      subscription.remove();
      // clearInterval(timerIntervalId.nt);
    };
  }, []);

  // const checkAirplaneMode = () => {
  //   // if (state.isConnected || state.isInternetReachable) {
  //   NetInfo.fetch().then(state => {
  //     console.log(state);
  //     if (state.isConnected || state.isInternetReachable) {
  //       Alert.alert(
  //         'Airplane Mode',
  //         'Please turn on Airplane Mode to use the app.',
  //         [
  //           {
  //             text: 'OK',
  //             onPress: checkAirplaneMode, // Call recursively to show the alert continuously
  //           },
  //         ],
  //         {cancelable: false},
  //       );
  //     }
  //   });
  //   // }
  // };

  // useEffect(() => {
  //   const handleAppStateChange = nextAppState => {
  //     NetInfo.fetch().then(state => {
  //       console.log(state);
  //       if (state.isConnected || state.isInternetReachable) {
  //         checkAirplaneMode();
  //         setAirplaneMode(false);
  //       }
  //     });
  //     // }
  //   };

  //   const unsubscribe = NetInfo.addEventListener(handleAppStateChange);

  //   return () => {
  //     unsubscribe();
  //   };
  // }, []);

  return (
    <View>
      <Text>TestScreen</Text>
    </View>
  );
};

export default TestScreen;
