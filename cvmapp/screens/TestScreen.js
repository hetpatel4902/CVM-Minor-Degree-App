import {
  View,
  Text,
  AppState,
  Platform,
  ScrollView,
  FlatList,
} from 'react-native';
import React, {useEffect, useState, useRef} from 'react';
import SystemSetting from 'react-native-system-setting';
import NetInfo from '@react-native-community/netinfo';
import axios from 'axios';
import {useAuthContext} from '../src/Context/AuthContext';
import QuizComponent from '../components/QuizComponent';
import Foundation from 'react-native-vector-icons/Foundation';
import {PRIMARY_COLOR1} from '@env';
import QuizResultComponent from '../components/QuizResultComponent';
const TestScreen = () => {
  const {tokens} = useAuthContext();
  const appState = useRef(AppState.currentState);
  const [appStateVisible, setAppStateVisible] = useState(appState.current);
  const [maxTabMistake, setMaxTabMistake] = useState(3);
  const [quiz, setQuiz] = useState([]);
  const [quizResult, setQuizResult] = useState([]);
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

  useEffect(() => {
    getQuiz();
    getQuizResult();
  }, []);
  const getQuiz = async () => {
    const response = await axios.get(
      `http://elbforcvmu-2038773933.ap-south-1.elb.amazonaws.com/api/v1/student/quiz`,
      {
        headers: {Authorization: `Bearer ${tokens}`},
      },
    );
    setQuiz(response.data.data);
    // console.log(response.data.data);
  };
  const getQuizResult = async () => {
    const response = await axios.get(
      `http://elbforcvmu-2038773933.ap-south-1.elb.amazonaws.com/api/v1/student/quiz/attended`,
      {
        headers: {Authorization: `Bearer ${tokens}`},
      },
    );
    setQuizResult(response.data.data);
    console.log('setQuizResult', response.data.data);
  };

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
    <ScrollView
      style={{backgroundColor: 'white'}}
      showsVerticalScrollIndicator={false}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: '#1A82C4',
          paddingVertical: 12,
          paddingHorizontal: 18,
        }}>
        <Foundation
          name="clipboard-pencil"
          color={'white'}
          size={25}
          style={{marginTop: 0}}
        />
        <Text
          style={{
            fontFamily: 'Poppins-Medium',
            fontSize: 17,
            color: 'white',
            marginTop: 7,
            marginLeft: 10,
          }}>
          Quiz
        </Text>
      </View>
      <FlatList
        data={quiz}
        style={{marginBottom: 10, marginTop: 0, padding: 13}}
        showsVerticalScrollIndicator={false}
        renderItem={({item}) => <QuizComponent data={item} />}
        keyExtractor={item => item._id}
      />
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginHorizontal: 19,
        }}>
        <Foundation
          name="clipboard-notes"
          color={'#191919'}
          size={25}
          style={{marginTop: 0}}
        />
        <Text
          style={{
            fontFamily: 'Poppins-Medium',
            fontSize: 17,
            color: '#191919',
            marginTop: 7,
            marginLeft: 10,
          }}>
          Quiz Results
        </Text>
      </View>
      <View style={{}}>
        <FlatList
          data={quizResult}
          style={{marginBottom: 70, marginTop: 0, padding: 13}}
          showsVerticalScrollIndicator={false}
          renderItem={({item}) => <QuizResultComponent data={item} />}
          keyExtractor={item => item._id}
        />
      </View>
    </ScrollView>
  );
};

export default TestScreen;
