import {
  View,
  Text,
  FlatList,
  Pressable,
  ScrollView,
  useWindowDimensions,
  ToastAndroid,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {useNavigation, useRoute, StackActions} from '@react-navigation/native';
import {useAuthContext} from '../src/Context/AuthContext';
import axios from 'axios';
import ChoiceFillingComponent from '../components/ChoiceFillingComponent';
import Foundation from 'react-native-vector-icons/Foundation';
import ChoiceFillingComponent2 from '../components/ChoiceFillingComponent2';
import ChoiceFillingComponent3 from '../components/ChoiceFillingComponent3';
import LinearGradient from 'react-native-linear-gradient';
// import {useNavigation} from '@react-navigation/native';
const ChoiceFilling = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const {width} = useWindowDimensions();
  const [subjects, setSubjects] = useState([]);
  const {
    users,
    setLoginPending,
    loginPending,
    name,
    setTokens,
    setUsers,
    tokens,
    setUser,
  } = useAuthContext();
  useEffect(() => {
    getSubjects();
  }, []);
  const showToastWithGravityAndOffset = async () => {
    ToastAndroid.showWithGravityAndOffset(
      'Choice Filled Successfully!',
      ToastAndroid.LONG,
      ToastAndroid.BOTTOM,
      25,
      50,
    );
  };
  const getSubjects = async () => {
    // console.log(tokens);
    const response = await axios.get(
      `http://elbforcvmu-2038773933.ap-south-1.elb.amazonaws.com/api/v1/student/subject`,
      {
        headers: {Authorization: `Bearer ${tokens}`},
      },
    );
    setSubjects(response.data.data);
    // console.log(response.data.data);
  };
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedOption2, setSelectedOption2] = useState(null);
  const [selectedOption3, setSelectedOption3] = useState(null);
  const handleOptionSelect = optionId => {
    setSelectedOption(optionId);
    // console.log(selectedOption);
  };
  const handleOptionSelect2 = optionId => {
    setSelectedOption2(optionId);
    // console.log(selectedOption);
  };
  const handleOptionSelect3 = optionId => {
    setSelectedOption3(optionId);
    // console.log(selectedOption);
  };

  const check = () => {
    console.log(selectedOption);
    console.log(selectedOption2);
    console.log(selectedOption3);
  };

  const onSubmit = async () => {
    console.log([selectedOption, selectedOption2, selectedOption3]);
    const response = await axios.post(
      `http://elbforcvmu-2038773933.ap-south-1.elb.amazonaws.com/api/v1/student/choicefilling`,
      {choices: [selectedOption, selectedOption2, selectedOption3]},
      {
        headers: {Authorization: `Bearer ${tokens}`},
      },
    );
    if (response.data.res == 'success') {
      await showToastWithGravityAndOffset();
      navigation.dispatch(StackActions.replace('HomeScreen'));
      // navigation.navigate('HomeScreen', {subject: 'Choice Filling Result'});
    }
    console.log(response.data.res);
  };

  return (
    <ScrollView
      style={{padding: 13, backgroundColor: 'white'}}
      showsVerticalScrollIndicator={false}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Foundation name="clipboard-pencil" size={24} color={'black'} />
        <Text
          style={{
            fontFamily: 'Poppins-Medium',
            fontSize: 17,
            color: '#191919',
            marginTop: 7,
            marginLeft: 6,
          }}>
          Fill Choices:
        </Text>
      </View>
      <Text
        style={{
          fontFamily: 'Poppins-Regular',
          fontSize: 15,
          color: '#191919',
          marginTop: 7,
          //   marginLeft: 6,
        }}>
        Select 1st Choice
      </Text>
      <FlatList
        data={subjects}
        style={{marginBottom: 10, marginTop: 0}}
        showsVerticalScrollIndicator={false}
        renderItem={({item}) => (
          <ChoiceFillingComponent
            data={item}
            selectedOption={selectedOption}
            onOptionSelect={handleOptionSelect}
          />
        )}
        keyExtractor={item => item._id}
      />
      <Text
        style={{
          fontFamily: 'Poppins-Regular',
          fontSize: 15,
          color: '#191919',
          marginTop: 7,
          //   marginLeft: 6,
        }}>
        Select 2nd Choice
      </Text>
      <FlatList
        data={subjects}
        style={{marginBottom: 10, marginTop: 0}}
        showsVerticalScrollIndicator={false}
        renderItem={({item}) => (
          <ChoiceFillingComponent2
            data={item}
            selectedOption={selectedOption2}
            onOptionSelect={handleOptionSelect2}
          />
        )}
        keyExtractor={item => item._id}
      />
      <Text
        style={{
          fontFamily: 'Poppins-Regular',
          fontSize: 15,
          color: '#191919',
          marginTop: 7,
          //   marginLeft: 6,
        }}>
        Select 3rd Choice
      </Text>
      <FlatList
        data={subjects}
        style={{marginTop: 0, marginBottom: 70}}
        showsVerticalScrollIndicator={false}
        renderItem={({item}) => (
          <ChoiceFillingComponent3
            data={item}
            selectedOption={selectedOption3}
            onOptionSelect={handleOptionSelect3}
          />
        )}
        keyExtractor={item => item._id}
      />
      <Pressable onPress={onSubmit}>
        <LinearGradient
          colors={['#f7c577', '#FB9D0A']}
          style={{
            // flex: 1,
            alignContent: 'center',
            alignSelf: 'center',
            marginTop: 40,
            // backgroundColor: PRIMARY_COLOR2,
            paddingVertical: 9,
            borderRadius: 13,
            width: width - 48,
            marginBottom: 70,
          }}>
          <Text
            style={{
              color: 'white',
              alignSelf: 'center',
              fontFamily: 'Poppins-SemiBold',
              fontSize: 15,
              // marginVertical: 1,
              marginRight: 5,
            }}>
            Submit
          </Text>
        </LinearGradient>
      </Pressable>
    </ScrollView>
  );
};

export default ChoiceFilling;
