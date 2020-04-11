import React,{useContext} from 'react'
import { RefreshControl, Text, View, FlatList, TouchableOpacity, ActivityIndicator} from 'react-native'
import {globalStyles} from '../../styles/global'
import debounce from'lodash.debounce';
import Card from '../../shared/Card'
import {styles} from './styles'

export default ({navigation, onRefresh, loadMore, status, notifications}) => {

  const renderFooter = () => {
    if (status=="loading-more")
    return <ActivityIndicator animating size={'large'}/>
  }

  return (
    <View style={globalStyles.container}>
      {status=='error'?
      <Text style={globalStyles.titleText}>Failed to load, try again!</Text>
      : 
      <FlatList
        keyExtractor={item=>`${item.id}`}
        data={notifications}
        onEndReached={()=> loadMore()}
        ListFooterComponent={renderFooter()}
        onEndReachedThreshold={0.1}
        ListEmptyComponent={<View style={styles.noResults}><Text>No results found</Text></View>}
        refreshControl={
          <RefreshControl refreshing={status=='refreshing'} onRefresh={onRefresh} />
        }
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