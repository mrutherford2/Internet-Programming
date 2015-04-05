<<?php 
	include("db.php");
	error_reporting(E_ALL);
	ini_set('display_errors', 1);
	$data = json_decode(file_get_contents("php://input"));
	$owner = $data->owner;
	$done = $data->done;
	$text = $data->text; 
	$sql = "UPDATE tasks SET done=:done WHERE owner=:owner AND Content=:content";
	$statement = getDBConfig()->prepare($sql);
	$statement->execute(array(':owner'=>$owner, ':done'=>$done,':content'=>$text));
 ?>