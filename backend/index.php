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
$router->post("{$_ENV['ROOT']}/register", ['App\Controllers\RegisterController', 'register']);
$router->post("{$_ENV['ROOT']}/check", ['App\Controllers\RegisterController', 'check']);
// Define panel routes
$router->get("{$_ENV['ROOT']}/panel/list", ['App\Controllers\PanelController', 'list']);
$router->get("{$_ENV['ROOT']}/panel/search", ['App\Controllers\PanelController', 'search']);
// General routes
$router->get("{$_ENV['ROOT']}/tag", ['App\Controllers\TagController', 'tag']);

// error_log("Actual Request URI: " . $_SERVER['REQUEST_URI']);
// exclude query params from $_SERVER['REQUEST_URI']
$uri = explode('?', $_SERVER['REQUEST_URI'])[0];
$router->dispatch($uri);

exit;