<?php

namespace App\Services;

class ResponseHandler
{
    public static function json(array $array, int $code = 200)
    {
        http_response_code($code);
        echo json_encode($array);
        exit;
    }
}