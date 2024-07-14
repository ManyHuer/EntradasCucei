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

export default class Cita extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nombre: "",
      apellido: "",

      nombreError:false,
      apellidoError:false,

      modalModificar: false,
      modalEliminar: false,
      response:[],
    };
  }

  render() {
    const clickCrearCita = () => {
      this.props.navigation.navigate('CrearCita');
    };
    const clickModificarCita = () => {
      this.setState({modalModificar:true});
    };
    const clickAceptarModificar = () => {
      let nombre = this.state.nombre;
      let apellido = this.state.apellido;
      _this = this;
      // Validación de campos vacíos
      let nombreError = false;
      let apellidoError = false;

      if (nombre === "") {
        nombreError = true;
      }
      if (apellido === "") {
        apellidoError = true;
      }
      this.setState({ nombreError, apellidoError });

      if (nombreError || apellidoError) {
        Alert.alert("Todos los campos deben estar llenos");
      } else{
        this.setState({ modalModificar: false });
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
          if (this.readyState == 4 && this.status == 200) {
            // Typical action to be performed when the document is ready:
            const response = JSON.parse(xhttp.responseText);
            if(response.errorCode===1){
              const partes = response.diaEntrada.split("-");
              const diaEntrada = `${partes[2]}/${partes[1]}/${partes[0]}`;
              response.diaEntrada=diaEntrada;
              _this.setState({ response });
              _this.props.navigation.navigate('ModificarCita', { response: response });
            }else{
              Alert.alert("No se encontro registro")
            }
            _this.setState({ nombre: '' });
            _this.setState({ apellido: '' });
            
          }
        };
        xhttp.open("GET", "https://puertascucei.000webhostapp.com/recuperarCita.php?nombre="+this.state.nombre+"&apellido="+this.state.apellido, true);
        //xhttp.open("GET", "https://xerophilous-loudspe.000webhostapp.com/datos2.php", true);
        xhttp.send();
      }
    };
    const clickCancelarModificar = () => {
      //this.props.navigation.navigate('ModificarCita');
      this.setState({modalModificar:false});
    };

    const clickEliminarCita = () => {
      //this.props.navigation.navigate('ModificarCita');
      this.setState({modalEliminar:true});
    };
    const clickAceptarEliminar = () => {
      let nombre = this.state.nombre;
      let apellido = this.state.apellido;
      _this = this;
      // Validación de campos vacíos
      let nombreError = false;
      let apellidoError = false;

      if (nombre === "") {
        nombreError = true;
      }
      if (apellido === "") {
        apellidoError = true;
      }
      this.setState({ nombreError, apellidoError });

      if (nombreError || apellidoError) {
        Alert.alert("Todos los campos deben estar llenos");
      } else{
        this.setState({modalEliminar:false});
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
          if (this.readyState == 4 && this.status == 200) {
            // Typical action to be performed when the document is ready:
            const response = JSON.parse(xhttp.responseText);
            if(response.errorCode===1){
              const partes = response.diaEntrada.split("-");
              const diaEntrada = `${partes[2]}/${partes[1]}/${partes[0]}`;
              response.diaEntrada=diaEntrada;
              console.log(response)
              _this.props.navigation.navigate('EliminarCita', { response: response });
            }else{
              Alert.alert("No se encontro registro")
            }
            _this.setState({ nombre: '' });
            _this.setState({ apellido: '' });
          }
        };
        xhttp.open("GET", "https://puertascucei.000webhostapp.com/recuperarCita.php?nombre="+this.state.nombre+"&apellido="+this.state.apellido, true);
        //xhttp.open("GET", "https://xerophilous-loudspe.000webhostapp.com/datos2.php", true);
        xhttp.send();
      }
    };
    const clickCancelarEliminar = () => {
      //this.props.navigation.navigate('ModificarCita');
      this.setState({modalEliminar:false});
    };

    const {
      nombreError,
      apellidoError,
    } = this.state;

    return (
      <View style={globalStyles.contenedorPrincipal}>
        <View style={globalStyles.centrar}>
          <Image
            style={styles.imangeEscudoCucei}
            source={require("./Img/Escudo_CUCEI.png")}
          />
        </View>
        <View style={[globalStyles.centrar, styles.contenedorTextoTitulos]}>
          <Text style={styles.textoTitulos}>Entradas Cucei</Text>
        </View>

        <View style={[globalStyles.centrar, styles.bajarContenedor]}>
          <TouchableOpacity onPress={clickCrearCita}>
            <View
              style={[
                globalStyles.boton,
                globalStyles.centrar,
                styles.separarBotonAbajo,
                styles.botonContainer,
              ]}>
              <Text style={styles.txtBoton}>Crear</Text>
              <Image
                source={require('./Img/icono-crear.png')}
                style={styles.icono}
              />
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={clickModificarCita}>
            <View
              style={[
                globalStyles.boton,
                globalStyles.centrar,
                styles.separarBotonAbajo,
                styles.botonContainer,
              ]}>
              <Text style={styles.txtBoton}>Modificar</Text>
              <Image
                source={require('./Img/icono-modificar.png')}
                style={styles.icono}
              />
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={clickEliminarCita}>
            <View
              style={[
                globalStyles.boton,
                globalStyles.centrar,
                styles.separarBotonAbajo,
                styles.botonContainer,
              ]}>
              <Text style={styles.txtBoton}>Eliminar</Text>
              <Image
                source={require('./Img/icono-eliminar.png')}
                style={styles.icono}
              />
            </View>
          </TouchableOpacity>
        </View>
        {/* Modal ventana correo */}
        <Modal
                transparent={true}
                visible={this.state.modalModificar}
                //animationType='slide'
                animationType='fade'
            >
                <View style={styles.estilosModal}>
                    <Text style={styles.tituloInputFormulario}>Nombre</Text>
                    <TextInput style={styles.input} onChangeText={nombre=>this.setState({nombre})}></TextInput>
                    {nombreError && <Text style={styles.errorMessage}>Campo requerido</Text>}

                    <Text style={styles.tituloInputFormulario}>Apellido</Text>
                    <TextInput style={styles.input} onChangeText={apellido=>this.setState({apellido})}></TextInput>
                    {apellidoError && <Text style={styles.errorMessage}>Campo requerido</Text>}

                    <View style={styles.alinearBotones}>
                      <TouchableOpacity style={[styles.btnAceptar, globalStyles.centrar]} onPress={clickCancelarModificar}>
                          <Text style={globalStyles.txtBoton}>Cancelar</Text>
                      </TouchableOpacity>
                      <View style={styles.espacio}></View>
                      <TouchableOpacity style={[styles.btnAceptar, globalStyles.centrar]} onPress={clickAceptarModificar}>
                          <Text style={globalStyles.txtBoton}>Aceptar</Text>
                      </TouchableOpacity>
                    </View>
                </View>
            </Modal>

            {/* Modal ventana correo */}
            <Modal
                    transparent={true}
                    visible={this.state.modalEliminar}
                    //animationType='slide'
                    animationType='fade'
                >
                <View style={styles.estilosModal}>
                    <Text style={styles.tituloInputFormulario}>Nombre</Text>
                    <TextInput style={styles.input} onChangeText={nombre=>this.setState({nombre})}></TextInput>
                    {nombreError && <Text style={styles.errorMessage}>Campo requerido</Text>}

                    <Text style={styles.tituloInputFormulario}>Apellido</Text>
                    <TextInput style={styles.input} onChangeText={apellido=>this.setState({apellido})}></TextInput>
                    {apellidoError && <Text style={styles.errorMessage}>Campo requerido</Text>}

                    <View style={styles.alinearBotones}>
                      <TouchableOpacity style={[styles.btnAceptar, globalStyles.centrar]} onPress={clickCancelarEliminar}>
                          <Text style={globalStyles.txtBoton}>Cancelar</Text>
                      </TouchableOpacity>
                      <View style={styles.espacio}></View>
                      <TouchableOpacity style={[styles.btnAceptar, globalStyles.centrar]} onPress={clickAceptarEliminar}>
                          <Text style={globalStyles.txtBoton}>Aceptar</Text>
                      </TouchableOpacity>
                    </View>
                 </View>
              </Modal>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  imangeEscudoCucei:{
    marginTop: 60,
    width: wp('55%'),
    height: hp('35%'),
  },
  bajarContenedor: {
    marginTop: 20,
  },
  icono: {
    width: wp('10%'),
    height: hp('5%'),
    marginLeft: 10, // Espacio entre el texto y el ícono
  },
  botonContainer: {
    marginBottom: 30,
    flexDirection: 'row',
    alignItems: 'center',
  },
  txtBoton: {
    fontSize: 30,
    textAlign: 'center',
    color: 'white',
    fontWeight: 'bold',
    marginLeft: 40,
  },
  textoTitulos:{
    color: "white",
    textAlign: "center",
    fontSize: 40,
    fontWeight: 'bold',
  },
  contenedorTextoTitulos:{
    width: wp('100%'),
    height: hp('10%'),
  },
  estilosModal:{
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    borderRadius: 40,
    width: wp('90%'),
    height: hp('40%'), // Aumenta la altura para centrar verticalmente
    marginTop: hp('30%'), // Ajusta el valor para centrar verticalmente
    marginLeft: wp('5%'), // Ajusta el valor para centrar verticalmente
  },
  tituloInputFormulario:{
      fontSize: 20,
      marginTop: 10,
      color: "white",
      fontWeight: "bold",
      marginBottom: 5,
  },
  input:{
      backgroundColor: "rgba(150, 150, 150, 0.8)",
      width: wp('82%'),
      height: hp('5%'), // Aumenta la altura para centrar verticalmente
      fontSize: 15,
      marginBottom: 7,
      borderColor: "#808080",
  },
  btnAceptar:{
    //borderWidth: 2,
    width: wp('38%'),
    height: hp('7%'), // Aumenta la altura para centrar verticalmente
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 40,
    backgroundColor: "#2196F3",
  },
  alinearBotones:{
    flexDirection: 'row',
    alignItems: 'center',
  },
  espacio:{
    marginLeft: 7,
    marginRight: 7,
  },
});
