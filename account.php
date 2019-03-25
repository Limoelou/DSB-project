<!DOCTYPE html>
<html lang="en">

<?php
   require_once ('php/config.php');
   require_once ('php/SQLMethods.php');
   session_start();
?>
<head>

    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="">
    <meta name="author" content="">

    <title>Overwatch Project - Requests</title>

    <link href="css/bootstrap.min.css" rel="stylesheet">


    <link href="css/landing-page.css" rel="stylesheet">

    <link href="font-awesome/css/font-awesome.min.css" rel="stylesheet" type="text/css">
    <link href="https://fonts.googleapis.com/css?family=Lato:300,400,700,300italic,400italic,700italic" rel="stylesheet" type="text/css">



</head>

<body>

    <!-- Navigation -->
    <nav class="navbar navbar-default navbar-fixed-top topnav" role="navigation">
        <div class="container topnav">
            <!-- Brand and toggle get grouped for better mobile display -->
            <div class="navbar-header">
                <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
                    <span class="sr-only">Toggle navigation</span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                </button>
                <a class="navbar-brand topnav" href="#">Project DSB</a>
            </div>
            <!-- Collect the nav links, forms, and other content for toggling -->
            <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                <ul class="nav navbar-nav navbar-right">
            
                     <li>
                        <a href="index.php">Accueil</a>
                    </li>
                    <li>
                        <a href="requests.php">Requêtes</a>
                    </li>

                    <?php if (isset($_SESSION['account'])) {  ?>
                    <li>
                    <a href="account.php">Mon compte</a>
                      
                    </li>
                    <?php } else {  ?>
                        <li>
                        <a href="authentification.php">Se connecter</a>
                        </li>
                    <?php } ?>

                </ul>
            </div>
            <!-- /.navbar-collapse -->
        </div>
        <!-- /.container -->
    </nav>


    <!-- Header -->
    <a name="about"></a>
    <div class="intro-header">
        <div class="container">
            <img src="img/logo.png" >
        </div>
        <!-- /.container -->

    </div>
    <!-- /.intro-header -->

    <!-- Page Content -->

	<a  name="services"></a>
    <div class="content-section-a">

        <div class="container">
           
           <?php



if(isset($_GET['username']))
{
    $username = $_GET['username'];
    $password =  $_GET['password'];

    $account = getAccount($bdd,$username);
   
    if ($account['Password'] == $password)
    {
        $_SESSION['account'] = $account;
    }
}

if (isset($_SESSION['account']))
{

    if(isset($_POST['logout']))
	{
		session_destroy();
		echo('<i class="fa fa-times close"></i><meta http-equiv="refresh" content="0; URL=index.php">');
	}
    ?>  

    <center>


  
          <div class="clearfix"></div>
          <h2 class="section-heading">Mon compte</h2>
         <p> Nom de compte : <?php echo($_SESSION['account']['Username']) ?>
         <p> Mot de passe : <?php echo($_SESSION['account']['Password']) ?>
         <p> Mes Lootbox : <?php echo($_SESSION['account']['Lootbox']) ?>
         <p> Mes Pièces : <?php echo($_SESSION['account']['Gold']) ?>
         <p> Mon niveau : <?php echo($_SESSION['account']['Level']) ?>
         <p> Mon rang : <?php echo($_SESSION['account']['Rank']) ?>
        <br>
        <form id="formPost" method="POST" action="" accept-charset="UTF-8"><input 
                   <input type="submit"  class="btn btn-default" role="button"  name="logout" id="logout" value="Déconnexion">
		</form>
        
</center>


<?php }
else
{
    ?>
    
    
    
       <?php
}  ?>
   

        
           
           

        </div>
        <!-- /.container -->

    </div>
    <!-- /.content-section-a -->

    <div class="content-section-b">

        <div class="container">

            <div class="row">
             
             
                 
               
            </div>

        </div>
        <!-- /.container -->

    </div>
    <!-- /.content-section-b -->


	<a  name="contact"></a>
    <div class="banner">

        <div class="container">

            <div class="row">
                <div class="col-lg-6">
                    <h2>Connect to Start Bootstrap:</h2>
                </div>
                <div class="col-lg-6">
                    <ul class="list-inline banner-social-buttons">
                        <li>
                            <a href="https://twitter.com/SBootstrap" class="btn btn-default btn-lg"><i class="fa fa-twitter fa-fw"></i> <span class="network-name">Twitter</span></a>
                        </li>
                        <li>
                            <a href="https://github.com/IronSummitMedia/startbootstrap" class="btn btn-default btn-lg"><i class="fa fa-github fa-fw"></i> <span class="network-name">Github</span></a>
                        </li>
                        <li>
                            <a href="#" class="btn btn-default btn-lg"><i class="fa fa-linkedin fa-fw"></i> <span class="network-name">Linkedin</span></a>
                        </li>
                    </ul>
                </div>
            </div>

        </div>
        <!-- /.container -->

    </div>
    <!-- /.banner -->

    <!-- Footer -->
    <footer>
        <div class="container">
            <div class="row">
                <div class="col-lg-12">
                    <ul class="list-inline">
                        <li>
                            <a href="#">Home</a>
                        </li>
                        <li class="footer-menu-divider">&sdot;</li>
                        <li>
                            <a href="#about">About</a>
                        </li>
                        <li class="footer-menu-divider">&sdot;</li>
                        <li>
                            <a href="#services">Services</a>
                        </li>
                        <li class="footer-menu-divider">&sdot;</li>
                        <li>
                            <a href="#contact">Contact</a>
                        </li>
                    </ul>
                   
                </div>
            </div>
        </div>
    </footer>

    <!-- jQuery -->
    <script src="js/jquery.js"></script>

    <!-- Bootstrap Core JavaScript -->
    <script src="js/bootstrap.min.js"></script>

</body>

</html>
