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

export enum Shape {
  circle = 'circle',
  circleMarker = 'circleMarker',
  polyline = 'polyline',
  rectangle = 'rectangle',
  polygon = 'polygon',
}
