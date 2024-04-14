import type {
  CircleMarkerOptions,
  CircleOptions,
  LatLngBoundsExpression,
  LatLngBoundsLiteral,
  LatLngExpression,
  LatLngLiteral,
  PathOptions,
  PointExpression,
  PointTuple,
  PolylineOptions,
  MapOptions,
} from 'leaflet';
import type { TileLayerProps } from 'react-leaflet';
import type { LeafletWebViewEventTags, Shape } from '../constants';

export type {
  CircleMarkerOptions,
  CircleOptions,
  LatLngBoundsExpression,
  LatLngBoundsLiteral,
  LatLngExpression,
  LatLngLiteral,
  PathOptions,
  PointExpression,
  PointTuple,
  PolylineOptions,
  MapOptions,
} from 'leaflet';

export type LeafletMapProps = {
  mapOptions?: MapOptions;
  mapLayers: MapLayer[];
  mapClusterMarkers?: MapClusterMarkers | null;
  mapMarkers?: MapMarker[];
  mapShapes?: MapShape[];
  mapCenterPosition?: LatLngLiteral;
  zoom?: number;
  maxZoom?: number;
  minZoom?: number;
  testID?: string;
  zones?: ZoneProps;
  selectedZone?: string;
  flyto?: IFlyto;
  userLocation?: IUserLocation;
};

export type LeafletUserLocation = {
  icon: string;
  size: number[];
  iconAnchor: number[];
  position?: { lat: number; lng: number };
  accuracy: number;
};

export type LeafletProps = LeafletMapProps & {
  backgroundColor?: string;
  userLocation?: LeafletUserLocation;
  loadingIndicator?: () => React.ReactElement;
  onMapLoad?: () => void;
  onMessage: (message: LeafletWebViewEvent) => void;
};

type CircleShape = {
  shapeType: Shape.circle;
} & CircleProps;

type CircleMarkerShape = {
  shapeType: Shape.circleMarker;
} & unknown;

type PolylineShape = {
  shapeType: Shape.polyline;
} & PolylineProps;

type RectangleShape = {
  shapeType: Shape.rectangle;
} & RectangleProps;

type PolygonShape = {
  shapeType: Shape.polygon;
} & PolygonProps;

export type LeafletWebViewEvent =
  | { tag: LeafletWebViewEventTags.DebugMessage; message: string }
  | { tag: LeafletWebViewEventTags.DocumentEventListenerAdded }
  | { tag: LeafletWebViewEventTags.DocumentEventListenerRemoved }
  | { tag: LeafletWebViewEventTags.Error; error: any }
  | { tag: LeafletWebViewEventTags.WindowEventListenerAdded }
  | { tag: LeafletWebViewEventTags.WindowEventListenerRemoved }
  | { tag: LeafletWebViewEventTags.MapReady; version: string }
  | { tag: LeafletWebViewEventTags.MapComponentMounted; version: string }
  | { tag: LeafletWebViewEventTags.onMapClicked; location: LatLngLiteral }
  | { tag: LeafletWebViewEventTags.onMapMarkerClicked; mapMarkerId: string }
  | { tag: LeafletWebViewEventTags.onResize }
  | { tag: LeafletWebViewEventTags.onUnload }
  | { tag: LeafletWebViewEventTags.onZoom }
  | { tag: LeafletWebViewEventTags.onZoomLevelsChange }
  | { tag: LeafletWebViewEventTags.drag };

export type MapLayerType =
  | 'ImageOverlay'
  | 'TileLayer'
  | 'VectorLayer'
  | 'VideoOverlay'
  | 'WMSTileLayer';

export type MapClusterMarkers = {
  mapMarkers: Array<MapMarker>;
  maxClusterRadius?: number;
  clusterIcon: string;
  clusterIconAnchor?: PointTuple;
  clusterIconSize?: PointTuple;
};

export type MapMarker = {
  icon: string;
  iconAnchor?: PointTuple;
  id: string;
  position: LatLngLiteral;
  size?: PointTuple;
  animation?: any;
  zIndexOffset?: number;
  popup?: {
    id: string;
    content: string;
    offset?: PointExpression;
    className?: string;
    defaultOpen?: boolean;
  };
};

export type MapLayer = TileLayerProps & {
  attribution?: string;
  baseLayer?: boolean;
  baseLayerIsChecked?: boolean;
  baseLayerName?: string;
  bounds?: LatLngBoundsLiteral;
  id?: string;
  layerType?: MapLayerType;
  opacity?: number;
  pane?: string;
  subLayer?: string;
  url?: string;
  zIndex?: number;
};

export interface CircleProps extends CircleOptions {
  center: LatLngExpression;
  children?: React.ReactNode;
}
export interface CircleMarkerProps extends CircleMarkerOptions {
  center: LatLngExpression;
  children?: React.ReactNode;
}

export interface PolygonProps extends PolylineOptions {
  children?: React.ReactNode;
  positions: LatLngExpression[] | LatLngExpression[][] | LatLngExpression[][][];
}

export interface PolylineProps extends PolylineOptions {
  children?: React.ReactNode;
  positions: LatLngExpression[] | LatLngExpression[][];
}
export interface RectangleProps extends PathOptions {
  bounds: LatLngBoundsExpression;
  children?: React.ReactNode;
}

export type MapShape = { id?: string } & (
  | CircleShape
  | CircleMarkerShape
  | PolygonShape
  | PolylineShape
  | RectangleShape
);
export type Multipolygon = number[][][][];

export interface IZone {
  zone: string;
  geoJsonCoords: Multipolygon;
}

export type ZoneProps = {
  data: IZone[];
  opacity?: number;
  borderColor?: string;
  borderWidth?: number;
  fillOpacity?: number;
  color?: string;
  fillColor?: string;
  icon?: string;
  iconSize?: PointTuple;
  shouldFlyTo?: boolean;
  flyToMaxZoom?: number;
  flyToUseCurrentZoom?: boolean;
};

export type IFlyto = { latlng: LatLngLiteral; zoom?: number };

export type IUserLocationRing = {
  center: LatLngLiteral;
  accuracy?: number;
  circleColor?: string;
};

export interface IUserLocation
  extends Omit<MapMarker, 'id'>,
    Omit<IUserLocationRing, 'center'> {}

export interface IFlyToCoordinate extends LatLngLiteral {
  zoom?: number;
}
