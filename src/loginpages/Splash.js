import {View, Text, StyleSheet, Image} from 'react-native';
import React, {useEffect} from 'react';
import {BLACK} from '../constants/color';
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
      <MyStatusBar backgroundColor={'#183a51'} barStyle={'dark-content'} />
      <LinearGradient
        end={{x: 0, y: 0}}
        start={{x: 0, y: 1}}
        colors={['white', '#183a51']}
        style={{flex: 1, justifyContent: 'center'}}>
        <Image
          // resizeMethod=""
          style={{
            alignSelf: 'center',
            height: 180,
            width: 180,
            borderRadius: 100,
          }}
          resizeMode={'center'}
          source={LOGO}
        />
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
});

export default Splash;
