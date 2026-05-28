import * as React from 'react';
import { ActivityIndicator, Palette } from 'react-native-paper';

const Loader = () => (
  <ActivityIndicator animating={true} type={"large"}/>
);

export default Loader;