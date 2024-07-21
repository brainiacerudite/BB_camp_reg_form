<?php

namespace App\Controllers;

use App\Models\UserModel;
use App\Services\RequestHandler;
use App\Services\ResponseHandler;

class RegisterController extends Controller
{
    public function register()
    {
        $payload = self::getPayload();
        $payload = self::sanitizeInput($payload);

        // validate input data
        $errors = [];
        if (empty($payload['name'])) {
            $errors['name'] = 'Name field is required';
        }

        if (empty($payload['gender'])) {
            $errors['gender'] = 'Gender field is required';
        }

        if (empty($payload['company'])) {
            $errors['company'] = 'Company field is required';
        }

        if (empty($payload['section'])) {
            $errors['section'] = 'Section field is required';
        }

        // process image upload
        if (!empty($_FILES['image'])) {
            $image = RequestHandler::uploadImage($_FILES['image']);
            if (!$image) {
                $errors['image'] = 'Invalid image file';
            }
            $payload['image'] = $image;
        }

        // check if there is errors and return 422
        if (!empty($errors)) {
            return ResponseHandler::json([
                'status' => 'error',
                'message' => 'Validation failed',
                'errors' => (object) $errors
            ], 422);
        }

        // save to db
        $sql = "INSERT INTO users (name, gender, email, phone, guardian_name, guardian_phone, company, section, image) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
        $userId = (new UserModel())->insert($sql, [
            $payload['name'],
            $payload['gender'],
            $payload['email'],
            $payload['phone'],
            $payload['guardian_name'],
            $payload['guardian_phone'],
            $payload['company'],
            $payload['section'],
            $payload['image']
        ]);

        return ResponseHandler::json([
            'status' => 'success',
            'message' => 'Registered Successfully',
        ], 201);
    }

    public function check()
    {
        $data = $_GET;

        return ResponseHandler::json([
            'status' => 'success',
            'message' => 'Successful',
            'data' => (object) $data
        ], 200);
    }
}