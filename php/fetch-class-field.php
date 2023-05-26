<?php

include "config.php";
$sql = "SELECT * FROM  class";
$result = mysqli_query($conn, $sql) or die("Couln't Connect To The Database Query Failed in fetching Class");
$output = [];
if(mysqli_num_rows($result) > 0){
    $arrayDb = mysqli_fetch_all($result, MYSQLI_ASSOC);
    foreach($arrayDb as $row){
        $output[] = $row;
    }
}else {
    return false;
}
mysqli_close($conn);
$json_format = json_encode($output);
echo $json_format;
