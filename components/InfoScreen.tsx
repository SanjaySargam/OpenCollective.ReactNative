import { View, Text, StyleSheet, Button, TouchableOpacity, Image, TextInput } from 'react-native'
import React from 'react'
import Feather from 'react-native-vector-icons/Feather'
const InfoScreen = () => {

  const styles = StyleSheet.create({
    container: {
      flex: 1
    },
    toolbar: {
      flexDirection: 'row',
      // alignItems: 'center',
      // alignSelf: 'center',
      padding: 20,
      backgroundColor: '#97b7f3'
    },
    editContainer: {
      flex: 1,
      margin:20
    },
    profileContainer: {
      flexDirection: 'row',
      justifyContent:'center'
    },
    edit: {

    },
    saveButton: {

    },
    title: {
      color: 'black',
      fontWeight: 'bold',
      fontSize: 24,
      textAlign: 'center',
      flex: 1
    },
    icon: {
      fontSize: 30,
      color: 'black',
    },
    profile: {
      width: 70,
      height: 70,
      borderRadius: 20,
    },
    changeProfileTextContainer:{
      justifyContent:'center',
      alignItems:'center',
      flex:1
      // borderRadius:20,
      // borderWidth: 1,
      // borderColor:'#d6d4d4',
      // padding:8
    },
    changeProfileText:{
      fontWeight:'bold',
      color:'black',
      borderRadius:20,
      borderWidth: 1,
      borderColor:'#d6d4d4',
      padding:8,
      // fontWeight:'bold'
    }
  })
  return (
    <View style={styles.container}>
      <View style={styles.toolbar}>
        <Feather name='chevron-left' style={styles.icon} />
        <Text style={styles.title}>Edit Personal Info</Text>
      </View>
      <View style={styles.editContainer}>
        <View style={styles.profileContainer}>
          <Image source={{ uri: 'https://next-images.opencollective.com/_next/image?url=%2Fstatic%2Fimages%2Fopencollective-icon.png&w=48&q=75' }} style={styles.profile} />
          <View style={styles.changeProfileTextContainer}>
            <Text style={styles.changeProfileText}>Change Profile Picture</Text>
          </View>
        </View>
        <View style={styles.edit}>
          <Text>Full Name</Text>
          <TextInput placeholder='Your Full Name'/>
        </View>
        {/* <TouchableOpacity style={styles.saveButton}>
          <Button title='Save'></Button>
        </TouchableOpacity> */}
      </View>
    </View>
  )
}

export default InfoScreen