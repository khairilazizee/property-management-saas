<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class LeadsModel extends Model
{
    protected $table = 'leads';

    protected $fillable = [
        'agency_id',
        'assigned_agent_id',
        'property_id',
        'name',
        'email',
        'phone',
        'preferred_location',
        'message',
        'source',
        'status',
        'last_contacted_at',
        'next_follow_up_at',
        'is_active',
    ];

    public function agent()
    {
        return $this->belongsTo(User::class, 'assigned_agent_id');
    }

    public function agency()
    {
        return $this->belongsTo(AgencyModel::class, 'agency_id');
    }

    public function property()
    {
        return $this->belongsTo(PropertiesModel::class, 'property_id');
    }
}
