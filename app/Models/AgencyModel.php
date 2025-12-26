<?php

namespace App\Models;

use App\AgencyMemberRole;
use Illuminate\Database\Eloquent\Model;

class AgencyModel extends Model
{
    protected $table = 'agencies';
    protected $fillable = [
        'name',
        'slug',
        'address',
        'city',
        'state',
        'zip',
        'phone',
        'email',
        'website',
        'is_active'
    ];

    protected $casts = [
        'is_active' => 'boolean',
    ];

    public function adminMember()
    {
        return $this->hasOne(AgencyMemberModel::class, 'agency_id')->where('role', AgencyMemberRole::Admin);
    }

    public function members()
    {
        return $this->hasMany(AgencyMemberModel::class, 'agency_id');
    }
}
