import {View, Text, Pressable} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import Feather from 'react-native-vector-icons/Feather';

const QuizComponent = ({data}) => {
  const navigation = useNavigation();
  const onPress = () => {
    navigation.navigate('QuizDetailScreen', {questions: data?.questions});
  };
  return (
    <Pressable
      onPress={onPress}
      style={{
        marginVertical: 15,
        marginHorizontal: 10,
        borderRadius: 11,
        padding: 15,
        backgroundColor: 'white',
        shadowColor: '#000000',
        shadowOffset: {
          width: 0,
          height: 3,
        },
        shadowOpacity: 0.18,
        shadowRadius: 4.59,
        elevation: 4,
        flexDirection: 'row',
        alignItems: 'center',
      }}>
      <View style={{flex: 7}}>
        <Text
          style={{
            fontFamily: 'Poppins-Medium',
            color: '#191919',
            fontSize: 15,
          }}>
          {data?.name}
        </Text>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text
            style={{
              fontFamily: 'Poppins-Regular',
              color: '#303030',
              fontSize: 13,
            }}>
            {data?.totalMarks} marks
          </Text>
          <Text
            style={{
              fontFamily: 'Poppins-Regular',
              color: '#505050',
              fontSize: 13,
            }}>
            {' '}
            {'\u2022'} {data?.questions.length} questions
          </Text>
        </View>

        <Text
          style={{
            fontFamily: 'Poppins-Regular',
            color: '#505050',
            fontSize: 13,
          }}>
          Duration: {data?.duration} mins
        </Text>
      </View>
      <View style={{flex: 1, alignItems: 'center'}}>
        <Feather name="chevron-right" color={'#353535'} size={35} />
      </View>
    </Pressable>
  );
};

export default QuizComponent;
