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
  Alert,
  Modal,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import Entypo from 'react-native-vector-icons/Entypo';
import ModalPicker from '../utils/ModalPicker';
import ModalThanaPicker from '../utils/ModalThanaPicker';
import BankModalPicker from '../utils/BankModalPicker';
import {RadioButton} from 'react-native-paper';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import {zoneData} from '../assets/data';
import {districtList} from '../assets/District';

const SignUp = ({navigation}) => {
  const [data, setData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phoneNumber: '',
    age: '',
    check_textInputChange: false,
    check_emailInputChange: false,
    check_phoneInputChange: false,
    check_passwordInputChange: false,
    check_passwordConfirmInputChange: false,
    secureTextEntry: true,
    isValidUser: true,
    isValidEmail: true,
    isValidPhone: true,
    isValidPassword: true,
  });

  const [gender, setGender] = useState('');
  const [blood, setBlood] = useState('');
  const [displayDistrict, setDisplayDistrict] = useState(false);
  const [searchDistrict, setSearchDistrict] = useState('');
  const [displayZone, setDisplayZone] = useState(false);
  const [searchZone, setSearchZone] = useState('');
  const [displayBanks, setDisplayBanks] = useState(false);
  const [searchBanks, setSearchBanks] = useState('');
  const [getBank, setBank] = useState([]);
  const [getBirthDate, setBirthDate] = useState('Enter Date');
  const [getDonationDate, setDonationDate] = useState('Enter Donation Date');
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isDonateDatePickerVisible, setDonateDatePickerVisibility] = useState(
    false,
  );
  const [bankId, setBankId] = useState('');

  const genderOption = [
    {
      key: 'male',
      text: 'Male',
    },
    {
      key: 'female',
      text: 'Female',
    },
    {
      key: 'other',
      text: 'Other',
    },
  ];

  const bloodGroup = [
    {
      key: 'a+',
      text: 'A+',
    },
    {
      key: 'o+',
      text: 'O+',
    },
    {
      key: 'b+',
      text: 'B+',
    },
    {
      key: 'ab+',
      text: 'AB+',
    },
    {
      key: 'a-',
      text: 'A-',
    },
    {
      key: 'o-',
      text: 'O-',
    },
    {
      key: 'b-',
      text: 'B-',
    },
    {
      key: 'ab-',
      text: 'AB-',
    },
  ];

  const item = zoneData.filter((item) => item.district == `${searchDistrict}`);

  console.log(
    'post data',
    data.name,
    data.email,
    data.phoneNumber,
    data.password,
    data.age,
    gender,
    searchDistrict,
    searchZone,
    blood,
    searchBanks,
  );

  useEffect(() => {
    fetch('http://bloodbank.clonestudiobd.com/api/bank/all')
      .then((response) => response.json())
      .then((json) => {
        setBank(json);
      });
  }, []);

  console.log('banklist', bankList);

  const nameInputChange = (value) => {
    if (value) {
      setData({
        ...data,
        name: value,
        check_textInputChange: true,
      });
    } else {
      setData({
        ...data,
        name: '',
        check_textInputChange: false,
      });
    }
  };

  const emailInputChange = (value) => {
    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!value || reg.test(value)) {
      setData({
        ...data,
        email: value,
        check_emailInputChange: true,
        isValidEmail: true,
      });
    } else {
      setData({
        ...data,
        email: '',
        check_emailInputChange: false,
        isValidEmail: false,
      });
    }
  };

  const phoneNumberInputChange = (value) => {
    if (value.length >= 11) {
      setData({
        ...data,
        phoneNumber: value,
        check_phoneInputChange: true,
        isValidPhone: true,
      });
    } else {
      setData({
        ...data,
        phoneNumber: '',
        check_phoneInputChange: false,
        isValidPhone: false,
      });
    }
  };

  const ageInputChange = (value) => {
    if (value >= 18 && value <= 65) {
      setData({
        ...data,
        age: value,
      });
    } else {
      setData({
        ...data,
        age: '',
      });
    }
  };

  const handlePasswordChange = (value) => {
    if (value.length >= 8) {
      setData({
        ...data,
        password: value,
        isValidPassword: true,
        check_passwordInputChange: true,
      });
    } else {
      setData({
        ...data,
        password: value,
        isValidPassword: false,
        check_passwordInputChange: false,
      });
    }
  };

  const handleConfirmPasswordChange = (value) => {
    if (value === data.password) {
      setData({
        ...data,
        confirmPassword: value,
        check_passwordConfirmInputChange: true,
      });
    } else {
      setData({
        ...data,
        confirmPassword: value,
        check_passwordConfirmInputChange: false,
      });
    }
  };

  const updateSecureTextEntry = () => {
    setData({
      ...data,
      secureTextEntry: !data.secureTextEntry,
    });
  };

  console.log('gender', gender);

  const updatePokeDex = (poke) => {
    setSearchDistrict(poke);
    setDisplayDistrict(false);
  };

  const updatePoke = (poke) => {
    setSearchZone(poke);
    setDisplayZone(false);
  };

  const updateBank = (poke) => {
    setSearchBanks(poke);
    setDisplayBanks(false);
  };

  const showDOBDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDOBDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const showDonateDatePicker = () => {
    setDonateDatePickerVisibility(true);
  };

  const hideDonateDatePicker = () => {
    setDonateDatePickerVisibility(false);
  };

  const [dob, setDob] = useState('');

  const handleDOBConfirm = (date) => {
    setDob(date);
    var endDate = new Date(date).toISOString().split('T')[0];
    setBirthDate(endDate);
    console.log(endDate);
    hideDOBDatePicker();
  };

  const handleDonateDateConfirm = (date) => {
    var endDate = new Date(date).toISOString().split('T')[0];
    setDonationDate(endDate);
    console.log('donation', endDate);
    hideDonateDatePicker();
  };

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isBankModalVisible, setIsBankModalVisible] = useState(false);
  const [isThanaModalVisible, setIsThanaModalVisible] = useState(false);

  const setDistrictData = (item) => {
    setSearchDistrict(item.name);
    console.log('cat-id', item.id);
  };

  const setThanaData = (item) => {
    setSearchZone(item.name);
    console.log('cat-id', item.id);
  };

  const setBankData = (item) => {
    setSearchBanks(item.bankname);
    console.log('cat-id', item.id);
    setBankId(item.id);
  };

  const changeModalVisibility = (bool) => {
    setIsModalVisible(bool);
  };
  const changeBankModalVisibility = (bool) => {
    setIsBankModalVisible(bool);
  };

  const changeThanaModalVisibility = (bool) => {
    setIsThanaModalVisible(bool);
  };

  const bankList = getBank.filter((item) => item.zone === `${searchZone}`);

  const [donorAge, setDonorAge] = useState('');

  const getAge = (dob) => {
    var today = new Date();

    console.log(dob);
    var birthDate = new Date(dob);
    console.log('b-date', birthDate);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    setDonorAge(age);
  };

  useEffect(() => {
    getAge(dob);
  }, [dob]);

  console.log('post data', getDonationDate, getBirthDate);

  return (
    <KeyboardAwareScrollView>
      <ScrollView nestedScrollEnabled={true} style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.text_header}>Register</Text>
        </View>

        <View style={styles.footer}>
          <Text style={styles.text_footer}>Name</Text>
          <View style={styles.action}>
            <FontAwesome name="user-o" color="#05375a" size={20} />
            <TextInput
              placeholder="Your Name"
              style={styles.textInput}
              autoCapitalize="none"
              onChangeText={(value) => nameInputChange(value)}
            />
            {data.check_textInputChange ? (
              <Animatable.View animation="bounceIn">
                <Feather name="check-circle" color="green" size={20} />
              </Animatable.View>
            ) : null}
          </View>
          {data.isValidUser ? null : (
            <Animatable.View animation="fadeInLeft" duration={500}>
              <Text style={styles.errorMsg}>
                Name must be 4 characters long.
              </Text>
            </Animatable.View>
          )}

          <View style={{margin: 10}}></View>
          <Text style={styles.text_footer}>Email</Text>
          <View style={styles.action}>
            <Feather name="mail" color="#05375a" size={20} />
            <TextInput
              placeholder="Your Email"
              style={styles.textInput}
              autoCapitalize="none"
              onChangeText={(value) => emailInputChange(value)}
            />
            {data.check_emailInputChange ? (
              <Animatable.View animation="bounceIn">
                <Feather name="check-circle" color="green" size={20} />
              </Animatable.View>
            ) : null}
          </View>
          {data.isValidEmail ? null : (
            <Animatable.View animation="fadeInLeft" duration={500}>
              <Text style={styles.errorMsg}>Enter email address properly.</Text>
            </Animatable.View>
          )}

          <View style={{margin: 10}}></View>
          <Text style={styles.text_footer}>Phone</Text>
          <View style={styles.action}>
            <Feather name="phone-call" color="#05375a" size={20} />
            <TextInput
              placeholder="Your Phone Number"
              style={styles.textInput}
              autoCapitalize="none"
              onChangeText={(value) => phoneNumberInputChange(value)}
            />
            {data.check_phoneInputChange ? (
              <Animatable.View animation="bounceIn">
                <Feather name="check-circle" color="green" size={20} />
              </Animatable.View>
            ) : null}
          </View>

          {data.isValidPhone ? null : (
            <Animatable.View animation="fadeInLeft" duration={500}>
              <Text style={styles.errorMsg}>
                Phone Number should be 11 digit.
              </Text>
            </Animatable.View>
          )}

          <View style={{margin: 10}}></View>
          <Text style={styles.text_footer}>Password</Text>
          <View style={styles.action}>
            <Feather name="lock" color="#05375a" size={20} />
            <TextInput
              placeholder="Your Password"
              secureTextEntry={data.secureTextEntry ? true : false}
              style={styles.textInput}
              autoCapitalize="none"
              onChangeText={(value) => handlePasswordChange(value)}
            />
            {data.check_passwordInputChange ? (
              <Animatable.View animation="bounceIn" style={{marginRight: 15}}>
                <Feather name="check-circle" color="green" size={20} />
              </Animatable.View>
            ) : null}
            <TouchableOpacity onPress={updateSecureTextEntry}>
              {data.secureTextEntry ? (
                <Feather name="eye-off" color="grey" size={20} />
              ) : (
                <Feather name="eye" color="grey" size={20} />
              )}
            </TouchableOpacity>
          </View>
          {data.isValidPassword ? null : (
            <Animatable.View animation="fadeInLeft" duration={500}>
              <Text style={styles.errorMsg}>
                Password must be 8 character long.
              </Text>
            </Animatable.View>
          )}
          <View style={{margin: 10}}></View>
          <Text style={styles.text_footer}> Confirm Password</Text>
          <View style={styles.action}>
            <Feather name="lock" color="#05375a" size={20} />
            <TextInput
              placeholder="Your Password"
              secureTextEntry={data.secureTextEntry ? true : false}
              style={styles.textInput}
              autoCapitalize="none"
              onChangeText={(value) => handleConfirmPasswordChange(value)}
            />
            {data.check_passwordConfirmInputChange ? (
              <Animatable.View animation="bounceIn" style={{marginRight: 15}}>
                <Feather name="check-circle" color="green" size={20} />
              </Animatable.View>
            ) : null}
            <TouchableOpacity onPress={updateSecureTextEntry}>
              {data.secureTextEntry ? (
                <Feather name="eye-off" color="grey" size={20} />
              ) : (
                <Feather name="eye" color="grey" size={20} />
              )}
            </TouchableOpacity>
          </View>
          <View style={{margin: 10}}></View>
          <View style={{flex: 1, flexDirection: 'row'}}>
            <View style={{flex: 1}}>
              <Text style={styles.text_footer}> Date of Birth</Text>
              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  marginTop: 10,
                  borderBottomWidth: 1,
                  borderBottomColor: '#f2f2f2',
                  paddingBottom: 5,
                  height: 35,
                }}
                onPress={showDOBDatePicker}>
                <Feather name="calendar" color="#05375a" size={20} />
                <Text style={{marginLeft: 10}}>{getBirthDate}</Text>
                {/* <TextInput
                  placeholder="Age"
                  style={styles.textInput}
                  autoCapitalize="none"
                  onChangeText={(value) => ageInputChange(value)}
                /> */}
              </TouchableOpacity>
              <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="date"
                locale="bn_BD"
                onConfirm={handleDOBConfirm}
                onCancel={hideDOBDatePicker}
              />
            </View>
            <View
              style={{
                flex: 1,
                marginLeft: 20,
              }}>
              <Text style={styles.text_footer}> Gender</Text>
              <View
                style={{
                  flexDirection: 'column',
                  marginLeft: 30,
                  marginTop: 10,
                }}>
                {genderOption.map((res) => {
                  return (
                    <View
                      key={res.key}
                      style={{
                        alignItems: 'center',
                        flexDirection: 'row',
                        flex: 1,
                        marginBottom: 5,
                      }}>
                      <TouchableOpacity
                        style={{
                          height: 20,
                          width: 20,
                          borderRadius: 100,
                          borderWidth: 2,
                          borderColor: '#8e9890',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                        onPress={() => {
                          setGender(res.key);
                        }}>
                        {gender === res.key && (
                          <View
                            style={{
                              height: 20,
                              width: 20,
                              borderRadius: 100,
                              borderWidth: 2,
                              borderColor: 'red',
                              alignItems: 'center',
                              justifyContent: 'center',
                            }}>
                            <View
                              style={{
                                width: 10,
                                height: 10,
                                borderRadius: 50,
                                backgroundColor: 'red',
                              }}
                            />
                          </View>
                        )}
                      </TouchableOpacity>
                      <Text
                        style={{
                          marginLeft: 5,
                          color: '#05375a',
                          fontSize: 16,
                        }}>
                        {res.text}
                      </Text>
                    </View>
                  );
                })}
              </View>
            </View>
          </View>
          <View style={{margin: 10}}></View>

          <View style={{flex: 1, flexDirection: 'row'}}>
            <View style={{flex: 1, flexDirection: 'column'}}>
              <View style={{flex: 1}}>
                <Text style={styles.text_footer}>District</Text>
                <TouchableOpacity
                  onPress={() => changeModalVisibility(true)}
                  style={styles.action}>
                  <Feather name="map-pin" color="#05375a" size={20} />
                  <TextInput
                    placeholder="Your District"
                    style={styles.textInput}
                    autoCapitalize="none"
                    editable={false}
                    selectTextOnFocus={false}
                    value={searchDistrict}
                    onChangeText={(value) => setSearchDistrict(value)}
                  />
                  <Entypo name="popup" color="#05375a" size={20} />
                </TouchableOpacity>
              </View>
            </View>
            <View style={{flex: 1, flexDirection: 'column', marginLeft: 20}}>
              <View style={{flex: 1}}>
                <Text style={styles.text_footer}>Thana</Text>
                <TouchableOpacity
                  style={styles.action}
                  onPress={() => {
                    searchDistrict
                      ? changeThanaModalVisibility(true)
                      : Alert.alert('Alert!', 'Select District First.', [
                          {
                            text: 'Cancel',
                            onPress: () => console.log('Cancel Pressed'),
                            style: 'cancel',
                          },
                          {
                            text: 'OK',
                            onPress: () => console.log('OK Pressed'),
                          },
                        ]);
                  }}>
                  <Feather name="map-pin" color="#05375a" size={20} />
                  <TextInput
                    placeholder="Your Thana"
                    style={styles.textInput}
                    autoCapitalize="none"
                    editable={false}
                    selectTextOnFocus={false}
                    value={searchZone}
                    onChangeText={(value) => setSearchZone(value)}
                  />
                  <Entypo name="popup" color="#05375a" size={20} />
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <View style={{margin: 10}}></View>
          <View
            style={{
              flex: 1,
            }}>
            <Text style={styles.text_footer}>Blood Group</Text>
            <View style={[styles.action]}>
              {bloodGroup.map((res) => {
                return (
                  <View
                    key={res.key}
                    style={{
                      alignItems: 'center',
                      justifyContent: 'center',
                      flex: 1,
                      marginBottom: 14,
                    }}>
                    <TouchableOpacity
                      style={{
                        height: 20,
                        width: 20,
                        borderRadius: 100,
                        borderWidth: 2,
                        borderColor: '#8e9890',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                      onPress={() => {
                        setBlood(res.key);
                      }}>
                      {blood === res.key && (
                        <View
                          style={{
                            height: 20,
                            width: 20,
                            borderRadius: 100,
                            borderWidth: 2,
                            borderColor: 'red',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}>
                          <View
                            style={{
                              width: 10,
                              height: 10,
                              borderRadius: 50,
                              backgroundColor: 'red',
                            }}
                          />
                        </View>
                      )}
                    </TouchableOpacity>
                    <Text
                      style={{
                        color: '#05375a',
                        fontSize: 16,
                        marginTop: 5,
                      }}>
                      {res.text}
                    </Text>
                  </View>
                );
              })}
            </View>
          </View>
          <View style={{margin: 10}}></View>
          <View style={{flex: 1}}>
            <Text style={styles.text_footer}> Last Date of Blood Donation</Text>
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                marginTop: 10,
                borderBottomWidth: 1,
                borderBottomColor: '#f2f2f2',
                paddingBottom: 5,
                height: 35,
              }}
              onPress={showDonateDatePicker}>
              <Feather name="calendar" color="#05375a" size={20} />
              <Text style={{marginLeft: 10}}>{getDonationDate}</Text>
              {/* <TextInput
                  placeholder="Age"
                  style={styles.textInput}
                  autoCapitalize="none"
                  onChangeText={(value) => ageInputChange(value)}
                /> */}
            </TouchableOpacity>
            <DateTimePickerModal
              isVisible={isDonateDatePickerVisible}
              mode="date"
              locale="bn_BD"
              onConfirm={handleDonateDateConfirm}
              onCancel={hideDonateDatePicker}
            />
          </View>
          <View style={{margin: 10}}></View>
          <View style={{flex: 1}}>
            <Text style={styles.text_footer}>Blood Bank</Text>
            <TouchableOpacity
              style={styles.action}
              onPress={() => {
                searchZone
                  ? changeBankModalVisibility(true)
                  : Alert.alert('Alert!', 'Select District & Thana First.', [
                      {
                        text: 'Cancel',
                        onPress: () => console.log('Cancel Pressed'),
                        style: 'cancel',
                      },
                      {
                        text: 'OK',
                        onPress: () => console.log('OK Pressed'),
                      },
                    ]);
              }}>
              <Feather name="briefcase" color="#05375a" size={20} />
              <TextInput
                placeholder="Select Your Bank"
                style={styles.textInput}
                editable={false}
                selectTextOnFocus={false}
                value={searchBanks}
                onChangeText={(value) => setSearchBanks(value)}
              />
              <Entypo name="popup" color="#05375a" size={20} />
            </TouchableOpacity>
          </View>
          <View style={styles.button}>
            <TouchableOpacity
              style={[styles.signIn, {borderColor: '#d1001c', borderWidth: 1}]}
              onPress={() => {
                fetch('http://bloodbank.clonestudiobd.com/api/donor', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                  },
                  body: JSON.stringify({
                    banks_id: bankId,
                    name: data.name,
                    password: data.password,
                    district: searchDistrict,
                    zone: searchZone,
                    gender: gender,
                    phone: data.phoneNumber,
                    email: data.email,
                    address: `${searchZone}, ${searchDistrict}`,
                    blood: blood,
                    age: donorAge,
                    date: getDonationDate,
                    dob: getBirthDate,
                  }),
                }).then((response) => {
                  const getStatus = response.status;
                  console.log('res', response.data);

                  if (getStatus === 200) {
                    console.log(response.status);
                    response.json().then((result) => {
                      if (result.message) {
                        Alert.alert(
                          'Welcome back! You are already a donor.',
                          'Please login with your email & password',
                          [
                            {
                              text: 'forgot password?',
                              onPress: () =>
                                console.log('Ask me later pressed'),
                            },
                            {
                              text: 'Cancel',
                              onPress: () => console.log('Cancel Pressed'),
                              style: 'cancel',
                            },
                            {
                              text: 'OK',
                              onPress: () => {
                                console.log('OK Pressed'),
                                  setData({
                                    name: '',
                                    email: '',
                                    password: '',
                                    confirmPassword: '',
                                    phoneNumber: '',
                                    age: '',
                                    check_textInputChange: false,
                                    secureTextEntry: true,
                                  });
                                setGender('');
                                setBlood('');
                                setSearchDistrict('');
                                setSearchZone('');
                                setSearchBanks('');
                                navigation.navigate('Profile');
                              },
                            },
                          ],
                          {cancelable: false},
                        );
                      } else {
                        Alert.alert(
                          'Registration Successful.',
                          'login Now!',
                          [
                            {
                              text: 'Cancel',
                              onPress: () => console.log('Cancel Pressed'),
                              style: 'cancel',
                            },
                            {
                              text: 'OK',
                              onPress: () => {
                                console.log('OK Pressed'),
                                  setData({
                                    name: '',
                                    email: '',
                                    password: '',
                                    confirmPassword: '',
                                    phoneNumber: '',
                                    age: '',
                                    check_textInputChange: false,
                                    secureTextEntry: true,
                                  });
                                setGender('');
                                setBlood('');
                                setSearchDistrict('');
                                setSearchZone('');
                                setSearchBanks('');
                                navigation.navigate('Profile');
                              },
                            },
                          ],
                          {cancelable: false},
                        );
                      }
                    });
                  } else {
                    Alert.alert(
                      'Registration failed',
                      'My Alert Msg',
                      [
                        {
                          text: 'Ask me later',
                          onPress: () => console.log('Ask me later pressed'),
                        },
                        {
                          text: 'Cancel',
                          onPress: () => console.log('Cancel Pressed'),
                          style: 'cancel',
                        },
                        {text: 'OK', onPress: () => console.log('OK Pressed')},
                      ],
                      {cancelable: false},
                    );
                  }
                });
              }}>
              <LinearGradient
                style={styles.signIn}
                colors={['#d1001c', '#650000']}>
                <Text style={[styles.textSign, {color: 'white'}]}>
                  Register as Donor
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>
        <Modal
          transparent={true}
          animationType="fade"
          visible={isModalVisible}
          nRequestClose={() => changeModalVisibility(false)}>
          <ModalPicker
            changeModalVisibility={changeModalVisibility}
            setData={setDistrictData}
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
          />
        </Modal>
        <Modal
          transparent={true}
          animationType="fade"
          visible={isBankModalVisible}
          nRequestClose={() => changeBankVisibility(false)}>
          <BankModalPicker
            changeModalVisibility={changeBankModalVisibility}
            setData={setBankData}
            categories={bankList}
          />
        </Modal>
      </ScrollView>
    </KeyboardAwareScrollView>
  );
};
export default SignUp;

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
