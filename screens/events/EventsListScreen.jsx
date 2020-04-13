import React from 'react'
import { RefreshControl, Text, View, FlatList,TouchableOpacity, ActivityIndicator } from 'react-native'
import {globalStyles} from '../../styles/global'
import debounce from'lodash.debounce';
import Card from '../../shared/Card'
import { styles } from './styles'
import { Button } from 'react-native-paper';

export default ({navigation, onRefresh, loadMore, status, events}) => {

  const renderFooter = () => {
    if (status == "loading-more")
    return <ActivityIndicator animating size='large'/>
  }

  return (
    <View>
    {status=='erro'? 
        <Text style={globalStyles.titleText}>Failed to load, try again!</Text>
      :
      <FlatList
      keyExtractor={item=>`${item._id}`}
      data={events}
      onEndReached={()=> loadMore()}
      ListFooterComponent={renderFooter()}
      onEndReachedThreshold={0.1}
      // ListEmptyComponent={<View style={styles.noResults}><Text>No results found</Text></View>}
      refreshControl={
        <RefreshControl refreshing={status == 'refreshing'} onRefresh={onRefresh} />
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
    }
    </View>
  )
};