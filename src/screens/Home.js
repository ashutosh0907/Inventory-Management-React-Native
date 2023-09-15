import { View, Text, FlatList, TouchableOpacity, StatusBar, Image, ScrollView, Pressable } from 'react-native'
import React from 'react'
import { BACKGROUND, BLACK, GRAY, WHITE } from '../constants/color'
import { HEIGHT, MyStatusBar, WIDTH } from '../constants/config'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Card, IconButton, Searchbar } from 'react-native-paper'
import { LOADER } from '../constants/imagepath'
import { Loader } from '../components/Loader'
import LinearGradient from 'react-native-linear-gradient'
import { useState } from 'react'


const Home = ({ navigation }) => {
  const [page, setPage] = useState(0)

  return (
    <React.Fragment>
      <MyStatusBar backgroundColor={'#0b2b42'} barStyle={'light-content'} />
      <LinearGradient
        start={{ x: 1, y: 0 }}
        end={{ x: 0, y: 1 }}
        colors={['#183a51', 'white',]}
        style={{
          flex: 1
        }}>
        <View
          style={{
            backgroundColor: '#0b2b42',
            height: '10%',
            width: '100%',
            paddingLeft: 2,
            justifyContent: 'center'
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
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <View style={{
            width: '90%',
            height: '70%',
            backgroundColor: WHITE,
            borderRadius: 100,
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            alignItems: 'center'
          }}>
            <LinearGradient
              start={{ x: 0, y: 1 }}
              end={{ x: 1, y: 1 }}
              colors={page == 0 ? ['#183a51', '#3b758b',] : ['white', 'white',]}
              style={{
                width: '49%',
                height: '95%',
                backgroundColor: 'red',
                borderRadius: 100,
                justifyContent: 'center',
                alignItems: 'center'
              }}>
              <Pressable style={{
                flex: 1,
                width: '100%',
                justifyContent: 'center',
                alignItems: 'center',
              }} onPress={() => {
                setPage(0)
              }}>
                <Text style={{
                  color: page == 0 ? WHITE : BLACK,
                  fontSize: 20,
                  fontWeight: 'bold'
                }}>
                  In
                </Text>

              </Pressable>

            </LinearGradient>
            <LinearGradient
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              colors={page == 1 ? ['#183a51', '#3b758b',] : ['white', 'white']}
              style={{
                width: '49%',
                height: '95%',
                backgroundColor: 'red',
                borderRadius: 100,
                justifyContent: 'center',
                alignItems: 'center'
              }}>
              <Pressable
                style={{
                  flex: 1,
                  width: '100%',
                  justifyContent: 'center',
                  alignItems: 'center',
                }} onPress={() => {
                  console.log("first")
                  setPage(1)
                }}>
                <Text style={{
                  color: page == 1 ? WHITE : BLACK,
                  fontSize: 20,
                  fontWeight: 'bold'
                }}>
                  Out
                </Text>
              </Pressable>
            </LinearGradient>
          </View>
        </View>
        <ScrollView contentContainerStyle={{
          // width: '100%',
          // height: '40%',
          flex: 1,
          // backgroundColor: 'red'
        }}>
          <Text>inputs</Text>
        </ScrollView>
      </LinearGradient>
    </React.Fragment>
  )
}

export default Home