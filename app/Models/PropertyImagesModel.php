<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PropertyImagesModel extends Model
{
    protected $table = 'property_image';

    protected $fillable = [
        'property_id',
        'image_url',
        'image_name',
    ];
}
