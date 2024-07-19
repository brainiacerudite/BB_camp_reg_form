<?php

require 'vendor/autoload.php';

use App\Services\ApplicationSetup;
use App\Services\ErrorHandler;
use App\Services\Router;

// load env
$dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
$dotenv->load();

require "src/config.php";

// exception handler
ErrorHandler::register();

$appSetup = new ApplicationSetup($config);

// init router
$router = new Router();

// Define routes
$router->post('/register', ['App\Controllers\RegisterController', 'register']);
$router->post('/check', ['App\Controllers\RegisterController', 'check']);

// error_log("Actual Request URI: " . $_SERVER['REQUEST_URI']);
$router->dispatch($_SERVER['REQUEST_URI']);

exit;