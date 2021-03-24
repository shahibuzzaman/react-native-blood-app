import React, {useState, useEffect} from 'react';
import {View, Text} from 'react-native-animatable';

const ProfileDetails = ({user}) => {
  console.log('donor', user);
  const [getUserDetails, setUserDetails] = useState('');
  const [getBankDetails, setBankDetails] = useState('');

  const userDetails = () => {
    if (user.donar === '1') {
      fetch(`http://bloodbank.clonestudiobd.com/api/donor/${user.email}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      })
        .then((response) => response.json())
        .then((json) => setUserDetails(json));
    } else {
      fetch(`http://bloodbank.clonestudiobd.com/api/bank/${user.email}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      })
        .then((response) => response.json())
        .then((json) => setBankDetails(json));
    }
  };

  useEffect(() => {
    userDetails();
  }, [user]);

  if (getUserDetails.Donar) {
    return (
      <View>
        <View>
          <Text>I'm Who?${getUserDetails.Donar.Details[0].name} </Text>
          <Text>I'm Who?${getUserDetails.Donar.Details[0].name} </Text>
        </View>
      </View>
    );
  } else if (getBankDetails.Bank) {
    return (
      <View>
        <View>
          <Text>I'm Who?${getBankDetails.Bank.Details[0].name} </Text>
          <Text>I'm Who?${getBankDetails.Bank.Details[0].name} </Text>
        </View>
      </View>
    );
  } else {
    return (
      <View>
        <Text>loading........</Text>
      </View>
    );
  }
};
export default ProfileDetails;
