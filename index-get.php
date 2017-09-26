<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');  

if(isset($_POST['action'])) {
            $response = file_get_contents("http://104.198.0.197:8080/legislators?apikey=e8be27b23005488f87b749938135d878&per_page=all");
            //echo json_encode($response);
            //$responseData = json_decode($response);
            echo json_encode($response);
}
//$response = file_get_contents("https://congress.api.sunlightfoundation.com/legislators?apikey=e8be27b23005488f87b749938135d878&per_page=20");
//echo json_encode($response);
//echo json_last_error_msg();


if(isset($_POST['bction'])) {
            $response = file_get_contents("https://congress.api.sunlightfoundation.com/bills?apikey=e8be27b23005488f87b749938135d878&history.active=true&per_page=50");
            //echo json_encode($response);
            //$responseData = json_decode($response);
            echo json_encode($response);
}

if(isset($_POST['b1ction'])) {
            $response = file_get_contents("https://congress.api.sunlightfoundation.com/bills?apikey=e8be27b23005488f87b749938135d878&history.active=false&per_page=50");
            //echo json_encode($response);
            //$responseData = json_decode($response);
            echo json_encode($response);
}

if(isset($_POST['cction'])) {
            $response = file_get_contents("https://congress.api.sunlightfoundation.com/committees?apikey=e8be27b23005488f87b749938135d878&per_page=all");
            //echo json_encode($response);
            //$responseData = json_decode($response);
            echo json_encode($response);
}

if(isset($_POST['legiBill'])) {
            $sponsor_id = $_GET['legiBill'];
            $response = file_get_contents("http://104.198.0.197:8080/bills?sponsor_id=$sponsor_id&apikey=e8be27b23005488f87b749938135d878");
            //echo json_encode($response);
            //$responseData = json_decode($response);
            echo json_encode($response);
}
if(isset($_POST['legiComm'])) {
            $committee_id = $_GET['legiComm'];
            $response = file_get_contents("http://104.198.0.197:8080/committees?committee_id=$committee_id&apikey=e8be27b23005488f87b749938135d878");
            //echo json_encode($response);
            //$responseData = json_decode($response);
            echo json_encode($response);
}
?>