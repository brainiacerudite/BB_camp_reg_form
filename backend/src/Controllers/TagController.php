<?php

namespace App\Controllers;

use App\Models\TagModel;
use App\Models\UserModel;
use App\Services\ResponseHandler;

class TagController extends Controller
{
    public function tag()
    {
        $payload = $_GET;
        $payload = self::sanitizeInput($payload);

        // validate user id
        $errors = [];
        if (empty($payload['id'])) {
            return;
        }
        $userId = $payload['id'];

        // check if user exist
        $userCheckSql = "SELECT * FROM users WHERE id = ? LIMIT 1";
        $userCheck = (new UserModel)->select($userCheckSql, [$userId]);
        if (!$userCheck) {
            $errors['user'] = 'User Not Found';
        }

        // check if there is errors and return 422
        if (!empty($errors)) {
            return ResponseHandler::json([
                'status' => 'error',
                'message' => 'Something went wrong',
                'errors' => (object) $errors
            ], 400);
        }


        // check if tag exist
        $tag = $this->tagExist($userId);

        // get tag or generate tag
        $imageUrl = $tag ? $tag['tag'] : $this->generateTag($userId);

        if (!$tag) {
            // save the tag 
            $this->tagCreate($userId, $imageUrl);
        }

        return ResponseHandler::json([
            'status' => 'success',
            'message' => 'Successful',
            // 'data' => (object) $result,
            'data' => $_ENV['APP_URL'] . $imageUrl
        ], 200);
    }

    private function tagExist($userId)
    {
        $sql = "SELECT tag FROM tags WHERE user_id = ? LIMIT 1";
        $tag = (new TagModel())->select($sql, [$userId]);
        return $tag ? $tag[0] : null;
    }

    private function tagCreate($userId, $tagImageUrl)
    {
        $sql = "INSERT INTO tags (user_id, tag) VALUES (?, ?)";
        $userId = (new TagModel())->insert($sql, [
            $userId,
            $tagImageUrl,
        ]);
    }

    private function generateTag($userId)
    {
        // Fetch user data
        $sql = "SELECT surname, firstname, middlename, image, gender, company, section, village FROM users WHERE id = ? LIMIT 1";
        $user = (new UserModel())->select($sql, [$userId]);

        if (count($user) <= 0) {
            return false;
        }
        $user = $user[0];

        // Path to the background image
        $background_image_path = $_SERVER['DOCUMENT_ROOT'] . "{$_ENV['ROOT']}/assets/tag_temp.png";

        // Create the image from the background
        $image = imagecreatefrompng($background_image_path);

        // Allocate colors
        $black = imagecolorallocate($image, 0, 0, 0);
        $white = imagecolorallocate($image, 255, 255, 255);

        // Set the font file path (use a TTF font file)
        $font_path = $_SERVER['DOCUMENT_ROOT'] . "{$_ENV['ROOT']}/assets/fonts/Roboto-Bold.ttf";

        // User data to be added to the image
        $name = ucwords($user['surname'] . " " . $user['firstname'] . " " . $user['middlename']);
        $photo_path = $_SERVER['DOCUMENT_ROOT'] . $user['image'];

        // Add user name to the image
        imagettftext($image, 16, 0, 200, 568, $black, $font_path, $name);
        imagettftext($image, 16, 0, 200, 628, $black, $font_path, ucwords($user['gender']));
        imagettftext($image, 16, 0, 200, 686, $black, $font_path, ucwords($user['company']) . ' Company');
        imagettftext($image, 16, 0, 200, 744, $black, $font_path, ucwords($user['section']));
        imagettftext($image, 16, 0, 200, 800, $black, $font_path, ucwords($user['village'] ?? 'none'));

        // Load user photo to the image
        // check $photo_path format if png or jpg
        if (pathinfo($photo_path, PATHINFO_EXTENSION) == 'png') {
            $user_photo = imagecreatefrompng($photo_path);
        } else {
            $user_photo = imagecreatefromjpeg($photo_path);
        }

        // Calculate the size to maintain aspect ratio
        $original_width = imagesx($user_photo);
        $original_height = imagesy($user_photo);
        $aspect_ratio = $original_width / $original_height;

        $photo_width = 265; // desired width
        $photo_height = 265; // desired height
        if ($aspect_ratio > 1) {
            // Landscape
            $new_height = $photo_height;
            $new_width = $photo_height * $aspect_ratio;
        } else {
            // Portrait or square
            $new_width = $photo_width;
            $new_height = $photo_width / $aspect_ratio;
        }

        // Resize user photo
        $resized_photo = imagecreatetruecolor((int)$new_width, (int)$new_height);
        imagecopyresampled($resized_photo, $user_photo, 0, 0, 0, 0, (int)$new_width, (int)$new_height, $original_width, $original_height);

        // Create a circular mask
        $mask = imagecreatetruecolor($photo_width, $photo_height);
        imagesavealpha($mask, true);
        $transparent = imagecolorallocatealpha($mask, 0, 0, 0, 127);
        imagefill($mask, 0, 0, $transparent);
        $mask_color = imagecolorallocate($mask, 255, 255, 255);
        imagefilledellipse($mask, (int)($photo_width / 2), (int)($photo_height / 2), $photo_width, $photo_height, $mask_color);

        // Apply the mask to the user photo
        $final_photo = imagecreatetruecolor($photo_width, $photo_height);
        imagesavealpha($final_photo, true);
        $transparent = imagecolorallocatealpha($final_photo, 0, 0, 0, 127);
        imagefill($final_photo, 0, 0, $transparent);

        // Center the resized photo on the mask
        $src_x = ($new_width - $photo_width) / 2;
        $src_y = ($new_height - $photo_height) / 2;

        for ($x = 0; $x < $photo_width; $x++) {
            for ($y = 0; $y < $photo_height; $y++) {
                $alpha = (imagecolorat($mask, $x, $y) >> 24) & 0x7F;
                if ($alpha == 0) {
                    $color = imagecolorat($resized_photo, (int)($x + $src_x), (int)($y + $src_y));
                    imagesetpixel($final_photo, $x, $y, $color);
                }
            }
        }

        // Place the circular photo onto the background
        $photo_x = 143; // x-coordinate for the photo on the background
        $photo_y = 234; // y-coordinate for the photo on the background
        imagecopy($image, $final_photo, $photo_x, $photo_y, 0, 0, $photo_width, $photo_height);

        // Save the image
        $imageFileName = "{$_ENV['ROOT']}/assets/tags/{$userId}.jpg";
        $image_path = $_SERVER['DOCUMENT_ROOT'] . $imageFileName;
        imagejpeg($image, $image_path);

        // Free memory
        imagedestroy($image);
        imagedestroy($user_photo);
        imagedestroy($mask);
        imagedestroy($final_photo);
        imagedestroy($resized_photo);

        return $imageFileName;
    }
}
