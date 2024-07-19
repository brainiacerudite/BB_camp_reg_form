<?php

namespace App\Controllers;

use App\Services\RequestHandler;

class Controller
{
    protected static function getPayload()
    {
        return RequestHandler::handleRequest();
    }

    protected static function sanitizeInput(array $data): array
    {
        $sanitizedData = [];

        foreach ($data as $key => &$value) {
            $value = htmlspecialchars($value, ENT_QUOTES | ENT_HTML5, 'UTF-8');
            $value = trim($value);
            $sanitizedData[$key] = $value;
        }

        return $sanitizedData;
    }
}