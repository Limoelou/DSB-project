<?php



function manageDisconnect()
{
	if(isset($_GET['disconnect']))
	{
		session_destroy();
		echo('<i class="fa fa-times close"></i><meta http-equiv="refresh" content="0; URL=index.php">');
	}
}
function manageLogin($bdd)
{
	if(isset($_GET['login'])) 
	{
		$mail = sanitize($_GET['logemail']);
		$password = sanitize($_GET['logpassword']);
		
		$result = $bdd->query("SELECT * FROM accounts where Email = '".$mail."'");
		$row = $result->fetch();
		
		if ($row == null || $row['Password'] != $password)
		{
			// Nom de compte ou mot de passe incorrect
		}
		else
		{
			
			$_SESSION['account'] = $row;
			
		 	echo('<i class="fa fa-times close"></i><meta http-equiv="refresh" content="0; URL=myAccount.php">');

		}
	}
}
function accountExist($bdd,$mail)
{
	@$search = $bdd->prepare("SELECT * FROM accounts WHERE Email = :mail");
		$search->bindValue(":mail", $mail);
		$search->execute();
		@$exist = $search->rowCount();
}
function manageRegister($bdd)
{
	if(isset($_GET['register'])) 
	{
		$firstname = sanitize($_GET['firstname']);
		$surname = sanitize($_GET['surname']);
		$mail = sanitize($_GET['mail']);
		$adress = sanitize($_GET['adress']);
		$postalcode = sanitize($_GET['postalcode']);
		$city = sanitize($_GET['city']);
		$state = sanitize($_GET['state']);
		$password = sanitize($_GET['password']);
		$passwordConf = sanitize($_GET['passwordConf']);
		
		
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
	
}




?>