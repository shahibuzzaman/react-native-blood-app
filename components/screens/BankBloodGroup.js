import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
const {width, height} = Dimensions.get('window');

const BankBloodGroup = ({navigation, route}) => {
  const categories = [
    {
      id: 1,
      title: 'A+',
      image: require('../assets/Apos.png'),
    },
    {
      id: 2,
      title: 'O+',
      image: require('../assets/Opos.png'),
    },
    {
      id: 3,
      title: 'B+',
      image: require('../assets/Bpos.png'),
    },
    {
      id: 4,
      title: 'AB+',
      image: require('../assets/ABpos.png'),
    },
    {
      id: 5,
      title: 'A-',
      image: require('../assets/Aneg.png'),
    },
    {
      id: 6,
      title: 'O-',
      image: require('../assets/Oneg.png'),
    },
    {
      id: 7,
      title: 'B-',
      image: require('../assets/Bneg.png'),
    },
    {
      id: 8,
      title: 'AB-',
      image: require('../assets/ABneg.png'),
    },
  ];

  const {bank_id} = route.params;

  return (
    <View style={styles.container}>
      <View style={styles.bankContainer}>
        <Text>Hello</Text>
      </View>
      <View style={styles.bloodGroupContainer}>
        <FlatList
          data={categories}
          showsVerticalScrollIndicator={false}
          numColumns={4}
          keyExtractor={(item) => String(item.id)}
          renderItem={({item}) => (
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              {/* <Button
                title={item.title}
                onPress={() => navigation.navigate(`${item.title}`)}
              /> */}
              <TouchableOpacity
                style={styles.item}
                onPress={() => {
                  navigation.navigate(`${item.title}`, {
                    bank_id: bank_id,
                    blood_group: item.title,
                  });
                }}>
                <Image
                  source={item.image}
                  style={{width: 80, height: 80, resizeMode: 'center'}}
                />
                {/* <Text style={styles.text} numberOfLines={2}>
                  {item.title}
                </Text> */}
              </TouchableOpacity>
            </View>
          )}
        />
      </View>
    </View>
  );
};

export default BankBloodGroup;

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: 'white',
  },
  bankContainer: {
    flex: 1,
    backgroundColor: '#d1001c',
  },
  bloodGroupContainer: {
    flex: 1,
    marginTop: 50,
  },
  item: {
    flex: 1,
    height: width / 4,
    width: width / 5,
    backgroundColor: 'white',
    borderColor: '#d1001c',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 40,
    margin: 5,
  },
});
