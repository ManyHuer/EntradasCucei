<?php
require_once 'conexion.php';
$id=$_GET["id"];

$sql = "DELETE FROM cita WHERE id = $id";

$resultado=$mysql->query($sql);
if($resultado==true){
    echo "1";
}else{
    echo "0";
}
?>