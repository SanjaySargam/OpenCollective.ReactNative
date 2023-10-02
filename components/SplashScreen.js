import React, { Component } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
class SplashScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            accessToken: false
        };
    }

    componentDidMount() {
        this.loadStoredToken()
        // Simulate an asynchronous process, e.g., fetching data, before navigating to the main app.
        // setTimeout(() => {
        //     this.props.navigation.navigate('Login'); // Replace 'Main' with your main app screen's name
        // },5000); // Adjust the duration as needed (in milliseconds)
    }

    loadStoredToken = async () => {
        try {
            const storedToken = await AsyncStorage.getItem('accessToken');
            if (storedToken) {
                this.setState({ accessToken: true });
                this.props.navigation.replace('Home')
            } else {
                this.props.navigation.replace('Login')
            }
        } catch (error) {
            console.error('Error loading stored token:', error);
        }
    };
    render() {
        return (
            <View style={styles.container}>
                {/* <Image source={require('./assets/splash.png')} style={styles.image} /> */}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff', // Customize the background color if needed
    },
    image: {
        width: 200, // Adjust the image dimensions as needed
        height: 200,
    },
});

export default SplashScreen;
