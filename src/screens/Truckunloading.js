import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { BLACK } from '../constants/color'

const Truckunloading = () => {
    return (
        <View style={{
            ...styles.mainContainer
        }}>
            <Text style={{
                color: BLACK,
                fontSize: 20
            }}>Truckunloading</Text>
        </View >
    )
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default Truckunloading