import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  Button,
  StatusBar,
  Image,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import HomeScreen from './components/screens/HomeScreen';
import ProfileScreen from './components/screens/ProfileScreen';
import SearchScreen from './components/screens/SearchScreen';
import BloodBank from './components/screens/BloodBankCreate';
import BloodRequest from './components/screens/BloodRequest';
import UpcomingEvent from './components/screens/UpcomingEvent';
import FindDonor from './components/screens/FindDonor';
import SignUp from './components/screens/SignUp';
import UserProfile from './components/screens/Profile';
import AposBlood from './components/screens/bloodGroup/AposBlood';
import OposBlood from './components/screens/bloodGroup/OposBlood';
import BposBlood from './components/screens/bloodGroup/BposBlood';
import ABposBlood from './components/screens/bloodGroup/ABposBlood';
import AnegBlood from './components/screens/bloodGroup/AnegBlood';
import OnegBlood from './components/screens/bloodGroup/OnegBlood';
import BnegBlood from './components/screens/bloodGroup/BnegBlood';
import ABnegBlood from './components/screens/bloodGroup/ABnegBlood';
import DonorDetails from './components/screens/DonorDetails';
import BankDetails from './components/screens/BankDetails';
import BankBloodGroup from './components/screens/BankBloodGroup';
import BloodBanks from './components/screens/BloodBanks';
import DonorDetailsEdit from './components/screens/DonorDetailsEdit';
import Icon from 'react-native-vector-icons/Fontisto';

const LogoTitle = () => {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Icon name="blood-drop" size={30} color="#d1001c" />
      <Text
        style={{
          fontSize: 30,
          fontWeight: 'bold',
          marginLeft: 10,
          color: '#d1001c',
        }}>
        Red Drop
      </Text>
    </View>
  );
};

// const SplashScreen = ({navigation}) => {
//   setTimeout(() => {
//     navigation.navigate('Profile');
//   }, 3000);
//   return (
//     <View
//       style={{
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//         backgroundColor: 'white',
//       }}>
//       <Text>Splash Screen</Text>
//     </View>
//   );
// };

const HomeStack = createStackNavigator();

const HomeStackScreen = () => {
  return (
    <HomeStack.Navigator>
      {/* <HomeStack.Screen
        name="Splash Screen"
        component={SplashScreen}
        options={({navigation}) => ({
          tabBarVisible: false,
        })}
      /> */}
      <HomeStack.Screen
        name="Home"
        component={HomeScreen}
        options={({navigation}) => ({
          headerTitle: (props) => <LogoTitle {...props} />,
          headerTitleStyle: {flex: 1, textAlign: 'center'},
        })}
      />
      <HomeStack.Screen
        name="A+"
        component={AposBlood}
        options={({navigation}) => ({
          headerTitleStyle: {alignSelf: 'center', marginLeft: -50},
          title: 'A+ Blood Donors',
        })}
      />
      <HomeStack.Screen
        name="SignUp"
        component={SignUp}
        options={({navigation}) => ({
          title: '',
          headerShown: false,
        })}
      />
      <HomeStack.Screen
        name="Profile"
        component={ProfileScreen}
        options={({navigation}) => ({
          title: '',
          headerShown: false,
        })}
      />
      <HomeStack.Screen
        name="BloodBank"
        component={BloodBank}
        options={({navigation}) => ({
          title: '',
          headerShown: false,
        })}
      />
      <HomeStack.Screen
        name="O+"
        component={OposBlood}
        options={({navigation}) => ({
          headerTitleStyle: {alignSelf: 'center', marginLeft: -50},
          title: 'O+ Blood Donors',
        })}
      />
      <HomeStack.Screen
        name="B+"
        component={BposBlood}
        options={({navigation}) => ({
          headerTitleStyle: {alignSelf: 'center', marginLeft: -50},
          title: 'B+ Blood Donors',
        })}
      />
      <HomeStack.Screen
        name="AB+"
        component={ABposBlood}
        options={({navigation}) => ({
          headerTitleStyle: {alignSelf: 'center', marginLeft: -50},
          title: 'AB+ Blood Donors',
        })}
      />
      <HomeStack.Screen
        name="A-"
        component={AnegBlood}
        options={({navigation}) => ({
          headerTitleStyle: {alignSelf: 'center', marginLeft: -50},
          title: 'A- Blood Donors',
        })}
      />
      <HomeStack.Screen
        name="O-"
        component={OnegBlood}
        options={({navigation}) => ({
          headerTitleStyle: {alignSelf: 'center', marginLeft: -50},
          title: '0- Blood Donors',
        })}
      />
      <HomeStack.Screen
        name="B-"
        component={BnegBlood}
        options={({navigation}) => ({
          headerTitleStyle: {alignSelf: 'center', marginLeft: -50},
          title: 'B- Blood Donors',
        })}
      />
      <HomeStack.Screen
        name="AB-"
        component={ABnegBlood}
        options={({navigation}) => ({
          headerTitleStyle: {alignSelf: 'center', marginLeft: -50},
          title: 'AB- Blood Donors',
        })}
      />
      <HomeStack.Screen
        name="Banks Blood"
        component={BankBloodGroup}
        options={({navigation}) => ({
          title: '',
        })}
      />
      <HomeStack.Screen
        name="BloodBanks"
        component={BloodBanks}
        options={({navigation}) => ({
          title: '',
        })}
      />
    </HomeStack.Navigator>
  );
};

const ProfileStack = createStackNavigator();

const ProfileStackScreen = () => {
  return (
    <ProfileStack.Navigator>
      <ProfileStack.Screen
        name="Profile"
        component={ProfileScreen}
        options={({navigation}) => ({
          title: '',
          headerShown: false,
        })}
      />
      <ProfileStack.Screen
        name="Donor"
        component={DonorDetails}
        options={({navigation}) => ({
          title: '',
        })}
      />
      <ProfileStack.Screen
        name="Bank"
        component={BankDetails}
        options={({navigation}) => ({
          title: '',
          headerShown: false,
        })}
      />
      <ProfileStack.Screen
        name="SignUp"
        component={SignUp}
        options={({navigation}) => ({
          title: '',
          headerShown: false,
        })}
      />
      <ProfileStack.Screen
        name="UserProfile"
        component={UserProfile}
        options={({navigation}) => ({
          title: '',
          headerShown: false,
        })}
      />
      <ProfileStack.Screen
        name="Donor Edit"
        component={DonorDetailsEdit}
        options={({navigation}) => ({
          title: '',
          headerShown: false,
        })}
      />
    </ProfileStack.Navigator>
  );
};

const SearchStack = createStackNavigator();

const SearchStackScreen = () => {
  return (
    <SearchStack.Navigator>
      <SearchStack.Screen name="Search" component={SearchScreen} />
    </SearchStack.Navigator>
  );
};

const Tab = createBottomTabNavigator();

const App = () => {
  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#d1001c" />
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({route}) => ({
            tabBarIcon: ({focused, color, size}) => {
              if (route.name === 'Home') {
                return (
                  <Ionicons
                    name={focused ? 'ios-home' : 'ios-home'}
                    size={size}
                    color={color}
                  />
                );
              } else if (route.name === 'Search') {
                return (
                  <Ionicons
                    name={
                      focused
                        ? 'ios-search-circle'
                        : 'ios-search-circle-outline'
                    }
                    size={30}
                    color={color}
                  />
                );
              } else if (route.name === 'Profile') {
                return (
                  <Ionicons
                    name={focused ? 'person-circle' : 'person-circle-outline'}
                    size={28}
                    color={color}
                  />
                );
              }
            },
          })}
          tabBarOptions={{
            activeTintColor: '#d1001c',
            inactiveTintColor: 'gray',
          }}>
          <Tab.Screen name="Home" component={HomeStackScreen} />
          {/* <Tab.Screen name="Search" component={SearchStackScreen} /> */}
          <Tab.Screen name="Profile" component={ProfileStackScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </>
  );
};
export default App;
