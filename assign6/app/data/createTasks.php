<<?php 
	include("db.php");
	error_reporting(E_ALL);
	ini_set('display_errors', 1);
	$data = json_decode(file_get_contents("php://input"));
	$content = $data->text;
	$owner = $data->owner;
	$done = $data->done;
	$sql = "INSERT INTO tasks (Content,owner,done) VALUES (:content,:owner,:done)";
	$statement = getDBConfig()->prepare($sql);
	$statement->execute(array(':content'=>$content, ':owner'=>$owner, ':done'=>$done));
 ?>