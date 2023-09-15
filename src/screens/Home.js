import { View, Text, FlatList, TouchableOpacity, StatusBar, Image, ScrollView } from 'react-native'
import React from 'react'
import { BACKGROUND, BLACK } from '../constants/color'
import { HEIGHT, MyStatusBar, WIDTH } from '../constants/config'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Card, IconButton, Searchbar } from 'react-native-paper'
import { LOADER } from '../constants/imagepath'


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
        backgroundColor: 'cyan',
        margin: 10,
        borderRadius: 40,
        height: HEIGHT * 0.07,
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
      <MyStatusBar backgroundColor='#7ca8d5' barStyle={'dark-content'} />
      <ScrollView>
        <FlatList
          scrollEnabled={false}
          numColumns={2}
          data={screens}
          renderItem={homeView}
        />
      </ScrollView>
    </SafeAreaView>
  )
}

export default Home