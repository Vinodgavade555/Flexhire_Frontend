import { Alert, StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import { Button, IconButton, Modal, TextInput } from 'react-native-paper';
import { Formik } from 'formik';
import * as Yup from 'yup';
import GlobalStyle from '../../Global_CSS/GlobalStyle';
import ProfileImage from './ProfileImage';

const validationSchema = Yup.object().shape({
  fullName: Yup.string().required('Full Name is required'),
  profileHeadline: Yup.string().required('Profile Headline is required'),
});

const Introduction = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [headlineHeight, setHeadlineHeight] = useState(48); // Initial height

  const openModal = () => setModalVisible(true);
  const closeModal = () => setModalVisible(false);

  return (
    <View style={styles.mainContainer}>
      <ProfileImage />
      <IconButton
        icon="lead-pencil"
        iconColor="#808080"
        size={24}
        onPress={openModal}
        style={styles.iconButton}
      />
      
      <Modal visible={modalVisible} onDismiss={closeModal}>
        <Text style={styles.heading}>Introduction</Text>
        <Formik
          initialValues={{ fullName: '', profileHeadline: '' }}
          validationSchema={validationSchema}
          onSubmit={values => {
            Alert.alert('Form Submitted', JSON.stringify(values, null, 2));
            closeModal(); // Close modal after submission
          }}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
          }) => (
            <View style={styles.container}>
              <View style={styles.Fullnamecontainer}>
                <TextInput
                  mode="outlined"
                  label="Full Name*"
                  style={styles.input}
                  textColor="#333"
                  outlineColor="lightgray"
                  activeOutlineColor="gray"
                  onChangeText={handleChange('fullName')}
                  onBlur={handleBlur('fullName')}
                  value={values.fullName}
                />
                {errors.fullName && touched.fullName && (
                  <Text style={styles.error}>{errors.fullName}</Text>
                )}
              </View>
              <View style={styles.headlinecontainer}>
                <TextInput
                  style={[styles.input, { height: headlineHeight }]}
                  mode="outlined"
                  label="Profile Headline*"
                  textColor="#333"
                  outlineColor="lightgray"
                  activeOutlineColor="gray"
                  onChangeText={handleChange('profileHeadline')}
                  onBlur={handleBlur('profileHeadline')}
                  value={values.profileHeadline}
                  multiline
                  onContentSizeChange={(contentSize) => {
                    if (contentSize && contentSize.contentSize) {
                      setHeadlineHeight(contentSize.contentSize.height + 20); // Add some padding
                    }
                  }}
                />
                {errors.profileHeadline && touched.profileHeadline && (
                  <Text style={styles.error}>{errors.profileHeadline}</Text>
                )}
              </View>
              <Button onPress={handleSubmit} labelStyle={GlobalStyle.labelStyle}>
                Submit
              </Button>
            </View>
          )}
        </Formik>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    margin: 18,
  },
  heading: {
    fontSize: 24,
    color: '#333',
    marginVertical: 12,
    fontWeight: 'bold',
  },
  container: {
    flex: 1,
    padding: 20,
  },
  Fullnamecontainer: {
    marginVertical: 12,
  },
  headlinecontainer: {
    marginVertical: 12,
  },
  input: {
    backgroundColor: '#fff',
    minHeight: 48,
    maxHeight: 200,
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },
});

export default Introduction;
