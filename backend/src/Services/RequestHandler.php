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
        // error_log("File size: {$file_size}");
        $file_error = $file['error'];
        $file_ext = explode('.', $file_name);
        $file_ext = strtolower(end($file_ext));
        $allowed = ['jpg', 'jpeg', 'png'];

        if (!in_array($file_ext, $allowed)) {
            return [
                'status' => false,
                'message' => 'File type not allowed'
            ];
        }
        if ($file_error !== 0) {
            return [
                'status' => false,
                'message' => 'File error'
            ];
        }
        if ($file_size > (10 * 1024 * 1024)) {
            return [
                'status' => false,
                'message' => 'File size too big'
            ];
        }

        // no error
        $file_name = uniqid('', true) . '.' . $file_ext;
        $file_destination = "uploads/{$file_name}";
        move_uploaded_file($file_tmp, $_SERVER['DOCUMENT_ROOT'] . $file_destination);
        return [
            'status' => true,
            'message' => 'Successful',
            'file' => $file_destination
        ];
    }
}