import { View, Text } from 'react-native'
import React, { useState } from 'react'
import BottomSheetComponent from '../components/BottomSheet'

const Truckunloading = () => {
    const [isVisible, setIsVisible] = useState(false);

    return (
        <View>
            <Text>Truckunloading</Text>
            <BottomSheetComponent
                isVisible={isVisible}
                toggleBottomSheet={() => {
                    console.log('toggle bottom sheet');
                    setIsVisible(!isVisible); // Toggle visibility
                }}
            />
        </View>
    );
}

export default Truckunloading;
