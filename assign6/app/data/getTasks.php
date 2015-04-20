<?php 
	session_start();
	include("db.php");
	error_reporting(E_ALL);
 	ini_set('display_errors', 1);
 	$data = json_decode(file_get_contents("php://input"));
	$columnId = $data->columnId;
	$boardId = $data->boardId;

	$sql = "SELECT Content, done, name, ID FROM tasks WHERE ColumnId=:columnId AND BoardId=:boardId";
	$statement = getDBConfig()->prepare($sql);
	$statement->bindParam(':columnId', $columnId);
	$statement->bindParam(':boardId', $boardId);
	$statement->execute();
	$data = $statement->fetchAll();
	echo json_encode($data);
?>