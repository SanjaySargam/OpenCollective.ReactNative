import { View, Text, StyleSheet, Image } from 'react-native'
import React from 'react'

const FancyCards = () => {
  return (
    <View>
      <Text style={styles.headingText}>Trending Places</Text>
      <View style={[styles.card,styles.cardElevated]}>
        <Image
        source={{
            uri:'https://next-images.opencollective.com/_next/image?url=%2Fstatic%2Fimages%2Fopencollective-icon.png&w=48&q=75'
        }}
        style={styles.cardImage}
        />
        <View style={styles.cardBody}>
            <Text style={styles.cardTitle}>Open Collective</Text>
            <Text style={styles.cardLabel}>Organisation</Text>
        </View>
      </View>
    </View>
  )
}
const styles=StyleSheet.create({
    headingText:{

    },
    card:{

    },
    cardElevated:{

    },
    cardImage:{
        width:50,
        height:50
    },
    cardBody:{

    },
    cardTitle:{

    },
    cardLabel:{
        
    }
})
export default FancyCards