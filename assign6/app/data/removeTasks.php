<?php
	session_start();
	include("db.php");
	error_reporting(E_ALL);
 	ini_set('display_errors', 1);
 	$data = json_decode(file_get_contents("php://input"));
 	$id = $data->Id;
 	$done = $data->done;

 	$sql = "UPDATE tasks SET done =:done WHERE Id =:id";
 	$statement = getDBConfig()->prepare($sql);
 	$statement->bindParam(':done', $done);
 	$statement->bindParam(':id', $id);
 	$statement->execute();

 	$sql = "DELETE FROM tasks WHERE done = 1 AND Id=:id";
 	$statement = getDBConfig()->prepare($sql);
 	$statement->bindParam(':id', $id);
 	$statement->execute();
 	if($statement->rowCount() > 0)
 	{
 		http_response_code(200);
	 	echo json_encode('success');
 	}
?>

