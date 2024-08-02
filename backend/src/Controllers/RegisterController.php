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
        if (empty($payload['image'])) {
            $errors['image'] = 'Image field is required';
        }

        if (empty($payload['surname'])) {
            $errors['surname'] = 'Surname field is required';
        }

        if (empty($payload['firstname'])) {
            $errors['firstname'] = 'First Name field is required';
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

        // TODO: Check for duplicate surname and firstnsme
        $checkDuplicateSql = "SELECT * FROM users WHERE surname = ? AND firstname = ? LIMIT 1";
        $checkDuplicateResult = (new UserModel())->select($checkDuplicateSql, [
            $payload['surname'],
            $payload['firstname'],
        ]);

        if(!empty($checkDuplicateResult)) {
            $errors['surname'] = 'Name already exist';
        }

        // process image upload
        if (isset($_FILES['image']) && !empty($_FILES['image'])) {
            $image = RequestHandler::uploadImage($_FILES['image']);
            if (!$image['status']) {
                // $errors['image'] = 'Invalid image file';
                $errors['image'] = $image['message'];
            }
            $payload['image'] = $image['file'] ?? null;
        }

        if (isset($payload['image']) && !empty($payload['image'])) {
            $image = RequestHandler::uploadBase64Image($payload['image']);
            if (!$image['status']) {
                $errors['image'] = $image['message'];
            }
            $payload['image'] = $image['file'] ?? null;
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
            $payload['email'] ?? null,
            $payload['phone'] ?? null,
            $payload['guardian_name'] ?? null,
            $payload['guardian_phone'] ?? null,
            $payload['company'],
            $payload['section'],
            $payload['image'] ?? null
        ]);
        
        // TODO: generate tag

        return ResponseHandler::json([
            'status' => 'success',
            'message' => 'Registered Successfully',
        ], 201);
    }
    
    private function generateTag()
    {
        
    }

    public function check()
    {
        $payload = $_GET;
        $payload = self::sanitizeInput($payload);

        // Check if query fields are set
        $queryFields = ['surname', 'firstname'];
        foreach ($queryFields as $field) {
            if (!isset($payload[$field])) {
                $payload[$field] = null;
            }
        }

        // sql query to search for data with name or like
        $sql = "SELECT * FROM users WHERE surname LIKE ? AND firstname LIKE ?";
        $data = (new UserModel())->select($sql, [
            '%' . $payload['surname'] . '%',
            '%' . $payload['firstname'] . '%',
        ]);

        return ResponseHandler::json([
            'status' => 'success',
            'message' => 'Successful',
            'data' => (object) $data,
        ], 200);
    }

    
}