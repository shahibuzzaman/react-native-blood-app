import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from 'react-native';

import {windowWidth, windowHeight} from './Dimensions';
import Icon from 'react-native-vector-icons/Ionicons';

const ModalPicker = (props) => {
  const [search, setSearch] = useState('');
  const [clearButtonVisible, setClearButtonVisible] = useState(false);
  const [filteredDistrict, setFilteredDistrict] = useState([]);

  const onPressItem = (item) => {
    props.changeModalVisibility(false);
    props.setData(item);
  };

  const searchInput = (value) => {
    if (value) {
      setSearch(value);
      setClearButtonVisible(true);
    }
  };

  useEffect(() => {
    setFilteredDistrict(
      props.categories.filter((district) =>
        district.name.toLowerCase().includes(search.toLowerCase()),
      ),
    );
  }, [search, props.categories]);

  console.log('ffff', search);

  const option = filteredDistrict.map((item, index) => {
    return (
      <TouchableOpacity
        style={styles.option}
        key={index}
        onPress={() => onPressItem(item)}>
        <View
          style={{
            backgroundColor: '#d1001c',
            width: '90%',
            margin: 10,
            alignItems: 'center',
          }}>
          <Text style={styles.text}> {item.name} </Text>
        </View>
      </TouchableOpacity>
    );
  });
  return (
    <TouchableOpacity
      onPress={() => props.changeModalVisibility(false)}
      style={styles.container}>
      <TouchableOpacity
        onPress={() => props.changeModalVisibility(true)}
        style={[
          styles.modal,
          {width: windowWidth - 20, height: windowHeight / 2},
        ]}>
        <View style={{flex: 1}}>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'row',
              marginHorizontal: 20,
            }}>
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                alignItems: 'center',
                height: 50,
                backgroundColor: 'gray',
                borderRadius: 10,
              }}>
              <Icon name="search" size={25} style={{marginLeft: 10}} />
              <TextInput
                placeholder="Search Thana"
                placeholderTextColor="white"
                style={{
                  marginHorizontal: 10,
                  fontSize: 14,
                  fontWeight: 'bold',
                  color: 'white',
                  flex: 1,
                }}
                onChangeText={(value) => searchInput(value)}
              />
              {search.length ? (
                <TouchableOpacity>
                  <Icon
                    name="close-circle-outline"
                    size={25}
                    style={{marginRight: 10}}
                  />
                </TouchableOpacity>
              ) : null}
            </View>
          </View>
          <View style={{flex: 4}}>
            <ScrollView>{option}</ScrollView>
          </View>
        </View>
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

export default ModalPicker;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#00000099',
  },
  modal: {
    backgroundColor: 'white',
    borderRadius: 10,
  },
  option: {
    alignItems: 'center',
  },
  text: {
    margin: 10,
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
});
