import React,{useContext, useState} from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { globalStyles } from '../../styles/global'
import { AuthContext } from '../../context'
import { Button } from 'react-native-paper';
// import FBLoginButton from './components/FBLoginButton'

import { AuthSession,Linking} from 'expo'
import * as WebBrowser from 'expo-web-browser'
import { auth } from 'firebase';

const SignIn = ({navigation}) => {

  // const [state, setState] = useState({})

  const { signIn, setUserToken } = useContext(AuthContext);

  const handleRedirect = async (event) => {
    // WebBrowser.dismissBrowser();
  }

  const addLinkingListener = () => {
    Linking.addEventListener('url', handleRedirect)
  }

  const removeLinkingListener = () => {
    Linking.removeEventListener('url', handleRedirect)
  }

  const handleOAuthLogin = async () => {
    //get the app's deep link
    let redirectURL = await Linking.getInitialURL();
    //server url
    let authUrl = `https://meetnow.herokuapp.com/auth/google`

    addLinkingListener()
    
    authUrl += '?returnTo=' + redirectURL

    // console.log("Auth url: ", authUrl);
    // console.log("redirect rul: ", redirectURL)
    try {
      let authResult = await WebBrowser.openAuthSessionAsync(authUrl,redirectURL);
      // await setState({authResult})
      if(authResult.type && authResult.type ==='success') {
        let url = authResult.url;
        let index = url.indexOf('=');
        let arr = url.split("");
        let id = arr.splice(index+1).join("")
        // console.log(index)
        // console.log(authResult);
        // console.log(arr)
        // console.log(id)
        const token = id
        // signIn(token);
        setUserToken(token);
        console.log("signin as ", token)
      } else {
        alert("Login was failed");
      }
    }
    catch (err) {
      console.log('Error: ',err)
    }

    removeLinkingListener()
  
  }

  return (
    <View style={globalStyles.container}>

      <Button onPress={handleOAuthLogin}>
        SignIn with Google
      </Button>

      {/* <Button onPress={()=> navigation.navigate('browser',{url:`https://meetnow.herokuapp.com/auth/google`})}>
        App Browser
      </Button> */}
    </View>
  )
}

export default SignIn

const styles = StyleSheet.create({})
