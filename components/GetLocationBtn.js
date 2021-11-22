import * as React from 'react';
import { View } from 'react-native';
import { Button } from 'react-native-paper';

const GetLocationBtn = ({ getLocation }) => {
  const getLocate = () => {
    console.log('here');
    () => getLocation;
  };
  return (
    <View>
      <Button mode='outlined' onPress={getLocation}>
        get Defi
      </Button>
    </View>
  );
  // _getLocationAsync = async () => {
  //   try {
  //     let { status } = await Permissions.askAsync;
  //   } catch (e) {
  //     console.log(e);
  //   }
  // };
};
export default GetLocationBtn;
