import React, {Component} from 'react';
import CITA from './Cita';
import CREAR_CITA from './CrearCita';
import MODIFICAR_CITA from './ModificarCita';
import ELIMINAR_CITA from './EliminarCita';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
//La importacion de lo que usemos

export default class Inicio extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //declaracion de varibles
    };
  }
  render() {
    const Stack = createNativeStackNavigator();
    //Las acciones de los objetos
    return (
      <NavigationContainer>
        <Stack.Navigator>
          {/* <Stack.Screen name="Inicio" component={INICIO} options={{headerShown:false}}></Stack.Screen>
                <Stack.Screen name="SingUp" component={SINGUP} options={{headerShown:false}}></Stack.Screen> */}
          <Stack.Screen
            name="Cita"
            component={CITA}
            options={{headerShown: false}}></Stack.Screen>
          <Stack.Screen
            name="CrearCita"
            component={CREAR_CITA}
            options={{headerShown: false}}></Stack.Screen>
          <Stack.Screen
            name="ModificarCita"
            component={MODIFICAR_CITA}
            options={{headerShown: false}}></Stack.Screen>
          <Stack.Screen
            name="EliminarCita"
            component={ELIMINAR_CITA}
            options={{headerShown: false}}></Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
