<!DOCTYPE html>
<?php
   require_once ('php/config.php');
   require_once ('php/SQLMethods.php');
   session_start();
?>
<html lang="en">

<head>

    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="">
    <meta name="author" content="">

    <title>Overwatch project</title>

    <link href="css/bootstrap.min.css" rel="stylesheet">


    <link href="css/landing-page.css" rel="stylesheet">

  
    <link href="font-awesome/css/font-awesome.min.css" rel="stylesheet" type="text/css">
    <link href="https://fonts.googleapis.com/css?family=Lato:300,400,700,300italic,400italic,700italic" rel="stylesheet" type="text/css">

   

</head>

<body>

   
    <nav class="navbar navbar-default navbar-fixed-top topnav" role="navigation">
        <div class="container topnav">
          
            <div class="navbar-header">
                <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
                    <span class="sr-only">Toggle navigation</span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                </button>
                <a class="navbar-brand topnav" href="#">Project DSB</a>
            </div>
        
            
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

                
        
                      
                        <h3>Bienvenue sur le site de notre projet de DSB!</h3>
                        <hr class="intro-divider">
                        <ul class="list-inline intro-social-buttons">
                         
                            <li>
                                <a href="https://github.com/Limoelou/DSB-project" class="btn btn-default btn-lg"><i class="fa fa-github fa-fw"></i> <span class="network-name">Github</span></a>
                            </li>
                        </ul>
                    </div>
            

        </div>
     

    </div>
   

	<a  name="services"></a>
    <div class="content-section-b">

        <div class="container">
           
             <center>
                  
                    <div class="clearfix"></div>
                    <h2 class="section-heading">Auteurs</h2>
                    
                    <p class="lead">Lumbroso Marius <a href="http://github.com/Skinz3">Github</a></p>
                    <p class="lead">Robert Louis <a href="https://github.com/Limoelou">Github</a></p>
                    <p class="lead">Louis-Bonneau Melen</p>
                    <h2 class="section-heading">Présentation</h2>
                    <p class="lead">Ce site web a été crée dans le cadre du cours du DSB en deuxième année de licence, a l'ISTIC. Il a été réalisé en <b>XHTML</b>, <b>PHP</b> et <b>MySQL</b>
                    Nous avons rempli manuellement nos tables SQL à partir des informations récupérées sur le site <a href="https://overwatch.gamepedia.com/Overwatch_Wiki">Overwatch Wiki</a>
                    
                    en rapport avec le jeu vidéo de Blizzard : Overwatch. </p>
                    
                
              
                 </center>
              
             
           

        </div>
        
    </div>
    
    <center>
    <a  name="data"></a>
    <div class="content-section-a">
            <div class="container">
            
                    <h2 class="section-heading">Données </h2>
                    
                    <p class="lead"> <a href="xmlGeneration.php">Données au format XML</a> </p>
                    <p class="lead"> <a href="database.csv">Données au format CSV (non synchronisé)</a> </p>
                    <p class="lead"> <a href="dsb.sql">Données au format SQL (non synchronisé)</a> </p>
                    <p class="lead"> <a href="struct.dtd">Télécharger le fichier DTD</a> </p>

            </div>
     </center>

     </div>
             
             
                 
               

        <!-- /.container -
    <!-- /.content-section-b -->



    <center>
    <div class="content-section-b">
            <div class="container">
            
                   <center> <h2 class="section-heading">Schéma conceptuel et interprétation des relations </h2> </center>
                   
                    <p class="lead">Le schéma suivant nous permet d'avoir une représentation compréhensible et simplifiée des relations qui existent entre les différentes tables.
                    <br/> <br/> 
                    <img src = "img/model.png">
                    
            </div>
     </center>

     </div>
             
         
        <!-- /.container -->

    </div>
    <!-- /.content-section-a -->
    
    <center>
    <div class="content-section-a">
            <div class="container">
            
                   <center> <h2 class="section-heading">Requètes SQL</h2> </center>
                   
                    <p class="lead">Les requètes ont été ajoutées sur une autre page du site qui leur est entièrement consacrée afin d'y voir plus clair !<br/>
                    <center> Cliquez sur le faucheur ahuri ci-dessous pour y accéder. </center>
                    <br/>
                    <a href="Requests"><img width = 327 height = 541 src="img/reaper.png" alt="Lien vers les requètes SQL"/></a>    <br/> <br/> 

                    
            </div>
     </center>

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
                        
                            <a href="https://github.com/IronSummitMedia/startbootstrap" class="btn btn-default btn-lg"><i class="fa fa-github fa-fw"></i> <span class="network-name">Github</span></a>
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
