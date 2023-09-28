import { StyleSheet, Text, View, Image, StatusBar, TouchableOpacity, Button, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import TabNavigator from './TabNavigator';
import { createDrawerNavigator } from '@react-navigation/drawer';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome'; // Use the appropriate icon library (e.g., FontAwesome)
import Ionicons from 'react-native-vector-icons/SimpleLineIcons';
import Icon from 'react-native-vector-icons/MaterialIcons'
// import { ScrollView } from 'react-native-gesture-handler';
import { ThemeProvider } from './ThemeProvider';
// const { signOut, toggleTheme } = React.useContext(AuthContext);
import { useTheme } from './ThemeProvider';
import { fetchAccount } from './fetchAPI';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ACCOUNT } from './queries';
import { darkTheme, lightTheme } from './themes';
interface Account {
    id: string,
    name: string,
    slug: string,
    imageUrl: string
}
type Screen1Props = {
    navigation: any; // You can use the specific type from @react-navigation/native if available
};
// const Drawer = createDrawerNavigator()
const HomeScreen: React.FC<Screen1Props> = ({ navigation }) => {
    const { toggleTheme, theme } = useTheme();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [loggedInAccount, setLoggedInAccount] = useState<Account | null>(null);

    const fetchLoggedInAccount = async () => {
        try {
            const response = await fetchAccount()
            setLoggedInAccount(response.data.loggedInAccount);
            console.log(loggedInAccount)
            setLoading(false)
        } catch (error) {
            console.error('Error fetching data:', error);
            setLoading(false)
        }
    };

    const styles = StyleSheet.create({
        container: {
            backgroundColor: theme.mainTheme,
            flex: 1
        },
        status: {
            backgroundColor: theme.mainTheme
        },
        toolbar: {
            margin: 20,
            flexDirection: 'row',
            alignItems: 'center',
            alignSelf: 'center'
        },
        profilePic: {
            width: 40,
            height: 40,
            borderRadius: 20,
        },
        textContainer: {
            flexDirection: 'column',
            marginLeft: 5,
        },
        name: {
            color: 'white',
            fontFamily: 'Mr Peter Bold',
            fontWeight:'bold'
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
        },
        icon: {
            color: theme.backgroundColor,
            fontSize: 30,
            margin: 8
        },
        iconContainer: {
            flexDirection: 'row'
        }

    })
    useEffect(() => {
        if (!loggedInAccount) {
            fetchLoggedInAccount()
        }
    }, [loggedInAccount]);
    if (loading) {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" color="#000" />
            </View>
        );
    }

    if (error) {
        return (
            <View style={styles.container}>
                <Text>Error: {error}</Text>
            </View>
        );
    }
    return (
        <View style={styles.container}>
            {loggedInAccount ? (
                <View style={styles.container}>
                    <StatusBar backgroundColor={theme.mainTheme} barStyle="light-content" />
                    <View style={styles.toolbar}>
                        <TouchableOpacity>
                            <Image source={{ uri: loggedInAccount.imageUrl }} style={styles.profilePic} />
                        </TouchableOpacity>
                        <View style={styles.textContainer}>
                            <Text style={styles.welcomeText}>Welcome back,</Text>
                            <Text style={styles.name}>{loggedInAccount!!.name}</Text>
                        </View>
                        <View style={styles.iconContainer}>
                            <TouchableOpacity onPress={toggleTheme}>
                                <Icon name={theme === darkTheme ? 'light-mode' : 'dark-mode'} style={styles.icon}/>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => navigation.navigate('Notification')}>
                                <Icon name="notifications" style={styles.icon} />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => navigation.navigate('Settings')} >
                                <Ionicons name="settings" style={styles.icon}/>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.navigationContainer}>
                        {/* <NavigationContainer> */}
                        <TabNavigator />
                        {/* </NavigationContainer> */}
                    </View>
                </View>
            ) : (
                <Text>Loading.....</Text>
            )}
        </View>
    )
}

export default HomeScreen