import { View, Text, ScrollView, Image, Pressable, StyleSheet, Alert, ToastAndroid } from 'react-native'
import React, { useState, useEffect } from 'react'
import { TextInputNumber } from '../components/TextInputNumber'
import { TextInputName } from '../components/TextInputName'
import { ADDIMAGE, DELETE, EXPAND, LORRY, MATERIAL, SCANNER, SELFIE } from '../constants/imagepath'
import { HEIGHT, MyStatusBar, WIDTH } from '../constants/config'
import { BLACK, WHITE } from '../constants/color'
import LinearGradient from 'react-native-linear-gradient'
import * as ImagePicker from 'react-native-image-picker';
import { Loader } from '../components/Loader'
import CameraOpentoScan from '../components/CameraOpentoScan'
import { GETNETWORK } from '../utils/Network'
import { BASE_URL } from '../constants/url'

const Truckloading = ({ loader, scanner, barcodeinnumber }) => {
    const [barcodeno, setBarcodeNumber] = useState('')
    const [challanno, setChallanNumber] = useState('')
    const [challanndate, setChallanDate] = useState('')
    const [commodity, setCommodity] = useState('')
    const [grade, setGrade] = useState('')
    const [lorrynumber, setLorryNumber] = useState('')
    const [drivername, setDriverName] = useState('')
    const [mobilenumber, setMobileNumber] = useState('')
    const [weight, setWeight] = useState('')
    const [lorryimage, setLorryImage] = useState('')
    const [materialimage, setMaterialImage] = useState('')
    const [selfieimage, setSelfieImage] = useState('')

    useEffect(() => {
        setBarcodeNumber(barcodeinnumber)
        console.log(barcodeinnumber)
        if (barcodeinnumber != '' && barcodeinnumber != null) {
            getDetails();
        }
    }, [barcodeinnumber])

    const getDetails = async () => {
        loader(true)
        const url = `${BASE_URL}api/findbarcode/${barcodeinnumber}`;
        console.log("URL_IS ---------> ", url)
        GETNETWORK(url).then(res => {
            if (res.Code == 200) {
                setBarcodeNumber(res.data_value[0].Barcode)
                setChallanNumber(res.data_value[0].ChallanNo)
                setChallanDate(res.data_value[0].ChallanDate)
                setCommodity(res.data_value[0].Commodity)
                setGrade(res.data_value[0].Grade)
                setLorryNumber(res.data_value[0].LorryNo)
                setDriverName(res.data_value[0].DriverName)
                setMobileNumber(res.data_value[0].MobileNo)
                setWeight(res.data_value[0].Weight)
                ToastAndroid.show("Fetching Complete!", ToastAndroid.SHORT)
                loader(false)
            }
            else {
                Alert.alert(res.msg);
                loader(false)
            }
        }).catch(err => {
            loader(false)
        })
    }

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
                        setLorryImage(response.assets[0].uri)
                    }
                    else if (type == "MATERIAL") {
                        setMaterialImage(response.assets[0].uri);
                    }
                    else if (type == "SELFIE") {
                        setSelfieImage(response.assets[0].uri);
                    }
                }
            }));
        }
    };

    const handleDelete = (type, uri) => {
        if (type == "LORRY") {
            setLorryImage('');
        }
        else if (type == "MATERIAL") {
            setMaterialImage('')
        }
        else {
            setSelfieImage('')
        }
    }

    return (
        <React.Fragment>
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                    height: HEIGHT,
                    width: WIDTH,
                    alignItems: 'center',
                }}>
                <View style={{ ...styles.flexRowContainer }}>
                    <TextInputName
                        value={barcodeno}
                        title='Barcode Number'
                        placeholder='Barcode Number'
                        width='74%'
                        onChangeText={setBarcodeNumber}
                    />
                    <Pressable
                        onPress={() => {
                            scanner(true)
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
                        value={`${challanno}`}
                        title='Challan Number'
                        placeholder='Challan Number'
                        width='45%'
                        onChangeText={setChallanNumber}
                    />
                    <TextInputName
                        value={challanndate}
                        title='Challan Date'
                        placeholder='Challan Date'
                        width='45%'
                        onChangeText={setChallanDate}
                    />
                </View>
                <View style={{ ...styles.flexRowContainer }}>
                    <TextInputName
                        value={commodity}
                        title='Commodity'
                        placeholder='Commodity'
                        width='45%'
                        onChangeText={setCommodity}
                    />
                    <TextInputName
                        value={grade}
                        title='Grade'
                        placeholder='Grade'
                        width='45%'
                        onChangeText={setGrade}
                    />
                </View>
                <View style={{ ...styles.flexRowContainer }}>
                    <TextInputName
                        value={lorrynumber}
                        title='Lorry Number'
                        placeholder='Lorry Number'
                        width='94%'
                        onChangeText={setLorryNumber}
                    />
                </View>
                <View style={{ ...styles.flexRowContainer }}>
                    <TextInputName
                        value={drivername}
                        title='Driver Name'
                        placeholder='Driver Name'
                        width='94%'
                        onChangeText={setDriverName}
                    />
                </View>
                <View style={{ ...styles.flexRowContainer }}>
                    <TextInputName
                        value={mobilenumber}
                        title='Mobile Number'
                        placeholder='Mobile Number'
                        width='45%'
                        onChangeText={setMobileNumber}
                    />
                    <TextInputName
                        value={`${weight}`}
                        title='Weight'
                        placeholder='Weight'
                        width='45%'
                        onChangeText={setWeight}
                    />
                </View>
                <View style={{
                    width: '92%',
                }}>
                    <Text style={{
                        color: BLACK,
                        fontWeight: 'bold',
                        fontSize: 16,
                    }}>
                        Upload Images
                    </Text>
                </View>
                <View style={{ ...styles.flexRowContainer }}>
                    <LinearGradient
                        start={{ x: 1, y: 0 }}
                        end={{ x: 0, y: 1 }}
                        colors={['white', '#183a51',]}
                        style={{ ...styles.imageBoxContainer }}>
                        <Pressable
                            onPress={() => {
                                captureImage("LORRY")
                            }}
                            style={{ ...styles.imageBoxPressable }}>
                            <Image
                                style={{
                                    width: lorryimage ? '100%' : 40,
                                    height: lorryimage ? '100%' : 40,
                                }}
                                resizeMode={'center'}
                                source={lorryimage ? { uri: lorryimage } : LORRY}
                            />
                            {lorryimage && <View style={{ ...styles.capturedImageContainer }}>
                                <View style={{ ...styles.deleteButton }}>
                                    <Pressable onPress={() => {
                                        handleDelete("LORRY", lorryimage);
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
                                <View style={{ ...styles.expandButton }}>
                                    <Pressable onPress={() => {
                                        // expandImage(lorryimage);
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
                                </View>
                            </View>}
                        </Pressable>
                    </LinearGradient>
                    <LinearGradient
                        start={{ x: 1, y: 0 }}
                        end={{ x: 0, y: 1 }}
                        colors={['white', '#183a51',]}
                        style={{ ...styles.imageBoxContainer }}>
                        <Pressable
                            onPress={() => {
                                captureImage("MATERIAL")
                            }}
                            style={{ ...styles.imageBoxPressable }}>
                            <Image
                                style={{
                                    width: materialimage ? '100%' : 40,
                                    height: materialimage ? '100%' : 40,
                                }}
                                resizeMode={'center'}
                                source={materialimage ? { uri: materialimage } : MATERIAL}
                            />
                            {materialimage && <View style={{ ...styles.capturedImageContainer }}>
                                <View style={{ ...styles.deleteButton }}>
                                    <Pressable onPress={() => {
                                        handleDelete("MATERIAL", materialimage);
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
                                <View style={{ ...styles.expandButton }}>
                                    <Pressable onPress={() => {
                                        // expandImage(lorryimage);
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
                                </View>
                            </View>}
                        </Pressable>
                    </LinearGradient>
                    <LinearGradient
                        start={{ x: 1, y: 0 }}
                        end={{ x: 0, y: 1 }}
                        colors={['white', '#183a51',]}
                        style={{ ...styles.imageBoxContainer }}>
                        <Pressable
                            onPress={() => {
                                captureImage("SELFIE")
                            }}
                            style={{ ...styles.imageBoxPressable }}>
                            <Image
                                style={{
                                    width: selfieimage ? '100%' : 40,
                                    height: selfieimage ? '100%' : 40,
                                }}
                                resizeMode={'center'}
                                source={selfieimage ? { uri: selfieimage } : SELFIE}
                            />
                            {selfieimage && <View style={{ ...styles.capturedImageContainer }}>
                                <View style={{ ...styles.deleteButton }}>
                                    <Pressable onPress={() => {
                                        handleDelete("SELFIE", selfieimage);
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
                                <View style={{ ...styles.expandButton }}>
                                    <Pressable onPress={() => {
                                        // expandImage(lorryimage);
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
                                </View>
                            </View>}
                        </Pressable>
                    </LinearGradient>

                </View>
                <View style={{ ...styles.flexRowContainer }}>
                    <LinearGradient
                        start={{ x: 0, y: 1 }}
                        end={{ x: 1, y: 1 }}
                        colors={['#183a51', '#21495f', 'white',]}
                        style={{ ...styles.saveContainer }}>
                        <Pressable
                            onPress={() => {
                                loader(true)
                                setTimeout(() => {
                                    loader(false)
                                }, 1000)
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
        marginVertical: HEIGHT * 0.007
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
    },
    imageBoxContainer: {
        width: WIDTH * 0.28,
        height: HEIGHT * 0.17,
        backgroundColor: WHITE,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: WIDTH * 0.01,
        marginVertical: HEIGHT * 0.01,
        alignSelf: 'center',
        borderRadius: 4,
        borderWidth: 1,
        borderColor: WHITE
    },
    imageBoxPressable: {
        height: '100%',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    capturedImageContainer: {
        width: '99%',
        height: '99%',
        position: 'absolute',
    },
    deleteButton: {
        width: '98%',
        alignSelf: 'center',
        alignItems: 'flex-end',
        paddingRight: 5,
        paddingTop: 2
    },
    expandButton: {
        height: '60%',
        justifyContent: 'center',
        alignItems: 'center'
    }
})
export default Truckloading;