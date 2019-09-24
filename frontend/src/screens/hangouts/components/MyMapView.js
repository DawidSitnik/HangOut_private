import MapView, { Marker, Circle } from 'react-native-maps';
import React from 'react';
import Colors from '../../../../constants/Colors';

const MyMapView = ({ _this }) => (

  <MapView
    showsUserLocation
    loadingEnabled
    style={{ alignSelf: 'stretch', flex: 0.9 }}
    initialRegion={{
      latitude: _this.state.latitude,
      longitude: _this.state.longitude,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    }}
    onPress={_this.handlePress}
  >

    {_this.state.markers.map((marker) => <Marker key={marker.coordinate} {... marker} />)}

    { _this.state.foundHangouts.map((marker) => (
      <Marker
        key={marker.hangout._id}
        coordinate={marker.hangout.coordinates}
        title={marker.hangout.activity}
        description={`${marker.distance}km from you`}
        onPress={_this.handlePressMarker}
      />
    ))
    }

    <Circle
      key={_this.state.longitude}
      center={{
        latitude: _this.state.latitude,
        longitude: _this.state.longitude,
      }}
      radius={parseFloat(_this.state.howFar)}
      strokeWidth={1}
      strokeColor={Colors.basicDetail}
      fillColor={'rgba(230,238,255,0.5)'}
    />

    {_this.state.foundHangouts.map((marker) => (
      marker.hangout.coordinates.latitude === _this.state.clickedMarkerLatitude
      && marker.hangout.coordinates.longitude === _this.state.clickedMarkerLongitude ?
        <Circle
          key={(marker.hangout._id)}
          center={marker.hangout.coordinates}
          radius={marker.hangout.radius}
          strokeWidth={1}
          strokeColor={Colors.basicDetailDark}
          fillColor={'rgba(230,238,255,0.5)'}
        />
        :
        <Circle
          key={(marker.hangout._id)}
          center={marker.hangout.coordinates}
          radius={0}
          strokeWidth={1}
          strokeColor={Colors.basicDetailDark}
          fillColor={'rgba(230,238,255,0.5)'}
        />
    ))}

  </MapView>

);

export default MyMapView;
