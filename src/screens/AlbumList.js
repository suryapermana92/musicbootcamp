import React, { Component } from 'react';
import { Text, View, ScrollView, Image } from 'react-native';
import { Header, CardSection } from '../components/common'
import { Card, Button } from 'react-native-elements'
import axios from 'axios'

class AlbumList extends Component {
    
    static navigationOptions = ({ navigation }) => {
        return {
            title: navigation.state.params.artistName,
        }
    }
    state = {
        albumData:'',
        artistName: this.props.navigation.state.params.artistName
    }
    async componentDidMount() {
        this.setState({ albumData: await axios.get(`https://ws.audioscrobbler.com/2.0/?method=artist.gettopalbums&artist=${this.state.artistName}&api_key=7daa24f97f9850401459cea9f552df2a&format=json`) })
    }
    renderAlbum() {
        if (this.state.albumData) {
            console.log(this.state.albumData.data.topalbums.album)
        return (
            this.state.albumData.data.topalbums.album.map((album, index) => {
                return (
                <View key={index} style={{ alignItems: 'center', justifyContent: 'center'}}>
                <Card>
                    <CardSection>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ fontWeight: 'bold' }}>{album.name}</Text>
                        <Text>{album.playcount} Times Played</Text>
                        </View>
                    </CardSection>
                <CardSection>
                <Image 
                source={{ uri: album.image['3']['#text'] }}
                style={{ width: '100%', height: 250 }} 
                />
                </CardSection>
                <CardSection>
                <Button
                    icon={{ name: 'library-music' }}
                    title='View Tracks'
                    onPress={() => this.props.navigation.navigate('track', { albumName: album.name, artistName: this.state.artistName } )}
                />
                </CardSection>
                </Card>
                </View>
                );
            })
        );
    }
    }
    render() {
        console.log(this.state.albumName)
        return (
            <View>
                <Text>{this.props.navigation.state.params.name}</Text>
                <ScrollView>
                {this.renderAlbum()}
                </ScrollView>
            </View>
        )
    }
}

export default AlbumList;