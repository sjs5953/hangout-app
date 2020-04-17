import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  StyleSheet,
  Platform,
  ScrollView
} from "react-native";
import { Button } from "react-native-paper";
import { globalStyles } from "../../styles/global";
import { Formik } from "formik";
import { FlatButton } from "../../shared/Button";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import convertDate from '../../helpers/convertDate'
import ItemModal from './components/ItemModal'
import TextField from './components/TextInput'
import Axios from "axios";
const minModal = 'minimum-participants';
const cateModal = 'category';
const dateModal = 'date';

const isIos = Platform.OS === 'ios'

let minimumParticipants;
let category;

export default ({ submitForm, categories, nums, reviewSchema }) => {

  const [visibility, setVisability] = useState("");
  const [selectedDate, setSelectedDate] = useState("Select Time");

  const showModal = (a) => {
    setVisability(a);
  }

  const hideModal = () => {
    setVisability("")
  }

  const handleConfirm = (setFieldValue, date) => {
    const dateToStore = date;
    const dateToDisplay = convertDate(date);
    hideModal(dateModal);
    setFieldValue("startTime", dateToStore);
    setSelectedDate(dateToDisplay);
  };
  const resetDate = () => {
    setSelectedDate("Select Time");
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>

      <ScrollView style={globalStyles.container}>

        <Formik
          initialValues={{
            name: "",
            minimumParticipants: "",
            location: {
              lat: 333,
              lng: 444
            },
            description:"",
            address: "My house",
            startTime: "",
            category: ""
          }}
          validationSchema={reviewSchema}
          onSubmit={(values, actions) => {
            // console.log("values: ", values)
            resetDate();
            submitForm(values, actions);
          }}
        >
          {props => {
            return (
              //Event name
              <View>

                <TextField 
                  formikProps={props}
                  placeholder='Event Name'
                  field="name"
                />
                <Text style={globalStyles.errorText}>
                  {props.touched.name && props.errors.name}
                </Text>

                <TextField 
                  formikProps={props}
                  placeholder='What is this about?'
                  field="description"
                  multiline={true}
                />
                <Text style={globalStyles.errorText}>
                  {props.touched.description && props.errors.description}
                </Text>

                 {/* Minimum People */}
                 <ItemModal 
                 formikPropValue={props.values.minimumParticipants}
                 visibility={visibility}
                 showModal={showModal}
                 hideModal={hideModal}
                 modalValue={minModal}
                 constant={minimumParticipants}
                 setValue={props.setFieldValue}
                 field={'minimumParticipants'}
                 title='Minimun Participants'
                 data={nums}
               />

               <Text style={globalStyles.errorText}>
                 {props.touched.minimumParticipants &&
                   props.errors.minimumParticipants}
               </Text>

               {/* Category */}

               <ItemModal 
                 formikPropValue={props.values.category}
                 visibility={visibility}
                 showModal={showModal}
                 hideModal={hideModal}
                 modalValue={cateModal}
                 constant={category}
                 setValue={props.setFieldValue}
                 field={'category'}
                 title='Category'
                 data={categories}
               />

               <Text style={globalStyles.errorText}>
                 {props.touched.category && props.errors.category}
               </Text>
  
                {/* DATE */}
                <View style={{ ...globalStyles.input, padding: 4 }}>
                  <Button onPress={()=>showModal(dateModal)}>{selectedDate}</Button>
                  <DateTimePickerModal
                    isVisible={visibility==dateModal}
                    mode="datetime"
                    onConfirm={date => {
                      console.log("confirmed")
                      handleConfirm(props.setFieldValue, date);
                    }}
                    onCancel={()=>hideModal()}
                  />
                </View>

                <Text style={globalStyles.errorText}>
                  {props.touched.startTime && props.errors.startTime}
                </Text>


                <View style={styles.submitButton}>
                  <FlatButton text="submit" onPress={props.handleSubmit} />
                </View>
              </View>
            );
          }}
        </Formik>
      </ScrollView>
    </TouchableWithoutFeedback>
  );
};
const styles = StyleSheet.create({
  container: {
    // flex: 1,
    alignItems: "center"
  },
  wheelPicker: {
    width: 200,
    height: 150
  },
  submitButton: {
    marginTop: 40
  }
});

                {/* <TextInput
                number
                style={globalStyles.input}
                placeholder="Minimum Participants"
                onChangeText={props.handleChange("minimumParticipants")}
                value={props.values.minimumParticipants}
                keyboardType='numeric'
                onBlur={props.handleBlur("minimumParticipants")}
              /> */}
