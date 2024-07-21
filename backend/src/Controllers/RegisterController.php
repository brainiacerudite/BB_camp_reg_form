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
            $payload['email'] ?? null,
            $payload['phone'] ?? null,
            $payload['guardian_name'] ?? null,
            $payload['guardian_phone'] ?? null,
            $payload['company'],
            $payload['section'],
            $payload['image'] ?? null
        ]);

        return ResponseHandler::json([
            'status' => 'success',
            'message' => 'Registered Successfully',
        ], 201);
    }

    public function check()
    {
        $payload = $_GET;
        $payload = self::sanitizeInput($payload);

        // Check if query fields are set
        $queryFields = ['name', 'email', 'phone', 'guardian_name', 'guardian_phone', 'company', 'section'];
        foreach ($queryFields as $field) {
            if (!isset($payload[$field])) {
                $payload[$field] = null;
            }
        }

        // sql query to search for data with name or like
        $sql = "SELECT * FROM users WHERE name = ? LIMIT 1";
        $data = (new UserModel())->select($sql, [
            $payload['name'],
        ]);

        return ResponseHandler::json([
            'status' => 'success',
            'message' => 'Successful',
            'data' => (object) $data,
        ], 200);
    }

    public function panellistSearch()
    {
        $payload = $_GET;
        $payload = self::sanitizeInput($payload);

        // Check if query fields are set
        $queryFields = ['name', 'email', 'phone', 'guardian_name', 'guardian_phone', 'company', 'section'];
        foreach ($queryFields as $field) {
            if (!isset($payload[$field])) {
                $payload[$field] = null;
            }
        }

        // sql query to search for data with name or like
        $sql = "SELECT * FROM users WHERE name LIKE ? OR email LIKE ? OR phone LIKE ? OR guardian_name LIKE ? OR guardian_phone LIKE ? OR company LIKE ? OR section LIKE ? ORDER BY id DESC";
        $data = (new UserModel())->select($sql, [
            '%' . $payload['name'] . '%',
            '%' . $payload['email'] . '%',
            '%' . $payload['phone'] . '%',
            '%' . $payload['guardian_name'] . '%',
            '%' . $payload['guardian_phone'] . '%',
            '%' . $payload['company'] . '%',
            '%' . $payload['section'] . '%'
        ]);

        return ResponseHandler::json([
            'status' => 'success',
            'message' => 'Successful',
            'count' => (int) count($data),
            'data' => (object) $data,
        ], 200);
    }
}