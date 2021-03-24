import React, {useState, useEffect} from 'react';
import {View, Text} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';

const FindDonor = ({navigation}) => {
  const [isLoading, setLoading] = useState(true);
  const [getData, SetData] = useState([]);

  const url = 'http://192.168.0.13/api/blooddonar';

  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((json) => SetData(json))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    console.log('data22', getData);
  }, []);
  const keyExtractor = (item) => String(item.id);
  return (
    <View>
      <FlatList
        data={getData}
        keyExtractor={keyExtractor}
        renderItem={({item}) => (
          <View>
            <Text>{item.name}</Text>
          </View>
        )}
      />
    </View>
  );
};
export default FindDonor;
