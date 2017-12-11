import React, { Component } from 'react';
import { Card, Button } from 'react-native-elements';
import axios from 'axios';
import { Text, View, ScrollView, Image, Linking, ActivityIndicator } from 'react-native';
import { Header, CardSection } from '../components/common';


class TrackList extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            title: navigation.state.params.albumName,
        }
    }
    state = {
        isLoading: true,
        albumDetail:'',
        albumName: this.props.navigation.state.params.albumName,
        artistName: this.props.navigation.state.params.artistName
    }
    async componentDidMount() {
        console.log(`http://ws.audioscrobbler.com/2.0/?method=album.getinfo&api_key=7daa24f97f9850401459cea9f552df2a&artist=${this.state.artistName}&album=${this.state.albumName}&format=json`)
        this.setState({ albumDetail: await axios.get(`http://ws.audioscrobbler.com/2.0/?method=album.getinfo&api_key=7daa24f97f9850401459cea9f552df2a&artist=${this.state.artistName}&album=${this.state.albumName}&format=json`) })
        this.setState({ isLoading: false })
        if (this.state.albumDetail.data.album.tracks.track.length === 0) {
            alert('Track Not Found');
        }
    }
    renderTrack() {
        if (this.state.albumDetail) {
            console.log(this.state.albumDetail.data.album.tracks.track)
        return (
            this.state.albumDetail.data.album.tracks.track.map((track, index) => {
                return (
                <View key={index} style={{ alignItems: 'center', justifyContent: 'center'}}>
                <Card>
                    <CardSection>
                <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ fontWeight: 'bold' }}>{track.name}</Text>
                <Text>Duration: {track.duration} sec</Text>
                </View>
                </CardSection>
                <CardSection>
                <Button
                    icon={{ name: 'play-circle-outline' }}
                    title='Play Song'
                    onPress={() => Linking.openURL(track.url)}
                />
                </CardSection>
                </Card>
                </View>
                );
            })
        );
    }
    }
    renderSpinner() {
        if (this.state.isLoading) {
            return ( 
                
                <ActivityIndicator
                size='large'
               
                />
            )
        }
    }
    render() {
        return (
            <View>
                <ScrollView>
                {this.renderSpinner()}
                {this.renderTrack()}
                </ScrollView>
            </View>
        )
    }
}

export default TrackList;