<?php

namespace App\Controllers;

use App\Models\UserModel;
use App\Services\RequestHandler;

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

        // check if there is errors and return 422
        if (!empty($errors)) {
            http_response_code(422);
            $res = [
                'error' => [
                    'code' => 422,
                    'message' => "Validation error",
                    'errors' => (object) $errors
                ]
            ];
            echo json_encode($res);
            exit;
        }

        // check if there is image attached then process image upload

        $sql = "INSERT INTO users (name, gender, email, phone, guardian_name, guardian_phone, company, section) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
        $users = (new UserModel())->insert($sql, $payload);
        http_response_code(201);
        $res = [
            'success' => [
                'code' => 201,
                'message' => 'Registered Successfully'
            ]
        ];
        echo json_encode($res);
        exit;
    }

    public function check()
    {
        http_response_code(200);
        $res = [
            'success' => [
                'code' => 200,
                'message' => 'Successful'
            ]
        ];
        echo json_encode($res);
        exit;
    }
}
;