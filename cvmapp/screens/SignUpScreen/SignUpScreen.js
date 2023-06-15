import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Alert,
  Image,
  TextInput,
  Pressable,
  Linking,
  Dimensions,
} from 'react-native';
import {useNavigation} from '@react-navigation/core';
import axios from 'axios';
import {AUTH_IP} from '@env';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import RegisterLoader from '../../components/RegisterLoader';

const EMAIL_REGEX =
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

const SignUpScreen = () => {
  const width = Dimensions.get('window').width;
  const navigation = useNavigation();
  const [loadingPending, setLoadingPending] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [hidePass, setHidePass] = useState(true);
  const [password, setPassword] = useState('');
  const [emailWrong, setEmailWrong] = useState(false);
  const [passwordMin, setPasswordMin] = useState(false);
  const [phoneno, setPhoneno] = useState('');
  const [college, setCollege] = useState('');
  // const [dapartment, setDepartment] = useState('');
  const [cpi, setCpi] = useState('');
  const [enrolmentNo, setEnrolmentNo] = useState('');
  const [mbit, setMbit] = useState(false);
  const [adit, setAdit] = useState(false);
  const [gcet, setGcet] = useState(false);
  const [cp, setCp] = useState(false);
  const [csd, setCsd] = useState(false);
  const [it, setIt] = useState(false);
  const [iot, setIot] = useState(false);
  const [ch, setCh] = useState(false);
  const [ee, setEe] = useState(false);
  const [ec, setEc] = useState(false);
  const [cl, setCl] = useState(false);
  const [me, setMe] = useState(false);
  const [mc, setMc] = useState(false);
  const [branch, setBranch] = useState('');
  const onRegisterPressed = async data => {
    setPasswordMin(false);
    setEmailWrong(false);

    if (
      !name ||
      !email ||
      !password ||
      !phoneno ||
      !college ||
      !branch ||
      !enrolmentNo ||
      !cpi
    ) {
      Alert.alert('Enter all required details.');
    } else {
      let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
      if (reg.test(email) === false) {
        setEmailWrong(true);
      } else {
        if (password.length >= 8) {
          try {
            setLoadingPending(true);
            const response = await axios.post(
              `http://elbforcvmu-2038773933.ap-south-1.elb.amazonaws.com/api/v1/student/register`,
              {
                email: email.toLowerCase(),
                name: name,
                password: password,
                phoneno: phoneno,
                college: college,
                department: branch,
                semester: 3,
                cpi: cpi,
                enrolment: enrolmentNo,
              },
            );
            console.log(response.data);
            if (response.data) {
              const response = await axios.post(
                `http://elbforcvmu-2038773933.ap-south-1.elb.amazonaws.com/api/v1/student/otp/mail`,
                {
                  email: email,
                },
                // {
                //   headers: {
                //     Authorization: `Bearer ${token}`,
                //   },
                // },
              );
              navigation.navigate('OtpScreen', {
                email: email,
              });
            }
            // navigation.navigate('OtpScreen', {
            //   token: response.data.token,
            //   userID: response.data.user.id,
            //   name: response.data.user.name,
            // });
            setLoadingPending(false);
          } catch (err) {
            console.log(err);
            setLoadingPending(false);
            Alert.alert('Already registered.');
          }
        } else {
          setPasswordMin(true);
        }
      }
    }
  };

  const onSignInPress = () => {
    navigation.navigate('SignIn');
  };

  return (
    <>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{backgroundColor: 'white'}}>
        <View style={styles.root}>
          <Image
            source={require('../../data/register.jpg')}
            style={[styles.logo]}
            resizeMode="contain"
          />
          <Text
            style={{
              fontSize: 20,
              fontFamily: 'Poppins-SemiBold',
              color: '#353535',
            }}>
            Register
          </Text>
          <View
            style={{flexDirection: 'row', alignItems: 'center', marginTop: 5}}>
            <FontAwesome
              name="user-o"
              size={20}
              color={'#757575'}
              style={{marginRight: 3}}
            />
            <TextInput
              onChangeText={setName}
              placeholderTextColor="grey"
              placeholder="Name"
              value={name}
              style={{
                height: 37,
                marginLeft: 4,
                flex: 1,
                borderBottomWidth: 1,
                borderColor: '#d1cfcf',
                marginVertical: 8,
                borderRadius: 8,
                paddingHorizontal: 10,
                paddingBottom: 9,
                fontSize: 13,
                fontFamily: 'OpenSans-Medium',
                color: '#212121',
              }}
            />
          </View>
          <View
            style={{flexDirection: 'row', alignItems: 'center', marginTop: 5}}>
            <MaterialIcons
              name="alternate-email"
              size={20}
              color={'#757575'}
              style={{marginRight: 3}}
            />
            <TextInput
              onChangeText={setEmail}
              placeholderTextColor="grey"
              placeholder="Email ID"
              value={email}
              style={{
                height: 37,
                marginLeft: 4,
                flex: 1,
                borderBottomWidth: 1,
                borderColor: '#d1cfcf',
                marginVertical: 8,
                borderRadius: 8,
                paddingHorizontal: 10,
                paddingBottom: 9,
                fontSize: 13,
                fontFamily: 'OpenSans-Medium',
                color: '#212121',
              }}
            />
          </View>
          {emailWrong && (
            <Text
              style={{
                color: 'red',
                fontFamily: 'OpenSans-Regular',
                fontSize: 9,
              }}>
              Email is invalid
            </Text>
          )}
          <View
            style={{flexDirection: 'row', alignItems: 'center', marginTop: 5}}>
            <Feather
              name="phone"
              size={20}
              color={'#757575'}
              style={{marginRight: 3}}
            />
            <TextInput
              onChangeText={setPhoneno}
              placeholderTextColor="grey"
              placeholder="Phone No."
              keyboardType="phone-pad"
              value={phoneno}
              style={{
                height: 37,
                marginLeft: 4,
                flex: 1,
                borderBottomWidth: 1,
                borderColor: '#d1cfcf',
                marginVertical: 8,
                borderRadius: 8,
                paddingHorizontal: 10,
                paddingBottom: 9,
                fontSize: 13,
                fontFamily: 'OpenSans-Medium',
                color: '#212121',
              }}
            />
          </View>
          <View
            style={{flexDirection: 'row', alignItems: 'center', marginTop: 5}}>
            <Entypo
              name="info"
              size={20}
              color={'#757575'}
              style={{marginRight: 3}}
            />
            <TextInput
              onChangeText={setEnrolmentNo}
              placeholderTextColor="grey"
              placeholder="Enrolment No."
              keyboardType="phone-pad"
              value={enrolmentNo}
              style={{
                height: 37,
                marginLeft: 4,
                flex: 1,
                borderBottomWidth: 1,
                borderColor: '#d1cfcf',
                marginVertical: 8,
                borderRadius: 8,
                paddingHorizontal: 10,
                paddingBottom: 9,
                fontSize: 13,
                fontFamily: 'OpenSans-Medium',
                color: '#212121',
              }}
            />
          </View>
          <View
            style={{flexDirection: 'row', alignItems: 'center', marginTop: 5}}>
            <AntDesign
              name="solution1"
              size={20}
              color={'#757575'}
              style={{marginRight: 3}}
            />
            <TextInput
              onChangeText={setCpi}
              placeholderTextColor="grey"
              placeholder="Cpi"
              keyboardType="phone-pad"
              value={cpi}
              style={{
                height: 37,
                marginLeft: 4,
                flex: 1,
                borderBottomWidth: 1,
                borderColor: '#d1cfcf',
                marginVertical: 8,
                borderRadius: 8,
                paddingHorizontal: 10,
                paddingBottom: 9,
                fontSize: 13,
                fontFamily: 'OpenSans-Medium',
                color: '#212121',
              }}
            />
          </View>
          <View
            style={{flexDirection: 'row', alignItems: 'center', marginTop: 5}}>
            <Feather
              name="lock"
              size={20}
              color={'#757575'}
              style={{marginRight: 3}}
            />
            <TextInput
              secureTextEntry={hidePass ? true : false}
              onChangeText={setPassword}
              placeholderTextColor="grey"
              placeholder="Create Password"
              value={password}
              style={{
                height: 37,
                marginLeft: 4,
                flex: 1,
                borderBottomWidth: 1,
                borderColor: '#d1cfcf',
                marginTop: 8,
                borderRadius: 8,
                paddingHorizontal: 10,
                paddingBottom: 9,
                fontSize: 13,
                fontFamily: 'OpenSans-Medium',
                color: '#212121',
                // backgroundColor: 'blue',
              }}></TextInput>
            <FontAwesome5
              name={hidePass ? 'eye-slash' : 'eye'}
              size={15}
              color={'black'}
              onPress={() => setHidePass(!hidePass)}
            />
          </View>
          {passwordMin && (
            <Text
              style={{
                color: 'red',
                fontSize: 10,
                fontFamily: 'Fredoka-Regular',
              }}>
              Password should be of minimum 8 characters
            </Text>
          )}
          <View
            style={{flexDirection: 'row', alignItems: 'center', marginTop: 23}}>
            <FontAwesome5
              name="university"
              size={20}
              color={'#757575'}
              style={{marginRight: 3}}
            />
            <Text
              style={{
                paddingHorizontal: 10,
                // paddingBottom: 9,
                fontSize: 13,
                fontFamily: 'OpenSans-Medium',
                color: 'grey',
                marginLeft: 4,
                flex: 1,
              }}>
              Select College:
            </Text>
          </View>
          <View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginHorizontal: 15,
                marginTop: 15,
                marginBottom: 8,
              }}>
              <Pressable
                style={{
                  width: 90,
                  marginHorizontal: 6,
                  backgroundColor: gcet ? '#fae6c8' : '#edeef0',
                  height: 30,
                  alignItems: 'center',
                  borderRadius: 8,
                  justifyContent: 'center',
                  borderWidth: gcet ? 0.5 : 0,
                  borderColor: gcet ? '#FB9D0A' : 'white',
                }}
                onPress={() => {
                  setGcet(true);
                  setAdit(false);
                  setMbit(false);
                  // setMess(false);
                  setCollege('GCET');
                }}>
                <Text
                  style={{
                    color: '#191919',
                    fontFamily: 'Poppins-Regular',
                    fontSize: 12,
                    marginTop: 3,
                  }}>
                  GCET
                </Text>
              </Pressable>
              <Pressable
                onPress={() => {
                  setAdit(true);
                  setGcet(false);
                  setMbit(false);
                  setCollege('ADIT');
                }}
                style={{
                  width: 90,
                  marginHorizontal: 6,
                  backgroundColor: adit ? '#fae6c8' : '#edeef0',
                  height: 30,
                  alignItems: 'center',
                  borderRadius: 8,
                  justifyContent: 'center',
                  borderWidth: adit ? 0.5 : 0,
                  borderColor: adit ? '#FB9D0A' : 'white',
                }}>
                <Text
                  style={{
                    color: '#191919',
                    fontFamily: 'Poppins-Regular',
                    fontSize: 12,
                    marginTop: 3,
                  }}>
                  ADIT
                </Text>
              </Pressable>
              <Pressable
                onPress={() => {
                  setMbit(true);
                  setGcet(false);
                  setAdit(false);
                  setCollege('MBIT');
                }}
                style={{
                  width: 90,
                  marginHorizontal: 6,
                  backgroundColor: mbit ? '#fae6c8' : '#edeef0',
                  height: 30,
                  alignItems: 'center',
                  borderRadius: 8,
                  justifyContent: 'center',
                  borderWidth: mbit ? 0.5 : 0,
                  borderColor: mbit ? '#FB9D0A' : 'white',
                  // marginBottom: 40,
                }}>
                <Text
                  style={{
                    color: '#191919',
                    fontFamily: 'Poppins-Regular',
                    fontSize: 12,
                    marginTop: 3,
                  }}>
                  MBIT
                </Text>
              </Pressable>
            </View>
          </View>
          <View
            style={{flexDirection: 'row', alignItems: 'center', marginTop: 23}}>
            <AntDesign
              name="profile"
              size={20}
              color={'#757575'}
              style={{marginRight: 3}}
            />
            <Text
              style={{
                paddingHorizontal: 10,
                // paddingBottom: 9,
                fontSize: 13,
                fontFamily: 'OpenSans-Medium',
                color: 'grey',
                marginLeft: 4,
                flex: 1,
              }}>
              Select Branch:
            </Text>
          </View>
          <View style={{marginTop: 15}}>
            <Pressable
              onPress={() => {
                setCp(true);
                setCsd(false);
                setIt(false);
                setIot(false);
                setCh(false);
                setCl(false);
                setMc(false);
                setMe(false);
                setEc(false);
                setEe(false);
                setBranch('CP');
              }}
              style={{
                width: 310,
                marginHorizontal: 6,
                backgroundColor: cp ? '#fae6c8' : '#edeef0',
                alignItems: 'center',
                borderRadius: 8,
                justifyContent: 'center',
                borderWidth: cp ? 0.5 : 0,
                borderColor: cp ? '#FB9D0A' : 'white',
              }}>
              <Text
                style={{
                  color: '#191919',
                  fontFamily: 'Poppins-Regular',
                  fontSize: 12,
                  paddingVertical: 9,
                }}>
                Computer Engineering (CP)
              </Text>
            </Pressable>
            <Pressable
              // style={{marginTop: 15}}
              onPress={() => {
                setCp(false);
                setCsd(true);
                setIt(false);
                setIot(false);
                setCh(false);
                setCl(false);
                setMc(false);
                setMe(false);
                setEc(false);
                setEe(false);
                setBranch('CSD');
              }}
              style={{
                width: 310,
                marginHorizontal: 6,
                backgroundColor: csd ? '#fae6c8' : '#edeef0',
                alignItems: 'center',
                borderRadius: 8,
                justifyContent: 'center',
                borderWidth: csd ? 0.5 : 0,
                borderColor: csd ? '#FB9D0A' : 'white',
                marginTop: 13,
              }}>
              <Text
                style={{
                  color: '#191919',
                  fontFamily: 'Poppins-Regular',
                  fontSize: 12,
                  paddingVertical: 9,
                }}>
                Computer Science & Design (CSD)
              </Text>
            </Pressable>
            <Pressable
              onPress={() => {
                setCp(false);
                setCsd(false);
                setIt(true);
                setIot(false);
                setCh(false);
                setCl(false);
                setMc(false);
                setMe(false);
                setEc(false);
                setEe(false);
                setBranch('IT');
              }}
              style={{
                width: 310,
                marginHorizontal: 6,
                backgroundColor: it ? '#fae6c8' : '#edeef0',
                alignItems: 'center',
                borderRadius: 8,
                justifyContent: 'center',
                borderWidth: it ? 0.5 : 0,
                borderColor: it ? '#FB9D0A' : 'white',
                marginTop: 13,
              }}>
              <Text
                style={{
                  color: '#191919',
                  fontFamily: 'Poppins-Regular',
                  fontSize: 12,
                  paddingVertical: 9,
                }}>
                Information Technology (IT)
              </Text>
            </Pressable>
            <Pressable
              onPress={() => {
                setCp(false);
                setCsd(false);
                setIt(false);
                setIot(true);
                setCh(false);
                setCl(false);
                setMc(false);
                setMe(false);
                setEc(false);
                setEe(false);
                setBranch('IOT');
              }}
              style={{
                width: 310,
                marginHorizontal: 6,
                backgroundColor: iot ? '#fae6c8' : '#edeef0',
                alignItems: 'center',
                borderRadius: 8,
                justifyContent: 'center',
                borderWidth: iot ? 0.5 : 0,
                borderColor: iot ? '#FB9D0A' : 'white',
                marginTop: 13,
              }}>
              <Text
                style={{
                  color: '#191919',
                  fontFamily: 'Poppins-Regular',
                  fontSize: 12,
                  paddingVertical: 9,
                }}>
                Internet of Things (IOT)
              </Text>
            </Pressable>
            <Pressable
              onPress={() => {
                setCp(false);
                setCsd(false);
                setIt(false);
                setIot(false);
                setCh(true);
                setCl(false);
                setMc(false);
                setMe(false);
                setEc(false);
                setEe(false);
                setBranch('CH');
              }}
              style={{
                width: 310,
                marginHorizontal: 6,
                backgroundColor: ch ? '#fae6c8' : '#edeef0',
                alignItems: 'center',
                borderRadius: 8,
                justifyContent: 'center',
                borderWidth: ch ? 0.5 : 0,
                borderColor: ch ? '#FB9D0A' : 'white',
                marginTop: 13,
              }}>
              <Text
                style={{
                  color: '#191919',
                  fontFamily: 'Poppins-Regular',
                  fontSize: 12,
                  paddingVertical: 9,
                }}>
                Chemical Engineering (CH)
              </Text>
            </Pressable>
            <Pressable
              onPress={() => {
                setCp(false);
                setCsd(false);
                setIt(false);
                setIot(false);
                setCh(false);
                setCl(true);
                setMc(false);
                setMe(false);
                setEc(false);
                setEe(false);
                setBranch('CL');
              }}
              style={{
                width: 310,
                marginHorizontal: 6,
                backgroundColor: cl ? '#fae6c8' : '#edeef0',
                alignItems: 'center',
                borderRadius: 8,
                justifyContent: 'center',
                borderWidth: cl ? 0.5 : 0,
                borderColor: cl ? '#FB9D0A' : 'white',
                marginTop: 13,
              }}>
              <Text
                style={{
                  color: '#191919',
                  fontFamily: 'Poppins-Regular',
                  fontSize: 12,
                  paddingVertical: 9,
                }}>
                Civil Engineering (CL)
              </Text>
            </Pressable>
            <Pressable
              onPress={() => {
                setCp(false);
                setCsd(false);
                setIt(false);
                setIot(false);
                setCh(false);
                setCl(false);
                setMc(true);
                setMe(false);
                setEc(false);
                setEe(false);
                setBranch('MC');
              }}
              style={{
                width: 310,
                marginHorizontal: 6,
                backgroundColor: mc ? '#fae6c8' : '#edeef0',
                alignItems: 'center',
                borderRadius: 8,
                justifyContent: 'center',
                borderWidth: mc ? 0.5 : 0,
                borderColor: mc ? '#FB9D0A' : 'white',
                marginTop: 13,
              }}>
              <Text
                style={{
                  color: '#191919',
                  fontFamily: 'Poppins-Regular',
                  fontSize: 12,
                  paddingVertical: 9,
                }}>
                Mechatronics Engineering (MC)
              </Text>
            </Pressable>
            <Pressable
              onPress={() => {
                setCp(false);
                setCsd(false);
                setIt(false);
                setIot(false);
                setCh(false);
                setCl(false);
                setMc(false);
                setMe(true);
                setEc(false);
                setEe(false);
                setBranch('ME');
              }}
              style={{
                width: 310,
                marginHorizontal: 6,
                backgroundColor: me ? '#fae6c8' : '#edeef0',
                alignItems: 'center',
                borderRadius: 8,
                justifyContent: 'center',
                borderWidth: me ? 0.5 : 0,
                borderColor: me ? '#FB9D0A' : 'white',
                marginTop: 13,
              }}>
              <Text
                style={{
                  color: '#191919',
                  fontFamily: 'Poppins-Regular',
                  fontSize: 12,
                  paddingVertical: 9,
                }}>
                Mechanical Engineering (ME)
              </Text>
            </Pressable>
            <Pressable
              onPress={() => {
                setCp(false);
                setCsd(false);
                setIt(false);
                setIot(false);
                setCh(false);
                setCl(false);
                setMc(false);
                setMe(false);
                setEc(true);
                setEe(false);
                setBranch('EC');
              }}
              style={{
                width: 310,
                marginHorizontal: 6,
                backgroundColor: ec ? '#fae6c8' : '#edeef0',
                alignItems: 'center',
                borderRadius: 8,
                justifyContent: 'center',
                borderWidth: ec ? 0.5 : 0,
                borderColor: ec ? '#FB9D0A' : 'white',
                marginTop: 13,
              }}>
              <Text
                style={{
                  color: '#191919',
                  fontFamily: 'Poppins-Regular',
                  fontSize: 12,
                  paddingVertical: 9,
                }}>
                Electronics & Communication Engineering (EC)
              </Text>
            </Pressable>
            <Pressable
              onPress={() => {
                setCp(false);
                setCsd(false);
                setIt(false);
                setIot(false);
                setCh(false);
                setCl(false);
                setMc(false);
                setMe(false);
                setEc(false);
                setEe(true);
                setBranch('EE');
              }}
              style={{
                width: 310,
                marginHorizontal: 6,
                backgroundColor: ee ? '#fae6c8' : '#edeef0',
                alignItems: 'center',
                borderRadius: 8,
                justifyContent: 'center',
                borderWidth: ee ? 0.5 : 0,
                borderColor: ee ? '#FB9D0A' : 'white',
                marginTop: 13,
              }}>
              <Text
                style={{
                  color: '#191919',
                  fontFamily: 'Poppins-Regular',
                  fontSize: 12,
                  paddingVertical: 9,
                }}>
                Electrical Engineering (EE)
              </Text>
            </Pressable>
          </View>
          <View style={{borderRadius: 9}}>
            <Pressable
              onPress={onRegisterPressed}
              style={{
                alignContent: 'center',
                alignSelf: 'center',
                marginTop: 40,
                backgroundColor: '#1A82C4',
                paddingVertical: 9,
                borderRadius: 13,
                flex: 1,
                width: width - 48,
              }}>
              <Text
                style={{
                  color: 'white',
                  alignSelf: 'center',
                  fontFamily: 'Poppins-SemiBold',
                  fontSize: 14,
                }}>
                Register
              </Text>
            </Pressable>
          </View>

          <Text style={styles.text}>
            By registering, you confirm that you accept our{' '}
            <Text
              style={styles.link}
              onPress={() =>
                Linking.openURL(
                  'https://www.privacypolicies.com/live/2eefdb92-5ac6-4457-87db-172f4af94760',
                )
              }>
              Terms of Use
            </Text>{' '}
            and{' '}
            <Text
              style={styles.link}
              onPress={() =>
                Linking.openURL(
                  'https://www.privacypolicies.com/live/2eefdb92-5ac6-4457-87db-172f4af94760',
                )
              }>
              Privacy Policy
            </Text>
          </Text>
          <Pressable
            onPress={onSignInPress}
            style={{
              alignContent: 'center',
              alignSelf: 'center',
              marginTop: 20,
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginBottom: 15,
              }}>
              <Text
                style={{
                  color: 'grey',
                  fontFamily: 'Poppins-Medium',
                  fontSize: 12,
                }}>
                Have an account?
              </Text>
              <Text
                style={{
                  color: '#FB9D0A',
                  fontFamily: 'Poppins-SemiBold',
                  marginLeft: 5,
                  fontSize: 12,
                }}>
                Login
              </Text>
            </View>
          </Pressable>
        </View>
      </ScrollView>
      {loadingPending ? <RegisterLoader /> : null}
    </>
  );
};

const styles = StyleSheet.create({
  root: {
    padding: 20,
  },
  title: {
    fontSize: 18,
    color: 'black',
    fontFamily: 'Poppins-Medium',
    textAlign: 'left',
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
    width: 220,
    height: 220,
    alignSelf: 'center',
  },
});

export default SignUpScreen;
