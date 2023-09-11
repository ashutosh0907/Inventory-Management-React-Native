import React, { useState } from 'react';
import { View, Text, Modal, TouchableOpacity } from 'react-native';

const TruckUnloading = () => {
  const [isVisible, setIsVisible] = useState(false);

  const onClose = () => {
    setIsVisible(false);
  };

  return (
    <View style={{ flex: 1, backgroundColor: 'green' }}>
      <Text
        onPress={() => {
          setIsVisible(true);
        }}
        style={{ padding: 20, backgroundColor: 'blue', color: 'white', textAlign: 'center' }}
      >
        Truck Unloading
      </Text>
      <Modal
        isVisible={isVisible}
        onBackdropPress={onClose}
        animationIn="slideInUp"
        animationOut="slideOutDown"
        style={{ margin: 0 }}
      >
        <View style={{ flex: 1, justifyContent: 'flex-end' }}>
          <View style={{ backgroundColor: 'white', padding: 16 }}>
            <Text>This is your BottomSheet content.</Text>
            <TouchableOpacity onPress={onClose}>
              <Text>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default TruckUnloading;
