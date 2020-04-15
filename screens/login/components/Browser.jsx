import React from 'react';
import {View,Text,Dimensions} from 'react-native';
import { WebView } from 'react-native-webview';

export default function Browser ({route}) {
  console.log(route.params)
  return(
    <View style={{ height:Dimensions.get('screen').height, width:Dimensions.get('screen').width,
  }}>
      <WebView style={{
        position:'absolute',
        // backgroundColor:'grey',
        top:10,
        left:0,
        bottom:20,
        height:"100%",
        width:"100%"
      }} source={{ uri:route.params.url}} />
    </View>
  )
}