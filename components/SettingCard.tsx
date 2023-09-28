import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Feather from 'react-native-vector-icons/Feather'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { Icon } from '@expo/vector-icons/build/createIconSet'
import { ThemeProvider, useTheme } from './ThemeProvider'
import AsyncStorage from '@react-native-async-storage/async-storage'

export interface SettingCard {
    icon: string,
    title: string,
    isRight: boolean,
    screen: string,
    handleonPress:() => void;
}
type Screen1Props = {
    navigation: any
}

const SettingCard: React.FC<SettingCard & Screen1Props> = ({ icon, title, isRight, navigation, screen, handleonPress }) => {
    const { theme } = useTheme();
    const styles = StyleSheet.create({
        mainContainer: {
            flex: 1
        },
        container: {
            backgroundColor: theme.backgroundColor,
            borderRadius: 16,
            padding: 20,
            alignItems: 'center',
            alignSelf: 'center',
            flexDirection: 'row',
            margin: 10,
            elevation: 2
        },
        icon: {
            color: isRight === true ? theme.mainTheme : 'red',
            alignSelf: 'center',
            fontSize: 24,
        },
        title: {
            color: isRight === true ? theme.textColor : 'red',
            flex: 1,
            alignSelf: 'center',
            marginLeft: 10,
            fontSize: 20
        },

    })
    return (
        <TouchableOpacity onPress={handleonPress}>
        <View style={styles.container}>
            <MaterialIcons name={icon} style={styles.icon}/>
            <Text style={styles.title}>{title}</Text>
            {isRight && <Feather name='chevron-right' style={styles.icon} />}
        </View>
        </TouchableOpacity>
    )
}

export default SettingCard