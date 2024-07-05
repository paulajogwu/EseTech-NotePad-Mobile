import React, { useState, useRef } from "react";
import {Stack,router } from 'expo-router';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TextInput,
  Linking,
  TouchableWithoutFeedback,
  ScrollView,
  Alert,
  Keyboard,

} from "react-native";
import { Icon } from "react-native-elements";
import colors from "../../assets/colors/colors";
import { useNavigation } from "@react-navigation/native";


import Loader from '../../components/loader';

import { isValidEmail, isValidObjField, updateError } from '../../components/validate';


const SignupScreen = () => {
const navigation = useNavigation();
const [value2, setValue2] = useState(null);
const [isFocus, setIsFocus] = useState(false);

const [secure, setSecure] = useState(true);



  const [inputs, setInputs] = React.useState({
    FirstName:'',
    LastName:'',
    email: '',
    password: ''
  });

  const [loading, setLoading] = React.useState(false);

  const [errorfirstname, setErrorFirstname] = useState('');
  const [errorlastname, setErrorLastname] = useState('');
  const [erroremail, setErrorEmail] = useState('');

  const [errorpassword, setErrorPassword] = useState('');

  const [err, setError] = useState('');
  const [success, setSuccess] = useState('');



  const validate = () => {
    Keyboard.dismiss();
    if (!inputs.FirstName)
      return updateError('FirstName Field is Empty!', setErrorFirstname);
    if (inputs.FirstName.length < 3)
      return updateError('FirstName is too short', setErrorFirstname);
    if (!inputs.LastName)
      return updateError('LastName Field is Empty!', setErrorLastname);
    if (inputs.LastName.length <3)
      return updateError('LastName is too short!', setErrorLastname);

    if (!inputs.email)
      return updateError('Please input email!', setErrorEmail);


    if (!isValidEmail(inputs.email))
      return updateError('Please input a valid email!', setErrorEmail);


    if (!inputs.password.trim())
      return updateError('Please input password!', setErrorPassword);


    if (inputs.password.length < 8)
      return updateError('Min password length of 8!', setErrorPassword);

    return true;

  };


  const submit = () => {

    if (validate()) {

      setLoading(true);
      setTimeout(() => {
                
        router.replace('/(tabs)');
      
    }, 2000);
     }
  };

  const handleOnchange = (text: string, input: string) => {
    setInputs(prevState => ({ ...prevState, [input]: text }));
  };




  return (
    <>
      <Stack.Screen  options={{   headerShown: false, }} />
    <SafeAreaView style={styles.container}>
      <Loader visible={loading} />


      <ScrollView style={{ flex: 1 }}>
        <View style={styles.navContainer}>
          <TouchableWithoutFeedback onPress={() => {router.replace('/');}}>
            <View style={styles.arrow}>
              <Icon name="arrow-left" type="feather" color={colors.white} />
            </View>
          </TouchableWithoutFeedback>
        </View>
        <View style={styles.heading}>
          <Text style={styles.headingText}>Create an account</Text>
          <Text style={styles.headingParagraph}>
          Join now and start Creating Note.
          </Text>
        </View>
        <View style={styles.formWrapper}>

          {err ? (
            <Text style={{ color: 'red', fontSize: 18, textAlign: 'center' }}>
              {err}
            </Text>
          ) : null}

          {success ? (
            <Text style={{ color: 'green', fontSize: 18, textAlign: 'center' }}>
              {success}
            </Text>
          ) : null}
         
         <View style={styles.inputWrapper}>
            <Text style={styles.inputLabel}>FirstName</Text>
            <View
              style={styles.inputContainer}
            >
              <TextInput
                style={styles.input}
                placeholder="John"
                onChangeText={text => handleOnchange(text, 'FirstName')}

                keyboardType="default"
                autoFocus

              />
            </View>
            {errorfirstname ? (
              <Text style={{ color: 'red', fontSize: 18, textAlign: 'center' }}>
                {errorfirstname}
              </Text>
            ) : null}
          </View>
          <View style={styles.inputWrapper}>
            <Text style={styles.inputLabel}>LastName</Text>
            <View
              style={styles.inputContainer}
            >
              <TextInput
                style={styles.input}
                placeholder="Doe"
                onChangeText={text => handleOnchange(text, 'LastName')}

                keyboardType="default"
                autoFocus

              />
            </View>
            {errorlastname ? (
              <Text style={{ color: 'red', fontSize: 18, textAlign: 'center' }}>
                {errorlastname}
              </Text>
            ) : null}
          </View>
         <View style={styles.inputWrapper}>
            <Text style={styles.inputLabel}>Email Address</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}

                placeholder="Enter your email"
                keyboardType="email-address"
                onChangeText={text => handleOnchange(text, 'email')}
              />
            </View>
            {erroremail ? (
              <Text style={{ color: 'red', fontSize: 18, textAlign: 'center' }}>
                {erroremail}
              </Text>
            ) : null}
          </View>
         


          <View style={styles.inputWrapper}>
            <Text style={styles.inputLabel}>Password</Text>
            <View style={styles.inputContainer}>
              <TextInput
                secureTextEntry={secure}

                style={styles.input}
                placeholder="Enter your password"
                keyboardType="default"
                onChangeText={text => handleOnchange(text, 'password')}
              />
              <Icon
                style={styles.inputIcon}
                name={secure ? "eye" : "eye-slash"}
                type="font-awesome"
                color={colors.white}
                onPress={() => setSecure(!secure)}
              />
            </View>
            {errorpassword ? (
              <Text style={{ color: 'red', fontSize: 18, textAlign: 'center' }}>
                {errorpassword}
              </Text>
            ) : null}
          </View>
        </View>
        <View style={styles.agreeContainer}>
          <Text style={styles.agreeText}>
          By creating an account; I agree to EseTech Note {" "}
            <TouchableWithoutFeedback
              // onPress={() =>
              //   navigation.navigate("Webview", {
              //     title: "Terms of Use",
              //     url: "https://github.com/facebook/react-native",
              //   })
              // }
            >
              <Text style={styles.agreeLink}>Terms  of
Service and Privacy Policy.</Text>
            </TouchableWithoutFeedback>
          </Text>
        </View>
        <View style={styles.btnContainer}>
          <TouchableWithoutFeedback
            // onPress={() => { submit() }}
            onPress={submit}
          >
            <View style={styles.btnPrimary}>
              <Text style={styles.btnPrimaryText}>Sign Up</Text>
            </View>
          </TouchableWithoutFeedback>
          <Text style={styles.loginText}>
            Already have an account?{" "}
            <TouchableWithoutFeedback
              onPress={() => {router.replace('/');}}
            >
              <Text style={styles.link}>Login</Text>
            </TouchableWithoutFeedback>
          </Text>
          
        </View>
      </ScrollView>
    </SafeAreaView></>
  );
};

export default SignupScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.dark,
    paddingBottom: 100,
  },
  navContainer: {
    alignItems: "flex-start",
    justifyContent: "center",
    padding: 20,
  },
  arrow: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 35,
    flexDirection: "row",
  },
  arrowText: {
    marginLeft: 10,
    fontFamily: "Inter_600SemiBold",
  },
  heading: {
    paddingHorizontal: 20,
    marginTop: 30,
  },
  headingText: {
    fontSize: 32,
    fontFamily: "Inter_900Black",
    color: colors.white,
    marginBottom: 10,
  },
  headingParagraph: {
    fontSize: 16,
    fontFamily: "Inter_400Regular",
    color: colors.white,
  },
  formWrapper: {
    paddingHorizontal: 20,
    marginTop: 40,
    marginBottom: 10,
  },
  inputWrapper: {
    marginTop: 18,
  },
  inputLabel: {
    color: colors.white,
    fontSize: 16,
    fontFamily: "Inter_600SemiBold",
  },
  inputContainer: {
    backgroundColor: "transparent",
    borderColor: colors.white,
    borderWidth: 1,
    height: 45,
    marginTop: 6,
    paddingHorizontal: 16,
    borderRadius: 10,
    alignItems: "center",
    flexDirection: "row",
  },
  input: {
    fontSize: 16,
    color: colors.white,
    flex: 1,
    fontFamily: "Inter_500Medium",
    height: 45,
  },
  inputIcon: {
    marginLeft: 10,
  },
  checkboxContainer: {
    paddingHorizontal: 20,
    flexDirection: "row",
  },
  checkbox: {
    alignSelf: "center",
  },
  checkboxLabel: {
    marginLeft: 25,
    fontWeight: "500",
    color: colors.gray,
  },
  link: {
    color: colors.primary,
    fontFamily: "Inter_600SemiBold",
    textDecorationLine: "underline",
  },
  btnContainer: {
    paddingHorizontal: 20,
    marginTop: 45,
    marginBottom: 30,
  },
  btnPrimary: {
    marginTop: 16,
    backgroundColor: colors.primary,
    padding: 16,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
  },
  btnPrimaryText: {
    color: colors.white,
    fontSize: 16,
    fontFamily: "Inter_700Bold",
  },
  loginText: {
    color: colors.white,
    marginTop: 20,
    textAlign: "center",
    fontSize: 16,
    fontFamily: "Inter_400Regular",
  },
  agreeContainer: {
    paddingHorizontal: 20,
    alignItems: "flex-start",
    marginTop: 10,
  },
  agreeText: {
    color: colors.white,
    fontSize: 16,
    fontFamily: "Inter_600SemiBold",
  },
  agreeLink: {
    color: colors.primary,
    fontSize: 16,
    fontFamily: "Inter_600SemiBold",
    textDecorationLine: "underline",
  },
  dropdown: {
    fontSize: 16,
    color: colors.black,
    flex: 1,
    fontFamily: "Inter_500Medium",
  },
});
