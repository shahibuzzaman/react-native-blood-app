import React, {useState, useEffect} from 'react';
import {View, Text, Button} from 'react-native';
const BankDetails = ({navigation, user, logout}) => {
  const [getBankDetails, setBankDetails] = useState('');

  useEffect(() => {
    fetch(`http://bloodbank.clonestudiobd.com/api/bank/${user.email}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    })
      .then((response) => response.json())
      .then((json) => setBankDetails(json));
  }, [user]);

  console.log('bankd33', getBankDetails.Bank);

  if (user) {
    return (
      <View>
        {getBankDetails.Bank ? (
          <View>
            <Text>{getBankDetails.Bank.Details[0].name}</Text>
            <Text>{getBankDetails.Bank.Details[0].address}</Text>
            <Button title="Logout" onPress={() => logout()} />
          </View>
        ) : null}
      </View>
    );
  } else {
    return null;
  }
};

export default BankDetails;
