import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native'
import React from 'react'
import { useTheme } from './ThemeProvider'
import { ThemeProvider } from './ThemeProvider';
import SettingCard from './SettingCard';
import { logout } from 'react-native-app-auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Feather from 'react-native-vector-icons/Feather'

const cards = [
    {
        index:1,
        icon: 'account-circle',
        title: 'Info',
        screen:'Info',
        isRight: true
    },
    {
        index:2,
        icon: 'notifications-none',
        title: 'Notifications',
        screen:'Notification',
        isRight: true
    },
    {
        index:3,
        icon: 'apps',
        title: 'Authorized Apps',
        screen:'',
        isRight: true
    },
    {
        index:4,
        icon: 'local-activity',
        title: 'Activity Log',
        screen:'',
        isRight: true
    },
    {
        index:5,
        icon: 'logout',
        title: 'Log out',
        screen:'Logout',
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
            backgroundColor:theme.mainTheme,
        },
        cardContainer: {
            flex:1,
            marginTop:16
        },
        title: {
            fontSize: 30,
            color: theme.backgroundColor,
            fontWeight: 'bold',
        }
    })

    const handleLogout = async () => {
        // Clear the access token from AsyncStorage or any other storage
        try {
          await AsyncStorage.removeItem('accessToken');
          console.log('Logout')
          navigation.reset({
            index: 0,
            routes: [{ name: 'Login' }],
          });
              
        } catch (error) {
          console.error('Error clearing access token:', error);
        }
      }

    return (
            <View style={styles.container}>
                <View style={[styles.toolbar,{flexDirection:'row'}]}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Feather name='chevron-left' style={{fontSize: 40,
            color: theme.backgroundColor,alignContent:'center',justifyContent:'center'}} />
                </TouchableOpacity>
                    <Text style={[styles.title,{marginLeft:12}]}>Settings</Text>
                </View>
                <ScrollView style={styles.cardContainer}>
                    {
                        cards.map(({ icon, title, isRight, index, screen }) => (
                            <SettingCard
                                key={index}
                                icon={icon}
                                title={title}
                                isRight={isRight}
                                screen={screen}
                                navigation={navigation} // Pass the navigation prop
                                handleonPress={() => {
                                    if(screen && screen!=='Logout'){
                                        navigation.navigate(screen as string)
                                    }
                                    else if (screen === 'Logout'){
                                        handleLogout()
                                    }
                                }}
                            />
                        ))
                    }
                </ScrollView>
            </View>
    )
}
export default SettingScreen