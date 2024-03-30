import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import { NativeHarness } from './NativeHarness';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <NativeHarness />
  </React.StrictMode>
);
