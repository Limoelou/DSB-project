<!DOCTYPE html>
<html lang="en">

<?php
   require_once ('php/config.php');
   require_once ('php/SQLMethods.php');
   session_start();
             
   if(isset($_GET['request']))
   {
      $request = $_GET['request'];
      
      $result = $bdd->query($request);

      echo(implode(array_keys($result->fetch())));


     /* <table style="width:100%">
      <tr>
        <th>Firstname</th>
        <th>Lastname</th>
        <th>Age</th>
      </tr>
      <tr>
        <td>Jill</td>
        <td>Smith</td>
        <td>50</td>
      </tr>
      <tr>
        <td>Eve</td>
        <td>Jackson</td>
        <td>94</td>
      </tr>
    </table>  */
      echo('</br>');
      while ($row = $result->fetch())
      {
            
            echo(implode("   ",array_unique($row)));
             
               echo('</br>');   
                
       }
   }
   else
   {
        echo("No request");
   }


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
                    <h2 class="section-heading">Requêtes</h2>
                    <p class="lead">Voici plusieurs requètes que nous avons réalisées en nous basant sur notre base de données. </p>
                    <h4 class="section-heading"><u>Selection avec projection</u></h4>


                    <p>Nous cherchons à renvoyer certains attributs des insertions remplissant les conditions de la sélection. <br/>Notre table 'Characters' est la suivante :</p>
                    <img src="https://puu.sh/D4i1t/286b3ac322.png" /><br/>
                    <p> Nous écrivons la requète suivante : <table  border ="1" cellspacing="1" cellpadding="1"><tr><td><div align=center>SELECT Id,Name from Characters where LifePoints == 200</div></td><tr></table>
                    <br/> qui renvoie une table avec les colonnes 'Id' et 'Name' des insertions dont la valeur de la colonne 'LifePoints' est égale à 200 : <a href="<?php echo(createQuery("SELECT Id,Name from Characters where LifePoints = 200")) ?>">Voir le résulat</a>
                    <br/>

                    <h4 class="section-heading"><u>Moyenne</u></h4>
                    <p>Le but ici est de retourner la moyenne des valeurs d'une des colonnes. <br/> Notre table 'Weapons' est la suivante :</p>
                    <img src = "https://i.imgur.com/t0LS0Wm.png"/><br/>
                    <p> Nous écrivons la requète suivante : <table border = "1" cellspacing="1" cellpadding="1"><tr><td><div align=center> SELECT AVG( Firerate ) AS AverageFirerate FROM weapons </div></td><tr></table><br/>
                    qui créé une nouvelle colonne 'AverageFirerate' et y inscrit la moyenne des valeurs rentrées dans la colonne 'Firerate' de la table 'Weapons' :  <a href="<?php echo(createQuery("SELECT AVG( Firerate ) AS AverageFirerate FROM weapons")) ?>">Voir le résulat</a>
                    </p>
            
                    <br/>
                    <h4 class="section-heading"><u>Jointure</u></h4>
                    <p> L'intérêt d'une jointure est de pouvoir créer des liens entre deux tables différentes.<br/> Nous allons donc nous servir des tables 'weapons' et 'characters' :</p>
                    <table>
                    <td><img src = "https://i.imgur.com/t0LS0Wm.png"/></td>
                    <td><br/></td>
                    <td><img src ="https://puu.sh/D4i1t/286b3ac322.png"></td>
                    </table><br/>
                    <p> Nous écrivons la requète suivante : <table border = "1" cellspacing="1" cellpadding="1"><tr><td><div align=center> SELECT * FROM weapons INNER JOIN characters </div></td><tr></table><br/>
                    qui créé une nouvelle table contenant les colonnes de mêmes noms et types dans les deux tables : <a href="<?php echo(createQuery("SELECT * FROM weapons INNER JOIN characters")) ?>">Voir le résulat</a>
                    <br/>

                    <h4 class="section-heading"><u>Group by</u></h4>
                    <p>Le group by est une requète SQL intéressante lorsqu'on retrouve plusieurs fois une même entrée dans une table, celà permet de regrouper les données correspondant à cette entrée (par exemple) <br/> Nous allons ici nous servir de notre table purchases :</p>
                    <img src = "https://i.imgur.com/WnL7Q2G.png"/><br/>
                    <p> On retrouve ici plusieurs fois le même Username, on cherche donc à savoir combien de Lootbox au total chacun a acheté.
                    <p> Nous écrivons la requète suivante : <table border = "1" cellspacing="1" cellpadding="1"><tr><td><div align=center>SELECT Username, SUM(LootboxNumber) FROM purchases GROUP BY Username</div></td><tr></table><br/>
                    </p>
                    <br/>
                    <p> Nous obtenons alors les usernames avec le nombre total de lootbox qu'ils ont respectivement achetées :  <a href="<?php echo(createQuery("SELECT Username, SUM(LootboxNumber) AS LootboxNumber FROM purchases GROUP BY Username")) ?>">Voir le résulat</a>
                    
                    <br/>
                      <h4 class="section-heading"><u>Différence</u></h4>
                    <p> Utile ici lorsque l'on cherche à retourner une table sans certaines valeurs d'un ou plusieurs attributs sous certaines conditions. <br/> Notre table 'maps' est la suivante :</p>
                    <img src = "https://i.imgur.com/st6AMdu.png"/><br/>
                    <p> Nous écrivons la requète suivante : <table border = "1" cellspacing="1" cellpadding="1"><tr><td><div align=center> SELECT Name, Type FROM maps map1 WHERE  map1.Type NOT IN (SELECT Type FROM maps map2 WHERE Type = 'Escort')) </div></td><tr></table><br/>
                    qui créé une nouvelle instance de la table 'maps' appelée map1 sans les cartes qui sont des escortes :  <a href="<?php echo(createQuery("SELECT Name, Type FROM maps map1 WHERE  map1.Type NOT IN (SELECT Type FROM maps map2 WHERE Type = 'Escort')")) ?>">Voir le résulat</a>
                    </p>  

                    <br/>
                    <h4 class="section-heading"><u>Division</u></h4>
                    <p> La division est utile lorsqu'on veut retourner les insertions qui remplissent des conditions précises. </p>
                    <p> D'après la table 'purchases' vue précedemment, nous écrivons la requète suivante : <table border = "1" cellspacing="1" cellpadding="1"><tr><td><div align=center>SELECT DISTINCT Username, LootboxNumber, Date FROM purchases WHERE LootboxNumber >19 LIMIT 0 , 30 </div></td><tr></table><br/>
                    qui retourne les utilisateurs ayant acheté plus de 19 lootboxes en une seule fois :  <a href="<?php echo(createQuery("SELECT DISTINCT Username, LootboxNumber, Date FROM purchases WHERE LootboxNumber >19 LIMIT 0 , 30")) ?>">Voir le résulat</a>
                    </p>
                    
                    <form action="sql.php">
                            Requête: <input type="text" name="request" value="SELECT * from account"><br>

                            <br>
                    <button type="submit" class="btn btn-default">Executer</button>

                    </form>



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
