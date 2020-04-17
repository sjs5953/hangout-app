import React from 'react'
import { StyleSheet, Text, View, TextInput } from 'react-native'

import {globalStyles} from '../../../styles/global'
import debounce from'lodash.debounce';
import { styles } from '../styles'
import { Button } from 'react-native-paper';
import { Formik } from "formik";
import * as yup from "yup";

const SearchEvents = ({searchEvents}) => {
  const reviewSchema = yup.object({
    eventName: yup
      .string()
      .required()
      .min(3)
  });
  return (
    <View>
       <Formik
          initialValues={{
            eventName:""
          }}
          validationSchema={reviewSchema}
          onSubmit={(values,actions) => {
            searchEvents(values.eventName);
            actions.resetForm();
          }}
        >
          {props => {
            return (
              <View style={{flexDirection:'row', justifyContent:"space-between", alignItems:'center'}}>
                <TextInput 
                  style={{...globalStyles.input, marginHorizontal:10, marginVertical:20,flex:1}}
                  placeholder={'search events'}
                  onChangeText={props.handleChange('eventName')}
                  value={props.values.eventName}
                // onBlur={}
                />
                <Button onPress={props.handleSubmit}>
                  GO
                </Button>
              </View>
          )}}
        </Formik>
    </View>
  )
}

export default SearchEvents