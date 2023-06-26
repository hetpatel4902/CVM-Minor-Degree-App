import {View, Text, Pressable, Alert} from 'react-native';
import React, {useState, useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import Feather from 'react-native-vector-icons/Feather';
import AsyncStorage from '@react-native-async-storage/async-storage';

const QuizComponent = ({data}) => {
  const navigation = useNavigation();
  const StoreData = async quizID => {
    try {
      const jsonValue = JSON.stringify(data?.questions);
      await AsyncStorage.setItem(quizID, jsonValue);
      //  setActive(false);
      console.log('from async:', data?.questions);
    } catch (e) {
      // saving error
    }
  };
  const getData = async () => {
    let jsonValue = await AsyncStorage.getItem(data?.questions[0]?._id);
    console.log('check:', jsonValue);
  };
  useEffect(() => {
    getData();
  }, []);
  const onPress = async () => {
    await StoreData(data?.questions[0]?._id);
    Alert.alert(
      'Quiz Rules!',
      `You can't click the back/home/tab button or you can't drag notifications, if you did for so,more than 2 times than quiz will be auto submitted.`,
      [
        {
          text: 'Cancel',
          onPress: () => null,
          style: 'cancel',
        },
        {
          text: 'YES',
          onPress: () => {
            navigation.navigate('QuizDetailScreen', {
              quizID: data?.questions[0]?._id,
            });
          },
        },
      ],
    );
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
            {data?.totalMarks} Marks
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
