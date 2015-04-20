<?php
	session_start();
	include("db.php");
	error_reporting(E_ALL);
 	ini_set('display_errors', 1);
 	$data = json_decode(file_get_contents("php://input"));
 	$owner = $data->owner;
 	$done = $data->done; 
 	$text = $data->text; 

 	$sql = "UPDATE tasks SET done =:done WHERE Content =:text AND Owner=:owner";
 	$statement = getDBConfig()->prepare($sql);
 	$statement->bindParam(':done', $done);
 	$statement->bindParam(':owner', $owner);
 	$statement->bindParam(':text', $text);
 	$statement->execute();

 	$sql = "DELETE FROM tasks WHERE done = 1 AND Owner=:owner";
 	$statement = getDBConfig()->prepare($sql);
 	$statement->bindParam(':owner', $owner);
 	$statement->execute();
 	if($statement->rowCount() > 0)
 	{
 		http_response_code(200);
	 	echo json_encode('success');
 	}
?>

