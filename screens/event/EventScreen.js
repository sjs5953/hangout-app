import React from 'react'
import { Text, View } from 'react-native'
import Card from '../../shared/Card'
import {FlatButton} from '../../shared/Button';
import axios from 'axios';
import {globalStyles} from '../../styles/global'
import {styles} from './styles'
import { Button } from 'react-native-paper';

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
       <Button raised color='red' theme={{ roundness: 3 }} onPress={handlePress}>
         Delete
      </Button>
     </>
    }
    </View>
  )
}
