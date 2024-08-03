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
$router->get('/check', ['App\Controllers\RegisterController', 'check']);
$router->get('/tag', ['App\Controllers\RegisterController', 'tag']);
// Define panel routes
$router->get('/panel/list', ['App\Controllers\PanelController', 'list']);
$router->get('/panel/search', [App\Controllers\PanelController', 'search']);

// error_log("Actual Request URI: " . $_SERVER['REQUEST_URI']);
// exclude query params from $_SERVER['REQUEST_URI']
$uri = explode('?', $_SERVER['REQUEST_URI'])[0];
$router->dispatch($uri);

exit;