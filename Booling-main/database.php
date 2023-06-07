<?php
header('Access-Control-Allow-Origin: *');

//Externalisation dans ce fichier PHP de la connexion PDO à la base de données
/************************************************************************************************************
*                                   Classe CONNEXIONMYSQL  (JQ==>Ajax ==>Controleur==>DAO(Req)==>BDD)              *
************************************************************************************************************/

//*********** test *****************/

try {
    $Dao =new connectionMYSQL();
    $Dao->connecterMysql();
    echo "La DataBase est connectée, c'est trop bien ";
}
catch (PDOException $e) {
    echo "DataBase Error: The user could not be added.<br>" . $e->getMessage();
}
//*********** End of test *****************/

class connectionMYSQL {
    private $conn;

    function __construct() {

    }
    
    public function connecterMysql(){
        $host   = "127.0.0.1" ;//$config['mysql']['host'];
        $dbname  = "bowling";//$config['mysql']['dbname'];
        $user    = "root";//$config['mysql']['user'];
        $motdepasse   = "";//$config['mysql']['motdepasse'];
        //$port = "3308";
        //$this->conn = new PDO('mysql:host='.$host.';dbname='.$dbname.';port='.$port.';charset=utf8', $user, $motdepasse);
        $this->conn = new PDO('mysql:host='.$host.';dbname='.$dbname.';charset=utf8', $user, $motdepasse);
        $this->conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);   
    }
    
    public function setConn($conn) {
        $this->conn = $conn;
    }
    public function getConn() {
        return $this->conn;
    } 
    
}
    

?>