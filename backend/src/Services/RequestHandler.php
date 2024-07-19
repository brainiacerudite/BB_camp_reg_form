<?php

namespace App\Services;

class RequestHandler
{
    public static function handleRequest()
    {
        $request = file_get_contents('php://input');
        $request = json_decode($request, true);
        return $request;
    }
}