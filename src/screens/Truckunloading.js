import React, { useState } from 'react';
import { View, Text, Modal, TouchableOpacity, StatusBar, Pressable } from 'react-native';
import { BLACK, WHITE } from '../constants/color';
import { HEIGHT, WIDTH } from '../constants/config';

const TruckUnloading = () => {
  const [modal, setModal] = useState(false);


  return (
    <View style={{ flex: 1, backgroundColor: 'green' }}>
      <Text
        onPress={() => {
        //   setIsVisible(true);
        setModal(true)
        }}
        style={{ padding: 20, backgroundColor: 'blue', color: 'white', textAlign: 'center' }}
      >
        Truck Unloading
      </Text>
      <Modal
                visible={modal}
                transparent={true}
                animationType='fade'
                statusBarTranslucent
                onRequestClose={() => setModal(false)}
            >
                <StatusBar backgroundColor='white' barStyle={'dark-content'} />
                {/* `rgba(100, 100, 100, 0.5)` `rgba(0,0, 0,0)`*/}
                <Pressable
                    onPress={() => {
                        setModal(false)
                    }}
                    style={{ flex: 1, width: WIDTH, backgroundColor: `rgba(100, 100, 100, 0.3)`, alignSelf: 'center', justifyContent: 'center', }}>
                    <View
                        onPress={() => {
                            setModal(false)
                        }}
                        style={{
                            height: HEIGHT * 0.23,
                            width: WIDTH * 0.9,
                            backgroundColor: WHITE,
                            alignSelf: 'center',
                            padding: 25,
                            justifyContent: 'space-between',
                            borderRadius: 4,
                            elevation: 20,
                        }}>
                        <Text style={{ color: BLACK, fontSize: 20, fontWeight: 'bold' }}>Action!</Text>
                        <Text style={{ color: BLACK, fontSize: 20, fontFamily: 'Roboto-Medium' }}>Upload images of the truck for further verification</Text>
                        <View style={{ alignSelf: 'flex-start', borderRadius: 5, flexDirection: 'row', }}>
                            <TouchableOpacity onPress={() => {
                                setModal(false)
                                captureImage('opengallery');
                            }} style={{
                                backgroundColor: BLACK,
                                justifyContent: 'center',
                                alignItems: 'center',
                                borderRadius: 4,
                            }}>
                                <Text style={{ color: 'white', fontSize: 17, padding: 10, fontFamily: 'Roboto-Black' }}>Open Gallery</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => {
                                setModal(false)
                                captureImage('capture');
                            }} style={{
                                backgroundColor: BLACK,
                                justifyContent: 'center',
                                alignItems: 'center',
                                borderRadius: 4,
                                marginHorizontal: WIDTH * 0.04
                            }}>
                                <Text style={{ color: 'white', fontSize: 17, padding: 10, fontFamily: 'Roboto-Black' }}>Camera</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Pressable >
            </Modal >
    </View>
  );
};

export default TruckUnloading;
