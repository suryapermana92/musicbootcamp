import React, { Component } from 'react'
import { View, Text, ScrollView, Dimensions } from 'react-native'
import { Button } from 'react-native-elements'


const SCREEN_WIDTH = Dimensions.get('window').width;
class Slides extends Component {
    
    renderButton(index) {
        if (index === this.props.data.length -1) {
            return (
                <View style={styles.buttonStyle}>
                <Button
                title='Start the job hunt!'
                buttonStyle={styles.viewButtonStyle}
                onPress={this.props.onPress}
                />
                </View>
            )
        }
    }
    renderSlides() {
           return this.props.data.map((slide, index) => {
                return (
                <View key={index} style={{ ...styles.viewStyle, backgroundColor: slide.color }}>
                    <Text style={styles.textStyle}>{slide.text}</Text>
                    {this.renderButton(index)}
                </View>
                )
            })
    }
    render() {
        console.log('welcome screen')
        return (
            <ScrollView
            horizontal
            pagingEnabled
            >
                {this.renderSlides()}
            </ScrollView>
        )
    }
}

const styles = {
    textStyle: {
        textAlign: 'center',
        fontSize: 25
    },
    viewStyle: {
        width: SCREEN_WIDTH,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonStyle: {
    },
    viewButtonStyle: {
        marginTop: 20
        
    }
}

export default Slides