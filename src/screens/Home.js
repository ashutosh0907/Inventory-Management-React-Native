import { View, Text, FlatList, TouchableOpacity, StatusBar, Image, ScrollView } from 'react-native'
import React from 'react'
import { BACKGROUND, BLACK, WHITE } from '../constants/color'
import { HEIGHT, MyStatusBar, WIDTH } from '../constants/config'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Card, IconButton, Searchbar } from 'react-native-paper'
import { LOADER } from '../constants/imagepath'
import { Loader } from '../components/Loader'


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
    <React.Fragment>
      <MyStatusBar backgroundColor={WHITE} barStyle={'dark-content'} />
      <View style={{
        flex: 1,
        height: HEIGHT,
        width: WIDTH,
        backgroundColor: WHITE
      }}>
        <View
          style={{
            backgroundColor: '#0b2b42',
            width: '100%',
            paddingLeft: 4
          }}
        >
          <Text
            style={{
              color: 'lightgrey',
              fontSize: 15,
              fontWeight: 'bold',
              marginLeft: 10
            }}
          >
            Hello,
          </Text>
          <Text
            style={{
              color: WHITE,
              fontSize: 20,
              fontWeight: 'bold',
              marginTop: 5,
              marginLeft: 10

            }}
          >
            Hello Ashutosh !
          </Text>
        </View>
        <View style={{
          width: '100%',
          height: '10%',
          backgroundColor: 'blue'
        }}>

        </View>
        <ScrollView contentContainerStyle={{
          // width: '100%',
          // height: '40%',
          flex: 1,
          backgroundColor: 'red'
        }}>
          <Text>inputs</Text>
        </ScrollView>
      </View>
    </React.Fragment>
  )
}

export default Home