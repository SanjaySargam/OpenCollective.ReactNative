import { StyleSheet, Text, View, Image, StatusBar, TouchableOpacity, Button, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import TabNavigator from './TabNavigator';
import Icon from 'react-native-vector-icons/FontAwesome'; // Use the appropriate icon library (e.g., FontAwesome)
// import { ScrollView } from 'react-native-gesture-handler';
import { AuthContext } from './context';
import { ThemeProvider } from './ThemeProvider';
// const { signOut, toggleTheme } = React.useContext(AuthContext);
import { useTheme } from './ThemeProvider';
import { fetchAccount } from './fetchAPI';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ACCOUNT } from './queries';
interface Account {
    id: string,
    name: string,
    slug: string,
    imageUrl: string
}
export default function HomeScreen() {
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
            paddingLeft: 20,
            paddingRight: 20,
            paddingTop: 25,
            flexDirection: 'row',
            alignItems: 'center',
        },
        profilePic: {
            width: 40,
            height: 40,
            borderRadius:20
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
            ) : (
                <Text>Loading.....</Text>
            )}
        </View>
    )
}

