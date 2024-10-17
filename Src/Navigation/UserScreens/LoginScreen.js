import AsyncStorage from '@react-native-async-storage/async-storage';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import React, {useCallback, useEffect, useState} from 'react';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  Image,
  Alert,
  BackHandler,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import {Button, Checkbox, TextInput, IconButton} from 'react-native-paper';
import {Formik} from 'formik';
import * as Yup from 'yup';

const LoginScreen = () => {
  const navigation = useNavigation();
  const [checked, setChecked] = useState(false);
  const [isPasswordVisible, setPasswordVisibility] = useState(false);

  useEffect(() => {
    handleLoadingCredentials();
  }, []);

  const handleLoadingCredentials = async () => {
    try {
      const userdata = await AsyncStorage.getItem('UserData');
      if (userdata) {
        Alert.alert('Welcome ', userdata);
      }
    } catch (error) {
      Alert.alert('Error', 'Unable to load credentials');
    }
  };

  const loginSchema = Yup.object().shape({
    emailOrPhone: Yup.string()
      .test(
        'emailOrPhone',
        'Please enter a valid email or phone number',
        value =>
          Yup.string().email().isValidSync(value) || /^[0-9]{10}$/.test(value),
      )
      .required('Email or phone number is required'),
    password: Yup.string()
      .min(8, 'Password must be at least 8 characters')
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character',
      )
      .required('Password is required'),
  });

  const handleSubmit = async values => {
    try {
      const UserData = {
        emailOrPhone: values.emailOrPhone,
        password: values.password,
      };
      await AsyncStorage.setItem('userdata', JSON.stringify(UserData));
      navigation.navigate('DfaultScreen');
    } catch (error) {
      Alert.alert('Error saving credentials');
    }
  };

  const HandleForgotPassword = () => {
    navigation.navigate('Forgotpassword');
  };

  useFocusEffect(
    useCallback(() => {
      const backAction = () => {
        Alert.alert('Hold on!', 'Are you sure you want to exit the app?', [
          {
            text: 'Cancel',
            onPress: () => null,
            style: 'cancel',
          },
          {text: 'YES', onPress: () => BackHandler.exitApp()},
        ]);
        return true;
      };

      const backHandler = BackHandler.addEventListener(
        'hardwareBackPress',
        backAction,
      );

      return () => backHandler.remove();
    }, []),
  );

  return (
    <SafeAreaView style={styles.maincontainer}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View>
          <Image
            style={styles.loginpng}
            source={require('../../Assets/Logo/horizontal_Flexlogo.png')}
          />
          <Text style={styles.heading}>Login</Text>
          <Formik
            initialValues={{emailOrPhone: '', password: ''}}
            validationSchema={loginSchema}
            onSubmit={handleSubmit}>
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              errors,
              touched,
            }) => (
              <>
                <KeyboardAwareScrollView>
                  <TextInput
                    style={styles.textarea}
                    mode="outlined"
                    outlineColor="lightgrey"
                    label="Enter Email or Phone"
                    textColor="black"
                    value={values.emailOrPhone}
                    onChangeText={handleChange('emailOrPhone')}
                    onBlur={handleBlur('emailOrPhone')}
                    activeOutlineColor="#97A97C"
                    error={!!errors.emailOrPhone}
                  />
                  {errors.emailOrPhone && touched.emailOrPhone ? (
                    <Text style={styles.errorText}>{errors.emailOrPhone}</Text>
                  ) : null}

                  <View style={styles.passwordContainer}>
                    <TextInput
                      style={[styles.textarea, styles.passwordInput]}
                      mode="outlined"
                      outlineColor="lightgrey"
                      label="Enter Password"
                      textColor="black"
                      activeOutlineColor="#97A97C"
                      value={values.password}
                      onChangeText={handleChange('password')}
                      onBlur={handleBlur('password')}
                      secureTextEntry={!isPasswordVisible}
                      error={!!errors.password}
                    />
                    <IconButton
                      icon={isPasswordVisible ? 'eye-off ' : 'eye'}
                      color="grey"
                      size={26}
                      onPress={() => setPasswordVisibility(!isPasswordVisible)}
                      style={styles.eyeIcon}
                    />
                  </View>
                  {errors.password && touched.password ? (
                    <Text style={styles.errorText}>{errors.password}</Text>
                  ) : null}

                  <View style={styles.checkboxContainer}>
                    <View style={styles.checkboxContainer}>
                      <Checkbox
                        status={checked ? 'checked' : 'unchecked'}
                        onPress={() => setChecked(!checked)}
                      />
                      <Text style={styles.checkboxtext1}>Remember me</Text>
                    </View>

                    <Text
                      style={styles.checkboxtext2}
                      onPress={HandleForgotPassword}>
                      Forgot Password?
                    </Text>
                  </View>

                  <View style={styles.buttonContainer}>
                    <Button
                      labelStyle={styles.labelStyle}
                      onPress={handleSubmit}>
                      Login
                    </Button>
                  </View>

                  <View>
                    <View style={styles.socialContainer_Heading}>
                      <View style={styles.sociallineContainer} />
                      <Text style={styles.socialtextContainer}>OR</Text>
                      <View style={styles.sociallineContainer} />
                    </View>
                    <View style={styles.socialContainer}>
                      <Image
                        style={styles.socialImages}
                        source={require('../../Assets/Images/google_icon.png')}
                      />
                      <Image
                        style={styles.socialImages}
                        source={require('../../Assets/Images/linkedin_icon.png')}
                      />
                    </View>
                  </View>

                  <View style={styles.signupContainer}>
                    <Text style={styles.signupText1}>
                      Don't have an account?
                    </Text>
                    <Text
                      style={styles.signupText2}
                      onPress={() => navigation.push('Signup')}>
                      Create account
                    </Text>
                  </View>
                </KeyboardAwareScrollView>
              </>
            )}
          </Formik>
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  maincontainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ffff',
  },

  loginpng: {
    width: 250,
    height: 130,
    alignSelf: 'center',
  },
  heading: {
    marginVertical: 20,
    fontSize: 32,
    color: '#cc4400',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  textarea: {
    marginVertical: 12,
    backgroundColor: 'white',
    width: 350,
    alignSelf: 'center',
    height: 56,
    borderColor: 'lightgrey',
  },
  errorText: {
    marginHorizontal: 32,
    color: 'red',
    fontSize: 12,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    width: 350,
  },
  passwordInput: {
    // flex: 1,
  },
  eyeIcon: {
    marginLeft: -46,
    paddingRight: 14,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  checkboxtext1: {
    color: 'black',
    fontSize: 16,
  },
  checkboxtext2: {
    color: '#096fff',
    fontSize: 14,
  },
  buttonContainer: {
    alignItems: 'center',
    marginVertical: 12,
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
  socialContainer_Heading: {
    alignItems: 'center',
    flexDirection: 'row',
    marginVertical: 12,
    paddingHorizontal: 36,
  },
  sociallineContainer: {
    flex: 1,
    height: 1,
    backgroundColor: 'black',
  },
  socialtextContainer: {
    marginHorizontal: 14,
    fontSize: 16,
    color: 'gray',
  },
  socialContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    paddingHorizontal: 100,
  },
  socialImages: {
    width: 36,
    height: 36,
  },
  signupContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 24,
  },
  signupText1: {
    fontSize: 16,
    color: 'black',
    alignContent: 'center',
  },
  signupText2: {
    fontSize: 14,
    color: '#096fff',
    alignContent: 'center',
  },
});

export default LoginScreen;
