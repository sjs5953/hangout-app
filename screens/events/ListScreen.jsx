import React, { useState } from 'react'
import { RefreshControl, Text, View, FlatList,TouchableOpacity, ActivityIndicator, TextInput,StyleSheet } from 'react-native'
import {globalStyles} from '../../styles/global'
import debounce from'lodash.debounce';
import Card from '../../shared/Card'
import { styles } from './styles'
import { Button } from 'react-native-paper';
import LoadingScreen from '../../shared/LoadingScreen'
import {ERROR, REFRESHING, LOADING, LOADINGMORE} from '../../shared/status'

import SearchEvents from './components/SearchEvents'
import NoResults from './components/NoResults'
import FloatingButtons from './components/FloatingButtons'

import { MaterialCommunityIcons,FontAwesome,Ionicons } from '@expo/vector-icons';


export default function ListScreen ({navigation, onRefresh, loadMore, status, events}) {

  const renderFooter = () => {
    if (status == "loading-more")
    return <ActivityIndicator animating size='large'/>
  }

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

    return <FontAwesome name={'gamepad'} size={24}/>
                  // <FontAwesome name={'soccer-ball-o'} size={24}/>
  }
  return (
    <View style={{flex:1}}>
      {status == LOADING ?
      <LoadingScreen/>
        :
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
              <View style={customStyles.headerContainer}>
                <View style={customStyles.headerContainer}>
                  {renderIcon(item.category)}
                  <Text style={globalStyles.titleText}>
                    {item.name}
                  </Text>
                </View>
                <View>
                {item.isOwnPost?<Text style={{color:'crimson'}}>posted by me</Text>:null}
                {item.hasVoted&&!item.isOwnPost?<Text style={{color:'#1faadb'}}>voted by me</Text>:null}
                </View>
              </View>
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

const customStyles = StyleSheet.create({
  headerContainer: {
    flexDirection:'row', 
    justifyContent:'space-between', 
    alignItems:'center',
    paddingRight:10
  }
})