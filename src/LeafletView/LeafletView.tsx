import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Platform } from 'react-native';
import isEqual from 'react-fast-compare';
import WebView, { type WebViewMessageEvent } from 'react-native-webview';
import type { LeafletMapProps, LeafletProps } from '../types';
import { styles } from './LeafletView.styles';
import { LeafletWebViewEventTags } from '../constants';

const leafletHTMLSource = Platform.select({
  ios: require('../html/Leaflet.html'),
  android: { uri: 'file:///android_asset/Leaflet.html' },
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
