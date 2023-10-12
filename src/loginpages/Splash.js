import {View, StyleSheet, Image} from 'react-native';
import React, {useEffect} from 'react';
import {WHITE} from '../constants/color';
import LinearGradient from 'react-native-linear-gradient';
import {LOGO} from '../constants/imagepath';
import {MyStatusBar} from '../constants/config';

const Splash = ({navigation}) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.navigate('Login');
    }, 2000);
  }, []);
  return (
    <View style={{flex: 1}}>
      <MyStatusBar backgroundColor={WHITE} barStyle={'dark-content'} />
      <LinearGradient
        end={{x: 0, y: 0}}
        start={{x: 0, y: 1}}
        colors={['#f8ad42', 'white']}
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View style={{...styles.logoContainer}}>
          <Image
            style={{
              alignSelf: 'center',
              width: '80%',
              height: '80%',
            }}
            resizeMode={'contain'}
            source={LOGO}
          />
        </View>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    borderWidth: 1,
    borderColor: WHITE,
    width: '46%',
    height: '22%',
    borderRadius: 200,
    justifyContent: 'center',
    backgroundColor: WHITE,
  },
});

export default Splash;
