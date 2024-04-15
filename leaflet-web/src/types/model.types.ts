import type {
  LatLngBoundsLiteral,
  LatLngLiteral,
  PointExpression,
  PointTuple,
} from 'leaflet';
import type {
  CircleMarkerProps,
  CircleProps,
  PolygonProps,
  PolylineProps,
  RectangleProps,
  TileLayerProps,
} from 'react-leaflet';

export enum Shape {
  circle = 'circle',
  circleMarker = 'circleMarker',
  polyline = 'polyline',
  rectangle = 'rectangle',
  polygon = 'polygon',
}

type CircleShape = {
  shapeType: Shape.circle;
} & CircleProps;

type CircleMarkerShape = {
  shapeType: Shape.circleMarker;
} & CircleMarkerProps;

type PolylineShape = {
  shapeType: Shape.polyline;
} & PolylineProps;

type RectangleShape = {
  shapeType: Shape.rectangle;
} & RectangleProps;

type PolygonShape = {
  shapeType: Shape.polygon;
} & PolygonProps;

export enum LeafletWebViewEventTags {
  DebugMessage = 'DebugMessage',
  DocumentEventListenerAdded = 'DocumentEventListenerAdded',
  DocumentEventListenerRemoved = 'DocumentEventListenerRemoved',
  Error = 'Error',
  WindowEventListenerAdded = 'WindowEventListenerAdded',
  WindowEventListenerRemoved = 'WindowEventListenerRemoved',
  MapReady = 'MapReady',
  MapComponentMounted = 'MapComponentMounted',
  onMapClicked = 'onMapClicked',
  onMapMarkerClicked = 'onMapMarkerClicked',
  onResize = 'onResize',
  onUnload = 'onUnload',
  onZoom = 'onZoom',
  onZoomLevelsChange = 'onZoomLevelsChange',
  drag = 'drag',
}

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

const AnimationDirections = [
  'normal',
  'reverse',
  'alternate',
  'alternate-reverse',
] as const;

export type AnimationDirection = (typeof AnimationDirections)[number];
export interface MapMarkerAnimation {
  type: string;
  duration?: number;
  delay?: number;
  direction?: AnimationDirection;
  iterationCount?: number | 'infinite';
}

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

export type MapShape = { id?: string } & (
  | CircleShape
  | CircleMarkerShape
  | PolygonShape
  | PolylineShape
  | RectangleShape
);

export interface MapClusterMarkersProps {
  mapMarkers: Array<MapMarker>;
  onClick: (markerId: string) => void;
  maxClusterRadius?: number;
  clusterIcon: string;
  clusterIconAnchor?: PointTuple;
  clusterIconSize?: PointTuple;
  backgroundColor?: string;
  color?: string;
  topPos?: number;
  rightPos?: number;
  width?: number;
  height?: number;
  borderRadius?: number;
}

export interface MapMarkersProps {
  mapMarkers: Array<MapMarker>;
  onClick: (markerId: string) => void;
}

export interface MapLayersProps {
  mapLayers: Array<MapLayer>;
}
export interface LeafletZone {
  zone: string;
  coordinates: any[];
  selected?: boolean;
}

export interface IZone {
  zone: string;
  geoJsonCoords: any[];
}
export interface ISelectedZone {}

export type ZoneProps = {
  data: IZone[];
  opacity?: number;
  fillOpacity?: number;
  color?: string;
  fillColor?: string;
  icon?: string;
  iconSize?: PointTuple;
  shouldFlyTo?: boolean;
  flyToMaxZoom?: number;
  flyToUseCurrentZoom?: boolean;
  selectedZone?: string;
  borderColor?: string;
  borderWidth?: number;
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
