// import { View, StyleSheet } from "react-native";
// import MapView, { MapMarker } from 'react-native-maps';
// import React from "react";



// const MapScreen = ({route})  => {
  
//   const {latitude, longitude } = route.params.location;
//   console.log("route.params.location", route.params.location);
 
//   return(
//     <View style={styles.container}>
//       <MapView style={{flex: 1}} initialRegion={{
//     latitude: latitude,
//     longitude: longitude,
//     latitudeDelta: 0.1,
//     longitudeDelta: 0.1,
//           }}>
//               {/* <MapMarker title='You are here'  coordinate={{ latitude, longitude}} /> */}
//   </MapView>
//     </View>
//   )
  
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   }
// })

// export default MapScreen;
import React from "react";
import { View, StyleSheet } from "react-native";
import MapView, {Marker} from "react-native-maps";


const MapScreen = ({ route }) => {
  const loc = route.params.location;
  console.log("route.params.location", route.params.location);

  return (
    <View style={styles.container}>
      <MapView
        style={{ flex: 1 }}
        region={{
          latitude: loc.coords.latitude,
          longitude: loc.coords.longitude,
          latitudeDelta: 0.001,
          longitudeDelta: 0.005,
        }}
      >

        <Marker
          title="You are here"
  coordinate={{latitude: loc.coords.latitude,
          longitude: loc.coords.longitude}}
/>

      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default MapScreen;