import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Button,
  TouchableOpacity,
  Dimensions,
  Platform,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  FlatList,
  Linking,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';

import {districtList} from '../../assets/District';
import {zoneData} from '../../assets/data';
import Feather from 'react-native-vector-icons/Feather';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const {width} = Dimensions.get('screen');

const AposBlood = ({navigation, route}) => {
  const [searchDistrict, setSearchDistrict] = useState('');
  const [displayDistrict, setDisplayDistrict] = useState(false);
  const [displayZone, setDisplayZone] = useState(false);
  const [searchZone, setSearchZone] = useState('');
  const [donor, setDonor] = useState('');
  const [bank, getBank] = useState('');

  const {bank_id, blood_group} = route.params;

  const item = zoneData.filter((item) => item.district == `${searchDistrict}`);

  const updatePokeDex = (poke) => {
    setSearchDistrict(poke);
    setDisplayDistrict(false);
  };

  const updatePoke = (poke) => {
    setSearchZone(poke);
    setDisplayZone(false);
  };

  const dialCall = () => {
    let phoneNumber = '';

    if (Platform.OS === 'android') {
      phoneNumber = 'tel:${1234567890}';
    } else {
      phoneNumber = 'telprompt:${1234567890}';
    }

    Linking.openURL(phoneNumber);
  };

  console.log(searchZone);

  useEffect(() => {
    fetch('http://bloodbank.clonestudiobd.com/api/bankdonar', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        bank_id: bank_id,
        blood_group: blood_group,
      }),
    }).then((response) => {
      response.json().then((result) => {
        setDonor(result);
        console.log(result);
      });
    });
  }, []);

  console.log('donorList34', donor);

  if (!donor) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'white',
        }}>
        <ActivityIndicator size="large" color="#d1001c" />
      </View>
    );
  } else {
    return (
      <SafeAreaView style={{flex: 1}}>
        <View style={{flex: 1, marginTop: 20}}>
          <View
            style={{flex: 2, justifyContent: 'center', alignItems: 'center'}}>
            <FlatList
              data={donor}
              keyExtractor={(item) => String(item.id)}
              renderItem={({item}) => (
                <View
                  style={{
                    flex: 2,
                    backgroundColor: 'white',
                    flexDirection: 'row',
                    width: width - 20,
                    height: width / 3.5,
                    marginBottom: 20,
                    shadowColor: '#000',
                    shadowOffset: {
                      width: 0,
                      height: 2,
                    },
                    shadowOpacity: 0.25,
                    shadowRadius: 3.84,
                    elevation: 3,
                  }}>
                  <View
                    style={{
                      flex: 1,
                      borderRadius: 10,
                      backgroundColor: '#d1001c',
                      height: width / 4.5,
                      alignItems: 'center',
                      margin: 14,
                    }}>
                    <View style={{flex: 0.7, justifyContent: 'center'}}>
                      <Text
                        style={{
                          color: 'white',
                          fontSize: 24,
                          textAlign: 'center',
                          textTransform: 'uppercase',
                        }}>
                        {item.blood}
                      </Text>
                    </View>
                    <View
                      style={{
                        flex: 0.3,
                        backgroundColor: 'green',
                        width: '100%',
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderBottomLeftRadius: 10,
                        borderBottomRightRadius: 10,
                      }}>
                      <Text style={{color: 'white'}}>Available</Text>
                    </View>
                  </View>
                  <View
                    style={{
                      flex: 3,
                      flexDirection: 'column',
                      marginLeft: 10,
                    }}>
                    <View style={{flex: 1}}>
                      <Text
                        style={{
                          fontSize: 16,
                          marginTop: 10,
                        }}>
                        {item.name}
                      </Text>
                    </View>
                    <View
                      style={{
                        flex: 1,
                        marginLeft: 5,
                        flexDirection: 'row',
                        marginTop: 5,
                      }}>
                      <View style={{marginTop: 5}}>
                        <Feather name="phone" color="#05375a" size={16} />
                      </View>
                      <Text
                        style={{
                          fontSize: 16,
                          marginTop: 2,
                          marginLeft: 10,
                          marginRight: 20,
                        }}>
                        {item.phone}
                      </Text>
                      <View style={[{marginTop: -5}]}>
                        <Button
                          title="call now"
                          color="green"
                          onPress={() => {
                            const dialCall = () => {
                              let phoneNumber = '';

                              if (Platform.OS === 'android') {
                                phoneNumber = `tel:${item.phone}`;
                              } else {
                                phoneNumber = `telprompt:${item.phone}`;
                              }

                              Linking.openURL(phoneNumber);
                            };
                            return dialCall();
                          }}
                        />
                      </View>
                    </View>
                    <View
                      style={{flex: 1, flexDirection: 'row', marginLeft: 5}}>
                      <View style={{marginTop: 5}}>
                        <Feather name="map-pin" color="#05375a" size={16} />
                      </View>
                      <Text
                        style={{
                          fontSize: 16,
                          marginTop: 2,
                          marginLeft: 10,
                        }}>
                        {item.address}
                      </Text>
                    </View>
                  </View>
                </View>
              )}
            />
          </View>
        </View>
      </SafeAreaView>
    );
  }
};

export default AposBlood;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#d1001c',
  },
  header: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    padding: 30,
  },
  footer: {
    flex: 4,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  text_header: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 30,
  },
  text_footer: {
    color: '#05375a',
    fontSize: 18,
  },
  action: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    paddingBottom: 5,
  },
  actionError: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#FF0000',
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 0 : -12,
    paddingLeft: 10,
    color: '#05375a',
  },
  errorMsg: {
    color: '#FF0000',
    fontSize: 14,
  },
  button: {
    alignItems: 'center',
    marginTop: 50,
  },
  signIn: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  textSign: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});
