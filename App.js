import React, * as react from 'react';
import Navigation from './src/navigation/Navigation';
import 'react-native-gesture-handler';
import { useEffect } from 'react';
import { Platform } from 'react-native';
import { request, PERMISSIONS } from 'react-native-permissions';
export default App = () => {
    useEffect(() => {
        requestCameraPermission();
    }, [])

    const requestCameraPermission = () => {
        request(Platform.OS === 'ios' ? PERMISSIONS.IOS.CAMERA : PERMISSIONS.ANDROID.CAMERA).then((result) => {
            console.log(result);
        });
    }
    return <Navigation />
}