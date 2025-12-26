<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AgencyMemberModel extends Model
{
    protected $table = 'agency_members';
    protected $fillable = [
        'agency_id',
        'user_id',
        'name',
        'agent_slug',
        'ren_no',
        'role',
        'is_active'
    ];

    public function agency()
    {
        return $this->belongsTo(AgencyModel::class, 'agency_id');
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
