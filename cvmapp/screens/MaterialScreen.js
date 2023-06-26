import {View, Text, ScrollView, Pressable, FlatList} from 'react-native';
import React, {useState, useEffect} from 'react';
import Foundation from 'react-native-vector-icons/Foundation';
import axios from 'axios';
import {useAuthContext} from '../src/Context/AuthContext';
import {useRoute} from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import ResultComponent from '../components/ResultComponent';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
const MaterialScreen = () => {
  const [result, setResult] = useState(null);
  const {tokens} = useAuthContext();
  const route = useRoute();
  const semester = route?.params?.semester;
  useEffect(() => {
    getAnnouncements();
  }, []);
  const getAnnouncements = async () => {
    const response = await axios.get(
      `http://elbforcvmu-2038773933.ap-south-1.elb.amazonaws.com/api/v1/student/notifications?type=Material`,
      {
        headers: {Authorization: `Bearer ${tokens}`},
      },
    );
    setResult(response.data.data);
    console.log('result:', response.data);
  };
  return (
    <ScrollView
      style={{
        // padding: 13,
        backgroundColor: 'white',
      }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: '#1A82C4',
          paddingVertical: 10,
          paddingHorizontal: 18,
        }}>
        <FontAwesome name="book" size={25} color={'white'} />
        <Text
          style={{
            fontFamily: 'Poppins-Medium',
            fontSize: 17,
            color: 'white',
            marginTop: 7,
            marginLeft: 9,
          }}>
          Material
        </Text>
      </View>
      <FlatList
        data={result}
        style={{marginBottom: 10, marginTop: 0, paddingHorizontal: 13}}
        showsVerticalScrollIndicator={false}
        renderItem={({item}) => <ResultComponent data={item} />}
        keyExtractor={item => item._id}
      />
      <Pressable>{/* <Text>{result?.data}</Text> */}</Pressable>
    </ScrollView>
  );
};

export default MaterialScreen;
