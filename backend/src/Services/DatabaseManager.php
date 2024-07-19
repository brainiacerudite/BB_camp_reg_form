<?php

namespace App\Services;

use PDO;
use PDOException;

class DatabaseManager
{
    private static $connect;
    private $dbhost;
    private $dbname;
    private $dbuser;
    private $dbpass;

    public function __construct($dbhost, $dbname, $dbuser, $dbpass)
    {
        $this->dbhost = $dbhost;
        $this->dbname = $dbname;
        $this->dbuser = $dbuser;
        $this->dbpass = $dbpass;
    }

    // init the db
    public function initDatabase()
    {
        try {
            self::$connect = new PDO("mysql:host=$this->dbhost;dbname=$this->dbname", $this->dbuser, $this->dbpass);
        } catch (PDOException $e) {
            error_log($e->getMessage());
            throw new \Exception('Unable to connect to database', 500);
        }
    }

    public static function getConnection()
    {
        return self::$connect;
    }
}