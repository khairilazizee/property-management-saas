<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class DistrictModel extends Model
{
    protected $table = 'districts';

    protected $fillable = [
        'name',
        'district_code',
        'district_abbr',
        'state_id'
    ];

    public function state()
    {
        return $this->belongsTo(StateModel::class, 'state_id');
    }
}
