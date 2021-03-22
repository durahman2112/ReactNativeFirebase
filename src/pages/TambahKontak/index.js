import React, {Component} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {InputData} from '../../components/';

export default class TambahKontak extends Component {
  render() {
    return (
      <View style={styles.pages}>
        <InputData label="Nama" placeholder="Masukkan Nama" />
        <InputData
          label="No. HP"
          placeholder="Masukkan Nomor HP"
          keyboardType="number-pad"
        />
        <InputData
          label="Alamat"
          placeholder="Masukkan alamat"
          isTextArea={true}
        />

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>SUBMIT</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  pages: {
    flex: 1,
    padding: 16,
  },
  button: {
    backgroundColor: '#ff6600',
    padding: 15,
    borderRadius: 5,
    marginTop: 20,
    marginBottom: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 16,
  },
});
