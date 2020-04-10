import React, { useContext } from 'react'
import { Text, View, Button } from 'react-native'
import {globalStyles} from '../../styles/global'
import { AuthContext } from '../../context'
import UserScreen from './UserScreen'

const User = ({navigation}) => {
  const { user,signOut } = useContext(AuthContext);

  return (
   <UserScreen user={user} signOut={signOut}/>
  )
}
export default User