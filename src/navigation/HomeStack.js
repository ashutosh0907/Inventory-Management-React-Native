import * as React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from "../screens/Home";
import Truckloading from "../screens/Truckloading";
import Truckunloading from "../screens/Truckunloading";
const { Navigator, Screen } = createNativeStackNavigator();
export default HomeStack = () => {
  return (
    <Navigator initialRouteName="Home">
      <Screen options={{ headerShown: false }} name="Home" component={Home} />
      <Screen options={{ headerShown: false }} name="Truckloading" component={Truckloading} />
      <Screen options={{ headerShown: false }} name="Truckunloading" component={Truckunloading} />
    </Navigator>
  )
}