<?php

namespace App\Services;

use App\Controllers;

class Router
{
    private $routes = [];

    public function get($uri, $action)
    {
        if (!isset($this->routes['GET'][$uri])) {
            $this->routes['GET'][$uri] = $action;
        } else {
            $this->routes['GET'][$uri][] = $action;
        }
    }

    public function post($uri, $action)
    {
        if (!isset($this->routes['POST'][$uri])) {
            $this->routes['POST'][$uri] = $action;
        } else {
            $this->routes['POST'][$uri][] = $action;
        }
    }

    public function dispatch($uri)
    {
        $method = $_SERVER['REQUEST_METHOD'];
        // error_log(print_r($this->routes, true));
        if (isset($this->routes[$method][$uri])) {
            list($controllerclass, $methodName) = $this->routes[$method][$uri];
            return $this->callControllerMethod($controllerclass, $methodName);
        } else {
            throw new \Exception('Route Not Found', 404);
        }
    }

    private function callControllerMethod($controllerClass, $methodName)
    {
        $controller = new $controllerClass;
        return $controller->$methodName();
    }
}