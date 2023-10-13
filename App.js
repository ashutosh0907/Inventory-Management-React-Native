import React, * as react from 'react';
import Navigation from './src/navigation/Navigation';
import 'react-native-gesture-handler';
import {useEffect} from 'react';
import {products} from './src/utils/data';
import {storeObjByKey} from './src/utils/Storage';
export default App = () => {
  useEffect(() => {
    setInitialProducts();
  });

  const setInitialProducts = async () => {
    await storeObjByKey('inventory', products);
  };
  return <Navigation />;
};
