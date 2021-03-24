import React from 'react';
import {View, Text} from 'react-native';
import SignIn from './SIgnIn';

const ProfileScreen = ({navigation}) => {
  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <SignIn navigation={navigation} />
    </View>
  );
};
export default ProfileScreen;
