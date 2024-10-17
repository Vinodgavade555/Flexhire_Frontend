import React, {useState} from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  Image,
  Alert,
  ScrollView,
} from 'react-native';
import {Button, TextInput, IconButton} from 'react-native-paper';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {useNavigation} from '@react-navigation/native';

const SignupScreen = () => {
  const navigation = useNavigation();
  const [isPasswordVisible, setPasswordVisibility] = useState(false);

  const signupSchema = Yup.object().shape({
    email: Yup.string()
      .email('Please enter a valid email address')
      .required('Email is required'),
    phoneNumber: Yup.string()
      .matches(/^[0-9]{10}$/, 'Please enter a valid 10-digit phone number')
      .required('Phone number is required'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{6,}$/,
        'Password must contain at least one uppercase letter, one lowercase letter, and one number',
      )
      .required('Password is required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Confirm password is required'),
  });

  const handleSubmit = values => {
    Alert.alert('Signup Successful', `Welcome, ${values.email}!`);
    navigation.navigate('Login');
  };

  return (
    <SafeAreaView style={styles.maincontainer}>
      <Formik
        initialValues={{
          email: '',
          phoneNumber: '',
          password: '',
          confirmPassword: '',
        }}
        validationSchema={signupSchema}
        onSubmit={handleSubmit}>
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
        }) => (
          <ScrollView>
            <Image
              style={styles.loginpng}
              source={require('../../Assets/Logo/horizontal_Flexlogo.png')}
            />
            <Text style={styles.heading}>Signup</Text>

            <TextInput
              style={styles.textarea}
              mode="outlined"
              outlineColor="lightgrey"
              label="Enter Email"
              activeOutlineColor="#97A97C"
              textColor="black"
              value={values.email}
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
            />
            {errors.email && touched.email && (
              <Text style={styles.errorText}>{errors.email}</Text>
            )}

            <TextInput
              style={styles.textarea}
              mode="outlined"
              outlineColor="lightgrey"
              label="Phone Number"
              activeOutlineColor="#97A97C"
              textColor="black"
              value={values.phoneNumber}
              onChangeText={handleChange('phoneNumber')}
              onBlur={handleBlur('phoneNumber')}
            />
            {errors.phoneNumber && touched.phoneNumber && (
              <Text style={styles.errorText}>{errors.phoneNumber}</Text>
            )}

            {/* Password Input */}
            <TextInput
              style={styles.textarea}
              mode="outlined"
              outlineColor="lightgrey"
              label="Enter Password"
              activeOutlineColor="#97A97C"
              secureTextEntry={!isPasswordVisible}
              textColor="black"
              value={values.password}
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
            />
            {errors.password && touched.password && (
              <Text style={styles.errorText}>{errors.password}</Text>
            )}

            <View style={styles.passwordContainer}>
              <TextInput
                style={[styles.textarea, styles.passwordInput]}
                mode="outlined"
                outlineColor="lightgrey"
                activeOutlineColor="#97A97C"
                label="Confirm Password"
                secureTextEntry={!isPasswordVisible}
                textColor="black"
                value={values.confirmPassword}
                onChangeText={handleChange('confirmPassword')}
                onBlur={handleBlur('confirmPassword')}
              />
              <IconButton
                icon={isPasswordVisible ? 'eye-off' : 'eye'}
                color="grey"
                size={26}
                onPress={() => setPasswordVisibility(!isPasswordVisible)}
                style={styles.eyeIcon}
              />
            </View>
            {errors.confirmPassword && touched.confirmPassword && (
              <Text style={styles.errorText}>{errors.confirmPassword}</Text>
            )}

            <View style={styles.buttonContainer}>
              <Button labelStyle={styles.labelStyle} onPress={handleSubmit}>
                Signup
              </Button>
            </View>

            <View style={styles.loginContainer}>
              <Text style={styles.loginText1}>Already have an account?</Text>
              <Text
                style={styles.loginText2}
                onPress={() => navigation.navigate('Login')}>
                Login
              </Text>
            </View>
          </ScrollView>
        )}
      </Formik>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  maincontainer: {
    paddingVertical: 34,
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ffff',
  },
  loginpng: {
    width: 240,
    height: 130,
    alignSelf: 'center',
  },
  heading: {
    fontWeight: 'bold',
    fontSize: 32,
    color: '#cc4400',
    textAlign: 'center',
    marginVertical: 12,
  },
  textarea: {
    margin: 10,
    backgroundColor: 'white',
    width: 350,
    alignSelf: 'center',
    height: 50,
    borderColor: 'lightgrey',
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    width: 370,
  },
  passwordInput: {
    flex: 1,
  },
  eyeIcon: {
    marginLeft: -45,
    paddingRight: 10,
  },
  errorText: {
    marginHorizontal: 32,
    color: 'red',
    fontSize: 12,
  },
  buttonContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  labelStyle: {
    color: '#ffffff',
    backgroundColor: '#1A6F4A',
    padding: 14,
    borderRadius: 15,
    fontSize: 16,
    fontWeight: 'bold',
    height: 52,
    width: 220,
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 24,
  },
  loginText1: {
    fontSize: 15,
    color: 'black',
  },
  loginText2: {
    fontSize: 15,
    color: '#096fff',
  },
});

export default SignupScreen;
