import React, { useState } from 'react'
import { RefreshControl, Text, View, FlatList,TouchableOpacity, ActivityIndicator, TextInput } from 'react-native'
import {globalStyles} from '../../../styles/global'
import debounce from'lodash.debounce';
import Card from '../../../shared/Card'

import LoadingScreen from '../../../shared/LoadingScreen'
import {ERROR, REFRESHING, LOADING, LOADINGMORE} from '../../../shared/status'

import NoResults from '../../events/components/NoResults'


export default ({navigation, onRefresh, loadMore, status, events}) => {

  const renderFooter = () => {
    if (status == "loading-more")
    return <ActivityIndicator animating size='large'/>
  }

  if (status=='error') {
    return (
      <Text style={globalStyles.titleText}>Failed to load, try again!</Text>
    )
  }

  return (
    <View style={{paddingHorizontal:20,paddingVertical:5, marginVertical:0,flex:1}}>
      {status == LOADING ?
      <LoadingScreen/>
        :
      <FlatList
        keyExtractor={item=>`${item._id}`}
        data={events}
        onEndReached={()=> loadMore()}
        showsVerticalScrollIndicator={false}
        ListFooterComponent={renderFooter()}
        onEndReachedThreshold={0.1}
        ListEmptyComponent={<NoResults onRefresh={onRefresh}/>}
        refreshControl={
          <RefreshControl refreshing={status=='refreshing'} onRefresh={onRefresh} />
        }
        renderItem={({item})=>(
          <TouchableOpacity style={globalStyles.titleText} onPress={debounce(
            () =>
            navigation.navigate('Event', {eventKey:item._id}), 500,{
              'leading': true,
              'trailing': false
            }
          )}>
            <Card>
              <Text style={globalStyles.titleText}>
                {item.name}
              </Text>
              <Card>
                  <Text style={{lineHeight:30}}>{item.description}</Text>
              </Card>
            </Card>
          </TouchableOpacity>
          )}
        />
      }

    </View>
  )
};