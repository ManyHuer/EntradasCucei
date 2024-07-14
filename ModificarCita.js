import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Modal,
  TextInput,
  Alert,
  ScrollView,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import React, {Component} from 'react';
import {globalStyles} from './globalStyles';
import ModalSelector from 'react-native-modal-selector';
import {format} from 'date-fns';

export default class ModificarCita extends Component {
  constructor(props) {
    super(props);
    this.state = {
      opcionesPuerta: [
        {key: 0, label: 'Puerta 1 Revolución'},
        {key: 1, label: 'Puerta 2 Olimpica'},
        {key: 2, label: 'Puerta 3 Boulevard'},
      ],
      opcionesModulo: [],
      opcionesFecha: [],
      opcionesHora: [],
      nombre: this.props.route.params.response.nombre,
      marcaAuto: this.props.route.params.response.marcaAuto,
      placasAuto: this.props.route.params.response.placaAuto,
      color: this.props.route.params.response.color,
      horaEntrada: '',
      dia: '',
      puerta: '',
      moduloDirigido: '',

      nombreError: false,
      apellidoError: false,
      horaEntradaError: false,
      diaError: false,
      puertaError: false,
      moduloDirigidoError: false,

      puertaHabilitada: false,

      id: this.props.route.params.response.id,
      response: this.props.route.params.response,
    };
    let j = 0;
    for (let i = 65; i <= 90; i++) {
      this.state.opcionesModulo.push({
        key: i + j - 65,
        label: 'Modulo ' + String.fromCharCode(i),
      });
      if (String.fromCharCode(i) == 'V') {
        j++;
        this.state.opcionesModulo.push({key: i + j - 65, label: 'Modulo V2'});
      }
    }

    // Agregamos los valores adicionales
    this.state.opcionesModulo.push(
      {key: 27, label: 'Modulo Z2'},
      {key: 28, label: 'Modulo Alpha(DUCT1)'},
      {key: 29, label: 'Modulo Beta(DUCT2)'},
    );

    // Obtén la fecha actual
    const fechaActual = new Date();

    // Llena el arreglo opcionesModulo con fechas en formato DD/MM/YYYY
    for (let i = 0; i < 30; i++) {
      // Calcula la fecha sumando i días a la fecha actual
      const fecha = new Date(fechaActual);
      fecha.setDate(fecha.getDate() + i);

      // Formatea la fecha como DD/MM/YYYY
      const dia = String(fecha.getDate()).padStart(2, '0');
      const mes = String(fecha.getMonth() + 1).padStart(2, '0'); // Suma 1 al mes porque en JavaScript los meses van de 0 a 11
      const año = fecha.getFullYear();

      const fechaFormateada = `${dia}/${mes}/${año}`;
      const fechaFormateadaKey = `${año}/${mes}/${dia}`;

      this.state.opcionesFecha.push({
        key: fechaFormateadaKey,
        label: fechaFormateada,
      });
    }
  }
  handleFechaSeleccionada = opcion => {
    const dia = opcion.label;
    this.setState({dia: dia});
    this.setState({puertaHabilitada: true});
    this.llenarHoras(dia);
  };

  llenarHoras = fechaSeleccionada => {
    // Obtén la fecha actual
    this.setState({dia: fechaSeleccionada});
    this.state.opcionesHora = [];
    const fechaActual = new Date();
    const fechaActualFormateada = format(fechaActual, 'dd/MM/yyyy');

    // Determina si la fecha seleccionada es el día actual
    const esHoy = fechaActualFormateada === fechaSeleccionada;
    let minutoActual;
    if (esHoy) {
      // Si es hoy o mañana, muestra las horas desde la actual hasta las 9:00 PM
      const horaInicial = esHoy ? fechaActual.getHours() : 7;
      const minutoInicial = esHoy ? fechaActual.getMinutes() : 0;
      for (let hora = horaInicial; hora <= 21; hora++) {
        if (horaInicial == 21) {
          break;
        }
        if (hora === 21 && minutoActual >= 0) {
          this.state.opcionesHora.push({key: '21:00', label: '21:00'});
          break; // Romper el bucle cuando sean las 21:00 o posterior
        }
        for (
          let minutos =
            hora === horaInicial ? this.redondearMinutos(minutoInicial) : 0;
          minutos < 60;
          minutos += 5
        ) {
          const horaFormateada = format(
            new Date().setHours(hora, minutos),
            'HH:mm',
          );
          this.state.opcionesHora.push({
            key: horaFormateada,
            label: horaFormateada,
          });
          minutoActual = minutos;
        }
      }
    } else {
      // Si es un día futuro, muestra las horas desde las 7:00 AM hasta las 9:00 PM

      for (let hora = 7; hora <= 21; hora++) {
        if (hora === 21 && minutoActual >= 0) {
          this.state.opcionesHora.push({key: '21:00', label: '21:00'});
          break; // Romper el bucle cuando sean las 21:00 o posterior
        }
        for (let minutos = 0; minutos < 60; minutos += 5) {
          const horaFormateada = format(
            new Date().setHours(hora, minutos),
            'HH:mm',
          );
          this.state.opcionesHora.push({
            key: horaFormateada,
            label: horaFormateada,
          });
          minutoActual = minutos;
        }
      }
    }
  };
  redondearMinutos = minutos => {
    minutoRedondeado = 5 * Math.round(minutos / 5);
    if (minutoRedondeado < minutos) {
      minutoRedondeado += 5;
    }
    return minutoRedondeado;
  };

  render() {
    const {
      nombreError,
      apellidoError,
      diaError,
      horaEntradaError,
      puertaError,
      moduloDirigidoError,
    } = this.state;

    const modificarCita = () => {
      let nombre = this.state.nombre;
      let apellido = this.state.apellido;
      let dia = this.state.dia;
      let horaEntrada = this.state.horaEntrada;
      let puerta = this.state.puerta;
      let moduloDirigido = this.state.moduloDirigido;
      _this = this;
      // Validación de campos vacíos
      let nombreError = false;
      let apellidoError = false;
      let diaError = false;
      let horaEntradaError = false;
      let puertaError = false;
      let moduloDirigidoError = false;

      if (nombre === '') {
        nombreError = true;
      }
      if (apellido === '') {
        apellidoError = true;
      }
      if (dia === '') {
        diaError = true;
      }
      if (horaEntrada === '') {
        horaEntradaError = true;
      }
      if (puerta === '') {
        puertaError = true;
      }
      if (moduloDirigido === '') {
        moduloDirigidoError = true;
      }
      this.setState({
        nombreError,
        apellidoError,
        diaError,
        horaEntradaError,
        puertaError,
        moduloDirigidoError,
      });
      console.log(this.state.id);
      if (
        nombreError ||
        diaError ||
        horaEntradaError ||
        puertaError ||
        moduloDirigidoError ||
        apellidoError
      ) {
        Alert.alert('Todos los campos deben estar llenos');
      } else {
        //Codigo para enviar y recibir datos del server
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
          if (this.readyState == 4 && this.status == 200) {
            // Typical action to be performed when the document is ready:
            console.log(xhttp.responseText);
            if (xhttp.responseText === '1') {
              Alert.alert('Cita modificada');
            } else {
              Alert.alert('Error');
            }
            _this.props.navigation.goBack();
          }
        };
        xhttp.open(
          'GET',
          'https://puertascucei.000webhostapp.com/modificarCita.php?nombre=' +
            this.state.nombre +
            '&marcaAuto=' +
            this.state.marcaAuto +
            '&placasAuto=' +
            this.state.placasAuto +
            '&color=' +
            this.state.color +
            '&horaEntrada=' +
            this.state.horaEntrada +
            '&dia=' +
            this.state.dia +
            '&puerta=' +
            this.state.puerta +
            '&moduloDirigido=' +
            this.state.moduloDirigido +
            '&id=' +
            this.state.id,
          true,
        );
        //xhttp.open("GET", "https://xerophilous-loudspe.000webhostapp.com/datos2.php", true);
        xhttp.send();
      }
    };
    return (
      <View style={globalStyles.contenedorPrincipal}>
        <View style={[globalStyles.header, globalStyles.centrar]}>
          <View
            style={[
              globalStyles.formaContenedorTituloRegistro,
              globalStyles.tamanioContenedor,
            ]}>
            <Text style={globalStyles.textoTitulos}>MODIFICAR</Text>
          </View>
        </View>

        <ScrollView style={styles.scrollContainer}>
          <View style={globalStyles.centrar}>
            {/* Formulario Nombre */}
            <Text style={styles.tituloInputFormulario}>Nombre</Text>
            <TextInput
              defaultValue={this.props.route.params.response.nombre}
              style={[styles.input, nombreError && styles.errorInput]}
              onChangeText={nombre => this.setState({nombre})}></TextInput>
            {nombreError && (
              <Text style={styles.errorMessage}>Campo requerido</Text>
            )}
            
            {/* Formulario Apellido */}
            <Text style={styles.tituloInputFormulario}>Apellido</Text>
            <TextInput
              defaultValue={this.props.route.params.response.apellido}
              style={[styles.input, apellidoError && styles.errorInput]}
              onChangeText={apellido => this.setState({apellido})}></TextInput>
            {apellidoError && (
              <Text style={styles.errorMessage}>Campo requerido</Text>
            )}

            {/* Formulario Marca */}
            <Text style={styles.tituloInputFormulario}>Marca del auto</Text>
            <TextInput
              defaultValue={this.props.route.params.response.marcaAuto}
              style={styles.input}
              onChangeText={marcaAuto =>
                this.setState({marcaAuto})
              }></TextInput>

            {/* Formulario Placas */}
            <Text style={styles.tituloInputFormulario}>Placas del auto</Text>
            <TextInput
              defaultValue={this.props.route.params.response.placaAuto}
              style={styles.input}
              onChangeText={placasAuto =>
                this.setState({placasAuto})
              }></TextInput>

            {/* Formulario Color */}
            <Text style={styles.tituloInputFormulario}>Color</Text>
            <TextInput
              defaultValue={this.props.route.params.response.color}
              style={styles.input}
              onChangeText={color => this.setState({color})}></TextInput>

            {/* Formulario Día Entrada */}
            <Text style={styles.tituloInputFormulario}>Día de entrada</Text>
            <View style={styles.contenedorModalSelector}>
              <ModalSelector
                data={this.state.opcionesFecha}
                initValue="Seleccionar"
                onChange={this.handleFechaSeleccionada}
                style={styles.modalSelector} // Estilo para el selector
                optionTextStyle={styles.optionText}
                selectTextStyle={styles.selectTextStyle}
              />
            </View>
            <Text style={styles.textoAnterior}>
              {/* Seleccion anterior: {'Nadota'} */}
              Seleccion anterior: {this.props.route.params.response.diaEntrada}
            </Text>
            {diaError && (
              <Text style={styles.errorMessage}>Campo requerido</Text>
            )}

            {/* Formulario Hora Entrada */}
            <Text style={styles.tituloInputFormulario}>Hora de entrada</Text>
            <View style={styles.contenedorModalSelector}>
              <ModalSelector
                data={this.state.opcionesHora}
                initValue="Seleccionar"
                onChange={option => {
                  console.log(option.label);
                  this.setState({horaEntrada: option.label});
                }}
                style={styles.modalSelector} // Estilo para el selector
                optionTextStyle={styles.optionText}
                selectTextStyle={styles.selectTextStyle}
                disabled={!this.state.puertaHabilitada}
              />
            </View>
            <Text style={styles.textoAnterior}>
              {/* Seleccion anterior: {'Nadota'} */}
              Seleccion anterior: {this.props.route.params.response.horaEntrada}
            </Text>
            {horaEntradaError && (
              <Text style={styles.errorMessage}>Campo requerido</Text>
            )}

            {/* Formulario Puerta de entrada */}
            <Text style={styles.tituloInputFormulario}>Puerta de entrada</Text>
            <View style={styles.contenedorModalSelector}>
              <ModalSelector
                data={this.state.opcionesPuerta}
                initValue="Seleccionar"
                onChange={option => {
                  console.log(option.label);
                  this.setState({puerta: option.label});
                }}
                style={styles.modalSelector} // Estilo para el selector
                optionTextStyle={styles.optionText}
                selectTextStyle={styles.selectTextStyle}
              />
            </View>
            <Text style={styles.textoAnterior}>
              {/* Seleccion anterior: {'Nadota'} */}
              Seleccion anterior:{' '}
              {this.props.route.params.response.puertaEntrada}
            </Text>
            {puertaError && (
              <Text style={styles.errorMessage}>Campo requerido</Text>
            )}

            {/* Formulario Modulo */}
            <Text style={styles.tituloInputFormulario}>Modulo Dirigido</Text>
            <View style={styles.contenedorModalSelector}>
              <ModalSelector
                data={this.state.opcionesModulo}
                initValue="Seleccionar"
                onChange={option => {
                  console.log(option.label);
                  this.setState({moduloDirigido: option.label});
                }}
                style={styles.modalSelector} // Estilo para el selector
                optionTextStyle={styles.optionText}
                selectTextStyle={styles.selectTextStyle}
              />
            </View>
            <Text style={styles.textoAnterior}>
              {/* Seleccion anterior: {'Nadota'} */}
              Seleccion anterior:{' '}
              {this.props.route.params.response.moduloDirigido}
            </Text>
            {moduloDirigidoError && (
              <Text style={styles.errorMessage}>Campo requerido</Text>
            )}

            <TouchableOpacity onPress={modificarCita}>
              <View
                style={[
                  globalStyles.boton,
                  globalStyles.centrar,
                  styles.abajo,
                ]}>
                <Text style={globalStyles.txtBoton}>Modificar Cita</Text>
              </View>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  input: {
    backgroundColor: '#005FB7',
    height: hp('6.5%'),
    width: wp('90%'),
    fontSize: 20,
    borderRadius: 15,
    marginBottom: 5,
    color: "white",
  },
  tituloInputFormulario: {
    fontSize: 24,
    marginTop: 10,
    color: 'white',
    fontWeight: 'bold',
    marginBottom: 7,
  },
  abajo: {
    marginTop: 30,
    marginBottom: 220,
  },
  errorInput: {
    borderColor: 'red',
    borderWidth: 4,
  },
  errorMessage: {
    color: 'red',
    fontSize: 17,
    fontWeight: 'bold',
  },
  scrollContainer: {
    width: wp('100%'), // Ancho del 90% del ancho de la pantalla
    height: hp('100%'), // Alto del 70% del alto de la pantalla
  },
  contenedorModalSelector: {
    //flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0074B7', // Color de fondo
  },
  modalSelector: {
    width: wp('50%'), // Ancho del selector
    backgroundColor: '#1B3F7D', // Color de fondo del selector
  },
  optionText: {
    fontSize: 25, // Tamaño de fuente de las opciones
  },
  selectTextStyle: {
    fontSize: 20,
    color: "white", // Cambia el color aquí para hacerlo más claro
  },
  textoAnterior: {
    fontSize: 16,
    color: 'blue',
    fontWeight: 'bold',
    marginBottom: 6,
  },
});
