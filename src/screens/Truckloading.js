import { View, Text, StyleSheet, StatusBar, Modal, TouchableOpacity, FlatList, Image, Pressable } from 'react-native';
import React, { useEffect, useState } from 'react';
import { BLACK, PINK, WHITE } from '../constants/color';
import { HEIGHT, MyStatusBar, WIDTH } from '../constants/config';
import { ADDIMAGE, CLOSE, DELETE, EXPAND } from '../constants/imagepath';
import * as ImagePicker from 'react-native-image-picker';
import { ReactNativeZoomableView } from '@openspacelabs/react-native-zoomable-view';

const Truckloading = () => {
    const [modal, setModal] = useState(false);
    const [expand, setExpand] = useState('');
    const [expandedModal, setExpandedModal] = useState({ visible: false, image: '' });
    const [imageData, setImageData] = useState([{ image: ADDIMAGE },]);
    useEffect(() => {

    }, [])

    const captureImage = async (type) => {
        let options = {
            storageOption: {
                path: "images",
            },
            mediaType: "mixed",
            videoQuality: "medium",
            multiple: true,
            selectionLimit: 4,
            presentationStyle: "formSheet"
        };
        if (type === 'capture') {
            ImagePicker.launchCamera(options, ((response) => {
                if (response.didCancel == undefined) {
                    setImageData([{ image: response.assets[0].uri }, ...imageData])
                }
            }));
        } else {
            ImagePicker.launchImageLibrary(options, ((response) => {
                if (response.didCancel == undefined) {
                    if (response.assets.length > 1) {
                        let data = [];
                        response.assets.map((obj, index) => {
                            data.push({ image: obj.uri });
                        })
                        setImageData([...data, ...imageData]);
                    } else {
                        setImageData([{ image: response.assets[0].uri }, ...imageData])
                    }
                }
            }));
        }
    };

    const handleDelete = (item) => {
        const { image } = item;
        let data = imageData;
        let updatedData = data.filter((obj, index) => {
            return obj.image != image;
        })
        setImageData(updatedData);
    }
    const handleExpand = (image) => {
        setExpand(image)
        setTimeout(() => {
            setExpand('');
        }, 4000)
    }
    const expandImage = (image) => {
        console.log(image)
        setExpandedModal({ visible: true, image: image })
    }


    const addImageContainer = ({ item }) => {
        const { image } = item;
        return (
            <Pressable
                onPress={() => {
                    if (item.image == ADDIMAGE) {
                        setModal(true)
                    } else {
                        handleExpand(image);
                    }
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
                        width: item.image == ADDIMAGE ? WIDTH * 0.2 : WIDTH * 0.29,
                        height: item.image == ADDIMAGE ? HEIGHT * 0.08 : HEIGHT * 0.16,
                    }}
                    resizeMode={item.image == ADDIMAGE ? 'center' : 'cover'}
                    source={item.image == ADDIMAGE ? ADDIMAGE : { uri: item.image }}
                />
                {item.image != ADDIMAGE &&
                    <View style={{
                        width: '100%',
                        height: '100%',
                        position: 'absolute',
                    }}>
                        <View style={{
                            width: '98%',
                            alignSelf: 'center',
                            alignItems: 'flex-end'
                        }}>
                            <Pressable onPress={() => {
                                handleDelete(item);
                            }}>
                                <Image
                                    style={{
                                        width: 35,
                                        height: 35,
                                    }}
                                    resizeMode={'center'}
                                    source={DELETE}
                                />
                            </Pressable>
                        </View>
                        {item.image == expand && <View style={{
                            height: '60%',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                            <Pressable onPress={() => {
                                expandImage(item.image);
                            }}>
                                <Image
                                    style={{
                                        width: 35,
                                        height: 35,
                                    }}
                                    resizeMode={'center'}
                                    source={EXPAND}
                                />
                            </Pressable>
                        </View>}
                    </View>
                }
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
                                captureImage('opengallery');
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
                                captureImage('capture');
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
            <Modal
                visible={expandedModal.visible}
                transparent={true}
                animationType='fade'
                statusBarTranslucent
                onRequestClose={() => setExpandedModal({ visible: false, image: '' })}
            >
                <MyStatusBar backgroundColor='white' barStyle={'dark-content'} />
                <Pressable
                    onPress={() => {
                        setExpandedModal({ visible: false, image: '' })
                    }}
                    style={{ flex: 1, width: WIDTH, backgroundColor: `rgba(100, 100, 100, 0.3)`, alignSelf: 'center', justifyContent: 'center', }}>

                    <View style={{
                        height: HEIGHT * 0.7,
                        width: WIDTH * 0.9,
                        backgroundColor: WHITE,
                        alignSelf: 'center',
                        padding: 20,
                        justifyContent: 'space-between',
                        borderRadius: 4,
                        elevation: 20,
                    }}>
                        <View style={{
                            width: '100%',
                            alignSelf: 'center',
                            alignItems: 'flex-end',
                            marginVertical: 10,
                            position: 'absolute',
                            zIndex: 1,
                        }}>
                            <Pressable onPress={() => {
                                setExpandedModal({ visible: false, image: '' })
                            }}>
                                <Image
                                    style={{
                                        width: 35,
                                        height: 35,
                                    }}
                                    resizeMode={'center'}
                                    source={CLOSE}
                                />
                            </Pressable>
                        </View>
                        <ReactNativeZoomableView
                            maxZoom={30}
                            initialZoom={1}
                            bindToBorders={true}
                        >
                            <View style={{
                                flex: 1,
                                width: '100%',
                                height: '60%',
                                justifyContent: 'center'
                            }}>
                                <Image
                                    style={{
                                        width: '100%',
                                        height: '70%',
                                    }}
                                    resizeMode={'center'}
                                    source={{ uri: expandedModal?.image }}
                                />
                            </View>
                        </ReactNativeZoomableView>
                    </View>
                </Pressable >
            </Modal >
            <View style={{
                width: WIDTH,
                flex: 1,
                justifyContent: 'center',
                // alignItems: imageData.length == 1 ? 'flex-start' : 'center'
                alignItems: 'flex-start'
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