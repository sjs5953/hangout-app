import React from 'react'
import { StyleSheet, Text, View, FlatList,TouchableOpacity } from 'react-native'
import {globalStyles} from '../../styles/global'
import debounce from'lodash.debounce';
import Card from '../../shared/Card'


const events = [
  {title: 'Pickup Soccer Game', location: '123', time:'', key:'1'},
  {title: 'Pokemon Go Raid', location: '123', time:'', key:'2'},
  {title: 'Cooking Breads', location: '123', time:'', key:'3'},
  {title: 'Playing Chess', location: '123', time:'', key:'4'},
  {title: 'Playing SuperSmash', location: '123', time:'', key:'5'},
]

const Events = ({navigation}) => {
  return (
    <View style={globalStyles.container}>
      <FlatList
        data={events}
        renderItem={({item})=>(
          <TouchableOpacity style={globalStyles.titleText} onPress={debounce(
            () =>
            navigation.push('Event', {item}), 500,{
              'leading': true,
              'trailing': false
            }
          )}>
            <Card>
              <Text style={globalStyles.titleText}>
                {item.title}
              </Text>
            </Card>
          </TouchableOpacity>
        )}
      />
    </View>
  )
}

export default Events

const styles = StyleSheet.create({})
