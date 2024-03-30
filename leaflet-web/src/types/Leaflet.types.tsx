import type { LatLngLiteral, MapOptions } from 'leaflet';
import { ReactElement } from 'react';
import type {
  LeafletWebViewEvent,
  MapLayer,
  MapMarker,
  MapShape,
  ZoneProps,
  IFlyto,
  IUserLocation,
  MapClusterMarkersProps,
} from './model.types';

export type LeafletMapProps = {
  mapOptions?: MapOptions;
  mapLayers: MapLayer[];
  mapClusterMarkers?: Omit<MapClusterMarkersProps, 'onClick'>;
  mapMarkers?: MapMarker[];
  mapShapes?: MapShape[];
  mapCenterPosition: LatLngLiteral;
  zoom?: number;
  maxZoom?: number;
  minZoom?: number;
  testID?: string;
  zones?: ZoneProps;
  selectedZone?: string;
  flyto?: IFlyto;
  userLocation?: IUserLocation;
};

export type LeafletProps = LeafletMapProps & {
  backgroundColor?: string;
  loadingIndicator?: () => ReactElement;
  onMapLoad?: () => void;
  onMessage: (message: LeafletWebViewEvent) => void;
};

export type { LatLngLiteral, MapOptions } from 'leaflet';
