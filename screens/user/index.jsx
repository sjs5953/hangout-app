import React, { useContext } from 'react'
import { Text, View, Button } from 'react-native'
import {globalStyles} from '../../styles/global'
import { AuthContext } from '../../context'
import UserScreen from './view'

const User = ({navigation}) => {
  const { signOut } = useContext(AuthContext);
  return (
   <UserScreen signOut={signOut}/>
  )
}
export default User