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
                    <li>
                        <a href="sparql.php">DBPedia</a>
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
          
        </div>
      
    </nav>


    <a name="about"></a>
    <div class="intro-header">
        <div class="container">
            <img src="img/logo.png" >
        </div>
       

    </div>
 
	<a  name="services"></a>
    <div class="content-section-a">

        <div class="container">
        <center>
          <?php echo(createXML($bdd)); ?>

        <h2 class="section-heading">Génération XML terminée!</h2>
            <p> Les données on été exportés au format XML de manière synchronisée a la<br> base de donnée SQL grâce a la fonction <i>createXML($bdd)</i>
            dans le fichier SQLMethods.php </p> 
            <p> Le fichier struct.DTD a également été validé lors de la génération. </p>
         <a href="database.xml" class="btn btn-default">Afficher le fichier XML</a>

         <br/><br/><br/>
         <h2 class="section-heading">XPath</h2>
                  <center>
                 <form action="xmlGeneration.php">
                     Requête XPATH : <br/> <input type="text" name="request" value="/dsb"><br>

                            <br>
                    <button type="submit" class="btn btn-default">Executer</button>

                    </form>
                      </div>

                  <center/>

        <br/><br/>


    
                  
                 

                  <div class="form-group">
                    <label for="exampleFormControlTextarea1"> Voici les résultat de la reqûete XPATH:</label>
                 <textarea class="form-control rounded-0"  value= id="exampleFormControlTextarea1" rows="10">
                 
                 
                 
                 <?php 
                    
                if(isset($_GET['request']))
                   {
                        $request = $_GET['request'];
                         $dat = getXML()->xpath($request);

                        foreach ($dat as $value)
                        {
                            echo $value->asXml();
                        }
                    
                   }
                    
                    ?>
                 
                 
                 
                 </textarea>
        
        </div>

        </center>
       

    </div>


    <div class="content-section-b">

        <div class="container">

            <div class="row">
             
             
                 
               
            </div>

        </div>
       
    </div>
  

	<a  name="contact"></a>
    <div class="banner">

<div class="container">

    <div class="row">
        <div class="col-lg-6">
           
        </div>
        <div class="col-lg-6">
            <ul class="list-inline banner-social-buttons">
                <li>
                    <a href="https://twitter.com/Limoelou1" class="btn btn-default btn-lg"><i class="fa fa-twitter fa-fw"></i> <span class="network-name">Twitter</span></a>
                </li>
                <li>
                
                    <a href="https://github.com/Skinz3" class="btn btn-default btn-lg"><i class="fa fa-github fa-fw"></i> <span class="network-name">Github</span></a>
                </li>
                <li>
                    <a href="#" class="btn btn-default btn-lg"><i class="fa fa-linkedin fa-fw"></i> <span class="network-name">Linkedin</span></a>
                </li>
                <h3>Suivez nous sur les différentes plateformes !</h3>
            </ul>
        </div>
    </div>

</div>
<!-- /.container -->

</div>
    <!-- /.banner -->

    <!-- Footer -->
    <center>
    <footer>
        <div class="container">
            <div class="row">
                <div class="col-lg-12">
                    <ul class="list-inline">
                         <li class="footer-menu-divider">&sdot;</li>
                            <a href="index.php#">Accueil</a>
                        </li>
                        <li class="footer-menu-divider">&sdot;</li>
                            <a href="#">Haut de page</a>
                        </li>
                        <li class="footer-menu-divider">&sdot;</li>
                        <li>
                            <a href="index.php#services">A propos de nous</a>
                        </li>
                        <li class="footer-menu-divider">&sdot;</li>
                        <li>
                            <a href="index.php#data">Données et schéma</a>
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
       </center>

    <!-- jQuery -->
    <script src="js/jquery.js"></script>

    <!-- Bootstrap Core JavaScript -->
    <script src="js/bootstrap.min.js"></script>

</body>

</html>
