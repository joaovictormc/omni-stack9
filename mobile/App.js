import React from 'react';
import { YellowBox } from 'react-native';
import Routes from './src/routes';

YellowBox.ignoreWarnings([
  'Unrecognized WebSocket', 'Unhandled Promise Rejection'
]);

export default function App() {
  return (
    <Routes />
  );
}

