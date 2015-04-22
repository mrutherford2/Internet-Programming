<?php
	include("db.php");
	error_reporting(E_ALL);
	ini_set('display_errors', 1);
	$sql = "SELECT * FROM boards";
	$statement = getDBConfig()->prepare($sql);
	$statement->execute();
	$data = $statement->fetchAll();
	echo json_encode($data);
?>