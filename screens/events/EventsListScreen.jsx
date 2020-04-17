import React from 'react'
import { RefreshControl, Text, View, FlatList,TouchableOpacity, ActivityIndicator, TextInput } from 'react-native'
import {globalStyles} from '../../styles/global'
import debounce from'lodash.debounce';
import Card from '../../shared/Card'
import { styles } from './styles'
import { Button } from 'react-native-paper';

import SearchEvents from './components/SearchEvents'
import NoResults from './components/NoResults'


export default ({navigation, onRefresh, loadMore, status, events, searchEvents}) => {

  const renderFooter = () => {
    if (status == "loading-more")
    return <ActivityIndicator animating size='large'/>
  }


  if (status=='erro') {
    return (
      <Text style={globalStyles.titleText}>Failed to load, try again!</Text>
    )
  }

  return (
    <View style={{flex:1}}>
      <View style={{flexDirection:'row', justifyContent:"space-evenly"}}>
        {/*Floating Buttons*/}
      </View>

      <SearchEvents searchEvents={searchEvents}/>

      <FlatList
        keyExtractor={item=>`${item._id}`}
        data={events}
        onEndReached={()=> loadMore()}
        ListFooterComponent={renderFooter()}
        onEndReachedThreshold={0.1}
        ListEmptyComponent={<NoResults onRefresh={onRefresh}/>}
        refreshControl={
          <RefreshControl refreshing={status=='refreshing'} onRefresh={onRefresh} />
        }
        renderItem={({item})=>(
          <TouchableOpacity style={globalStyles.titleText} onPress={debounce(
            () =>
            navigation.push('Event', {eventKey:item._id}), 500,{
              'leading': true,
              'trailing': false
            }
          )}>
            <Card>
              <Text style={globalStyles.titleText}>
                {item.name}
              </Text>
              <Card>
                  <Text style={{lineHeight:30}}>Some Description Here</Text>
              </Card>
            </Card>
          </TouchableOpacity>
          )}
        />

    </View>
  )
};