import React, { useState,useContext, useEffect } from 'react'
import { Text, View, Button } from 'react-native'
import {globalStyles} from '../../styles/global'
import { AuthContext } from '../../context'
import UserScreen from './UserScreen'
import axios from 'axios';
import {ERROR, REFRESHING, LOADING, LOADINGMORE} from '../../shared/status'


const User = ({navigation,route}) => {
  const { userToken,signOut } = useContext(AuthContext);
  // const context = useContext(AuthContext)
  console.log(" Current user token: ", userToken)

  const [ userInfo, setUserInfo ] = useState({});
  const [ state, setState ] = useState({
    events:[],
    currentPage:1,
    totalPages:null,
    status:LOADING
  });

  console.log("userToken: ", userToken)

  const getOptions = (page) => {
    return (
      {
        method: 'GET',
        timeout:4000,
        url: `https://meetnow.herokuapp.com/events/me?limit=5&page=${page}`,
        headers: {
            'Authorization': `Bearer ${userToken}`,
            'Content-Type': 'application/x-www-form-urlencoded'
        }
      }
    )
  }

  useEffect(()=>{
  
    const optionsForUserInfo ={
      method: 'GET',
      url: 'https://meetnow.herokuapp.com/me',
      headers: {
          'Authorization': `Bearer ${userToken}`,
          'Content-Type': 'application/x-www-form-urlencoded'
      },
    }
    axios(optionsForUserInfo)
      .then(res=> {
        const userInfoFromBack = res.data;
        console.log("userInfo from back: ", userInfoFromBack)
        setUserInfo(userInfoFromBack)
      })
      .catch(err=>console.log("ERROR from getting USERINFO : ",err.message))
   
    const optionsForUserPosts = getOptions(1)
    console.log("optionsForUserPosts: ", optionsForUserPosts.url)
    axios(optionsForUserPosts)
      .then(res=>{
        const result = res.data;
        let newEvents = result.events;
        setState({
            ...state,
            events:newEvents,
            currentPage:1,
            totalPages:result.totalPages,
            status:""
          });
      })
      .catch(err=>console.log("ERROR from getting User Posts ",err.message))
  },[])

 

  const loadMore = () => {
    if (state.currentPage == state.totalPages) return;
   
    setState({...state, status:LOADINGMORE})

    const options = getOptions(state.currentPage+1)
    console.log("loaded more: ", options.url)
    axios(options)
      .then(res=>{
        const result = res.data;
        const moreEvents = result.events;
        setState({
          ...state,
          events:[...state.events,...moreEvents],
          currentPage: state.currentPage+1,
          totalPages: result.totalPages,
          status:""
        });
      })
      .catch(err=>{
        setState({...state, status:ERROR})
        console.log(err)
      })
  }

  const onRefresh = async (loading) => {
    const loadingStatus = loading || REFRESHING
    setState({...state, status:loadingStatus})
    
    const options = getOptions(1)

    console.log("fetching data...", options.url)
    if (true) {
      try {
        let res = await axios(options)
        const result = res.data;
        let newEvents = result.events;
        console.log("successfully fetched! ",newEvents.length)
        setState({
            ...state,
            events:newEvents,
            currentPage:1,
            totalPages:result.totalPages,
            status:""
          });
      } catch (error) {
        setState({...state, status:ERROR})
        console.error(error);
      }
    }
    else{
      // ToastAndroid.show('No more new data available', ToastAndroid.SHORT);
      setRefreshing(false)
    }
  }
  
  // useEffect(()=>{
  //   console.log("refreshed")
  //   onRefresh(LOADING)
  // },[route.params])


  return (
   <UserScreen 
    userInfo={userInfo}
    navigation={navigation} 
    onRefresh={onRefresh} 
    loadMore={loadMore} 
    status={state.status}
    events={state.events}
    signOut={signOut}
   />
  )
}
export default User