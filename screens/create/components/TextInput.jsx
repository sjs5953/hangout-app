import React, { useState } from "react";
import {
  TextInput,
} from "react-native"
import { globalStyles } from "../../../styles/global";


export default ({
  formikProps,
  placeholder,
  keyboardType,
  field
}) => {

  return(
    <TextInput
    keyboardType={keyboardType || 'default'}
    style={globalStyles.input}
    placeholder={placeholder}
    onChangeText={formikProps.handleChange(field)}
    value={formikProps.values[field]}
    onBlur={formikProps.handleBlur(field)}
    />
  )
}
