import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Button,
  ActivityIndicator,
  Dimensions,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const {width} = Dimensions.get('screen');

const DonorDetails = ({navigation, user, logout}) => {
  const [getDonorDetails, setDonorDetails] = useState('');

  useEffect(() => {
    fetch(`http://bloodbank.clonestudiobd.com/api/donor/${user.email}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    })
      .then((response) => response.json())
      .then((json) => setDonorDetails(json));
  }, [user]);

  console.log('bankd', getDonorDetails.Donar);

  return (
    <View style={{flex: 1}}>
      {getDonorDetails.Donar ? (
        <View style={{flex: 1}}>
          <View style={{flex: 0.1, backgroundColor: 'white'}}></View>
          <View
            style={{
              flex: 0.4,
              backgroundColor: 'white',

              alignItems: 'center',
            }}>
            <View
              style={{
                height: width / 3,
                width: width / 3,
                backgroundColor: '#d1001c',
                borderRadius: 100,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={{fontSize: 30, fontWeight: 'bold', color: 'white'}}>
                {getDonorDetails.Donar.Details[0].blood.toUpperCase()}
              </Text>
            </View>
            <Text style={{marginTop: 10, fontSize: 16}}>
              {getDonorDetails.Donar.Details[0].name}
            </Text>
            <Text style={{marginTop: 10, fontSize: 16}}>
              {getDonorDetails.Donar.Details[0].email}{' '}
            </Text>
            <Text style={{marginTop: 10, fontSize: 16}}>
              {getDonorDetails.Donar.Details[0].address}{' '}
            </Text>
          </View>
          <View style={{flex: 0.5}}>
            <TouchableOpacity style={{flex: 1, flexDirection: 'row'}}>
              <View>
                <Text>abcd</Text>
              </View>
            </TouchableOpacity>
          </View>
          <Button title="Logout" onPress={() => logout()} />
        </View>
      ) : null}
    </View>
  );
};

export default DonorDetails;

const styles = StyleSheet.create({
  menuWrapper: {
    marginTop: 10,
  },
  menuItem: {
    flex: 1,
    flexDirection: 'row',
    paddingVertical: 15,
    paddingHorizontal: 30,
  },
  menuItemText: {
    color: '#777777',
    marginLeft: 20,
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 26,
  },
});
