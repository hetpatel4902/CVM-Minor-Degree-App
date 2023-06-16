import {View, Text, Pressable, Linking} from 'react-native';
import React from 'react';

const ResultComponent = ({data}) => {
  const onClick = () => {
    Linking.openURL(data?.link);
  };
  return (
    <View style={{marginVertical: 14}}>
      <Text style={{fontFamily: 'Poppins-Regular', color: '#191919'}}>
        {data?.name}
      </Text>
      <Pressable onPress={onClick}>
        <Text
          style={{fontFamily: 'Poppins-Regular', fontSize: 13, color: 'blue'}}>
          {data?.link}
        </Text>
      </Pressable>
    </View>
  );
};

export default ResultComponent;
