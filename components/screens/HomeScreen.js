import React from 'react';
import {
  View,
  Text,
  Dimensions,
  Button,
  StyleSheet,
  Image,
  ImageBackground,
} from 'react-native';
import {FlatList, TouchableOpacity} from 'react-native-gesture-handler';
import FindBank from './FindBank';

const categories = [
  {
    id: 1,
    title: 'A+',
    image: require('../assets/Apos.png'),
  },
  {
    id: 2,
    title: 'O+',
    image: require('../assets/Opos.png'),
  },
  {
    id: 3,
    title: 'B+',
    image: require('../assets/Bpos.png'),
  },
  {
    id: 4,
    title: 'AB+',
    image: require('../assets/ABpos.png'),
  },
  {
    id: 5,
    title: 'A-',
    image: require('../assets/Aneg.png'),
  },
  {
    id: 6,
    title: 'O-',
    image: require('../assets/Oneg.png'),
  },
  {
    id: 7,
    title: 'B-',
    image: require('../assets/Bneg.png'),
  },
  {
    id: 8,
    title: 'AB-',
    image: require('../assets/ABneg.png'),
  },
];

const {width, height} = Dimensions.get('window');

const HomeScreen = ({navigation}) => {
  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          width: width,
          height: 250,
          backgroundColor: '#d1001c',
        }}>
        <Text
          style={{
            color: 'white',
            fontSize: 20,
            textAlign: 'center',
            marginTop: 50,
          }}>
          Donate Blood, Save Life
        </Text>
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
            <View
              style={{
                backgroundColor: '#3F51B5',
                paddingVertical: 8,
                width: width / 2,
                borderRadius: 5,
              }}>
              <Text
                style={{
                  fontSize: 16,
                  color: 'white',
                  alignSelf: 'center',
                  textTransform: 'uppercase',
                }}>
                Be a Donor
              </Text>
            </View>
          </TouchableOpacity>
          <View style={{margin: 10}}>
            <Text style={{color: 'white', fontSize: 16}}>
              ─── have a community? ───
            </Text>
          </View>

          <TouchableOpacity onPress={() => navigation.navigate('BloodBank')}>
            <View
              style={{
                backgroundColor: '#3F51B5',
                paddingVertical: 8,
                width: width / 1.5,
                borderRadius: 5,
              }}>
              <Text
                style={{
                  fontSize: 16,
                  color: 'white',
                  alignSelf: 'center',
                  textTransform: 'uppercase',
                }}>
                Create a Blood Bank
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>

      <View
        style={{
          flex: 1,

          marginTop: '10%',
          marginBottom: 10,
        }}>
        <FindBank navigation={navigation} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    flex: 1,
    height: width / 4,
    width: width / 5,
    backgroundColor: 'white',
    borderColor: '#d1001c',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 40,
    margin: 5,
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'halfmoon_bold',
  },
});

export default HomeScreen;
