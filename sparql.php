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
        <center>
        <div class="clearfix"></div>
           <h2 class="section-heading">SPARQL</h2>

        <p> Sur cette page, nous comparons certaines données de notre base de données avec celle de DBPedia afin d'obtenir de plus amples informations sur nos insertions. <br/>
         Pour celà, nous utilisons des requètes SPARQL, spécialement faites pour récupérer des données sur DBpedia <br/>
          Dans le cas ci-dessous, nous récupérons les données que possède DBpedia sur une des cartes de notre jeu (celle ci étant issue de la réalité) : Rialto</i> </p>
         
       
          <p>  On selectionne une carte grâce a la requête <i>SELECT Name from maps LIMIT 1</i> </p>
          <img src="img/sparql1.png"> 
          <p> Le résultat XML de notre requète SPARQL sur DBpédia est affiché ci-dessous, on insère les données récupérées au format XML dans notre table 'dbpedia' de la base de données ce qui conclut notre utilisation de DBpedia. </p>     
          <img src="img/sparql2.png">
          
          <p>Voici le resultat produit : </p>
          <img src="img/sparql3.png">
             <?php 
                 $result = $bdd->prepare("SELECT Name from maps LIMIT 1");  
                 $result->execute();  

                 $city = $result->fetch()['Name'];         
      
                 $baseURL = "http://fr.dbpedia.org/sparql?default-graph-uri=&query=select+*+where+%7B%3Chttp%3A%2F%2Ffr.dbpedia.org%2Fresource%2F@%3E+%3Fr+%3Fp%7D&format=xml%2Fhtml&timeout=0&debug=on";

                    
                 $uri = str_replace("@",$city,$baseURL);
                    
                 $xml= simplexml_load_file($uri);
                 $xmlText = $xml->asXml();
          

                 $result = $bdd->prepare("delete from dbpedia"); 
                 $result->execute();  

                foreach ($xml->results->result as $value)
                {
                    $valueText = $value->binding[1]->uri;

                    if ($valueText == "")
                    continue;
                   

                   try
                   {
                    $result = $bdd->prepare("INSERT INTO dbpedia (MapName,DBpediaData) VALUES ('".$city."','".$valueText."')");  
                    $result->execute();  
                   }
                   catch (Exception $e)
                   {
                        // cas ou il y a des caractères spéciaux ou des apostrophes dans les résultats de DBPedia, (russes etc)

                   }
                }
              
                  
               

            // http://fr.dbpedia.org/sparql select * where {<http://fr.dbpedia.org/resource/Paris> ?r ?p}
          
            ?>
 </center>
            <center>
            </br>
              <a href="<?php echo $uri ?>" class="btn btn-primary btn-lg active" role="button" aria-pressed="true">Télécharger les données de DBPedia</a>
            </center>

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

        
        <!-- /.container -->


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
                        
                            <a href="http://github.com/Limoelou" class="btn btn-default btn-lg"><i class="fa fa-github fa-fw"></i> <span class="network-name">Github</span></a>
                        </li>
                        <li>
                            <a href="https://www.linkedin.com/in/louis-robert-2b4525183/" class="btn btn-default btn-lg"><i class="fa fa-linkedin fa-fw"></i> <span class="network-name">Linkedin</span></a>
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
