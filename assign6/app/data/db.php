<?php
$GLOBALS['DB'] = new PDO('mysql:host=localhost;dbname=n00682994;charset=utf8', 'n00682994', 'copn00682994');
$GLOBALS['DB']->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
$GLOBALS['DB']->setAttribute(PDO::ATTR_EMULATE_PREPARES, false);

function getDBConfig() {
	return $GLOBALS['DB'];
}

?>