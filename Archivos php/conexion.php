<?php
//Datos de conexion
$server = "localhost";
$user = "id21628694_many";
$pass = "Alcondorado1.";
$bd = "id21628694_puertascucei";

$mysql=new mysqli($server, $user, $pass, $bd);
if($mysql->connect_error){
    die("Error de conexion");
}

?>