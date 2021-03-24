import React, {useState} from 'react';
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
} from 'react-native';

import {districtList} from '../../assets/District';
import {zoneData} from '../../assets/data';
import Feather from 'react-native-vector-icons/Feather';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const {width} = Dimensions.get('screen');

const AnegBlood = () => {
  const [searchDistrict, setSearchDistrict] = useState('');
  const [displayDistrict, setDisplayDistrict] = useState(false);
  const [displayZone, setDisplayZone] = useState(false);
  const [searchZone, setSearchZone] = useState('');
  const [donor, setDonor] = useState('');
  const [bank, getBank] = useState('');

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

  const fetchDonor = () => {
    fetch('http://bloodbank.clonestudiobd.com/api/blood', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        zone: `${searchZone}`,
        blood: 'A-',
      }),
    }).then((response) => {
      response.json().then((result) => {
        setDonor(result);
        console.log(result);
      });
    });
  };

  console.log('donorList', donor);

  return (
    <KeyboardAwareScrollView style={{flex: 1, backgroundColor: 'white'}}>
      <View>
        <View style={{flex: 1, flexDirection: 'column', padding: 20}}>
          <View style={{flex: 1}}>
            <Text style={styles.text_footer}>District</Text>
            <View style={styles.action}>
              <Feather name="map-pin" color="#05375a" size={20} />
              <TextInput
                placeholder="Your District"
                style={styles.textInput}
                autoCapitalize="none"
                onFocus={() => setDisplayDistrict(!displayDistrict)}
                value={searchDistrict}
                onChangeText={(value) => setSearchDistrict(value)}
              />
              <Feather name="chevron-down" color="#05375a" size={20} />
            </View>
          </View>
          <View style={{flex: 1}}>
            {displayDistrict && (
              <ScrollView nestedScrollEnabled={true} style={{height: 200}}>
                {districtList
                  .filter(
                    ({name}) =>
                      name.toLowerCase().indexOf(searchDistrict.toLowerCase()) >
                      -1,
                  )
                  .map((value, i) => {
                    return (
                      <TouchableOpacity
                        onPress={() => updatePokeDex(value.name)}
                        key={i}
                        tabIndex="0">
                        <Text>{value.name}</Text>
                      </TouchableOpacity>
                    );
                  })}
              </ScrollView>
            )}
          </View>
        </View>

        <View
          style={{
            flex: 1,
            flexDirection: 'column',
            paddingLeft: 20,
            paddingRight: 20,
          }}>
          <View style={{flex: 1}}>
            <Text style={styles.text_footer}>Zone</Text>
            <View style={styles.action}>
              <Feather name="map-pin" color="#05375a" size={20} />
              <TextInput
                placeholder="Your Zone"
                style={styles.textInput}
                autoCapitalize="none"
                onFocus={() => setDisplayZone(!displayZone)}
                value={searchZone}
                onChangeText={(value) => setSearchZone(value)}
              />
              <Feather name="chevron-down" color="#05375a" size={20} />
            </View>
          </View>
          <View style={{flex: 1}}>
            {displayZone && (
              <ScrollView nestedScrollEnabled={true} style={{height: 200}}>
                {item
                  .filter(
                    ({name}) =>
                      name.toLowerCase().indexOf(searchZone.toLowerCase()) > -1,
                  )
                  .map((value, i) => {
                    return (
                      <TouchableOpacity
                        onPress={() => updatePoke(value.name)}
                        key={i}
                        tabIndex="0">
                        <Text>{value.name}</Text>
                      </TouchableOpacity>
                    );
                  })}
              </ScrollView>
            )}
          </View>
        </View>
        <View style={{margin: 20}}>
          <Button
            color="#d1001c"
            title="Search Blood Donor"
            onPress={() => fetchDonor()}
          />
        </View>

        <View style={{flex: 2, marginTop: 20}}>
          {donor ? (
            <View
              style={{flex: 2, justifyContent: 'center', alignItems: 'center'}}>
              <FlatList
                data={donor}
                keyExtractor={(item) => String(item.id)}
                renderItem={({item}) => (
                  <View
                    style={{
                      flex: 2,
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
                      <Text
                        style={{
                          color: 'white',
                          fontSize: 24,
                          textAlign: 'center',
                          marginTop: '30%',
                          textTransform: 'uppercase',
                        }}>
                        {item.blood}
                      </Text>
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
          ) : // ? donor.map((res) => {
          //     return (
          //       <View
          //         key={res.id}
          //         style={{
          //           width: width,
          //           height: width / 4,
          //           borderWidth: 1,
          //           borderColor: 'red',
          //           paddingLeft: 20,
          //         }}>
          //         <Text>{res.name}</Text>
          //       </View>
          //     );
          //   })
          // : null}
          null}
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default AnegBlood;

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
