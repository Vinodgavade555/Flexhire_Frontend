import {useIsFocused, useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Animated,
  Alert,
  Image,
} from 'react-native';
import {IconButton} from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';

const CustomDrawer = ({children}) => {
  const [drawerVisible, setDrawerVisible] = useState(false);
  const translateX = useState(new Animated.Value(-300))[0];
  const navigation = useNavigation();

  const toggleDrawer = () => {
    if (drawerVisible) {
      Animated.timing(translateX, {
        toValue: -300,
        duration: 300,
        useNativeDriver: true,
      }).start(() => setDrawerVisible(false));
    } else {
      setDrawerVisible(true);
      Animated.timing(translateX, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  };

  const closeDrawer = () => {
    Animated.timing(translateX, {
      toValue: -300,
      duration: 300,
      useNativeDriver: true,
    }).start(() => setDrawerVisible(false));
  };

  const notification = () => {
    Alert.alert('Notification', 'You have a new notification!');
  };

  const handleOutsideTap = () => {
    if (drawerVisible) {
      closeDrawer();
    }
  };

  return (
    <>
      <View style={styles.nav}>
        <IconButton
          icon="menu"
          onPress={() => toggleDrawer()}
          iconColor="#333"
          size={36}
        />
        <IconButton
          icon="bell"
          onPress={() => notification()}
          iconColor="#333"
          size={30}
        />
      </View>

      {drawerVisible && (
        <TouchableWithoutFeedback onPress={handleOutsideTap}>
          <View style={styles.overlay} />
        </TouchableWithoutFeedback>
      )}

      <Animated.View style={[styles.drawer, {transform: [{translateX}]}]}>
        <View
          style={{
            flexDirection: 'row',
            padding: 20,
            backgroundColor: '#f2f2f2',
          }}>
          <Image
            source={require('../../Src/Assets/Images/Userimage.png')}
            style={{height: 80, width: '100%'}}
            resizeMode="contain"
          />
          <TouchableOpacity
            onPress={toggleDrawer}
            style={styles.closeIconContainer}>
            <Ionicons name="close" size={28} style={styles.closeIcon} />
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => {
            navigation.navigate('userProfile');
            toggleDrawer();
          }}>
          <Ionicons
            name="person"
            size={24}
            style={{margin: 10, color: '#333'}}
          />
          <Text style={styles.menuItemText}>Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => {
            navigation.navigate('bookmark');
            toggleDrawer();
          }}>
          <Ionicons
            name="bookmark"
            size={24}
            style={{margin: 10, color: '#333'}}
          />
          <Text style={styles.menuItemText}>Saved Jobs</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => {
            navigation.navigate('LogoutComponent');
            toggleDrawer();
          }}>
          <Ionicons
            name="log-out-outline"
            size={24}
            style={{margin: 10, color: '#333'}}
          />
          <Text style={styles.menuItemText}>Log Out</Text>
        </TouchableOpacity>
      </Animated.View>
    </>
  );
};

const styles = StyleSheet.create({
  drawer: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: '100%',
    width: 250,
    backgroundColor: '#ffffff',
    zIndex: 1000,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 999, // Below the drawer but above other content
  },
  nav: {
    backgroundColor: '#ffffff',
    height: 65,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  menuItem: {
    color: '#333',
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 4,
    paddingHorizontal: 6,
    borderBottomWidth: 1,
    borderColor: '#f2f2f2',
  },
  menuItemText: {
    color: '#333',
    fontSize: 16,
  },
  closeIconContainer: {
    position: 'absolute',
    top: 10,
    right: 10,
    padding: 10,
  },
  closeIcon: {
    color: '#333',
    fontSize: 28,
  },
});

export default CustomDrawer;
