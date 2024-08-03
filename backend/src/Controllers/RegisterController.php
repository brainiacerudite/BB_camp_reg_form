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

        if (!empty($checkDuplicateResult)) {
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
        $sql = "INSERT INTO users (surname, firstname, middlename, gender, email, phone, guardian_name, guardian_phone, company, section, image) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
        $userId = (new UserModel())->insert($sql, [
            $payload['surname'],
            $payload['firstname'],
            $payload['middlename'],
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
        // $this->generateTag($userId);

        return ResponseHandler::json([
            'status' => 'success',
            'message' => 'Registered Successfully',
        ], 201);
    }

    private function generateTag($userId)
    {
        // TODO: Adjust where necessary
        // Fetch user data
        $sql = "SELECT surname, firstname, middlename, image, village FROM users WHERE id = ?";
        $user = (new UserModel())->select($sql, [$userId]);

        if (count($user) <= 0) {
            return false;
        }

        // Path to the background image
        $background_image_path = 'path/to/your/background_image.jpg';

        // Create the image from the background
        $image = imagecreatefromjpeg($background_image_path);

        // Allocate colors
        $black = imagecolorallocate($image, 0, 0, 0);
        $white = imagecolorallocate($image, 255, 255, 255);

        // Set the font file path (use a TTF font file)
        $font_path = 'path/to/your/font.ttf';

        // User data to be added to the image
        $name = $user['surname'] . " " . $user['firstname'] . " " . $user['middlename'];
        $photo_path = 'uploads/' . $user['image'];

        // Add user name to the image
        imagettftext($image, 20, 0, 100, 100, $black, $font_path, $name);

        // Add user photo to the image
        $user_photo = imagecreatefromjpeg($photo_path);
        $photo_x = 50; // x-coordinate for the photo
        $photo_y = 150; // y-coordinate for the photo
        $photo_width = 100; // width of the photo
        $photo_height = 100; // height of the photo
        imagecopyresized($image, $user_photo, $photo_x, $photo_y, 0, 0, $photo_width, $photo_height, imagesx($user_photo), imagesy($user_photo));

        // Save the image
        $image_path = 'generated_id_cards/user_' . $user_id . '.jpg';
        imagejpeg($image, $image_path);

        // Free memory
        imagedestroy($image);
        imagedestroy($user_photo);
    }

    public function tag()
    {
        $payload = $_GET;
        $payload = self::sanitizeInput($payload);

        // validate user id
        $errors = [];
        if (empty($payload['id'])) {
            return;
        }

        // TODO: consider generating user tag here!
        // $this->generateTag($payload['id']);


        // get tag from db
        $sql = "SELECT tag_image FROM tags WHERE user_id = ? LIMIT 1";
        $result = (new TagModel())->select([$payload['id']]);

        return ResponseHandler::json([
            'status' => 'success',
            'message' => 'Successful',
            'data' => (object) $result,
        ], 200);
    }

    public function check()
    {
        $payload = self::getPayload();
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
            // map data into data and return just surname and firstname
            'data' => array_map(function ($item) {
                return [
                    'id' => $item['id'],
                    'name' => "{$item['surname']} {$item['firstname']} {$item['middlename']}",
                    'image' => "{$_ENV['APP_URL']}{$item['image']}",
                    'village' => "Village: ".($item['village'] ?: 'None'),
                ];
            }, $data),
        ], 200);
    }
}
