import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { useTheme } from './ThemeProvider'
import { ThemeProvider } from './ThemeProvider';
import SettingCard from './SettingCard';



const cards = [
    {
        icon: 'account-circle',
        title: 'Info',
        navigation: 'InfoScreen',
        isRight: true
    },
    {
        icon: 'notifications-none',
        title: 'Notifications',
        navigation: 'NotificationScreen',
        isRight: true
    },
    {
        icon: 'apps',
        title: 'Authorized Apps',
        navigation: 'AuthorizedScreen',
        isRight: true
    },
    {
        icon: 'local-activity',
        title: 'Activity Log',
        navigation: 'ActivityScreen',
        isRight: true
    },
    {
        icon: 'logout',
        title: 'Log out',
        navigate: 'LogOut',
        isRight: false
    }
]

const SettingScreen = () => {
    // const { theme } = useTheme();
    const styles = StyleSheet.create({
        container: {
            flex: 1
        },
        toolbar: {
            margin:10,
            marginTop: 30
        },
        cardContainer: {
            flex:1,
            marginTop:16
        },
        title: {
            fontSize: 30,
            color: 'black',
            fontWeight: 'bold',
        }
    })
    return (
        <ThemeProvider>
            <View style={styles.container}>
                <View style={styles.toolbar}>
                    <Text style={styles.title}>Settings</Text>
                </View>
                <View style={styles.cardContainer}>
                    {
                        cards.map(({ icon, title, navigation, isRight }) => (
                            <SettingCard
                                icon={icon}
                                title={title}
                                navigation={navigation}
                                isRight={isRight}
                            />
                        ))
                    }
                </View>

            </View>
        </ThemeProvider>
    )
}
export default SettingScreen