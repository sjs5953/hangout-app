import React,{useContext} from 'react'
import { StyleSheet, Text, View, Button } from 'react-native'
import {globalStyles} from '../../styles/global'
import { AuthContext } from '../../context'

const SignUp = ({navigation, route}) => {
  const { signUp } = useContext(AuthContext);
  return (
    <View style={globalStyles.container}>
      <Text>Create new account</Text>
      <Button title='Create User' onPress={()=>signUp()} />
    </View>
  )
}

export default SignUp

const styles = StyleSheet.create({})
