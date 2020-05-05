import React,{useState} from 'react'
import { Text, View,StyleSheet } from 'react-native'
import Card from '../../shared/Card'
import {FlatButton} from '../../shared/Button';
import axios from 'axios';
import {globalStyles} from '../../styles/global'
import {styles} from './styles'
import { Button } from 'react-native-paper';
import Map from './components/Map'
import { MaterialCommunityIcons,FontAwesome,Ionicons } from '@expo/vector-icons';

export default ({handlePress, event, status, handleVote, voted}) => {

 
  const renderIcon = (category) => {
    switch (category) {
      case 'Other':
        return <FontAwesome name={'list-ul'} size={24}/>
      case 'Sports':
        return <FontAwesome name={'soccer-ball-o'} size={24}/>
      case 'Game':
        return <FontAwesome name={'gamepad'} size={24}/>
      case 'Movie':
        return <FontAwesome name={'file-movie-o'} size={24}/>
      case 'Learning':
        return <FontAwesome name={'book'} size={24}/>
      case 'Food':
        return <MaterialCommunityIcons name={'hamburger'} size={24}/>
      case 'Talking':
        return <Ionicons name={'ios-chatbubbles'} size={24}/>
    }
  }

  return (
    <View style={styles.container}>
    {status=='error'? 
        <Text style={globalStyles.titleText}>Failed to load, try again!</Text>
     :
     <>
      <Card>  
        <Text style={{...customStyle.contentStyle,fontSize:20,fontWeight:'bold'}}>{event.name}</Text>
      </Card> 
      <View style={{...globalStyles.horizontalCenter}}>
        <View style={{flex:1}}>
          <Card>
            <Text style={customStyle.contentStyle}>Required Votes:  {event.minimumParticipants}</Text>
          </Card>
        </View>
        <View style={{flex:0.45}}>
          <Card>
            <View style={{...globalStyles.horizontalCenter,...globalStyles.titleText}}>
              <Text style={{fontSize:17,color:'#1faadb'}}>{event.votedBy.length}</Text>
              <Text style={{fontSize:17,textAlign:"center"}}>/{event.minimumParticipants}</Text>
            </View>
          </Card>
        </View>
        <Card>
          <View style={globalStyles.horizontalCenter}>
            <Button disabled={event.votedBy.length/event.minimumParticipants>=1&&!event.hasVoted} color={event.hasVoted||voted?'crimson':''} onPress={handleVote}>
            {event.hasVoted||voted?'UNVOTE':'VOTE'}
            </Button>
          </View>
        </Card>
      </View>

      <View style={{...globalStyles.horizontalCenter}}>
        <View style={{flex:1}}>
          <Card>
            <Text style={customStyle.contentStyle}> {event.address}</Text>
          </Card>
        </View>
        <View style={{flex:0.6}}>
          <Card>
          <Text style={customStyle.contentStyle}> {renderIcon(event.category)} {event.category}</Text>
          </Card>
        </View>
      </View>
       {/* <Card>
        <Text style={customStyle.contentStyle}> Start Time: {event.startTime} </Text>
       </Card> */}
      
       <Card>
        <Text style={{...customStyle.contentStyle, textAlign:'left'}}>Decription: </Text>
        <Card>
          <Text style={{...customStyle.contentStyle, textAlign:'left'}}> {event.description}</Text>
        </Card>
       </Card>
      
       {
         event.isOwnPost? 
          <Button raised color='red' theme={{ roundness: 3 }} onPress={handlePress}>
            Delete
          </Button>
         :
         null
       }

      <Map event={event}/>
     </>
    }
    </View>
  )
}

const customStyle = StyleSheet.create({
  contentStyle:{
    ...globalStyles.titleText,fontSize:16,textAlign:"center"
  }
})