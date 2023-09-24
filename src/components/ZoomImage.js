import {View, Text, Modal, Pressable, Image} from 'react-native';
import React from 'react';
import {HEIGHT, MyStatusBar, WIDTH} from '../constants/config';
import {WHITE} from '../constants/color';
import {CLOSE} from '../constants/imagepath';
import {ReactNativeZoomableView} from '@openspacelabs/react-native-zoomable-view';
const ZoomImage = ({
  visible = false,
  onBackPress,
  imageStyle,
  source,
  uri,
  backgroundColor = `rgba(100, 100, 100, 0.5)`,
}) => {
  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      statusBarTranslucent
      onRequestClose={() => onBackPress(false)}>
      <MyStatusBar backgroundColor="#183a51" barStyle={'dark-content'} />
      <Pressable
        onPress={() => {
          onBackPress(false);
        }}
        style={{
          flex: 1,
          width: WIDTH,
          backgroundColor: `rgba(100, 100, 100, 0.3)`,
          alignSelf: 'center',
          justifyContent: 'center',
        }}>
        <View
          style={{
            height: HEIGHT * 0.83,
            width: WIDTH * 0.95,
            backgroundColor: WHITE,
            alignSelf: 'center',
            // padding: 20,
            justifyContent: 'space-between',
            borderRadius: 5,
            elevation: 20,
          }}>
          <View
            style={{
              width: '100%',
              alignSelf: 'center',
              alignItems: 'flex-end',
              marginVertical: 10,
              position: 'absolute',
              zIndex: 1,
            }}>
            <Pressable
              style={{
                width: '20%',
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onPress={() => {
                onBackPress(false);
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
            initialZoom={1.1}
            bindToBorders={true}>
            <View
              style={{
                flex: 1,
                width: '100%',
                height: '60%',
                justifyContent: 'center',
                borderRadius: 5,
              }}>
              <Image
                style={{
                  borderRadius: 5,
                  width: '100%',
                  height: '70%',
                }}
                resizeMode={'center'}
                source={{uri: uri}}
              />
            </View>
          </ReactNativeZoomableView>
        </View>
      </Pressable>
    </Modal>
  );
};

export default ZoomImage;
