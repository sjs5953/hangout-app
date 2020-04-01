import React from 'react'
import { StyleSheet, Text, View, Button } from 'react-native'
import {globalStyles} from '../../styles/global'
const SignIn = ({navigation}) => {
  return (
    <View style={globalStyles.container}>
      <Text>SignIn</Text>
      <Button title='sign in' onPress={()=> navigation.navigate('Events')} />
      <Button title='sign up' onPress={()=> navigation.navigate('SignUp')} />
    </View>
  )
}

export default SignIn

const styles = StyleSheet.create({})
