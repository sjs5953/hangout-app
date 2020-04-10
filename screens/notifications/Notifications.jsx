import React,{useState, useEffect, useContext} from 'react'
import * as mockData from '../../mockData/mockData'
import LoadingScreen from '../../shared/LoadingScreen'
import NotificationsScreen from './NotificationsScreen'
import { AuthContext } from '../../context';

const Notifications = ({navigation}) => {

  const [notifications, setNotifications] = useState({
    data:[],
    currentPage:1
  });
  const [refreshing, setRefreshing] = useState(false);

  const [status, setStatus] = useState({
    error:false,
    isLoading:true,
    isLoadingMore:false
  })

  const { user } = useContext(AuthContext);
  // put that in the header
  const userId = user.id;

  console.log("User Id: ",userId)

  useEffect(()=>{
 
    // axios.get(`/notifications/${userId}`)
    const initialNotifications = mockData.notifications;
    Promise.resolve({data:{
      notifications:initialNotifications,
      totalPage:1
    }})
    .then(res=>{
      const result = res.data;
      setNotifications({
        ...notifications,
        data: result.notifications,
      });
      setStatus({...status, isLoading:false});
    })
    .catch(err=>{
      setStatus({
        error: true,
        isLoading:false,
        isLoadingMore:false
      })
    })
  },[]);



  const loadMore = () => {
    setStatus({...status,isLoadingMore:true});
  
    
    setTimeout(() => {
      const tempData = mockData.notifications;
      Promise.resolve({data:{
        notifications: tempData,
        totalPage:1
      }})
      .then(res=>{
    
        const result = res.data;
        console.log("notifications.currentPage", notifications.currentPage)
        console.log("result.totalPage", result.totalPage)
        console.log("notifications: ", notifications)
        if(notifications.currentPage != result.totalPage){
          const moreNotis = result.notifications;
          setNotifications({
            data: [...notifications, ...moreNotis],
            currentPage: notifications.currentPage+1
          });
          setStatus({
            error: false,
            isLoading:false,
            isLoadingMore:false
          })}
          else {
            setTimeout(()=>{
              setStatus({
                error: false,
                isLoading:false,
                isLoadingMore:false
              })
            },1500)
        }
  
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
        let response = {data:{
          notifications: mockData.notifications,
          totalPage:1
        }}
        // // let responseJson = await response.json();
        // // console.log(responseJson);
        const refreshedNotis = response.data.notifications;
        console.log(refreshedNotis)
        setNotifications({data:refreshedNotis, currentPage:1});
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
      notifications={notifications.data}
    />
  )
}

export default Notifications