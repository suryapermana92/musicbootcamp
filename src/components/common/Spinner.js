import React from 'react';
import { View, ActivityIndicator } from 'react-native';

const Spinner = ({ size, position }) => {
  return (
    <View style={styles.spinnerStyle}>
      <ActivityIndicator size={size || 'large'} position={position || 'relative'}/>
    </View>
  );
};

const styles = {
  spinnerStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
};

export { Spinner };
