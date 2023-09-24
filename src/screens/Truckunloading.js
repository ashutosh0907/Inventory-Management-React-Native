import {
  View,
  Text,
  ScrollView,
  Image,
  Pressable,
  StyleSheet,
  Alert,
  ToastAndroid,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {TextInputNumber} from '../components/TextInputNumber';
import {TextInputName} from '../components/TextInputName';
import {
  ADDIMAGE,
  DELETE,
  EXPAND,
  LORRY,
  MATERIAL,
  SCANNER,
  SELFIE,
} from '../constants/imagepath';
import {HEIGHT, MyStatusBar, WIDTH} from '../constants/config';
import {BLACK, WHITE} from '../constants/color';
import LinearGradient from 'react-native-linear-gradient';
import * as ImagePicker from 'react-native-image-picker';
import {Loader} from '../components/Loader';
import CameraOpentoScan from '../components/CameraOpentoScan';
import {GETNETWORK, POSTNETWORK} from '../utils/Network';
import {BASE_URL} from '../constants/url';
import Geolocation from 'react-native-geolocation-service';
import {getObjByKey} from '../utils/Storage';
import {convertToBase64} from '../utils/base64';
import ZoomImage from '../components/ZoomImage';

const Truckunloading = ({
  loader,
  scanner,
  barcodeoutnumber,
  setBarcodeNumber,
}) => {
  const [userSl, setUserSl] = useState('');
  const [barcodeno, setBarcodeNo] = useState(barcodeoutnumber);
  const [challanno, setChallanNumber] = useState('');
  const [challanSl, setChallanSl] = useState('');
  const [challanndate, setChallanDate] = useState('');
  const [commodity, setCommodity] = useState('');
  const [grade, setGrade] = useState('');
  const [lorrynumber, setLorryNumber] = useState('');
  const [drivername, setDriverName] = useState('');
  const [mobilenumber, setMobileNumber] = useState('');
  const [weight, setWeight] = useState('');
  const [lorryimage, setLorryImage] = useState('');
  const [materialimage, setMaterialImage] = useState('');
  const [selfieimage, setSelfieImage] = useState('');
  const [geoCoords, setGeoCoords] = useState({latitude: '', longitude: ''});
  const [expandUri, setExpandUri] = useState('');
  const [zoom, setZoom] = useState(false);

  useEffect(() => {
    setBarcodeNo(barcodeoutnumber);
    if (barcodeoutnumber != '' && barcodeoutnumber != null) {
      getDetails();
    }
  }, [barcodeoutnumber]);

  useEffect(() => {
    getUserData();
  }, []);

  useEffect(() => {
    getLatLong();
  }, [barcodeoutnumber]);

  const getUserData = async () => {
    console.log('Get User Data Called');
    let userdata = await getObjByKey('loginResponse');
    console.log(userdata);
    setUserSl(userdata.usr_sl);
  };

  const getLatLong = async () => {
    console.log('UN-- LOADING');
    try {
      if (true) {
        Geolocation.getCurrentPosition(
          position => {
            if (position) {
              lat = position?.coords?.latitude;
              long = position?.coords?.longitude;
            }
            console.log(lat, long);
            setGeoCoords({latitude: lat, longitude: long});
          },
          error => {
            Alert.alert('Turn on the Location');
            console.log(
              'Error in getting latitude longitude',
              error.code,
              '---',
              error.message,
            );
          },
          {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
        );
      }
    } catch (e) {
      Alert.alert('Turn on the Location');
      console.log(e);
    }
  };

  const getDetails = async () => {
    loader(true);
    const url = `${BASE_URL}api/findbarcode/${barcodeoutnumber}`;
    console.log('URL_IS ---------> ', url);
    GETNETWORK(url)
      .then(res => {
        console.log(res.data_value[0]);
        if (res.Code == 200) {
          if (res.data_value[0].Cancelled) {
            Alert.alert('Sorry This Barcode is Canceled');
          } else if (res.data_value[0].Status == 'I') {
            setBarcodeNumber(res.data_value[0].Barcode);
            setChallanNumber(res.data_value[0].ChallanNo);
            setChallanDate(res.data_value[0].ChallanDate);
            setCommodity(res.data_value[0].Commodity);
            setGrade(res.data_value[0].Grade);
            setLorryNumber(res.data_value[0].LorryNo);
            setDriverName(res.data_value[0].DriverName);
            setMobileNumber(res.data_value[0].MobileNo);
            setWeight(res.data_value[0].Weight);
            setChallanSl(res.data_value[0].ChallanSl);
            ToastAndroid.show('Auto Fetch Complete!', ToastAndroid.SHORT);
          } else if (res.data_value[0].Status == 'B') {
            Alert.alert('Sorry This Barcode is not IN');
            setBarcodeNumber('RESET');
            resetFields();
          } else if (res.data_value[0].Status == 'O') {
            Alert.alert('Sorry This Barcode is already USED');
            setBarcodeNumber('RESET');
            resetFields();
          }
          loader(false);
        } else {
          Alert.alert(res.msg);
          resetFields();
          loader(false);
        }
      })
      .catch(err => {
        loader(false);
      });
  };

  const captureImage = async type => {
    console.log('TYPE----->', type);
    let options = {
      storageOption: {
        path: 'images',
      },
      mediaType: 'mixed',
      videoQuality: 'medium',
      multiple: true,
      selectionLimit: 4,
      presentationStyle: 'formSheet',
    };
    if (true) {
      ImagePicker.launchCamera(options, response => {
        if (response.didCancel == undefined) {
          loader(true);
          if (type == 'LORRY') {
            setLorryImage(response.assets[0].uri);
          } else if (type == 'MATERIAL') {
            setMaterialImage(response.assets[0].uri);
          } else if (type == 'SELFIE') {
            setSelfieImage(response.assets[0].uri);
          }
          loader(false);
        }
      });
    }
  };

  const handleDelete = (type, uri) => {
    if (type == 'LORRY') {
      setLorryImage('');
    } else if (type == 'MATERIAL') {
      setMaterialImage('');
    } else if (type == 'SELFIE') {
      setSelfieImage('');
    }
  };

  const resetFields = () => {
    setBarcodeNumber('RESET');
    setBarcodeNumber('');
    setChallanNumber('');
    setChallanSl('');
    setChallanDate('');
    setCommodity('');
    setGrade('');
    setLorryNumber('');
    setDriverName('');
    setMobileNumber('');
    setWeight('');
    setLorryImage('');
    setMaterialImage('');
    setSelfieImage('');
    setGeoCoords({latitude: '', longitude: ''});
  };

  const base64Conversion = () => {
    var lorryimg = convertToBase64(lorryimage);
    var materialimg = convertToBase64(lorryimage);
    var selfieimg = convertToBase64(lorryimage);
    // arr.push()
    return {
      lorryimg: lorryimg,
      materialimg: materialimg,
      selfieimg: selfieimg,
    };
  };

  const handleSave = async () => {
    if (barcodeno == '' || barcodeno == null) {
      Alert.alert('Please scan the barcode');
    } else if (lorryimage == '' || lorryimage == null) {
      Alert.alert('Please capture lorry image');
    } else if (materialimage == '' || materialimage == null) {
      Alert.alert('Please capture material image');
    } else if (selfieimage == '' || selfieimage == null) {
      Alert.alert('Please capture your selfie');
    } else {
      loader(true);
      var base64Images = base64Conversion();
      const url = `${BASE_URL}api/savestatus`;
      const obj = {
        ChallanSl: challanSl,
        Barcode: barcodeno,
        Status: 'O',
        LorryImage: base64Images.lorryimg,
        MaterialImage: base64Images.materialimg,
        UserImage: base64Images.selfieimg,
        Lattitude: `${geoCoords.latitude}`,
        Longitude: `${geoCoords.longitude}`,
        Address: 'Reverse Geocode',
        UserSl: userSl,
      };
      console.log('Object LOADING -> ', obj);
      POSTNETWORK(url, obj)
        .then(res => {
          console.log('ashutosh response', res);
          if (res.Code == 200) {
            Alert.alert(res.data_value[0].Column1);
            resetFields();
            loader(false);
          } else {
            loader(false);
            Alert.alert(res.msg);
          }
        })
        .catch(err => {
          loader(false);
        });
    }
  };

  const expandImage = uri => {
    setExpandUri(uri);
    setZoom(true);
  };

  return (
    <React.Fragment>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          height: HEIGHT,
          width: WIDTH,
          // flex: 1,
          alignItems: 'center',
        }}>
        <ZoomImage visible={zoom} onBackPress={setZoom} uri={expandUri} />
        <View style={{...styles.flexRowContainer}}>
          <TextInputName
            value={barcodeno}
            title="Barcode Number"
            placeholder="Barcode Number"
            width="74%"
            onChangeText={setBarcodeNo}
          />
          <Pressable
            onPress={() => {
              scanner(true);
            }}
            style={{...styles.scannerImageContainer}}>
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
        <View style={{...styles.flexRowContainer}}>
          <TextInputName
            value={`${challanno}`}
            title="Challan Number"
            placeholder="Challan Number"
            width="45%"
            onChangeText={setChallanNumber}
          />
          <TextInputName
            value={challanndate}
            title="Challan Date"
            placeholder="Challan Date"
            width="45%"
            onChangeText={setChallanDate}
          />
        </View>
        <View style={{...styles.flexRowContainer}}>
          <TextInputName
            value={commodity}
            title="Commodity"
            placeholder="Commodity"
            width="45%"
            onChangeText={setCommodity}
          />
          <TextInputName
            value={grade}
            title="Grade"
            placeholder="Grade"
            width="45%"
            onChangeText={setGrade}
          />
        </View>
        <View style={{...styles.flexRowContainer}}>
          <TextInputName
            value={lorrynumber}
            title="Lorry Number"
            placeholder="Lorry Number"
            width="94%"
            onChangeText={setLorryNumber}
          />
        </View>
        <View style={{...styles.flexRowContainer}}>
          <TextInputName
            value={drivername}
            title="Driver Name"
            placeholder="Driver Name"
            width="94%"
            onChangeText={setDriverName}
          />
        </View>
        <View style={{...styles.flexRowContainer}}>
          <TextInputName
            value={mobilenumber}
            title="Mobile Number"
            placeholder="Mobile Number"
            width="45%"
            onChangeText={setMobileNumber}
          />
          <TextInputName
            value={`${weight}`}
            title="Weight"
            placeholder="Weight"
            width="45%"
            onChangeText={setWeight}
          />
        </View>
        <View
          style={{
            width: '92%',
          }}>
          <Text
            style={{
              color: BLACK,
              fontWeight: 'bold',
              fontSize: 16,
            }}>
            Upload Images
          </Text>
        </View>
        <View style={{...styles.flexRowContainer}}>
          <LinearGradient
            start={{x: 1, y: 0}}
            end={{x: 0, y: 1}}
            colors={['white', '#183a51']}
            style={{...styles.imageBoxContainer}}>
            <Pressable
              onPress={() => {
                captureImage('LORRY');
              }}
              style={{...styles.imageBoxPressable}}>
              <Image
                style={{
                  width: lorryimage ? '100%' : 40,
                  height: lorryimage ? '100%' : 40,
                }}
                resizeMode={'center'}
                source={lorryimage ? {uri: lorryimage} : LORRY}
              />
              {lorryimage && (
                <View style={{...styles.capturedImageContainer}}>
                  <View style={{...styles.deleteButton}}>
                    <Pressable
                      onPress={() => {
                        handleDelete('LORRY', lorryimage);
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
                  <View style={{...styles.expandButton}}>
                    <Pressable
                      onPress={() => {
                        expandImage(lorryimage);
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
                </View>
              )}
            </Pressable>
          </LinearGradient>
          <LinearGradient
            start={{x: 1, y: 0}}
            end={{x: 0, y: 1}}
            colors={['white', '#183a51']}
            style={{...styles.imageBoxContainer}}>
            <Pressable
              onPress={() => {
                captureImage('MATERIAL');
              }}
              style={{...styles.imageBoxPressable}}>
              <Image
                style={{
                  width: materialimage ? '100%' : 40,
                  height: materialimage ? '100%' : 40,
                }}
                resizeMode={'center'}
                source={materialimage ? {uri: materialimage} : MATERIAL}
              />
              {materialimage && (
                <View style={{...styles.capturedImageContainer}}>
                  <View style={{...styles.deleteButton}}>
                    <Pressable
                      onPress={() => {
                        handleDelete('MATERIAL', materialimage);
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
                  <View style={{...styles.expandButton}}>
                    <Pressable
                      onPress={() => {
                        expandImage(materialimage);
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
                </View>
              )}
            </Pressable>
          </LinearGradient>
          <LinearGradient
            start={{x: 1, y: 0}}
            end={{x: 0, y: 1}}
            colors={['white', '#183a51']}
            style={{...styles.imageBoxContainer}}>
            <Pressable
              onPress={() => {
                captureImage('SELFIE');
              }}
              style={{...styles.imageBoxPressable}}>
              <Image
                style={{
                  width: selfieimage ? '100%' : 40,
                  height: selfieimage ? '100%' : 40,
                }}
                resizeMode={'center'}
                source={selfieimage ? {uri: selfieimage} : SELFIE}
              />
              {selfieimage && (
                <View style={{...styles.capturedImageContainer}}>
                  <View style={{...styles.deleteButton}}>
                    <Pressable
                      onPress={() => {
                        handleDelete('SELFIE', selfieimage);
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
                  <View style={{...styles.expandButton}}>
                    <Pressable
                      onPress={() => {
                        expandImage(selfieimage);
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
                </View>
              )}
            </Pressable>
          </LinearGradient>
        </View>
        <View style={{...styles.flexRowContainer, height: '7%'}}>
          <LinearGradient
            start={{x: 0, y: 1}}
            end={{x: 1, y: 1}}
            colors={['#183a51', '#21495f', 'white']}
            style={{...styles.saveContainer}}>
            <Pressable
              onPress={() => {
                handleSave();
              }}
              style={{...styles.saveContainerPressable}}>
              <View>
                <Text
                  style={{
                    ...styles.saveTextstyle,
                  }}>
                  Save
                </Text>
              </View>
            </Pressable>
          </LinearGradient>
        </View>
      </ScrollView>
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  flexRowContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginVertical: HEIGHT * 0.007,
  },
  scannerImageContainer: {
    width: '16%',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 5,
  },
  saveTextstyle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: WHITE,
  },
  saveContainer: {
    width: '92%',
    // height: HEIGHT * 0.07,
    borderRadius: 5,
  },
  saveContainerPressable: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
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
    borderColor: WHITE,
  },
  imageBoxPressable: {
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
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
    paddingTop: 2,
  },
  expandButton: {
    height: '60%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Truckunloading;
