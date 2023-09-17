import { View, Text, StyleSheet, Image } from 'react-native'
import React, { useEffect } from 'react'
import { BLACK } from '../constants/color'
import LinearGradient from 'react-native-linear-gradient'
import { LOGO } from '../constants/imagepath'
import { MyStatusBar } from '../constants/config'

const Splash = ({ navigation }) => {
    useEffect(() => {
        setTimeout(() => {
            navigation.navigate('Login');
        }, 2000)
    }, [])
    return (
        <View style={{ flex: 1, }}>
            <MyStatusBar backgroundColor={'white'} barStyle={'dark-content'} />
            <LinearGradient
                end={{ x: 0, y: 0 }}
                start={{ x: 0, y: 1 }}
                colors={['black', 'white',]}
                style={{ flex: 1, justifyContent: 'center', }}
            >

                <Image
                    // resizeMethod=""
                    style={{
                        alignSelf: 'center',
                        height: 170,
                        width: 170,
                        borderRadius: 100
                    }}
                    resizeMode={'center'}
                    source={LOGO}
                />

            </LinearGradient>
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