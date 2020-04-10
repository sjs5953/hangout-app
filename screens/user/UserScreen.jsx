import React, { useContext } from 'react'
import { Text, View } from 'react-native'
import { globalStyles } from '../../styles/global'
import { styles } from './styles'
import { Button } from 'react-native-paper';


export default ({user,signOut}) => {

  return (
    <View style={globalStyles.container}>
      <Text>{user.username}</Text>
      <Button raised theme={{ roundness: 3 }} onPress={()=> signOut()}>
        Logout
      </Button>

    </View>
  )
}