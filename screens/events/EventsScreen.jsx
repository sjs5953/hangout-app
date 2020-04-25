import React, { useState } from 'react'
import { RefreshControl, Text, View, FlatList,TouchableOpacity, ActivityIndicator, TextInput } from 'react-native'
import {globalStyles} from '../../styles/global'
import debounce from'lodash.debounce';
import Card from '../../shared/Card'
import { styles } from './styles'
import { Button } from 'react-native-paper';
import LoadingScreen from '../../shared/LoadingScreen'
import {ERROR, REFRESHING, LOADING, LOADINGMORE} from '../../shared/status'
import ListScreen from './ListScreen';
import MapScreen from './MapScreen'
import SearchEvents from './components/SearchEvents'
import NoResults from './components/NoResults'
import FloatingButtons from './components/FloatingButtons'
import Error from './components/Error';

export default ({navigation, onRefresh, loadMore, status, events, searchEvents, listView}) => {

  if (status=='error') {
    return (
      <Error onRefresh={onRefresh}/>
    )
  }

  const [selectedItem, setSelectedItem] = useState("");

  return (
    <View style={{flex:1}}>
      <View>
        {/*Floating Buttons*/}
        <FloatingButtons selectedItem={selectedItem} setSelectedItem={setSelectedItem} searchEvents={searchEvents} onRefresh={onRefresh}/>
      </View>

      <SearchEvents selectedItem={selectedItem} searchEvents={searchEvents}/>

      {listView ? 
        <ListScreen 
          navigation={navigation} 
          onRefresh={onRefresh} 
          loadMore={loadMore} 
          status={status}
          events={events}
        />
        :
        <MapScreen 
          navigation={navigation} 
          onRefresh={onRefresh} 
          loadMore={loadMore} 
          status={status}
          events={events}
        />
      }
    </View>
  )
};