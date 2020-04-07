import React,{useState, useEffect, useContext} from 'react'
import { RefreshControl, StyleSheet, Text, View, FlatList, TouchableOpacity, ActivityIndicator} from 'react-native'
import {globalStyles} from '../../styles/global'
import debounce from'lodash.debounce';
import Card from '../../shared/Card'
import * as mockData from '../../mockData/mockData'


const Notifications = ({navigation}) => {

  const [notifications, setNotifications] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const [status, setStatus] = useState({
    error:false,
    isLoading:true,
    isLoadingMore:false
  })

  let initialNotifications;
  useEffect(()=>{
    setTimeout(() => {
      // axios.get(`/notifications/${userId}`)
      initialNotifications = mockData.notifications;
      Promise.resolve({data: initialNotifications})
      .then(res=>{
        const result = res.data;
        setNotifications(result);
        setStatus({...status, isLoading:false});
      })
      .catch(err=>{
        setStatus({
          error: true,
          isLoading:false,
          isLoadingMore:false
        })
      })
    }, 1000);
  },[]);


  const loadMore = () => {
    console.log(notifications.length)
    setStatus({...status,isLoadingMore:true});
    const moreNotifications =[]
 
    for (let i=0; i<5; i++) {
      const id = (Math.random()*100).toString();
      const title = `noti ${i}`
      const newNoti = {
        id,
        title,
        content:"dont click this",
        eventKey:'1'
      }
      moreNotifications.push(newNoti);
    }

    setTimeout(() => {
      Promise.resolve({data:moreNotifications})
      .then(res=>{    
        const moreNotifications = res.data;
        setNotifications([...notifications, ...moreNotifications]);
        setStatus({
          error: false,
          isLoading:false,
          isLoadingMore:false
        })
      })
      .catch(err=>{
        setStatus({
          error: true,
          isLoading:false,
          isLoadingMore:false
        });
        console.log(err)
      })
    }, 500);
  }


  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    if (true) {
      try {
        // let response = await axios.get(
        //   '/events'
        // );
        let response = {data:[
          {
          "id":"123123123",
          "title":"Data after refreshing",
          "eventKey":"1",
          "content":"refreshing is cool"
          }
        ]}
        // let responseJson = await response.json();
        // console.log(responseJson);
        setNotifications([...response.data,...initialNotifications]);
        setRefreshing(false)
      } catch (error) {
        console.error(error);
      }
    }
    else{
      // ToastAndroid.show('No more new data available', ToastAndroid.SHORT);
      setRefreshing(false)
    }
  }, [refreshing]);

  const renderFooter = () => {
    if (status.isLoadingMore)
    return <ActivityIndicator animating size={'large'}/>
  }

  if(status.isLoading) {
    return (<View style={styles.loadingContainer}><ActivityIndicator animating size={'large'}/></View>)
  }

  return (
    <View style={globalStyles.container}>
      {status.error?
      <Text style={globalStyles.titleText}>Failed to load, try again!</Text>
      : 
      <FlatList
        keyExtractor={item=>item.id.toString()}
        data={notifications}
        onEndReached={()=> loadMore()}
        ListFooterComponent={renderFooter()}
        onEndReachedThreshold={0.1}
        ListEmptyComponent={<View style={styles.noResults}><Text>No results found</Text></View>}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
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

export default Notifications

const styles = StyleSheet.create({
  loadingContainer: {
    justifyContent:'center',
    alignItems:'center',
    flex:1
  },
  noResults :{
    justifyContent:'center',
    alignItems:'center',
    flex:2,
    marginTop:20
  }
})
