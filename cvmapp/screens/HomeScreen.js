import {
  View,
  Text,
  Pressable,
  ScrollView,
  StatusBar,
  useWindowDimensions,
  Linking,
  Share,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {useAuthContext} from '../src/Context/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import AppLoader from '../components/AppLoader';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {useIsFocused} from '@react-navigation/native';
import {PRIMARY_COLOR1, PRIMARY_COLOR2} from '@env';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import LinearGradient from 'react-native-linear-gradient';
import Foundation from 'react-native-vector-icons/Foundation';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';

// import {useNavigation} from '@react-navigation/native';
// import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
const HomeScreen = () => {
  const navigation = useNavigation();
  const {width} = useWindowDimensions();
  const {
    users,
    setLoginPending,
    loginPending,
    name,
    setTokens,
    setUsers,
    tokens,
    setUser,
    // trying,
    // setTrying,
  } = useAuthContext();

  const [data, setData] = useState([]);
  const [featuredData, setFeaturedData] = useState([]);
  const [nearByPg, setNearByPgData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [nearByMess, setNearByMessData] = useState([]);
  const [status, setStatus] = useState(true);
  const [airplaneMode, setAirplaneMode] = useState(false);
  const [studentDetail, setStudentDetail] = useState(null);
  // const [timer, setTimer] = useState(10);
  let jsonValue;
  const getDatas = async () => {
    const value = await AsyncStorage.getItem('userDetail');
    jsonValue = JSON.parse(value);
    setUsers(jsonValue.userID);
    setTokens(jsonValue.token);
  };

  const logout = async () => {
    setLoginPending(true);
    await AsyncStorage.clear();
    setTimeout(() => setTokens(null), 200);
    setTimeout(() => setUser(false), 500);
    setLoginPending(false);
  };

  const getStudentDetails = async () => {
    const response = await axios.get(
      `http://elbforcvmu-2038773933.ap-south-1.elb.amazonaws.com/api/v1/student/details`,
      {
        headers: {Authorization: `Bearer ${jsonValue.token}`},
      },
    );
    setStudentDetail(response.data.data);
    console.log(response.data.data);
  };

  useEffect(() => {
    getDatas();
    // getStudentDetails();
    setTimeout(() => getStudentDetails(), 100);
  }, []);

  // const onRefresh = useCallback(() => {
  //   setRefreshing(true);
  //   if (location) {
  //   }
  //   setTimeout(() => {
  //     setRefreshing(false);
  //   }, 2000);
  // }, []);
  const onRate = () => {
    Linking.openURL(
      'https://play.google.com/store/apps/details?id=com.ssip.governmentsachivalay',
    );
  };
  const onShare = async () => {
    try {
      const result = await Share.share({
        message: `Hey there! I found this Niwas App really very helpful. You may solve your PG/Hostel renting problem with this amazing app.${'\n'}${'\n'} Download now:${'\n'}https://play.google.com/store/apps/details?id=com.ssip.governmentsachivalay`,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      Alert.alert(error.message);
    }
  };

  const today = new Date();
  const greeting = () => {
    if (today.getHours() < 12 && today.getHours() >= 4) {
      return 'Good Morning';
    } else if (today.getHours() >= 12 && today.getHours() < 16) {
      return 'Good Afternoon!';
    } else if (today.getHours() >= 16 && today.getHours() < 22) {
      return 'Good Evening!';
    } else {
      return 'Good Night!';
    }
  };

  return (
    <>
      <ScrollView
        // refreshControl={
        //   <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        // }
        style={{backgroundColor: 'white', flex: 1}}
        showsVerticalScrollIndicator={false}>
        <StatusBar
          animated={true}
          backgroundColor={'#1A82C4'}
          barStyle={'light-content'}
        />
        <View>
          <View>
            {/* <Text>{trying}</Text> */}
            <View>
              <Text></Text>
            </View>
            <View>
              <View
                style={{
                  borderWidth: 3,
                  borderColor: PRIMARY_COLOR1,
                  padding: 13,
                  borderRadius: 34,
                  alignSelf: 'center',
                  alignItems: 'center',
                  marginTop: 18,
                }}>
                <FontAwesome5
                  name="user-alt"
                  size={34}
                  color={PRIMARY_COLOR1}
                />
              </View>
              <Text
                style={{
                  fontSize: 16,
                  color: 'black',
                  marginTop: 15,
                  textAlign: 'center',
                  fontFamily: 'Poppins-Medium',
                }}>
                {studentDetail?.name}
              </Text>
              <Text
                style={{
                  fontSize: 13,
                  color: '#4d4d4d',
                  textAlign: 'center',
                  fontFamily: 'Poppins-Regular',
                }}>
                {studentDetail?.email}
              </Text>
              <Text
                style={{
                  fontSize: 13,
                  color: '#4d4d4d',
                  textAlign: 'center',
                  fontFamily: 'Poppins-Regular',
                }}>
                {studentDetail?.enrolment}
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  margin: 10,
                  marginHorizontal: 17,
                }}>
                <FontAwesome
                  name="university"
                  size={15}
                  color={'black'}
                  style={{marginRight: 7}}
                />
                <Text style={{fontFamily: 'Fredoka-Medium', color: '#191919'}}>
                  {studentDetail?.college} College
                </Text>
              </View>
            </View>
            <LinearGradient
              colors={['#fa7d8e', '#f22440']}
              style={{
                height: 120,
                margin: 10,
                marginHorizontal: 17,
                borderRadius: 18,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  alignContent: 'center',
                  justifyContent: 'center',
                  marginTop: 7,
                }}>
                <Text
                  style={{
                    color: 'white',
                    fontFamily: 'Poppins-Medium',
                    fontSize: 14,
                    marginHorizontal: 8,
                  }}>
                  Announcement
                </Text>
                <FontAwesome5 name="bullhorn" color={'white'} size={16} />
              </View>
            </LinearGradient>
            <View
              style={{height: 200, flexDirection: 'row', alignItems: 'center'}}>
              <LinearGradient
                colors={['#87cefa', '#22a0f0']}
                style={{
                  flex: 1,
                  height: 160,
                  marginLeft: 17,
                  marginRight: 10,
                  borderRadius: 18,
                }}>
                <Foundation
                  name={
                    studentDetail?.isChoiceFilled
                      ? 'clipboard-notes'
                      : 'clipboard-pencil'
                  }
                  color={'white'}
                  size={38}
                  style={{alignSelf: 'center', marginTop: 24}}
                />
                <Text
                  style={{
                    color: 'white',
                    fontFamily: 'Poppins-Medium',
                    fontSize: 17,
                    marginHorizontal: 8,
                    textAlign: 'center',
                    marginTop: 15,
                  }}>
                  {studentDetail?.isChoiceFilled
                    ? 'Choice Filling Result'
                    : 'Choice Filling Pending'}
                </Text>
              </LinearGradient>

              <LinearGradient
                colors={['#f7c577', '#FB9D0A']}
                style={{
                  flex: 1,
                  height: 160,
                  marginLeft: 10,
                  marginRight: 17,
                  borderRadius: 18,
                }}>
                <AntDesign
                  name="filetext1"
                  color={'white'}
                  size={38}
                  style={{alignSelf: 'center', marginTop: 24}}
                />
                <Text
                  style={{
                    color: 'white',
                    fontFamily: 'Poppins-Medium',
                    fontSize: 17,
                    marginHorizontal: 8,
                    textAlign: 'center',
                    marginTop: 15,
                  }}>
                  Semester {studentDetail?.semester} Result
                </Text>
              </LinearGradient>
            </View>
            <Pressable
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 9,
                marginHorizontal: 15,
              }}
              onPress={() => navigation.navigate('UpdateProfile')}>
              <FontAwesome5 name="user-edit" size={15} color={PRIMARY_COLOR1} />
              <Text
                style={{
                  fontSize: 14,
                  color: '#4d4d4d',
                  marginBottom: 7,
                  marginTop: 8,
                  marginHorizontal: 10,
                  fontFamily: 'Poppins-Regular',
                }}>
                Update Profile
              </Text>
            </Pressable>
            <Pressable
              onPress={onShare}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 9,
                marginHorizontal: 13,
              }}>
              <FontAwesome name="share" size={17} color={PRIMARY_COLOR1} />
              <Text
                style={{
                  fontSize: 14,
                  color: '#4d4d4d',
                  marginBottom: 7,
                  marginTop: 8,
                  marginHorizontal: 10,
                  fontFamily: 'Poppins-Regular',
                }}>
                Share/Refer App to your friends
              </Text>
            </Pressable>
            <Pressable
              onPress={onRate}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 9,
                marginHorizontal: 13,
              }}>
              <FontAwesome name="star" size={17} color={PRIMARY_COLOR1} />
              <Text
                style={{
                  fontSize: 14,
                  color: '#4d4d4d',
                  marginBottom: 7,
                  marginTop: 8,
                  marginHorizontal: 10,
                  fontFamily: 'Poppins-Regular',
                }}>
                Rate us on PlayStore
              </Text>
            </Pressable>
            {/* <Pressable
              onPress={logout}
              style={{
                alignContent: 'center',
                alignSelf: 'center',
                marginTop: 40,
                backgroundColor: PRIMARY_COLOR2,
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
                  fontSize: 14,
                }}>
                Logout
              </Text>
            </Pressable> */}
            <LinearGradient
              colors={['#f7c577', '#FB9D0A']}
              style={{
                alignContent: 'center',
                alignSelf: 'center',
                marginTop: 40,
                backgroundColor: PRIMARY_COLOR2,
                paddingVertical: 9,
                borderRadius: 13,
                width: width - 48,
                marginBottom: 70,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
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
                Logout
              </Text>
              <MaterialIcons
                name="logout"
                color={'white'}
                size={21}
                style={{alignSelf: 'center'}}
              />
            </LinearGradient>
          </View>
        </View>
      </ScrollView>
      {loginPending ? <AppLoader /> : null}
      {loading ? <AppLoader /> : null}
    </>
  );
};

export default HomeScreen;
