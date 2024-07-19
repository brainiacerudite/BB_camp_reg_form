<?php

namespace App\Controllers;

use App\Models\UserModel;

class RegisterController extends Controller
{
    public function register()
    {
        // $users = (new UserModel())->all();
        // http_response_code(201);
        // $res = [
        //     'success' => [
        //         'code' => 201,
        //         'data' => $users
        //     ]
        // ];
        // echo json_encode($res);
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
    }
}
;