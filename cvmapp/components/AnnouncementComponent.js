import {View, Text} from 'react-native';
import React from 'react';

const AnnouncementComponent = ({data}) => {
  return (
    <View style={{flexDirection: 'row', alignItems: 'center'}}>
      <Text
        style={{
          color: 'white',
          fontFamily: 'Poppins-Regular',
          //   marginHorizontal: 15,
          fontSize: 19,
        }}>
        {'\u2022'}
      </Text>
      <Text
        style={{
          color: 'white',
          fontFamily: 'Poppins-Regular',
          fontSize: 13,
          marginLeft: 5,
        }}>
        {data.name}
      </Text>
    </View>
  );
};

export default AnnouncementComponent;
