import React, {useState, useEffect} from 'react';
import {View, Text, Button} from 'react-native';
import BankDetails from './BankDetails';
import DonorDetails from './DonorDetails';
import ProfileDetails from './ProfileDetails';

const Profile = ({navigation, getLoginValue, logout}) => {
  const [user, setUser] = useState('');
  const [getUserDetails, setUserDetails] = useState('');

  useEffect(() => {
    mainData();
  }, []);

  // useEffect(() => {
  //   userDetails();
  // }, [user]);

  const mainData = () => {
    console.log('meao', getLoginValue.getToken);
    let token = 'bearer' + getLoginValue.getToken;
    fetch('http://bloodbank.clonestudiobd.com/api/auth/me', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: token,
      },
    }).then((response) => {
      response.json().then((userData) => {
        console.log(userData);
        setUser(userData);
      });
    });
  };

  // const userDetails = () => {
  //   if (user.donar === '1') {
  //     fetch(`http://192.168.0.13/api/donor/${user.email}`, {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //         Accept: 'application/json',
  //       },
  //     })
  //       .then((response) => response.json())
  //       .then((json) => setUserDetails(json));

  //   } else {
  //     fetch(`http://bloodbank.clonestudiobd.com/api/bank/${user.email}`, {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //         Accept: 'application/json',
  //       },
  //     })
  //       .then((response) => response.json())
  //       .then((json) => setUserDetails(json));
  //   }
  // };

  // const details = getUserDetails[0];
  // console.log('details data', details);
  if (user.donar === '1') {
    return (
      <View style={{flex: 1}}>
        {/* <Text>Hello {user.name}</Text>
        <Text>i'm from </Text>
        <Button title="Show details" onPress={() => userDetails()} />
        <Button title="Logout" onPress={() => logout()} />
        <ProfileDetails details={details} /> */}
        <DonorDetails user={user} logout={logout} />
      </View>
    );
  } else if (user.bank === '1') {
    return (
      <View>
        <BankDetails user={user} logout={logout} />
      </View>
    );
  } else {
    return null;
  }
};

export default Profile;
