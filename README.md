# react-native-leaflet-map

![NPM Version](https://img.shields.io/npm/v/react-native-leaflet-map)
![NPM Downloads](https://img.shields.io/npm/dm/react-native-leaflet-map)
![GitHub last commit](https://img.shields.io/github/last-commit/weishenho/react-native-leaflet-map)


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
        minNativeZoom: 11,
        maxNativeZoom: 18,
        minZoom: 11,
        maxZoom: 20,
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

## Props

| property          | required | type                            | purpose                                                                                                                                                                                                         |
| ----------------- | -------- | ------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| mapLayers         | optional | MapLayer array                  | An array of map layers \*\*\* Current only suppport 1 layer                                                                                                                                                     |
| mapMarkers        | optional | MapMarker array                 | An array of map markers                                                                                                                                                                                         |
| mapCenterPosition | optional | {lat: [Lat], lng: [Lng]} object | The center position of the map. This coordinate will not be accurate if the map has been moved manually. However, calling the map's setMapCenterPosition function will cause the map to revert to this location |
| onMessageReceived | required | function                        | This function receives messages in the form of a WebviewLeafletMessage object from the map                                                                                                                      |
| zoom              | optional | number                          | Desired zoom int value of the map. Typically (1 to 22)                                                                                                                                                          |

## Map Layer

#### mapLayer Prop Type

```typescript
type MapLayer = {
  url?: string;
  baseLayer?: boolean;
  baseLayerIsChecked?: boolean;
  baseLayerName?: string;
  bounds?: LatLngBoundsLiteral;
  id?: string;
  opacity?: number;
  pane?: string;
  subLayer?: string;
  zIndex?: number;
}
```

#### Example with [OpenStreetMap](https://www.openstreetmap.org)

```json
{
  "baseLayer": true,
  "url": "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
  "minNativeZoom": 11,
  "maxNativeZoom": 18,
  "minZoom": 11,
  "maxZoom": 20
}
```
##### Screenshot
<img width="313" alt="openstreetmap" src="https://github.com/weishenho/react-native-leaflet-map/assets/15232303/e011729b-1951-4ff2-8a9b-30de571552f1">


#### Example with Singapore's [OneMap](https://www.onemap.gov.sg/docs/maps/index.html)

```json
{
  "baseLayer": true,
  "url": "https://www.onemap.gov.sg/maps/tiles/Default/{z}/{x}/{y}.png",
  "minNativeZoom": 11,
  "maxNativeZoom": 18,
  "minZoom": 11,
  "maxZoom": 20
}
```
##### Screenshot
<img width="314" alt="onemap" src="https://github.com/weishenho/react-native-leaflet-map/assets/15232303/bb1f6eae-d6c2-4131-afb6-6ca928265b35">

## Map Markers & Marker Cluster
### For regular Map Markers without clustering, simply use the mapMarkers prop
### mapClustermarkers Prop Type
```typescript
type MapClusterMarkers = {
  mapMarkers: Array<MapMarker>;
  maxClusterRadius?: number;
  clusterIcon: string;
  clusterIconAnchor?: PointTuple;
  clusterIconSize?: PointTuple;
  clusterCountStyle?: {
    backgroundColor?: string; // Default: #880123
    color?: string; // text color Default: #FFF
    topPos?: number; // Absolute top position Default: -5
    rightPos?: number; // Absolute right position Default: -5
    width?: number; // Default: 20
    height?: number; // Default: 20
    borderRadius?: number; // Default: 9999
  };
};
```
### MapMarker Type
```typescript
type MapMarker = {
  icon: string;
  iconAnchor?: PointTuple;
  id: string;
  position: LatLngLiteral;
  size?: PointTuple;
  zIndexOffset?: number;
  popup?: {
    id: string;
    content: string;
    offset?: PointExpression;
    className?: string;
    defaultOpen?: boolean;
  };
};
```
### Example Usage
```typescript
mapClusterMarkers={{
  mapMarkers: hawkersJSON.SrchResults.map((data) => {
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
  }),
  maxClusterRadius: 100,
  clusterIcon:
    'https://cdn-icons-png.flaticon.com/128/5193/5193665.png',
  clusterIconSize: [40, 40],
  clusterIconAnchor: [40 / 2, 40],
  clusterCountStyle: {
    borderRadius: 3,
    backgroundColor: '#001f55',
  },
}}
```

#### Demo Video
[![Markers Clustering Demo](https://img.youtube.com/vi/-hVGKoGNVY8/0.jpg)](http://www.youtube.com/watch?feature=player_embedded&v=-hVGKoGNVY8)



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
