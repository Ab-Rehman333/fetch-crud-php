<?php
include "config.php";

$outputValue = file_get_contents('php://input');
$json_format = json_decode($outputValue, true);
$first_name = $json_format['ftName'];
$last_name = $json_format['lName'];
$selectBox = $json_format['selectBox'];
$city = $json_format['city'];

$sql = "INSERT INTO students(first_name, last_name, class, city) VALUES ('{$first_name}', '{$last_name}', '{$selectBox}', '{$city}')";

$result = mysqli_query($conn, $sql) or die("Can't run query");
if ($result) {
    echo json_encode(["insert" => "success"]);
} else {
    echo json_encode(["insert" => "failed", "error" => mysqli_error($conn)]);
}
?>
