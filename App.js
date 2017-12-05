import React from 'react';
import { View } from 'react-native';
import { StackNavigator } from 'react-navigation';
import Expo from 'expo';

import ArtistList from './src/screens/ArtistList';
import AlbumList from './src/screens/AlbumList';
import TrackList from './src/screens/TrackList';

export default class App extends React.Component {
  render() {
    const MainNavigator = StackNavigator({
      artist: { screen: ArtistList },
      album: {
        path: 'artist/:name',
        screen: AlbumList 
      },
      track: { screen: TrackList }
    });
    return (
      <View style={{ flex: 1, paddingTop: Expo.Constants.statusBarHeight }}>
        <MainNavigator />
      </View>
    );
  }
}
