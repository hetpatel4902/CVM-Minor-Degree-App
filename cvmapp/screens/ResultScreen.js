import {View, Text, ScrollView, Image} from 'react-native';
import React, {useState, useEffect} from 'react';
import Foundation from 'react-native-vector-icons/Foundation';
import axios from 'axios';
import {useAuthContext} from '../src/Context/AuthContext';
const ResultScreen = () => {
  const [result, setResult] = useState(null);
  const {tokens} = useAuthContext();
  useEffect(() => {
    getAnnouncements();
  }, []);
  const getAnnouncements = async () => {
    const response = await axios.get(
      `http://elbforcvmu-2038773933.ap-south-1.elb.amazonaws.com/api/v1/student/details`,
      {
        headers: {Authorization: `Bearer ${tokens}`},
      },
    );
    setResult(response.data.data?.subject);
    console.log(response.data.data?.subject);
  };
  return (
    <ScrollView
      style={{
        // padding: 13,
        backgroundColor: 'white',
      }}>
      {result && (
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: 18,
            paddingVertical: 12,
            backgroundColor: '#1A82C4',
          }}>
          <Foundation name="clipboard-notes" size={24} color={'white'} />
          <Text
            style={{
              fontFamily: 'Poppins-Medium',
              fontSize: 17,
              color: 'white',
              marginTop: 7,
              marginLeft: 9,
            }}>
            Choice Filling Result:
          </Text>
        </View>
      )}
      {result && (
        <Text
          style={{
            fontFamily: 'Poppins-Medium',
            fontSize: 18,
            color: '#191919',
            textAlign: 'center',
            marginTop: 40,
          }}>
          Congratulations 🎉
        </Text>
      )}
      {result && (
        <Text
          style={{
            fontFamily: 'Poppins-Medium',
            fontSize: 16,
            color: '#505050',
            textAlign: 'center',
            marginTop: 10,
          }}>
          Your alloted Subject is:
        </Text>
      )}
      {result && (
        <Text
          style={{
            fontFamily: 'Poppins-Medium',
            fontSize: 19,
            color: '#191919',
            textAlign: 'center',
            marginTop: 10,
          }}>
          {result}
        </Text>
      )}
      {!result && (
        <View style={{alignItems: 'center'}}>
          <Image
            source={require('./../data/resultnotfound.jpg')}
            style={{height: 350, width: 350, marginTop: 50}}
          />
          <Text
            style={{
              fontFamily: 'Poppins-Medium',
              fontSize: 18,
              color: '#191919',
            }}>
            Result Not Published Yet!
          </Text>
        </View>
      )}
    </ScrollView>
  );
};

export default ResultScreen;
