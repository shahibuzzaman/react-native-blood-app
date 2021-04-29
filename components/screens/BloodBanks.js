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
  ActivityIndicator,
} from 'react-native';
const {width, height} = Dimensions.get('window');
import Feather from 'react-native-vector-icons/Feather';

const BloodBanks = ({navigation, route}) => {
  const {searchZone} = route.params;
  const [donor, setDonor] = useState('');

  useEffect(() => {
    if (searchZone) {
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
    } else {
      fetch(`http://bloodbank.clonestudiobd.com/api/bank/all`, {
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
    }
  }, [searchZone]);

  return (
    <View style={styles.container}>
      {donor ? (
        <View>
          <FlatList
            data={donor}
            showsVerticalScrollIndicator={false}
            numColumns={1}
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
                      banks: item,
                    });
                  }}>
                  <View style={{flex: 1, justifyContent: 'flex-end'}}>
                    <Text
                      style={{color: 'white', fontSize: 20, fontWeight: 'bold'}}
                      numberOfLines={2}>
                      {item.bankname}
                    </Text>
                  </View>

                  <View
                    style={{
                      flex: 1,
                      flexDirection: 'row',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Feather name="map-pin" color="white" size={16} />
                    <Text style={styles.text} numberOfLines={2}>
                      {item.address}
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            )}
          />
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

export default BloodBanks;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  item: {
    flex: 1,
    height: width / 4 - 20,
    width: width - 20,
    backgroundColor: '#d1001c',
    borderColor: '#d1001c',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    margin: 5,
  },
  text: {
    color: 'white',
    fontSize: 14,
    marginLeft: 5,
  },
});
