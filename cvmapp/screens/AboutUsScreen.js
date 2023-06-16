import {
  View,
  Text,
  Image,
  Pressable,
  TouchableOpacity,
  Linking,
  ScrollView,
  useWindowDimensions,
} from 'react-native';
import React from 'react';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {PRIMARY_COLOR1} from '@env';

const AboutUsScreen = () => {
  const {width} = useWindowDimensions();
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={{
        // backgroundColor: 'white',
        flex: 1,
        // padding: 14,
      }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          // marginBottom: 10,
          backgroundColor: PRIMARY_COLOR1,
          paddingVertical: 12,
        }}>
        <FontAwesome5
          name="users"
          size={20}
          color={'white'}
          style={{marginRight: 3}}
        />
        <Text
          style={{
            marginLeft: 3,
            fontFamily: 'Poppins-Medium',
            color: 'white',
            fontSize: 17,
            marginTop: 3,
            marginLeft: 7,
            // marginBottom: 10,
          }}>
          About Us
        </Text>
      </View>
      <View style={{backgroundColor: 'white', flex: 1, paddingTop: 20}}>
        <View
          style={{
            margin: 10,
            marginTop: 15,
            borderRadius: 25,
            backgroundColor: 'white',
            alignSelf: 'center',
            height: 422,
            width: width - 80,
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 3,
            },
            shadowOpacity: 0.29,
            shadowRadius: 4.65,
            elevation: 7,
          }}>
          <Image
            source={require('./../data/Pratham.jpg')}
            style={{
              height: 310,
              width: width - 80,
              borderTopLeftRadius: 25,
              borderTopRightRadius: 25,
            }}
            resizeMethod="resize"
          />
          <Text
            style={{
              // marginLeft: 3,
              fontFamily: 'Poppins-Medium',
              color: '#000000',
              fontSize: 16,
              marginTop: 7,
              textAlign: 'center',
            }}>
            Pratham Shah
          </Text>
          <Text
            style={{
              // marginLeft: 3,
              fontFamily: 'Poppins-Regular',
              color: '#000000',
              fontSize: 14,
              marginTop: 4,
              textAlign: 'center',
            }}>
            Backend Developer
          </Text>
          <View
            style={{
              marginTop: 3,
              marginBottom: 10,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-around',
            }}>
            <TouchableOpacity
              onPress={() =>
                Linking.openURL(
                  'https://www.linkedin.com/in/pratham-shah-269a93205/',
                )
              }>
              <FontAwesome name="linkedin" size={18} color={'#0077b5'} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                Linking.openURL(`mailto:prathamshah019@gmail.com`)
              }>
              <Ionicons name="ios-mail" size={18} color={'#ea4335'} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => Linking.openURL('https://wa.me/918200470050')}>
              <FontAwesome name="whatsapp" size={20} color={'#59ce72'} />
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{
            margin: 10,
            marginTop: 15,
            borderRadius: 25,
            backgroundColor: 'white',
            alignSelf: 'center',
            height: 422,
            width: width - 80,
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 3,
            },
            shadowOpacity: 0.29,
            shadowRadius: 4.65,
            elevation: 7,
          }}>
          <Image
            source={require('./../data/kushal.jpg')}
            style={{
              height: 310,
              width: width - 80,
              borderTopLeftRadius: 25,
              borderTopRightRadius: 25,
            }}
            resizeMethod="resize"
          />
          <Text
            style={{
              // marginLeft: 3,
              fontFamily: 'Poppins-Medium',
              color: '#000000',
              fontSize: 16,
              marginTop: 7,
              textAlign: 'center',
            }}>
            Kushal Shahpatel
          </Text>
          <Text
            style={{
              // marginLeft: 3,
              fontFamily: 'Poppins-Regular',
              color: '#000000',
              fontSize: 14,
              marginTop: 4,
              textAlign: 'center',
            }}>
            ReactJS Web Developer
          </Text>
          <View
            style={{
              marginTop: 3,
              marginBottom: 10,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-around',
            }}>
            <TouchableOpacity
              onPress={() =>
                Linking.openURL(
                  'https://www.linkedin.com/in/shahpatel-kushal-4a4a901b6/',
                )
              }>
              <FontAwesome name="linkedin" size={18} color={'#0077b5'} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => Linking.openURL(`mailto:spkushal600@gmail.com`)}>
              <Ionicons name="ios-mail" size={18} color={'#ea4335'} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => Linking.openURL('https://wa.me/918153033600')}>
              <FontAwesome name="whatsapp" size={20} color={'#59ce72'} />
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{
            margin: 10,
            marginTop: 15,
            borderRadius: 25,
            backgroundColor: 'white',
            alignSelf: 'center',
            height: 422,
            width: width - 80,
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 3,
            },
            shadowOpacity: 0.29,
            shadowRadius: 4.65,
            elevation: 7,
            marginBottom: 50,
          }}>
          <Image
            source={require('./../data/Het.jpg')}
            style={{
              height: 310,
              width: width - 80,
              borderTopLeftRadius: 25,
              borderTopRightRadius: 25,
            }}
            resizeMethod="resize"
          />
          <Text
            style={{
              // marginLeft: 3,
              fontFamily: 'Poppins-Medium',
              color: '#000000',
              fontSize: 16,
              marginTop: 7,
              textAlign: 'center',
            }}>
            Het Patel
          </Text>
          <Text
            style={{
              // marginLeft: 3,
              fontFamily: 'Poppins-Regular',
              color: '#000000',
              fontSize: 14,
              marginTop: 4,
              textAlign: 'center',
            }}>
            React Native App Developer
          </Text>
          <View
            style={{
              marginTop: 3,
              marginBottom: 10,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-around',
            }}>
            <TouchableOpacity
              onPress={() =>
                Linking.openURL(
                  'https://www.linkedin.com/in/het-patel-462236201/',
                )
              }>
              <FontAwesome name="linkedin" size={18} color={'#0077b5'} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => Linking.openURL(`mailto:hetvrunda@gmail.com`)}>
              <Ionicons name="ios-mail" size={18} color={'#ea4335'} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => Linking.openURL('https://wa.me/917698545581')}>
              <FontAwesome name="whatsapp" size={20} color={'#59ce72'} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default AboutUsScreen;
