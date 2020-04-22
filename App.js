import React,{useState, useEffect, useMemo} from 'react';
import { AppLoading } from 'expo'
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import { AuthContext } from './context'

import TabNavigator from './routes/tabNavigator'
import { globalStyles } from './styles/global';
import { AppRegistry } from 'react-native';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';

export default function App() {

  // const tempUser = {
  //   id:1,
  //   username: "Jay",
  //   email:"sjs5953@hotmail.com"
  // }

  const [isLoading, setIsLoading] = useState(true);
  const [userToken, setUserToken] = useState("Jay")
  
  let authContext = useMemo(()=>{
    return {
      signIn: (token) => {
        console.log("========Attempting Login========", token);

        setUserToken(token);
      },
      signOut: () => {
        setUserToken(null);
        console.log("Signed Out");
      },
      userToken
    }
  },[])


  useEffect(()=>{
    setTimeout(() => {
      setIsLoading(false)
    }, 1000);
  },[])

  if(isLoading) {

    return (
      <View style={styles.container}>
        <ActivityIndicator animating size={"large"}/>
      </View>
    )
  }

  const theme = {
    ...DefaultTheme,
    roundness: 2,
    colors: {
      ...DefaultTheme.colors,
      primary: '#3498db',
      accent: '#f1c40f',
    },
  };
  
  return (
    <AuthContext.Provider value={authContext}>
      <PaperProvider theme={theme}>
        <TabNavigator userToken={userToken} setUserToken={setUserToken} />
      </PaperProvider>
    </AuthContext.Provider>
  );
}

AppRegistry.registerComponent('app', () => App);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
