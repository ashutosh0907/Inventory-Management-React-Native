import { View, Text, FlatList, TouchableOpacity, StatusBar, Image } from 'react-native'
import React from 'react'
import { BACKGROUND, BLACK } from '../constants/color'
import { HEIGHT, WIDTH } from '../constants/config'
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
        borderRadius:40,
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
      <StatusBar
        backgroundColor={"grey"}
        barStyle={'light-content'}
      />
      <View style={{
        height: HEIGHT * 0.06,
        width: WIDTH,
        flexDirection:'row'
        // backgroundColor: ,
      }}>
        <Text style={{
          color: BLACK,
          fontSize: 20,
          fontWeight: 'bold',
          textAlign: 'left',
          margin: 10


        }}>{'Home'}</Text>
        <Searchbar
          placeholder="Search"
          onChangeText={(text) => {
            console.log(text)
          }}
          style={{
            width: WIDTH * 0.6,
            height: HEIGHT * 0.05,
            borderRadius: 20,
            // margin: 10,
            backgroundColor: 'white'
          }}




        
        >

        </Searchbar>
        <IconButton
          icon="bell"
          color={BLACK}
          size={30}
          onPress={() => {
            console.log('Pressed')
          }}
        
        />
    
        
        

      </View>

    <Card
      style={{
        height: HEIGHT * 0.3,
        width: WIDTH * 0.9,
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
        margin: 10,
        backgroundColor: 'white'

      }}

    
    >
       <FlatList
            numColumns={2}
            data={screens}
            renderItem={homeView}
          />

          <Image
          style={{
            height: HEIGHT * 0.1,
            width: WIDTH * 0.2,
            alignSelf: 'center',
            justifyContent: 'center',
            alignItems: 'center',
            
          }}
          source={LOADER}
          
          />

    </Card>
     
    </SafeAreaView>
  )
}

export default Home