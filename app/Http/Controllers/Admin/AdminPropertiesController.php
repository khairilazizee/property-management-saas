<?php

namespace App\Http\Controllers\Admin;

use App\AgencyMemberRole;
use App\Http\Controllers\Controller;
use App\Models\AgencyMemberModel;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminPropertiesController extends Controller
{
    public function index(Request $request)
    {

        $agencyId = AgencyMemberModel::where('user_id', $request->user()->id)
            ->where('role', AgencyMemberRole::Admin)
            ->value('agency_id');

        return Inertia::render('admin/properties/index', []);
    }
}
