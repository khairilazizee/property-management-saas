<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PropertyTypeModel extends Model
{
    protected $table = "property_type";

    protected $fillable = ['type_name', 'property_category_id', 'type_slug'];

    public function propertyCategory()
    {
        return $this->belongsTo(PropertyCategoryModel::class, 'property_category_id');
    }

    public function property()
    {
        return $this->hasMany(PropertiesModel::class, 'property_type_id');
    }
}
