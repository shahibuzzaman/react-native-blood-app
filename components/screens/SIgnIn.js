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
  Alert,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import AsyncStorage from '@react-native-async-storage/async-storage';
import UserProfile from '../screens/Profile';

const SignIn = ({navigation}) => {
  const [data, setData] = useState({
    email: '',
    password: '',
    check_textInputChange: false,
    secureTextEntry: true,
  });
  const [login, setLogin] = useState('false');

  const [getLoginValue, setLoginValue] = useState('');

  const textInputChange = (value) => {
    if (value.length !== 0) {
      setData({
        ...data,
        email: value,
        check_textInputChange: true,
      });
    } else {
      setData({
        ...data,
        email: value,
        check_textInputChange: false,
      });
    }
  };

  const handlePasswordChange = (value) => {
    setData({
      ...data,
      password: value,
    });
  };

  const updateSecureTextEntry = () => {
    setData({
      ...data,
      secureTextEntry: !data.secureTextEntry,
    });
  };

  const loginAction = async () => {
    try {
      await fetch('http://bloodbank.clonestudiobd.com/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: data.email,
          password: data.password,
        }),
      }).then((response) => {
        const getStatus = response.status;
        console.log(getStatus);

        if (getStatus === 200) {
          response
            .json()
            .then(async (result) => {
              console.log('token', result.access_token);
              await AsyncStorage.setItem(
                'login',
                JSON.stringify({
                  getToken: result.access_token,
                }),
              );

              loginData();
            })
            .catch((error) => {
              console.error(error);
            });
        } else {
          Alert.alert(
            'Invalid email or password!',
            '',
            [
              {
                text: 'OK',
                onPress: () => {
                  setData({
                    email: '',
                    password: '',
                    check_textInputChange: false,
                    secureTextEntry: true,
                  }),
                    console.log('OK Pressed');
                },
              },
            ],
            {cancelable: false},
          );
        }
      });
    } catch (e) {}
  };

  // const loginGetData = async () => {
  //   try {
  //     const value = await AsyncStorage.getItem('login');
  //     const loginValue = JSON.parse(value);

  //     if (loginValue != null) {
  //       console.log(loginValue);
  //     }
  //   } catch (e) {}
  // }

  const loginData = async () => {
    try {
      let value = await AsyncStorage.getItem('login');

      if (value !== null) {
        setLoginValue(JSON.parse(value));
      }
      mainData();
    } catch (e) {}
  };

  const logout = async () => {
    try {
      let value = await AsyncStorage.getItem('login');
      await AsyncStorage.removeItem(value);
      setLoginValue('');
      await AsyncStorage.clear();
    } catch (e) {}
  };

  useEffect(() => {
    loginData();
  }, []);

  console.log('1st', getLoginValue);

  if (getLoginValue.getToken != null) {
    return (
      <View style={{flex: 1}}>
        <UserProfile
          navigation={navigation}
          getLoginValue={getLoginValue}
          logout={logout}
        />
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.text_header}>Welcome!</Text>
        </View>
        <View style={styles.footer}>
          <Text style={styles.text_footer}>Email</Text>
          <View style={styles.action}>
            <FontAwesome name="user-o" color="#05375a" size={20} />
            <TextInput
              placeholder="Your Email"
              style={styles.textInput}
              autoCapitalize="none"
              onChangeText={(value) => textInputChange(value)}
            />
            {data.check_textInputChange ? (
              <Animatable.View animation="bounceIn">
                <Feather name="check-circle" color="green" size={20} />
              </Animatable.View>
            ) : null}
          </View>
          <View style={{padding: 20}}></View>
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
            <TouchableOpacity onPress={updateSecureTextEntry}>
              {data.secureTextEntry ? (
                <Feather name="eye-off" color="grey" size={20} />
              ) : (
                <Feather name="eye" color="grey" size={20} />
              )}
            </TouchableOpacity>
          </View>
          <View style={{flex: 1}}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                loginAction();
                setData({
                  name: '',
                  email: '',
                });
              }}>
              <LinearGradient
                style={styles.signIn}
                colors={['#d1001c', '#650000']}>
                <Text style={[styles.textSign, {color: 'white'}]}>Sign In</Text>
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => navigation.navigate('SignUp')}
              style={[
                styles.signIn,
                {borderColor: '#d1001c', borderWidth: 1, marginTop: 15},
              ]}>
              <Text style={[styles.textSign, {color: '#d1001c'}]}>
                Be A Donor
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
};
export default SignIn;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#d1001c',
  },
  header: {
    flex: 1,
    justifyContent: 'center',
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
