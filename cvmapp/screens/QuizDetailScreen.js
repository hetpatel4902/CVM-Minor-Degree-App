import {View, Text} from 'react-native';
import React from 'react';
import {useRoute} from '@react-navigation/native';

const QuizDetailScreen = () => {
  const route = useRoute();
  const questions = route?.params.questions;
  console.log(questions);
  return (
    <View>
      <Text>QuizDetailScreen</Text>
    </View>
  );
};

export default QuizDetailScreen;
