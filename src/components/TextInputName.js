import React from "react";
import { StyleSheet, Text, TextInput, View } from 'react-native'
import { HEIGHT, STYLES, WIDTH } from "../constants/config";
import { BLACK, Border_Color, GRAY, WHITE } from "../constants/color";
import { RFValue } from "react-native-responsive-fontsize";
import LinearGradient from "react-native-linear-gradient";

export const TextInputName = ({
  title = "",
  value = "",
  placeholder = "",
  width = '100%',
  // keyboardType="default",
  // maxLength=0,
  onChangeText,
  MarginVertical = 0,
  // editable="default"
}) => {

  return (
    <>
      <View style={{
        width: width,
      }}>
        <View style={{
        }}>
          <Text style={{
            color: BLACK,
            fontWeight: 'bold',
            fontSize: 16,
            paddingLeft: 5
          }}>
            {title}
          </Text>
        </View>
        <View style={{
          borderRadius: 7,
          borderWidth: 0.6,
          borderColor: WHITE,
          marginTop: 5,
        }}>
          <LinearGradient
            end={{ x: 1, y: 1 }}
            start={{ x: 0, y: 2 }}
            colors={['rgba(255, 255, 255, 0.3)', 'rgba(255, 255, 255, 0.3)', 'rgba(100, 100, 100, 0.4)',]}
            style={{
              borderRadius: 7
            }}>
            <TextInput
              editable={true}
              onChangeText={(txt) => {
                // if (!/[0-9,.*-@]/.test(txt.slice(-1))) {
                onChangeText(txt);
                // } else {
                // }
              }}
              value={value}
              // keyboardType="default"
              placeholder={placeholder}
              placeholderTextColor={'#444654'}
              style={{
                ...Styles.inputTextStyle,
              }}
            // keyboardType={keyboardType}
            // maxLength={maxLength}
            />
          </LinearGradient>
        </View>
      </View>



    </>
  )
}
const Styles = StyleSheet.create({
  ViewForTextInput: {
    //   ...STYLES.elevation,
    height: 50,
    //backgroundColor:WHITE,
    alignSelf: 'center',
    borderRadius: 7,
    borderWidth: 0.6,
    borderColor: WHITE,
    marginTop: 5

  },
  inputTextStyle: {
    fontSize: 15,
    color: BLACK,
    //borderRadius:10,
    // fontFamily: "Roboto-Regular",
    fontWeight: 'bold',
    marginLeft: 5,
  },
});