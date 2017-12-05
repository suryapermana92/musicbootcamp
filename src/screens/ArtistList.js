import React, { Component } from 'react';
import axios from 'axios'
import Expo from 'expo'
import { Card, Button, FormInput, FormLabel } from 'react-native-elements'
import { Text, View, ScrollView, Image, ActivityIndicator } from 'react-native';
import { Header, CardSection, Spinner } from '../components/common'


class ArtistList extends Component {
    
    static navigationOptions = () => {
        return ({
        title: 'Surya Music Database',
    })
}
    state= {
        keyword:'',
        artistData:'',
        isLoading: false
    }

    onChangeText(text) {
        this.setState({ keyword: text })
    }
    
    async onSearchPress() {
        this.setState({ artistData: await axios.get(`https://ws.audioscrobbler.com/2.0/?method=artist.search&artist=${this.state.keyword}&api_key=7daa24f97f9850401459cea9f552df2a&format=json`)});  
        this.setState({ isLoading: false })
        console.log(this.state.artistData.data.results.artistmatches.artist)
        if (this.state.artistData.data.results.artistmatches.artist.length === 0) {
            alert('Artist Not Found');
        }
    }

    renderArtist() {
        if (this.state.artistData) {
            console.log(this.state.artistData.data.results.artistmatches.artist.image)
        return (
            this.state.artistData.data.results.artistmatches.artist.map((artist, index) => {
                return (
                <View key={index} style={{ alignItems: 'center', justifyContent: 'center' }}>
                <Card>
                <CardSection>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ fontWeight: 'bold' }}>{artist.name}</Text>
                        <Text>Listeners: {artist.listeners}</Text>
                    </View>
                </CardSection>
                <CardSection>
                <Image
                source={{ uri: artist.image['3']['#text'] || 'https://dummyimage.com/250x250/000/fff&text=No+Image' }}
                style={{ width: '100%', height: 250 }} />
                </CardSection>
                <CardSection>
                <Button
                    icon={{ name: 'library-music' }}
                    title='View Albums'
                    onPress={() => {
                        this.props.navigation.navigate('album', { artistName: artist.name } )}
                    }
                />
                </CardSection>
                </Card>
                </View>
                );
            })
        );
    }
    }
    renderButton() {
        if (this.state.isLoading) {
            return (
                <ActivityIndicator 
                style={{ 
                    width: '100%', 
                    justifyContent: 'center', 
                    alignItems: 'center'}} 
                size='large'
                />
    
            )
        }
        return (
            <View style={{ paddingTop: 5 }}>
            <Button
                icon={{ name: 'search' }}
                title='Search'
                onPress={() => {
                this.setState({ isLoading: true })
                this.onSearchPress()
                }}
                />
            </View>
        )
    }
    
    render() {
        console.log(this.state.isLoading)
        
        return (
            <View style={{flex: 1}}>
                <Card>
                    <FormLabel>Artist Name</FormLabel>
                    <FormInput
                    
                    autoCorrect={false}
                    onChangeText={this.onChangeText.bind(this)}
                    placeholder='enter an artist name here..'
                    />
                    
                    {this.renderButton()}
                </Card>
                
                <ScrollView style={{ paddingTop: 10 }}>
                    {this.renderArtist()}
                </ScrollView>
                
            </View>
        )
    }
}

export default ArtistList;
