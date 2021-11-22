import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Image,
  Dimensions,
  ScrollView,
  Pressable,
  Text,
} from 'react-native';
import defibrilator from './public/defibrillator.png';
import MapContainer from './components/MapContainer';
import * as Location from 'expo-location';
import { Button } from 'react-native-paper';
import Markers from './context/Markers';
import { getDistance, getPreciseDistance } from 'geolib';
import ModalInfo from './components/ModalInfo';
import SearchDefi from './components/SearchDefi';
const titlePic = './public/title.png';

const App = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [defiLocations, setDefiLocations] = useState([
    {
      id: 1,
      text: 'רחוב ירושלים 30',
      descraption: 'נמצא בחדר המזכירות',
      latitude: 32.175646608398374,
      longitude: 34.90586940230236,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    },
    {
      id: 2,

      text: "היכל התרבות - רח' ירושלים 33",
      descraption: 'נמצא בחדר המזכירות',
      latitude: 32.17688955969956,
      longitude: 34.90512290059718,
    },
    {
      id: 3,

      text: 'קריית ספיר - רחוב ירושלים 35',
      descraption: 'נמצא בחדר המזכירות',
      latitude: 32.17772536660284,
      longitude: 34.906077002302226,
    },
    {
      id: 4,

      text: 'משרדי הנהלת הפארק העירוני',
      descraption: 'נמצא בחדר המזכירות',
      latitude: 32.18069730709977,
      longitude: 34.92550362609634,
    },
    {
      id: 5,

      text: 'לשכת ראש העיר - ויצמן 135',
      descraption: 'נמצא בחדר המזכירות',
      latitude: 32.17468108125034,
      longitude: 34.912357073466,
    },
    {
      id: 6,

      text: "בניין מס' 7 בעירייה - ויצמן 135 ",
      descraption: 'נמצא בחדר המזכירות',
      latitude: 32.174714028860734,
      longitude: 34.91252152423528,
    },
    {
      id: 7,
      text: 'בנין מפעל המים - וייצמן 135  ',
      descraption: 'נמצא בחדר המזכירות',
      latitude: 32.1747526239092,
      longitude: 34.91221575240174,
    },
    {
      id: 8,
      text: 'משרדי אגף הביטחון ברחוב ויצמן 136  ',
      descraption: 'נמצא בחדר המזכירות',
      latitude: 32.1745790272373,
      longitude: 34.910990592752306,
    },
    {
      id: 9,
      text: 'משרדי השיטור העירוני – תל חי 68',
      descraption: 'נמצא בחדר המזכירות',
      latitude: 32.17868466804854,
      longitude: 34.91574623005896,
    },
    {
      id: 10,
      text: 'מרכז הנוער העירוני – רחוב דוד אלעזר 3',
      descraption: 'נמצא בחדר המזכירות',
      latitude: 32.17868466804854,
      longitude: 34.91574623005896,
    },
    {
      id: 11,
      text: 'הגלריה 29 - רחוב גלר 29',
      descraption: 'נמצא בחדר המזכירות',
      latitude: 32.17868466804854,
      longitude: 34.91574623005896,
    },
    {
      id: 12,
      text: 'מחלקת רווחה- רחוב הכרמל 43',
      descraption: 'נמצא בחדר המזכירות',
      latitude: 32.17817660040508,
      longitude: 34.91010584462965,
    },
    {
      id: 13,
      text: 'מרכז לוגיסטי עירוני  – יוחנן הסנדלר 11',
      descraption: 'נמצא בחדר המזכירות',
      latitude: 32.17543440013257,
      longitude: 34.928469673466076,
    },
    {
      id: 14,
      text: 'אשכול לוי 8 - עמדת פיס',
      descraption: 'נמצא בחדר המזכירות',
      latitude: 32.18267662045813,
      longitude: 34.9388507446296,
    },
    {
      id: 15,
      text: 'התע"ש 10 - עמדת פיס',
      descraption: 'נמצא בחדר המזכירות',
      latitude: 32.1736044348629,
      longitude: 34.92589079371244,
    },
    {
      id: 16,
      text: 'ויצמן 125 בכניסה לשוק – עמדת פיס',
      descraption: 'נמצא בחדר המזכירות',
      latitude: 32.174992524740404,
      longitude: 34.91035507346608,
    },
    {
      id: 18,
      text: 'מרכז הצעירים העירוני - רחוב גיבורי ישראל 4 (חצר השוק)',
      descraption: 'נמצא בחדר המזכירות',
      latitude: 32.17545881711662,
      longitude: 34.91031102894087,
    },
    {
      id: 17,
      text: 'רחוב ירושלים 52 - בחזית המרכז הוטרינרי',
      descraption: 'נמצא בחדר המזכירות',
      latitude: 32.178357200423086,
      longitude: 34.90686357346592,
    },
  ]);

  const [location, setLocation] = useState({});
  const [errorMsg, setErrorMsg] = useState(null);
  const [userLocation, setUserLocation] = useState({
    latitude: 0,
    longitude: 0,
  });
  const [focusMap, setFocusMap] = useState(userLocation);

  const defiSearch = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      setErrorMsg('Permission to access location was denied');
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    let text = 'Waiting..';
    if (errorMsg) {
      text = errorMsg;
    } else if (location) {
      text = JSON.stringify(location);
      let tempObj = JSON.parse(text);
      setUserLocation({
        latitude: tempObj.coords.latitude,
        longitude: tempObj.coords.longitude,
      });
    }
  };
  useEffect(() => {
    defiSearch();
  }, []);
  const handleClick = () => {
    console.log(userLocation);
    let index = 0;
    let dis = getDistance(
      {
        latitude: userLocation.latitude,
        longitude: userLocation.longitude,
      },
      {
        latitude: defiLocations[0].latitude,
        longitude: defiLocations[0].longitude,
      }
    );
    for (let i = 1; i < defiLocations.length; i++) {
      let tempDis = getDistance(
        {
          latitude: userLocation.latitude,
          longitude: userLocation.longitude,
        },
        {
          latitude: defiLocations[i].latitude,
          longitude: defiLocations[i].longitude,
        }
      );
      if (tempDis < dis) {
        dis = tempDis;
        index = i;
      }
    }
    setModalVisible(true);
    setLocation(defiLocations[index]);
    setFocusMap(defiLocations[index]);
    console.log(index);
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.container}>
          <ModalInfo
            location={location}
            modalVisible={modalVisible}
            setModalVisible={setModalVisible}
          />
          <View style={styles.headerContainer}>
            <Image source={require('./public/title.png')} style={styles.img} />
          </View>
          <Markers.Provider value={{ defiLocations }}>
            <View>
              <MapContainer
                style={{ position: 'absolute' }}
                focusMap={focusMap}
                userLocation={userLocation}
                setFocusMap={setFocusMap}
              />
            </View>
          </Markers.Provider>
          <Text
            style={{ marginHorizontal: 25, fontSize: 16, textAlign: 'center' }}
          >
            By clicking you will get the location of the nearest defibrillator
          </Text>
          <View style={styles.buttonContainer}>
            <Pressable onPress={() => handleClick()}>
              <Image
                source={require('./public/defibrillator.png')}
                style={styles.imgButton}
              />
            </Pressable>
          </View>
          <View style={styles.searchContainer}>
            <SearchDefi
              defiLocations={defiLocations}
              setFocusMap={setFocusMap}
            />
          </View>
          <StatusBar style='auto' />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 15,
    backgroundColor: '#fff',
    alignItems: 'center',
    width: Dimensions.get('window').width,
  },

  headerContainer: {},
  img: {
    alignSelf: 'center',
    width: Dimensions.get('window').width,
  },

  buttonContainer: {
    margin: 10,
    backgroundColor: '#4ea44a',
    borderRadius: 100,
    borderColor: 'orange',
    // backgroundColor: 'orange',
    borderWidth: 5,
  },
  imgButton: {
    width: 80,
    height: 80,
    margin: 20,
  },
});
export default App;
