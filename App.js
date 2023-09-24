import React, * as react from 'react';
import Navigation from './src/navigation/Navigation';
import 'react-native-gesture-handler';
import { useEffect } from 'react';
import { Platform } from 'react-native';
import { request, PERMISSIONS } from 'react-native-permissions';
export default App = () => {
    useEffect(() => {
        askPermissions();
    }, [])

    const askPermissions = async () => {
        requestLocationPermission()
            .then(() => {
                requestCameraPermission();
            })
    }

    const requestCameraPermission = async () => {
        await request(Platform.OS === 'ios' ? PERMISSIONS.IOS.CAMERA : PERMISSIONS.ANDROID.CAMERA).then((result) => {
            console.log(result);
        });
    }
    const requestLocationPermission = async () => {
        await request(Platform.OS === 'ios' ? PERMISSIONS.IOS.ACCESS_FINE_LOCATION : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION).then((result) => {
            console.log(result);
        });
    }
    return <Navigation />
}