import React, {useState} from 'react'
import { StyleSheet, Text, View, FlatList,TouchableOpacity } from 'react-native'
import {globalStyles} from '../../styles/global'
import debounce from'lodash.debounce';
import Card from '../../shared/Card'
import { RoundButton } from '../../shared/Button';
import { AntDesign, FontAwesome5, Ionicons, Foundation, Fontisto } from '@expo/vector-icons';


const events = [
  {title: 'Pickup Soccer Game', location: '123', time:'', key:'1'},
  {title: 'Pokemon Go Raid', location: '123', time:'', key:'2'},
  {title: 'Cooking Breads', location: '123', time:'', key:'3'},
  {title: 'Playing Chess', location: '123', time:'', key:'4'},
  {title: 'Playing SuperSmash', location: '123', time:'', key:'5'},
]

const Events = ({navigation}) => {

  // ListView = false, MapView = true
  const [listView, setlistView] = useState(true);

  const toggleView = () => {
    setlistView(!listView);
  }

  return (
    <View style={globalStyles.container}>
      {listView? 
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
        :
        <Text style={globalStyles.titleText}>MapView!</Text>
        }
     

    {/* a component that needs to stay for all screens inside events screen */}
      <View style={styles.toggleContainer}>
        <RoundButton style={styles.toggleButton} onPress={toggleView}>
          {listView?
            <FontAwesome5 name="map" color={"black"} size={30} /> :
            <FontAwesome5 name="list-ul" color={"black"} size={30} />}
        </RoundButton>
      </View>
    </View>
  )
}

export default Events

const styles = StyleSheet.create({
  toggleContainer:{
    position:'absolute',
    bottom:20,
    right:25,
    flexDirection:'row',
    justifyContent:'flex-end'
  },
})
