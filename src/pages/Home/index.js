import {faPlus} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import React, {Component} from 'react';
import {Text, StyleSheet, View, TouchableOpacity, Alert} from 'react-native';
import {CardKontak} from '../../components';

import FIREBASE from '../../config/FIREBASE';

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      kontaks: {},
      kontakKey: [],
    };
  }

  componentDidMount() {
    this.getData();
  }

  getData = () => {
    FIREBASE.database()
      .ref('kontak')
      .once('value', querySnapshot => {
        let data = querySnapshot.val() ? querySnapshot.val() : {};
        let kontakItem = {...data};
        this.setState({
          kontaks: kontakItem,
          kontakKey: Object.keys(kontakItem),
        });
      });
  };

  removeData = id => {
    Alert.alert('Hapus Pesan', 'Apakah Yakin Menghapus Kontak?', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {
        text: 'OK',
        onPress: () => {
          FIREBASE.database()
            .ref('kontak/' + id)
            .remove();
          this.getData();
          Alert.alert('Berhasil!', 'Berhasil menghapus data');
        },
      },
    ]);
  };

  render() {
    const {kontaks, kontakKey} = this.state;
    return (
      <View style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.title}>Daftar Kontak</Text>
        </View>
        <View style={styles.listKontak}>
          {kontakKey.length > 0 ? (
            kontakKey.map(key => (
              <CardKontak
                key={key}
                kontakItem={kontaks[key]}
                id={key}
                {...this.props}
                removeData={this.removeData}
              />
            ))
          ) : (
            <Text>Daftar Kosong</Text>
          )}
        </View>

        {/* Floating Button */}
        <View style={styles.wrapperButton}>
          <TouchableOpacity
            style={styles.floatingButton}
            onPress={() => this.props.navigation.navigate('TambahKontak')}>
            <FontAwesomeIcon icon={faPlus} size={20} color={'white'} />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    padding: 16,
  },
  wrapperButton: {
    flex: 1,
    position: 'absolute',
    bottom: 0,
    right: 0,
    margin: 30,
  },
  floatingButton: {
    padding: 20,
    backgroundColor: 'skyblue',
    borderRadius: 30,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  header: {
    paddingVertical: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  listKontak: {
    marginTop: 20,
  },
});
