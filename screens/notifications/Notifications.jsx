import React,{useState, useEffect, useContext} from 'react'
import { StyleSheet, Text, View, FlatList, TouchableOpacity} from 'react-native'
import {globalStyles} from '../../styles/global'
import debounce from'lodash.debounce';
import Card from '../../shared/Card'
import * as mockData from '../../mockData/mockData'


const Notifications = ({navigation}) => {

  const [notifications, setNotifications] = useState([]);
  const [error, setError] = useState(false);
  
  useEffect(()=>{
    // axios.get(`/notifications/${userId}`)
    const notificationsFromBack = mockData.notifications;
    Promise.resolve({data: notificationsFromBack})
    .then(res=>{
      setError(false);
      const result = res.data;
      setNotifications(result);
    })
    .catch(err=>{
      setError(true);
    })
  },[]);


  return (
    <View style={globalStyles.container}>
      {error?
      <Text style={globalStyles.titleText}>Failed to load, try again!</Text>
      : 
      <FlatList
        data={notifications}
        renderItem={({item})=>(
          <TouchableOpacity style={globalStyles.titleText} onPress={
            debounce(
            () =>
            navigation.navigate('EventsStack', {
              screen:'Event',
              params: {eventKey:item.eventKey}
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
      }
    </View>
  )
}

export default Notifications

const styles = StyleSheet.create({})
