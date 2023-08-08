import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import { Transaction } from './fetchAPI';

const Card: React.FC<Transaction> = ({
    type,
    fromAccount: {
        name,
        imageUrl
    },
    toAccount: {
        slug
    },
    amount: {
        value,
        currency
    },
    updatedAt,
    description
}) => {
    const formattedDate = () => {
        const date = new Date(updatedAt);
        const options: Intl.DateTimeFormatOptions = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          };
          return new Intl.DateTimeFormat('en-US', options).format(date);
      
      };
    return (
        <View style={styles.container}>
            <View style={styles.profilePicContainer}>
                <Image source={{ uri: imageUrl }} style={styles.profilePic} />
            </View>
            <View style={styles.description}>
                <Text style={styles.title}>{description}</Text>
                <View style={styles.from}>
                    <Text style={{ color: 'gray' }}>From </Text>
                    <Text style={styles.name}>{name}</Text>
                </View>
            </View>
            <View style={styles.amountContainer}>
                <View style={styles.amount}>
                    <Text style={styles.credit}>+</Text>
                    <Text style={styles.money}>{value}</Text>
                    <Text style={styles.currency}>{currency}</Text>
                </View>
                <Text style={styles.date}>{formattedDate()}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        borderRadius: 16,
        flexDirection: 'row',
        alignSelf: 'center',
        padding: 20,
        justifyContent: 'center',
        margin:10,
        elevation:4
    },
    date: {
        color: 'gray'
    },
    profilePicContainer: {
        justifyContent:'center',
    },
    description: {
        flex: 1,
        marginLeft: 12,
        justifyContent:'center'
    },
    amountContainer: {
        // flex:1
        justifyContent:'center',
        alignContent:'flex-end'
    },
    money: {
        color: 'green',
        fontWeight: 'bold'
    },
    credit: {
        color: 'green',
        fontWeight: 'bold'
    },
    currency: {
        color: 'gray',
        marginLeft: 6,
        fontWeight: 'bold'
    },
    amount: {
        flexDirection: 'row',
        alignSelf:'flex-end'
    },
    profilePic: {
        width: 40,
        height: 40,
        borderRadius: 20,
    },
    title: {
        fontWeight: 'bold',
        color: 'black'
    },
    name: {
        fontWeight: 'bold',
        color: 'black'
    },
    from: {
        flexDirection: 'row',
        marginTop:6
    }
})

export default Card;