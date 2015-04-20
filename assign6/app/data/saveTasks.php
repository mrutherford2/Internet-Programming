<<?php 
	include("db.php");
	error_reporting(E_ALL);
	ini_set('display_errors', 1);
	$data = json_decode(file_get_contents("php://input"));
	$done = $data->done;
	$text = $data->text;
	$name = $data->name;
	$id = $data->id;   
	$sql = "UPDATE tasks SET done=:done, Content=:content, name=:name  WHERE ID=:id";
	$statement = getDBConfig()->prepare($sql);
	$statement->execute(array(':done'=>$done,':content'=>$text, ':name'=>$name, ':id'=>$id));
 ?> 