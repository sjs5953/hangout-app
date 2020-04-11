import React from 'react'
import { Text, View } from 'react-native'
import Card from '../../shared/Card'
import {FlatButton} from '../../shared/Button';
import axios from 'axios';
import {globalStyles} from '../../styles/global'
import {styles} from './styles'

export default ({handlePress, event, status}) => {

  return (
    <View style={styles.container}>
    {status=='error'? 
        <Text style={globalStyles.titleText}>Failed to load, try again!</Text>
     :
     <>
       <Card>
        <Text>Event Name: {event.name}</Text>
        <Text>Min Participants:  {event.minimumParticipants}</Text>
        <Text>Address: {event.address}</Text>
       </Card>
      <FlatButton style={styles.deleteButton} text={'Delete'} onPress={handlePress}/>
     </>
    }
    </View>
  )
}
