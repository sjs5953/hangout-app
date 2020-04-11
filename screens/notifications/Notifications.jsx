import React,{useState, useEffect, useContext} from 'react'
import * as mockData from '../../mockData/mockData'
import LoadingScreen from '../../shared/LoadingScreen'
import NotificationsScreen from './NotificationsScreen'
import { AuthContext } from '../../context';
import {ERROR, REFRESHING, LOADING, LOADINGMORE} from '../../shared/status'


const Notifications = ({navigation}) => {

  const [state, setState] = useState({
    notifications:[],
    currentPage:1,
    totalPages:null,
    status:LOADING
  });

  const { user } = useContext(AuthContext);
  // put that in the header
  const userId = user.id;

  console.log("User Id: ",userId)

  useEffect(()=>{
    // axios.get(`/notifications/${userId}`)
    const initialNotifications = mockData.notifications;
    Promise.resolve({data:{
      notifications:initialNotifications,
      totalPages:1
    }})
    .then(res=>{
      const result = res.data;
      setState({
        ...state,
        notifications: result.notifications,
        totalPages:result.totalPages,
        status:""
      });
    })
    .catch(err=>{
      setState({...state, status:ERROR})
    })
  },[]);



  const loadMore = () => {
    if (state.currentPage == state.totalPages) return;
    
    setState({...state, status:LOADINGMORE})

    setTimeout(() => {
      const tempData = mockData.notifications;
      Promise.resolve({data:{
        notifications: tempData,
        totalPages:1
      }})
      .then(res=>{
        const result = res.data;
        const moreNotis = result.notifications;
        setState({
          ...state,
          events:[...state.notifications,...moreNotis],
          currentPage: state.currentPage+1,
          totalPages: result.totalPages,
          status:""
        });
      })
      .catch(err=>{
        setState({
          error: true,
          isLoading:false,
          isLoadingMore:false
        });
        console.log(err)
      })
    }, 500);
  }


  const onRefresh = async () => {
    setState({...state, status:REFRESHING})
    if (true) {
      try {
        // let response = await axios.get(
        //   '/events'
        // );
        let response = {data:{
          notifications: mockData.notifications,
          totalPages:1
        }}
        // // let responseJson = await response.json();
        // // console.log(responseJson);
        const refreshedNotis = response.data.notifications;
        console.log(refreshedNotis)
        setState({
          ...state,
          events:refreshedNotis,
          currentPage:1,
          totalPages:response.data.totalPages,
          status:""
        });
      } catch (error) {
        console.error(error);
        setState({...state, status:ERROR})
      }
    }
    else{
      // ToastAndroid.show('No more new data available', ToastAndroid.SHORT);
      setRefreshing(false)
    }
  }

  if(state.status == LOADING) {
    return (<LoadingScreen/>)
  }

  return (
    <NotificationsScreen 
      navigation={navigation}
      onRefresh={onRefresh}
      loadMore={loadMore}
      status={state.status}
      notifications={state.notifications}
    />
  )
}

export default Notifications