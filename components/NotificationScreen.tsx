import { View, Text, StyleSheet, Switch } from 'react-native'
import React, { useState } from 'react'

const NotificationScreen = () => {
    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => {
        setIsEnabled(previousState => !previousState);
      };
    
    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.header}>Updates about the platform and Collectives you support</Text>
                <Text style={styles.content}>Notifications about us, news we want to share with you related to our activities and the development of the platform.</Text>
            </View>
            <View style={styles.horizontalLine} />
            <View style={styles.notiContainer}>
                <Text style={{fontSize:16,color:'black'}}>Receive the Open Collective newsletter (monthly)</Text>
                <Switch
                    trackColor={{ false: 'grey', true: '#97b7f3'}}
                    thumbColor={isEnabled ? '#3385ff' : 'white'}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={toggleSwitch}
                    value={isEnabled}            
                />
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        margin: 16,
        padding:10,
        borderWidth:1,
        borderColor:'grey',
        borderRadius:8
    },
    header: {
        fontWeight: 'bold',
        color: 'black',
        fontSize: 24
    },
    content: {

    },
    notiContainer: {
        flexDirection: 'row',
        justifyContent:'center',
        alignContent:'center'
    },
    horizontalLine: {
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        marginVertical: 10, // Adjust as needed
      },
})
export default NotificationScreen