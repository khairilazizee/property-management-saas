<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PropertiesModel extends Model
{
    protected $table = "properties";

    protected $fillable = [
        'agency_id',
        'agent_id',
        'title',
        'price',
        'description',
        'property_category_id',
        'property_type_id',
        'advertisement_type',
        'status',
        'bedrooms',
        'bathrooms',
        'sqft',
        'parking',
    ];

    public function agent()
    {
        return $this->belongsTo(User::class, 'agent_id');
    }

    public function agency()
    {
        return $this->belongsTo(AgencyMemberModel::class, 'agency_id');
    }

    public function propertyCategory()
    {
        return $this->belongsTo(PropertyCategoryModel::class, 'property_category_id');
    }

    public function propertyType()
    {
        return $this->belongsTo(PropertyTypeModel::class, 'property_type_id');
    }
}
