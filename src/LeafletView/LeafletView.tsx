import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Platform } from 'react-native';
import WebView, { type WebViewMessageEvent } from 'react-native-webview';
import type { LeafletMapProps, LeafletProps } from '../types';
import { styles } from './LeafletView.styles';
import { LeafletWebViewEventTags } from '../constants';

const leafletHTMLSource = Platform.select({
  ios: require('../html/Leaflet.html'),
  android: require('../html/Leaflet.html'),
});

export const LeafletView = ({
  onMessage,
  onMapLoad,
  ...rest
}: LeafletProps) => {
  const mapProps: LeafletMapProps = rest;
  const webViewRef = useRef<WebView>(null);

  const [isWebviewReady, setWebviewReady] = useState(false);
  const previousPropsRef = useRef<Partial<LeafletMapProps>>({});

  const onMessageHandler = useCallback(
    (event: WebViewMessageEvent) => {
      const data = event?.nativeEvent?.data;
      if (!data) {
        return;
      }
      try {
        const message = JSON.parse(data);

        if (message.tag === LeafletWebViewEventTags.MapComponentMounted) {
          setWebviewReady(true);
          onMapLoad?.();
        }
        onMessage(message);
      } catch (error) {
        onMessage({
          tag: LeafletWebViewEventTags.Error,
          error: { error, data: data },
        });
      }
    },
    [onMapLoad, onMessage]
  );

  const onErrorHandler = useCallback(
    (error: any) => {
      onMessage({ tag: LeafletWebViewEventTags.Error, error });
    },
    [onMessage]
  );

  const isEqual = (value1: any, value2: any): boolean => {
    if (value1 === value2) {
      return true;
    }

    if (typeof value1 !== 'object' || value1 === null ||
      typeof value2 !== 'object' || value2 === null) {
      return false;
    }

    const keys1 = Object.keys(value1);
    const keys2 = Object.keys(value2);

    if (keys1.length !== keys2.length) {
      return false;
    }

    for (const key of keys1) {
      if (!keys2.includes(key) || !isEqual(value1[key], value2[key])) {
        return false;
      }
    }

    return true;
  }

  useEffect(() => {
    if (!isWebviewReady) {
      return;
    }
    const previousProps = previousPropsRef.current;
    const newMapProps: Partial<LeafletMapProps> = {};
    if (!isEqual(mapProps.mapCenterPosition, previousProps.mapCenterPosition)) {
      newMapProps.mapCenterPosition = mapProps.mapCenterPosition;
    }
    if (!isEqual(mapProps.mapLayers, previousProps.mapLayers)) {
      newMapProps.mapLayers = mapProps.mapLayers;
    }
    if (!isEqual(mapProps.mapClusterMarkers, previousProps.mapClusterMarkers)) {
      newMapProps.mapClusterMarkers = mapProps.mapClusterMarkers;
    }
    if (!isEqual(mapProps.mapMarkers, previousProps.mapMarkers)) {
      newMapProps.mapMarkers = mapProps.mapMarkers;
    }
    if (!isEqual(mapProps.mapOptions, previousProps.mapOptions)) {
      newMapProps.mapOptions = mapProps.mapOptions;
    }
    if (!isEqual(mapProps.mapShapes, previousProps.mapShapes)) {
      newMapProps.mapShapes = mapProps.mapShapes;
    }
    if (mapProps.flyto !== previousProps.flyto) {
      newMapProps.flyto = mapProps.flyto;
    }
    if (!isEqual(mapProps.userLocation, previousProps.userLocation)) {
      newMapProps.userLocation = mapProps.userLocation;
    }
    if (mapProps.maxZoom !== previousProps.maxZoom) {
      newMapProps.maxZoom = mapProps.maxZoom;
    }
    if (mapProps.zoom !== previousProps.zoom) {
      newMapProps.zoom = mapProps.zoom;
    }
    if (!isEqual(mapProps.zones, previousProps.zones)) {
      newMapProps.zones = mapProps.zones;
    }
    if (!isEqual(mapProps.selectedZone, previousProps.selectedZone)) {
      newMapProps.selectedZone = mapProps.selectedZone;
    }

    previousPropsRef.current = {
      ...previousProps,
      ...mapProps,
    };
    const payload = JSON.stringify(newMapProps);

    webViewRef.current?.injectJavaScript(
      `window.postMessage(${payload}, '*');`
    );
  }, [
    isWebviewReady,
    mapProps,
    mapProps.mapCenterPosition,
    mapProps.mapLayers,
    mapProps.mapClusterMarkers,
    mapProps.mapMarkers,
    mapProps.mapOptions,
    mapProps.mapShapes,
    mapProps.maxZoom,
    mapProps.zoom,
    mapProps.zones,
    mapProps.selectedZone,
  ]);

  return (
    <WebView
      ref={webViewRef}
      onMessage={onMessageHandler}
      onError={onErrorHandler}
      originWhitelist={['*']}
      source={leafletHTMLSource}
      allowFileAccess
      allowUniversalAccessFromFileURLs
      allowFileAccessFromFileURLs
      domStorageEnabled
      javaScriptEnabled
      startInLoadingState
      containerStyle={styles.container}
    />
  );
};
