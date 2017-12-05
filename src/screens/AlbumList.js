import React, { Component } from 'react';
import { Text, View, ScrollView, Image, ActivityIndicator } from 'react-native';
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
        isLoading: true,
        albumData:'',
        artistName: this.props.navigation.state.params.artistName
    }
    componentWillMount() {
        this.setState({ isLoading: true })
    }
    async componentDidMount() {
        this.setState({ albumData: await axios.get(`https://ws.audioscrobbler.com/2.0/?method=artist.gettopalbums&artist=${this.state.artistName}&api_key=7daa24f97f9850401459cea9f552df2a&format=json`) })
        this.setState({ isLoading: false })
        if (this.state.albumData.data.topalbums.album.length === 0) {
            alert('Album Not Found');
        }
    }
    renderSpinner() {
        if (this.state.isLoading) {
            return ( 
                <View style={{ height:'100%', justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator
                size='large'
               
                />
                </View>
            )
        }
    }
    renderAlbum() {
        if (this.state.isLoading === false) {
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
                source={{ uri: album.image['3']['#text'] || 'https://dummyimage.com/250x250/000/fff&text=No+Image' }}
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
    }}
    }
    render() {
        console.log(this.state.albumName)
        return (
            <View style={{ flex: 1 }}>
                <ScrollView>
                {this.renderSpinner()}
                {this.renderAlbum()}
                </ScrollView>
            </View>
        )
    }
}

export default AlbumList;