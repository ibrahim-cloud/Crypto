import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity, Image } from 'react-native'
import * as Google from 'expo-google-app-auth';
import { Octicons, Fontisto, Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import axios from 'axios';
import Background from '../components/Background'
import BackButton from '../components/BackButton'
import Logo from '../components/Logo'
import Header from '../components/Header'
import TextInput from '../components/TextInput'
import Buttons from '../components/Button'




export default function SigninWithGoogle({ navigation }) {

    const [googleSubmit, setGoogleSubmit] = useState(false);




    const handleGoogleSignin = async() => {


        setGoogleSubmit(true);
        const config = {
            androidClientId: `916736044071-pkhj6ao976fpkl699cnal998a4vh1lst.apps.googleusercontent.com`,
            scopes: ['profile', 'email'],
        };

        Google.logInAsync(config)
            .then(async(result) => {
                const { type, user } = result;
                if (type == 'success') {
                    const { email, name, photoUrl } = user;
                    console.log('Google signin successful');
                    console.log(email, name, photoUrl);
                    await AsyncStorage.setItem('email', email);
                    await AsyncStorage.setItem('name', name);
                    await AsyncStorage.setItem('photoUrl', photoUrl);

                    navigation.navigate('DrawerNav', { screen: 'profile' });
                } else {
                    console.log('cannot signIn with Google');
                }
                setGoogleSubmit(false);
            })
            .catch((error) => {
                console.log(' error' );
                console.log(error);
                setGoogleSubmit(false);
            });
    };


    return (
        

        <View style={styles.container}>
        {/* <Image style={{width:180, height:80}} source={require('../assets/home.png')}/> */}
        <Image source={require('../assets/home.png')} style = {{height: 200, width: 250, resizeMode : 'stretch',}} />

        <TouchableOpacity  style={styles.appButtonContainer1}>

                <Text style={styles.appButtonText}>Login </Text>
           </TouchableOpacity> 
    
            <TouchableOpacity onPress={handleGoogleSignin} style={styles.appButtonContainer}>
                <Fontisto name="google" size={25} color='#fff'/>

                <Text style={styles.appButtonText}>Sign in with Google </Text>
           </TouchableOpacity> 
           
        </View>


// <TextInput
//  label="Email"
//   returnKeyType="next"

//   autoCapitalize="none"
//   autoCompleteType="email"
//   textContentType="emailAddress"
//   keyboardType="email-address"
// />
// <TextInput
//    label="Password"
//   returnKeyType="done"
//   secureTextEntry
// />
// <View style={styles.forgotPassword}>
//   <TouchableOpacity
//     onPress={() => navigation.navigate('ResetPasswordScreen')}
//   >
//     <Text style={styles.forgot}>Forgot your password?</Text>
//   </TouchableOpacity>
// </View>


// <View style={styles.row}>
//   <Text>Don’t have an account? </Text>
//   <TouchableOpacity>
//     <Text style={styles.link}>Sign up</Text>
//   </TouchableOpacity>
// </View>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#0F1C5A'


    },
    tinyLogo: {
        width: "60%",
        height: "40%",
        color:"#fff"



    },
    titleText: {
        fontSize: 20,
        fontWeight: "bold",
        color:"#fff"
    },
    appButtonContainer: {
        elevation: 8,
        backgroundColor: "#F8397F",
        borderRadius: 20,
        paddingVertical: 10,
        paddingHorizontal: 12,
        justifyContent: 'center',
        marginTop:20,
        alignItems: 'center',
        flexDirection: 'row',
        width: '80%',
    },
    appButtonContainer1: {
        elevation: 8,
        backgroundColor: "#F8397F",
        borderRadius: 20,
        paddingVertical: 10,
        paddingHorizontal: 12,
        justifyContent: 'center',
        marginTop:20,
        alignItems: 'center',
        flexDirection: 'row',
        width: '80%',
    },
    appButtonText: {
        fontSize: 18,
        color:"#fff",
        fontWeight: "bold",
        alignSelf: "center",
        textTransform: "uppercase",
        marginHorizontal: 10
    },
    ////////////////////////////
    forgotPassword: {
        width: '100%',
        alignItems: 'flex-end',
        marginBottom: 24,
      },
      row: {
        flexDirection: 'row',
        marginTop: 4,
      },
      forgot: {
        fontSize: 13,
        color: '#fff',
      },
      link: {
        fontWeight: 'bold',
        color: '#fff',
      },
});