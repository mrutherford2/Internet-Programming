<?php
$GLOBALS['DB'] = new PDO('mysql:host=localhost;dbname=marionso_assign6;charset=utf8', 'marionso_assign6', 'asldkfjw2342xcvm');
$GLOBALS['DB']->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
$GLOBALS['DB']->setAttribute(PDO::ATTR_EMULATE_PREPARES, false);

function getDBConfig() {
	return $GLOBALS['DB'];
}

?>
