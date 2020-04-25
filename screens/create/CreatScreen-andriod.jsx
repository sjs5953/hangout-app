import React, { useState } from "react";
import {
  View,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
  StyleSheet,
  Picker,
  ScrollView,
  Modal
} from "react-native";
import { Button } from "react-native-paper";
import { globalStyles } from "../../styles/global";
import { Formik } from "formik";
import { FlatButton } from "../../shared/Button";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import convertDate from '../../helpers/convertDate'
import TextField from './components/TextInput'
import GooglePlacesInput from './components/GooglePlacesInput'

const dateModal = 'date';


export default ({ submitForm, reviewSchema, categories, nums, userLocation }) => {

  const [visibility, setVisability] = useState("");
  const [selectedDate, setSelectedDate] = useState("Select Time");
  const [chooseCategory, setChooseCategory] = useState(false);
  const [locModal, setLocModal] = useState(false);

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

          <ScrollView  
           keyboardShouldPersistTaps='always'
           listViewDisplayed={false}
           >
            <Formik
              style={{flex:1}}
              initialValues={{
                name: "",
                minimumParticipants: "",
                location:"",
                description:"",
                address: "",
                startTime: "",
                category: ""
              }}
              validationSchema={reviewSchema}
              onSubmit={(values, actions) => {
                console.log("Attempint to submit....")
                console.log(values)
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
      
                    <View style={{...globalStyles.input,padding:4}}>
                    {!chooseCategory? 
                        <Button onPress={()=>setTimeout(() => {
                          setChooseCategory(true)
                        }, 100)}>
                        Choose Category
                        </Button>
                      : 
                      <Picker
                        selectedValue={props.values.category}
                        style={{ 
                          flex: 1,
                          alignItems: "center",
                          height:37,
                          marginLeft:150
                        }}
                        mode='dialog'
                        prompt='Choose Category'
                        onValueChange={(itemValue, itemIndex) => (
                          props.setFieldValue('category', itemValue)
                          )}
                      >
                        {categories.map((category,index) => {
                          return <Picker.Item key={index} label={category} value={category}/>
                        })}
                      </Picker>  
                      }
                    
                    </View>

                    <Text style={globalStyles.errorText}>
                      {props.touched.category && props.errors.category}
                    </Text>

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

                   <View style={{ ...globalStyles.input, padding: 4 }}>
                   
                    <Button onPress={()=>setLocModal(!locModal)}>
                      {props.values.address?  props.values.address: 'select location'}
                    </Button>
                    
                    <Modal visible={locModal}>
                      <GooglePlacesInput userLocation={userLocation} setLocModal={setLocModal} setFieldValue={props.setFieldValue}/>
                    </Modal>
                   </View>
                   
                    <View style={styles.submitButton}>
                      <FlatButton text="submit" onPress={props.handleSubmit} />
                    </View>
                  </View>
                );
              }}
            </Formik>
          </ScrollView>
      </View>
    </TouchableWithoutFeedback>
  );
};
const styles = StyleSheet.create({
  container: {
    // flex: 1,
    alignItems: "center",
  },
  wheelPicker: {
    width: 200,
    height: 150
  },
  submitButton: {
    margin: 30,
    marginTop:30
  },
  address:{
    padding:7,
    color: '#1faadb',
    textAlign:'center',
    textTransform:'uppercase',
    fontWeight:'bold'
  }
});