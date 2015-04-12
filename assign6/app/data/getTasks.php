<?php 
	session_start();
	include("db.php");
	error_reporting(E_ALL);
 	ini_set('display_errors', 1);
	$owner = $_SESSION['username'];
	$sql = "SELECT Content, done, name, modified, ID FROM tasks WHERE Owner=:owner";
	$statement = getDBConfig()->prepare($sql);
	$statement->bindParam(':owner', $owner);
	$statement->execute();
	$data = $statement->fetchAll();
	echo json_encode($data);
?>