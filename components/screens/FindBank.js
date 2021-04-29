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
  Modal,
  Alert,
} from 'react-native';

import {districtList} from '../assets/District';
import {zoneData} from '../assets/data';
import Feather from 'react-native-vector-icons/Feather';
import Entypo from 'react-native-vector-icons/Entypo';
import ModalPicker from '../utils/ModalPicker';
import ModalThanaPicker from '../utils/ModalThanaPicker';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const {width} = Dimensions.get('screen');

const ABposBlood = ({navigation}) => {
  const [searchDistrict, setSearchDistrict] = useState('');
  const [displayDistrict, setDisplayDistrict] = useState(false);
  const [displayZone, setDisplayZone] = useState(false);
  const [searchZone, setSearchZone] = useState('');
  const [donor, setDonor] = useState('');
  const [bank, getBank] = useState('');
  const [options, setOptions] = useState('');
  const [thana, setThana] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isThanaModalVisible, setIsThanaModalVisible] = useState(false);

  const item = zoneData.filter((item) => item.district == `${options}`);

  const updatePokeDex = (poke) => {
    setSearchDistrict(poke);
    setDisplayDistrict(false);
  };

  const updatePoke = (poke) => {
    setSearchZone(poke);
    setDisplayZone(false);
  };

  const setData = (item) => {
    setOptions(item.name);
    console.log('cat-id', item.id);
  };

  const setThanaData = (item) => {
    setThana(item.name);
    console.log('cat-id', item.id);
  };

  const changeModalVisibility = (bool) => {
    setIsModalVisible(bool);
  };

  const changeThanaModalVisibility = (bool) => {
    setIsThanaModalVisible(bool);
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
  };

  console.log('donorList', donor);

  return (
    <ScrollView
      nestedScrollEnabled={true}
      style={{flex: 1, backgroundColor: 'white'}}>
      <View>
        <View style={{flex: 1, flexDirection: 'column', padding: 20}}>
          <View style={{flex: 1}}>
            <Text style={styles.text_footer}>District</Text>
            <TouchableOpacity
              style={styles.action}
              onPress={() => changeModalVisibility(true)}>
              <Feather name="map-pin" color="#05375a" size={20} />
              <TextInput
                placeholder="Your District"
                style={styles.textInput}
                autoCapitalize="none"
                editable={false}
                selectTextOnFocus={false}
                value={options}
                onChangeText={(value) => setSearchDistrict(value)}
              />
              <Entypo name="popup" color="#05375a" size={20} />
            </TouchableOpacity>
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
            <Text style={styles.text_footer}>Thana</Text>
            <TouchableOpacity
              style={styles.action}
              onPress={() => {
                options
                  ? changeThanaModalVisibility(true)
                  : Alert.alert('Alert!', 'Select District First.', [
                      {
                        text: 'Cancel',
                        onPress: () => console.log('Cancel Pressed'),
                        style: 'cancel',
                      },
                      {text: 'OK', onPress: () => console.log('OK Pressed')},
                    ]);
              }}>
              <Feather name="map-pin" color="#05375a" size={20} />
              <TextInput
                placeholder="Your Thana"
                style={styles.textInput}
                autoCapitalize="none"
                editable={false}
                selectTextOnFocus={false}
                value={thana}
                onChangeText={(value) => setSearchZone(value)}
              />
              <Entypo name="popup" color="#05375a" size={20} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={{margin: 20}}>
          <Button
            color="#d1001c"
            title="Search Blood Donor"
            onPress={() => {
              navigation.navigate('BloodBanks', {
                searchZone: thana,
              });
            }}
          />
        </View>
      </View>
      <Modal
        transparent={true}
        animationType="fade"
        visible={isModalVisible}
        nRequestClose={() => changeModalVisibility(false)}>
        <ModalPicker
          changeModalVisibility={changeModalVisibility}
          setData={setData}
          categories={districtList}
        />
      </Modal>
      <Modal
        transparent={true}
        animationType="fade"
        visible={isThanaModalVisible}
        nRequestClose={() => changeThanaModalVisibility(false)}>
        <ModalThanaPicker
          changeModalVisibility={changeThanaModalVisibility}
          setData={setThanaData}
          categories={item}
          district={options}
        />
      </Modal>
    </ScrollView>
  );
};

export default ABposBlood;

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
