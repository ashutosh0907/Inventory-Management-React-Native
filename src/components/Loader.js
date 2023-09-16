import React from "react";
import { Image, Modal, Pressable, ScrollView, View } from "react-native";
import { HEIGHT, MyStatusBar, WIDTH } from "../constants/config";
import { EMI_LOADER, LOADER } from "../constants/imagepath";
import { WHITE } from "../constants/color";

export const Loader = ({
  visible = false,
  onBackPress,
  imageStyle,
  source,
  backgroundColor = `rgba(100, 100, 100, 0.5)`,
}) => {
  return (
    <React.Fragment><MyStatusBar barStyle={'dark-content'} />
      <Modal
        visible={visible}
        transparent={true}
        animationType='fade'
        statusBarTranslucent
        onRequestClose={() => onBackPress != undefined && onBackPress(false)}
      >
        <View style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'rgba(100, 100, 100, 0.5)'
        }}>
          <Pressable
            style={{
              // flex: 1,
              width: WIDTH * 0.4,
              height: HEIGHT * 0.14,
              justifyContent: 'center',
              backgroundColor: WHITE,
              alignItems: 'center',
              borderRadius: 10
            }}>

            <Image
              style={{
                height: 130,
                width: 130
              }}
              source={LOADER}
            />
          </Pressable>
        </View>

      </Modal>
    </React.Fragment>
  )
}
