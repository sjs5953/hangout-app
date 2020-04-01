import React,{useContext} from 'react'
import { StyleSheet, Text, View, Button } from 'react-native'
import { globalStyles } from '../../styles/global'
import { AuthContext } from '../../context'

const SignIn = ({navigation}) => {
  const { signIn } = useContext(AuthContext);
  return (
    <View style={globalStyles.container}>
      <Text>SignIn</Text>
      <Button title='sign in' onPress={()=> signIn()} />
      <Button title='sign up' onPress={()=> navigation.navigate('SignUp')} />
    </View>
  )
}

export default SignIn

const styles = StyleSheet.create({})
