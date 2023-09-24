import React, {useState, useEffect} from 'react';

import {
  View,
  Text,
  Alert,
  PermissionsAndroid,
  Modal,
  Image,
  TouchableOpacity,
  BackHandler,
} from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import {RNCamera} from 'react-native-camera';
import {request, PERMISSIONS} from 'react-native-permissions';
import {StyleSheet} from 'react-native';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {
  CLOSE,
  FLASH,
  FLASHOFF,
  REDEEM_FAILED,
  REDEEM_SUCCESS,
  leftArrow,
} from '../constants/imagepath';
import {HEIGHT, MyStatusBar, WIDTH} from '../constants/config';
import {BLACK, BLACKK, STATUSBACKGROUND, WHITE} from '../constants/color';
import Loader from './Loader';
import {BASE_URL} from '../constants/url';
import {POSTNETWORK} from '../utils/Network';
import {getObjByKey} from '../utils/Storage';

export default CameraOpentoScan = ({showScanner, setBarcodeNumber}) => {
  const navigation = useNavigation();
  const [flash, setFlash] = useState(false);
  const [loader, setLoader] = useState(false);
  const [isCameraAuthorized, setCameraAuthorized] = useState(false);

  useEffect(() => {
    requestCameraPermission();
  }, []);

  const requestCameraPermission = () => {
    request(
      Platform.OS === 'ios'
        ? PERMISSIONS.IOS.CAMERA
        : PERMISSIONS.ANDROID.CAMERA,
    ).then(result => {
      console.log(result);
      if (result == 'granted') {
        setCameraAuthorized(true);
      }
    });
  };

  const handleBarcodeScan = data => {
    console.log('Scanned QR code: ', data);
    setBarcodeNumber(data);
    showScanner(false);
  };
  // if (!isCameraAuthorized) {
  //     return (
  //         <View>
  //             <Text>Please grant camera permission to scan QR codes.</Text>
  //         </View>
  //     );
  // }

  const CustomMarker = () => (
    <View style={Styles.markerContainer}>
      <View style={Styles.marker} />
    </View>
  );

  return (
    <Modal
      visible={true}
      transparent={true}
      animationType="fade"
      statusBarTranslucent
      onRequestClose={() => {
        showScanner(false);
      }}>
      <MyStatusBar backgroundColor={BLACK} barStyle={'light-content'} />
      <View
        style={{
          backgroundColor: 'rgba(52, 52, 52, 0.8)',
          flex: 1,
        }}>
        <QRCodeScanner
          containerStyle={{}}
          cameraStyle={{
            flex: 1,
            height: HEIGHT,
            width: WIDTH,
            alignSelf: 'center',
          }}
          onRead={({data}) => {
            if (data) {
              handleBarcodeScan(data);
            }
          }}
          type={RNCamera.Constants.Type.back}
          flashMode={
            flash
              ? RNCamera.Constants.FlashMode.torch
              : RNCamera.Constants.FlashMode.off
          }
          captureAudio={false}
          onBarCodeRead={handleBarcodeScan}
          reactivate={true}
          reactivateTimeout={1000}
          markerStyle={Styles.markerStyle}
          showMarker={<CustomMarker />}
        />
        <View
          style={{
            height: HEIGHT,
            width: WIDTH,
          }}>
          <View
            style={{
              flex: 1,
              backgroundColor: 'rgba(52, 52, 52, 0.2)',
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                width: '100%',
                height: '10%',
              }}>
              <TouchableOpacity
                style={{
                  width: '25%',
                  height: '100%',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                onPress={() => showScanner(false)}>
                <Image
                  resizeMode={'cover'}
                  source={CLOSE}
                  style={{width: 35, height: 35}}
                />
              </TouchableOpacity>
              <View
                style={{
                  width: '50%',
                  height: '100%',
                  justifyContent: 'center',
                  // backgroundColor: 'red'
                  // alignItems: 'center'
                }}>
                {/* <Text
                                    style={{
                                        fontSize: 25,
                                        color: WHITE,
                                        fontFamily: 'Roboto-Regular',
                                        fontWeight: 'bold',
                                    }}>
                                    Sli Logistics
                                </Text> */}
              </View>
              {flash ? (
                <TouchableOpacity
                  style={{
                    height: '100%',
                    width: '25%',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                  onPress={() => {
                    setFlash(false);
                  }}>
                  <Image
                    source={FLASHOFF}
                    style={{margin: 10, width: 35, height: 35}}
                  />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  style={{
                    height: '100%',
                    width: '25%',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                  onPress={() => {
                    setFlash(true);
                  }}>
                  <Image
                    source={FLASH}
                    style={{margin: 10, width: 35, height: 35}}
                  />
                </TouchableOpacity>
              )}
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const Styles = StyleSheet.create({
  camera: {
    flex: 1,
  },
  markerStyle: {
    borderWidth: 2,
    borderRadius: 10,
    width: 200,
    height: 200,
  },
  centerText: {
    flex: 1,
    fontSize: 18,
    padding: 32,
    color: '#FFF',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  markerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  marker: {
    borderWidth: 5,
    borderColor: WHITE,
    width: '40%',
    height: '20%',
  },
});
