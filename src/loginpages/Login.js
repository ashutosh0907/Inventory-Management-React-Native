import { Alert, View, Text, StyleSheet, ScrollView, ToastAndroid, ImageBackground, Modal, Pressable, TouchableOpacity, Image, KeyboardAvoidingView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { BLACK, WHITE } from '../constants/color'
import { storeObjByKey } from '../utils/Storage'
import { checkuserToken } from '../redux/actions/auth'
import { useDispatch } from "react-redux";
import { GALLERY, LOGO, TRUCK } from '../constants/imagepath'
import { HEIGHT, MyStatusBar, WIDTH } from '../constants/config'
import { TextInputName } from '../components/TextInputName'
import { BASE_URL } from '../constants/url'
import { POSTNETWORK } from '../utils/Network'
import { Loader } from '../components/Loader'

const Login = ({ navigation }) => {
  const dispatch = useDispatch();
  const [showlogin, setLogin] = useState('false');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setLogin(true)
    }, 2000)
  }, [])

  const handleLogin = () => {
    setLoader(true);
    const url = `${BASE_URL}api/login`;
    const obj = {
      userid: username,
      password: password
    }
    POSTNETWORK(url, obj).then(res => {
      if (res.Code == 200) {
        setLoader(false);
        storeObjByKey('loginResponse', res.data[0]).then(() => {
          dispatch(checkuserToken())
        })
        ToastAndroid.show("Login Successful", ToastAndroid.SHORT)
        setLoader(false)
      }
      else {
        Alert.alert(res.msg);
        setLoader(false)
      }
    }).catch(err => {
      setLoader(false)
    })

  }
  return (
    <React.Fragment>
      <MyStatusBar backgroundColor='#7ca8d5' barStyle={'dark-content'} />
      <KeyboardAvoidingView behavior='height' style={{
        flex: 1
      }}>
        <ImageBackground resizeMode='cover' source={TRUCK} style={styles.image}>
          <Loader visible={loader} />
          <Modal
            visible={showlogin}
            transparent={true}
            animationType='fade'
            statusBarTranslucent
            onRequestClose={() => { }}>
            <MyStatusBar backgroundColor='#7ca8d5' barStyle={'dark-content'} />

            <ScrollView showsVerticalScrollIndicator={false}>
              <View
                style={{
                  width: WIDTH,
                  height: HEIGHT,
                  backgroundColor: `rgba(100, 100, 100, 0.0)`,
                  alignSelf: 'center',
                }}>
                <View style={{
                  width: '100%',
                  height: '22%',
                  alignItems: 'center',
                  alignSelf: 'center',
                  justifyContent: 'flex-end',
                  paddingBottom: 20
                }}>
                  <Image
                    style={{
                      width: '25%',
                      height: '62%',
                      borderRadius: 100
                    }}
                    resizeMode={'center'}
                    source={LOGO}
                  />
                </View>
                <View style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.25)',
                  width: '85%',
                  height: '30%',
                  paddingTop: 20,
                  paddingBottom: 12,
                  alignSelf: 'center',
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 7,
                  borderWidth: 1,
                  borderColor: WHITE,
                }}>
                  <TextInputName
                    value={username}
                    title='Username'
                    placeholder='username'
                    width='90%'
                    onChangeText={setUsername}
                  />
                  <TextInputName
                    value={password}
                    title='Password'
                    placeholder='password'
                    width='90%'
                    onChangeText={setPassword}
                  />
                  <TouchableOpacity onPress={() => {
                    handleLogin();
                  }} style={{
                    backgroundColor: 'rgba(100, 100, 100, 0.3)',
                    width: WIDTH * 0.35,
                    justifyContent: 'center',
                    alignItems: 'center',
                    alignSelf: 'center',
                    borderRadius: 4,
                    marginVertical: 10,
                    borderWidth: 1,
                    borderColor: WHITE,
                    marginTop: 20
                  }}>
                    <Text style={{ color: BLACK, fontSize: 17, padding: 10, fontWeight: 'bold' }}>Login</Text>
                  </TouchableOpacity>
                </View>
              </View >
            </ScrollView>
          </Modal>
        </ImageBackground>
      </KeyboardAvoidingView>
    </React.Fragment>
  )
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  image: {
    // flex: 1,
    width: '100%',
    height: HEIGHT,
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
    // width: '100%',
    // height: '100%'
    // justifyContent: 'center',
  },
})

export default Login