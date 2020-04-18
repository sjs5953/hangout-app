import React, { useContext } from 'react'
import { Text, View, ScrollView } from 'react-native'
import { globalStyles } from '../../styles/global'
import { styles } from './styles'
import { Button } from 'react-native-paper';
import EventsListScreen from '../events/EventsListScreen'
import {ERROR, REFRESHING, LOADING, LOADINGMORE} from '../../shared/status'
import UserPosts from './components/userPosts'

export default ({
  userInfo,
  navigation,
  onRefresh,
  loadMore,
  status,
  events,
  signOut
}) => {

  return (
    <View style={{flex:1}}>
      {/* <ScrollView showsVerticalScrollIndicator={false}> */}
        <View style={{justifyContent:'center', alignItems:'center', height:100}}>
          <Text style={{fontWeight:'bold', fontSize:20}}>{userInfo.userName}</Text>
          <Text></Text>
          <Text style={{fontWeight:'bold'}}>{userInfo.email}</Text>
        </View>
        <Button raised theme={{ roundness: 3 }} onPress={()=> signOut()}>
          Logout
        </Button>
     
        <UserPosts 
          navigation={navigation} 
          onRefresh={onRefresh} 
          loadMore={loadMore} 
          status={status}
          events={events}
        />
      {/* </ScrollView> */}
    </View>
  )
}