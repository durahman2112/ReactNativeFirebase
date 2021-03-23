import React from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';

const InputData = ({
  label,
  placeholder,
  keyboardType,
  isTextArea,
  onChangeText,
  namaState,
  value,
}) => {
  if (isTextArea) {
    return (
      <>
        <Text style={styles.label}> {label} </Text>
        <TextInput
          placeholder={placeholder}
          style={styles.textinputarea}
          keyboardType={keyboardType}
          multiline={true}
          value={value}
          onChangeText={text => onChangeText(namaState, text)}
          numberOfLines={4}></TextInput>
      </>
    );
  }

  return (
    <>
      <Text style={styles.label}> {label} </Text>
      <TextInput
        placeholder={placeholder}
        style={styles.textinput}
        keyboardType={keyboardType}
        value={value}
        onChangeText={text => onChangeText(namaState, text)}></TextInput>
    </>
  );
};

export default InputData;

const styles = StyleSheet.create({
  label: {
    fontSize: 16,
    marginVertical: 10,
  },
  textinput: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    padding: 10,
  },
  textinputarea: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    padding: 10,
    textAlignVertical: 'top',
  },
});
