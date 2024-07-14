<?php
require_once 'conexion.php';
$nombre=$_GET["nombre"];
$apellido=$_GET["apellido"];
$marcaAuto=$_GET["marcaAuto"];
$placaAuto=$_GET["placasAuto"];
$color=$_GET["color"];
$horaEntrada=$_GET["horaEntrada"];
$diaEntrada=$_GET["dia"];
$puertaEntrada=$_GET["puerta"];
$moduloDirigido=$_GET["moduloDirigido"];
$diaEntradaFormateado = date('Y-m-d', strtotime(str_replace('/', '-', $diaEntrada)));

$sql = "INSERT INTO cita(nombre, apellido, marcaAuto, placaAuto, color, horaEntrada, diaEntrada, puertaEntrada, moduloDirigido) VALUES ('$nombre', '$apellido', '$marcaAuto', '$placaAuto', '$color', '$horaEntrada', '$diaEntradaFormateado', '$puertaEntrada', '$moduloDirigido')";
$resultado=$mysql->query($sql);
if($resultado==true){
    echo "1";
}else{
    echo "0";
}
?>