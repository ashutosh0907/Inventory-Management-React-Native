import React from "react";
import { StyleSheet, Text, TextInput, View } from 'react-native'
import { STYLES, WIDTH } from "../constants/config";
import { BLACK, Border_Color, GRAY, WHITE } from "../constants/color";
import { RFValue } from "react-native-responsive-fontsize";
import LinearGradient from "react-native-linear-gradient";

export const TextInputNumber = ({
  title = "",
  value = "",
  placeholder = "",
  keyboardType = "default",
  maxLength = 0,
  onChangeText,
  MarginVertical = 0,
  

}) => {

  return (

    <>
      <View style={{
        height: 20,
        width: WIDTH * 0.85,
        // backgroundColor:'red',
        // backgroundColor:WHITE,
        // position:'absolute',
        // marginTop:20,
        // marginLeft:10,
        alignSelf: 'center'
      }}>
        <Text style={{
          color: WHITE,
          // color:BLACK,
          fontFamily: 'Roboto-Medium',
          fontSize: 16
        }}>
          {title}
        </Text>

      </View>


      <View style={{
        ...Styles.ViewForTextInput,
        marginVertical: MarginVertical,
      }}>
        <LinearGradient
          start={{ x: 1, y: 1 }}
          end={{ x: 0, y: 1 }}
          colors={['black', 'grey',]}
          style={{
            borderRadius: 7,
            flex: 1
          }}

        >

          <TextInput
            onChangeText={(txt) => {
              if (!/[a-zA-z.," "-]/.test(txt.slice(-1))) {
                onChangeText(txt);
              } else {
              }
            }}
            // editable={editable}
            value={value}
            placeholder={placeholder}
            autoFocus={true}
            placeholderTextColor={WHITE}
            style={{
              ...Styles.inputTextStyle,
            }}
            keyboardType={keyboardType}
            maxLength={maxLength}
          />
        </LinearGradient>

      </View>
    </>
  )
}
const Styles = StyleSheet.create({
  ViewForTextInput: {
    //   ...STYLES.elevation,
    height: 50,
    width: WIDTH * 0.9,
    // backgroundColor:'green',
    alignSelf: 'center',
    borderRadius: 7,
    borderWidth: 0.6,
    borderColor: WHITE,
    marginTop: 5
  },
  inputTextStyle: {
    fontSize: RFValue(16),
    color: WHITE,
    // color: BLACK,
    fontFamily: "Roboto-Regular",
    marginLeft: 5,
  },
});