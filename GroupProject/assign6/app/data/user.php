<?php 
	include("db.php");
	error_reporting(E_ALL);
 	ini_set('display_errors', 1);
	$_POST = json_decode(file_get_contents("php://input"), true);
	$statement = getDBConfig()->prepare(
		"SELECT ID
		FROM accounts
		WHERE Username=:username
		and Password=:password");
	$statement->bindParam(':username', $_POST['username']);
	$statement->bindParam(':password', $_POST['password']);
	$statement->execute();
	if($statement->rowCount() > 0) {
		session_start();
		$_SESSION['user']=uniqid('ang_');
	 	$_SESSION['username']=$_POST['username'];
	 	http_response_code(200);
	 	echo json_encode('success');
	}
	else {
		http_response_code(404);
		echo json_encode(['error' => 'User not found']);
	}
?>