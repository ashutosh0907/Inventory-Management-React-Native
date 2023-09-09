import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { BLACK } from '../constants/color'

const Truckloading = () => {
    return (
        <View style={{
            ...styles.mainContainer
        }}>
            <Text style={{
                color: BLACK,
                fontSize: 20
            }}>Truckloading</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default Truckloading