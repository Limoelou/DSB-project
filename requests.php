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
           
             <center>
                  
                    <div class="clearfix"></div>
                    <h2 class="section-heading">Requêtes</h2>
                    <p class="lead">Voici plusieurs requètes que nous avons réalisées en nous basant sur notre base de données. </p>
                    <h4 class="section-heading"><u>Selection avec projection</u></h4>


                    <p>Nous cherchons à renvoyer certains attributs des insertions remplissant les conditions de la sélection. <br/>Notre table 'Characters' est la suivante :</p>
                    <img src="https://puu.sh/D4i1t/286b3ac322.png" /><br/>
                    <p> Nous écrivons la requète suivante : <table  border ="1" cellspacing="1" cellpadding="1"><tr><td><div align=center>SELECT Id,Name from Characters where LifePoints == 200</div></td><tr></table>
                    <br/> qui renvoie une table avec les colonnes 'Id' et 'Name' des insertions dont la valeur de la colonne 'LifePoints' est égale à 200 : <br/>
                    <br/>

              
                    <table border="1" >

                    <tr>
                         <th >Id</th>
                        <th >Nom</th>
                    </tr>


                
                    <?php 
                    
                    $result = $bdd->query("SELECT Id,Name from Characters where LifePoints = 200");
                 
                   
                    while ($row = $result->fetch())
                    {
                        echo("<tr>");
                        echo("<td>".$row['Id']."</td>");
                        echo("<td>".$row['Name']."</td>");
                        echo("</tr>");
                    }
                   
                    ?>
                


                    </table>
                   
                    <h4 class="section-heading"><u>Moyenne</u></h4>
                    <p>Le but ici est de retourner la moyenne des valeurs d'une des colonnes. <br/> Notre table 'Weapons' est la suivante :</p>
                    <img src = "https://i.imgur.com/t0LS0Wm.png"/><br/>
                    <p> Nous écrivons la requète suivante : <table border = "1" cellspacing="1" cellpadding="1"><tr><td><div align=center> SELECT AVG( Firerate ) AS AverageFirerate FROM weapons </div></td><tr></table><br/>
                    qui créé une nouvelle colonne 'AverageFirerate' et y inscrit la moyenne des valeurs rentrées dans la colonne 'Firerate' de la table 'Weapons'.
                    </p>
                    <br/><br/>
                    
                    
                    <table  border ="1" cellspacing="1" cellpadding="1"><tr><td><div align=center>
                    <tr>
                         <th >AverageFirerate</th>
                    </tr>
                    <td>
                    <?php 
                    
                    $result = $bdd->query("SELECT AVG( Firerate ) AS AverageFireRate FROM weapons");
                    $row = $result->fetch();
                    echo($row['AverageFireRate'])

                    ?>
                    </td></table>    
                    <br/>
                    <h4 class="section-heading"><u>Jointure</u></h4>
                    <p> L'intérêt d'une jointure est de pouvoir créer des liens entre deux tables différentes.<br/> Nous allons donc nous servir des tables 'weapons' et 'characters' :</p>
                    <img src = "https://i.imgur.com/t0LS0Wm.png"/><img src ="https://puu.sh/D4i1t/286b3ac322.png"><br/>
                    <p> Nous écrivons la requète suivante : <table border = "1" cellspacing="1" cellpadding="1"><tr><td><div align=center> SELECT * FROM weapons NATURAL JOIN characters </div></td><tr></table><br/>
                    qui créé une nouvelle table contenant les colonnes de mêmes noms et types dans les deux tables.
                    <br/>
                    
              
                    <h4 class="section-heading"><u>Group by</u></h4>
                    <p>Le group by est une requète SQL intéressante lorsqu'on retrouve plusieurs fois une même entrée dans une table, celà permet de regrouper les données correspondant à cette entrée (par exemple) <br/> Nous allons ici nous servir de notre table purchases :</p>
                    <img src = "https://i.imgur.com/WnL7Q2G.png"/><br/>
                    <p> On retrouve ici plusieurs fois le même Username, on cherche donc à savoir combien de Lootbox au total chacun a acheté.
                    <p> Nous écrivons la requète suivante : <table border = "1" cellspacing="1" cellpadding="1"><tr><td><div align=center>SELECT Username, SUM(LootboxNumber) FROM purchases GROUP BY Username</div></td><tr></table><br/>
                    </p>
                    <br/><br/>
                    
                    
                    <table  border ="1" cellspacing="1" cellpadding="1"><tr><td><div align=center>
                    <tr>
                         <th >AverageFirerate</th>
                    </tr>
                    <td>
                    <?php 
                    
                    $result = $bdd->query("SELECT AVG( Firerate ) AS AverageFireRate FROM weapons");
                    $row = $result->fetch();
                    echo($row['AverageFireRate'])

                    ?>




                    </div></td><tr></table><br/></td>

                    

                    

          
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
                            <a href="https://twitter.com/SBootstrap" class="btn btn-default btn-lg"><i class="fa fa-twitter fa-fw"></i> <span class="network-name">Twitter</span></a>
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
