import React, { useState } from 'react';
import { View } from 'react-native';
import { TextInput } from 'react-native-paper';
import { Button } from 'react-native-paper';
import { StyleSheet, Text } from 'react-native';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';
const SearchDefi = ({ defiLocations, setFocusMap }) => {
  const [searchDefi, setSearchDefi] = useState('');
  const [listArr, setListArr] = useState([]);

  const changeHandler = e => {
    setSearchDefi(e);
    console.log(searchDefi);
  };
  const handleClick = () => {
    setListArr(defiLocations.filter(defi => defi.text.includes(searchDefi)));
  };

  const handlePress = id => {
    const location = defiLocations.filter(location => location.id === id);
    console.log(location);
    setFocusMap({
      latitude: location[0].latitude,
      longitude: location[0].longitude,
    });
  };
  return (
    <View>
      <View style={styles.InputeContainer}>
        <TextInput
          style={styles.input}
          label='Search defi'
          value={searchDefi}
          onChangeText={e => changeHandler(e)}
        ></TextInput>
        {/* <View style={styles.space} />
        <Button mode='outlined' onPress={() => handleClick()}>
          search
        </Button> */}
      </View>
      <View style={styles.locationsContainer}>
        {searchDefi === ''
          ? defiLocations.map(location => {
              return (
                <Pressable
                  key={location.id}
                  onPress={() => handlePress(location.id)}
                >
                  <View style={styles.label}>
                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: 'bold',
                        color: '#fff',
                      }}
                    >
                      {location.text}
                    </Text>
                  </View>
                </Pressable>
              );
            })
          : defiLocations
              .filter(defi => defi.text.includes(searchDefi))
              .map(location => {
                console.log(location.text);
                return (
                  <Pressable
                    key={location.id}
                    onPress={() => handlePress(location.id)}
                  >
                    <View style={styles.label}>
                      <Text
                        style={{
                          fontSize: 16,
                          fontWeight: 'bold',
                          color: '#fff',
                        }}
                      >
                        {location.text}
                      </Text>
                    </View>
                  </Pressable>
                );
              })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  InputeContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  space: {
    marginRight: 10,
  },
  input: {
    width: 200,
  },
  label: {
    borderWidth: 2,
    borderColor: 'orange',
    marginBottom: 5,
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 5,
    backgroundColor: '#4ea44a',
  },
  locationsContainer: {
    marginTop: 15,
  },
});

export default SearchDefi;
