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
        $this->setCORSHeaders($this->config['app']['frontend']);
        $this->initDatabaseConnection();
    }

    protected function setCORSHeaders($frontendUrl)
    {
        if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
            // The request is a preflight request, respond accordingly
            header("Access-Control-Allow-Origin: $frontendUrl");
            header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
            header("Access-Control-Allow-Headers: Content-Type, Authorization");
            header("Access-Control-Allow-Credentials: true");
            header("Access-Control-Max-Age: 3600"); // Optional: Cache preflight response
            header("Content-Length: 0");
            header("HTTP/1.0 204 No Content");
            exit;
        }

        // Set CORS headers with a specific allowed origin
        header("Access-Control-Allow-Origin: $frontendUrl");
        header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
        header("Access-Control-Allow-Headers: Content-Type, Authorization");
        header("Access-Control-Allow-Credentials: true");
        header("Content-Type: application/json");
        header("Access-Control-Max-Age: 3600");
    }

    // In ApplicationSetup constructor or a separate method
    public function initDatabaseConnection()
    {
        $databaseManager = new DatabaseManager($this->config['db']['host'], $this->config['db']['name'], $this->config['db']['user'], $this->config['db']['pass']);
        $databaseManager->initDatabase();
    }
}
