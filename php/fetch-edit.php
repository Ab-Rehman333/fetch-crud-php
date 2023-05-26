<?php
include "config.php";
$editId = $_GET['editId'];
$output = [];
$sql = "SELECT * FROM students WHERE id = {$editId}";
$result = mysqli_query($conn, $sql) or die("first query in fetch edit is not working");
$dbArray = mysqli_fetch_all($result, MYSQLI_ASSOC);
if (mysqli_num_rows($result) > 0) {
    foreach ($dbArray as $row) {
        $output['response'][] = $row;
    }
}


$sql1 = "SELECT * FROM class";
$result1 = mysqli_query($conn, $sql1) or die("first query in fetch edit is not working");
$dbArray1 = mysqli_fetch_all($result1, MYSQLI_ASSOC);
if (mysqli_num_rows($result1) > 0) {
    foreach ($dbArray1 as $row1) {
        $output['class'][] = $row1;
    }
}
mysqli_close($conn);
echo json_encode($output);
