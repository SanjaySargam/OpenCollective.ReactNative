import { View, Text, StyleSheet, Button, TouchableOpacity, Image, TextInput, ScrollView } from 'react-native'
import React from 'react'
import Feather from 'react-native-vector-icons/Feather'
const InfoScreen = () => {
  const data = [
    {
      id:1,
      title:'Display Name',
      placeholder:'',
    },
    {
      id:2,
      title:'Legal Name (optional)',
      placeholder:'e.g., Maria Garcia',
    },
    {
      id:3,
      title:'Company',
      placeholder:'e.g., @ankidroid',
    },
    {
      id:4,
      title:'Short description',
      placeholder:'',
    },
    {
      id:5,
      title:'Handle',
      placeholder:'https://opencollective.com/sanjay-sargam',
    },
  ]
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
      margin: 20
    },
    profileContainer: {
      flexDirection: 'row',
      justifyContent: 'center'
    },
    edit: {
      marginTop:25
    },
    saveButton: {
      borderRadius:20,
      margin:20,
      backgroundColor:'#97b7f3'
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
    changeProfileTextContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      flex: 1
      // borderRadius:20,
      // borderWidth: 1,
      // borderColor:'#d6d4d4',
      // padding:8
    },
    changeProfileText: {
      fontWeight: 'bold',
      color: 'black',
      borderRadius: 20,
      borderWidth: 1,
      borderColor: '#ccc',
      padding: 8,
      // fontWeight:'bold'
    },
    input: {
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius:20,
      paddingHorizontal: 15,
      marginTop:16
    },
    editTitle: {
      color: 'black',
      fontWeight: 'bold',

    }
  })
  return (
    <View style={styles.container}>
      <View style={styles.toolbar}>
        <Feather name='chevron-left' style={styles.icon} />
        <Text style={styles.title}>Edit Personal Info</Text>
      </View>
      <ScrollView style={styles.editContainer}>
        <View style={styles.profileContainer}>
          <Image source={{ uri: 'https://next-images.opencollective.com/_next/image?url=%2Fstatic%2Fimages%2Fopencollective-icon.png&w=48&q=75' }} style={styles.profile} />
          <View style={styles.changeProfileTextContainer}>
            <Text style={styles.changeProfileText}>Change Profile Picture</Text>
          </View>
        </View>
          {data.map(({title,placeholder,id})=>(
            <View style={styles.edit} key={id}>
            <Text style={styles.editTitle}>{title}</Text>
            <TextInput placeholder={placeholder} style={styles.input} />
          </View>
          ))}
      </ScrollView>
      <TouchableOpacity style={styles.saveButton}>
          <Text style={{textAlign:'center',fontSize:24,color:'black',justifyContent:'center',padding:10,fontWeight:'bold'}}>Save</Text>
        </TouchableOpacity>
    </View>
  )
}

export default InfoScreen