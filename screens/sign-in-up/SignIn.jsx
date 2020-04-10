import React,{useContext} from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { globalStyles } from '../../styles/global'
import { AuthContext } from '../../context'
import { Button } from 'react-native-paper';

const SignIn = ({navigation}) => {
  const { signIn } = useContext(AuthContext);
  return (
    <View style={globalStyles.container}>
      <Text>SignIn</Text>
      <Button raised theme={{ roundness: 3 }} onPress={()=> signIn()}>
        Sign In
      </Button>
      <Button raised theme={{ roundness: 3 }} onPress={()=> signOut()}>
        Sign Up
      </Button>
    </View>
  )
}

export default SignIn

const styles = StyleSheet.create({})
