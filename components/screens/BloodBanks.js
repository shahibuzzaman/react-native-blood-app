import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Button,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
const {width, height} = Dimensions.get('window');

const categories = [
  {
    id: 1,
    title: 'Dhaka Blood Bank',
  },
  {
    id: 2,
    title: 'Uttara Blood Bank',
  },
  {
    id: 3,
    title: 'Rangpur Blood Bank',
  },
  {
    id: 4,
    title: 'Bogra Blood bank',
  },
  {
    id: 5,
    title: 'Rajshahi Blood Bank',
  },
  {
    id: 6,
    title: 'Shylet Blood  bank',
  },
  {
    id: 7,
    title: 'Barishal Blood Bank',
  },
  {
    id: 8,
    title: 'Chottogram Blood Bank',
  },
];

const BloodBanks = ({navigation, route}) => {
  const {searchZone} = route.params;
  const [donor, setDonor] = useState('');

  useEffect(() => {
    fetch(`http://bloodbank.clonestudiobd.com/api/zonebank/${searchZone}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((response) => {
      response.json().then((result) => {
        setDonor(result);
        console.log(result);
      });
    });
  }, [searchZone]);

  return (
    <View style={styles.container}>
      <FlatList
        data={donor}
        showsVerticalScrollIndicator={false}
        numColumns={2}
        keyExtractor={(item) => String(item.id)}
        renderItem={({item}) => (
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 20,
            }}>
            {/* <Button
              title={item.title}
              onPress={() => navigation.navigate(`${item.title}`)}
            /> */}
            <TouchableOpacity
              style={styles.item}
              onPress={() => {
                navigation.navigate('Banks Blood', {
                  bank_id: item.id,
                });
              }}>
              <Text style={styles.text} numberOfLines={2}>
                {item.bankname}
              </Text>
              <Text style={styles.text} numberOfLines={2}>
                Address
              </Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

export default BloodBanks;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  item: {
    flex: 1,
    height: width / 2 - 20,
    width: width / 2 - 20,
    backgroundColor: '#d1001c',
    borderColor: '#d1001c',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    margin: 5,
  },
  text: {
    color: 'white',
    fontSize: 16,
  },
});
