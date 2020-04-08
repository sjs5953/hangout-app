import React, { useContext } from 'react'
import { Text, View, Button } from 'react-native'
import {globalStyles} from '../../styles/global'
import { styles } from './styles'


export default ({signOut}) => {

  return (
    <View style={globalStyles.container}>
      <Text>User</Text>
      <Button title='Sign Out' onPress={()=> signOut()} />
    </View>
  )
}