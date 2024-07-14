<?php
header("Access-Control-Allow-Origin: *"); // Esto permite cualquier dominio
header("Content-Type: application/json; charset=UTF-8");
require_once 'conexion.php';
// Establecer la zona horaria a la deseada (por ejemplo, "America/Mexico_City")
date_default_timezone_set("America/Mexico_City");

// Obtén la fecha actual y la hora actual
$fechaActual = date("Y-m-d");
$horaActual = date("H:i:s");

$horaLimiteDespues = date("H:i:s", strtotime($horaActual) + 300); // 300 segundos = 5 minutos
$horaLimiteAntes = date("H:i:s", strtotime($horaActual) - 300); // 300 segundos = 5 minutos



//$sql = "SELECT * FROM cita WHERE puertaEntrada='Puerta 1 Revolución'";
//$sql = "SELECT * FROM cita WHERE puertaEntrada='Puerta 1 Revolución' AND diaEntrada = '$fechaActual'";
$sql = "SELECT * FROM cita WHERE puertaEntrada='Puerta 3 Boulevard' AND diaEntrada = '$fechaActual' AND horaEntrada >= '$horaLimiteAntes' AND horaEntrada <= '$horaLimiteDespues'";
$resultado = $mysql->query($sql);
$response = array();

if ($resultado->num_rows > 0) {
    while ($row = $resultado->fetch_assoc()) {
        $response[] = array(
            'nombre' => $row["nombre"],
            'apellido' => $row["apellido"],
            'marcaAuto' => $row['marcaAuto'],
            'placaAuto' => $row['placaAuto'],
            'color' => $row['color'],
            'horaEntrada' => $row['horaEntrada'],
            'diaEntrada' => $row['diaEntrada'],
            'moduloDirigido' => $row['moduloDirigido'],
        );
    }
    usort($response, function($a, $b) {
        return strtotime($a['horaEntrada']) - strtotime($b['horaEntrada']);
    });
    echo json_encode($response);
} else {
    // Devuelve un JSON vacío en lugar de una cadena de texto
    echo json_encode(array());
}
?>