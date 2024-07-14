import { StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export const globalStyles = StyleSheet.create({
    contenedorPrincipal:{
        //flex: 1,
        width: wp('100%'),
        height: hp('100%'),
        backgroundColor: "#0074B7",
    },
    centrar:{
        //flex: 1,
        alignItems: 'center', // Esto centra horizontalmente el contenido
        justifyContent: 'center',
    },
    txtBoton:{
        fontSize: 25,
        //flex: 1,
        textAlign: 'center',
        textAlignVertical: 'center',
        color: 'white',
        fontWeight: 'bold',
    },
    boton:{
        backgroundColor: '#005698',
        width: wp('70%'),
        height: hp('8%'),
        borderRadius: 15,
    },
    header:{
        width: wp('100%'),
        height: hp('15%'),
        backgroundColor: "#FF8A00",
    },
    textoTitulos:{
        color: "white",
        textAlign: "center",
        fontSize: 50,
        fontWeight: 'bold',
    },
    formaContenedorTituloRegistro:{
        backgroundColor: "#FF7B00",
        borderRadius: 20,
    },
    tamanioContenedor:{
        height: hp('9%'),
        width: wp('70%'),
    }
    // Otros estilos globales que desees definir
});