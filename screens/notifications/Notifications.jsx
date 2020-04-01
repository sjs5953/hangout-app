import React from 'react'
import { StyleSheet, Text, View, FlatList, TouchableOpacity} from 'react-native'
import {globalStyles} from '../../styles/global'
import debounce from'lodash.debounce';
import Card from '../../shared/Card'

const notifications = [
  {title: 'noti1', content:'noti about Soccer', key:'1', eventKey:'1'},
  {title: 'noti2', content:"noti about Pokemon Raid", key:'2', eventKey:'2'},
  {title: 'noti3', content:"noti about Cooking", key:'3', eventKey:'3'},
  {title: 'noti4', content:"noti about Chess", key:'4', eventKey:'4'},
  {title: 'noti5', content:"noti about SuperSmash", key:'5', eventKey:'5'},
]

const events = [
  {title: 'Pickup Soccer Game', location: '123', time:'', key:'1'},
  {title: 'Pokemon Go Raid', location: '123', time:'', key:'2'},
  {title: 'Cooking Breads', location: '123', time:'', key:'3'},
  {title: 'Playing Chess', location: '123', time:'', key:'4'},
  {title: 'Playing SuperSmash', location: '123', time:'', key:'5'},
]

const getEvent = (key) => {
  const event = events.filter(event=>(
    event.key == key
  ))
  return event[0]
}

const Notifications = ({navigation}) => {
  return (
    <View style={globalStyles.container}>
      <Text>Notifications</Text>
      <FlatList
        data={notifications}
        renderItem={({item})=>(
          <TouchableOpacity style={globalStyles.titleText} onPress={
            debounce(
            () =>
            navigation.navigate('EventsStack', {
              screen:'Event',
              params: {item:getEvent(item.eventKey)}
            }), 500,{
              'leading': true,
              'trailing': false
            })
          }>
            <Card>
              <Text style={globalStyles.titleText}>
                {item.title}
              </Text>
              <Card>
                <Text style={globalStyles.titleText}>
                  {item.content}
                </Text>
              </Card>
            </Card>
          </TouchableOpacity>
        )}
      />
    </View>
  )
}

export default Notifications

const styles = StyleSheet.create({})
