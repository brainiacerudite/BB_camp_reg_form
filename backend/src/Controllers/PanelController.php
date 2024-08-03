<?php

namespace App\Controllers;

use App\Models\UserModel;
use App\Services\RequestHandler;
use App\Services\ResponseHandler;

class PanelController extends Controller
{
    public function list()
    {
        $sql = "SELECT * FROM users ORDER BY id DESC";
        $data = (new UserModel())->select($sql);

        return ResponseHandler::json([
            'status' => 'success',
            'message' => 'Successful',
            'count' => (int) count($data),
            'data' => array_map(function ($item) {
                return [
                    'id' => $item['id'],
                    'name' => "{$item['surname']} {$item['firstname']} {$item['middlename']}",
                    'image' => "{$_ENV['APP_URL']}{$item['image']}",
                    'village' => "Village: " . ($item['village'] ?: 'None'),
                ];
            }, $data),
        ], 200);
    }

    public function search()
    {
        $payload = $_GET;
        $payload = self::sanitizeInput($payload);

        // Check if query fields are set
        // $queryFields = ['surname', 'firstname', 'middlename', 'village', 'email', 'phone', 'guardian_name', 'guardian_phone', 'company', 'section'];
        // foreach ($queryFields as $field) {
        //     if (!isset($payload[$field])) {
        //         $payload[$field] = null;
        //     }
        // }
        if (!isset($payload['search'])) {
            $payload['search'] = null;
        }

        // sql query to search for data with name or like
        $sql = "SELECT * FROM users WHERE surname LIKE ? OR firstname LIKE ? OR middlename LIKE ? OR village LIKE ? OR guardian_name LIKE ? OR company LIKE ? OR section LIKE ? ORDER BY id DESC";
        $data = (new UserModel())->select($sql, [
            '%' . $payload['search'] . '%',
            '%' . $payload['search'] . '%',
            '%' . $payload['search'] . '%',
            '%' . $payload['search'] . '%',
            '%' . $payload['search'] . '%',
            '%' . $payload['search'] . '%',
            '%' . $payload['search'] . '%',
        ]);

        return ResponseHandler::json([
            'status' => 'success',
            'message' => 'Successful',
            'count' => (int) count($data),
            'data' => array_map(function ($item) {
                return [
                    'id' => $item['id'],
                    'name' => "{$item['surname']} {$item['firstname']} {$item['middlename']}",
                    'image' => "{$_ENV['APP_URL']}{$item['image']}",
                    'village' => "Village: " . ($item['village'] ?: 'None'),
                ];
            }, $data),
        ], 200);
    }
}
