import {
  View,
  Text,
  StyleSheet,
  Alert,
  TouchableOpacity,
  Image,
  BackHandler,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {MyStatusBar} from '../constants/config';
import {BLACK, BRAND, WHITE, RED, TABGRAY} from '../constants/color';
import {ADD, LOGO, PROFILE} from '../constants/imagepath';
import {Loader} from '../components/Loader';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {checkuserToken} from '../redux/actions/auth';
import {useDispatch} from 'react-redux';
import {getObjByKey} from '../utils/Storage';
import {useFocusEffect} from '@react-navigation/native';

const Departmentmanager = () => {
  const dispatch = useDispatch();
  const [loader, setLoader] = useState(false);
  const [userdata, setUserdata] = useState(false);

  useFocusEffect(() => {
    const backAction = () => {
      Alert.alert('', 'Are you sure you want to exit app ?', [
        {
          text: 'Cancel',
          onPress: () => null,
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

  useEffect(() => {
    getUserData();
  }, []);

  const getUserData = async () => {
    try {
      let userdata = await getObjByKey('loginResponse');
      console.log('Data retrieved:', userdata);
      setUserdata(userdata);
    } catch (error) {
      console.error('ERROR: GETTING_USER_DATA', error);
    } finally {
      setLoader(false);
    }
  };

  const logoutUser = () => {
    Alert.alert('Logout', 'Are you sure, do you want to logout ?', [
      {
        text: 'Cancel',
        onPress: () => null,
        style: 'cancel',
      },
      {
        text: 'Yes',
        onPress: () => {
          AsyncStorage.clear().then(() => {
            dispatch(checkuserToken());
          });
        },
      },
    ]);
  };

  const addProduct = () => {
    console.log('add products');
  };
  return (
    <React.Fragment>
      <MyStatusBar backgroundColor={WHITE} barStyle={'dark-content'} />
      <Loader visible={loader} />
      <View
        style={{
          ...styles.container,
        }}>
        {/* HEADER_VIEW */}
        <View
          style={{
            ...styles.header,
          }}>
          <View
            style={{
              ...styles.header,
            }}>
            <View
              style={{
                width: '25%',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
              }}>
              <Image
                tintColor={BRAND}
                resizeMode={'contain'}
                style={{
                  width: '90%',
                  borderRadius: 100,
                }}
                source={PROFILE}
              />
              <TouchableOpacity
                onPress={() => {
                  logoutUser();
                }}
                style={{
                  width: '60%',
                  height: 20,
                  backgroundColor: TABGRAY,
                  borderRadius: 3,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    color: WHITE,
                    fontWeight: 'bold',
                  }}>
                  Logout
                </Text>
              </TouchableOpacity>
            </View>
            <View
              style={{
                width: '75%',
                justifyContent: 'center',
              }}>
              <View
                style={{
                  padding: 2,
                }}>
                <Text
                  style={{
                    ...styles.headerTextStylesHead,
                  }}>
                  Username:
                </Text>
                <Text
                  style={{
                    ...styles.headerTextStyles,
                  }}>
                  {userdata.username}
                </Text>
              </View>
              <View
                style={{
                  padding: 2,
                }}>
                <Text
                  style={{
                    ...styles.headerTextStylesHead,
                  }}>
                  Email:
                </Text>
                <Text
                  style={{
                    ...styles.headerTextStyles,
                  }}>
                  {userdata.email}
                </Text>
              </View>
            </View>
          </View>
          <View
            style={{
              width: '75%',
              justifyContent: 'center',
            }}>
            <View
              style={{
                padding: 2,
              }}>
              <Text
                style={{
                  ...styles.headerTextStylesHead,
                }}>
                Username:
              </Text>
              <Text
                style={{
                  ...styles.headerTextStyles,
                }}>
                {userdata.username}
              </Text>
            </View>
            <View
              style={{
                padding: 2,
              }}>
              <Text
                style={{
                  ...styles.headerTextStylesHead,
                }}>
                Email:
              </Text>
              <Text
                style={{
                  ...styles.headerTextStyles,
                }}>
                {userdata.email}
              </Text>
            </View>
          </View>
        </View>
        {/* HEADER_VIEW_END */}
        <View
          style={{
            ...styles.addProductsView,
          }}>
          <TouchableOpacity
            style={{
              width: '50%',
              backgroundColor: BRAND,
              borderRadius: 5,
              flexDirection: 'row',
              padding: 4,
            }}
            onPress={() => {
              addProduct();
            }}>
            <View
              style={{
                width: '30%',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Image
                resizeMode={'cover'}
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 100,
                }}
                source={ADD}
              />
            </View>
            <View
              style={{
                height: '100%',
                width: '70%',
                justifyContent: 'center',
              }}>
              <Text
                style={{
                  fontSize: 19,
                  fontWeight: 'bold',
                  color: BLACK,
                }}>
                Add Product
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: WHITE,
  },
  header: {
    width: '100%',
    flexDirection: 'row',
  },
  headerTextStyles: {
    fontSize: 16,
    color: BLACK,
  },
  headerTextStylesHead: {
    fontSize: 19,
    fontWeight: 'bold',
    color: BRAND,
  },
  addProductsView: {
    width: '100%',
    height: 80,
    padding: 5,
    justifyContent: 'center',
    paddingLeft: '5%',
  },
});
export default Departmentmanager;
