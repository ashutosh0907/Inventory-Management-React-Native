import React, { useState } from 'react';
import { BottomSheet, Button, ListItem } from '@rneui/themed';
import { StyleSheet } from 'react-native';

const BottomSheetComponent = ({ isVisible, toggleBottomSheet }) => {
  const list = [
    { title: 'List Item 1' },
    { title: 'List Item 2' },
  ];

  const handleListItemPress = (item) => {
    console.log('Selected Item:', item.title);
    toggleBottomSheet(false); // Close the bottom sheet
  };

  return (
    <>
      <Button
        title="Open Bottom Sheet"
        onPress={() => toggleBottomSheet(true)}
        buttonStyle={styles.button}
      />
      <BottomSheet modalProps={{}} isVisible={isVisible}>
        {list.map((l, i) => (
          <ListItem
            key={i}
            containerStyle={l.containerStyle}
            onPress={() => handleListItemPress(l)}
          >
            <ListItem.Content>
              <ListItem.Title style={l.titleStyle}>{l.title}</ListItem.Title>
            </ListItem.Content>
          </ListItem>
        ))}
      </BottomSheet>
    </>
  );
};

const styles = StyleSheet.create({
  button: {
    margin: 10,
  },
});

export default BottomSheetComponent;
