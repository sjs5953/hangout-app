import React, { useState } from "react";
import {
  View,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
  StyleSheet,
} from "react-native";
import { Button } from "react-native-paper";
import { globalStyles } from "../../styles/global";
import { Formik } from "formik";
import { FlatButton } from "../../shared/Button";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import convertDate from '../../helpers/convertDate'
import TextField from './components/TextInput'

const dateModal = 'date';


export default ({ submitForm, reviewSchema }) => {

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
      <View style={globalStyles.container}>
        <Formik
          initialValues={{
            name: "",
            minimumParticipants: "",
            location: {
              lat: 333,
              lng: 444
            },
            address: "My house",
            startTime: "",
            category: ""
          }}
          validationSchema={reviewSchema}
          onSubmit={(values, actions) => {
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
                  placeholder='Minimum Participants'
                  keyboardType='numeric'
                  field="minimumParticipants"
                />
                <Text style={globalStyles.errorText}>
                 {props.touched.minimumParticipants &&
                   props.errors.minimumParticipants}
               </Text>

                <TextField
                  formikProps={props}
                  placeholder='Category'
                  field="category"
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
      </View>
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