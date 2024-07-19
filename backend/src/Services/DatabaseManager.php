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

    public function query($sql, $params = [])
    {
        $stmt = $this->connect->prepare($sql);
        $stmt->execute($params);
        return $stmt;
    }

    public function select($sql, $params = [])
    {
        $stmt = $this->connect->prepare($sql);
        $stmt->execute($params);
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function insert($sql, $params = [])
    {
        $stmt = $this->connect->prepare($sql);
        $stmt->execute($params);
        return $this->connect->lastInsertId();
    }

    public function update($sql, $params = [])
    {
        $stmt = $this->connect->prepare($sql);
        $stmt->execute($params);
        return $stmt->rowCount();
    }

    public function delete($sql, $params = [])
    {
        $stmt = $this->connect->prepare($sql);
        $stmt->execute($params);
        return $stmt->rowCount();
    }
}