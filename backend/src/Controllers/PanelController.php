<?php

namespace App\Controllers;

use App\Models\UserModel;
use App\Services\RequestHandler;
use App\Services\ResponseHandler;

class PanelController extends Controller
{
    public function list()
    {
        $sql = "SELECT * FROM users";
        $data = (new UserModel())->select($sql);

        return ResponseHandler::json([
            'status' => 'success',
            'message' => 'Successful',
            'count' => (int) count($data),
            'data' => $data,
        ], 200);
    }

    public function search()
    {
        $payload = $_GET;
        $payload = self::sanitizeInput($payload);

        // Check if query fields are set
        $queryFields = ['surname', 'firstname', 'middlename', 'village', 'email', 'phone', 'guardian_name', 'guardian_phone', 'company', 'section'];
        foreach ($queryFields as $field) {
            if (!isset($payload[$field])) {
                $payload[$field] = null;
            }
        }

        // sql query to search for data with name or like
        $sql = "SELECT * FROM users WHERE surname LIKE ? OR firstname LIKE ? OR middlename LIKE ? OR village LIKE ? OR email LIKE ? OR phone LIKE ? OR guardian_name LIKE ? OR guardian_phone LIKE ? OR company LIKE ? OR section LIKE ? ORDER BY id DESC";
        $data = (new UserModel())->select($sql, [
            '%' . $payload['surname'] . '%',
            '%' . $payload['firstname'] . '%',
            '%' . $payload['middlename'] . '%',
            '%' . $payload['village'] . '%',
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