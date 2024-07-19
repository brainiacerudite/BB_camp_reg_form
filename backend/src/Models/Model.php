<?php

namespace App\Models;

use App\Services\DatabaseManager;
use PDO;

class Model
{
    protected $connect;

    public function __construct()
    {
        $this->connect = DatabaseManager::getConnection();
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