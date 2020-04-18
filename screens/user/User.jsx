import React, { useState,useContext, useEffect } from 'react'
import { Text, View, Button } from 'react-native'
import {globalStyles} from '../../styles/global'
import { AuthContext } from '../../context'
import UserScreen from './UserScreen'
import axios from 'axios';
import {ERROR, REFRESHING, LOADING, LOADINGMORE} from '../../shared/status'


const User = ({navigation,route}) => {
  const { user,signOut } = useContext(AuthContext);
  const [ userInfo, setUserInfo ] = useState({});
  const [state, setState] = useState({
    events:[],
    currentPage:1,
    totalPages:null,
    status:LOADING
  });

  const optionsForUserInfo ={
    method: 'GET',
    url: 'https://meetnow.herokuapp.com/me',
    headers: {
        'Authorization': `Bearer ${user.id}`,
        'Content-Type': 'application/x-www-form-urlencoded'
    },
  }
  const optionsForUserPosts ={
    method: 'GET',
    url: `https://meetnow.herokuapp.com/events/me?limit=5&page=1`,
    headers: {
        'Authorization': `Bearer ${user.id}`,
        'Content-Type': 'application/x-www-form-urlencoded'
    },
  }

  useEffect(()=>{
  
    axios(optionsForUserInfo)
      .then(res=> {
        const userInfoFromBack = res.data;
        // setstate
      })
      .catch(console.log)

    axios(optionsForUserPosts)
      .then(res=>{
        const userPostsFromBack = res.data
      })
      .catch(console.log)

  },[])

 

  const loadMore = () => {
    if (state.currentPage == state.totalPages) return;
    
    console.log("loaded more")
    setState({...state, status:LOADINGMORE})

    axios.get(`https://meetnow.herokuapp.com/events/me?limit=5&page=${state.currentPage+1}`)
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
    console.log("fetching data...")
    console.log('https://meetnow.herokuapp.com/events?limit=5&page=1')
    if (true) {
      try {
        let res = await axios.get('https://meetnow.herokuapp.com/events?limit=5&page=1')
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
  
  useEffect(()=>{
    console.log("refreshed")
    onRefresh(LOADING)
  },[route.params])


  return (
   <UserScreen user={user} signOut={signOut}/>
  )
}
export default User