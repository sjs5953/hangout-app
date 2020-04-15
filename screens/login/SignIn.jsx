import React,{useContext, useState} from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { globalStyles } from '../../styles/global'
import { AuthContext } from '../../context'
import { Button } from 'react-native-paper';
import FBLoginButton from './components/FBLoginButton'
import GoogleButton from './components/GoogleButton'
import { AuthSession,Linking} from 'expo'
import * as WebBrowser from 'expo-web-browser'

const SignIn = ({navigation}) => {

  // const [state, setState] = useState({})

  const { signIn, signUp } = useContext(AuthContext);

  const handleRedirect = async (event) => {
    WebBrowser.dismissBrowser();
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
    
    try {
      let authResult = await WebBrowser.openAuthSessionAsync(authUrl,redirectURL);
      // await setState({authResult})
      if(authResult.type && authResult.type ==='success') {
        signIn()
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
      <Text>Hello</Text>
      {/* <FBLoginButton /> */}

      <GoogleButton />

       <Button onPress={handleOAuthLogin}>
       Phone Browser
      </Button>

      <Button onPress={()=> navigation.navigate('browser',{url:`https://meetnow.herokuapp.com/auth/google`})}>
        App Browser
      </Button>

      <Button raised theme={{ roundness: 3 }} onPress={()=> signIn()}>
        Sign In
      </Button>

    </View>
  )
}

export default SignIn

const styles = StyleSheet.create({})
