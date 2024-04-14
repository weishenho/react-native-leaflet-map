import * as React from 'react';
import { useState } from 'react';

import { StyleSheet, View } from 'react-native';
import LeafletMapView, {
  LeafletWebViewEventTags,
  type LeafletWebViewEvent,
  type LatLngLiteral,
  type MapMarker,
} from 'react-native-leaflet-map';

import hawkersJSON from './hawkers.json';

type ISelectedLocation = {
  coordinate?: LatLngLiteral;
};

const markers = hawkersJSON.SrchResults.map((data) => {
  const [lat, lng] = data.LatLng.split(',').map((d) => Number(d));
  return {
    id: data.LatLng,
    icon: 'https://cdn-icons-png.flaticon.com/128/5193/5193665.png',
    size: [40, 40],
    iconAnchor: [20, 40],
    position: {
      lat: lat,
      lng: lng,
    },
  } as MapMarker;
});

export default function App() {
  const [selectedLocation, setSelectedLocation] =
    useState<ISelectedLocation | null>();

  const onLeafletMessageReceivedHandler = (event: LeafletWebViewEvent) => {
    if (event.tag === LeafletWebViewEventTags.onMapClicked) {
      if (!event.location) return;
      console.log({ selectedLocation });
      setSelectedLocation({
        coordinate: event.location,
      });
    }
  };

  return (
    <View style={styles.container}>
      <LeafletMapView
        mapLayers={[
          {
            baseLayer: true,
            url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
            attribution:
              '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
            minNativeZoom: 11,
            maxNativeZoom: 18,
            minZoom: 11,
            maxZoom: 20,
            // bounds: ONEMAP_MAX_BOUNDS,
          },
        ]}
        mapClusterMarkers={{
          mapMarkers: markers,
          maxClusterRadius: 100,
          clusterIcon:
            'https://cdn-icons-png.flaticon.com/128/5193/5193665.png',
          clusterIconSize: [40, 40],
          clusterIconAnchor: [40 / 2, 40],
        }}
        onMessage={onLeafletMessageReceivedHandler}
        mapCenterPosition={{ lat: 1.358479, lng: 103.815201 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
