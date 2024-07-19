<?php

namespace App\Models;

class UserModel extends Model
{
    protected $table = 'users';

    public function all()
    {
        $query = "SELECT * FROM {$this->table}";
        return $this->select($query);
    }
}