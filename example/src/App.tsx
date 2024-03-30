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
            url: 'https://www.onemap.gov.sg/maps/tiles/Default/{z}/{x}/{y}.png',
            // attribution: attribution,
            // bounds: ONEMAP_MAX_BOUNDS,
            minNativeZoom: 11,
            maxNativeZoom: 18,
            minZoom: 11,
            maxZoom: 20,
          },
        ]}
        mapMarkers={
          selectedLocation?.coordinate
            ? [
                {
                  id: 'selected-location-marker',
                  icon: 'https://www.kindpng.com/picc/m/117-1171223_placeholder-map-marker-position-pinpoint-white-map-marker.png',
                  size: [40, 55],
                  iconAnchor: [20, 55],
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
