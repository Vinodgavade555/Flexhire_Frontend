import {StyleSheet, View} from 'react-native';
import React from 'react';
import Introduction from './Introduction';

const Index = () => {
  return (
    <View style={styles.mainContainer}>
      <View>
        <Introduction />
      </View>
    </View>
  );
};

export default Index;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    width: '100%',
    backgroundColor: '#f2f2f2',
  },
});
