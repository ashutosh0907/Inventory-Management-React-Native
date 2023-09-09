import { View, Text, StyleSheet, ToastAndroid } from 'react-native'
import React from 'react'
import { BLACK } from '../constants/color'
import { storeObjByKey } from '../utils/Storage'
import { checkuserToken } from '../redux/actions/auth'
import { useDispatch } from "react-redux";

const Login = ({ navigation }) => {
  const dispatch = useDispatch();
  return (
    <View style={{
      ...styles.mainContainer
    }}>
      <Text
        style={{
          color: BLACK
        }}
        onPress={() => {
          storeObjByKey('loginResponse', { name: 'Ashutosh', id: 1 }).then(() => {
            dispatch(checkuserToken());
          })
          ToastAndroid.show('Login Successful', ToastAndroid.SHORT)
        }}
      >Login</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})

export default Login