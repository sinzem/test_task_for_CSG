<?php 

$_POST = file_get_contents("php://input", true);
$_POST = json_decode($_POST, true);

if($_POST) {
    return true;
} else {
    return false;
}

?>