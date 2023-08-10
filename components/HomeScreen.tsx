import { StyleSheet, Text, View, Image, StatusBar, TouchableOpacity, Button } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import TabNavigator from './TabNavigator';
import Icon from 'react-native-vector-icons/FontAwesome'; // Use the appropriate icon library (e.g., FontAwesome)
// import { ScrollView } from 'react-native-gesture-handler';
import { AuthContext } from './context';
import { ThemeProvider } from './ThemeProvider';
// const { signOut, toggleTheme } = React.useContext(AuthContext);
import { useTheme } from './ThemeProvider';


export default function HomeScreen() {
    const { toggleTheme, theme } = useTheme();


    const styles = StyleSheet.create({
        container: {
            backgroundColor: theme.mainTheme,
            flex: 1
        },
        status: {
            backgroundColor: theme.mainTheme
        },
        toolbar: {
            paddingLeft: 20,
            paddingRight: 20,
            paddingTop: 25,
            flexDirection: 'row',
            alignItems: 'center',
        },
        profilePic: {
            width: 40,
            height: 40
        },
        textContainer: {
            flexDirection: 'column',
            marginLeft: 5
        },
        name: {
            color: 'white',
            fontFamily: 'Mr Peter Bold'
        },
        welcomeText: {
            color: 'black'
        },
        tabView: {
            width: 'auto',
            height: 50
        },
        navigationContainer: {
            flex: 1,
            paddingTop: 25,
        }

    })

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor={theme.mainTheme} barStyle="light-content" />
            <View style={styles.toolbar}>
                <TouchableOpacity>
                    <Image source={{ uri: 'https://images.opencollective.com/ankidroid/0b11dbe/logo.png' }} style={styles.profilePic} />
                </TouchableOpacity>
                <View style={styles.textContainer}>
                    <Text style={styles.welcomeText}>Welcome back,</Text>
                    <Text style={styles.name}>AnkiDroid !</Text>
                </View>
                <Button
                    title={`Switch to`}
                    onPress={toggleTheme}
                />
                <Icon name="bell" size={30} color="black" />
                <Icon name="cog" size={30} color="black" />
            </View>
            <View style={styles.navigationContainer}>
                <NavigationContainer>
                    <TabNavigator />
                </NavigationContainer>
            </View>
        </View>

    )
}

