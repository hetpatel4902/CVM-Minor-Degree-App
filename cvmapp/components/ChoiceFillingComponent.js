import {View, Text, Pressable} from 'react-native';
import React, {useState} from 'react';
import {useAuthContext} from '../src/Context/AuthContext';
import LinearGradient from 'react-native-linear-gradient';

const ChoiceFillingComponent = ({data, selectedOption, onOptionSelect}) => {
  const isSelected = data?.name === selectedOption;
  const handlePress = () => {
    onOptionSelect(data?.name);
  };
  return (
    <Pressable
      onPress={handlePress}
      style={{
        marginVertical: 10,
        borderRadius: 13,
        marginHorizontal: 10,
      }}>
      <LinearGradient
        colors={isSelected ? ['#87cefa', '#22a0f0'] : ['white', 'white']}
        style={{
          paddingHorizontal: 12,
          paddingVertical: 12,
          borderRadius: 13,
          shadowColor: '#000000',
          shadowOffset: {
            width: 0,
            height: 3,
          },
          shadowOpacity: 0.18,
          shadowRadius: 4.59,
          elevation: 5,
        }}>
        <Text
          style={{
            color: isSelected ? 'white' : 'black',
            fontFamily: 'Poppins-Medium',
          }}>
          {data?.name}
        </Text>
        <Text
          style={{
            marginTop: 3,
            color: isSelected ? 'white' : 'black',
            fontFamily: 'Poppins-Regular',
          }}>
          Offered by: {data?.department} department
        </Text>
        <Text
          style={{
            marginTop: 3,
            color: isSelected ? 'white' : 'black',
            fontFamily: 'Poppins-Regular',
          }}>
          Seats: {data?.seats}
        </Text>
      </LinearGradient>
    </Pressable>
  );
};

export default ChoiceFillingComponent;

// colors={['#87cefa', '#22a0f0']}
