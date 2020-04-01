import React,{useState, useEffect, useMemo} from 'react';
import { AppLoading } from 'expo'
import { StyleSheet, Text, View } from 'react-native';
import { AuthContext } from './context'

import TabNavigator from './routes/tabNavigator'
import { globalStyles } from './styles/global';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [userToken, setUserToken] = useState('')
  
  const authContext = useMemo(()=>{
    return {
      signIn: () => {
        setIsLoading(false);
        setUserToken('Jay');
        console.log("Signed In");
      },
      signUp: () => {
        setIsLoading(false);
        setUserToken('Jay');
        console.log("Signed Up");
      },
      signOut: () => {
        setIsLoading(false);
        setUserToken(null);
        console.log("Signed Out");
      }
    }
  },[])

  useEffect(()=>{
    setTimeout(() => {
      setIsLoading(false)
    }, 1000);
  },[])

  if(isLoading) {
    console.log('imhere')
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    )
  }

  return (
    <AuthContext.Provider value={authContext}>
      <TabNavigator userToken={userToken} setUserToken={setUserToken} />
    </AuthContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});