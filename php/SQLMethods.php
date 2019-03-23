<?php


function getAccount($bdd,$username)
{
	$result = $bdd->query("SELECT * FROM accounts where Username = '".$username."'");
	$row = $result->fetch();
	return $row;
}






?>