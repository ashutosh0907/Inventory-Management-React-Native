import React, {useEffect, useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Storemanager from '../screens/Storemanager';
import Departmentmanager from '../screens/Departmentmanager';
import {Loader} from '../components/Loader';
import {getObjByKey} from '../utils/Storage';

const {Navigator, Screen} = createNativeStackNavigator();

export default HomeStack = () => {
  const [loader, setLoader] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    getUserData();
  }, []);

  const getUserData = async () => {
    try {
      let userdata = await getObjByKey('loginResponse');
      console.log('Data retrieved:', userdata);
      console.log('User:', userdata.user);
      setUser(userdata.user);
    } catch (error) {
      console.error('ERROR: GETTING_USER_DATA', error);
    } finally {
      setLoader(false);
    }
  };

  if (loader) {
    return <Loader visible={loader} onBackPress={setLoader} />;
  } else if (user === 'storemanager') {
    return (
      <Navigator initialRouteName="Storemanager">
        <Screen
          options={{headerShown: false}}
          name="Storemanager"
          component={Storemanager}
        />
      </Navigator>
    );
  } else {
    return (
      <Navigator initialRouteName="Departmentmanager">
        <Screen
          options={{headerShown: false}}
          name="Departmentmanager"
          component={Departmentmanager}
        />
      </Navigator>
    );
  }
};
