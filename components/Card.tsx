import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import { Transaction } from './fetchAPI';
import { useTheme } from './ThemeProvider'

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
    const { theme } = useTheme();
    const formattedDate = () => {
        const date = new Date(updatedAt);
        const options: Intl.DateTimeFormatOptions = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        };
        return new Intl.DateTimeFormat('en-US', options).format(date);

    };

    const styles = StyleSheet.create({
        container: {
            backgroundColor: theme.backgroundColor,
            borderRadius: 16,
            flexDirection: 'row',
            alignSelf: 'center',
            padding: 20,
            justifyContent: 'center',
            margin: 10,
            elevation: 4
        },
        date: {
            color: theme.gray
        },
        profilePicContainer: {
            justifyContent: 'center',
        },
        description: {
            flex: 1,
            marginLeft: 12,
            justifyContent: 'center',
        },
        amountContainer: {
            // flex:1
            justifyContent: 'center',
            alignContent: 'flex-end'
        },
        money: {
            color: type === 'CREDIT' ?'green':'red',
            fontWeight: 'bold'
        },
        credit: {
            
            color: 'green',
            fontWeight: 'bold'
        },
        currency: {
            color: theme.gray,
            marginLeft: 6,
            fontWeight: 'bold'
        },
        amount: {
            flexDirection: 'row',
            alignSelf: 'flex-end'
        },
        profilePic: {
            width: 40,
            height: 40,
            borderRadius: 20,
        },
        title: {
            fontWeight: 'bold',
            color: theme.textColor
        },
        name: {
            fontWeight: 'bold',
            color: theme.textColor
        },
        from: {
            flexDirection: 'row',
            marginTop: 6
        }
    })



    return (
        <View style={styles.container}>
            <View style={styles.profilePicContainer}>
                <Image source={{ uri: imageUrl }} style={styles.profilePic} />
            </View>
            <View style={styles.description}>
                <Text style={styles.title}>{description}</Text>
                <View style={styles.from}>
                    <Text style={{ color: theme.gray }}>From </Text>
                    <Text style={styles.name}>{name}</Text>
                </View>
            </View>
            <View style={styles.amountContainer}>
                <View style={styles.amount}>
                    <Text style={styles.credit}/>
                    <Text style={styles.money}>{value}</Text>
                    <Text style={styles.currency}>{currency}</Text>
                </View>
                <Text style={styles.date}>{formattedDate()}</Text>
            </View>
        </View>
    )
}



export default Card;