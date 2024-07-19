<?php

namespace App\Services;

use Dotenv\Dotenv;

class ApplicationSetup
{
    public $config;

    public function __construct($config)
    {
        $this->config = $config;

        // Error reporting setup
        error_reporting(E_ALL);
        ini_set('display_errors', 0);
        ini_set('log_errors', 1);
        ini_set('error_log', 'src/error.log');

        // CORS headers setup
        $this->setCORSHeaders();
        $this->initDatabaseConnection();
    }

    protected function setCORSHeaders()
    {
        // set headers
        header("Access-Control-Allow-Origin: *");
        header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorisation, X-Requested-With");
        header("Access-Control-Allow-Methods: OPTIONS,GET,POST,PUT,DELETE");
        header("Access-Control-Allow-Credentials: true");
        header("Content-Type: application/json; charset=UTF-8");
        header("Access-Control-Max-Age: 3600");
    }

    // In ApplicationSetup constructor or a separate method
    public function initDatabaseConnection()
    {
        $databaseManager = new DatabaseManager($this->config['db']['host'], $this->config['db']['name'], $this->config['db']['user'], $this->config['db']['pass']);
        $databaseManager->initDatabase();
    }
}