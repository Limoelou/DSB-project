<?php


function getAccount($bdd,$username )
{
		$result = $bdd->query("SELECT * FROM accounts where Username = '".$username."'");
		$row = $result->fetch();
		return $row;

}

function manageRegister($bdd,$username,$password)
{
	
		$exist = accountExist($bdd,$mail);
	
		if ($exist)
		{
			echo('<i class="fa fa-times close"></i><meta http-equiv="refresh" content="0; URL=compteexistedeja.php">');
		}
		else
		{
				$req = $bdd->prepare("INSERT INTO accounts (Password, Email, Adress, Admin, FirstName,Surname,PostalCode,City,State) VALUES
				('".$password."', '".$mail."', '".$adress."', 'False',  '".$firstname."', '".$surname."', '".$postalcode."', '".$city."', '".$state."')");
				$req->execute();
		}
		echo('<i class="fa fa-times close"></i><meta http-equiv="refresh" content="0; URL=index.php">');
	
}




?>