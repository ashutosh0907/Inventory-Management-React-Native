import { View, Text, FlatList, TouchableOpacity } from 'react-native'
import React from 'react'
import { BACKGROUND, BLACK } from '../constants/color'
import { HEIGHT, WIDTH } from '../constants/config'
import { SafeAreaView } from 'react-native-safe-area-context'



const Home = ({ navigation }) => {
  const screens = [
    {
      screenName: 'Loading',
      navigateTo: 'Truckloading'
    },
    {
      screenName: 'Unloading',
      navigateTo: 'Truckunloading'
    },
  ]

  const homeView = ({ item }) => {
    return (
      <TouchableOpacity onPress={() => {
        navigation.navigate(item.navigateTo)
      }} style={{
        backgroundColor: 'lightgray',
        margin: 1,
        height: HEIGHT * 0.1,
        width: WIDTH * 0.4,
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <Text style={{
          color: BLACK,
          fontSize: 20
        }}>{item.screenName}</Text>
      </TouchableOpacity>
    )
  }
  return (
    <SafeAreaView>
      <View
        style={{
          height: HEIGHT,
          width: WIDTH,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >

        <View style={{
          width: WIDTH,
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <FlatList
            numColumns={2}
            data={screens}
            renderItem={homeView}
          />
        </View>

      </View>
    </SafeAreaView>
  )
}

export default Home