<?php 
	error_reporting(E_ALL);
 	ini_set('display_errors', 1);
	$user=json_decode(file_get_contents('php://input'), true);  //get user from 
	$file = "logininfo.txt";
	$contents = (string)file_get_contents($file);
	$data = explode(',',$contents);
	echo " ";
	echo $user['username'];
	if($data[0]==$user->username) {
         	session_start();
		$_SESSION['user']=uniqid('ang_');
		$_SESSION['username']=$user->username;
	}
	else{
		print 'failed';
	}
	
		
	
?>
