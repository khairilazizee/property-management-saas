<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ClientsModel extends Model
{
    protected $table = 'clients';

    protected $fillable = [
        'agency_id',
        'agent_id',
        'name',
        'email',
        'phone',
        'address',
        'city',
        'state',
        'zip',
        'country',
        'description',
    ];

    public function agency()
    {
        return $this->belongsTo(AgencyModel::class, 'agency_id');
    }

    public function agent()
    {
        return $this->belongsTo(User::class, 'agent_id');
    }
}
