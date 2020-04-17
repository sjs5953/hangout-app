import React, { useState } from "react";
import { TextInput } from "react-native"
import { globalStyles } from "../../../styles/global";

export default ({
  formikProps,
  placeholder,
  keyboardType,
  field,
  multiline=false
}) => {

  if (multiline) {
    return(
      <TextInput
      multiline height={120}
      keyboardType={keyboardType || 'default'}
      style={globalStyles.input}
      placeholder={placeholder}
      onChangeText={formikProps.handleChange(field)}
      value={formikProps.values[field]}
      onBlur={formikProps.handleBlur(field)}
      />
    )
  }
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
