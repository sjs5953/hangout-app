import React, { useContext } from 'react'
import { StyleSheet, Text, View, Button } from 'react-native'
import {globalStyles} from '../../styles/global'
import { AuthContext } from '../../context'

const User = () => {
  const { signOut } = useContext(AuthContext);
  return (
    <View style={globalStyles.container}>
      <Text>User</Text>
      <Button title='Sign Out' onPress={()=>signOut()} />
    </View>
  )
}

export default User

const styles = StyleSheet.create({})
