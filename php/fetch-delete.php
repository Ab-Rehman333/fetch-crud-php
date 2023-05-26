<?php
include "config.php";

$deleteId = $_GET['delId'];

$sql = "DELETE FROM  students WHERE  id={$deleteId}";

$result = mysqli_query($conn, $sql) or die("Can't run query");
if ($result) {
    echo json_encode(["delete" => "success"]);
} else {
    echo json_encode(["delete" => "failed", "error" => mysqli_error($conn)]);
}

?>