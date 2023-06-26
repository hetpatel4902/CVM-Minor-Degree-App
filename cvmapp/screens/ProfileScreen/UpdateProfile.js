import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Alert,
  Image,
  useWindowDimensions,
  TextInput,
  Pressable,
  ToastAndroid,
} from 'react-native';
import {useNavigation} from '@react-navigation/core';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import AppLoader from '../../components/AppLoader';
import {useAuthContext} from '../../src/Context/AuthContext';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {PRIMARY_COLOR1} from '@env';

const UpdateProfile = () => {
  const {height, width} = useWindowDimensions();
  const {users, tokens} = useAuthContext();
  //   const {control, handleSubmit, watch} = useForm();
  //   const pwd = watch('password');
  const navigation = useNavigation();
  const [loadingPending, setLoadingPending] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneno, setPhoneno] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    getUserData();
  }, []);
  const getUserData = async data => {
    {
      try {
        setLoadingPending(true);
        const response = await axios.get(
          `http://elbforcvmu-2038773933.ap-south-1.elb.amazonaws.com/api/v1/student/details`,
          {
            headers: {
              Authorization: `Bearer ${tokens}`,
            },
          },
        );
        // console.log(response.data.data);
        setName(response.data.data.name);
        setEmail(response.data.data.email);
        setPhoneno(response.data.data.phoneno);
        setLoadingPending(false);
      } catch (err) {
        setLoadingPending(false);
        Alert.alert(err);
      }
    }
  };
  const onUpdatePressed = async data => {
    {
      if (name && email) {
        try {
          setLoadingPending(true);
          const response = await axios.patch(
            `http://elbforcvmu-2038773933.ap-south-1.elb.amazonaws.com/api/v1/student/details`,
            {
              name: name,
              email: email,
              phoneno: phoneno,
            },
            {
              headers: {
                Authorization: `Bearer ${tokens}`,
              },
            },
          );
          // console.log(response.data);
          const obj = {
            token: tokens,
            userID: users,
            name: name,
          };
          const jsonValue = JSON.stringify(obj);
          await AsyncStorage.setItem('userDetail', jsonValue);
          navigation.navigate('HomeScreen');
          await showToastWithGravityAndOffset();
          setLoadingPending(false);
        } catch (err) {
          setLoadingPending(false);
          Alert.alert(err);
        }
      } else {
        Alert.alert("Name/Email field can't be empty.");
      }
    }
  };
  const showToastWithGravityAndOffset = async () => {
    ToastAndroid.showWithGravityAndOffset(
      'Profile updated successfully!',
      ToastAndroid.LONG,
      ToastAndroid.BOTTOM,
      25,
      50,
    );
  };
  return (
    <>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{backgroundColor: 'white', flex: 1}}>
        <View style={styles.root}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: PRIMARY_COLOR1,
              paddingVertical: 10,
              paddingHorizontal: 18,
              //   justifyContent: 'center',
            }}>
            <FontAwesome5
              name="user-edit"
              size={16}
              color={'white'}
              style={{marginRight: 3}}
            />
            <Text
              style={{
                marginLeft: 3,
                color: 'white',
                fontFamily: 'Poppins-Medium',
                fontSize: 15,
                marginTop: 5,
                marginLeft: 8,
              }}>
              Update Your Profile
            </Text>
          </View>

          <View style={{padding: 10, marginHorizontal: 10}}>
            <Text
              style={{
                color: 'black',
                fontSize: 13,
                fontFamily: 'Poppins-Regular',
                marginTop: 15,
              }}>
              Name:
            </Text>
            <TextInput
              onChangeText={setName}
              value={name}
              style={{
                height: 42,
                borderWidth: 0.5,
                borderColor: '#d1cfcf',
                marginTop: 5,
                borderRadius: 8,
                paddingHorizontal: 10,
                fontSize: 13,
                fontFamily: 'Poppins-Regular',
                color: 'black',
                marginBottom: 10,
              }}
            />
            <Text
              style={{
                color: 'black',
                fontSize: 13,
                fontFamily: 'Poppins-Regular',
              }}>
              Email:
            </Text>
            <TextInput
              onChangeText={setEmail}
              value={email}
              style={{
                height: 42,
                borderWidth: 0.5,
                borderColor: '#d1cfcf',
                marginTop: 5,
                borderRadius: 8,
                paddingHorizontal: 10,
                fontSize: 13,
                fontFamily: 'Poppins-Regular',
                color: 'black',
                marginBottom: 10,
              }}
            />
            <Text
              style={{
                color: 'black',
                fontSize: 13,
                fontFamily: 'Poppins-Regular',
              }}>
              Phone Number:
            </Text>
            <TextInput
              onChangeText={setPhoneno}
              keyboardType="phone-pad"
              value={phoneno}
              style={{
                height: 42,
                borderWidth: 0.5,
                borderColor: '#d1cfcf',
                marginTop: 5,
                borderRadius: 8,
                paddingHorizontal: 10,
                fontSize: 13,
                fontFamily: 'Poppins-Regular',
                color: 'black',
                marginBottom: 10,
              }}
            />
          </View>
          <Pressable
            onPress={onUpdatePressed}
            style={{
              alignContent: 'center',
              alignSelf: 'center',
              marginTop: 14,
              backgroundColor: PRIMARY_COLOR1,
              paddingVertical: 8,
              borderRadius: 12,
              width: width - 40,
            }}>
            <Text
              style={{
                color: 'white',
                fontFamily: 'Poppins-Medium',
                fontSize: 15,
                textAlign: 'center',
              }}>
              Update
            </Text>
          </Pressable>
        </View>
      </ScrollView>
      {loadingPending ? <AppLoader /> : null}
    </>
  );
};

const styles = StyleSheet.create({
  root: {
    // padding: 10,
  },
  title: {
    fontSize: 18,
    color: 'black',
    fontFamily: 'Poppins-Medium',
    textAlign: 'center',
    marginBottom: 10,
  },
  text: {
    color: 'gray',
    marginTop: 10,
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
  },
  link: {
    color: '#FDB075',
  },
  logo: {
    width: 260,
    maxWidth: 260,
    maxHeight: 260,
    alignSelf: 'center',
  },
});

export default UpdateProfile;
