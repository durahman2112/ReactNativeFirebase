import React, {Component} from 'react';
import {Alert, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {InputData} from '../../components/';
import FIREBASE from '../../config/FIREBASE';

export default class EditKontak extends Component {
  constructor(props) {
    super(props);

    this.state = {
      nama: '',
      nomorHp: '',
      alamat: '',
    };
  }

  componentDidMount() {
    FIREBASE.database()
      .ref('kontak/' + this.props.route.params.id)
      .once('value', querySnapshot => {
        let data = querySnapshot.val() ? querySnapshot.val() : {};
        let kontakItem = {...data};
        this.setState({
          nama: kontakItem.nama,
          nomorHp: kontakItem.nomorHp,
          alamat: kontakItem.alamat,
        });
      });
  }

  onChangeText = (namaState, value) => {
    this.setState({
      [namaState]: value,
    });
  };

  onSubmit = () => {
    if (this.state.nama && this.state.nomorHp && this.state.alamat) {
      const kontakReferensi = FIREBASE.database().ref(
        'kontak/' + this.props.route.params.id,
      );
      const kontak = {
        nama: this.state.nama,
        nomorHp: this.state.nomorHp,
        alamat: this.state.alamat,
      };

      kontakReferensi
        .update(kontak)
        .then(data => {
          Alert.alert('Success', 'Kontak Berhasil DiUpdate');
          this.props.navigation.replace('Home');
        })
        .catch(err => {
          console.log('Err', err);
        });
    } else {
      Alert.alert('Error', 'Seluruh Field Harus Diisi!');
    }
  };

  render() {
    const {nama, nomorHp, alamat} = this.state;
    return (
      <View style={styles.pages}>
        <InputData
          label="Nama"
          placeholder="Masukkan Nama"
          onChangeText={this.onChangeText}
          value={nama}
          namaState="nama"
        />
        <InputData
          label="No. HP"
          placeholder="Masukkan Nomor HP"
          keyboardType="number-pad"
          onChangeText={this.onChangeText}
          value={nomorHp}
          namaState="nomorHp"
        />
        <InputData
          label="Alamat"
          placeholder="Masukkan alamat"
          isTextArea={true}
          onChangeText={this.onChangeText}
          value={alamat}
          namaState="alamat"
        />

        <TouchableOpacity style={styles.button} onPress={() => this.onSubmit()}>
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
