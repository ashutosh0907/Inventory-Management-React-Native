import { View, Text, StyleSheet, StatusBar, Modal, TouchableOpacity, FlatList, Image, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import { BLACK, PINK, WHITE } from '../constants/color'
import { HEIGHT, MyStatusBar, WIDTH } from '../constants/config'
import { ADDIMAGE } from '../constants/imagepath'

const Truckloading = () => {
    const [modal, setModal] = useState(false);
    // const [imageData, setImageData] = useState([{ id: 0, image: ADDIMAGE }, { id: 0, image: ADDIMAGE }, { id: 0, image: ADDIMAGE }, { id: 0, image: ADDIMAGE },]);
    const [imageData, setImageData] = useState([{ image: ADDIMAGE },]);
    useEffect(() => {

    }, [])

    const addImageContainer = ({ item }) => {
        return (
            <Pressable
                onPress={() => {
                    setModal(true)
                }}
                style={{
                    width: WIDTH * 0.3,
                    height: HEIGHT * 0.18,
                    backgroundColor: WHITE,
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginHorizontal: WIDTH * 0.01,
                    marginVertical: HEIGHT * 0.01,
                    alignSelf: 'center',
                    borderWidth: 1,
                    borderBlockColor: BLACK,
                    borderBottomWidth: 10
                }}>
                <Image
                    style={{
                        width: WIDTH * 0.2,
                        height: HEIGHT * 0.08,
                    }}
                    resizeMode={'center'}
                    source={item.image}
                />
            </Pressable>
        )
    }
    return (
        <View style={{
            ...styles.mainContainer
        }}>
            <MyStatusBar backgroundColor={WHITE} barStyle={'dark-content'} />
            <Modal
                visible={modal}
                transparent={true}
                animationType='fade'
                statusBarTranslucent
                onRequestClose={() => setModal(false)}
            >
                <StatusBar backgroundColor='white' barStyle={'dark-content'} />
                {/* `rgba(100, 100, 100, 0.5)` `rgba(0,0, 0,0)`*/}
                <Pressable
                    onPress={() => {
                        setModal(false)
                    }}
                    style={{ flex: 1, width: WIDTH, backgroundColor: `rgba(100, 100, 100, 0.3)`, alignSelf: 'center', justifyContent: 'center', }}>
                    <View
                        onPress={() => {
                            setModal(false)
                        }}
                        style={{
                            height: HEIGHT * 0.23,
                            width: WIDTH * 0.9,
                            backgroundColor: WHITE,
                            alignSelf: 'center',
                            padding: 25,
                            justifyContent: 'space-between',
                            borderRadius: 4,
                            elevation: 20,
                        }}>
                        <Text style={{ color: BLACK, fontSize: 20, fontWeight: 'bold' }}>Action!</Text>
                        <Text style={{ color: BLACK, fontSize: 20, fontFamily: 'Roboto-Medium' }}>Upload images of the truck for further verification</Text>
                        <View style={{ alignSelf: 'flex-start', borderRadius: 5, flexDirection: 'row', }}>
                            <TouchableOpacity onPress={() => {
                                setModal(false)
                            }} style={{
                                backgroundColor: BLACK,
                                justifyContent: 'center',
                                alignItems: 'center',
                                borderRadius: 4,
                            }}>
                                <Text style={{ color: 'white', fontSize: 17, padding: 10, fontFamily: 'Roboto-Black' }}>Open Gallery</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => {
                                setModal(false)
                            }} style={{
                                backgroundColor: BLACK,
                                justifyContent: 'center',
                                alignItems: 'center',
                                borderRadius: 4,
                                marginHorizontal: WIDTH * 0.04
                            }}>
                                <Text style={{ color: 'white', fontSize: 17, padding: 10, fontFamily: 'Roboto-Black' }}>Camera</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Pressable >
            </Modal >
            <View style={{
                width: WIDTH,
                justifyContent: 'center',
                alignItems: imageData.length == 1 ? 'flex-start' : 'center'
            }}>
                <Text style={{ color: BLACK, fontSize: 20, fontWeight: 'bold', marginHorizontal: WIDTH * 0.01, }}>Add Images Here!</Text>

                <FlatList
                    numColumns={3}
                    data={imageData}
                    renderItem={addImageContainer}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        height: HEIGHT,
        width: WIDTH,
        // justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: WHITE
    }
})

export default Truckloading