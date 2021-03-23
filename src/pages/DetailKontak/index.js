import React, {Component} from 'react';
import {Text, StyleSheet, View} from 'react-native';
import FIREBASE from '../../config/FIREBASE';

export default class DetailKontak extends Component {
  constructor(props) {
    super(props);

    this.state = {
      kontak: {},
    };
  }

  componentDidMount() {
    FIREBASE.database()
      .ref('kontak/' + this.props.route.params.id)
      .once('value', querySnapshot => {
        let data = querySnapshot.val() ? querySnapshot.val() : {};
        let kontakItem = {...data};
        this.setState({
          kontak: kontakItem,
        });
      });
  }

  render() {
    const {kontak} = this.state;
    return (
      <View style={styles.pages}>
        <Text>Nama : </Text>
        <Text style={styles.text}> {kontak.nama}</Text>
        <Text>No Hp : </Text>
        <Text style={styles.text}> {kontak.nomorHp}</Text>
        <Text>Alamat : </Text>
        <Text style={styles.text}> {kontak.alamat}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  pages: {
    padding: 16,
    margin: 16,
    backgroundColor: 'white',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 5.84,

    elevation: 5,
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});
