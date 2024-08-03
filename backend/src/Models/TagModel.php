<?php

namespace App\Models;

class TagModel extends Model
{
    protected $table = 'tags';

    public function all()
    {
        $query = "SELECT * FROM {$this->table}";
        return $this->select($query);
    }
}