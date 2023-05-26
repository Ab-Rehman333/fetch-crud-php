<?php

include 'config.php';
$sql = "SELECT students.id , students.first_name, students.last_name  , students.city, class.class_name FROM students LEFT JOIN class ON class.cid = students.class";

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
