import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Feather from 'react-native-vector-icons/Feather'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { Icon } from '@expo/vector-icons/build/createIconSet'

export interface SettingCard {
    icon: string,
    title: string,
    navigation: any,
    isRight: boolean
}


const SettingCard: React.FC<SettingCard> = ({ icon, title, navigation, isRight }) => {
    const styles = StyleSheet.create({
        mainContainer: {
            flex: 1
        },
        container: {
            backgroundColor: '#97b7f3',
            borderRadius: 16,
            padding: 20,
            alignItems: 'center',
            alignSelf: 'center',
            flexDirection: 'row',
            margin:10
        },
        icon: {
            color: isRight === true ? 'black':'red',
            alignSelf: 'center',
            fontSize: 24,
        },
        title: {
            color: isRight === true ? 'black':'red',
            flex: 1,
            alignSelf: 'center',
            marginLeft: 10,
            fontSize: 20
        },
    
    })
    
    return (
        // <View style={styles.mainContainer}>
            <View style={styles.container}>
                <MaterialIcons name={icon} style={styles.icon} />
                <Text style={styles.title}>{title}</Text>
                {isRight && <Feather name='chevron-right' style={styles.icon} />}
            </View>
        // </View>
    )
}

export default SettingCard