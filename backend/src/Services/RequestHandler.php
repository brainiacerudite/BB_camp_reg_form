<?php

namespace App\Services;

class RequestHandler
{
    public static function handleRequest()
    {
        // $request = file_get_contents('php://input');
        // $request = json_decode($request, true);
        $request = $_POST;
        return $request;
    }

    public static function uploadImage($file)
    {

        $file_name = $file['name'];
        $file_tmp = $file['tmp_name'];
        $file_size = $file['size'];
        $file_error = $file['error'];
        $file_ext = explode('.', $file_name);
        $file_ext = strtolower(end($file_ext));
        $allowed = ['jpg', 'jpeg', 'png'];
        if (in_array($file_ext, $allowed)) {
            if ($file_error === 0) {
                if ($file_size < 1000000) {
                    $file_name = uniqid('', true) . '.' . $file_ext;
                    $file_destination = "uploads/{$file_name}";
                    move_uploaded_file($file_tmp, $_SERVER['DOCUMENT_ROOT'] . $file_destination);
                    return $file_destination;
                }
            }
            return false;
        }
    }
}