# react-native-leaflet-map

A React Native component that provides Leaflet MapView using the WebView

## Installation

```sh
npm install react-native-leaflet-map
```

## Usage

```js
import LeafletMapView from 'react-native-leaflet-map';

// ...

<View style={{ flex: 1 }}>
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
    mapMarkers={[
      {
        id: 'location-marker',
        icon: 'https://cdn-icons-png.flaticon.com/64/2776/2776067.png',
        size: [64, 64],
        iconAnchor: [32, 64],
        position: {
          lat: 1.305587412732045,
          lng: 103.83318545292657,
        },
      },
    ]}
    onMessage={onLeafletMessageReceivedHandler}
    mapCenterPosition={{ lat: 1.358479, lng: 103.815201 }}
  />
</View>;
```

## Acknowledgement & References

This project incorporates tailored integrations of functionalities sourced from various open-source repositories. The author extends sincere appreciation to the following repositories for their invaluable contributions. This project owes its success to their foundational support:

[Leaflet js](https://leafletjs.com/)

[react-leaflet](https://react-leaflet.js.org/)

[Leaflet.markercluster](https://github.com/Leaflet/Leaflet.markercluster)

[react-native-webview-leaflet](https://github.com/reggie3/react-native-webview-leaflet)

[expo-leaflet](https://github.com/Dean177/expo-leaflet)

[react-native-leaflet](https://github.com/pavel-corsaghin/react-native-leaflet)

[react-leaflet-cluster](https://github.com/akursat/react-leaflet-cluster)

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT

---

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)
