<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
require_once 'conexion.php';

// Establecer la zona horaria a la deseada (por ejemplo, "America/Mexico_City")
date_default_timezone_set("America/Mexico_City");

$fechaActual = date("Y-m-d");
// Obtén la fecha y hora actual
$fechaHoraActual = date("Y-m-d H:i:s");

$horaLimiteDespues = date("H:i:s", strtotime($fechaHoraActual) - 300); // 300 segundos = 5 minutos

// Realiza la eliminación de registros obsoletos en la base de datos
$sql = "DELETE FROM cita WHERE puertaEntrada='Puerta 3 Boulevard' AND diaEntrada = '$fechaActual' AND horaEntrada <= '$horaLimiteDespues'";
echo $sql;
$resultado = $mysql->query($sql);
if ($resultado === true) {
    echo 1;
} else {
    echo 0;
}
?>