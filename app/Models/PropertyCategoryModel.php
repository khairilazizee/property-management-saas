<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PropertyCategoryModel extends Model
{
    protected $table = "property_category";

    protected $fillable = ['category_name'];

    public function propertyType()
    {
        return $this->hasMany(PropertyTypeModel::class, 'property_category_id');
    }

    public function types()
    {
        return $this->propertyType();
    }

    public function property()
    {
        return $this->hasMany(PropertiesModel::class, 'property_category_id');
    }
}
