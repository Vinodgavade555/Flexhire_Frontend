import React from 'react';
import {Image, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {Button, TextInput} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import {Formik} from 'formik';
import * as Yup from 'yup';
const ForgotpasswordScreen = () => {
  const navigation = useNavigation();
  const forgotPasswordSchema = Yup.object().shape({
    email: Yup.string()
      .email('Please enter a valid email address')
      .required('Email is required'),
  });

  const handleSendOtp = values => {
    navigation.navigate('OtpVerification', {email: values.email});
  };
  return (
    <SafeAreaView style={styles.maincontainer}>
      <Formik
        initialValues={{email: ''}}
        validationSchema={forgotPasswordSchema}
        onSubmit={handleSendOtp}>
        {({
          values,
          handleChange,
          errors,
          setFieldTouched,
          touched,
          isValid,
          handleSubmit,
        }) => (
          <View>
            <Image
              style={styles.imageContainer}
              source={require('../../Assets/Logo/horizontal_Flexlogo.png')}
            />
            <Text style={styles.headingText}>Forgot password</Text>
            <TextInput
              mode="outlined"
              style={styles.textarea}
              label="Enter User Email"
              textColor="black"
              value={values.email}
              onChangeText={handleChange('email')}
              onBlur={() => setFieldTouched('email')}
              activeOutlineColor="#97A97C"
              error={!!errors.email}
            />
            {errors.email && touched.email ? (
              <Text style={styles.errorText}>{errors.email}</Text>
            ) : null}
            <View style={styles.buttonContainer}>
              <Button labelStyle={styles.labelStyle} onPress={handleSubmit}>
                Send OTP
              </Button>
            </View>
          </View>
        )}
      </Formik>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  maincontainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ffff',
  },
  imageContainer: {
    width: 250,
    height: 130,
    alignSelf: 'center',
    marginVertical: 20,
  },
  headingText: {
    color: '#cc4400',
    fontSize: 26,
    fontWeight: '600',
    textAlign: 'center',
  },
  textarea: {
    marginVertical: 12,
    backgroundColor: 'white',
    width: 350,
    alignSelf: 'center',
    height: 52,
  },
  buttonContainer: {
    alignItems: 'center',
  },
  labelStyle: {
    color: '#ffffff',
    backgroundColor: '#1A6F4A',
    padding: 14,
    borderRadius: 15,
    fontSize: 16,
    fontWeight: 'bold',
    width: 350,
  },
  errorText: {
    marginHorizontal: 40,
    color: 'red',
    fontSize: 14,
  },
});

export default ForgotpasswordScreen;
