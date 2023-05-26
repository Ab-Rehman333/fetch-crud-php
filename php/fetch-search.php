<?php

include 'config.php';
$search_query = $_GET['query'];
$sql = "SELECT students.id , students.first_name, students.last_name  , students.city, class.class_name FROM students LEFT JOIN class ON class.cid = students.class WHERE  concat(first_name, last_name) LIKE '%{$search_query}%'";

$result = mysqli_query($conn, $sql) or die("couldn't run query");

$output = [];

if (mysqli_num_rows($result) > 0) {
    $arrayDb = mysqli_fetch_all($result, MYSQLI_ASSOC);
    foreach ($arrayDb as $row) {
        $output[] = $row;
    }
} else {
    $output['null'] = ['null'];
}
mysqli_close($conn);

$json_format  = json_encode($output);

echo $json_format;
