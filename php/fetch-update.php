<?php
include "config.php";

$outputValue = file_get_contents('php://input');
$json_format = json_decode($outputValue, true);
$edit_id = $json_format['editId'];
$first_name = $json_format['ftName'];
$last_name = $json_format['lName'];
$selectBox = $json_format['selectBox'];
$city = $json_format['city'];

$sql = "UPDATE students SET   first_name = '{$first_name}', last_name = '{$last_name}', class = '{$selectBox}', city =  '{$city}' WHERE id = {$edit_id}";

$result = mysqli_query($conn, $sql) or die("Can't run query");
if ($result) {
    echo json_encode(["update" => "success"]);
} else {
    echo json_encode(["update" => "failed", "error" => mysqli_error($conn)]);
}
