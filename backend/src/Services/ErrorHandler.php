<?php

namespace App\Services;

use Throwable;

class ErrorHandler
{
    public static function register()
    {
        // global error handler
        set_error_handler(function (int $errno, string $errstr, string $errfile, int $errline) {
            error_log("Error: [$errno] $errstr in $errfile on line $errline");

            // Send a response with error code and message
            return ResponseHandler::json([
                'status' => 'error',
                'message' => $errstr,
            ], $errno);
        });

        // global exception handler
        set_exception_handler(function (Throwable $e) {
            error_log("Exception: " . $e->getMessage() . " in " . $e->getFile() . " on line " . $e->getLine());

            // send response with err code and message
            $statusCode = $e->getCode() && is_int($e->getCode()) ?: 500;

            return ResponseHandler::json([
                'status' => 'error',
                'message' => $e->getMessage(),
            ], $statusCode);
        });

    }
}