import React, {useEffect} from 'react';
import {Alert, BackHandler, StyleSheet, View} from 'react-native';
import CustomDrawer from '../Navigation/CustomDrawer';
import CustomBottomTab from '../Navigation/CustomBottomTab';


const DefaultScreen = () => {
  useEffect(() => {
    const backAction = () => {
      Alert.alert('Hold on!', 'Are you sure you want to go back?', [
        {
          text: 'Cancel',
          onPress: () => null,
          style: 'cancel',
        },
        {text: 'YES', onPress: () => BackHandler.exitApp()}, // Use your desired navigation logic here
      ]);
      return true; // Prevent default back action
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove(); // Cleanup listener on unmount
  }, []);

  return (
    <View style={styles.container}>
      <CustomDrawer />
      <CustomBottomTab />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1, // Take full height of the screen
    backgroundColor: '#ffffff', // Set background color to light gray
  },
});

export default DefaultScreen;
