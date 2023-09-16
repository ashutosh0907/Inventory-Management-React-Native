import { View, Text, StyleSheet } from 'react-native'
import React, { useEffect } from 'react'
import { BLACK } from '../constants/color'

const Splash = ({ navigation }) => {
    useEffect(() => {
        setTimeout(() => {
            navigation.navigate('Login');
        }, 3000)
    }, [])
    return (
        <View style={{
            ...styles.mainContainer
        }}>
            <Text style={{
                color: BLACK,
            }}>Splash</Text>
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

export default Splash