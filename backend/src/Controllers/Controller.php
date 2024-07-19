<?php

namespace App\Controllers;

use App\Services\DatabaseManager;

class Controller
{
    protected $db;

    public function __construct()
    {
        $this->db = DatabaseManager::getConnection();
    }
}