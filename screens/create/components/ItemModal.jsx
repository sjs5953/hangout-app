import React from "react";
import {View, Text,  TouchableWithoutFeedback,} from "react-native";
import { Button } from "react-native-paper";
import { globalStyles } from "../../../styles/global";
import { Picker} from "react-native-wheel-pick";
import Modal from "react-native-modal";



export default ({
  formikPropValue,
  visibility,
  showModal,
  hideModal,
  modalValue,
  constant,
  setValue,
  field,
  title,
  data
}) => {

  return (
    <View style={{ ...globalStyles.input, padding: 4 }}>
      <Button onPress={()=>{
        constant=modalValue;
        showModal(modalValue)
      }}>
        {title}
        {formikPropValue? `: ${formikPropValue}`: "" }
      </Button>
      <Modal isVisible={visibility==modalValue}>
        <TouchableWithoutFeedback 
        // onPress={hideModal}
        >
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              height: "100%"
            }}
          >
            <Picker
              style={{
                borderRadius: 5,
                backgroundColor: "white",
                width: 300,
                height: 215
              }}
              selectedValue={formikPropValue}
              pickerData={data}
              onValueChange={value => constant=value}
              itemSpace={30} // this only support in android
            />
            <View style={{ flexDirection: "row",width: 300,marginTop: 10}} >
              <Button mode="contained" color="maroon" style={{ flex: 1, padding:8 ,margin:8 }}  onPress={hideModal} >
                Cancel
              </Button>

              <Button mode="contained" style={{ flex: 1,padding:8,margin:8}}  onPress={() => {
                  hideModal();
                  setValue(field, constant);
                }}>
                  <Text style={{height:'100%'}}>
                    Confirm
                  </Text>
              </Button>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  )

}