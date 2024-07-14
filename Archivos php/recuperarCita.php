<?php
require_once 'conexion.php';
$nombre = $_GET['nombre'];
$apellido = $_GET['apellido'];
$sql = "SELECT * FROM cita WHERE nombre='$nombre' AND apellido='$apellido'";
$resultado = $mysql->query($sql);
$response = array();
if ($mysql->affected_rows > 0) {
    while ($row = mysqli_fetch_assoc($resultado)) {
        $response['nombre'] = $row['nombre'];
        $response['apellido'] = $row['apellido'];
        $response['marcaAuto'] = $row['marcaAuto'];
        $response['placaAuto'] = $row['placaAuto'];
        $response['color'] = $row['color'];
        $response['horaEntrada'] = $row['horaEntrada'];
        $response['diaEntrada'] = $row['diaEntrada'];
        $response['puertaEntrada'] = $row['puertaEntrada'];
        $response['moduloDirigido'] = $row['moduloDirigido'];
        $response['id'] = $row['id'];
        $response['errorCode'] = 1;
        
        echo json_encode($response);
    }
} else {
    $response['errorCode'] = 3;
    //header('Content-Type: application/json');
    echo json_encode($response);
}
?>