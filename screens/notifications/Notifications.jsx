import React,{useState, useEffect, useContext} from 'react'
import * as mockData from '../../mockData/mockData'
import LoadingScreen from '../../shared/LoadingScreen'
import NotificationsScreen from './NotificationsScreen'


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

  if(status.isLoading) {
    return (<LoadingScreen/>)
  }

  return (
    <NotificationsScreen 
      navigation={navigation}
      refreshing={refreshing}
      onRefresh={onRefresh}
      loadMore={loadMore}
      status={status}
      notifications={notifications}
    />
  )
}

export default Notifications
