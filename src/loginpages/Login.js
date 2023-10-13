import {
  Alert,
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  ToastAndroid,
  ImageBackground,
  Modal,
  Pressable,
  BackHandler,
  TouchableOpacity,
  Image,
  Button,
  KeyboardAvoidingView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {BLACK, WHITE} from '../constants/color';
import {storeObjByKey} from '../utils/Storage';
import {checkuserToken} from '../redux/actions/auth';
import {useDispatch} from 'react-redux';
import {LOGO} from '../constants/imagepath';
import {HEIGHT, MyStatusBar, WIDTH} from '../constants/config';
import {TextInputName} from '../components/TextInputName';
import {useFocusEffect} from '@react-navigation/native';
import {Loader} from '../components/Loader';

const Login = ({navigation}) => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState('storemanager');
  const [password, setPassword] = useState('');
  const [loader, setLoader] = useState(false);

  useFocusEffect(() => {
    const backAction = () => {
      Alert.alert('', 'Are you sure you want to exit app ?', [
        {
          text: 'Cancel',
          onPress: () => {},
          style: 'cancel',
        },
        {text: 'YES', onPress: () => BackHandler.exitApp()},
      ]);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );
    return () => backHandler.remove();
  });

  const handleLogin = async () => {
    if (username == '' || username == null) {
      Alert.alert('Please enter username');
    } else if (password == '' || password == null) {
      Alert.alert('Please enter password');
    } else {
      setLoader(true);
      setTimeout(async () => {
        if (username == 'storemanager' && password == 'store') {
          await storeObjByKey('loginResponse', {
            username: username,
            password: password,
            email: 'storemanager@gmail.com',
            user: 'storemanager',
          }).then(() => {
            dispatch(checkuserToken());
          });
          ToastAndroid.show(
            'Store Manager Login Successful',
            ToastAndroid.SHORT,
          );
          setLoader(false);
        } else if (username == 'departmentmanager' && password == 'dept') {
          await storeObjByKey('loginResponse', {
            username: username,
            password: password,
            email: 'departmentmanager@gmail.com',
            user: 'departmentmanager',
          }).then(() => {
            dispatch(checkuserToken());
          });
          ToastAndroid.show(
            'Department Manager Login Successful',
            ToastAndroid.SHORT,
          );
          setLoader(false);
        } else {
          Alert.alert('No credentials match !!');
          setLoader(false);
        }
      }, 500);
    }
  };

  return (
    <React.Fragment>
      <MyStatusBar backgroundColor={WHITE} barStyle={'dark-content'} />
      <Loader visible={loader} onBackPress={setLoader} />
      <KeyboardAvoidingView
        style={{
          flex: 1,
        }}>
        <ScrollView
          keyboardShouldPersistTaps={'handled'}
          contentContainerStyle={styles.container}>
          <View style={styles.loginContainer}>
            <View
              style={{
                width: '100%',
                justifyContent: 'center',
              }}>
              <Image resizeMode={'cover'} style={{}} source={LOGO} />
            </View>
            <View>
              <TextInputName
                title="Username"
                value={username}
                onChangeText={text => setUsername(text)}
                style={styles.input}
              />
            </View>
            <View>
              <TextInputName
                title="Password"
                secureTextEntry
                value={password}
                onChangeText={text => setPassword(text)}
                style={styles.input}
              />
            </View>
            <View
              style={{
                padding: 10,
                alignItems: 'flex-end',
              }}>
              <Text
                onPress={() => {
                  setLoader(true);
                  setTimeout(() => {
                    if (username == 'storemanager') {
                      setUsername('departmentmanager');
                    } else {
                      setUsername('storemanager');
                    }
                    setLoader(false);
                  }, 300);
                }}
                style={{
                  color: BLACK,
                  fontWeight: 'bold',
                }}>
                {username == 'storemanager'
                  ? 'Login as Departmentmanager!?'
                  : 'Login as Storemanager!?'}
              </Text>
            </View>
            <View>
              <TouchableOpacity
                onPress={() => {
                  handleLogin();
                }}
                style={{
                  ...styles.loginBtn,
                }}>
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: 'bold',
                    color: BLACK,
                  }}>
                  Login
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: WHITE,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  loginContainer: {
    width: '80%',
  },
  input: {
    marginBottom: 16,
  },
  loginBtn: {
    marginTop: 16,
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#f8ad42',
    alignItems: 'center',
  },
});

export default Login;
