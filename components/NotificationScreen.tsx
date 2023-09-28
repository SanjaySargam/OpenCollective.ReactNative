import { View, Text, StyleSheet, Switch } from 'react-native'
import React, { useState } from 'react'
import {useTheme} from './ThemeProvider'
const NotificationScreen = () => {
    const [isEnabled, setIsEnabled] = useState(false);
    const {theme} = useTheme();
    const toggleSwitch = () => {
        setIsEnabled(previousState => !previousState);
      };
      const styles = StyleSheet.create({
        main:{
            backgroundColor:theme.backgroundPrimary,
            flex:1
        },
        container: {
            flexDirection: 'column',
            margin: 16,
            padding:10,
            borderWidth:1,
            borderColor:'grey',
            borderRadius:8,
            backgroundColor:theme.backgroundColor
        },
        header: {
            fontWeight: 'bold',
            color: theme.textColor,
            fontSize: 24
        },
        content: {
            color:theme.textColor
        },
        notiContainer: {
            flexDirection: 'row',
            justifyContent:'center',
            alignContent:'center',
            marginHorizontal: 10, // Adjust as needed
            padding:1
        },
        horizontalLine: {
            borderBottomColor: theme.textColor,
            borderBottomWidth: 1,
            marginVertical: 10, // Adjust as needed
          },
    })
    return (
        <View style={styles.main}>
        <View style={styles.container}>
            <View>
                <Text style={styles.header}>Updates about the platform and Collectives you support</Text>
                <Text style={styles.content}>Notifications about us, news we want to share with you related to our activities and the development of the platform.</Text>
            </View>
            <View style={styles.horizontalLine} />
            <View style={styles.notiContainer}>
                <Text style={{fontSize:16,color:theme.textColor}}>Receive the Open Collective newsletter (monthly)</Text>
                <Switch
                    trackColor={{ false: 'grey', true: '#97b7f3'}}
                    thumbColor={isEnabled ? '#3385ff' : 'white'}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={toggleSwitch}
                    value={isEnabled}            
                />
            </View>
        </View>
        </View>
    )
}
export default NotificationScreen