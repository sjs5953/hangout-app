import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,

} from "react-native";
import { globalStyles } from "../../styles/global";
import { Formik } from "formik";
import { FlatButton } from "../../shared/Button";

export default ({submitForm, reviewSchema}) => {
  return(
  <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    <View style={globalStyles.container}>
      <Formik
        initialValues={{
          name: "",
          minimumParticipants: "",
          // "location": {
          //   "lat": null,
          //   "lng": null
          // },
          // "address": "",
          // "startTime": "",
          // "category": ""
        }}
        validationSchema={reviewSchema}
        onSubmit={(values, actions) => {
          submitForm(values, actions)
        }}
      >
        {(props) => {
          return (
            <View>
              <TextInput
                style={globalStyles.input}
                placeholder="Event Name"
                onChangeText={props.handleChange("name")}
                value={props.values.name}
                onBlur={props.handleBlur("name")}
              />
              <Text style={globalStyles.errorText}>
                {" "}
                {props.touched.name && props.errors.name}
              </Text>

              <TextInput
                style={globalStyles.input}
                placeholder="Minimum Participants"
                onChangeText={props.handleChange("minimumParticipants")}
                value={props.values.minimumParticipants}
                onBlur={props.handleBlur("minimumParticipants")}
              />
              <Text style={globalStyles.errorText}>
                {props.touched.minimumParticipants &&
                  props.errors.minimumParticipants}
              </Text>

              {/* 
                  location && address => autocomplete
                  starttime, voteendtime => npm date picker
                  category => dropdown, autocomplete, optional
                */}

              <FlatButton text="submit" onPress={props.handleSubmit} />
            </View>
          );
        }}
      </Formik>
    </View>
  </TouchableWithoutFeedback>
  )
};
