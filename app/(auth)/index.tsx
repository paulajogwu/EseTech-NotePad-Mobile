import React, { useState } from "react";
import {Stack ,Link,router } from 'expo-router';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TextInput,
 
  Linking,
  TouchableWithoutFeedback,
  ScrollView,
} from "react-native";
import { Icon } from "react-native-elements";
import colors from "../../assets/colors/colors";
import { useNavigation } from "@react-navigation/native";
import { isValidEmail,  updateError } from '../../components/validate';
import Loader from '../../components/loader';

const LoginScreen = () => {

  const navigation = useNavigation();

  const [secure, setSecure] = useState(true);


  const [inputs, setInputs] = React.useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = React.useState(false);
  const [erroremail, setErrorEmail] = useState('');
  const [errorpassword, setErrorPassword] = useState('');

  const [err, setError] = useState('');
  


  const isValidForm = () => {
    if (!inputs.email)
      return updateError('Please enter email!', setErrorEmail);
    if (!isValidEmail(inputs.email))
      return updateError('Invalid email!', setErrorEmail);

    if (!inputs.password.trim())
      return updateError('Please enter Password!', setErrorPassword);
    if (inputs.password.length < 8)
      return updateError('Password is too short!', setErrorPassword);

    return true;
  };

  const signIn = async () => {
    if (isValidForm()) {
      setLoading(true);
      setTimeout(() => {
                
        router.replace('/(tabs)');
      
    }, 2000);
    
      // setTimeout(() => {
      //   try {
      //     setLoading(false);
      //     const email = inputs.email;
      //     const password = inputs.password;
      //     const data = {email,password};

      //     //console.log(data)
      //    axios.post(`http://twillo.eu-4.evennode.com/api/v1/talkapp/user/login`, data, {
      //       headers: { 'Content-Type': 'application/json' }
      //     })
      //       .then((response) => {

      //         const result = response.data
      //        const { data, message, status } = result;

           
      //         //dispatch(setUsers(user))

      //        console.log("Good",response,result)
      //       console.log("good",message,response)

             
      //         if(message =="Fill out all required fields"){
      //           updateError('Fill out all required fields!', setError);
                
      //         }
             
      //         else if(message =="Email does not exist"){
      //           updateError('Email does not exist!', setError);
                
  
      //         }   
              
      //         else if(message =="Please verify Your Account"){
      //           updateError('Please verify Your Account!', setError);
      //             navigation.navigate('EmailVerify');
      //         } 
      //         else if(message =="No record found"){
      //           updateError('No record found!', setError);
                
  
      //         } 
      //         else if(message =="Password Incorrect"){
      //           updateError('Password Incorrect!', setError);
                
  
      //         } 
      //         else if(message =="Login Successful"){
               
                
      //           AsyncStorage.setItem(
      //             'userData',
      //             JSON.stringify({ ...data, loggedIn: true }),
      //           );

                // setTimeout(() => {
                
                //     navigation.navigate('TabNavigator');
               
                  
                // }, 1000);
                
      //         } 

      //       })
      //   } catch (error) {
      //     console.log("====", error)
      //     Alert.alert('Error', 'Something went wrong');
      //   }
      // }, 1000);

    }
  }
  const handleOnchange = (text: string, input: string) => {
    setInputs(prevState => ({ ...prevState, [input]: text }));
  };

  return (
    <>
    <Stack.Screen  options={{   headerShown: false, }} />
    <ScrollView style={styles.container}>

      <SafeAreaView>
        <Loader visible={loading} />

        <View style={styles.navContainer}>
         
        </View>
        <View style={styles.heading}>
          <Text style={styles.headingText}>Hi, Welcome back!</Text>
          <Text style={styles.headingParagraph}>
            Login to EseTech Note, you've been missed
          </Text>
        </View>
        <View style={styles.formWrapper}>
        {err ? (
              <Text style={{ color: 'red', fontSize: 18, textAlign: 'center' }}>
                {err}
              </Text>
            ) : null}

         
          <View style={styles.inputWrapper}>
            <Text style={styles.inputLabel}>Email Address</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder='example@email.com'
                keyboardType="email-address"
                autoFocus
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
        <View style={styles.forgotContainer}>
          <TouchableWithoutFeedback
            // onPress={() => navigation.navigate("ResetPassword")}
          >
            <Text style={styles.forgotText}>Forgot password?</Text>
          </TouchableWithoutFeedback>
        </View>
        <View style={styles.btnContainer}>
          <TouchableWithoutFeedback
            onPress={() => { signIn() }}
          >
            <View style={styles.btnPrimary}>
              <Text style={styles.btnPrimaryText}>Login</Text>
            </View>
          </TouchableWithoutFeedback>

          <Text style={styles.loginText}>
            Don't have an account?{" "}
            <TouchableWithoutFeedback
              onPress={() => router.replace('/signup')}
            >
              <Text style={styles.link}>Sign up</Text>
            </TouchableWithoutFeedback>
        
          </Text>
        </View>
      </SafeAreaView>
    </ScrollView>
    </>);
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.dark,
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
    marginTop: 40,
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
    marginTop: 60,
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
    borderColor: colors.gray,
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
  forgotContainer: {
    paddingHorizontal: 20,
    alignItems: "flex-end",
  },
  forgotText: {
    color: colors.green,
    fontSize: 16,
    fontFamily: "Inter_600SemiBold",
  },
});
