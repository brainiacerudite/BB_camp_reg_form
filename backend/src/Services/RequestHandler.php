<?php

namespace App\Services;

class RequestHandler
{
    public static function handleRequest()
    {
        $contentType = isset($_SERVER['CONTENT_TYPE']) && $_SERVER['CONTENT_TYPE'] === 'application/json' ? true : false;

        $body = $contentType ? file_get_contents('php://input') : $_POST;
        $data = $contentType ? json_decode($body, true) : $body;

        return $data;
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
        $file_destination = "/uploads/{$file_name}";
        move_uploaded_file($file_tmp, $_SERVER['DOCUMENT_ROOT'] . $file_destination);
        return [
            'status' => true,
            'message' => 'Image uploaded successfully',
            'file' => $file_destination
        ];
    }

    public static function uploadBase64Image($image)
    {
        if (preg_match('/^data:image\/(\w+);base64,/', $image, $type)) {
            $image = substr($image, strpos($image, ',') + 1);
            $type = strtolower($type[1]);
            $allowed = ['jpg', 'jpeg', 'png'];

            if (!in_array($type, $allowed)) {
                return [
                    'status' => false,
                    'message' => 'File type not allowed'
                ];
            }

            $image = base64_decode($image);
            if ($image === false) {
                return [
                    'status' => false,
                    'message' => 'base64_decode failed'
                ];
            }
        } else {
            return [
                'status' => false,
                'message' => 'Invalid image data'
            ];
        }

        // Set the file path and name
        $fileName = uniqid('', true) . '.' . $type;
        $file_destination = "/uploads/{$fileName}";

        // // Create the uploads directory if it doesn't exist
        // if (!file_exists($filePath)) {
        //     mkdir($filePath, 0777, true);
        // }

        // Save the image file to the server
        file_put_contents($_SERVER['DOCUMENT_ROOT'] . $file_destination, $image);
        return [
            'status' => true,
            'message' => 'Image uploaded successfully',
            'file' => $file_destination
        ];
    }
}