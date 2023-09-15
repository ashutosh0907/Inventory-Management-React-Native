import React, { useState } from "react";
import { StyleSheet, Text, TextInput, View, Modal, Image } from 'react-native'
import { WIDTH } from "../constants/config";
import { WHITE } from "../constants/color";
import { LOADER } from "../constants/imagepath";

export const Loader = ({
  // title="",
  // value = "",
  // placeholder = "",
  // keyboardType="default",
  // maxLength=0,
  // onChangeText,
  // MarginVertical=0,
  // editable="default"
}) => {


  return (
    <>
      <Modal
        visible={loading}
        onRequestClose={() => {
          // setLoading(false);
        }}
        transparent
        statusBarTranslucent
        hardwareAccelerated
      >
        <View
          style={{
            flex: 1,
            backgroundColor: "rgba(40, 40, 40, 0.3)",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Image
            style={{
              height: '100%',
              width: '100%',
            }}
            source={LOADER}
          />
        </View>
      </Modal>
    </>
  )
}
const Styles = StyleSheet.create({
  ViewForTextInput: {
    //   ...STYLES.elevation,
    height: 50,
    width: WIDTH * 0.9,
    //backgroundColor:WHITE,
    alignSelf: 'center',
    borderRadius: 7,
    borderWidth: 0.6,
    borderColor: WHITE,
    marginTop: 5

  },
  inputTextStyle: {
    fontSize: 12,
    color: WHITE,
    //borderRadius:10,
    marginLeft: 5,
  },
});