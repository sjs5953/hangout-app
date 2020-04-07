import React,{useState} from "react";
import { StyleSheet, Button, View, Text, TextInput, TouchableWithoutFeedback, Keyboard, Alert, ActivityIndicator} from "react-native";
// import { globalStyles } from "../styles/global";
import {globalStyles} from '../../styles/global'
import { Formik } from "formik";
import * as yup from "yup";
import {FlatButton} from '../../shared/Button'
import axios from 'axios';
import CreateScreen from './view'
import {styles} from './styles'

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

  const [isLoading, setIsLoading] = useState(false);

  if(isLoading) {
    return (<View style={styles.loadingContainer}><ActivityIndicator animating size={'large'}/></View>)
  }

  return <CreateScreen navigation={navigation} reviewSchema={reviewSchema}/>
}

