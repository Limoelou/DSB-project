<?php
//Informations BDD
$settings['host_bdd'] = 'localhost';//IP du host
$settings['user_bdd'] = 'root';//Nom d'utilisateur pour accéder à la BDD
$settings['mdp_bdd'] = '';//MDP pour accéder à la BDD
$settings['port_bdd'] = '3306';
$settings['name_bdd'] = 'dsb';//Nom de la base de donnée auth

$settings['home_articles_count'] =  6;


$settings['ShowErrors'] = true;


if ($settings['ShowErrors'] == false)
{
	error_reporting(0);
}

try
{
	$bdd = new PDO ('mysql:host='.$settings['host_bdd'].';dbname='.$settings['name_bdd'].'',
	$settings['user_bdd'], $settings['mdp_bdd'], array(PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION));
	$bdd->query('SET NAMES utf8');
}
  
catch(Exception $e)
{
	die('Erreur :'.$e->getMessage());
}
?>