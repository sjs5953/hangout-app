import React, {useEffect, useState} from 'react'
import { StyleSheet, Text, View, Button } from 'react-native'
import * as GoogleSignIn from 'expo-google-sign-in';
// import * as AppAuth from 'expo-app-auth';

// // When configured correctly, URLSchemes should contain your REVERSED_CLIENT_ID
// const { URLSchemes } = AppAuth;

const GoogleButton = () => {

  const [state, setState] = useState ({user:null});

  initAsync = async () => {
    // await GoogleSignIn.initAsync({
    //   // You may ommit the clientId when the firebase `googleServicesFile` is configured
    //   clientId: '<YOUR_IOS_CLIENT_ID>',
    // });
    _syncUserWithStateAsync();
  };

  _syncUserWithStateAsync = async () => {
    const user = await GoogleSignIn.signInSilentlyAsync();
    setState({ user });
  };

  signOutAsync = async () => {
    await GoogleSignIn.signOutAsync();
    setState({ user: null });
  };

  signInAsync = async () => {
    try {
      await GoogleSignIn.askForPlayServicesAsync();
      const { type, user } = await GoogleSignIn.signInAsync();
      if (type === 'success') {
        _syncUserWithStateAsync();
      }
    } catch ({ message }) {
      alert('login: Error:' + message);
    }
  };

  useEffect(()=>{
    initAsync()
  },[])


  onPress = () => {
    if (state.user) {
      signOutAsync();
    } else {
      signInAsync();
    }
  };

  return (
    <View>
      <Button title='Google Sign In' onPress={onPress}/>
    </View>
  )
}

export default GoogleButton

const styles = StyleSheet.create({})
