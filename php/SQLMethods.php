<?php


function getAccount($bdd,$username)
{
	$result = $bdd->query("SELECT * FROM account where Username = '".$username."'");
	$row = $result->fetch();
	return $row;
}






?>