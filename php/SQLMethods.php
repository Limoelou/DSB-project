<?php


function getAccount($bdd,$username)
{
	$result = $bdd->query("SELECT * FROM account where Username = '".$username."'");
	$row = $result->fetch();
	return $row;
}

function createXML($db)
{
  $my_file = 'database.xml';
  unlink($my_file);
  $handle = fopen($my_file, 'a') or die('Cannot open file:  '.$my_file);


  $xml = new SimpleXMLElement('<users/>');

  appendTable($db,$xml,"account");
  appendTable($db,$xml,"accountBanned");
  appendTable($db,$xml,"characters");
  appendTable($db,$xml,"maps");
  appendTable($db,$xml,"purchases");
  appendTable($db,$xml,"weapons");

  $data = $xml->asXML();
  fwrite($handle, $data);
}

function appendTable($db,$xml,$tableName)
{
  $stmt = $db->query("SELECT * FROM ".$tableName);

  while($row = $stmt->fetch(PDO::FETCH_ASSOC))
  {
    $user = $xml->addChild('user');
 
    foreach ($row as $key => $value) 
    {
       $user->addChild($key, $value);
    }
  }
}






?>