import React,{useState} from 'react';
import { Image, Text,View, SafeAreaView, StyleSheet,Dimensions } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { Button } from "react-native-paper";
import { API_KEY } from '../../../api_key'
import { globalStyles } from "../../../styles/global";

// const workPlace = { description: 'Work', geometry: { location: { lat: 48.8496818, lng: 2.2940881 } }};

export default function GooglePlacesInput ({userLocation, setLocModal, setFieldValue}){
  const currentLocation = { description: 'Current Location', geometry: { location: { lat: userLocation.latitude, lng: userLocation.longitude } }};
  const [ selectedLoc, setSelectedLoc ] = useState(null);
  
  return (
    <SafeAreaView style={{...globalStyles.container}}>
      <View style={styles.header}>
        <Button style={styles.cancel} onPress={()=>{
          setLocModal(false);
        }}>
          Cancel
        </Button>
        <Text style={styles.title}> Event Location </Text>
      </View>
      
      <GooglePlacesAutocomplete
        placeholder='Search'
        minLength={1} // minimum length of text to search
        autoFocus={false}
        returnKeyType={'search'} // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
        keyboardAppearance={'light'} // Can be left out for default keyboardAppearance https://facebook.github.io/react-native/docs/textinput.html#keyboardappearance
        listViewDisplayed='auto'    // true/false/undefined
        fetchDetails={true}
        renderDescription={row => row.description} // custom description render
        onPress={(data, details = null) => { // 'details' is provided when fetchDetails = true
          // console.log("=====data====",data);
          console.log ("=====details====",details);
          setSelectedLoc(details.formatted_address)
        }}
  
        getDefaultValue={() => ''}
  
        query={{
          // available options: https://developers.google.com/places/web-service/autocomplete
          key: API_KEY,
          language: 'en', // language of the results
          // types: '(addresses)' // default: 'geocode'
        }}
  
        styles={{
          textInputContainer: {
            width: '100%'
          },
          description: {
            fontWeight: 'bold'
          },
          predefinedPlacesDescription: {
            color: '#1faadb'
          }
        }}
  
        // currentLocation={true} // Will add a 'Current location' button at the top of the predefined places list
        // currentLocationLabel="Current location"
        nearbyPlacesAPI='GooglePlacesSearch' // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
        GoogleReverseGeocodingQuery={{
          // available options for GoogleReverseGeocoding API : https://developers.google.com/maps/documentation/geocoding/intro
        }}
        GooglePlacesSearchQuery={{
          // available options for GooglePlacesSearch API : https://developers.google.com/places/web-service/search
          rankby: 'distance',
          type: 'cafe'
        }}
        
        GooglePlacesDetailsQuery={{
          // available options for GooglePlacesDetails API : https://developers.google.com/places/web-service/details
          fields: 'formatted_address',
        }}
  
        filterReverseGeocodingByTypes={['locality', 'administrative_area_level_3']} // filter the reverse geocoding results by types - ['locality', 'administrative_area_level_3'] if you want to display only cities
        predefinedPlaces={[currentLocation]}
  
        debounce={200} // debounce the requests in ms. Set to 0 to remove debounce. By default 0ms.
        // renderLeftButton={()  => <View style={{marginTop:3}}><Button onPress={()=>{
        //   setLocModal(false)
        // }}>Cancel</Button></View>}
        renderRightButton={() => <View style={{marginTop:3}}><Button onPress={()=>{
          setFieldValue('address', selectedLoc)
          setLocModal(false)
        }}>Save</Button></View>}
      />
    </SafeAreaView>
  );
}

const styles= StyleSheet.create({
  header:{
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center',
    // width: Dimensions.get('screen').width,
    padding:0
  },
  cancel:{
    position:'absolute',
    left:0
  }
  ,
  title:{
    fontSize:20,
    fontWeight:'bold',
    textAlign:'center',
    padding:15
  }
})