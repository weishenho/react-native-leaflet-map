import * as React from 'react';
import { useState } from 'react';

import { StyleSheet, View } from 'react-native';
import LeafletMapView, {
  LeafletWebViewEventTags,
  type LeafletWebViewEvent,
  type LatLngLiteral,
} from 'react-native-leaflet-map';

type ISelectedLocation = {
  coordinate?: LatLngLiteral;
};

export default function App() {
  const [selectedLocation, setSelectedLocation] =
    useState<ISelectedLocation | null>();

  const onLeafletMessageReceivedHandler = (event: LeafletWebViewEvent) => {
    if (event.tag === LeafletWebViewEventTags.onMapClicked) {
      if (!event.location) return;

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
        mapMarkers={
          selectedLocation?.coordinate
            ? [
                {
                  id: 'location-marker',
                  icon: 'https://cdn-icons-png.flaticon.com/64/2776/2776067.png',
                  size: [64, 64],
                  iconAnchor: [32, 64],
                  position: selectedLocation?.coordinate,
                },
              ]
            : undefined
        }
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
