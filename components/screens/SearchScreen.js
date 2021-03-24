import React, {useState} from 'react';
import {View, Text, TextInput, TouchableOpacity} from 'react-native';

const SearchScreen = () => {
  const [display, setDisplay] = useState(false);
  const [search, setSearch] = useState('');

  const ZoneData = [
    {
      upazila: 'Amtali Upazila',
      district: 'Barguna',
      division: 'Barisal',
    },
    {
      upazila: 'Bamna Upazila',
      district: 'Barguna',
      division: 'Barisal',
    },
    {
      upazila: 'Barguna Sadar Upazila',
      district: 'Barguna',
      division: 'Barisal',
    },
    {
      upazila: 'Betagi Upazila',
      district: 'Barguna',
      division: 'Barisal',
    },
  ];

  const updatePokeDex = (poke) => {
    setSearch(poke);
    setDisplay(false);
  };

  console.log('dataa', search);
  return (
    <View>
      <TextInput
        placeholder="Your District"
        style={{
          paddingLeft: 10,
          color: '#05375a',
          borderWidth: 1,
          borderColor: 'black',
          marginTop: 20,
          height: 40,
        }}
        autoCapitalize="none"
        onFocus={() => setDisplay(!display)}
        value={search}
        onChangeText={(value) => setSearch(value)}
      />
      {display && (
        <View>
          {ZoneData.filter(
            ({upazila}) =>
              upazila.toLowerCase().indexOf(search.toLowerCase()) > -1,
          ).map((value, i) => {
            return (
              <TouchableOpacity
                onPress={() => updatePokeDex(value.upazila)}
                key={i}
                tabIndex="0">
                <Text>{value.upazila}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      )}
    </View>
  );
};

export default SearchScreen;
