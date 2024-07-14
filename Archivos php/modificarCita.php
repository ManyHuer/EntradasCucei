<?php
require_once 'conexion.php';
$nombre=$_GET["nombre"];
$marcaAuto=$_GET["marcaAuto"];
$placaAuto=$_GET["placasAuto"];
$color=$_GET["color"];
$horaEntrada=$_GET["horaEntrada"];
$diaEntrada=$_GET["dia"];
$puertaEntrada=$_GET["puerta"];
$moduloDirigido=$_GET["moduloDirigido"];
$id=$_GET["id"];
$diaEntradaFormateado = date('Y-m-d', strtotime(str_replace('/', '-', $diaEntrada)));

$sql="UPDATE cita SET nombre = '$nombre', marcaAuto = '$marcaAuto', placaAuto = '$placaAuto', color = '$color', horaEntrada = '$horaEntrada', diaEntrada = '$diaEntradaFormateado', puertaEntrada = '$puertaEntrada', moduloDirigido = '$moduloDirigido' WHERE id = $id";

$resultado=$mysql->query($sql);
if($resultado==true){
    echo "1";
}else{
    echo "0";
}
?>