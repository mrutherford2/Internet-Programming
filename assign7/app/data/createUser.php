<<?php 
	include("db.php");
	error_reporting(E_ALL);
 	ini_set('display_errors', 1);
 	$data = json_decode(file_get_contents("php://input"), true);
 	$username = $data['username'];
 	$password = $data['password'];

 	$sql = "INSERT INTO accounts (Username,Password) VALUES (:username,:password)";
 	$statement = getDBConfig()->prepare($sql);
 	$statement->execute(array(':username'=>$username, ':password'=>$password));

 	if($statement)
 	{
 		http_response_code(200);
 	}
 	else
 	{
 		http_response_code(500);
 	}
 ?>