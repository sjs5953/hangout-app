import React from "react";
import { StyleSheet, Button, View, Text, TextInput, TouchableWithoutFeedback, Keyboard, Alert} from "react-native";
// import { globalStyles } from "../styles/global";
import {globalStyles} from '../../styles/global'
import { Formik } from "formik";
import * as yup from "yup";
import {FlatButton} from '../../shared/Button'
import axios from 'axios';

const Create = ({navigation}) => {
  const reviewSchema = yup.object({
    name: yup.string()
      .required()
      .min(4),
    // body: yup.string()
    //   .required()
    //   .min(8),
    minimumParticipants: yup.string()
      .required()
      .test('is-num-bigger-than-one','Minimum Participants must be positive number',(value)=> parseInt(value) > 0
      )
  })


  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={globalStyles.container}>
        <Formik
          initialValues={
            {
              "name": "",
              "minimumParticipants": "",
              // "location": {
              //   "lat": null,
              //   "lng": null
              // },
              // "address": "",
              // "startTime": "",
              // "category": ""
            }
          }
          validationSchema={reviewSchema}
          onSubmit={(values,actions)=>{
            // axios.post("/events")
            Promise.resolve({data:1})
              .then((res)=>{
                const eventKey = res.data;
                Alert.alert('Success!','Event has been sucessfully deleted.', [
                  {text:'go to my post', onPress: ()=>  {
                   navigation.navigate('EventsStack', {
                    screen:'Event',
                    params: {eventKey}
                    });
                    actions.resetForm();
                    }
                  },
                    
                  {text:'finish', onPress: ()=>{
                    navigation.goBack();
                    actions.resetForm();
                  }}
                  ])
              })
              .catch(err=>{
                 Alert.alert('Oops!',`Failed to post event! Please try again!`, [
                  {text:'understood', onPress: ()=> console.log('post request faild!', err)}
                  ])
              }) 
           
           
            return;
          }}
        >
          {props=>{
            return (
              <View>
                
                <TextInput
                  style={globalStyles.input}
                  placeholder="Event Name"
                  onChangeText={props.handleChange("name")}
                  value={props.values.name}
                  onBlur={props.handleBlur('name')}
                />
                <Text style={globalStyles.errorText}> {props.touched.name && props.errors.name}</Text>

                <TextInput
                  style={globalStyles.input}
                  placeholder="Minimum Participants"
                  onChangeText={props.handleChange("minimumParticipants")}
                  value={props.values.minimumParticipants}
                  onBlur={props.handleBlur('minimumParticipants')}
                />
                <Text style={globalStyles.errorText}>{props.touched.minimumParticipants && props.errors.minimumParticipants}</Text>

                {/* 
                  location && address => autocomplete
                  starttime, voteendtime => npm date picker
                  category => dropdown, autocomplete, optional
                */}

                <FlatButton text='submit' onPress={props.handleSubmit}/>
              </View>
            )
          }}
        </Formik>
      </View>
    </TouchableWithoutFeedback>
  )
}

export default Create

const styles = StyleSheet.create({})

