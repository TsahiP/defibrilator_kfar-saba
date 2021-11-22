import React, { useContext, useEffect, useState } from 'react';
import MapView, { Marker, Callout } from 'react-native-maps';
import { StyleSheet, Text, View, Dimensions, ScrollView } from 'react-native';
import Markers from '../context/Markers';
const MapContainer = ({ focusMap, userLocation, setFocusMap }) => {
  const mapRef = React.createRef();

  const { defiLocations } = useContext(Markers);

  useEffect(() => {
    console.log('here we go');
    const latitude = focusMap.latitude;
    const longitude = focusMap.longitude;
    mapRef.current.animateToRegion(
      {
        latitude,
        longitude,
        latitudeDelta: 0.0022,
        longitudeDelta: 0.0021,
      },
      1000
    );
  }, [focusMap]);

  const handlerRegionChange = region => {
    console.log(region);
    changeRegion(region, mapRef);
  };

  // const changeRegion = (region, mapRef) => {

  return (
    <View style={styles.container}>
      <View>
        <MapView
          ref={mapRef}
          style={styles.map}
          showsUserLocation={true}
          followsUserLocation={true}
          showsMyLocationButton={true}
          initialRegion={{
            latitude: 32.17699572626013,
            longitude: 34.90404135251345,
            latitudeDelta: 0.0062,
            longitudeDelta: 0.006,
          }}
          // onRegionChange={handlerRegionChange}
        >
          {defiLocations.map(location => (
            <Marker
              key={location.id}
              pinColor='#000'
              title={location.text}
              descraption={location.descraption}
              coordinate={{
                latitude: location.latitude,
                longitude: location.longitude,
              }}
            >
              <Callout>
                <Text>{location.text}</Text>
                <Text>{location.descraption}</Text>
              </Callout>
            </Marker>
          ))}
        </MapView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('window').width / 2,
    height: Dimensions.get('window').height / 2,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  map: {
    flex: 1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});

export default MapContainer;
