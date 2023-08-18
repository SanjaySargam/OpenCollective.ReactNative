import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { useTheme } from './ThemeProvider'
import { ThemeProvider } from './ThemeProvider';
import SettingCard from './SettingCard';



const cards = [
    {
        index:1,
        icon: 'account-circle',
        title: 'Info',
        navigation: 'InfoScreen',
        isRight: true
    },
    {
        index:2,
        icon: 'notifications-none',
        title: 'Notifications',
        navigation: 'NotificationScreen',
        isRight: true
    },
    {
        index:3,
        icon: 'apps',
        title: 'Authorized Apps',
        navigation: 'AuthorizedScreen',
        isRight: true
    },
    {
        index:4,
        icon: 'local-activity',
        title: 'Activity Log',
        navigation: 'ActivityScreen',
        isRight: true
    },
    {
        index:5,
        icon: 'logout',
        title: 'Log out',
        navigate: 'LogOut',
        isRight: false
    }
]
type Screen1Props = {
    navigation:any
}
const SettingScreen:React.FC<Screen1Props> = ({navigation}) => {
    const { theme } = useTheme();
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor:theme.backgroundPrimary
        },
        toolbar: {
            padding:25,
            backgroundColor:theme.mainTheme
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
                        cards.map(({ icon, title, navigation, isRight, index }) => (
                            <SettingCard
                                key={index}
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