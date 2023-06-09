import {View, Text} from 'react-native';
import React, {useLayoutEffect} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import MaterialScreen from '../screens/MaterialScreen';
import TestScreen from '../screens/TestScreen';
import {PRIMARY_COLOR} from '@env';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Octicons from 'react-native-vector-icons/Octicons';
import UpdateProfile from '../screens/ProfileScreen/UpdateProfile';
import ChoiceFilling from '../screens/ChoiceFilling';
import ResultScreen from '../screens/ResultScreen';
import MdResult from '../screens/MdResult';
import AboutUsScreen from '../screens/AboutUsScreen';
import QuizDetailScreen from '../screens/QuizDetailScreen';
import QuizFinalResult from '../screens/QuizFinalResult';
import {getFocusedRouteNameFromRoute} from '@react-navigation/native';
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
const BottomTabNav = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarInactiveTintColor: '#b3d2e6',
        tabBarActiveTintColor: '#1A82C4',
        tabBarHideOnKeyboard: true,
        tabBarStyle: {
          height: 53,
          position: 'absolute',
          // bottom: 7,
          right: 7,
          left: 7,
          borderRadius: 13,
          paddingBottom: 6,
        },
      }}>
      <Tab.Screen
        component={HomeStack}
        name="Home"
        options={{
          unmountOnBlur: true,
          headerShown: false,
          // tabBarAccessibilityLabel: 'homeTab',
          tabBarLabelStyle: {marginTop: -8, marginBottom: 2, fontSize: 9},
          tabBarIcon: ({color}) => (
            <Ionicons name="home" size={18.5} color={color} />
          ),
        }}
      />
      <Tab.Screen
        component={TestStack}
        name="Tests"
        options={{
          unmountOnBlur: true,
          headerShown: false,
          // tabBarVisible: false,
          tabBarLabelStyle: {marginTop: -8, marginBottom: 2, fontSize: 9},
          tabBarIcon: ({color}) => (
            <Ionicons name="newspaper" size={18.5} color={color} />
          ),
        }}
      />
      <Tab.Screen
        component={MaterialStack}
        name="Material"
        options={{
          unmountOnBlur: true,
          headerShown: false,
          // tabBarAccessibilityLabel: 'materialTab',
          tabBarLabelStyle: {marginTop: -8, marginBottom: 2, fontSize: 9},
          tabBarIcon: ({color}) => (
            <Octicons name="file-directory" size={18} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNav;

const TestStack = ({navigation, route}) => {
  useLayoutEffect(() => {
    const routeName = getFocusedRouteNameFromRoute(route);

    if (routeName === 'QuizDetailScreen') {
      navigation.setOptions({
        tabBarStyle: {display: 'none'},
      });
    } else {
      navigation.setOptions({
        tabBarStyle: {display: 'flex'},
      });
    }
  }, [navigation, route]);
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen component={TestScreen} name="TestScreen" />
      <Stack.Screen
        component={QuizDetailScreen}
        name="QuizDetailScreen"
        options={{tabBarStyle: {display: 'none'}}}
      />
      <Stack.Screen component={QuizFinalResult} name="QuizFinalResult" />
    </Stack.Navigator>
  );
};

const MaterialStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false, tabBarHideOnKeyboard: true}}>
      <Stack.Screen component={MaterialScreen} name="MaterialScreen" />
    </Stack.Navigator>
  );
};

const HomeStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen component={HomeScreen} name="HomeScreen" />
      <Stack.Screen component={UpdateProfile} name="UpdateProfile" />
      <Stack.Screen component={ChoiceFilling} name="ChoiceFilling" />
      <Stack.Screen component={ResultScreen} name="ResultScreen" />
      <Stack.Screen component={MdResult} name="MdResult" />
      <Stack.Screen component={AboutUsScreen} name="AboutUsScreen" />
    </Stack.Navigator>
  );
};
