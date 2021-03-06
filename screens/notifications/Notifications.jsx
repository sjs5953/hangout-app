import React,{useState, useEffect, useContext} from 'react'
import * as mockData from '../../mockData/mockData'
import LoadingScreen from '../../shared/LoadingScreen'
import NotificationsScreen from './NotificationsScreen'
import { AuthContext } from '../../context';
import {ERROR, REFRESHING, LOADING, LOADINGMORE} from '../../shared/status'


const Notifications = ({navigation,route}) => {

  const [state, setState] = useState({
    notifications:[],
    currentPage:1,
    totalPages:null,
    status:LOADING
  });

  const { userToken } = useContext(AuthContext);
  // put that in the header

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
          notifications:[...state.notifications,...moreNotis],
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
        setState({
          ...state,
          notifications:refreshedNotis,
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

  useEffect(()=>{
    console.log("refreshed")
    onRefresh()
  },[])

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

  // useEffect(()=>{
  //   // axios.get(`/notifications/${userId}`)
  //   const initialNotifications = mockData.notifications;
  //   Promise.resolve({data:{
  //     notifications:initialNotifications,
  //     totalPages:1
  //   }})
  //   .then(res=>{
  //     result = res.data;
  //     console.log(res.data)
  //   })
  //   .catch(err=>{
  //     error = err
  //   })
  // },[]);