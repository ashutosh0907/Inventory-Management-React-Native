import { View, Text, ScrollView, Image, Pressable, StyleSheet, Alert } from 'react-native'
import React, { useState } from 'react'
import { TextInputNumber } from '../components/TextInputNumber'
import { TextInputName } from '../components/TextInputName'
import { ADDIMAGE, DELETE, LORRY, MATERIAL, SCANNER, SELFIE } from '../constants/imagepath'
import { HEIGHT, MyStatusBar, WIDTH } from '../constants/config'
import { BLACK, WHITE } from '../constants/color'
import LinearGradient from 'react-native-linear-gradient'
import * as ImagePicker from 'react-native-image-picker';
import { Loader } from '../components/Loader'

const Truckloading = () => {
    const [barcodeNumber, setBarcodeNumber] = useState('')
    const [loader, setLoader] = useState(false)
    const [images, setImages] = useState({ lorry: '', material: '', selfie: '' });

    const captureImage = async (type) => {
        console.log("TYPE----->", type)
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
        if (true) {
            ImagePicker.launchCamera(options, ((response) => {
                if (response.didCancel == undefined) {
                    if (type == "LORRY") {
                        setImages({
                            lorry: response.assets[0].uri,
                            material: images.material,
                            selfie: images.selfie
                        })
                    }
                    else if (type == "MATERIAL") {
                        setImages({
                            material: response.assets[0].uri,
                            selfie: images.selfie,
                            lorry: images.lorry
                        })
                    }
                    else if (type == "SELFIE") {
                        setImages({
                            selfie: response.assets[0].uri,
                            material: images.material,
                            lorry: images.lorry
                        })
                    }
                }
            }));
        }
        // else {
        //     ImagePicker.launchImageLibrary(options, ((response) => {
        //         if (response.didCancel == undefined) {
        //             if (response.assets.length > 1) {
        //                 let data = [];
        //                 response.assets.map((obj, index) => {
        //                     data.push({ image: obj.uri });
        //                 })
        //                 setImageData([...data, ...imageData]);
        //             } else {
        //                 setImageData([{ image: response.assets[0].uri }, ...imageData])
        //             }
        //         }
        //     }));
        // }
    };

    const Imagebox = ({ source, type }) => {
        return (
            <LinearGradient
                start={{ x: 1, y: 0 }}
                end={{ x: 0, y: 1 }}
                colors={['white', '#183a51',]}
                style={{
                    width: WIDTH * 0.28,
                    height: HEIGHT * 0.17,
                    backgroundColor: WHITE,
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginHorizontal: WIDTH * 0.01,
                    marginVertical: HEIGHT * 0.01,
                    alignSelf: 'center',
                    borderRadius: 4,
                }}>
                <Pressable
                    onPress={() => {
                        captureImage(type)
                    }}
                    style={{
                        height: '100%',
                        width: '100%',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                    <Image
                        style={{
                            width: 40,
                            height: 40,
                        }}
                        resizeMode={'center'}
                        source={source}
                    />
                    {/* 
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
                                // expandImage(item.image);
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
                } */}
                </Pressable>
            </LinearGradient>
        )
    }
    return (
        <React.Fragment>
            <Loader visible={loader} />
            <ScrollView contentContainerStyle={{
                height: HEIGHT,
                width: WIDTH,
                alignItems: 'center',
            }}>
                <View style={{ ...styles.flexRowContainer }}>
                    <TextInputName
                        value={barcodeNumber}
                        title='Barcode Number'
                        placeholder='Barcode Number'
                        width='74%'
                        onChangeText={setBarcodeNumber}
                    />
                    <Pressable
                        onPress={() => {
                            Alert.alert('open sacanner')
                        }}
                        style={{ ...styles.scannerImageContainer }}>
                        <Image
                            style={{
                                width: 40,
                                height: 40,
                            }}
                            resizeMode={'center'}
                            source={SCANNER}
                        />
                    </Pressable>
                </View>
                <View style={{ ...styles.flexRowContainer }}>
                    <TextInputName
                        value={barcodeNumber}
                        title='Challan Number'
                        placeholder='Challan Number'
                        width='45%'
                        onChangeText={setBarcodeNumber}
                    />
                    <TextInputName
                        value={barcodeNumber}
                        title='Challan Date'
                        placeholder='Challan Date'
                        width='45%'
                        onChangeText={setBarcodeNumber}
                    />
                </View>
                <View style={{ ...styles.flexRowContainer }}>
                    <TextInputName
                        value={barcodeNumber}
                        title='Commodity'
                        placeholder='Challan Number'
                        width='45%'
                        onChangeText={setBarcodeNumber}
                    />
                    <TextInputName
                        value={barcodeNumber}
                        title='Grade'
                        placeholder='Challan Date'
                        width='45%'
                        onChangeText={setBarcodeNumber}
                    />
                </View>
                <View style={{ ...styles.flexRowContainer }}>
                    <TextInputName
                        value={barcodeNumber}
                        title='Lorry Number'
                        placeholder='Lorry Number'
                        width='94%'
                        onChangeText={setBarcodeNumber}
                    />
                </View>
                <View style={{ ...styles.flexRowContainer }}>
                    <TextInputName
                        value={barcodeNumber}
                        title='Driver Name'
                        placeholder='Driver Name'
                        width='94%'
                        onChangeText={setBarcodeNumber}
                    />
                </View>
                <View style={{ ...styles.flexRowContainer }}>
                    <TextInputName
                        value={barcodeNumber}
                        title='Mobile Number'
                        placeholder='Mobile Number'
                        width='45%'
                        onChangeText={setBarcodeNumber}
                    />
                    <TextInputName
                        value={barcodeNumber}
                        title='Weight'
                        placeholder='Weight'
                        width='45%'
                        onChangeText={setBarcodeNumber}
                    />
                </View>
                <View style={{ ...styles.flexRowContainer }}>
                    <Imagebox source={LORRY} type={'LORRY'} />
                    <Imagebox source={MATERIAL} type={'MATERIAL'} />
                    <Imagebox source={SELFIE} type={'SELFIE'} />
                </View>
                <View style={{ ...styles.flexRowContainer }}>
                    <LinearGradient
                        start={{ x: 0, y: 1 }}
                        end={{ x: 1, y: 1 }}
                        colors={['#183a51', '#21495f', 'white',]}
                        style={{ ...styles.saveContainer }}>
                        <Pressable
                            onPress={() => {
                                console.log("first", images)
                                setLoader(true)
                                setTimeout(() => {
                                    setLoader(false)
                                }, 2000)
                            }}
                            style={{ ...styles.saveContainerPressable }}>
                            <View>
                                <Text style={{
                                    ...styles.saveTextstyle
                                }}>Save</Text>
                            </View>
                        </Pressable>
                    </LinearGradient>
                </View>
            </ScrollView>
        </React.Fragment>
    )
}
const styles = StyleSheet.create({
    flexRowContainer: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginVertical: HEIGHT * 0.008
    },
    scannerImageContainer: {
        width: '16%',
        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingBottom: 5
    },
    saveTextstyle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: WHITE
    },
    saveContainer: {
        width: '92%',
        height: HEIGHT * 0.07,
        borderRadius: 5,
    },
    saveContainerPressable: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    }
})
export default Truckloading