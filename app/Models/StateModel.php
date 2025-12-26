<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class StateModel extends Model
{
    protected $table = 'states';
    protected $fillable = [
        'name',
        'state_code',
        'state_abbr'
    ];

    public function districts()
    {
        return $this->hasMany(DistrictModel::class, 'state_id');
    }
}
