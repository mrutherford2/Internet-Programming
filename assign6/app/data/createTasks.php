<?php 
	include("db.php");
	error_reporting(E_ALL);
	ini_set('display_errors', 1);
	$data = json_decode(file_get_contents("php://input"));
	$content = $data->text;
	$owner = $data->owner;
	$done = $data->done;
	$name = $data->name;
	$boardId = $data->boardId;
	$columnId = 1;  

	$sql = "INSERT INTO tasks (Content,owner,done,name, BoardId, ColumnId) VALUES (:content,:owner,:done,:name, :boardId, :columnId)";
	$statement = getDBConfig()->prepare($sql);
	$statement->execute(array(':content'=>$content, ':owner'=>$owner, ':done'=>$done, ':name'=>$name, ':boardId'=>$boardId, ':columnId'=>$columnId));
 ?>

