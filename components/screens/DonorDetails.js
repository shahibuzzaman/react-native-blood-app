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

  return (
    <View style={{flex: 1}}>
      {getDonorDetails.Donar ? (
        <View style={{flex: 1}}>
          <View
            style={{
              flex: 0.1,
              justifyContent: 'center',
              alignItems: 'flex-end',
              marginRight: 20,
            }}>
            <Button
              title="Edit"
              color="#d1001c"
              onPress={() => {
                navigation.navigate('Donor Edit', {
                  user_id: getDonorDetails.Donar.Details[0].id,
                });
              }}
            />
          </View>
          <View
            style={{
              flex: 0.3,
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
          </View>
          <View style={{flex: 0.5, margin: 20}}>
            <Text style={{marginTop: 10, fontSize: 16}}>
              <Text style={{fontWeight: 'bold', margin: 10}}>Name: </Text>
              {getDonorDetails.Donar.Details[0].name}
            </Text>
            <Text style={{marginTop: 10, fontSize: 16}}>
              <Text style={{fontWeight: 'bold', margin: 10}}>Email: </Text>
              {getDonorDetails.Donar.Details[0].email}
            </Text>
            <Text style={{marginTop: 10, fontSize: 16}}>
              <Text style={{fontWeight: 'bold', margin: 10}}>Address: </Text>
              {getDonorDetails.Donar.Details[0].address}
            </Text>
            <Text style={{marginTop: 10, fontSize: 16}}>
              <Text style={{fontWeight: 'bold', margin: 10}}>Phone: </Text>
              {getDonorDetails.Donar.Details[0].phone}
            </Text>
            {/* <Text style={{marginTop: 10, fontSize: 16}}>
              <Text style={{fontWeight: 'bold', margin: 10}}>Member at: </Text>
              {getDonorDetails.Donar.Details[0].name}
            </Text> */}
            <Text style={{marginTop: 10, fontSize: 16}}>
              <Text style={{fontWeight: 'bold', margin: 10}}>
                Last date of blood donation:
                {getDonorDetails.Donar.Details[0].date}
              </Text>
            </Text>
          </View>
          <View
            style={{flex: 0.1, justifyContent: 'center', alignItems: 'center'}}>
            <Button title="Logout" color="#3F51B5" onPress={() => logout()} />
          </View>
        </View>
      ) : (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'white',
          }}>
          <ActivityIndicator size="large" color="#d1001c" />
        </View>
      )}
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
