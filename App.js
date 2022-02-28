import React, { useState } from "react";
import MapView, { Marker } from 'react-native-maps';
import { Button, TextInput, StyleSheet, View, Dimensions} from 'react-native';

export default function App() {
  const [findAddress, setFindAddress] = useState("");
  const [location, setLocation] = useState({ lat: 60.200692, lng: 24.93402 });

  const getAddress = () => {
    let url =
      "http://www.mapquestapi.com/geocoding/v1/address?key=hAtGQLy0q0WLD4ApsYRqeiTwCl5IRbwv&location=" +
      findAddress;
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          console.log(data.results[0].locations[0].latLng);
          setLocation(data.results[0].locations[0].latLng);
        });
    };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: location.lat,
          longitude: location.lng,
          latitudeDelta: 0.0322,
          longitudeDelta: 0.0221,
        }}
        region={{
          latitude: location.lat,
          longitude: location.lng,
          latitudeDelta: 0.0322,
          longitudeDelta: 0.0221,
        }}
      >

        <Marker
          coordinate={{
            latitude: location.lat,
            longitude: location.lng,
          }}
        />
      </MapView>
      <View style={{ flex: 1 }}>
        <TextInput
          style={styles.input}
          placeholder="Write an address"
          onChangeText={(findAddress) => setFindAddress(findAddress)}
          value={findAddress}
        />
        <Button
          style={styles.buttons}
          title="Find"
          onPress={() => getAddress()}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
    flex: 7,
  },
  input: {
    textAlign: 'center',
    borderColor: "red",
    borderWidth: 2,
    margin: 3,
    height: 100,
    width: 300,
    flex: 1,
  },
  button: {
    width: 400,
    borderWidth: 1,
  },
});