import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Modal,
  TextInput,
  Alert,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import React, {Component} from 'react';
import {globalStyles} from './globalStyles';
import {format} from 'date-fns';

export default class EliminarCita extends Component {
  constructor(props) {
    super(props);
    this.state = {
      response: this.props.route.params.response,
      id: this.props.route.params.response.id,
    };
  }

  render() {
    const eliminarCita = () => {
      var xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
          // Typical action to be performed when the document is ready:
          console.log(xhttp.responseText);

          if (xhttp.responseText === '1') {
            Alert.alert('Cita eliminada');
          } else {
            Alert.alert('Error');
          }
          _this.props.navigation.goBack();
        }
      };
      xhttp.open(
        'GET',
        'https://puertascucei.000webhostapp.com/eliminarCita.php?id=' + this.state.id, true,
      );
      //xhttp.open("GET", "https://xerophilous-loudspe.000webhostapp.com/datos2.php", true);
      xhttp.send();
    };
    return (
      <View style={globalStyles.contenedorPrincipal}>
        <View style={[globalStyles.header, globalStyles.centrar]}>
          <View
            style={[
              globalStyles.formaContenedorTituloRegistro,
              globalStyles.tamanioContenedor,
            ]}>
            <Text style={globalStyles.textoTitulos}>ELIMINAR</Text>
          </View>
        </View>

        <View style={globalStyles.centrar}>
          <View style={[styles.textoContainer, styles.abajo]}>
            <Text style={styles.txtFila}>Fecha: </Text>
            {/* <Text style={styles.txtDatosBD}>{'00/00/0000'} </Text> */}
            <Text style={styles.txtDatosBD}>{this.state.response.diaEntrada} </Text>
          </View>

          <View style={styles.textoContainer}>
            <Text style={styles.txtFila}>Hora: </Text>
            {/* <Text style={styles.txtDatosBD}>{'00:00'}</Text> */}
            <Text style={styles.txtDatosBD}>
              {this.state.response.horaEntrada}{' '}
            </Text>
          </View>

          <View style={styles.textoContainer}>
            <Text style={styles.txtFila}>Destino: </Text>
            {/* <Text style={styles.txtDatosBD}>{'Con diosito'}</Text> */}
            <Text style={styles.txtDatosBD}>
              {this.state.response.moduloDirigido}{' '}
            </Text>
          </View>

          <TouchableOpacity onPress={eliminarCita}>
            <View
              style={[globalStyles.boton, globalStyles.centrar, styles.abajo]}>
              <Text style={globalStyles.txtBoton}>Eliminar Cita</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  textoContainer: {
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  abajo: {
    marginTop: 50,
  },
  txtFila: {
    fontSize: 28,
    color: 'white',
    fontWeight: 'bold',
  },
  txtDatosBD: {
    fontSize: 24,
    color: 'orange',
    fontWeight: 'bold',
  },
});
