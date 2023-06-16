import {
  View,
  Text,
  Pressable,
  Image,
  useWindowDimensions,
  ScrollView,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {useRoute, useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Foundation from 'react-native-vector-icons/Foundation';
import LinearGradient from 'react-native-linear-gradient';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import axios from 'axios';
import {useAuthContext} from '../src/Context/AuthContext';

const QuizFinalResult = () => {
  const route = useRoute();
  const {width} = useWindowDimensions();
  const {tokens} = useAuthContext();
  // const quizID = ;
  const quizID = route?.params?.quizID;
  const navigation = useNavigation();
  // const route = useRoute();
  const [questions, setQuestions] = useState([]);
  const [questionIndex, setQuestionIndex] = useState(1);
  const question = questions[questionIndex - 1];
  // const quizID = route.params?.quizID;
  const [optionsa, setOptionsa] = useState(false);
  const [optionsb, setOptionsb] = useState(false);
  const [optionsc, setOptionsc] = useState(false);
  const [optionsd, setOptionsd] = useState(false);
  const [answer, setAnswer] = useState(null);
  const [p, setP] = useState(0);
  const [points, setPoints] = useState(0);
  // console.log(quizID);
  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    const jsonValue = await AsyncStorage.getItem(quizID);
    setQuestions(JSON.parse(jsonValue));
  };
  // console.log(questions);
  const abutton = () => {
    if (optionsa === false) {
      setOptionsa(true);
    } else {
      setOptionsa(false);
    }
    setOptionsb(false);
    setOptionsc(false);
    setOptionsd(false);
  };
  const bbutton = () => {
    setOptionsa(false);
    if (optionsb === false) {
      setOptionsb(true);
    } else {
      setOptionsb(false);
    }
    setOptionsc(false);
    setOptionsd(false);
  };
  const cbutton = () => {
    setOptionsa(false);
    setOptionsb(false);
    if (optionsc === false) {
      setOptionsc(true);
    } else {
      setOptionsc(false);
    }
    setOptionsd(false);
  };
  const dbutton = () => {
    setOptionsa(false);
    setOptionsb(false);
    setOptionsc(false);
    if (optionsd === false) {
      setOptionsd(true);
    } else {
      setOptionsd(false);
    }
  };
  const [final, setFinal] = useState(null);
  const selectedAnswer = async () => {
    const jsonValue = await AsyncStorage.getItem(quizID);
    let data = JSON.parse(jsonValue);
    let datas = data[questionIndex - 1];
    // console.log('datas', datas);
    if (optionsa === true) {
      datas.studentChoice = '0';
      // if (datas.correctOption === 'a') {
      //   setPoints(points + 1);
      // }
      const jsonValuesa = JSON.stringify(data);
      await AsyncStorage.setItem(quizID, jsonValuesa);
      const a = await AsyncStorage.getItem(quizID);
      setFinal(JSON.parse(a));
    } else if (optionsb === true) {
      datas.studentChoice = '1';
      // if (datas.correctOption === 'b') {
      //   setPoints(points + 1);
      // }
      const jsonValuesb = JSON.stringify(data);
      await AsyncStorage.setItem(quizID, jsonValuesb);
      const a = await AsyncStorage.getItem(quizID);
      setFinal(JSON.parse(a));
    } else if (optionsc === true) {
      datas.studentChoice = '2';
      // if (datas.correctOption === 'c') {
      //   setPoints(points + 1);
      // }
      const jsonValuesc = JSON.stringify(data);
      await AsyncStorage.setItem(quizID, jsonValuesc);
      const a = await AsyncStorage.getItem(quizID);
      setFinal(JSON.parse(a));
    } else if (optionsd === true) {
      datas.studentChoice = '3';
      // if (datas.correctOption === 'd') {
      //   setPoints(points + 1);
      // }
      const jsonValuesd = JSON.stringify(data);
      await AsyncStorage.setItem(quizID, jsonValuesd);
      const a = await AsyncStorage.getItem(quizID);
      setFinal(JSON.parse(a));
    } else {
      setAnswer(null);
    }
  };

  const pressNext = async () => {
    // if (questionIndex !== questions.length) {
    // }
    if (questionIndex === questions.length) {
      // await getAnswers();
      setTimeout(async () => await submitQuiz(), 1000);
      navigation.navigate('TestScreen', {
        quizID: quizID,
      });
    }
    selectedAnswer();
    setUpcomingAnswer();
    setQuestionIndex(questionIndex + 1);
  };

  const submitQuiz = async () => {
    const data = await AsyncStorage.getItem(quizID);
    console.log('ans:', data);
    const response = await axios.post(
      `http://elbforcvmu-2038773933.ap-south-1.elb.amazonaws.com/api/v1/student/quiz/submit`,
      {questions: data},
      {
        headers: {Authorization: `Bearer ${tokens}`},
      },
    );
    // setQuiz(response.data.data);
    console.log(response.data);
  };

  const setUpcomingAnswer = async () => {
    const jsonValue = await AsyncStorage.getItem(quizID);
    const json = JSON.parse(jsonValue);
    const j = json[questionIndex];
    if (j.studentChoice === '0') {
      setOptionsa(true);
      setOptionsb(false);
      setOptionsc(false);
      setOptionsd(false);
    } else if (j.studentChoice === '1') {
      setOptionsa(false);
      setOptionsb(true);
      setOptionsc(false);
      setOptionsd(false);
    } else if (j.studentChoice === '2') {
      setOptionsa(false);
      setOptionsb(false);
      setOptionsc(true);
      setOptionsd(false);
    } else if (j.studentChoice === '3') {
      setOptionsa(false);
      setOptionsb(false);
      setOptionsc(false);
      setOptionsd(true);
    } else {
      // console.log(j);
      setOptionsa(false);
      setOptionsb(false);
      setOptionsc(false);
      setOptionsd(false);
    }
  };
  const setPreviousAns = async () => {
    const jsonValue = await AsyncStorage.getItem(quizID);
    const json = JSON.parse(jsonValue);
    const j = json[questionIndex - 2];
    if (j.studentChoice === '0') {
      setOptionsa(true);
      setOptionsb(false);
      setOptionsc(false);
      setOptionsd(false);
    } else if (j.studentChoice === '1') {
      setOptionsa(false);
      setOptionsb(true);
      setOptionsc(false);
      setOptionsd(false);
    } else if (j.studentChoice === '2') {
      setOptionsa(false);
      setOptionsb(false);
      setOptionsc(true);
      setOptionsd(false);
    } else if (j.studentChoice === '3') {
      setOptionsa(false);
      setOptionsb(false);
      setOptionsc(false);
      setOptionsd(true);
    } else {
      // console.log(j);
      // console.log(j.studentChoice);
      // console.log('error');
    }
  };

  const previous = async () => {
    selectedAnswer();
    setQuestionIndex(questionIndex - 1);
    if (questionIndex !== 1) {
      setPreviousAns();
    }
  };
  return (
    <ScrollView style={{backgroundColor: 'white'}}>
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
      <View style={{marginHorizontal: 13}}>
        <Text
          style={{
            fontFamily: 'Poppins-Medium',
            fontSize: 17,
            color: '#252525',
            marginTop: 7,
            // marginHorizontal: 13,
            // marginLeft: 10,
          }}>
          Question No: {questionIndex}
        </Text>
        {question?.imgUrl && (
          <Image
            source={{uri: question?.imgUrl}}
            style={{
              height: 200,
              width: width - 40,
              alignSelf: 'center',
              marginTop: 20,
            }}
            resizeMode="contain"
          />
        )}
        <Text
          style={{
            fontFamily: 'Poppins-Medium',
            color: '#303030',
            fontSize: 16,
            marginTop: 20,
          }}>
          {question?.question}
        </Text>
        <Pressable
          onPress={abutton}
          style={{
            backgroundColor: optionsa ? '#fcc977' : 'white',
            shadowColor: '#000000',
            shadowOffset: {
              width: 0,
              height: 3,
            },
            shadowOpacity: 0.18,
            shadowRadius: 4.59,
            elevation: 2,
            paddingVertical: 13,
            paddingHorizontal: 20,
            borderRadius: 10,
            marginHorizontal: 10,
            marginVertical: 10,

            // backgroundColor:
          }}>
          <Text
            style={{
              color: '#000000',
              fontFamily: optionsa ? 'Poppins-Medium' : 'Poppins-Regular',
            }}>
            A. {question?.options[0].option}
          </Text>
        </Pressable>
        <Pressable
          onPress={bbutton}
          style={{
            backgroundColor: optionsb ? '#fcc977' : 'white',
            shadowColor: '#000000',
            shadowOffset: {
              width: 0,
              height: 3,
            },
            shadowOpacity: 0.18,
            shadowRadius: 4.59,
            elevation: 2,
            paddingVertical: 13,
            paddingHorizontal: 20,
            borderRadius: 10,
            marginHorizontal: 10,
            marginVertical: 10,
            // backgroundColor:
          }}>
          <Text
            style={{
              color: '#000000',
              fontFamily: optionsb ? 'Poppins-Medium' : 'Poppins-Regular',
            }}>
            B. {question?.options[1].option}
          </Text>
        </Pressable>
        <Pressable
          onPress={cbutton}
          style={{
            backgroundColor: optionsc ? '#fcc977' : 'white',
            shadowColor: '#000000',
            shadowOffset: {
              width: 0,
              height: 3,
            },
            shadowOpacity: 0.18,
            shadowRadius: 4.59,
            elevation: 2,
            paddingVertical: 13,
            paddingHorizontal: 20,
            borderRadius: 10,
            marginHorizontal: 10,
            marginVertical: 10,
            // backgroundColor:
          }}>
          <Text
            style={{
              color: '#000000',
              fontFamily: optionsc ? 'Poppins-Medium' : 'Poppins-Regular',
            }}>
            C. {question?.options[2].option}
          </Text>
        </Pressable>
        <Pressable
          onPress={dbutton}
          style={{
            backgroundColor: optionsd ? '#fcc977' : 'white',
            shadowColor: '#000000',
            shadowOffset: {
              width: 0,
              height: 3,
            },
            shadowOpacity: 0.18,
            shadowRadius: 4.59,
            elevation: 2,
            paddingVertical: 13,
            paddingHorizontal: 20,
            borderRadius: 10,
            marginHorizontal: 10,
            marginVertical: 10,
            // backgroundColor:
          }}>
          <Text
            style={{
              color: '#000000',
              fontFamily: optionsd ? 'Poppins-Medium' : 'Poppins-Regular',
            }}>
            D. {question?.options[3].option}
          </Text>
        </Pressable>
        {/* <Text>{points}</Text> */}
        {/* <Text>{answer}</Text> */}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginTop: 5,
          }}>
          {/* <Pressable
            disabled={questionIndex === 1 ? true : false}
            onPress={previous}
            style={{marginLeft: 30}}>
            <Text>Previous</Text>
          </Pressable> */}
          {/* <Pressable onPress={pressNext} style={{marginTop: 0}}>
            <Text style={{marginRight: 30}}>Next</Text>
          </Pressable> */}
          <Pressable
            onPress={previous}
            disabled={questionIndex === 1 ? true : false}>
            <LinearGradient
              colors={
                questionIndex === 1
                  ? ['#ededed', '#ededed']
                  : ['#f7c577', '#FB9D0A']
              }
              style={{
                // flex: 1,
                alignContent: 'center',
                alignSelf: 'center',
                marginTop: 20,
                // backgroundColor: PRIMARY_COLOR2,
                paddingVertical: 9,
                borderRadius: 13,
                // paddingHorizontal: 20,
                width: 130,
                // width: width - 48,
                marginBottom: 70,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <MaterialIcons
                name="chevron-left"
                color={questionIndex === 1 ? 'grey' : 'white'}
                size={24}
                style={{alignSelf: 'center'}}
              />
              <Text
                style={{
                  color: questionIndex === 1 ? 'grey' : 'white',
                  alignSelf: 'center',
                  fontFamily: 'Poppins-SemiBold',
                  fontSize: 15,
                  // marginVertical: 1,
                  marginRight: 5,
                }}>
                Previous
              </Text>
            </LinearGradient>
          </Pressable>
          <Pressable onPress={pressNext}>
            <LinearGradient
              colors={
                questions.length === questionIndex
                  ? ['#81f7b0', '#07ed63']
                  : ['#f7c577', '#FB9D0A']
              }
              style={{
                // flex: 1,
                alignContent: 'center',
                alignSelf: 'center',
                marginTop: 20,
                // backgroundColor: PRIMARY_COLOR2,
                paddingVertical: 9,
                borderRadius: 13,
                // paddingHorizontal: 20,
                width: 130,

                // width: width - 48,
                marginBottom: 70,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text
                style={{
                  color: 'white',
                  alignSelf: 'center',
                  fontFamily: 'Poppins-SemiBold',
                  fontSize: 15,
                  textAlign: 'center',
                  // marginVertical: 1,
                  // marginRight: 5,
                }}>
                {questions.length === questionIndex ? 'Submit' : 'Next'}
              </Text>
              <MaterialIcons
                name="chevron-right"
                color={'white'}
                size={24}
                style={{marginBottom: 3}}
              />
            </LinearGradient>
          </Pressable>
        </View>
        {/* <Pressable
        onPress={() => {
          pressNext;
          navigation.navigate('ResultScreen', {points: point});
        }}
        disabled={questionIndex + 1 !== questions.length}>
        <Text style={{opacity: questionIndex + 1 === questions.length ? 1 : 0}}>
          Finish
        </Text>
      </Pressable> */}
        <Pressable onPress={() => navigation.goBack()} style={{marginTop: 100}}>
          <Text>go back</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
};

export default QuizFinalResult;
