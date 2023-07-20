import { Image, Linking, StyleSheet, Text, View } from 'react-native'
import React from 'react'

export default function ActionCard() {
    function openWebsite(websiteLink:string){
        Linking.openURL(websiteLink)
    }
  return (
    <View>
      <Text style={styles.headingText}>ActionCard</Text>
      <View style={[styles.card,styles.elevatedCard]}>
        <View style={styles.headingContainer}>
            <Text style={styles.headerText}>
                Hey Hi!
            </Text>
            <Image
            source={{
                uri:'https://next-images.opencollective.com/_next/image?url=%2Fstatic%2Fimages%2Fopencollective-icon.png&w=48&q=75'
            }}
            style={styles.cardImage}
            />
            <View style={styles.bodyContainer}>
                <Text >
                    I am Sanjay Sargam currently in 3rd Year of Engineering.
                </Text>
            </View>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
    headingText:{

    },
    card:{

    },
    elevatedCard:{

    },
    headingContainer:{

    },
    headerText:{

    },
    cardImage:{
        width:50,
        height:50
    },
    bodyContainer:{
        
    }
})