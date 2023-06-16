import {View, Text, Pressable, Alert} from 'react-native';
import React, {useState, useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import Feather from 'react-native-vector-icons/Feather';
import AsyncStorage from '@react-native-async-storage/async-storage';

const QuizResultComponent = ({data}) => {
  //   console.log('o:', data);
  const navigation = useNavigation();
  //   const StoreData = async quizID => {
  //     try {
  //       const jsonValue = JSON.stringify(data?.questions);
  //       await AsyncStorage.setItem(quizID, jsonValue);
  //       //  setActive(false);
  //       console.log('from async:', data?.questions);
  //     } catch (e) {
  //       // saving error
  //     }
  //   };
  //   const getData = async () => {
  //     let jsonValue = await AsyncStorage.getItem(data?.questions[0]?._id);
  //     console.log('check:', jsonValue);
  //   };
  //   useEffect(() => {
  //     getData();
  //   }, []);
  const onPress = async () => {
    // await StoreData(data?.questions[0]?._id);
    // navigation.navigate('QuizDetailScreen', {
    //   quizID: data.quiz?._id,
    // });
    Alert.alert('Will develop this feature in next iteration😉');
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
          {data.quiz?.name}
        </Text>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text
            style={{
              fontFamily: 'Poppins-Regular',
              color: '#303030',
              fontSize: 13,
            }}>
            {data?.quiz?.totalMarks} Marks
          </Text>
          <Text
            style={{
              fontFamily: 'Poppins-Regular',
              color: '#505050',
              fontSize: 13,
            }}>
            {' '}
            {/* {'\u2022'} {data?.quiz?.questions.length} questions */}
          </Text>
        </View>

        <Text
          style={{
            fontFamily: 'Poppins-Regular',
            color: '#505050',
            fontSize: 13,
          }}>
          Duration: {data?.quiz?.duration} mins
        </Text>
      </View>
      <View style={{flex: 2, alignItems: 'center'}}>
        <Text
          style={{
            fontFamily: 'Poppins-Medium',
            fontSize: 18,
            color: '#191919',
          }}>
          {data?.marksObtained}
        </Text>
        <Text style={{fontFamily: 'Poppins-Regular'}}>Marks</Text>
      </View>
      <View style={{flex: 1, alignItems: 'center'}}>
        <Feather name="chevron-right" color={'#353535'} size={35} />
      </View>
    </Pressable>
  );
};

export default QuizResultComponent;
